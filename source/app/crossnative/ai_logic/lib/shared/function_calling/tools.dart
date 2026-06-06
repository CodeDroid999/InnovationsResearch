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

final generateImageTool = FunctionDeclaration(
  'GenerateImage',
  'Generate an image by describing it.',
  parameters: {
    'description': Schema.string(
      description:
          'A description of the image that you want to generate. Be as specific as possible. More specific is better. Describe the contents of the image, the style, and any other specifics about the image that is to be generated.',
    ),
  },
);

final setAppColorTool = FunctionDeclaration(
  'SetAppColor',
  'Set the app color. You must pick a color that matches the hue that the user requests. When talking with the user, use a human-friendly description of the color instead of RGB values.',
  parameters: {
    'red': Schema.integer(
      description:
          "The desired app color's RGB RED channel value that can range from 0 to 46",
    ),
    'green': Schema.integer(
      description:
          "The desired app color's RGB GREEN channel value that can range from 0 to 46",
    ),
    'blue': Schema.integer(
      description:
          "The desired app color's RGB BLUE channel that can range from 0 to 46",
    ),
  },
);

// See "live_api" and "chat" demos for full implementation of function calling.
