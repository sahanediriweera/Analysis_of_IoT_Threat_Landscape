import subprocess
import re
import nmap
import json 

# Run the arp command to obtain the list of connected devices
arp_output = subprocess.check_output(['arp', '-a']).decode('utf-8')

# Use regular expressions to extract the IP addresses from the arp output
ip_pattern = re.compile(r'\d+\.\d+\.\d+\.\d+')
ip_addresses = ip_pattern.findall(arp_output)

print(ip_addresses)

# Initialize an Nmap object
nm = nmap.PortScanner()

# For each discovered IP address, perform an OS fingerprint scan and retrieve the OS information
for ip_address in ip_addresses:
    result = nm.scan(hosts=ip_address, arguments='-O')
    os_info = result['scan'][ip_address]['osmatch']
    os_info = json.dumps(os_info,indent=4)
    print(f'IP address: {ip_address}, OS information: {os_info}')
    print("\n")