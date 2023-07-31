import os
import re
import requests
import subprocess
import json

def get_vendor_information(MAC_Address):
    # Use the macvendorlookup.com API to fetch vendor information
    url = f'https://www.macvendorlookup.com/api/v2/{MAC_Address}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if isinstance(data, list) and len(data) > 0:
            return data[0].get('company', '')
    return ''

def get_device_info():
    # Run arp-scan command with -l option to get connected devices and IP addresses
    arp_scan_output = os.popen("sudo arp-scan -l").read()

    # Regular expression patterns to match MAC addresses and IP addresses
    mac_address_pattern = r"(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2}))"
    ip_address_pattern = r"\b(?:\d{1,3}\.){3}\d{1,3}\b"

    # Split the output by lines
    lines = arp_scan_output.strip().split("\n")

    # Create a list to store device information
    devices = []
    device_id_counter = 1

    for line in lines:
        # Use regex to find MAC addresses and IP addresses in each line
        mac_addresses = re.findall(mac_address_pattern, line)
        ip_addresses = re.findall(ip_address_pattern, line)

        # If both MAC address and IP address are found in the line
        if mac_addresses and ip_addresses:
            # Extract relevant device information
            mac_address = mac_addresses[0][0]
            ip_address = ip_addresses[0]
            vendor_information = get_vendor_information(mac_address)
            
            device_info = {
                "MACAddress": mac_address,
                "DeviceID": str(device_id_counter),
                "IPAddress": ip_address,
                "VendorInformation": vendor_information,
               
            }
            # You can add additional prompts or database lookups here to get more information about the devices.
            # For the sake of simplicity, I'll leave them blank for now.

            devices.append(device_info)
            device_id_counter += 1

    return devices

if __name__ == "__main__":
    connected_devices = get_device_info()
    for device in connected_devices:
        print(device)
    output_file = "device_scan_results.json"
    with open(output_file, "w") as f:
        json.dump(connected_devices, f, indent=2)

    print(f"Device information written to {output_file}.")

