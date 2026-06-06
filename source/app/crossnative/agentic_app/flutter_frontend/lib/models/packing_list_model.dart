import './item_model.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:convert';
import '../genkit.dart';
import '../models/order_confirmation_model.dart';

/// Manages the state for the packing list screen.
///
/// Holds information about the trip destination, duration, weather,
/// a generated list of [Item]s to pack, and tracks the packing progress
/// ([totalQuantity] vs [totalPacked]). It uses [ChangeNotifier] to notify
/// listeners (like the UI) when the packing state changes.
class PackingListModel extends ChangeNotifier {
  String locationCity;
  String locationState;
  int lengthOfStay;
  String heroImageUrl;
  String weatherForecast;
  List<Item> items;
  int totalQuantity;
  int totalPacked;

  PackingListModel({
    required this.locationCity,
    required this.locationState,
    required this.lengthOfStay,
    required this.heroImageUrl,
    required this.weatherForecast,
    required this.items,
    this.totalQuantity = 0,
    this.totalPacked = 0,
  });

  /// Asynchronously loads packing list data by calling the Genkit API.
  ///
  /// Takes the location, stay duration, and user preferences as input.
  /// Returns a future that completes with a [PackingListModel] instance.
  /// Throws an exception if the API call fails.
  static Future<PackingListModel> load(
    String locationName,
    int lengthOfStay,
    String preferences,
  ) async {
    try {
      var packingList = await Genkit.packingHelperFlow(
        locationName,
        lengthOfStay,
        preferences,
      );
      return packingList;
    } catch (e) {
      throw Exception('Unable to load packing list. : $e');
    }
  }

  factory PackingListModel.fromJson(String responseBody) {
    var decodedBody = json.decode(responseBody);

    if (decodedBody is! Map<String, dynamic> ||
        !decodedBody.containsKey('result')) {
      throw Exception('Invalid response format: missing "result" key');
    }

    var result = decodedBody['result'] as Map<String, dynamic>;

    // Get hero image
    if (result['heroImage'] is! String) {
      throw Exception('Invalid response format: "heroImage" is not a string');
    }
    var heroImageUrl = result['heroImage'] as String;

    // Get weather forecast
    if (result['weather'] is! String) {
      throw Exception('Invalid response format: "weather" is not a string');
    }
    var weatherForecast = result['weather'] as String;

    // Get location
    if (result['location'] is! Map<String, dynamic>) {
      throw Exception('Invalid response format: "location" is not a map');
    }
    var locationData = result['location'] as Map<String, dynamic>;
    if (locationData['city'] is! String || locationData['state'] is! String) {
      throw Exception(
        'Invalid response format: "location" does not contain valid "city" or "state"',
      );
    }
    var city = locationData['city'] as String;
    var state = locationData['state'] as String;

    // Get length of stay
    if (result['lengthOfStay'] is! int) {
      throw Exception('Invalid response format: "lengthOfStay" is not an int');
    }
    var lengthOfStay = result['lengthOfStay'] as int;

    // Get checklist
    if (result['checklist'] is! Map<String, dynamic>) {
      throw Exception('Invalid response format: "checklist" is not a map');
    }
    var checklist = result['checklist'] as Map<String, dynamic>;

    if (checklist['items'] is! List<dynamic>) {
      throw Exception('Invalid response format: "items" is not a list');
    }
    var itemsContent = checklist['items'] as List<dynamic>;
    var totalQuantity = 0;
    var items =
        itemsContent.map((itemJson) {
          if (itemJson is! Map<String, dynamic>) {
            throw Exception('Invalid response format: item is not a map');
          }
          Item newItem = Item.fromJson(itemJson);
          totalQuantity += newItem.quantity;
          return newItem;
        }).toList();

    return PackingListModel(
      locationCity: city,
      locationState: state,
      lengthOfStay: lengthOfStay,
      heroImageUrl: heroImageUrl,
      weatherForecast: weatherForecast,
      items: items,
      totalQuantity: totalQuantity,
    );
  }

  /// Initiates an order for items that have not yet been packed.
  ///
  /// Filters the [items] list for unpacked items and calls the Genkit API
  /// to place an order. Returns a future that completes with an
  /// [OrderConfirmationModel] if the order is successful and items were ordered,
  /// otherwise returns null.
  Future<OrderConfirmationModel?> orderRemaining() async {
    var unpackedItems = items.where((item) => !item.packed).toList();
    if (unpackedItems.isEmpty) {
      return null;
    }
    var orderConfirmation = await Genkit.purchaseFlow(unpackedItems);
    return orderConfirmation;
  }

  /// Toggles the packed status of an item at the specified [index].
  ///
  /// Updates the [totalPacked] count based on the item's quantity and
  /// notifies listeners of the change.
  void togglePacked(int index) {
    // Don't have any items
    if (items.isEmpty) {
      debugPrint('Items list is null. Cannot toggle packed status.');
      return;
    }
    // index is out of bounds
    if (index < 0 || index >= items.length) {
      debugPrint('Invalid index: $index. Cannot toggle packed status.');
      return;
    }

    num packedDifferential = items[index].togglePacked();
    totalPacked += packedDifferential.toInt();
    notifyListeners();
  }
}
