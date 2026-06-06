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

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import '../../../shared/ui/app_spacing.dart';
import 'camera_previews.dart';
import 'sound_waves.dart';

class LiveApiBody extends StatelessWidget {
  const LiveApiBody({
    super.key,
    required this.cameraIsActive,
    this.cameraController,
    required this.settingUpLiveSession,
    required this.loadingImage,
  });

  final bool cameraIsActive;
  final CameraController? cameraController;
  final bool settingUpLiveSession;
  final bool loadingImage;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: cameraIsActive && cameraController != null
              ? Center(child: FullCameraPreview(controller: cameraController!))
              : CenterCircle(
                  child: Padding(
                    padding: const EdgeInsets.all(AppSpacing.s60),
                    child: settingUpLiveSession
                        ? const CircularProgressIndicator()
                        : Image.asset('assets/gemini-logo.png'),
                  ),
                ),
        ),
        if (loadingImage)
          const Column(
            children: [
              Text('Beep. Boop. Bop. Generating your image...'),
              SizedBox.square(dimension: AppSpacing.s8),
              LinearProgressIndicator(semanticsLabel: 'Generating image...'),
            ],
          ),
      ],
    );
  }
}
