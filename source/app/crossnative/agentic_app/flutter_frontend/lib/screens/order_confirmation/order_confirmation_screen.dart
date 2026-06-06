import 'package:flutter/material.dart';
import 'package:flutter_app/models/order_confirmation_model.dart';
import 'package:flutter_app/screens/components.dart';
import 'package:flutter_app/settings/styles.dart';
import 'package:flutter_app/settings/theme.dart';
import './receipt.dart';
import './go_home_button.dart';

/// A screen widget that displays the details of a completed order.
///
/// This screen shows an AppBar with the title "Order Confirmation",
/// a [Receipt] widget in the body displaying the ordered items and total price,
/// and a [GoHomeButton] in the bottom navigation bar to allow the user
/// to easily return to the main menu.
///
/// Requires an [OrderConfirmationModel] containing the order details.
class OrderConfirmationScreen extends StatelessWidget {
  const OrderConfirmationScreen({required this.orderConfirmation, super.key});

  /// The data model containing the details of the confirmed order.
  final OrderConfirmationModel orderConfirmation;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          style: subheaderStyle.copyWith(color: orange),
          'Order Confirmation',
        ),
      ),
      body: BodyWhitespace(
        child: Receipt(
          items: orderConfirmation.items,
          totalPrice: orderConfirmation.totalPrice,
        ),
      ),
      bottomNavigationBar: GoHomeButton(),
    );
  }
}
