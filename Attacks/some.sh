#!/bin/bash

# Replace 'your_python_script.py' with the actual name of your Python script
python_script="http_detect.py"

# Check if the Python script file exists
if [ ! -f "$python_script" ]; then
    echo "Error: The Python script '$python_script' does not exist."
    exit 1
fi

# Set the terminal emulator command based on your system
# For GNOME-based systems (e.g., Ubuntu):
terminal_cmd="gnome-terminal -- python3 $python_script"

# For systems with X Window System (generic):
# terminal_cmd="xterm -e python3 $python_script"

# Execute the terminal command
$terminal_cmd
