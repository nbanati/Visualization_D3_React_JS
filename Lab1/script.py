import csv
import pandas as pd
import numpy as np

df = pd.read_csv("Housing_New_York_Units_by_Building.csv", usecols = ['Project Name','Program Group','Borough','Postcode','Council District','Census Tract','NTA - Neighborhood Tabulation Area','Reporting Construction Type','Prevailing Wage Status','Extremely Low Income Units','Very Low Income Units','Low Income Units','Counted Rental Units','Counted Homeownership Units','All Counted Units','Total Units'])

df.replace('', np.nan, inplace=True)
df.replace('Not Found', np.nan, inplace=True)
df.dropna( inplace=True)
df=df.sample(n = 1500)
df.to_csv(r'processed.csv', index = False)