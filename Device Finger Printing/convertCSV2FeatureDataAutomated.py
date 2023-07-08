import os

directory_path = r"./src/scripts"
script_path = os.path.join(directory_path, "CSV2FeatureData.py")
os.environ['IOTBASE'] = "/path/to/iotbase"


os.system(f"python {script_path} -i ./datasets/sample")
