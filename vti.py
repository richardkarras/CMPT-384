import numpy as np
import vtk

def create_random_vti(vti_file, dimensions):
    # Generate random data
    data_array = np.random.rand(*dimensions)

    # Create a structured points object
    structured_points = vtk.vtkStructuredPoints()
    structured_points.SetDimensions(dimensions[0], dimensions[1], dimensions[2])

    # Create VTK array to hold the data
    vtk_data_array = vtk.vtkDoubleArray()
    vtk_data_array.SetNumberOfComponents(1)
    vtk_data_array.SetNumberOfTuples(dimensions[0] * dimensions[1] * dimensions[2])

    # Populate the VTK array with the random data
    for i in range(dimensions[0]):
        for j in range(dimensions[1]):
            for k in range(dimensions[2]):
                vtk_data_array.SetTuple1(i * dimensions[1] * dimensions[2] + j * dimensions[2] + k, data_array[i, j, k])

    # Assign the VTK array to the structured points object
    structured_points.GetPointData().SetScalars(vtk_data_array)

    # Write the structured points object to a .vti file
    writer = vtk.vtkXMLImageDataWriter()
    writer.SetFileName(vti_file)
    writer.SetInputData(structured_points)
    writer.Write()

# Example usage
vti_file = 'random_data.vti'
dimensions = (10, 10, 10)  # Example dimensions for the random data
create_random_vti(vti_file, dimensions)