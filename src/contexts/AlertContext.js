import React, { createContext, useContext, useState } from "react";

// Create a context for the alert
const AlertContext = createContext();

// Create a provider component
export const AlertProvider = ({ children }) => {
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
  };

  const clearAlert = () => {
    setAlertType(null);
    setAlertMessage("");
  };

  return (
    <AlertContext.Provider value={{ alertType, alertMessage, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// Create a custom hook to use the AlertContext
export const useAlert = () => useContext(AlertContext);
