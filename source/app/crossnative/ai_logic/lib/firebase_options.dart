import 'dart:js_interop';

import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show TargetPlatform, defaultTargetPlatform, kIsWeb;

extension type BootstrapFirebaseOptions._(JSObject _) implements JSObject {
  external String get apiKey;
  external String get authDomain;
  external String get databaseURL;
  external String get projectId;
  external String get storageBucket;
  external String get messagingSenderId;
  external String get appId;
  external String get measurementId;
}

extension type BootstrapOptions._(JSObject _) implements JSObject {
  external String get geminiApiKey;
  external BootstrapFirebaseOptions get firebase;
}

@JS()
// ignore: non_constant_identifier_names
external BootstrapOptions get APP_TEMPLATE_BOOTSTRAP;

class DefaultFirebaseOptions {

  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for android - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.iOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for ios - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macos - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      // ignore: no_default_cases
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static FirebaseOptions web = FirebaseOptions(
    apiKey: APP_TEMPLATE_BOOTSTRAP.firebase.apiKey,
    appId: APP_TEMPLATE_BOOTSTRAP.firebase.appId,
    messagingSenderId: APP_TEMPLATE_BOOTSTRAP.firebase.messagingSenderId,
    projectId: APP_TEMPLATE_BOOTSTRAP.firebase.projectId,
    authDomain: APP_TEMPLATE_BOOTSTRAP.firebase.authDomain,
    storageBucket: APP_TEMPLATE_BOOTSTRAP.firebase.storageBucket,
  );
}
