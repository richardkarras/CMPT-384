import numpy as np
import vtk
def create_some_vti(vti_file, dimensions):
    # Generate some data
    data_array = np.random.rand(*dimensions)
    
    # Create a structured points object
    structured_points = vtk.vtkStructuredPoints()
    structured_points.SetDimensions(dimensions[0], dimensions[1], dimensions[2])

    # Create VTK array to hold the data
    vtk_data_array1 = vtk.vtkDoubleArray()
    vtk_data_array1.SetName("temp")
    vtk_data_array1.SetNumberOfComponents(1)
    vtk_data_array1.SetNumberOfTuples(dimensions[0] * dimensions[1] * dimensions[2])
    
    # Populate the VTK array with the data
    for i in range(dimensions[0]):
        for j in range(dimensions[1]):
            for k in range(dimensions[2]):
                value = i * i + j + k
                vtk_data_array1.SetTuple1(i * dimensions[1] * dimensions[2] + j * dimensions[2] + k, value)
    
    # Assign the VTK array to the structured points object
    vtk_data_array2 = vtk.vtkDoubleArray()
    vtk_data_array2.SetNumberOfComponents(1)
    vtk_data_array2.SetName("humidity")
    vtk_data_array2.SetNumberOfTuples(dimensions[0] * dimensions[1] * dimensions[2])
    # Populate the VTK array with the data
    for i in range(dimensions[0]):
        for j in range(dimensions[1]):
            for k in range(dimensions[2]):
                value = i + i * j + k * k
                vtk_data_array2.SetTuple1(i * dimensions[1] * dimensions[2] + j * dimensions[2] + k, value)
 
    # Assign the VTK array to the structured points object
    structured_points.GetPointData().AddArray(vtk_data_array1)
    structured_points.GetPointData().AddArray(vtk_data_array2)
    
    # Write the structured points object to a .vti file
    writer = vtk.vtkXMLImageDataWriter()
    writer.SetFileName(vti_file)
    writer.SetInputData(structured_points)
    writer.Write()

    # Write the structured points data to a CSV file
    with open(csv_file, 'w') as f:
        f.write("x,y,z,temp,humidity\n")
        for i in range(dimensions[0]):
            for j in range(dimensions[1]):
                for k in range(dimensions[2]):
                    temp_value = vtk_data_array1.GetTuple1(i * dimensions[1] * dimensions[2] + j * dimensions[2] + k)
                    humidity_value = vtk_data_array2.GetTuple1(i * dimensions[1] * dimensions[2] + j * dimensions[2] + k)
                    f.write(f"{i},{j},{k},{temp_value},{humidity_value}\n")
 
# Example usage
vti_file = 'data.vti'
csv_file = 'data.csv'
numDim = 10
dimensions = (numDim, numDim, numDim) # Example dimensions for the data
create_some_vti(vti_file, dimensions)