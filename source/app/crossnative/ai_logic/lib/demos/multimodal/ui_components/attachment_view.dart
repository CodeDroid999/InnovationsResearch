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
import 'package:thumbnailer/thumbnailer.dart';
import '../../../shared/ui/app_spacing.dart';
import '../models/attachment.dart';

class AttachmentView extends StatelessWidget {
  final Attachment? attachment;

  const AttachmentView({super.key, this.attachment});

  @override
  Widget build(BuildContext context) {
    return attachment == null
        ? Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                size: 81,
                color: Theme.of(context).colorScheme.outline,
                Icons.attach_file,
              ),
              const SizedBox.square(dimension: AppSpacing.s16),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s16),
                child: Text(
                  'Select a file',
                  style: TextStyle(
                    fontSize: 16,
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          )
        : Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Thumbnail(
                decoration: WidgetDecoration(
                  wrapperSize: 90,
                  iconColor: Theme.of(context).colorScheme.primaryFixed,
                ),
                mimeType: attachment!.mimeType,
                onlyIcon: true,
                dataResolver: () async {
                  return attachment!.fileBytes;
                },
                widgetSize: 200,
              ),
              const SizedBox.square(dimension: AppSpacing.s16),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.s16),
                child: Text(
                  attachment!.fileName,
                  style: TextStyle(
                    fontSize: 16,
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          );
  }
}
