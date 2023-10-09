import csv
import pickle
import json

# Load the featureData.pkl file
with open('./datasets/sample/featureData.pkl', 'rb') as f:
    feature_data = pickle.load(f)

# Load the device_mappings.csv file and create a mapping of devices to IPs
device_to_ip = {}
with open('./datasets/sample/device_mappings.csv', 'r', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        device_to_ip[row['Device']] = row['IP']

# Load the predictions_with_row_numbers.csv file and create a list of predictions
predictions = []
with open('./predictions_with_row_numbers.csv', 'r', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        predicted_device = row['Predicted Device']
        ip_address = device_to_ip.get(predicted_device, 'N/A')
        predictions.append({
            'Predicted Device': predicted_device,
            'IP': ip_address
        })

# Write the predictions to a JSON file
with open('predictions.json', 'w') as jsonfile:
    json.dump(predictions, jsonfile, indent=4)

print("Predictions written to predictions.json")
