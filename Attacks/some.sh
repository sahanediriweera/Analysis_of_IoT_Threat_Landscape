#!/bin/bash

# Specify the Python script you want to run
python_script="http_detect.py"

# Run the Python script with nohup and redirect output to a log file
nohup python "$python_script" > script.log 2>&1 &

# Print a message to indicate that the script has been started
echo "Running $python_script in the background. Check script.log for output."
