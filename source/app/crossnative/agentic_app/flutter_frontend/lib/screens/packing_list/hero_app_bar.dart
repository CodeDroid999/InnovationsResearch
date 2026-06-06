import 'package:flutter/material.dart';
import '../../settings/styles.dart';

/// A custom SliverAppBar that displays a background image with a title.
///
/// This app bar is designed to be used within a [NestedScrollView]. It features
/// an image loaded from [imageUrl] that fills the expanded space. As the user
/// scrolls, the app bar collapses to a standard height, pinning the [title]
/// widget to the top. A gradient overlay ensures the title is readable against
/// the background image when expanded.
class HeroAppBar extends StatelessWidget {
  const HeroAppBar({required this.title, required this.imageUrl, super.key});

  /// The widget to display as the title, which remains visible when collapsed.
  final Widget title;

  /// The URL of the image to display in the expanded background.
  final String imageUrl;

  @override
  Widget build(BuildContext context) {
    return SliverAppBar(
      actionsPadding: EdgeInsets.zero,
      pinned: true,
      expandedHeight: heroAppBarHeight,
      backgroundColor: Theme.of(context).colorScheme.surface,
      flexibleSpace: FlexibleSpaceBar(
        title: title,
        background: Stack(
          children: [
            SizedBox(
              height: 350,
              width: double.infinity,
              child: Image.network(
                loadingBuilder: (
                  BuildContext context,
                  Widget child,
                  ImageChunkEvent? loadingProgress,
                ) {
                  if (loadingProgress == null) return child;
                  return Center(
                    child: CircularProgressIndicator(
                      value:
                          loadingProgress.expectedTotalBytes != null
                              ? loadingProgress.cumulativeBytesLoaded /
                                  loadingProgress.expectedTotalBytes!
                              : null,
                    ),
                  );
                },
                // Shows an error message if the image fails to load.
                errorBuilder: (
                  BuildContext context,
                  Object exception,
                  StackTrace? stackTrace,
                ) {
                  return Center(child: Text('Failed to load image'));
                },
                fit: BoxFit.cover,
                imageUrl,
              ),
            ),
            // Container for the gradient overlay.
            Container(
              height: 350,
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.bottomCenter,
                  end: Alignment.topCenter,
                  colors: [
                    Theme.of(context).colorScheme.surface,
                    Theme.of(context).colorScheme.surface.withAlpha(0),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
