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

class BottomBar extends StatelessWidget {
  const BottomBar({required this.children, super.key});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(
              color: Theme.of(context).colorScheme.surfaceContainer,
            ),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.s16),
          child: Row(children: children),
        ),
      ),
    );
  }
}

class FlipCameraButton extends StatelessWidget {
  const FlipCameraButton({this.onPressed, super.key});

  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(AppSpacing.s4),
      child: IconButton.filledTonal(
        onPressed: onPressed,
        icon: const Padding(
          padding: EdgeInsets.all(AppSpacing.s4),
          child: Icon(Icons.flip_camera_ios_outlined),
        ),
      ),
    );
  }
}

class VideoButton extends StatelessWidget {
  const VideoButton({required this.isActive, this.onPressed, super.key});

  final bool isActive;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(AppSpacing.s4),
      child: IconButton.filledTonal(
        style: isActive
            ? ButtonStyle(
                backgroundColor: WidgetStateProperty.all(
                  const Color.fromARGB(240, 238, 255, 244),
                ),
                iconColor: WidgetStateProperty.all(Colors.black87),
              )
            : const ButtonStyle(backgroundColor: null),
        onPressed: onPressed,
        icon: const Padding(
          padding: EdgeInsets.all(AppSpacing.s4),
          child: Icon(Icons.video_call_rounded),
        ),
      ),
    );
  }
}

class MuteButton extends StatelessWidget {
  const MuteButton({required this.isMuted, this.onPressed, super.key});

  final bool isMuted;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(AppSpacing.s4),
      child: IconButton.filledTonal(
        style: ButtonStyle(
          backgroundColor: WidgetStateProperty.all(
            isMuted ? null : const Color.fromARGB(240, 238, 255, 244),
          ),
        ),
        onPressed: onPressed,
        icon: Padding(
          padding: const EdgeInsets.all(AppSpacing.s4),
          child: isMuted
              ? const Icon(Icons.mic_off)
              : const Icon(color: Colors.black87, Icons.mic_none),
        ),
      ),
    );
  }
}

class CallButton extends StatelessWidget {
  const CallButton({required this.isActive, this.onPressed, super.key});

  final bool isActive;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(AppSpacing.s4),
      child: IconButton.filledTonal(
        style: ButtonStyle(
          backgroundColor: WidgetStateProperty.all(
            isActive
                ? const Color.fromARGB(255, 199, 39, 27)
                : Colors.green[500],
          ),
        ),
        onPressed: onPressed,
        icon: Padding(
          padding: const EdgeInsets.all(AppSpacing.s4),
          child: Icon(isActive ? Icons.phone_disabled_outlined : Icons.phone),
        ),
      ),
    );
  }
}
