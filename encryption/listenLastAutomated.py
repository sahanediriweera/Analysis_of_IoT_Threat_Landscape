import os
import sys

directory_path = r"./"
script_path = os.path.join(directory_path, f"listen_last.py {sys.argv[1]} {sys.argv[2]}")
os.system(f"sudo python {script_path}")


