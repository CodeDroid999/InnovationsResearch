import 'package:flutter/material.dart';
import '../../settings/styles.dart';

/// A styled [ElevatedButton] with an icon and text ("Get my packing list").
///
/// This button is used at the end of the traveler input form.
/// When pressed, it executes the provided [onPressed] callback, which
/// contains the logic to validate the form input and initiate the
/// process of fetching the packing list.
class GetPackingListButton extends StatelessWidget {
  const GetPackingListButton({required this.onPressed, super.key});

  /// The [onPressed] callback is required and defines the action to perform
  /// when the button is tapped.
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(Size.l),
      child: ElevatedButton.icon(
        style: ButtonStyle(
          padding: WidgetStatePropertyAll(
            EdgeInsets.symmetric(vertical: Size.s, horizontal: Size.l),
          ),
          textStyle: WidgetStatePropertyAll(
            Theme.of(context).textTheme.displaySmall!.copyWith(fontSize: 18),
          ),
          foregroundColor: WidgetStatePropertyAll(
            Theme.of(context).colorScheme.onPrimary,
          ),
          backgroundColor: WidgetStatePropertyAll(
            Theme.of(context).colorScheme.primary,
          ),
        ),
        label: Text(style: TextStyle(fontSize: 24), 'Get my packing list'),
        onPressed: onPressed,
        icon: const Icon(Icons.luggage, size: 32),
      ),
    );
  }
}
