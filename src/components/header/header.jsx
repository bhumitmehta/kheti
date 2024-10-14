import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getLogoutAction } from "../../redux/actions";

import logo from "../../img/logo.png";
import userIcon from "../../img/user_icon.svg";
import Login from "../../pages/Authentication/Login";
import Register from "../../pages/Authentication/Register";

import "./header.css";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.authReducer);
    const [show, setShow] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
  

  
    return (
      <div className="header">
        {/* Logo and Title */}
        <div className="header-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
          <h3>Krishi Sahhaayaak</h3>
        </div>
  
        {/* Navigation Links */}
        <nav className="navbar">
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/addProduct")}>Add Product</li>
            <li onClick={() => navigate("/help")}>Help</li>
          </ul>
        </nav>
  
        {/* Auth Section */}
        <div className="auth-buttons">
          {!Cookies.get("refresh-token") ? (
            <>
              <button onClick={() => setShowLogin(true)}>Login</button>
              <button onClick={() => setShowRegister(true)}>Sign Up</button>
            </>
          ) : (
            <div
              className="profile-section"
              onMouseOver={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <div className="profile-dropdown-trigger">
                <img className="rounded-full w-8 h-8 mr-3" src={userIcon} alt="profile_pic" />
                <p>{"Hi, " + authState.user.data.first_name}</p>
              </div>
              {show && (
                <div className="profile-dropdown">
                  <p onClick={() => navigate("/update-profile")}>Profile</p>
                  <p
                    onClick={() => {
                      Cookies.remove("access-token");
                      Cookies.remove("refresh-token");
                      Cookies.remove("uuid");
                      dispatch(getLogoutAction());
                      navigate("/login");
                    }}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}
          {/* Google Translate */}
          <div className="ml-4">
            <div id="google_translate_element"></div>
          </div>
        </div>
  
        {/* Modals for Login and Register */}
        {showLogin && <Login onClick={setShowLogin} />}
        {showRegister && <Register onClick={setShowRegister} />}
      </div>
    );
  };
  
  export default Header;
  