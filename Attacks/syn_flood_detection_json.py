from scapy.all import sniff, IP, TCP
from collections import deque
import time
import json

# Parameters for flood detection
MAX_PACKETS = 100  # Number of packets to keep in the queue
TIME_INTERVAL = 2  # Time interval in seconds
THRESHOLD = 10     # Maximum number of packets within the time interval

packet_queue = deque(maxlen=MAX_PACKETS)
start_time = time.time()
syn_flood_detected = False
detected_sources = set()  # Set to store unique source IPs of detected SYN floods

# JSON file to log SYN flood events
json_filename = "syn_flood_log.json"

# Function to log SYN flood events to JSON file
def log_syn_flood_event(src_ip, dst_ip):
    if src_ip not in detected_sources:
        event = {
            "alert": "SYN flood detected",
            "source_ip": src_ip,
            "destination_ip": dst_ip
        }
        with open(json_filename, "a") as f:
            json.dump(event, f)
            f.write("\n")
        
        print(f"SYN flood detected from {src_ip} to {dst_ip}")
        detected_sources.add(src_ip)

def packet_handler(packet):
    global packet_queue, start_time, syn_flood_detected

    if IP in packet and TCP in packet and packet[TCP].flags & 0x02:
        packet_queue.append(packet)

        current_time = time.time()
        if current_time - start_time >= TIME_INTERVAL:
            if len(packet_queue) >= THRESHOLD and not syn_flood_detected:
                syn_flood_detected = True
                
                src_ip = packet[IP].src
                dst_ip = packet_queue[0][IP].dst
                log_syn_flood_event(src_ip, dst_ip)

            packet_queue.clear()
            start_time = current_time
            syn_flood_detected = False

# Start sniffing packets with a timeout of 60 seconds
try:
    sniff(filter="tcp", prn=packet_handler, timeout=60)
except KeyboardInterrupt:
    pass  # Allow the user to interrupt the sniffing process with Ctrl+C
