import os
import time

directory_path = r"./"
script_path1 = os.path.join(directory_path, "startsynAutomated.py")
script_path2 = os.path.join(directory_path, "starthttpAutomated.py")
script_path3 = os.path.join(directory_path, "startICMPAutomated.py")
script_path4 = os.path.join(directory_path, "startUdpAutomated.py")

while True:
    os.system(f"sudo python3 {script_path1}")
    os.system(f"sudo python3 {script_path2}")
    os.system(f"sudo python3 {script_path3}")
    os.system(f"sudo python3 {script_path4}")
    time.sleep(180)
# Sleep for 3 minutes (180 seconds)