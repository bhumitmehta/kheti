import React, { useState } from 'react';
import axios from 'axios';

const CropRecommendationPage = () => {
  // State variables for input data
  const [cropInput, setCropInput] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });

  // State variable for API response
  const [recommendedCrop, setRecommendedCrop] = useState(null);
  const [productionMessage, setProductionMessage] = useState('');
  const [cropProduction, setCropProduction] = useState({
    crop_name: '',
    production_value: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCropInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  // Handle crop production input change
  const handleProductionChange = (e) => {
    const { name, value } = e.target;
    setCropProduction((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  // API call to get crop recommendation
  const handleCropRecommendation = async () => {
    try {
      const response = await axios.post('http://localhost:8000/predict_crop', cropInput);
      setRecommendedCrop(response.data);
    } catch (error) {
      console.error("Error fetching crop recommendation:", error);
    }
  };

  // API call to update crop production
  const handleAddProduction = async () => {
    try {
      const response = await axios.post('http://localhost:8000/add_production/', cropProduction);
      setProductionMessage(response.data.message);
    } catch (error) {
      console.error("Error updating crop production:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Crop Recommendation</h2>
      
      {/* Crop Inputs Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Enter Crop Details</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          {['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 font-medium">{field}:</label>
              <input
                type="number"
                name={field}
                value={cropInput[field]}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
          <button 
            type="button" 
            onClick={handleCropRecommendation} 
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300">
            Get Recommendation
          </button>
        </form>
      </div>

      {/* Display Top 3 Crop Recommendations */}
      {recommendedCrop && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Recommended Crop</h3>
          <div className="mt-4">
            <p className="text-gray-600">Crop: <span className="font-bold text-indigo-600">{recommendedCrop.recommended_crop}</span></p>
            <p className="text-gray-600">Probability: {recommendedCrop.probability}</p>
            <p className="text-gray-600">Production Value: {recommendedCrop.production_value}</p>
          </div>
        </div>
      )}

      {/* Crop Production Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Update Crop Production</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Crop Name:</label>
            <input
              type="text"
              name="crop_name"
              value={cropProduction.crop_name}
              onChange={handleProductionChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Production Value:</label>
            <input
              type="number"
              name="production_value"
              value={cropProduction.production_value}
              onChange={handleProductionChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button 
            type="button" 
            onClick={handleAddProduction} 
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition duration-300">
            Update Production
          </button>
        </form>
        {productionMessage && <p className="mt-4 text-green-600 font-medium">{productionMessage}</p>}
      </div>
    </div>
  );
};

export default CropRecommendationPage;
