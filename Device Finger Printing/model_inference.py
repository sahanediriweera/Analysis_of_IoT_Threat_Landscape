import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score
import pickle

model_filepath = '/path/to/save/model/best_model.pkl'
with open(model_filepath, 'rb') as f:
    loaded_model = pickle.load(f)

def preprocess_data(data):

    df = data.drop('Device', axis=1)
    
    for c in df.columns:
        if df[c].dtype == 'object':
            lbl = LabelEncoder()
            lbl.fit(list(df[c].values))
            df[c] = lbl.transform(df[c].values)
    
    df = df.fillna(df.mean())
    df = df.replace([np.inf, -np.inf], np.finfo(np.float64).max)
    
    X = df.values
    scaler = StandardScaler()
    X = scaler.fit_transform(X)
    
    return X

new_data = pd.read_pickle('./path/to/new_data.pkl')
X_new = preprocess_data(new_data)

predictions = loaded_model.predict(X_new)

print("Predictions:", predictions)
