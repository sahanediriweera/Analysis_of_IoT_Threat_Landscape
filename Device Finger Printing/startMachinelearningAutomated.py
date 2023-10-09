import os
import time

directory_path = r"./"
script_path1 = os.path.join(directory_path, "convertPCAP2CSVAutomated.py")
script_path2 = os.path.join(directory_path, "convertCSV2FeatureDataAutomated.py")
script_path3 = os.path.join(directory_path, "model_inference.py")
script_path4 = os.path.join(directory_path, "predictions_to_ip.py")

while True:
    os.system(f"sudo python3 {script_path1}")
    os.system(f"sudo python3 {script_path2}")
    os.system(f"sudo python3 {script_path3}")
    os.system(f"sudo python3 {script_path4}")
    time.sleep(60)  # Sleep for 3 minutes (180 seconds)