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

import 'package:flutter/material.dart';
import '../../../shared/ui/app_spacing.dart';
import '../models/attachment.dart';
import './attachment_view.dart';
import './dashed_border_painter.dart';

class FilePromptInput extends StatelessWidget {
  final TextEditingController promptController;
  final ExpansibleController tileController;
  final bool loading;
  final Attachment? attachment;
  final void Function() askGemini;
  final void Function(Attachment?) onAttachmentChanged;
  final VoidCallback onPickFilePressed;

  const FilePromptInput({
    super.key,
    required this.promptController,
    required this.tileController,
    required this.loading,
    required this.attachment,
    required this.askGemini,
    required this.onAttachmentChanged,
    required this.onPickFilePressed,
  });

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      controller: tileController,
      collapsedShape: RoundedSuperellipseBorder(
        borderRadius: BorderRadius.circular(AppSpacing.s16),
      ),
      shape: RoundedSuperellipseBorder(
        borderRadius: BorderRadius.circular(AppSpacing.s16),
      ),
      title: Text(
        style: Theme.of(context).textTheme.titleMedium,
        'File & Prompt',
      ),
      initiallyExpanded: true,
      collapsedBackgroundColor: Theme.of(context).colorScheme.primaryContainer,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(
            vertical: AppSpacing.s16,
            horizontal: AppSpacing.s24,
          ),
          child: Stack(
            children: [
              Center(
                child: GestureDetector(
                  onTap: onPickFilePressed,
                  child: CustomPaint(
                    painter: DashedBorderPainter(
                      color: Theme.of(context).colorScheme.outline,
                      strokeWidth: attachment == null ? 4 : 0,
                      radius: Radius.circular(AppSpacing.s16),
                    ),
                    child: Container(
                      width: 240,
                      height: 240,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(AppSpacing.s16),
                      ),
                      child: AttachmentView(attachment: attachment),
                    ),
                  ),
                ),
              ),
              if (attachment != null)
                Column(
                  children: [
                    Center(
                      child: SizedBox(
                        width: 240,
                        height: 240,
                        child: Align(
                          alignment: Alignment.topRight,
                          child: Padding(
                            padding: const EdgeInsets.all(AppSpacing.s8),
                            child: IconButton(
                              onPressed: () => onAttachmentChanged(null),
                              icon: Icon(
                                size: 32,
                                color: Theme.of(context).colorScheme.error,
                                Icons.close,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
            ],
          ),
        ),
        const SizedBox.square(dimension: AppSpacing.s24),
        Row(
          children: [
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(left: AppSpacing.s8),
                child: TextField(
                  decoration: InputDecoration(
                    label: const Text('Prompt'),
                    fillColor: Theme.of(context).colorScheme.onSecondaryFixed,
                    filled: true,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(AppSpacing.s16),
                    ),
                  ),
                  maxLines: 4,
                  controller: promptController,
                  enabled: !loading,
                  onTap: () {
                    promptController.selection = TextSelection(
                      baseOffset: 0,
                      extentOffset: promptController.text.length,
                    );
                  },
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(AppSpacing.s8),
              child: ElevatedButton(
                style: ButtonStyle(
                  shape: WidgetStateProperty.all(
                    RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(AppSpacing.s16),
                    ),
                  ),
                  backgroundColor: WidgetStatePropertyAll(
                    Theme.of(context).colorScheme.primaryContainer,
                  ),
                ),
                onPressed: loading ? null : askGemini,
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    vertical: AppSpacing.s24,
                    horizontal: 0,
                  ),
                  child: Column(
                    children: [
                      SizedBox(
                        width: 42,
                        height: 42,
                        child: Image.asset('assets/gemini-logo.png'),
                      ),
                      const SizedBox.square(dimension: AppSpacing.s4),
                      const Text(textAlign: TextAlign.center, 'Ask\nGemini'),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
