#!/bin/bash

source venv/bin/activate

echo "Starting the backend..."
uvicorn main:app --reload
