import React, { useEffect } from "react";
import { useAlert } from "../contexts/AlertContext";

const Alert = () => {
  const { alertType, alertMessage, clearAlert } = useAlert();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (alertMessage) {
        clearAlert(); // Remove alert after 5 seconds
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [alertMessage, clearAlert]);

  // Return null if there's no alert to show
  if (!alertMessage) return null;

  // Determine alert styles based on alertType
  const alertStyles = {
    success: 'text-green-800 bg-green-50',
    warning: 'text-yellow-800 bg-yellow-50',
    danger: 'text-red-800 bg-red-50',
    info: 'text-blue-800 bg-blue-50',
  };

  return (
    <div
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 mb-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${alertStyles[alertType]}`}
      role="alert"
      style={{ zIndex: 9999 }} // Ensures it's on top of other elements
    >
      <div className="flex items-center">
        <svg
          className={`flex-shrink-0 w-4 h-4 mr-2`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {/* SVG path based on alert type */}
          {alertType === "success" ? (
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          ) : alertType === "warning" ? (
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          ) : alertType === "danger" ? (
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          ) : (
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          )}
        </svg>
        <div className="text-sm font-medium">{alertMessage}</div>
        <button
          type="button"
          className="ml-auto bg-transparent text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={clearAlert}
          aria-label="Close"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
