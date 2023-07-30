import requests

from scapy.all import ARP, Ether, srp

target_ip = "192.168.2.1/24"
arp = ARP(pdst=target_ip)
ether = Ether(dst="ff:ff:ff:ff:ff:ff")
packet = ether/arp

result = srp(packet, timeout=3, verbose=0)[0]

devices = []

for sent, received in result:
    devices.append({'ip': received.psrc, 'mac': received.hwsrc})
    print(received)

print("Devices on the network:")
for device in devices:
    vendor = requests.get(f"https://api.macvendors.com/{device['mac']}").text
    if vendor:
        print(f"IP address: {device['ip']}   MAC address: {device['mac']}   Device product: {vendor}")
    else:
        print(f"IP address: {device['ip']}   MAC address: {device['mac']}   Device product: unknown")