import 'package:flutter/material.dart';
import 'package:flutter_app/models/order_confirmation_model.dart';

import '../../settings/styles.dart';

/// A widget that displays a formatted receipt for an order.
///
/// It takes a list of [OrderItem]s and the [totalPrice] to render
/// a scrollable list including a thank you message, individual item details,
/// and the final total.
class Receipt extends StatelessWidget {
  const Receipt({required this.items, required this.totalPrice, super.key});

  /// The list of items included in the order.
  final List<OrderItem> items;

  /// The total calculated price for all items in the order.
  final double totalPrice;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.all(Size.m),
      children: [
        ThankYouMessage(),
        ...items.map((item) => ReceiptItem(item: item)),
        TotalPrice(totalPrice: totalPrice),
      ],
    );
  }
}

/// A widget displaying a centered thank you message.
class ThankYouMessage extends StatelessWidget {
  const ThankYouMessage({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: Size.m),
      child: Text(
        style: TextStyle(fontSize: 24),
        textAlign: TextAlign.center,
        'Hey, thanks for shopping with us!\nHave a great trip!',
      ),
    );
  }
}

/// A widget representing a single line item within the [Receipt].
///
/// Displays the quantity, name, individual price (if quantity > 1),
/// and total price (quantity * price) for the given [OrderItem].
class ReceiptItem extends StatelessWidget {
  const ReceiptItem({required this.item, super.key});

  /// The order item data to display.
  final OrderItem item;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: Size.s),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 36),
            '${item.quantity.toString()}x',
          ),
          SizedBox.square(dimension: Size.l),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                  style: TextStyle(
                    height: 0,
                    fontWeight: FontWeight.bold,
                    fontSize: 24,
                  ),
                  item.name,
                ),
                if (item.quantity > 1)
                  Text(
                    style: TextStyle(fontSize: 24),
                    '\$${item.price.toString()} ea.',
                  ),
              ],
            ),
          ),
          SizedBox.square(dimension: Size.m),
          Text(
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
            '\$${item.totalPrice.toString()}',
          ),
        ],
      ),
    );
  }
}

/// A widget to display the final total price at the end of the [Receipt].
///
/// Shows the text "Total: $X.XX" right-aligned.
class TotalPrice extends StatelessWidget {
  const TotalPrice({required this.totalPrice, super.key});

  /// The final total price to display.
  final double totalPrice;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: Size.m),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          Text(
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 32),
            'Total: \$$totalPrice',
          ),
        ],
      ),
    );
  }
}
