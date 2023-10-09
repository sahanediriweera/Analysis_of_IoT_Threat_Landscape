import os
import sys

def main():
    directory_path = r"./"
    script_path = os.path.join(directory_path, "model_inference.py")


    os.system(f"sudo python3 {script_path}")
    script_path = os.path.join(directory_path, "predictions_to_ip.py")


    os.system(f"sudo python3 {script_path}")


if __name__ == "__main__":
      main()