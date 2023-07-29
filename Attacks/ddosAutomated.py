import os
import sys

def main(ip,fake_ip):
    directory_path = r"./"
    script_path = os.path.join(directory_path, "ddos.py")


    os.system(f"python {script_path} {ip} {fake_ip}")


if __name__ == "__main__":
    main(sys.argv[1],sys.argv[2])