#!/bin/bash

python_script_path="syn_flood_detection_json.py"  # Replace with the path to your Python script

if [ -f "$python_script_path" ]; then
    # Open a new Windows Command Prompt and run the Python script
    cmd.exe /C "python $python_script_path"
else
    echo "Python script '$python_script_path' not found."
fi
