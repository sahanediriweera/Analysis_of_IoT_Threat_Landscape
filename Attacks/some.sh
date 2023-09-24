#!/bin/bash

# Replace 'your_python_script.py' with the actual name of your Python script
python_script="your_python_script.py"

# Check if the Python script file exists
if [ ! -f "$python_script" ]; then
    echo "Error: The Python script '$python_script' does not exist."
    exit 1
fi

# Set the terminal emulator command based on 'x-terminal-emulator'
terminal_cmd="x-terminal-emulator -e python3 $python_script"

# Execute the terminal command
$terminal_cmd
