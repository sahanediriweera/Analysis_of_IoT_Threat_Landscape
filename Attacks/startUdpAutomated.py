import subprocess

def run_python_script():
    python_script_path = './udp_detect_json_write.py'  # Replace 'syn_flood_detection_json.py' with the path to your Python script
    
    try:
        subprocess.run(['python', python_script_path], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while running the Python script: {e}")
    except FileNotFoundError:
        print(f"Python script '{python_script_path}' not found.")
    else:
        print("Python script ran successfully.")

if __name__ == "__main__":
    run_python_script()
