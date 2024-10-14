import React from "react";

const Step3 = ({ data, setData, prevStep, handleImageUpload, handleSubmit, images }) => {
  // Handle multiple image uploads
  const handleMultipleImageUpload = (e) => {
    const files = Array.from(e.target.files);  // Convert to array
    setData((prevData) => ({
      ...prevData,
      images: [...(prevData.images || []), ...files],  // Append new files to the existing ones
    }));
  };
  

  return (
    <div className="flex flex-col space-y-4">
      {/* Image Upload Section */}
      <div className="w-1/2 md:w-1/2 px-3 border p-2">
        <label className="form-label w-1/2 text-sm font-bold text-gray-500 inline-block pl-2 mb-2">
          Upload Images*
        </label>
        <input
          type="file"
          multiple
          onChange={handleMultipleImageUpload} // Update handler for multiple images
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
        />
        <div className="mt-2 grid grid-cols-3 gap-2">
        {data.images && data.images.length > 0 ? (
              data.images.map((image, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md border border-gray-300"
                  />
                  <span className="text-gray-600 text-sm">{image.name}</span>
                </div>
              ))
            ) : (
              <span className="text-gray-600">No images uploaded</span>
            )}
            </div>
      </div>

      {/* Hourly Rental Section */}
      <div className="w-1/2 md:w-1/2 px-3 border p-2">
        <label className="form-label w-1/2 text-sm font-bold text-gray-500 inline-block pl-2 mb-2">
          Hourly Rental*
        </label>
        <input
          type="text"
          className="appearance-none block w-full rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={data.hourly_rental}
          onChange={(e) => setData({ ...data, daily_rent: e.target.value })}
          placeholder="Enter hourly rental price"
        />
      </div>

      {/* Condition Section */}
      <div className="w-1/2 md:w-1/2 px-3 border p-2">
        <label className="form-label w-1/2 text-sm font-bold text-gray-500 inline-block pl-2 mb-2">
          Condition*
        </label>
        <input
          type="text"
          className="appearance-none block w-full rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={data.condition}
          onChange={(e) => setData({ ...data, condition: e.target.value })}
          placeholder="Enter condition"
        />
      </div>

      {/* Additional Input Fields */}
      <div className="w-1/2 md:w-1/2 px-3 border p-2">
        <label className="form-label w-1/2 text-sm font-bold text-gray-500 inline-block pl-2 mb-2">
          Equipment Age*
        </label>
        <input
          type="text"
          className="appearance-none block w-full rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={data.equipment_age}
          onChange={(e) => setData({ ...data, equipment_age: e.target.value })}
          placeholder="Enter equipment age"
        />
      </div>

      <div className="w-1/2 md:w-1/2 px-3 border p-2">
        <label className="form-label w-1/2 text-sm font-bold text-gray-500 inline-block pl-2 mb-2">
          Manufacturer*
        </label>
        <input
          type="text"
          className="appearance-none block w-full rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={data.manufacturer}
          onChange={(e) => setData({ ...data, manufacturer: e.target.value })}
          placeholder="Enter manufacturer name"
        />
      </div>

      <div className="w-1/2 md:w-1/2 px-3 border p-2">
        <label className="form-label w-1/2 text-sm font-bold text-gray-500 inline-block pl-2 mb-2">
          Model Name*
        </label>
        <input
          type="text"
          className="appearance-none block w-full rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={data.model_name}
          onChange={(e) => setData({ ...data, model_name: e.target.value })}
          placeholder="Enter model name"
        />
      </div>

      {/* Back and Submit Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={prevStep}
          className="mr-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
        >
          Back
        </button>
        <button
          type="button" // Change to "button" to handle submit with the handleSubmit function
          onClick={handleSubmit}
          className="bg-darkgreen hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step3;
