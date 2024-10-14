import React from 'react';

const Sidebar = ({ data, setData }) => {
    console.log(data.images)
  return (
    
    <div className="w-1/3 border-l border-gray-300 p-6 bg-white shadow-md rounded-lg m-1 mr-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Selected Details</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Equipment Type:</span>
          <span className="text-gray-600">{data.equipment_type || "Not selected"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Manufacturer:</span>
          <span className="text-gray-600">{data.manufacturer || "Not selected"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Model Type:</span>
          <span className="text-gray-600">{data.model_type || "Not selected"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Model Name:</span>
          <span className="text-gray-600">{data.model_name || "Not selected"}</span>
        </div>

        <div>
          <span className="font-medium text-gray-700">Specifications:</span>
          <div className="mt-2 space-y-2">
            {Object.entries(data.specs).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <label className="text-gray-600">{key}:</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setData(prev => ({
                    ...prev,
                    specs: { ...prev.specs, [key]: e.target.value }
                  }))}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Daily Rent:</span>
          <span className="text-gray-600">${data.daily_rent || "0"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Available From:</span>
          <span className="text-gray-600">{data.available_from ? new Date(data.available_from).toLocaleDateString() : "Not set"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Available Till:</span>
          <span className="text-gray-600">{data.avaiable_till ? new Date(data.avaiable_till).toLocaleDateString() : "Not set"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Location:</span>
          <span className="text-gray-600">
            {data.location.address || "No address provided"}, {data.location.city || ""}, {data.location.state || ""}, {data.location.zipCode || ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Equipment Age:</span>
          <span className="text-gray-600">{data.equipment_age || "Not specified"}</span>
        </div>

        {/* New section for displaying uploaded images */}
        <div>
          <span className="font-medium text-gray-700">Uploaded Images:</span>
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
      </div>
    </div>
  );
};

export default Sidebar;
