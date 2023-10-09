import subprocess

python_script = "startAttackScans.py"
password = "32902344"

command = f"echo {password} | sudo -S nohup python {python_script} > script.log 2>&1 &"

subprocess.Popen(command, shell=True)

# Print a message to indicate that the script has been started
print(f"Running {python_script} in the background. Check script.log for output.")
