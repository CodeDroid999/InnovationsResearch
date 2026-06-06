import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'models/traveler_form_model.dart';
import 'settings/theme.dart';
import 'screens/traveler_form/traveler_form_screen.dart';

/// The main entry point for the Flutter application.
void main() {
  runApp(const MyPackingListApp());
}

class MyPackingListApp extends StatefulWidget {
  const MyPackingListApp({super.key});

  @override
  State<MyPackingListApp> createState() => _MyPackingListAppState();
}

/// The state associated with [MyPackingListApp].
///
/// This class builds the main UI structure using [MaterialApp], configuring the theme,
/// title, and initial navigation setup. It manages a [GlobalKey] for the
/// root [Navigator] and uses [ChangeNotifierProvider] to make the
/// [TravelerFormModel] available to the initial screen ([TravelerFormScreen]).
class _MyPackingListAppState extends State<MyPackingListApp> {
  // A global key used to uniquely identify and manage the root Navigator's state.
  final _rootNavigatorKey = GlobalKey<NavigatorState>();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My Packing List',
      theme: appTheme,
      debugShowCheckedModeBanner: false,
      home: Navigator(
        key: _rootNavigatorKey,
        onGenerateRoute:
            (route) => MaterialPageRoute(
              settings: route,
              builder:
                  (context) => ChangeNotifierProvider.value(
                    value: TravelerFormModel(),
                    child: TravelerFormScreen(),
                  ),
            ),
      ),
    );
  }
}
