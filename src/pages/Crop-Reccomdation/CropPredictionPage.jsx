import React, { useState } from 'react';

const CropPredictionPage = () => {
    const [cropInputs, setCropInputs] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: ''
    });
    const [predictedCrop, setPredictedCrop] = useState(null);
    const [addProductionInputs, setAddProductionInputs] = useState({
        crop_name: '',
        production_value: ''
    });
    const [newProductionValue, setNewProductionValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCropInputChange = (e) => {
        const { name, value } = e.target;
        setCropInputs(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleProductionInputChange = (e) => {
        const { name, value } = e.target;
        setAddProductionInputs(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const validateInputs = (inputs) => {
        const requiredFields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'];
        const missingFields = requiredFields.filter(field => !inputs[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        }

        if (inputs.ph < 0 || inputs.ph > 14) throw new Error('pH must be between 0 and 14');
        if (inputs.humidity < 0 || inputs.humidity > 100) throw new Error('Humidity must be between 0 and 100%');
        if (inputs.temperature < -50 || inputs.temperature > 100) throw new Error('Temperature seems out of reasonable range');
        if (inputs.rainfall < 0) throw new Error('Rainfall cannot be negative');
    };

    const handlePredict = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            validateInputs(cropInputs);

            const response = await fetch('http://127.0.0.1:8000/predict_crop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(cropInputs)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.detail || `Server error: ${response.status}`);
            }

            const data = await response.json();
            setPredictedCrop(data);
        } catch (error) {
            console.error('Prediction error:', error);
            setError(error.message);
            setPredictedCrop(null);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduction = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (!addProductionInputs.crop_name.trim()) {
                throw new Error('Crop name is required');
            }
            if (!addProductionInputs.production_value || addProductionInputs.production_value <= 0) {
                throw new Error('Please enter a valid production value');
            }

            const response = await fetch('http://127.0.0.1:8000/add_production/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(addProductionInputs)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.detail || `Server error: ${response.status}`);
            }

            const data = await response.json();
            setNewProductionValue(data.message);
            
            setAddProductionInputs({
                crop_name: '',
                production_value: ''
            });
        } catch (error) {
            console.error('Production update error:', error);
            setError(error.message);
            setNewProductionValue(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Crop Prediction and Production Management</h1>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            {/* Crop Prediction Section */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Predict Crop</h2>
                <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {Object.entries(cropInputs).map(([field, value]) => (
                        <div key={field} className="space-y-2">
                            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type="number"
                                step="any"
                                id={field}
                                name={field}
                                value={value}
                                onChange={handleCropInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                placeholder={`Enter ${field}`}
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={loading}
                        className="col-span-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Predicting...' : 'Predict Crop'}
                    </button>
                </form>

                {predictedCrop && (
                    <div className="p-4 border rounded-lg bg-green-50 space-y-2">
                        <h3 className="text-xl font-bold text-green-900">Recommended Crop</h3>
                        <p className="text-green-800">Crop: {predictedCrop.recommended_crop}</p>
                        <p className="text-green-800">Probability: {(predictedCrop.probability * 100).toFixed(1)}%</p>
                        <p className="text-green-800">Production Value: {predictedCrop.production_value}</p>
                    </div>
                )}
            </div>

            {/* Add Production Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Add Crop Production</h2>
                <form onSubmit={handleAddProduction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="crop_name" className="block text-sm font-medium text-gray-700">
                            Crop Name
                        </label>
                        <input
                            type="text"
                            id="crop_name"
                            name="crop_name"
                            value={addProductionInputs.crop_name}
                            onChange={handleProductionInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter crop name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="production_value" className="block text-sm font-medium text-gray-700">
                            Production Value
                        </label>
                        <input
                            type="number"
                            id="production_value"
                            name="production_value"
                            value={addProductionInputs.production_value}
                            onChange={handleProductionInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter production value"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="col-span-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Updating...' : 'Add Production'}
                    </button>
                </form>

                {newProductionValue && (
                    <div className="mt-4 p-4 border rounded-lg bg-blue-50">
                        <p className="text-blue-800">{newProductionValue}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CropPredictionPage;