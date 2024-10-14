import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import your Firebase config
import { useAlert } from "../contexts/AlertContext"; // Import the Alert context

const ProtectedRoute = ({ children }) => {
  const { showAlert } = useAlert(); // Get showAlert from context
  const navigate = useNavigate();

  useEffect(() => {
    // Firebase's built-in method to track authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        showAlert("warning", "First Signin / signup to access this route"); // Use showAlert
        // User is not authenticated, redirect to login
        navigate("/");
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate, showAlert]);

  return children; // Render the children components if user is authenticated
};

export default ProtectedRoute;
