import os
import time
from datetime import datetime

directory_path = r"./"
script_path1 = os.path.join(directory_path, "startsynAutomated.py")
script_path2 = os.path.join(directory_path, "starthttpAutomated.py")
script_path3 = os.path.join(directory_path, "startICMPAutomated.py")
script_path4 = os.path.join(directory_path, "startUdpAutomated.py")

log_file_path = os.path.join(directory_path, "log.txt")

while True:
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    with open(log_file_path, "a") as log_file:
        log_file.write(f"{current_time} - Starting scripts...\n")
    
    os.system(f"sudo python3 {script_path1}")
    os.system(f"sudo python3 {script_path2}")
    os.system(f"sudo python3 {script_path3}")
    os.system(f"sudo python3 {script_path4}")
    
    with open(log_file_path, "a") as log_file:
        log_file.write(f"{current_time} - Scripts execution completed.\n")
    
    time.sleep(30)
