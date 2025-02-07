import plotly.graph_objects as go 
import pandas as pd
 

df = pd.read_csv("D:/cmpt 384/assignment 2/test.csv")
fig = go.Figure(data=
    go.Parcoords(
        line=dict(color = df['maxdev'],
                   colorscale = 'RdBu',
                   showscale = True,
                   cmin = 215,
                   cmax = 0),
        dimensions = list([
            dict(range = [-200, 200],
                 label = "V1", values = df['V1']),
            dict(range=[-200, 200],
                 label="V2", values=df['V2']),
            dict(range=[60, 230],
                 label="maxdev", values=df['maxdev']),
            dict(range=[0,25],
                   tickvals = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], ticktext = df['list'],
                   label='Items', values=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25])
            ])
        )
)
fig.show()