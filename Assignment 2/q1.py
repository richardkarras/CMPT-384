import plotly.graph_objects as go
import pandas as pd

df = pd.read_csv("D:/CMPT 384/Assignment 2/q1.csv")

# Sort the DataFrame alphabetically by 'Product'
df_top_25 = df.nlargest(25, 'Stat').sort_values(by='Product', ascending=False)

# Add the product name dimension as the first dimension
dimensions = [
    dict(
        label='Product',
        tickvals=list(range(len(df_top_25))),
        ticktext=df_top_25['Product'].tolist(),
        values=list(range(len(df_top_25)))
    )
]

# Add the remaining dimensions
dimensions.extend([
    dict(
        range=[50, 500],  # Set the range for each year
        label=str(year),  # Set the label for each year
        values=df_top_25[str(year)],  # Set the values for each year
        constraintrange=[df_top_25[str(year)].min(), df_top_25[str(year)].max()]  # Enable brushing
    )
    for year in range(2000, 2025)
])

dimensions.append(
    dict(
        range=[df_top_25['Stat'].min(), df_top_25['Stat'].max()],
        tickvals=[i for i in range(0, 121, 5)],
        ticktext=[str(i) for i in range(0, 121, 5)],
        label='Stat',
        values=df_top_25['Stat'],
        constraintrange=[df_top_25['Stat'].min(), df_top_25['Stat'].max()]  # Enable brushing
    )
)

# Define cmin and cmax with meaningful names
cmin_value = 0  # Minimum value for color scale
cmax_value = 100  # Maximum value for color scale

fig = go.Figure(data=go.Parcoords(
    line=dict(color=df_top_25['Stat'],
              colorscale='RdBu',
              showscale=True,
              cmin=cmin_value,
              cmax=cmax_value),
    dimensions=dimensions
))

# Adjust layout to keep ticktext inside the SVG canvas
fig.update_layout(
    margin=dict(l=250, r=50, t=50, b=50),
    autosize=True
)

fig.show()