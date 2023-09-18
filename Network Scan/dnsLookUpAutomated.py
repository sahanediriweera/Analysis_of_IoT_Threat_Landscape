import os
import sys

directory_path = r"./"
script_path = os.path.join(directory_path, f"capture_dns.py {sys.argv[1]}")
os.system(f"sudo python {script_path}")

script_path = os.path.join(directory_path, "dns_read_json.py")
os.system(f"sudo python {script_path}")

