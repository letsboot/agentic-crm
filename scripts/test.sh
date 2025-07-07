#! /usr/bin/env sh

# Exit in case of error
set -e
set -x

echo "Building containers..."
docker compose build --quiet
echo "Cleaning up previous containers..."
docker compose down -v --remove-orphans >/dev/null 2>&1 # Remove possibly previous broken stacks left hanging after an error
echo "Starting services..."
docker compose up -d --quiet-pull >/dev/null 2>&1
echo "Running tests..."
docker compose exec -T backend bash scripts/tests-start.sh "$@"
echo "Cleaning up..."
docker compose down -v --remove-orphans >/dev/null 2>&1
