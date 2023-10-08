import os
import time

directory_path = r"./"
script_path = os.path.join(directory_path, "network_scanner.py")

while True:
    os.system(f"sudo python3 {script_path}")
    time.sleep(180)  # Sleep for 3 minutes (180 seconds)
