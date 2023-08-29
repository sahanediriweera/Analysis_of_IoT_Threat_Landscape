import subprocess
import re
import json

read_command = "tcpdump -r dns_traffic_5.pcap"
output = subprocess.run(read_command, shell=True, capture_output=True, text=True).stdout

# Write tcpdump output to a file
with open("output_4.txt", "w") as output_file:
    output_file.write(output)

# Extract domain names from the output using grep and regular expressions
pattern = r'\b[A-Za-z0-9.-]+\.com\b'
domain_names = re.findall(pattern, output)

# Create a dictionary to store the domain names
domain_data = {"domain_names": domain_names}

# Write the domain names to a JSON file
with open("domain_names.json", "w") as json_file:
    json.dump(domain_data, json_file, indent=4)

# Print the extracted domain names
for domain in domain_names:
    print(domain)