import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../settings/styles.dart';
import '../../models/traveler_form_model.dart';

/// A widget for capturing the user's travel destination.
///
/// Displays a text prompt and a single-line [TextFormField] where the user
/// can enter the location (e.g., "City, State" or "Country").
/// Updates the `location` field in the [TravelerFormModel].
class LocationInput extends StatelessWidget {
  const LocationInput({required this.controller, super.key});

  final TextEditingController controller;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: Size.m, horizontal: Size.xl),
      child: Column(
        children: [
          Text('Where are you going?', style: inter16Bold),
          TextFormField(
            controller: controller,
            textAlign: TextAlign.center,
            decoration: InputDecoration(hintText: 'Honolulu, Hawaii'),
            onChanged:
                (location) =>
                    context.read<TravelerFormModel>().location = location,
            style: userInputStyle28,
          ),
        ],
      ),
    );
  }
}

/// A widget for capturing the length of the user's trip in days.
///
/// Displays a text prompt and a numeric [TextFormField] constrained in width,
/// followed by the text "days". Updates the `lengthOfStay` field in the
/// [TravelerFormModel], parsing the input as an integer.
class TripLengthInput extends StatelessWidget {
  const TripLengthInput({required this.controller, super.key});

  /// The [TextEditingController] to manage the input field's text.
  final TextEditingController controller;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(Size.m),
      child: Column(
        children: [
          Text('How long is your trip?', style: inter16Bold),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                width: 50,
                child: TextFormField(
                  controller: controller,
                  textAlign: TextAlign.center,
                  style: userInputStyle48,
                  keyboardType: TextInputType.numberWithOptions(),
                  decoration: InputDecoration(
                    hintText: '3',
                    alignLabelWithHint: true,
                    contentPadding: EdgeInsets.zero,
                  ),
                  onChanged:
                      (days) =>
                          context.read<TravelerFormModel>().lengthOfStay =
                              int.tryParse(days) ?? 0,
                ),
              ),
              Text('days', style: TextStyle(fontSize: 32)),
            ],
          ),
        ],
      ),
    );
  }
}

/// A widget for capturing user preferences for their trip.
///
/// Displays a text prompt and a multi-line [TextFormField] where the user can
/// enter details like needing formal wear, specific activity gear, etc.
/// Updates the `preferences` field in the [TravelerFormModel].
class PreferencesInput extends StatelessWidget {
  const PreferencesInput({required this.controller, super.key});

  /// The [TextEditingController] to manage the input field's text.
  final TextEditingController controller;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: Size.m, horizontal: Size.xl),
      child: Column(
        children: [
          Text(
            style: inter16Bold,
            textAlign: TextAlign.center,
            'Requirements or preferences?',
          ),
          SizedBox.square(dimension: Size.s),
          Text(
            style: inter16,
            textAlign: TextAlign.center,
            'Let us know if you need to pack for formal events, activities, etc.',
          ),
          SizedBox.square(dimension: Size.m),
          TextFormField(
            decoration: InputDecoration(
              hintText: 'I like to wear Hawaiian shirts.',
              alignLabelWithHint: true,
              contentPadding: EdgeInsets.zero,
            ),
            controller: controller,
            maxLines: 2,
            textAlign: TextAlign.center,
            style: userInputStyle28,
            onChanged:
                (preferences) =>
                    context.read<TravelerFormModel>().preferences = preferences,
          ),
        ],
      ),
    );
  }
}
