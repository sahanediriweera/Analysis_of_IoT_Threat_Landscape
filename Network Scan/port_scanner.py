import subprocess
import sys

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

if __name__ == "__main__":
    start_port_scan(sys.argv[1])
