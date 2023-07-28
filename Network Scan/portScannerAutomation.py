import os
import sys

directory_path = r"./"
script_path = os.path.join(directory_path, "port_scanner.py")


os.system(f"python {script_path} {sys.argv[1]}")
