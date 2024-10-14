import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "./Steps/step1";
import Step2 from "./Steps/step2";
import Step3 from "./Steps/step3";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const AddProduct = () => {
  const [step, setStep] = useState(1); // Track the form step
  const [image, setImage] = useState(null); // Image state
  const [equipments, setEquipments] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  const [data, setData] = useState({
    images: [],
    equipment_type: '',
    manufacturer: '',
    model_type: '',
    model_name: '',
    specs: {},
    uuid: '',
    daily_rent: 0,
    available_from: Date(),
    avaiable_till: Date(),
    location: {
      lattitude: null,
      longitude: null,
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    equipment_age: null,
    equipment_id: null,
  });

  useEffect(() => {
    let isMounted = true;

    const getEquipment = async () => {
      try {
        const dummyEquipments = [
          { id: 1, title: "Tractor" },
          { id: 2, title: "Plough" },
        ];
        if (isMounted) setEquipments(dummyEquipments);
      } catch (error) {
        console.log("Error fetching equipment data:", error);
      }
    };

    const getBrand = async () => {
      try {
        const dummyBrands = [
          { id: 1, name: "Brand A" },
          { id: 2, name: "Brand B" },
        ];
        if (isMounted) setBrands(dummyBrands);
      } catch (error) {
        console.log("Error fetching brands:", error);
      }
    };

    getEquipment();
    getBrand();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateEquipment = async (e) => {
    e.preventDefault();

    try {
      const res = { data: { success: true, message: "Equipment created successfully!" } };
      if (res.data.success) {
        alert(res.data.message);
        navigate("/booking-history");
      }
    } catch (error) {
      console.error("Error creating equipment:", error);
    }
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]); // Set uploaded image
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex">
      <div className="w-2/3 my-10 max-w-6xl mx-auto">
        <div className="border-l-2 border-green-600 pl-6">
          <h1 className="text-2xl font-semibold text-gray-700">
            Describe Your Equipment
          </h1>
          <p className="text-md font-semibold mt-2 text-gray-500">
            Provide key details of your equipment to Sell Or Rent Out
          </p>
        </div>
        <form onSubmit={handleCreateEquipment}>
          {step === 1 && (
            <Step1
              data={data}
              equipments={equipments}
              setData={setData}
              nextStep={nextStep}
            />
          )}

          {step === 2 && (
            <Step2
              data={data}
              brands={brands}
              setData={setData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 3 && (
            <Step3
              data={data}
              setData={setData}
              prevStep={prevStep}
              handleImageUpload={handleImageUpload}
              handleSubmit={handleCreateEquipment}
              image={image}
            />
          )}
        </form>
      </div>
      <Sidebar data={data} setData ={setData} /> {/* Add Sidebar to display selected details */}
    </div>
  );
};

export default AddProduct;
