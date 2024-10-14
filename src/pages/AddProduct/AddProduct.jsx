import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase"; // Import db and storage from Firebase config
import { addDoc, collection } from "firebase/firestore"; // Firestore methods
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Storage methods
import Step1 from "./Steps/step1";
import Step2 from "./Steps/step2";
import Step3 from "./Steps/step3";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import { getAuth } from "firebase/auth"; // Import the getAuth function

const AddProduct = () => {
  const [step, setStep] = useState(1); // Track the form step
  const [image, setImage] = useState(null); // Image state
  const [equipments, setEquipments] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  const [data, setData] = useState({
    images: [], // Will store image URLs
    equipment_type: '',
    manufacturer: '',
    model_type: '',
    model_name: '',
    specs: {},
    uuid: '',
    daily_rent: 0,
    available_from: Date(),
    available_till: Date(),
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
      let imageUrls = []; // Array to hold all image URLs
  
      // Get the user's UID using Firebase Auth
      const auth = getAuth(); // Get the Auth instance
      const user = auth.currentUser; // Get the currently signed-in user
      const userUid = user ? user.uid : null; // Get the user's UID (or null if not signed in)
  
      // Check if user is authenticated
      if (!userUid) {
        alert("User is not authenticated. Please log in.");
        return; // Exit the function if no user is logged in
      }
  
      // Iterate through each image in data.images
      for (const image of data.images) {
        if (image) {
          // Create a unique reference for each image using its name and lastModifiedDate
          const imageRef = ref(storage, `equipmentImages/${image.name}_${image.lastModifiedDate}`);
          console.log("Uploading image:", imageRef.fullPath);
  
          // Upload the image to Firebase Storage
          await uploadBytes(imageRef, image);
          
          // Get the download URL after successful upload
          const downloadUrl = await getDownloadURL(imageRef);
          imageUrls.push(downloadUrl); // Add the URL to the array
        }
      }
  
      // Prepare the data with all image URLs and remove specific fields
      const { equipment_type, manufacturer, model_type, model_name, ...remainingData } = data;
  
      const equipmentData = {
        ...remainingData,
        images: imageUrls, // Include all image URLs in the data object
        uuid: userUid, // Add the user's UID
      };
  
      // Add the equipment data to Firestore
      const docRef = await addDoc(collection(db, "equipmentListings"), equipmentData);
      
      if (docRef.id) {
        alert("Equipment created successfully!");
        navigate("/booking-history"); // Navigate to the booking history page after successful upload
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
      <Sidebar data={data} setData={setData} /> {/* Add Sidebar to display selected details */}
    </div>
  );
};

export default AddProduct;
