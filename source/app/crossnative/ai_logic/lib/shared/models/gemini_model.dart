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

import 'package:firebase_ai/firebase_ai.dart';
import '../../../shared/function_calling/tools.dart';

var geminiModels = GeminiModels();

class GeminiModel {
  final String name;
  final String description;
  final GenerativeModel model;
  final String defaultPrompt;

  GeminiModel({
    required this.name,
    required this.description,
    required this.model,
    required this.defaultPrompt,
  });
}

class GeminiModels {
  String selectedModelName = 'gemini-2.5-flash-image-preview';
  GeminiModel get selectedModel => models[selectedModelName]!;

  /// A map of Gemini models that can be used in the Chat Demo.
  Map<String, GeminiModel> models = {
    'gemini-2.5-flash': GeminiModel(
      name: 'gemini-2.5-flash',
      description:
          'Our thinking model that offers great, well-rounded capabilities. It\'s designed to offer a balance between price and performance.',
      model: FirebaseAI.googleAI().generativeModel(
        model: 'gemini-2.5-flash',
        tools: [
          Tool.functionDeclarations([setAppColorTool, generateImageTool]),
        ],
        generationConfig: GenerationConfig(
          responseModalities: [ResponseModalities.text],
        ),
      ),
      defaultPrompt: 'Hey Gemini! Can you set the app color to purple?',
    ),
    'gemini-2.5-flash-image': GeminiModel(
      name: 'gemini-2.5-flash-image',
      description:
          'Our standard Flash model upgraded for rapid creative workflows with image generation and conversational, multi-turn editing capabilities.',
      model: FirebaseAI.googleAI().generativeModel(
        model: 'gemini-2.5-flash-image',
        generationConfig: GenerationConfig(
          responseModalities: [
            ResponseModalities.text,
            ResponseModalities.image,
          ],
        ),
      ),
      defaultPrompt:
          'Hot air balloons rising over the San Francisco Bay at golden hour '
          'with a view of the Golden Gate Bridge. Make it anime style.',
    ),
    'gemini-3-pro-image-preview': GeminiModel(
      name: 'gemini-3-pro-image-preview',
      description:
          'Gemini 3 Pro Image (aka nano banana pro). Designed for professional '
          'asset production and complex instructions. It features real-world '
          'grounding using Google Search, a default "Thinking" process that '
          'refines composition prior to generation, and can generate images of up to 4K resolution.',
      model: FirebaseAI.googleAI().generativeModel(
        model: 'gemini-3-pro-image-preview',
        generationConfig: GenerationConfig(
          responseModalities: [
            ResponseModalities.text,
            ResponseModalities.image,
          ],
        ),
      ),
      defaultPrompt:
          'Hot air balloons rising over the San Francisco Bay at golden hour '
          'with a view of the Golden Gate Bridge. Make it anime style.',
    ),
  };

  GeminiModel selectModel(String modelName) {
    if (models.containsKey(modelName)) {
      selectedModelName = modelName;
    } else {
      throw Exception('Model $modelName not found');
    }
    return selectedModel;
  }

  List<String> get modelNames => models.keys.toList();
  GeminiModel operator [](String name) => models[name]!;
}
