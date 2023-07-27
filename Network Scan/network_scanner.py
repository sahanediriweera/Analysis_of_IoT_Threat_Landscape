import subprocess
import re

def start_scan():
    try:
        # Run nmap command to scan the network and obtain device information
        nmap_command = 'nmap -sn 192.168.2.0/24'
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
                    devices.append({'IP': ip_address, 'Name': device_name})
            # Swap IP and device name if device name is Unknown
            for device in devices:
                if device['Name'] == 'Unknown':
                    device['IP'], device['Name'] = device['Name'], device['IP']

            # Display the scan results
            print("Connected devices:")
            for device in devices:
                print(f"Device {device['IP']} (IP: {device['Name']})")
        else:
            print("Nmap command failed")
    except Exception as e:
        print(f"Error occurred during scanning: {e}")

if __name__ == "__main__":
    start_scan()
