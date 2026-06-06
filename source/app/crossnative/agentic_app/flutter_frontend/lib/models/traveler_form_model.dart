import 'package:flutter/material.dart';

/// Manages the state for the traveler input form.
///
/// Holds the user's input for trip [location], [lengthOfStay], and any
/// packing [preferences]. It uses [ChangeNotifier] to allow UI elements
/// to react to changes in the form data (though not strictly necessary
/// if only used for validation and submission). Includes a [validate] method
/// to check for required fields.
class TravelerFormModel extends ChangeNotifier {
  String location;
  int lengthOfStay;
  String preferences;

  TravelerFormModel({
    this.location = '',
    this.lengthOfStay = 0,
    this.preferences = '',
  });

  /// Validates the form fields.
  ///
  /// Checks if the location is provided and if the length of stay is positive
  /// AND less than 16, due to OpenWeather API limitations.
  /// Returns a list of error messages; an empty list indicates the form is valid.
  List<String> validate() {
    List<String> errors = [];

    if (location.isEmpty) {
      errors.add('Where are you going? The location field can\'t be empty!');
    }

    if (lengthOfStay <= 0) {
      errors.add(
        'How long are you staying? The length of your stay has to be greater than 0!',
      );
    }

    // OpenWeather API only has forecast data for up to 5 days out.
    if (lengthOfStay > 5) {
      errors.add(
        'We can\'t get the weather forecast that far out! Please shorten the trip length.',
      );
    }

    return errors;
  }
}
