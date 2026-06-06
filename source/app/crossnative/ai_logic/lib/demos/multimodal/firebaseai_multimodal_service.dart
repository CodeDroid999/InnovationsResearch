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
import 'package:firebase_ai/firebase_ai.dart';
import 'models/attachment.dart';

/// A service that handles all communication with the Firebase AI Gemini API
/// for the Multimodal demo.
///
/// This service demonstrates how to use the `generateContent()` method on a
/// `GenerativeModel` to provide multimodal input, combining text and file
/// data (like images or PDFs) in a single prompt.
///
/// For more informations, see the official documentation:
/// https://firebase.google.com/docs/ai-logic/generate-text?api=dev#base64
class MultimodalService {
  final _model = FirebaseAI.googleAI().generativeModel(
    model: 'gemini-2.5-flash',
  );

  /// Generates text content from a text prompt and a file attachment.
  ///
  /// Throws an exception if the API call fails.
  Future<String?> generateContent(String prompt, Attachment attachment) async {
    try {
      final attachmentPart = InlineDataPart(
        attachment.mimeType,
        attachment.fileBytes,
      );

      final response = await _model.generateContent([
        Content.multi([TextPart(prompt), attachmentPart]),
      ]);

      return response.text;
    } catch (e) {
      log('Error generating content: $e');
      rethrow;
    }
  }
}
