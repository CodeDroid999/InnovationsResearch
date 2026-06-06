#!/bin/bash

# Set the predefined relative application path
APP_PATH="."
echo "APP_PATH is set to: ${APP_PATH}"

# Define the bootstrap.js path
BOOTSTRAP_JS_PATH="${APP_PATH}/web/bootstrap.js"
echo "BOOTSTRAP_JS_PATH is set to: ${BOOTSTRAP_JS_PATH}"

# Check if bootstrap.js exists
if [ ! -f "${BOOTSTRAP_JS_PATH}" ]; then
  echo "Error: ${BOOTSTRAP_JS_PATH} not found. Please run configure.sh first."
  exit 1
fi

echo "${BOOTSTRAP_JS_PATH} found."

echo "Cleanup the build..."
(cd "${APP_PATH}" && flutter clean)

# Build the Flutter application
echo "Building the application..."
(cd "${APP_PATH}" && flutter build web --release)

# Deploy to Firebase Hosting
echo "Deploying to Firebase Hosting..."
(cd "${APP_PATH}" && firebase deploy --only=hosting)
