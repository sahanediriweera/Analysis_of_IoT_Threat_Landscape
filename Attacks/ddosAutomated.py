import os
import sys
import subprocess

def main(ip,fake_ip):
    directory_path = r"./"
    script_path = os.path.join(directory_path, "ddos.py")
    command = f"python {script_path} {ip} {fake_ip}"
    subprocess.Popen(['gnome-terminal', '--', 'bash', '-c', command])

    # os.system(f"python {script_path} {ip} {fake_ip}")


if __name__ == "__main__":
    main(sys.argv[1],sys.argv[2])