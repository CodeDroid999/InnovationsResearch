import 'dart:convert';

/// Represents the confirmation details of an order placed for remaining unpacked items.
///
/// Contains a list of the [OrderItem]s that were ordered and the [totalPrice].
class OrderConfirmationModel {
  List<OrderItem> items;
  double totalPrice;

  OrderConfirmationModel({required this.items, required this.totalPrice});

  factory OrderConfirmationModel.fromJson(String responseBody) {
    var decodedBody = json.decode(responseBody);

    if (decodedBody is! Map<String, dynamic> ||
        !decodedBody.containsKey('result')) {
      throw Exception('Invalid response format: missing "result" key');
    }

    var result = decodedBody['result'] as Map<String, dynamic>;

    if (result['totalPrice'] is! double) {
      throw Exception('Invalid response format: "totalPrice" is not a double.');
    }

    var totalPrice = result['totalPrice'] as double;

    var itemsContent = result['orderedItems'] as List<dynamic>;
    var items =
        itemsContent.map((itemJson) {
          if (itemJson is! Map<String, dynamic>) {
            throw Exception('Invalid response format: item is not a map');
          }
          OrderItem newItem = OrderItem.fromJson(itemJson);
          return newItem;
        }).toList();

    return OrderConfirmationModel(items: items, totalPrice: totalPrice);
  }

  @override
  String toString() {
    return 'OrderConfirmationModel{items: $items, totalPrice: $totalPrice}';
  }
}

/// Represents a single item within a confirmed order.
///
/// Contains the item's [name], ordered [quantity], individual [price],
/// and the calculated [totalPrice] for that line item (quantity * price).
class OrderItem {
  String name;
  int quantity;
  double price;
  double totalPrice;

  OrderItem({
    required this.name,
    required this.quantity,
    required this.price,
    required this.totalPrice,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    String name = json['name'] as String;
    int quantity = json['quantity'] as int;
    double price = json['price'] as double;
    double totalPrice = json['totalPrice'] as double;
    return OrderItem(
      name: name,
      quantity: quantity,
      price: price,
      totalPrice: totalPrice,
    );
  }

  @override
  String toString() {
    return 'OrderItem{name: $name, quantity: $quantity, price: $price, totalPrice: $totalPrice}';
  }
}
