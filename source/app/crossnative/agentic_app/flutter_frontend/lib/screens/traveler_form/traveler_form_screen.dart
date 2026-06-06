import 'package:provider/provider.dart';
import 'package:flutter/material.dart';

import '../../models/packing_list_model.dart';
import '../../models/traveler_form_model.dart';
import '../packing_list/packing_list_screen.dart';
import '../components.dart';
import './get_packing_list_button.dart';
import './input_widgets.dart';

/// A screen that presents a form for the user to input their travel details.
///
/// This screen collects the destination, trip duration, and any special preferences
/// using dedicated input widgets ([LocationInput], [TripLengthInput], [PreferencesInput]).
/// It uses a [TravelerFormModel] (accessed via Provider) to manage the form's state.
///
/// Upon submission via the [GetPackingListButton], it validates the input,
/// shows a loading indicator, calls the backend service (via [PackingListModel.load])
/// to fetch packing list suggestions, and then navigates to the [PackingListScreen]
/// on success, passing the fetched data. It also handles potential errors during
/// the data fetching process by displaying a [SnackBar].
///
class TravelerFormScreen extends StatefulWidget {
  const TravelerFormScreen({super.key});

  @override
  State<TravelerFormScreen> createState() => _TravelerFormScreenState();
}

class _TravelerFormScreenState extends State<TravelerFormScreen> {
  /// Tracks whether the packing list is currently being fetched from the backend.
  /// Used to conditionally display a loading indicator.
  bool _loading = false;

  /// Controllers for the location, trip length, and preferences text input fields.
  /// Manages its text content.
  final TextEditingController _locationController = TextEditingController();
  final TextEditingController _lengthOfStayController = TextEditingController();
  final TextEditingController _preferencesController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // Pre-populates the form fields if the user navigates back from the
    // packing list screen, retrieving existing data from the TravelerFormModel.    _locationController.text = context.read<TravelerFormModel>().location;
    if (context.read<TravelerFormModel>().lengthOfStay != 0) {
      _lengthOfStayController.text =
          context.read<TravelerFormModel>().lengthOfStay.toString();
    }
    _preferencesController.text = context.read<TravelerFormModel>().preferences;
  }

  /// Validates the form, fetches the packing list from the backend,
  /// and navigates to the [PackingListScreen].
  //
  /// Shows a loading indicator during the fetch and displays error messages
  /// via [SnackBar] if validation fails or the fetch encounters an error.
  void getPackingList(BuildContext context) async {
    // Access the form model to get the current input values.
    TravelerFormModel form = context.read<TravelerFormModel>();

    // Validate that user's form has all necessary fields filled out
    var errors = form.validate();

    // If there's errors in the form, alert the user and do not proceed.
    if (errors.isNotEmpty) {
      String errorMessage = errors.join('\n');
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(errorMessage)));
      return;
    }

    setState(() {
      _loading = true;
    });

    try {
      // Load packing list data from Genkit PackingListHelper Flow
      var packingList = await PackingListModel.load(
        form.location,
        form.lengthOfStay,
        form.preferences,
      );

      if (!context.mounted) {
        return;
      }

      // Push a Packing List Screen with the packing list data.
      Navigator.of(context).push(
        MaterialPageRoute(
          builder:
              (context) => ChangeNotifierProvider.value(
                value: packingList,
                child: PackingListScreen(),
              ),
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Something went wrong: ${e.toString()}')),
      );
    } finally {
      setState(() {
        _loading = false;
      });
    }
  }

  @override
  void dispose() {
    // Dispose controllers when the widget is removed from the tree to free resources.
    _locationController.dispose();
    _lengthOfStayController.dispose();
    _preferencesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: MyPackingListTitle(), centerTitle: true),
      body: BodyWhitespace(
        child:
            _loading
                // Conditionally display a loading indicator or the form.
                ? Center(child: CircularProgressIndicator())
                : SingleChildScrollView(
                  child: Column(
                    children: [
                      LocationInput(controller: _locationController),
                      TripLengthInput(controller: _lengthOfStayController),
                      PreferencesInput(controller: _preferencesController),
                      GetPackingListButton(
                        onPressed: () => getPackingList(context),
                      ),
                    ],
                  ),
                ),
      ),
    );
  }
}
