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

import 'dart:io';
import 'dart:developer';
import 'package:cross_file/cross_file.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:mime/mime.dart';
import '../../../shared/ui/app_spacing.dart';
import '../models/attachment.dart';

const List<String> imageFileTypes = ['png', 'jpeg', 'webp', 'jpg'];
const List<String> videoFileTypes = [
  'flv',
  'mov',
  'mpeg',
  'mpegps',
  'mpg',
  'mp4',
  'webm',
  'wmv',
  '3gpp',
];
const List<String> audioFileTypes = [
  'aac',
  'flac',
  'mp3',
  'm4a',
  'mpeg',
  'mpga',
  'mp4',
  'opus',
  'pcm',
  'wav',
  'webm',
];
const List<String> textFileTypes = ['pdf', 'txt'];

class FilePickerService {
  Future<Attachment?> pickFile(BuildContext context) async {
    final String? source = await _showFileSourcePicker(context);
    if (source == null) return null;

    final FilePickerResult? result = await _pickFileFromSource(source);
    if (result == null) return null;

    return _processFilePickerResult(result);
  }

  Future<String?> _showFileSourcePicker(BuildContext context) async {
    return await showModalBottomSheet(
      backgroundColor: Theme.of(context).colorScheme.surfaceContainerHighest,
      context: context,
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(AppSpacing.s8),
          child: SizedBox(
            height: 240,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.s16,
                    vertical: AppSpacing.s8,
                  ),
                  child: Text(
                    style: Theme.of(context).textTheme.titleLarge,
                    'File selection',
                  ),
                ),
                const Divider(),
                if (!kIsWeb && Platform.isIOS)
                  ListTile(
                    leading: const Icon(size: 24, Icons.photo_library_rounded),
                    onTap: () {
                      Navigator.pop(context, 'Library');
                    },
                    title: Padding(
                      padding: const EdgeInsets.only(left: AppSpacing.s8),
                      child: Text(
                        style: Theme.of(context).textTheme.titleMedium,
                        'Photos and videos',
                      ),
                    ),
                  ),
                ListTile(
                  leading: const Icon(size: 24, Icons.folder),
                  onTap: () {
                    Navigator.pop(context, 'Files');
                  },
                  title: Padding(
                    padding: const EdgeInsets.only(left: AppSpacing.s8),
                    child: Text(
                      style: Theme.of(context).textTheme.titleMedium,
                      'Browse files',
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Future<FilePickerResult?> _pickFileFromSource(String source) async {
    if (source == 'Files') {
      return await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: [
          ...audioFileTypes,
          ...imageFileTypes,
          ...videoFileTypes,
          ...textFileTypes,
        ],
      );
    } else {
      return await FilePicker.platform.pickFiles(type: FileType.media);
    }
  }

  Future<Attachment?> _processFilePickerResult(FilePickerResult result) async {
    var file = XFile(result.files.single.path!);
    String fileName = result.files.single.name;
    Uint8List fileBytes = await file.readAsBytes();
    String? mimeType = lookupMimeType(
      fileName,
      headerBytes: fileBytes.sublist(0, 10),
    );

    if (mimeType != null) {
      return Attachment(
        fileName: fileName,
        mimeType: mimeType,
        fileBytes: fileBytes,
      );
    } else {
      // Could not determine the file type.
      log('Could not determine MIME type for ${file.path}');
    }
    return null;
  }
}
