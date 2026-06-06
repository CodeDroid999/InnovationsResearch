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

PID=$(sudo netstat -ltnp | grep :8080 | awk '{print $7}' | cut -d'/' -f1)
  if [ -n "$PID" ]; then
    echo "Killing process $PID on port 8080"
    sudo kill -9 $PID
fi

# Build the Flutter application
echo "Building the application..."
(cd "${APP_PATH}" && flutter build web --release)

# Run Python web server
echo "Serving web application..."
(cd "${APP_PATH}/build/web" && python3 -m http.server 8080)
