import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../settings/styles.dart';

/// Defines common, reusable UI widgets used throughout the application.
///
/// This includes widgets for titles (`MyPackingListTitle`, `PageTitle`),
/// subtitles (`PageSubtitle`), paragraph text (`ParagraphText`), and layout
/// helpers like consistent padding (`BodyWhitespace`).

/// A reusable widget that displays the application's main title, "My Packing List".
///
/// Often used in the [AppBar] widget.
class MyPackingListTitle extends StatelessWidget {
  const MyPackingListTitle({super.key});

  @override
  Widget build(BuildContext context) {
    return Text(
      'My Packing List',
      style: TextStyle(
        fontFamily: GoogleFonts.caveatBrush().fontFamily,
        fontSize: 32,
        fontWeight: FontWeight.bold,
        color: Theme.of(context).colorScheme.primary,
      ),
    );
  }
}

/// A simple wrapper widget that applies consistent horizontal and vertical padding
/// around its [child].
///
/// Uses the `Size.s` constant from `styles.dart` for the padding value, ensuring
/// uniform spacing for main body content areas across different screens.
class BodyWhitespace extends StatelessWidget {
  const BodyWhitespace({required this.child, super.key});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Padding(padding: EdgeInsets.all(Size.s), child: child);
  }
}

/// A widget for displaying a prominent page title, typically centered.
///
/// Applies the `headerStyle` from the application's `styles.dart` for consistent
/// large title formatting.
class PageTitle extends StatelessWidget {
  const PageTitle({required this.text, super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(textAlign: TextAlign.center, style: headerStyle, text);
  }
}

/// A widget for displaying a subtitle, often used below a [PageTitle].
///
/// Applies the `subheaderStyle` from the application's `styles.dart` and adds
/// vertical padding using `Size.m` for spacing.
class PageSubtitle extends StatelessWidget {
  const PageSubtitle({required this.text, super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: Size.s),
      child: Text(style: subheaderStyle, text),
    );
  }
}

/// A widget for displaying standard paragraph text content.
///
/// Applies the `paragraphStyle` from the application's `styles.dart` and adds
/// horizontal and vertical padding using `Size.m`. Useful for displaying
/// descriptive text blocks.
class ParagraphText extends StatelessWidget {
  const ParagraphText({required this.text, super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: Size.m, vertical: Size.xs),
      child: Text(style: paragraphStyle, text),
    );
  }
}
