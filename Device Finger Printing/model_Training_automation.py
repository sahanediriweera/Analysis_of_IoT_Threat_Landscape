import numpy as np 
import pandas as pd
from sklearn.ensemble import VotingClassifier, RandomForestClassifier, AdaBoostClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression,Lasso, LassoCV
from sklearn.neural_network import MLPClassifier
from sklearn.gaussian_process import GaussianProcessClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
#from xgboost import XGBClassifier
from sklearn.preprocessing import LabelEncoder,StandardScaler
from sklearn.feature_selection import VarianceThreshold
from sklearn.pipeline import Pipeline
from sklearn.model_selection import RandomizedSearchCV, GridSearchCV  ,cross_val_score ,GridSearchCV , KFold , train_test_split, RepeatedStratifiedKFold
from sklearn.metrics import confusion_matrix , classification_report,accuracy_score, make_scorer
import os
import matplotlib.pyplot as plt
import matplotlib as mpl
import seaborn as sns
import pandas
import json
import pickle

def convert_dict_to_json(value):
    return json.dumps(value)

def identify_dictionary_columns(df):
    dictionary_columns = []

    for column in df.columns:
        if df[column].apply(lambda x: isinstance(x, dict)).any():
            dictionary_columns.append(column)

    return dictionary_columns

def fit_and_score(models,X_train,X_test,y_train,y_test):
  np.random.seed(42)
  model_scores = {}

  for name,model in models.items():
    model.fit(X_train,y_train)
    model_scores[name] = model.score(X_test,y_test)
  
  model_scores = pd.DataFrame(model_scores,index = ['Score']).transpose()
  model_scores = model_scores.sort_values('Score')

  return model_scores


df = pd.read_pickle('./datasets/sample/featureData.pkl')

# Remove columns with dictionary data
dict_columns = identify_dictionary_columns(df=df)
df = df.drop(dict_columns, axis=1)

# Encode categorical columns
for c in df.columns:
    if df[c].dtype == 'object':
        lbl = LabelEncoder()
        lbl.fit(list(df[c].values))
        df[c] = lbl.transform(df[c].values)

# Drop columns with zero correlation to 'Device'
arr_corr = df.corr().abs()['Device'].sort_values(ascending=False)
corr_drop = arr_corr[arr_corr == 0]
to_drop = list(corr_drop.index)
df = df.drop(to_drop, axis=1)

# Split data into features (X) and target (y)
X = df.drop('Device', axis=1)
y = df['Device']

# Fill missing values and handle infinite values
X = X.fillna(X.mean())
X = X.replace([np.inf, -np.inf], np.finfo(np.float64).max)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Handle NaN and infinite values again
X_train = np.nan_to_num(X_train, nan=0.0, posinf=np.finfo(np.float64).max, neginf=np.finfo(np.float64).min)
X_test = np.nan_to_num(X_test, nan=0.0, posinf=np.finfo(np.float64).max, neginf=np.finfo(np.float64).min)

# Standardize features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Create and train the models
models = {
    'LogisticRegression': LogisticRegression(max_iter=10000),
    'KNeighborsClassifier': KNeighborsClassifier(),
    'SVC': SVC(),
    'DecisionTreeClassifier': DecisionTreeClassifier(),
    'RandomForestClassifier': RandomForestClassifier(),
    'AdaBoostClassifier': AdaBoostClassifier(),
    'GradientBoostingClassifier': GradientBoostingClassifier()
}

best_model_name = ''
best_model = None
best_model_score = 0.0

for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    score = accuracy_score(y_test, y_pred)
    if score > best_model_score:
        best_model_score = score
        best_model_name = name
        best_model = model

print("Best model:", best_model_name)
print("Best model score:", best_model_score)

# Save the best model to a file
directory = './'
if not os.path.exists(directory):
    os.makedirs(directory)

model_filepath = os.path.join(directory, 'best_model.pkl')
with open(model_filepath, 'wb') as f:
    pickle.dump(best_model, f)

print("Best model saved at:", model_filepath)

# Create a JSON file to store feature values and corresponding 'Device' values
y_values_df = pd.DataFrame({'Device_encoded': y_train, 'Device_original': lbl.inverse_transform(y_train)})
y_values_df.to_csv(os.path.join(directory, 'y_values.csv'), index=False)
