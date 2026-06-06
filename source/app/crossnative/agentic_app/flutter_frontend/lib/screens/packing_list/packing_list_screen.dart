import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/packing_list_model.dart';
import '../../models/item_model.dart';
import '../components.dart';
import './cta_button.dart';
import './item_tile.dart';
import './hero_app_bar.dart';

/// A screen that displays the generated packing list for a trip.
///
/// It shows trip details like location, duration, and weather,
/// along with a scrollable list of packing items. Users can check off items
/// as they pack.
class PackingListScreen extends StatefulWidget {
  const PackingListScreen({super.key});

  @override
  State<PackingListScreen> createState() => _PackingListScreenState();
}

/// The state associated with the [PackingListScreen].
///
/// It fetches packing list data from the [PackingListModel] using Provider
/// and builds the UI accordingly.
class _PackingListScreenState extends State<PackingListScreen> {
  @override
  Widget build(BuildContext context) {
    // Watch the PackingListModel for changes and rebuild when necessary.
    var packingList = context.watch<PackingListModel>();

    // Extract data from the model for easier access.
    var location = '${packingList.locationCity}, ${packingList.locationState}';
    var lengthOfStay = '${packingList.lengthOfStay.toString()} days';
    var weather = packingList.weatherForecast;
    var items = packingList.items;
    var heroImageUrl = packingList.heroImageUrl;
    var itemsRemaining = packingList.totalQuantity - packingList.totalPacked;

    return Scaffold(
      body: NestedScrollView(
        headerSliverBuilder: (context, val) {
          return [
            HeroAppBar(title: MyPackingListTitle(), imageUrl: heroImageUrl),
          ];
        },
        body: BodyWhitespace(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              PageTitle(text: location),
              PageSubtitle(text: lengthOfStay),
              ParagraphText(text: weather),
              Expanded(
                // Build list of items to pack.
                child: ListView.builder(
                  padding: EdgeInsets.zero,
                  itemCount: items.length,
                  itemBuilder: (context, index) {
                    Item item = items[index];
                    // ItemTile is a custom widget to display a single packing item.
                    return ItemTile(itemIndex: index, item: item);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
      // Shows a button with remaining items count or a celebratory banner if everything is packed.
      bottomNavigationBar: CTAButton(itemsRemaining: itemsRemaining),
    );
  }
}
