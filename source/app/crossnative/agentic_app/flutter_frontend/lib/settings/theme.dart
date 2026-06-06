import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Defines the application's color palette and main theme configuration.
///
/// This file contains custom color definitions (`offWhite`, `moreOffWhite`,
/// `aquamarine`, `orange`) and constructs the primary `ThemeData` (`appTheme`)
/// used throughout the application. The theme sets default text styles using
/// Google Fonts and configures the color scheme, overriding the primary
/// and surface colors with custom values.

final offWhite = Color.fromARGB(255, 255, 245, 233);
final moreOffWhite = Color.fromARGB(255, 252, 243, 231);
final aquamarine = Color.fromARGB(255, 23, 124, 163);
final orange = Color.fromARGB(255, 223, 91, 3);

final appTheme = ThemeData(
  textTheme: GoogleFonts.caveatTextTheme(),
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.white,
    dynamicSchemeVariant: DynamicSchemeVariant.fidelity,
  ).copyWith(primary: aquamarine, surface: offWhite),
);
