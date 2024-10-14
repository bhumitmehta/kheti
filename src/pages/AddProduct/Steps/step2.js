import React, { useEffect, useState } from "react";
import { db } from "../../../firebase"; // Import your Firebase config
import { collection, query, where, getDocs } from "firebase/firestore";

const Step2 = ({ data, setData, nextStep, prevStep }) => {
  const [brands, setBrands] = useState([]); // State to store brands
  const [models, setModels] = useState([]); // State to store models based on model types
  const [isModelSelected, setIsModelSelected] = useState(false); // State for Next button enable/disable
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedBrand, setSelectedBrand] = useState(null); // Track the selected brand
  const [selectedModelType, setSelectedModelType] = useState(""); // Track the selected model type
  const [selectedModel, setSelectedModel] = useState(null); // Track the selected model

  useEffect(() => {
    const fetchBrands = async () => {
      const brandsCollection = collection(db, "manufacturers");
      const brandDocs = await getDocs(brandsCollection);
      const brandData = brandDocs.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBrands(brandData);
    };

    fetchBrands();
  }, []);

  const handleBrandClick = (brand) => {
    setData({ ...data, manufacturer: brand.id });
    setSelectedBrand(brand);
    setIsModelSelected(false);
    setSelectedModelType(""); // Reset model type selection
    setSelectedModel(null); // Reset selected model
  };

  const handleModelTypeClick = async (modelType) => {
    setSelectedModelType(modelType);
    setData({ ...data, model_type: modelType }); // Save selected model type

    // Fetch models based on selected manufacturer and model type
    const modelsCollection = collection(db, "equipments");
    const q = query(
      modelsCollection,
      where("manufacturer", "==", selectedBrand.id),
      where("model_type", "==", modelType)
    );

    const querySnapshot = await getDocs(q);
    const modelData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setModels(modelData);
    setIsModelSelected(false); // Reset model selection when model type changes
    setSelectedModel(null); // Reset selected model
  };

  const handleEquipmentClick = (model) => {
    console.log(model.id)
    setData({ ...data, equipment_id: model.id, model_name: model.model_name ,specs : model.specs });
    console.log(data) 
    setIsModelSelected(true); // Enable Next button when a model is selected
    setSelectedModel(model); // Track the selected model
  };

  // Filter brands based on the search term
  const filteredBrands = brands.filter(brand =>
    brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md px-3 mb-4">
        <input
          type="text"
          placeholder="Search Brands"
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-lg mb-4">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            className={`cursor-pointer flex flex-col items-center border p-2 rounded hover:shadow-lg transition h-24 ${selectedBrand && selectedBrand.id === brand.id ? "border-2 border-green-500" : ""}`} // Green border for selected brand
            onClick={() => handleBrandClick(brand)}
          >
            <img
              src={brand.brand_icon}
              alt={brand.brand_name}
              className="h-16 w-16 object-contain mb-2"
            />
            <h2 className="text-center font-bold overflow-hidden text-ellipsis whitespace-nowrap">{brand.brand_name}</h2>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div className="w-full px-3 border p-2 mb-4">
          <h2 className="font-bold text-lg mb-2">Model Types of {selectedBrand.brand_name}:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {selectedBrand.model_types && selectedBrand.model_types.map((modelType) => (
              <div
                key={modelType}
                className={`cursor-pointer border p-3 rounded hover:bg-gray-200 transition flex flex-col items-center h-24 ${selectedModelType === modelType ? "border-2 border-green-500" : ""}`} // Green border for selected model type
                onClick={() => handleModelTypeClick(modelType)}
              >
                <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">{modelType}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedModelType && models.length > 0 && (
        <div className="w-full  px-3 border p-2 mb-4">
          <h2 className="font-bold text-lg mb-2">Equipments for {selectedModelType}:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {models.map((model) => (
              <div
                key={model.id}
                className={`cursor-pointer border p-3 rounded hover:bg-gray-200 transition flex flex-col items-center h-24 ${selectedModel && selectedModel.id === model.id ? "border-2 border-green-500" : ""}`} // Green border for selected equipment model
                onClick={() => handleEquipmentClick(model)}
              >
                <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">{model.model_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={prevStep}
          className="mr-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className={`bg-gray-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ${!isModelSelected ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!isModelSelected}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
