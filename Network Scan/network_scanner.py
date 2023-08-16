import subprocess
import re
import json

def start_scan():
    try:
        nmap_command = 'sudo nmap -sn 192.168.2.0/24'
        nmap_process = subprocess.Popen(nmap_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        nmap_output, nmap_error = nmap_process.communicate()

        if nmap_process.returncode == 0:
            lines = nmap_output.decode().split('\n')
            devices = []
            for line in lines:
                if 'Nmap scan report' in line:
                    data = line.split()
                    ip_address = data[4]
                    device_name = data[5] if len(data) > 5 else "Unknown"
                    devices.append({'Device Name': device_name, 'IP': ip_address})

            for device in devices:
                if device['Device Name'] == 'Unknown':
                    device['Device Name'], device['IP'] = device['IP'], device['Device Name']

            print("Connected devices:")
            for device in devices:
                print(f"Device {device['IP']} (IP: {device['Device Name']})")

            # Writing devices array to a JSON file
            with open('connected_devices.json', 'w') as json_file:
                json.dump(devices, json_file)

            print("Devices information written to 'connected_devices.json'")

        else:
            print("Nmap command failed")

    except Exception as e:
        print(f"Error occurred during scanning: {e}")

if __name__ == "__main__":
    start_scan()
