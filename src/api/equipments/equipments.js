import axios from "axios";
// import instance from "../config";
// import Cookies from "js-cookie";
import { collection, getDocs,where, query ,doc,setDoc,getDoc} from "firebase/firestore";
import {db} from '../../firebase'

const url = "http://localhost:8000"; // Replace with your backend URL

// Dummy data for fallback based on JSON structure
const dummyEquipments = [
  { id: 1, name: "Tractor" },
  { id: 2, name: "Harvester" },
  { id: 3, name: "Farm Implements" },
  // Add more equipment categories as needed
];

const dummyBrands = {
  tractor: [
    { id: 1, name: "Mahindra" },
    { id: 2, name: "John Deere" },
    // Add more tractor brands
  ],
  harvester: [
    { id: 1, name: "New Holland" },
    { id: 2, name: "Class" },
    // Add more harvester brands
  ],
};

const dummyModels = {
  mahindra: [
    { id: 1, name: "Mahindra Oja" },
    { id: 2, name: "Mahindra Yuvo" },
  ],
  "john-deere": [
    { id: 1, name: "John Deere E100" },
    { id: 2, name: "John Deere D105" },
  ],
};

// Fetch all equipment names (tractors, harvesters, etc.)
export const getEquipments = async () => {
  
  const equipmentList = [];
  try {
    const querySnapshot = await getDocs(collection(db, "equipmentListings"));
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      equipmentList.push({ id: doc.id, ...doc.data() });
    });
    return equipmentList.length ? equipmentList : dummyEquipments;
  } catch (error) {
    console.log("Error while fetching equipment data from Firebase", error);
    return dummyEquipments; // Return dummy data on error
  }
};

// Fetch all brands based on equipment type (e.g., tractor)
export const getBrandsByEquipmentType = async (equipmentType) => {
  const brandList = [];
  try {
    const q = query(collection(db, "brands"), where("equipment_type", "==", equipmentType));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      brandList.push({ id: doc.id, ...doc.data() });
    });
    return brandList.length ? brandList : dummyBrands[equipmentType] || [];
  } catch (error) {
    console.log(`Error while fetching brands for ${equipmentType}`, error);
    return dummyBrands[equipmentType] || []; // Return dummy data on error
  }
};


// Fetch all models based on equipment type and brand (e.g., tractor & Mahindra)
export const getModelsByBrand = async (equipmentType, brand) => {
  const modelList = [];
  try {
    const q = query(
      collection(db, "models"),
      where("equipment_type", "==", equipmentType),
      where("brand", "==", brand)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      modelList.push({ id: doc.id, ...doc.data() });
    });
    return modelList.length ? modelList : dummyModels[brand.toLowerCase()] || [];
  } catch (error) {
    console.log(`Error while fetching models for ${brand}`, error);
    return dummyModels[brand.toLowerCase()] || []; // Return dummy data on error
  }
};

// Fetch specific equipment details based on equipment type, brand, and model
export const getEquipmentDetails = async (equipmentType, brand, model) => {
  try {
    const q = query(
      collection(db, "equipmentListings"),
      where("equipment_type", "==", equipmentType),
      where("brand", "==", brand),
      where("model", "==", model)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]; // Assuming one document matches the query
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.log(`Error while fetching equipment details for ${brand} ${model}`, error);
    return null;
  }
};

// Create a report for specific equipment
export const createEquipmentReport = async ({ equipment, report_reason, description }) => {
  try {
    const reportDoc = doc(db, "equipment_reports", equipment.id); // Create report under `equipment_reports` collection
    await setDoc(reportDoc, {
      equipment,
      report_reason,
      description,
      reported_at: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.log("Error while creating equipment report", error);
    return null;
  }
};

export const getEquipmentsWithUserData = async () => {
  const equipmentList = [];

  try {
    // Fetch equipment listings
    const equipmentSnapshot = await getDocs(collection(db, "equipmentListings"));
    
    // Loop through each equipment and fetch user data based on the UUID
    for (const equipmentDoc of equipmentSnapshot.docs) {
      const equipmentData = { id: equipmentDoc.id, ...equipmentDoc.data() };
      const { uuid } = equipmentData;
      let uid = uuid
      if (uuid) {
        // Fetch user data for the equipment based on the UUID
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          equipmentData.user = { id: userDoc.id, ...userData }; // Attach user data to equipment
        } else {
          console.log(`User with uuid: ${uuid} not found.`);
          equipmentData.user = null; // Set to null if user is not found
        }
      }

      equipmentList.push(equipmentData);
    }

    return equipmentList.length ? equipmentList : dummyEquipments;
  } catch (error) {
    console.log("Error while fetching equipment and user data from Firebase", error);
    return dummyEquipments; // Return dummy data on error
  }
};