#!/bin/bash

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    echo "This script must be sourced. Please run 'source scripts/setup_python_env.sh'" >&2
    exit 1
fi

set -e

# Create a virtual environment with a compatible Python version
uv venv -p python3.11 backend/.venv

# Activate the virtual environment
source backend/.venv/bin/activate

# Install dependencies
cd backend
uv sync --python .venv/bin/python
