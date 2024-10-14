import React, { useState } from "react";
import InputField from "../../../components/input/InputField"; // Adjust the path as necessary
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Import styles
import "react-date-range/dist/theme/default.css"; // Import theme styles

const Step3 = ({ data, setData, prevStep, handleImageUpload, handleSubmit, images }) => {
  // State to manage date range
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(), // Default start date
    endDate: new Date(), // Default end date
    key: 'selection', // Key for the selection
  });

  // Handle date range selection
  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    console.log(ranges.selectionRange)
    setData((prevData) => ({
      ...prevData,
      available_from: ranges.selection.startDate.toISOString(), // Set available_from in ISO format
      available_till: ranges.selection.endDate.toISOString(), // Set available_till in ISO format
    }));
  };

  // Handle multiple image uploads
  const handleMultipleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert to array
    setData((prevData) => ({
      ...prevData,
      images: [...(prevData.images || []), ...files], // Append new files to the existing ones
    }));
  };

  // Update availability dates to current date
  const updateAvailabilityDates = () => {
    const currentDate = new Date();
    setData((prevData) => ({
      ...prevData,
      available_from: currentDate.toISOString(),
      available_till: currentDate.toISOString(),
    }));
    setSelectionRange({
      startDate: currentDate,
      endDate: currentDate,
      key: 'selection',
    });
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

      {/* Date Range Picker Section */}
      <div className="w-1/2 md:w-1/2 px-3 border p-2">
        <label className="form-label w-full text-sm font-bold text-gray-500 inline-block pl-2 mb-2">
          Availability Dates*
        </label>
        <DateRangePicker
          ranges={[selectionRange]} // Pass the selected range
          onChange={handleSelect} // Handle date selection
          minDate={new Date()} // Prevent selection of past dates
        />
      </div>

      {/* Button to Update Availability Dates */}
      <div className="flex justify-start mt-4">
        <button
          type="button"
          onClick={updateAvailabilityDates}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Update Availability Dates
        </button>
      </div>

      {/* Hourly Rental Section */}
      <div className="w-1/2 md:w-1/2 px-3 border p-2">
        <InputField
          label="Hourly Rental*"
          placeholder="Enter hourly rental price"
          type="text"
          value={data.daily_rent}
          onChange={(e) => setData({ ...data, daily_rent: e.target.value })}
          required
        />
      </div>

      {/* Condition Section */}
      <div className="w-1/2 md:w-1/2 px-3 border p-2">
        <InputField
          label="Condition*"
          placeholder="Enter condition"
          type="text"
          value={data.condition}
          onChange={(e) => setData({ ...data, condition: e.target.value })}
          required
        />
      </div>

      {/* Equipment Age Section */}
      <div className="w-1/2 md:w-1/2 px-3 border p-2">
        <InputField
          label="Equipment Age*"
          placeholder="Enter equipment age"
          type="text"
          value={data.equipment_age}
          onChange={(e) => setData({ ...data, equipment_age: e.target.value })}
          required
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
