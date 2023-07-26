import pandas as pd 

df = pd.read_pickle('featureData.pkl')
df1 = pd.read_pickle('featureData1.pkl')
df.columns.to_frame().T.to_csv('headers.csv', index=False, header=False)
print(df)
print("**********")
print(df1)
print(df.equals(df1))