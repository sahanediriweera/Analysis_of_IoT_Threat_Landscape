import os
import sys

def main():
    directory_path = r"./"
    script_path = os.path.join(directory_path, "icmp_detect_json_write.py")


    os.system(f"sudo python3 {script_path}")


if __name__ == "__main__":
      main()
