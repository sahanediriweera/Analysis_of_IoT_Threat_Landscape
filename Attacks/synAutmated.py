import os
import sys

def main(ip,port):
    directory_path = r"./"
    script_path = os.path.join(directory_path, "syn.py")


    os.system(f"python {script_path} {ip} {port}")


if __name__ == "__main__":
    main(sys.argv[1],sys.argv[2])