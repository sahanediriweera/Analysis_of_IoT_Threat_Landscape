import subprocess
import sys
import json

def start_port_scan(ip_address):
    try:
        nmap_command = f'nmap -p- {ip_address}'
        nmap_process = subprocess.Popen(nmap_command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        nmap_output, nmap_error = nmap_process.communicate()

        if nmap_process.returncode == 0:
            open_ports = extract_open_ports(nmap_output.decode())
            if open_ports:
                print(f"Open ports on {ip_address}:")
                for port in open_ports:
                    print(f"Port {port} is open")
                save_open_ports_to_json(ip_address, open_ports)
            else:
                print(f"No open ports found on {ip_address}")
        else:
            print("Nmap command failed")
    except Exception as e:
        print(f"Error occurred during port scanning: {e}")

def extract_open_ports(output):
    open_ports = []
    lines = output.splitlines()
    for line in lines:
        if "/tcp" in line and "open" in line:
            port = line.split("/")[0]
            open_ports.append(port)
    return open_ports

def save_open_ports_to_json(ip_address, open_ports):
    data = {ip_address: open_ports}
    try:
        with open("open_ports_of_{}.json".format(ip_address), "w") as json_file:
            json.dump(data, json_file, indent=4)
        print("Open ports data saved to open_ports.json")
    except Exception as e:
        print(f"Error occurred while saving open ports data to JSON: {e}")

if __name__ == "__main__":
    start_port_scan(sys.argv[1])
