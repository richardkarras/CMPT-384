import pandas as pd

# Load the CSV file
input_file = "D:/CMPT 384/Assignment 2/18100004.csv"
output_file = "D:/CMPT 384/Assignment 2/filtered_18100004.csv"

# Read CSV
df = pd.read_csv(input_file)

# Extract year from 'REF_DATE' and convert to integer
df["Year"] = pd.to_datetime(df["REF_DATE"]).dt.year

# Apply filters
df_filtered = df[
    (df["Year"] >= 2000) &  # Keep entries from 2000 onward
    (df["GEO"].str.contains("Saskatchewan", case=False, na=False)) &  # Keep only Saskatchewan
    (~df["Products and product groups"].str.startswith("All-items", na=False))  # Remove "All-items"
]

# Save the filtered dataset
df_filtered.to_csv(output_file, index=False)

print(f"Filtered CSV saved as: {output_file}")
