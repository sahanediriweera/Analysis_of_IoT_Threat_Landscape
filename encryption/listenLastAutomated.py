import os
import sys

directory_path = r"./"
ip = sys.argv[1]
port = sys.argv[2]
print(f"listen_last.py {ip} {port}")
script_path = os.path.join(directory_path, f"listen_last.py {ip} {port}")
print(script_path)
os.system(f"sudo python {script_path}")

