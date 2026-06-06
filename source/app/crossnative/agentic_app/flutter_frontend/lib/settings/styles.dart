import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import './theme.dart';

/// Defines reusable text styles, common sizes, and layout constants for the application.
///
/// This file centralizes typography definitions using specific Google Fonts
/// (`Inter`, `Caveat Brush`) and custom styles (`userInputStyle`, `headerStyle`, etc.).
/// It also provides a `Size` class with static getters for consistent spacing
/// values (e.g., `Size.m` for medium padding) and defines layout constants
/// like `heroAppBarHeight`.

// --- Text Style Definitions ---
TextStyle inter16 = GoogleFonts.inter(fontSize: 16);

TextStyle inter16Bold = GoogleFonts.inter(
  fontSize: 16,
  fontWeight: FontWeight.bold,
);

TextStyle userInputStyle28 = TextStyle(
  fontWeight: FontWeight.bold,
  fontSize: 28,
  color: orange,
);

TextStyle userInputStyle48 = TextStyle(
  fontWeight: FontWeight.bold,
  fontSize: 48,
  color: orange,
);

TextStyle headerStyle = TextStyle(
  fontFamily: GoogleFonts.caveatBrush().fontFamily,
  color: Color(0xffFFAB5B),
  fontSize: 48,
  fontWeight: FontWeight.bold,
  height: 0,
);

TextStyle subheaderStyle = TextStyle(
  fontFamily: GoogleFonts.caveatBrush().fontFamily,
  fontSize: 32,
  fontWeight: FontWeight.bold,
);

TextStyle paragraphStyle = GoogleFonts.inter(fontSize: 16);

// --- Layout Constants ---
final double heroAppBarHeight = 180.0;

/// --- Sizing Constants ---
/// A utility class providing static getters for common spacing and sizing values.
/// This promotes consistency in padding, margins, and SizedBox dimensions.
class Size {
  static double get xs => 4;
  static double get s => 8;
  static double get m => 16;
  static double get l => 24;
  static double get xl => 32;
  static double get xxl => 36;
}
