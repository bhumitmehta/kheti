import React, { useState } from 'react';

const Sidebar = ({ data, setData }) => {
    const [isExpanded, setIsExpanded] = useState(false); // Track whether details are shown or hidden

    const toggleDetails = () => {
        setIsExpanded(!isExpanded); // Toggle the visibility of details
    };

    return (
        <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg m-1 mr-4 ml-1 mt-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Selected Details</h2>
            <div className="space-y-6">
                {/* Equipment Type */}
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Equipment Type:</span>
                    <span className="text-gray-600">{data.equipment_type || "Not selected"}</span>
                </div>

                {/* Manufacturer Section */}
                <div className="border-t pt-3">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={toggleDetails} // Toggle details on click
                    >
                        <span className="font-semibold text-gray-700">Manufacturer:</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="text-gray-600">{data.manufacturer || "Not selected"}</span>
                    </div>

                    {/* Conditionally render details based on isExpanded */}
                    {isExpanded && (
                        <div className="ml-4 mt-2 space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Model Type:</span>
                                <span className="text-gray-600">{data.model_type || "Not selected"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Model Name:</span>
                                <span className="text-gray-600">{data.model_name || "Not selected"}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Specifications */}
                <div>
                    <span className="font-semibold text-gray-700">Specifications:</span>
                    <div className="mt-3 space-y-3">
                        {Object.entries(data.specs).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                                <label className="text-gray-600 capitalize">{key}:</label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            specs: { ...prev.specs, [key]: e.target.value },
                                        }))
                                    }
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Daily Rent and Availability */}
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Daily Rent:</span>
                    <span className="text-gray-600">${data.daily_rent || "0"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Available From:</span>
                    <span className="text-gray-600">
                        {data.available_from ? new Date(data.available_from).toLocaleDateString() : "Not set"}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Available Till:</span>
                    <span className="text-gray-600">
                        {data.available_till ? new Date(data.available_till).toLocaleDateString() : "Not set"}
                    </span>
                </div>

                {/* Location and Equipment Age */}
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Location:</span>
                    <span className="text-gray-600">
                        {data.location.address || "No address provided"}, {data.location.city || ""},{" "}
                        {data.location.state || ""}, {data.location.zipCode || ""}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Equipment Age:</span>
                    <span className="text-gray-600">{data.equipment_age || "Not specified"}</span>
                </div>

                {/* Uploaded Images */}
                <div>
                    <span className="font-semibold text-gray-700">Uploaded Images:</span>
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
