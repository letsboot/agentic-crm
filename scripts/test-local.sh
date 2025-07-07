#! /usr/bin/env bash

# Exit in case of error
set -e

echo "Cleaning up previous containers..."
docker-compose down -v --remove-orphans >/dev/null 2>&1 # Remove possibly previous broken stacks left hanging after an error

if [ $(uname -s) = "Linux" ]; then
    echo "Remove __pycache__ files"
    sudo find . -type d -name __pycache__ -exec rm -r {} \+
fi

echo "Building containers..."
docker-compose build --quiet
echo "Starting services..."
docker-compose up -d --quiet-pull >/dev/null 2>&1
echo "Running tests..."
docker-compose exec -T backend bash scripts/tests-start.sh "$@"
