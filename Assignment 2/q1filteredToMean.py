import pandas as pd

# Load the filtered CSV file
input_file = "D:/CMPT 384/Assignment 2/filtered_18100004.csv"
output_file = "D:/CMPT 384/Assignment 2/yearly_mean_18100004.csv"

# Read CSV
df = pd.read_csv(input_file)

# Ensure 'REF_DATE' is treated as datetime and extract year
df["Year"] = pd.to_datetime(df["REF_DATE"]).dt.year

# Drop rows with missing 'VALUE' (price)
df = df.dropna(subset=["VALUE"])

# Compute yearly mean price for each product
yearly_mean = df.groupby(["Products and product groups", "Year"])["VALUE"].mean().unstack()

# Drop products with missing values in any year
yearly_mean = yearly_mean.dropna()

# Compute the typical value (median price) per product
typical_value = yearly_mean.median(axis=1)

# Add "Stat" column
yearly_mean["Stat"] = "" #formula entered in Excel to calculate the STAT column: =MAX(ABS(B[i]-C[i]),ABS(C[i]-D[i]),...,ABS(Y[i]-Z[i])) where i is the row number

# Rename index to "Product"
yearly_mean.reset_index(inplace=True)
yearly_mean.rename(columns={"Products and product groups": "Product"}, inplace=True)

# Save to CSV
yearly_mean.to_csv(output_file, index=False)

print(f"Yearly mean data saved as: {output_file}")
