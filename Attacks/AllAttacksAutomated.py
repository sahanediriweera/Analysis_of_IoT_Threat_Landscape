import subprocess

python_script = "your_script.py"

command = f"nohup python {python_script} > script.log 2>&1 &"

subprocess.Popen(command, shell=True)

# Print a message to indicate that the script has been started
print(f"Running {python_script} in the background. Check script.log for output.")
