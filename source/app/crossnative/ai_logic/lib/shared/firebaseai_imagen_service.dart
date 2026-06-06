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

import 'dart:developer';
import 'dart:typed_data';
import 'package:firebase_ai/firebase_ai.dart';

/// This service demonstrates how to use a Gemini Image model to generate images
/// from a text prompt. It showcases the text-to-image generation feature.
///
/// For more information, see the official documentation:
/// https://firebase.google.com/docs/ai-logic/generate-images-imagen?api=dev
///
/// This is a shared service, located in the /shared directory, because it is
/// used by multiple demos (Chat, Live API, and Imagen) to provide image
/// generation capabilities.
class ImageGenerationService {
  final _model = FirebaseAI.googleAI().generativeModel(
    model: 'gemini-2.5-flash-image-preview',
    generationConfig: GenerationConfig(
      responseModalities: [ResponseModalities.image],
    ),
  );

  /// Generates a single image from a text prompt.
  ///
  /// Throws an exception if the API call fails, allowing the UI to handle it.
  Future<Uint8List> generateImage(String prompt) async {
    try {
      final res = await _model.generateContent([Content.text(prompt)]);
      return res.inlineDataParts.first.bytes;
    } catch (e) {
      log('Error generating image: $e');
      rethrow;
    }
  }
}
