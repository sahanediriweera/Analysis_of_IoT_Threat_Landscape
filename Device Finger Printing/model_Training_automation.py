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


df = pandas.read_pickle('./datasets/sample/featureData.pkl')
print(df)

print(df['Device'].value_counts())

print(df.transpose())

dict_columns = identify_dictionary_columns(df=df)

df = df.drop(dict_columns, axis=1)

for c in df.columns:
  if df[c].dtype == 'object':
    lbl = LabelEncoder()
    lbl.fit(list(df[c].values))
    df[c] = lbl.transform(df[c].values)

arr_corr = df.corr().abs()['Device'].sort_values(ascending = False)
print(arr_corr.to_string())

corr_drop = arr_corr[arr_corr<0.001]
print(corr_drop)

to_drop = list(corr_drop.index)
print(to_drop)

df = df.drop(to_drop,axis = 1)

print(df)

print(df.head())

X = df.drop('Device',axis = 1)
y = df['Device']

X = X.fillna(X.mean())

X = X.replace([np.inf, -np.inf], np.finfo(np.float64).max)

X_train,X_test,y_train,y_test = train_test_split(X,y,test_size = 0.2)
X_train.shape, X_test.shape,y_train.shape,y_test.shape

X_train = np.nan_to_num(X_train, nan=0.0, posinf=np.finfo(np.float64).max, neginf=np.finfo(np.float64).min)
X_test = np.nan_to_num(X_test, nan=0.0, posinf=np.finfo(np.float64).max, neginf=np.finfo(np.float64).min)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

models = {'LogisticRegression': LogisticRegression(max_iter=10000),
          'KNeighborsClassifier': KNeighborsClassifier(),
          'SVC': SVC(),
          'DecisionTreeClassifier': DecisionTreeClassifier(),
          'RandomForestClassifier': RandomForestClassifier(),
          'AdaBoostClassifier': AdaBoostClassifier(),
          #'XGBClassifier': XGBClassifier(),
          'GradientBoostingClassifier': GradientBoostingClassifier()}

base_line_model = fit_and_score(models,X_train,X_test,y_train,y_test)

print(base_line_model)







