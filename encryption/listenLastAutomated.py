import os
import sys

directory_path = r"./"
script_path = os.path.join(directory_path, f"listen_last.py {sys.argv[1]} {sys.argv[2]}")
print(script_path)
os.system(f"sudo python {script_path}")

