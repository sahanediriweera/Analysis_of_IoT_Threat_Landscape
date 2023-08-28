import os
import sys

def main():
    directory_path = r"./"
    script_path = os.path.join(directory_path, "http_detect.py")


    os.system(f"python {script_path}")


if __name__ == "__main__":
    main()