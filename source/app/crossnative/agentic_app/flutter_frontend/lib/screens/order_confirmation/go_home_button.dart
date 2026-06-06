import 'package:flutter/material.dart';
import '../../settings/styles.dart';

/// A button widget designed to navigate the user back to the initial route
/// (the home screen) of the application.
///
/// This widget displays a `FloatingActionButton.extended` with a home icon
/// and the text "Great! Go back to main menu.". It uses the primary
/// color scheme from the current theme for its background and foreground.
///
/// When tapped, it pops routes from the navigation stack until it reaches
/// the very first route (`route.isFirst`).
class GoHomeButton extends StatelessWidget {
  const GoHomeButton({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.all(Size.m),
        child: FloatingActionButton.extended(
          backgroundColor: Theme.of(context).colorScheme.primary,
          foregroundColor: Theme.of(context).colorScheme.onPrimary,
          onPressed:
              () => Navigator.of(context).popUntil((route) => route.isFirst),
          icon: Icon(Icons.home),
          label: Text(
            style: TextStyle(fontSize: 24),
            'Great! Go back to main menu.',
          ),
        ),
      ),
    );
  }
}
