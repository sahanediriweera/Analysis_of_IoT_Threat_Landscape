import time
from scapy.all import *

def capture_packets(duration, filename):
    start_time = time.time()
    end_time = start_time + duration
    packets = []
    def packet_callback(packet):
        packets.append(packet)
    sniff(prn=packet_callback, timeout=duration)
    wrpcap(filename, packets)

    print(f"Packets captured and saved as {filename}")

num_captures = 3

capture_duration = 60

capture_delay = 2

for i in range(num_captures):
    filename = f"captured_packets_{time.strftime('%Y%m%d%H%M%S')}.pcap"

    capture_packets(capture_duration, filename)

    if i < num_captures - 1:
        print("Waiting for the next capture...")
        time.sleep(capture_delay)
