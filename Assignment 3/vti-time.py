import numpy as np
import vtk

def generate_vti_temporal_data(base_filename, num_time_steps, dimensions):
    for t in range(num_time_steps):
        # Generate random data for each time step
        random_data = np.random.rand(*dimensions)

        # Create a VTK ImageData object
        image_data = vtk.vtkImageData()
        image_data.SetDimensions(dimensions[0], dimensions[1], dimensions[2])

        # Create a VTK array to hold the data
        vtk_data_array = vtk.vtkDoubleArray()
        vtk_data_array.SetName("random_data")
        vtk_data_array.SetNumberOfComponents(1)
        vtk_data_array.SetNumberOfTuples(dimensions[0] * dimensions[1] * dimensions[2])

        # Populate the VTK array with the random data
        for i in range(dimensions[0]):
            for j in range(dimensions[1]):
                for k in range(dimensions[2]):
                    vtk_data_array.SetTuple1(i * dimensions[1] * dimensions[2] + j * dimensions[2] + k, random_data[i, j, k])

        # Assign the VTK array to the ImageData object
        image_data.GetPointData().SetScalars(vtk_data_array)

        # Write the ImageData object to a .vti file
        writer = vtk.vtkXMLImageDataWriter()
        writer.SetFileName(f"{base_filename}_{t:03d}.vti")
        writer.SetInputData(image_data)
        writer.Write()

# Example usage
base_filename = 'temporal_data'
num_time_steps = 10
dimensions = (10, 10, 10)  # Example dimensions for the data
generate_vti_temporal_data(base_filename, num_time_steps, dimensions)