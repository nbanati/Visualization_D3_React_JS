import csv
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import json
from flask import Flask,jsonify
from flask_cors import CORS
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler
from sklearn import manifold

app = Flask(__name__)
CORS(app)

df = pd.read_csv("env/bin/Housing_New_York_Units_by_Building.csv", usecols = ['Latitude','Longitude','Extremely Low Income Units','Very Low Income Units','Low Income Units','Moderate Income Units','Middle Income Units','Other Income Units','Studio Units','1-BR Units','2-BR Units','3-BR Units','4-BR Units','5-BR Units','6-BR+ Units','Unknown-BR Units','Counted Rental Units','Counted Homeownership Units','All Counted Units','Total Units'])
print(df.shape)
df.replace('', np.nan, inplace=True)
df.replace('Not Found', np.nan, inplace=True)
df.dropna( inplace=True)


scaler = StandardScaler()
minmaxscaler = MinMaxScaler()
scaled_data=df.copy()
scaled_data_o=df.copy()
scaled_data=pd.DataFrame(scaler.fit_transform(scaled_data), columns=scaled_data.columns)
scaled_data=pd.DataFrame(minmaxscaler.fit_transform(scaled_data), columns=scaled_data.columns)
scaled_data_pcp=scaled_data.copy()
scaled_data.head()
top_4_features=[]
kmeans_result = []

pca = PCA(n_components= 20)
pc_s=pca.fit_transform(scaled_data)

pca_variance=pca.explained_variance_ratio_
pca_variance_cumulative= np.cumsum(pca_variance)
screePlotData=[pca_variance,pca_variance_cumulative]

kmeans = KMeans(n_clusters= 4)
kmeans_result = kmeans.fit_predict(scaled_data_o)
raw_with_kmeans = scaled_data_o
raw_with_kmeans['color']= kmeans_result

@app.route("/scree_plot")
def scree_plot_random():
    print("Scree plot")
    dictionary ={
        'variance':pca_variance.tolist(),
        'variance_cumulative':pca_variance_cumulative.tolist()
    }
    return json.dumps(dictionary)

eigen_vectors = pd.DataFrame(data = pc_s, columns = ['PC 1', 'PC 2', 'PC 3', 'PC 4', 'PC 5', 'PC 6', 'PC 7', 'PC 8', 'PC 9', 'PC 10', 'PC 11', 'PC 12', 'PC 13', 'PC 14', 'PC 15', 'PC 16', 'PC 17', 'PC 18', 'PC 19', 'PC 20'])
print(eigen_vectors.shape)

@app.route("/bi_plot")
def bi_plot_data():
    print("Bi plot")
    dictionary ={
        'eigen_vectors': [eigen_vectors[['PC 1', 'PC 2']].to_json()],
        'feature_coordinates': [loadings[['PC 1', 'PC 2']].to_json()]
    }
    return json.dumps(dictionary)

loadings= pd.DataFrame(pca.components_.T,columns=['PC 1', 'PC 2', 'PC 3', 'PC 4', 'PC 5', 'PC 6', 'PC 7', 'PC 8', 'PC 9', 'PC 10', 'PC 11', 'PC 12', 'PC 13', 'PC 14', 'PC 15', 'PC 16', 'PC 17', 'PC 18', 'PC 19', 'PC 20'], index=scaled_data.columns)
@app.route("/loading")
def loadingsForOther():
    return json.dumps(loadings.to_json()) 

cols=['PC 1', 'PC 2', 'PC 3', 'PC 4', 'PC 5', 'PC 6', 'PC 7', 'PC 8', 'PC 9', 'PC 10', 'PC 11', 'PC 12', 'PC 13', 'PC 14', 'PC 15', 'PC 16', 'PC 17', 'PC 18', 'PC 19', 'PC 20']
def nloadingcalc(row,x):
    sum=0
    for i in np.arange(x):
        sum+= row[cols[i]]*row[cols[i]]
    return sum

@app.route("/loading/<nloading>")
def nloadingsForOther(nloading):
    global top_4_features
    n= int(nloading)
    ndf= loadings[cols[0:n]]
    ndf['SumSqLoadings']=ndf.apply(nloadingcalc, axis=1,x=n)
    ndf= ndf.sort_values(by=['SumSqLoadings'],ascending=False)
    l=[]
    for row in ndf.head(4).index: 
        t=(row) 
        l.append(t)
    top_4_features=l
    return json.dumps(ndf.head(4).to_json())

@app.route("/scatterplotmatrix")
def scattermatrix():
    global kmeans_result
    kmeans = KMeans(n_clusters= 4)
    if top_4_features:
        label_features= top_4_features
    else:
        label_features=["Counted Homeownership Units","Counted Rental Units","Very Low Income Units","3-BR Units"]
    scaled_data_of= scaled_data_o[label_features]
    scaled_data_of['color'] = kmeans.fit_predict(scaled_data_of)
    kmeans_result = scaled_data_of['color']
    print(scaled_data_of.shape)
    return json.dumps(scaled_data_of.to_json())

@app.route('/mds_data')
def mds_euclidean_data():
    data = raw_with_kmeans
    data=data.sample(n = 500)
    data_without_clusters = scaler.fit_transform(data.loc[:, data.columns != 'color'])
    print(data_without_clusters.shape)
    mds_data = manifold.MDS(n_components=2,metric=True,dissimilarity='euclidean').fit_transform(data_without_clusters)
    mds_data = np.hstack((mds_data,data['color'].to_numpy().reshape(500,1)))
    print(mds_data.shape)
    df = pd.DataFrame(data = mds_data, columns = ['first', 'second','color'])
    return json.dumps(df.to_json())

@app.route('/mds_variable')
def mds_variable():
    data = scaled_data_o
    data=data.sample(n = 3000)
    data_without_clusters = data.loc[:, data.columns != 'color']
    data = 1 - abs(data_without_clusters.corr())
    mds_data = manifold.MDS(n_components=2,metric=True,dissimilarity='precomputed').fit_transform(data)
    df = np.hstack((mds_data,data.columns.to_numpy().reshape(20,1)))
    df = pd.DataFrame(data = df, columns = ['first', 'second','name'])
    return json.dumps(df.to_json())

@app.route('/pcp')
def pcp_plot():
    
    selected_cols = ['Borough','Postcode','Extremely Low Income Units','Program Group','Very Low Income Units','Low Income Units','Moderate Income Units','Middle Income Units','Counted Rental Units','Counted Homeownership Units','Total Units']
    df = pd.read_csv("env/bin/Housing_New_York_Units_by_Building.csv", usecols = selected_cols)
    print(df.shape)
    df.replace('', np.nan, inplace=True)
    df.replace('Not Found', np.nan, inplace=True)
    df.dropna( inplace=True)
    df['color']= scaled_data_o['color']
    df = df.sample(1000)
    return json.dumps(df.to_json(orient='records'))
    
@app.route('/mdspcp')
def mdspcp_plot():
    data = scaled_data_o
    data=data.sample(n = 3000)
    return json.dumps(data.to_json(orient='records'))
