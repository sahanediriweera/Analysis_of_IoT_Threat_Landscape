import os
import sys

def main(ip,port):
    directory_path = r"./"
    script_path = os.path.join(directory_path, "udp_detect_json_write.py")


    os.system(f"python {script_path}")


if __name__ == "__main__":
    main()