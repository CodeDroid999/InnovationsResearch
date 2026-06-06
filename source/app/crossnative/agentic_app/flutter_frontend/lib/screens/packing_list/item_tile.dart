import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../settings/styles.dart';
import '../../settings/theme.dart';
import '../../models/packing_list_model.dart';
import '../../models/item_model.dart';

/// A widget that displays a single item in the packing list.
///
/// It uses an [ExpansionTile] to show the item's name and quantity,
/// with a checkbox to mark it as packed. Expanding the tile reveals
/// optional notes and associated dates for the item.
class ItemTile extends StatelessWidget {
  const ItemTile({required this.itemIndex, required this.item, super.key});

  /// The index of this item within the packing list. Used to update its state.
  final int itemIndex;

  /// The data model representing the packing list item to display.
  final Item item;

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      // Leading widget displays the item quantity.
      leading: Text(
        style: GoogleFonts.caveat(fontSize: 36),
        item.quantity.toString(),
      ),
      // Title displays the item name. It's struck through if the item is packed.
      title: Text(
        item.name,
        style: GoogleFonts.caveat(
          fontSize: 28,
          decoration: item.packed ? TextDecoration.lineThrough : null,
        ),
      ),
      // Trailing checkbox allows toggling the packed status via the PackingListModel.
      trailing: Checkbox(
        value: item.packed,
        onChanged:
            (_) => context.read<PackingListModel>().togglePacked(itemIndex),
      ),
      // Subtitle indicates if the item is optional. Also struck through if packed.
      subtitle:
          item.optional
              ? Text(
                style: TextStyle(
                  fontSize: 20,
                  decoration: item.packed ? TextDecoration.lineThrough : null,
                ),
                'optional',
              )
              : null,
      // Content shown when the tile is expanded.
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: Size.l, vertical: Size.xs),
          child: Column(
            children: [
              // Display notes if they exist.
              if (item.notes.isNotEmpty)
                Padding(
                  padding: EdgeInsets.only(bottom: Size.m),
                  child: Text(style: paragraphStyle, item.notes),
                ),
              // Display associated dates as chips.
              WrappedChips(values: item.dates),
            ],
          ),
        ),
      ],
    );
  }
}

/// A widget that displays a list of strings as [Chip] widgets within a [Wrap] layout.
///
/// The chips will wrap onto the next line if there isn't enough horizontal space.
class WrappedChips extends StatelessWidget {
  const WrappedChips({required this.values, super.key});

  /// The list of string values to be displayed as individual chips.
  final List<String> values;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      children:
          values
              .map(
                (e) => Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal: Size.s,
                    vertical: Size.xs,
                  ),
                  child: Chip(
                    color: WidgetStateProperty.all(offWhite),
                    label: Text(
                      style: TextStyle(fontSize: Size.m),
                      e.toString(),
                    ),
                  ),
                ),
              )
              .toList(),
    );
  }
}
