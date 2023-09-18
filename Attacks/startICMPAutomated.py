import os
import subprocess
import sys
import platform

def run_python_script_in_new_terminal_with_sudo(script_path):
    if platform.system() == "Windows":
        print("This script is designed for Unix-based systems and cannot be run on Windows.")
    elif platform.system() == "Darwin":  # macOS
        subprocess.Popen(["sudo", "open", "-a", "Terminal", "python3", script_path])
    elif platform.system() == "Linux":  # Linux
        subprocess.Popen(["x-terminal-emulator", "-e", "sudo", "python3", script_path])
    else:
        print("Unsupported operating system")

def main():
    directory_path = r"./"
    script_path = os.path.join(directory_path, "icmp_detect_json_write.py")

    run_python_script_in_new_terminal_with_sudo(script_path)

if __name__ == "__main__":
    main()
