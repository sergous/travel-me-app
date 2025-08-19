#!/bin/bash

# Exit on error
set -e

echo "Starting Expo web build process..."

# Install dependencies
echo "Installing dependencies..."
bun install --legacy-peer-deps

# Run the build process
echo "Building Expo web project..."
bun run build
bun run build:workbox

# Move the dist directory to web-build
echo "Moving build output to web-build directory..."
rm -rf web-build
mv dist web-build

echo "Build complete. Output directory: web-build" 