import os
import json
import time

directory_path = r"./"
script_path = os.path.join(directory_path, "port_scanner.py")

while True:
    # Read the JSON file
    with open('connected_devices.json', 'r') as json_file:
        devices = json.load(json_file)

    # Iterate over the devices and run the script for each IP address
    for device in devices:
        ip_address = device.get("IP")
        if ip_address:
            os.system(f"python {script_path} {ip_address}")
    
    # Sleep for 5 minutes (300 seconds) before running again
    time.sleep(300)
