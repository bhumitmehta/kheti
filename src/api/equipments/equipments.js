import axios from "axios";
import instance from "../config";
import Cookies from "js-cookie";

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
  try {
    const response = await axios.get(`${url}/api/equipments`);
    return response.data || dummyEquipments; // Return server data or dummy data
  } catch (error) {
    console.log("Error while calling getEquipments API", error);
    return dummyEquipments; // Return dummy data on error
  }
};

// Fetch all brands based on equipment type (e.g., tractor)
export const getBrandsByEquipmentType = async (equipmentType) => {
  try {
    const response = await axios.get(`${url}/api/equipment/equipment_type?type=${equipmentType}`);
    return response.data || dummyBrands[equipmentType] || []; // Return server data or dummy data
  } catch (error) {
    console.log(`Error while fetching brands for ${equipmentType}`, error);
    return dummyBrands[equipmentType] || []; // Return dummy data on error
  }
};

// Fetch all models based on equipment type and brand (e.g., tractor & Mahindra)
export const getModelsByBrand = async (equipmentType, brand) => {
  try {
    const response = await axios.get(`${url}/api/equipment/equipment_type?type=${equipmentType}&brand=${brand}`);
    return response.data || dummyModels[brand.toLowerCase()] || []; // Return server data or dummy data
  } catch (error) {
    console.log(`Error while fetching models for ${brand} in ${equipmentType}`, error);
    return dummyModels[brand.toLowerCase()] || []; // Return dummy data on error
  }
};

// Fetch specific equipment details based on equipment type, brand, and model
export const getEquipmentDetails = async (equipmentType, brand, model) => {
  try {
    const response = await axios.get(
      `${url}/api/equipment/equipment_type?type=${equipmentType}&brand=${brand}&model=${model}`
    );
    return response.data || null; // Return server data or null if not found
  } catch (error) {
    console.log(`Error while fetching equipment details for ${brand} ${model}`, error);
    return null; // Return null on error
  }
};

// Create a report for specific equipment
export const createEquipmentReport = async ({
  equipment,
  report_reason,
  description,
}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("access-token")}`,
    };
    const response = await instance.post(
      "/enquiry/report-equipment",
      {
        equipment,
        report_reason,
        description,
      },
      { headers }
    );
    return response.data || null; // Return server response or null on failure
  } catch (error) {
    console.log("Error while calling createEquipmentReport API", error);
    return null; // Return null on error
  }
};

// Create new equipment entry on the server
export const createEquipment = async ({
  owner,
  manufacturer,
  title,
  description,
  equipment_type,
  available_start_time,
  available_end_time,
  equipment_location,
  daily_rental,
  hourly_rental,
  manufacturing_year,
  model,
  condition,
  horsepower,
  width,
  height,
}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("access-token")}`,
    };
    const response = await instance.post(
      "/api/equipment/create/",
      {
        owner,
        manufacturer,
        title,
        description,
        equipment_type,
        available_start_time,
        available_end_time,
        equipment_location,
        daily_rental,
        hourly_rental,
        manufacturing_year,
        model,
        condition,
        horsepower,
        width,
        height,
      },
      { headers }
    );
    return response.data || null; // Return server response or null on failure
  } catch (error) {
    console.log("Error while calling createEquipment API", error);
    return null; // Return null on error
  }
};

// Booking api

// export const getBookings = async () => {
//     try {
//         const headers = {
//             "Content-Type": "application/json",
//             Authorization: `"Bearer ${Cookies.get('access-token')}`
//         };
//         return await axios.get('/api/booking' , { headers });
//     } catch(error) {
//         console.log('Error while calling getBookings API', error);
//     }
// }

// export const getBookingDetail = async (id) => {
//     try {
//         const headers = {
//             "Content-Type": "application/json",
//             Authorization: `"Bearer ${Cookies.get('access-token')}`
//         };
//         return await axios.get(`/api/booking/detail/${id}` , { headers });
//     } catch(error) {
//         console.log('Error while calling getBookingDetail API', error);
//     }
// }

// export const updateBooking = async (data, id) => {
//     try {
//         const headers = {
//             "Content-Type": "application/json",
//             Authorization: `"Bearer ${Cookies.get('access-token')}`
//         };
//         return await axios.get(`/api/booking/update/${id}` , { data }, { headers });
//     } catch(error) {
//         console.log('Error while calling getBookingDetail API', error);
//     }
// }

//  Feedback
export const submitFeedback = async ({ name, phone_number, description }) => {
  try {
    return await axios.post("/enquiry/feedback", {
      name,
      phone_number,
      description,
    });
  } catch (error) {
    console.log("Error while calling submitFeedback API", error);
  }
};
