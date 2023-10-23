import os
import re
import requests
import subprocess
import json

DATABASE_FILE = "device_info_database.json"

def load_device_database():
    if os.path.exists(DATABASE_FILE):
        with open(DATABASE_FILE, "r") as f:
            return json.load(f)
    return []

def save_device_database(device_info):
    with open(DATABASE_FILE, "w") as f:
        json.dump(device_info, f, indent=2)

def get_vendor_information(MAC_Address):
    url = f'https://www.macvendorlookup.com/api/v2/{MAC_Address}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if isinstance(data, list) and len(data) > 0:
            return data[0].get('company', '')
    return ''

def get_device_info():
    arp_scan_output = os.popen("sudo arp-scan -l").read()

    mac_address_pattern = r"(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2}))"
    ip_address_pattern = r"\b(?:\d{1,3}\.){3}\d{1,3}\b"

    lines = arp_scan_output.strip().split("\n")

    devices = load_device_database()
    device_id_counter = len(devices) + 1

    for line in lines:
        mac_addresses = re.findall(mac_address_pattern, line)
        ip_addresses = re.findall(ip_address_pattern, line)

        if mac_addresses and ip_addresses:
            mac_address = mac_addresses[0][0]
            ip_address = ip_addresses[0]

            # Check if data is already in the database
            device_info = next((d for d in devices if d["MACAddress"] == mac_address), None)

            if not device_info:
                vendor_information = get_vendor_information(mac_address)
                device_info = {
                    "MACAddress": mac_address,
                    "DeviceID": str(device_id_counter),
                    "IPAddress": ip_address,
                    "VendorInformation": vendor_information,
                }
                devices.append(device_info)
                device_id_counter += 1

    save_device_database(devices)
    return devices

if __name__ == "__main__":
    connected_devices = get_device_info()
    for device in connected_devices:
        print(device)
    
    output_file = "device_scan_results.json"
    with open(output_file, "w") as f:
        json.dump(connected_devices, f, indent=2)

    print(f"Device information written to {output_file}.")
