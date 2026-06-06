/// Represents a single item to be packed for a trip.
///
/// Contains details like the item's name, quantity, associated dates (if any),
/// whether it's optional, any notes, and its current packed status.
class Item {
  final List<String> dates;
  final String name;
  final bool optional;
  final int quantity;
  final String notes;
  bool packed;

  Item({
    required this.dates,
    required this.name,
    required this.optional,
    required this.quantity,
    this.notes = '',
    this.packed = false,
  });

  factory Item.fromJson(Map<String, dynamic> json) {
    final List<dynamic>? datesJson = json['dates'] as List<dynamic>?;
    final List<String> dates =
        datesJson?.map((date) => date.toString()).toList() ?? [];
    var name = json['name'] ?? '';
    var optional = json['optional'] as bool? ?? false;
    var quantity = json['quantity'] as int? ?? 0;
    var notes = json['notes'] as String? ?? '';

    return Item(
      dates: dates,
      name: name,
      optional: optional,
      quantity: quantity,
      notes: notes,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'dates': dates,
      'name': name,
      'optional': optional,
      'quantity': quantity,
      'notes': notes,
    };
  }

  /// Toggles the [packed] status of the item.
  ///
  /// Returns the quantity if the item is packed, or the negative quantity
  /// if it is unpacked. This is used to update the running total of packed items.
  num togglePacked() {
    packed = !packed;
    return packed ? quantity : -quantity;
  }
}
