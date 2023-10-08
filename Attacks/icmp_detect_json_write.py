import socket
import struct
import json
import time

# Define the timeout in seconds
timeout = 60

# Create a UDP socket to listen for ICMP packets
sock = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_ICMP)

# Set the socket timeout to implement the timeout feature
sock.settimeout(timeout)

# Create a dictionary to store the count of ICMP packets from each source IP
icmp_count = {}

try:
    start_time = time.time()
    while True:
        # Receive an ICMP packet
        packet, addr = sock.recvfrom(1024)
        
        # Calculate the elapsed time
        elapsed_time = time.time() - start_time
        
        # Check if the elapsed time exceeds the timeout
        if elapsed_time > timeout:
            print("Timeout reached. Exiting.")
            break
        
        # Unpack the ICMP packet header (first 20 bytes)
        icmp_header = struct.unpack('!BBHHH', packet[:8])
        
        # Extract the source IP address from the packet
        src_ip = socket.inet_ntoa(struct.pack("!I", struct.unpack("!I", packet[12:16])[0]))
        
        # Update the ICMP count for the source IP
        if src_ip in icmp_count:
            icmp_count[src_ip] += 1
        else:
            icmp_count[src_ip] = 1
        
        # Check if the ICMP packet count exceeds a threshold (e.g., 100 packets)
        threshold = 100
        if icmp_count[src_ip] > threshold:
            print(f"ICMP flood rate exceeded from {src_ip}")
            
            # Create a JSON object with relevant information
            attack_info = {
                "src_ip": src_ip,
                "des_ip": socket.gethostbyname(socket.gethostname()),  # Replace with your destination IP
                "message": "ICMP flood attack detection",
            }
            
            # Write the JSON object to a file
            with open("icmp_flood_log.json", "w") as json_file:
                json.dump(attack_info, json_file, indent=4)
                
            print(f"ICMP flood attack information written to icmp_flood_log.json")
        
except KeyboardInterrupt:
    print("Keyboard interrupt. Exiting.")
finally:
    sock.close()

