import { useState, useEffect } from "react";
import Geocode from "react-geocode";

// Set your API key from Google Geocoding API
Geocode.setApiKey("YOUR_GOOGLE_MAPS_API_KEY");

// Custom hook for getting geolocation and address
const useGeolocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);

          // Reverse geocode to get the address details
          Geocode.fromLatLng(latitude, longitude).then(
            (response) => {
              const results = response.results[0];
              setAddress(results.formatted_address);

              // Parse address components
              results.address_components.forEach((component) => {
                if (component.types.includes("country")) {
                  setCountry(component.long_name);
                }
                if (component.types.includes("administrative_area_level_1")) {
                  setState(component.long_name);
                }
                if (component.types.includes("locality")) {
                  setCity(component.long_name);
                }
                if (component.types.includes("postal_code")) {
                  setPincode(component.long_name);
                }
              });
            },
            (error) => {
              console.error("Geocode error: ", error);
            }
          );
        },
        (error) => {
          console.error("Geolocation error: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return {location:{ latitude, longitude, address, country, state, city, pincode} };
};

export default useGeolocation;
