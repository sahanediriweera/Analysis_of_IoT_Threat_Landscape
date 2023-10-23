import subprocess
import time
import sys

def main(ip,port):
# Define the command and log file name
    command = f"telnet {ip} 55443"
    log_file = f"log_results_of_{ip}_55443.txt"

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

if __name__ == "__main__":
    print(sys.argv)
    main(sys.argv[1],sys.argv[2])