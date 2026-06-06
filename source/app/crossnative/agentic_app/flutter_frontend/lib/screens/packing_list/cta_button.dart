import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/packing_list_model.dart';
import '../../settings/styles.dart';
import '../order_confirmation/order_confirmation_screen.dart';

/// A conditional call-to-action widget displayed at the bottom of the packing list.
///
/// If there are [itemsRemaining] to be packed (greater than 0), it displays
/// the [BuyButton]. Otherwise, it displays the [AllPackedBanner].
class CTAButton extends StatelessWidget {
  const CTAButton({required this.itemsRemaining, super.key});

  /// The number of items that are not yet marked as packed.
  final int itemsRemaining;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child:
          itemsRemaining > 0
              ? BuyButton(itemQuantity: itemsRemaining)
              : AllPackedBanner(),
    );
  }
}

/// A button that allows the user to "purchase" the remaining unpacked items.
///
/// Displays a [FloatingActionButton.extended] showing the quantity of items
/// to be purchased. When tapped, it triggers the `purchaseRemainingItems`
/// function, which calls the backend API via [PackingListModel.orderRemaining],
/// shows a loading indicator, and navigates to the [OrderConfirmationScreen]
/// upon success.
class BuyButton extends StatefulWidget {
  const BuyButton({required this.itemQuantity, super.key});

  /// The number of remaining items to display on the button.
  final int itemQuantity;

  @override
  State<BuyButton> createState() => _BuyButtonState();
}

class _BuyButtonState extends State<BuyButton> {
  /// Tracks whether the purchase request is in progress.
  bool _loading = false;

  /// Initiates the purchase process for remaining items.
  ///
  /// Sets the loading state, calls the `orderRemaining` method on the
  /// [PackingListModel], handles navigation to the [OrderConfirmationScreen]
  /// if successful, catches potential errors, and resets the loading state.
  void purchaseRemainingItems(BuildContext context) async {
    setState(() {
      _loading = true;
    });
    try {
      // Call the model's method to initiate the order via the backend.
      var orderConfirmation =
          await context.read<PackingListModel>().orderRemaining();

      if (!context.mounted || orderConfirmation == null) return;

      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) {
            return OrderConfirmationScreen(
              orderConfirmation: orderConfirmation,
            );
          },
        ),
      );
    } catch (e) {
      debugPrint('Error: $e');

      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to order items. Please try again.')),
        );
      }
    } finally {
      setState(() {
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(Size.m),
      child:
          // Conditionally display loading or active button.
          _loading
              ? FloatingActionButton.extended(
                backgroundColor: Theme.of(context).colorScheme.primary,
                foregroundColor: Theme.of(context).colorScheme.onPrimary,
                onPressed: null,
                icon: CircularProgressIndicator(
                  color: Theme.of(context).colorScheme.onPrimary,
                ),
                label: Text(
                  style: TextStyle(fontSize: 24),
                  'Ordering ${widget.itemQuantity} items...',
                ),
              )
              : FloatingActionButton.extended(
                backgroundColor: Theme.of(context).colorScheme.primary,
                foregroundColor: Theme.of(context).colorScheme.onPrimary,
                onPressed: () => purchaseRemainingItems(context),
                icon: Icon(size: 32, Icons.shopping_bag_outlined),
                label: Text(
                  style: TextStyle(fontSize: 24),
                  'Buy ${widget.itemQuantity} remaining items',
                ),
              ),
    );
  }
}

/// A simple banner displayed when all items in the packing list are marked as packed.
///
/// Shows a celebratory message indicating that the user is ready for their trip.
class AllPackedBanner extends StatelessWidget {
  const AllPackedBanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(Size.m),
      height: 80,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            '🥳 All packed and ready to go! 🛫',
          ),
        ],
      ),
    );
  }
}
