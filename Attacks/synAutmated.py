import os
import sys

def main(ip,port):
    directory_path = r"./"
    script_path = os.path.join(directory_path, "syn_flood_detection_json.py")


    os.system(f"python {script_path}")


if __name__ == "__main__":
    main()