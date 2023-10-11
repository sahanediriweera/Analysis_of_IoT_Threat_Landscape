import subprocess
import time

# Define the command and log file name
command = "telnet 192.168.2.40 55443"
log_file = "telnet_log.txt"

# Open a log file for writing
with open(log_file, "w") as log:
    # Start the telnet process and redirect its output to the log file
    process = subprocess.Popen(command, shell=True, stdout=log, stderr=log)

    # Wait for 1 minute (60 seconds)
    time.sleep(60)

    # Terminate the telnet process after 1 minute
    process.terminate()

# Close the log file
log.close()

print("Telnet session completed and log saved to", log_file)
