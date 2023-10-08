import os
import sys

def main(ip):
    directory_path = r"./"
    script_path = os.path.join(directory_path, "ICMP.py")


    os.system(f"python3 {script_path} {ip}")


if __name__ == "__main__":
    main(sys.argv[1])
