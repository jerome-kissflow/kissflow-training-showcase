#!/bin/sh
# Gradle wrapper bootstrap — run once if gradlew is missing
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"
if [ ! -f gradlew ]; then
  curl -sL "https://raw.githubusercontent.com/gradle/gradle/v8.7.0/gradlew" -o gradlew
  curl -sL "https://raw.githubusercontent.com/gradle/gradle/v8.7.0/gradlew.bat" -o gradlew.bat
  chmod +x gradlew
  curl -sL "https://github.com/gradle/gradle/raw/v8.7.0/gradle/wrapper/gradle-wrapper.jar" -o gradle/wrapper/gradle-wrapper.jar
fi
./gradlew "$@"
