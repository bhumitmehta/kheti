import axios from "axios";
import { getAuth } from "firebase/auth"; // Firebase auth module

const instance = axios.create({
  baseURL: "https://localhost:8000",
});

// Function to get the Firebase token
const getFirebaseToken = async () => {
  const auth = getAuth(); // Get Firebase Auth instance
  const currentUser = auth.currentUser;
  
  if (currentUser) {
    return await currentUser.getIdToken(); // Firebase will automatically refresh if necessary
  } else {
    throw new Error("User is not authenticated");
  }
};

// Request interceptor to add the Firebase token to all requests
instance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getFirebaseToken(); // Get the token
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to the headers
      return config;
    } catch (error) {
      console.error("Error retrieving Firebase token", error);
      throw error;
    }
  },
  (error) => Promise.reject(error)
);

export default instance;
