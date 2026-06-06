import 'dart:convert';
import 'package:flutter_app/models/order_confirmation_model.dart';
import 'package:http/http.dart' as http;
import './models/item_model.dart';
import './settings/config.dart';
import './models/packing_list_model.dart';

/// A utility class responsible for interacting with the backend Genkit flows.
///
/// This class provides static methods to make HTTP POST requests to specific
/// Genkit flow endpoints (`packingHelperFlow`, `purchaseFlow`). It handles
/// JSON encoding of request data, sending the request, and decoding the
/// JSON response into corresponding data models ([PackingListModel],
/// [OrderConfirmationModel]). Basic error handling for network issues and
/// non-successful HTTP status codes is included.
class Genkit {
  // Private constant map defining the HTTP headers required for the API calls.
  static const Map<String, String> _headers = {
    'content-type': 'application/json',
  };

  /// Calls the 'packingHelperFlow' endpoint on the Genkit server.
  ///
  /// Sends the trip [location], [lengthOfStay], and packing [preferences]
  /// to the backend. Parses the JSON response into a [PackingListModel].
  static Future<PackingListModel> packingHelperFlow(
    String location,
    int lengthOfStay,
    String preferences,
  ) async {
    var url = Uri.http(genkitServerEndpoint, 'packingHelperFlow');

    var body = json.encode({
      'data': {
        "location": location,
        "numberOfDays": lengthOfStay,
        "preferences": preferences,
      },
    });

    http.Response response;

    try {
      response = await http.post(url, body: body, headers: _headers);
    } catch (e) {
      // Handle network errors or other exceptions
      throw Exception('Failed to make network call: $e');
    }

    if (response.statusCode == 200) {
      return PackingListModel.fromJson(response.body);
    } else {
      // Handle non-200 status codes (e.g., 404, 500)
      throw Exception(
        'Server responded with a non-200 status code: ${response.statusCode}',
      );
    }
  }

  /// Calls the 'purchaseFlow' endpoint on the Genkit server.
  ///
  /// Sends a list of [items] (specifically their name and quantity) to be
  /// "purchased" by the backend. Parses the JSON response into an
  /// [OrderConfirmationModel].
  static Future<OrderConfirmationModel> purchaseFlow(List<Item> items) async {
    var url = Uri.http(genkitServerEndpoint, 'purchaseFlow');

    // Encode the list of items (name and quantity only) into a JSON string.
    var body = json.encode({
      'data': {
        "items":
            items
                .map((item) => {'name': item.name, 'quantity': item.quantity})
                .toList(),
      },
    });

    http.Response response;

    try {
      response = await http.post(url, body: body, headers: _headers);
    } catch (e) {
      // Handle network errors or other exceptions
      throw Exception('Failed to make network call: $e');
    }

    if (response.statusCode == 200) {
      return OrderConfirmationModel.fromJson(response.body);
    } else {
      // Handle non-200 status codes (e.g., 404, 500)
      throw Exception(
        'Server responded with a non-200 status code: ${response.statusCode}',
      );
    }
  }
}
