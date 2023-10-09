import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score
import pickle
import json

model_filepath = './best_model.pkl'
with open(model_filepath, 'rb') as f:
    loaded_model = pickle.load(f)

def identify_dictionary_columns(df):
    dictionary_columns = []

    for column in df.columns:
        if df[column].apply(lambda x: isinstance(x, dict)).any():
            dictionary_columns.append(column)

    return dictionary_columns

def preprocess_data(data):
    df = data.drop('Device', axis=1)
    dict_columns = identify_dictionary_columns(df=df)

    df = df.drop(dict_columns, axis=1)
    
    for c in df.columns:
        if df[c].dtype == 'object':
            lbl = LabelEncoder()
            lbl.fit(list(df[c].values))
            df[c] = lbl.transform(df[c].values)
    
    df = df.fillna(df.mean())
    df = df.replace([np.inf, -np.inf], np.finfo(np.float64).max)
    
    X = df.values
    X = np.nan_to_num(X, nan=0.0, posinf=np.finfo(np.float64).max, neginf=np.finfo(np.float64).min)
    scaler = StandardScaler()
    X = scaler.fit_transform(X)
    
    return X

new_data = pd.read_pickle('./datasets/sample/featureData.pkl')
X_new = preprocess_data(new_data)

predictions = loaded_model.predict(X_new)

# Load the original device values from y_values.csv
y_values_df = pd.read_csv('./y_values.csv')

# Map the encoded predictions to original device values
predicted_devices = y_values_df['Device_original'].iloc[predictions]

# Get the row numbers
row_numbers = list(range(len(predictions)))

# Create a DataFrame to store predictions with row numbers
predictions_df = pd.DataFrame({'Row Number': row_numbers, 'Predicted Device': predicted_devices})

# Save the predictions to a CSV file
output_filepath = './predictions_with_row_numbers.csv'
predictions_df.to_csv(output_filepath, index=False)

print("Predictions saved to", output_filepath)
