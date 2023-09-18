import os
import shutil

directory_path = r"./src/scripts"
script_path = os.path.join(directory_path, "PCAP2CSV.py")

source_directory = r"./../Packet Capturing"  # Corrected the path
destination_directory = r"./datasets/sample/RAW"

# List all files in the source directory
files = os.listdir(source_directory)

# Filter only .pcap files
pcap_files = [file for file in files if file.endswith('.pcap')]

# Move each .pcap file to the destination directory
for pcap_file in pcap_files:
    source_path = os.path.join(source_directory, pcap_file)
    destination_path = os.path.join(destination_directory, pcap_file)
    
    # Use shutil.move to move the file
    shutil.move(source_path, destination_path)

print("PCAP files moved successfully.")

os.system(f"python {script_path} -i ./datasets/sample/RAW -o ./datasets/sample/CSV")
