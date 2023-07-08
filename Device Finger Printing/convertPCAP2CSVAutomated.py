import os

directory_path = r"./src/scripts"
script_path = os.path.join(directory_path, "PCAP2CSV.py")

os.system('export IOTBASE="/"')
os.system('echo $IOTBASE')
#os.system(f"python {script_path} -i ./datasets/sample/RAW -o ./datasets/sample/CSV")
