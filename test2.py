import time
from scapy.all import *

def capture_packets(duration, filename):
    # Start time for capturing packets
    start_time = time.time()
    end_time = start_time + duration

    # Create an empty list to store captured packets
    packets = []

    # Sniff packets and append them to the list
    def packet_callback(packet):
        packets.append(packet)

    # Start capturing packets
    sniff(prn=packet_callback, timeout=duration)

    # Save packets to a .pcap file
    wrpcap(filename, packets)

    print(f"Packets captured and saved as {filename}")

# Number of captures
num_captures = 3

# Duration for each capture in seconds (60 minutes = 3600 seconds)
capture_duration = 60

# Delay between captures in seconds
capture_delay = 2

for i in range(num_captures):
    # Generate filename based on timestamp
    filename = f"captured_packets_{time.strftime('%Y%m%d%H%M%S')}.pcap"

    # Capture packets for the specified duration
    capture_packets(capture_duration, filename)

    if i < num_captures - 1:
        print("Waiting for the next capture...")
        time.sleep(capture_delay)
