// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import 'dart:async';
import 'dart:developer';
import 'dart:typed_data';
import 'package:firebase_ai/firebase_ai.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../shared/app_state.dart';
import '../../shared/firebaseai_imagen_service.dart';
import '../../shared/function_calling/tools.dart';
import 'utilities/audio_output.dart';

/// A service that handles all communication with the Firebase AI Gemini Live API.
///
/// This service demonstrates how to use the `liveGenerativeModel()` to create
/// a real-time, bidirectional audio & video stream with Gemini. It manages the
/// `LiveSession` and processes streaming responses, including tool calls.
///
/// For more information, see the official documentation:
/// https://firebase.google.com/docs/ai-logic/live-api?api=dev
class LiveApiService {
  final AudioOutput _audioOutput;
  final WidgetRef _ref;
  // Callbacks for UI updates handled by setState
  final void Function(bool isLoading) onImageLoadingChange;
  final void Function(Uint8List imageBytes) onImageGenerated;
  final void Function(String error) onError;

  LiveApiService({
    required AudioOutput audioOutput,
    required WidgetRef ref,
    required this.onImageLoadingChange,
    required this.onImageGenerated,
    required this.onError,
  }) : _audioOutput = audioOutput,
       _ref = ref;

  final LiveGenerativeModel
  _liveModel = FirebaseAI.googleAI().liveGenerativeModel(
    systemInstruction: Content.text(
      'You are a helpful assistant. If you have a tool to help the user, please use it.',
    ),
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    liveGenerationConfig: LiveGenerationConfig(
      speechConfig: SpeechConfig(voiceName: 'fenrir'),
      responseModalities: [ResponseModalities.audio],
    ),
    tools: [
      Tool.functionDeclarations([
        setAppColorTool,
        // Gemini Flash Image currently requires the pay-as-you-go Blaze plan.
        generateImageTool,
      ]),
    ],
  );

  late LiveSession _session;
  bool _liveSessionIsOpen = false;

  Future<void> connect() async {
    if (_liveSessionIsOpen) return;
    try {
      _session = await _liveModel.connect();
      _liveSessionIsOpen = true;
      unawaited(processMessagesContinuously());
    } catch (e) {
      log('Error connecting to live session: $e');
      onError('Failed to start the call. Please try again.');
    }
  }

  Future<void> close() async {
    if (!_liveSessionIsOpen) return;
    try {
      await _session.close();
    } catch (e) {
      log('Error closing live session: $e');
      // Don't necessarily need to show an error to the user on close.
    } finally {
      _liveSessionIsOpen = false;
    }
  }

  bool get isSessionOpen => _liveSessionIsOpen;

  void sendMediaStream(Stream<InlineDataPart> stream) {
    if (!_liveSessionIsOpen) return;
    _session.sendMediaStream(stream);
  }

  Future<void> processMessagesContinuously() async {
    try {
      await for (final response in _session.receive()) {
        LiveServerMessage message = response.message;
        await _handleLiveServerMessage(message);
      }
      log('Live session receive stream completed.');
    } catch (e) {
      log('Error receiving live session messages: $e');
      onError('Something went wrong during the call. Please try again.');
    }
  }

  Future<void> _handleLiveServerMessage(LiveServerMessage response) async {
    if (response is LiveServerContent) {
      if (response.modelTurn != null) {
        await _handleLiveServerContent(response);
      }
      if (response.turnComplete != null && response.turnComplete!) {
        await _handleTurnComplete();
      }
      if (response.interrupted != null && response.interrupted!) {
        log('Interrupted: $response');
      }
    }

    if (response is LiveServerToolCall && response.functionCalls != null) {
      await _handleLiveServerToolCall(response);
    }
  }

  Future<void> _handleLiveServerContent(LiveServerContent response) async {
    final partList = response.modelTurn?.parts;
    if (partList != null) {
      for (final part in partList) {
        switch (part) {
          case TextPart textPart:
            await _handleTextPart(textPart);
          case InlineDataPart inlineDataPart:
            await _handleInlineDataPart(inlineDataPart);
          default:
            log('Received part with type ${part.runtimeType}');
        }
      }
    }
  }

  Future<void> _handleInlineDataPart(InlineDataPart part) async {
    if (part.mimeType.startsWith('audio')) {
      _audioOutput.addDataToAudioStream(part.bytes);
    }
  }

  Future<void> _handleTextPart(TextPart part) async {
    log('Text message from Gemini: ${part.text}');
  }

  Future<void> _handleTurnComplete() async {
    log('Model is done generating. Turn complete!');
    final halfSecondOfSilence = Uint8List(24000);
    _audioOutput.addDataToAudioStream(halfSecondOfSilence);
  }

  Future<void> _handleLiveServerToolCall(LiveServerToolCall response) async {
    var functionCalls = response.functionCalls;
    if (functionCalls == null || functionCalls.isEmpty) return;

    // The API currently only supports one function call per turn.
    var functionCall = functionCalls.first;
    log("Gemini made a function call: ${functionCall.name}");

    switch (functionCall.name) {
      case 'GenerateImage':
        await _handleGenerateImage(functionCall);
        break;
      case 'SetAppColor':
        _handleSetAppColor(functionCall);
        break;
      default:
        log('Unknown function call: ${functionCall.name}');
    }
  }

  Future<void> _handleGenerateImage(FunctionCall functionCall) async {
    onImageLoadingChange(true);
    try {
      final imageDescription = functionCall.args['description']?.toString();
      if (imageDescription == null) {
        onError('Image generation failed: No description provided.');
        return;
      }
      final image = await ImageGenerationService().generateImage(
        imageDescription,
      );
      onImageGenerated(image);
    } catch (e) {
      log('Error generating image: $e');
      onError('Sorry, the image could not be generated.');
    } finally {
      onImageLoadingChange(false);
    }
  }

  void _handleSetAppColor(FunctionCall functionCall) {
    try {
      final red = functionCall.args['red']! as int;
      final green = functionCall.args['green']! as int;
      final blue = functionCall.args['blue']! as int;
      final newSeedColor = Color.fromRGBO(red, green, blue, 1);
      _ref.read(appStateProvider).setAppColor(newSeedColor);
    } catch (e) {
      log('Error setting app color from tool call: $e');
      onError('Sorry, there was an error applying the color.');
    }
  }

  void dispose() {
    if (_liveSessionIsOpen) {
      unawaited(close());
    }
  }
}
