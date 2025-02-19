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
                vtk_data_array1.SetTuple1(i * dimensions[1] *
                dimensions[2] + j * dimensions[2] + k, 1)
    
    # Assign the VTK array to the structured points object
    vtk_data_array2 = vtk.vtkDoubleArray()
    vtk_data_array2.SetNumberOfComponents(1)
    vtk_data_array2.SetName("humidity")
    vtk_data_array2.SetNumberOfTuples(dimensions[0] * dimensions[1] * dimensions[2])
    # Populate the VTK array with the data
    for i in range(dimensions[0]):
        for j in range(dimensions[1]):
            for k in range(dimensions[2]):
                vtk_data_array2.SetTuple1(i * dimensions[1] *
                dimensions[2] + j * dimensions[2] + k, 1)
 
    # Assign the VTK array to the structured points object
    structured_points.GetPointData().AddArray(vtk_data_array1)
    structured_points.GetPointData().AddArray(vtk_data_array2)
    
    # Write the structured points object to a .vti file
    writer = vtk.vtkXMLImageDataWriter()
    writer.SetFileName(vti_file)
    writer.SetInputData(structured_points)
    writer.Write()
 
# Example usage
vti_file = ’data.vti’
dimensions = (10, 10, 10) # Example dimensions for the data
create_some_vti(vti_file, dimensions)