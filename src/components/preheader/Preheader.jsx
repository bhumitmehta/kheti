import React, { useState, useContext } from "react";
import "./Preheader.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Login from "../../pages/Authentication/Login";
import Register from "../../pages/Authentication/Register";
import UserProfile from "../../img/user_icon.svg";

const Preheader = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="preheader flex items-center justify-between px-6 py-2 bg-green-600 text-white shadow-md">
      <div className="preheader-left">
        <input
          type="text"
          className="search-bar w-48 p-2 rounded-md"
          placeholder="Search..."
        />
      </div>

      <div className="auth-buttons relative flex items-center">
        {!currentUser ? (
          <>
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-md"
            >
              Login
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Sign Up
            </button>
          </>
        ) : (
          <div
            className="relative flex items-center cursor-pointer"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <img
              src={currentUser.photoURL || UserProfile}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            {showDropdown && (
              <div className="dropdown-menu absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals for Login and Register */}
      {showLogin && <Login onClick={() => setShowLogin(false)} />}
      {showRegister && <Register onClick={() => setShowRegister(false)} />}
    </div>
  );
};

export default Preheader;
