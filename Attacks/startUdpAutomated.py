import os
import subprocess
import sys
import platform

def run_python_script_in_new_terminal(script_path):
    if platform.system() == "Windows":
        subprocess.Popen(["start", "cmd", "/c", "python", script_path], shell=True)
    elif platform.system() == "Darwin":  # macOS
        subprocess.Popen(["open", "-a", "Terminal", "python", script_path])
    else:
        print("Unsupported operating system")

def main():
    directory_path = r"./"
    script_path = os.path.join(directory_path, "udp_detect_json_write.py")

    run_python_script_in_new_terminal(script_path)

if __name__ == "__main__":
    main()
