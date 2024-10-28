import React, { useEffect, useRef, useState, useContext } from 'react';
import './Preheader.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Login from "../../pages/Authentication/Login";
import Register from "../../pages/Authentication/Register";

const Preheader = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const translateElementRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;

      script.onload = () => {
        if (window.google && window.google.translate) {
          window.googleTranslateElementInit();
        }
      };
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      const translateElement = new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
      translateElementRef.current = document.querySelector('.goog-te-combo');
    };

    addGoogleTranslateScript();

    const observer = new MutationObserver(() => {
      const iframe = document.querySelector('iframe.goog-te-banner-frame');
      if (iframe) iframe.remove();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const googleTranslateScript = document.querySelector('script[src*="translate.google.com"]');
      if (googleTranslateScript) googleTranslateScript.remove();
    };
  }, []);

  const translateLanguage = (event) => {
    const lang = event.target.value;
    if (translateElementRef.current) {
      translateElementRef.current.value = lang;
      translateElementRef.current.dispatchEvent(new Event('change'));
    }
  };

  return (
    <div className="preheader">
      <div className="preheader-left">
        <input type="text" className="search-bar" placeholder="Search..." />
      </div>

      <div className="ml-4">
        <div id="google_translate_element"></div>
        <select onChange={translateLanguage} className="language-dropdown">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>
      </div>

      <div className="auth-buttons">
        {!currentUser ? (
          <>
            <button onClick={() => setShowLogin(true)}>Login</button>
            <button onClick={() => setShowRegister(true)}>Sign Up</button>
          </>
        ) : (
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* Modals for Login and Register */}
      {showLogin && <Login onClick={() => setShowLogin(false)} />}
      {showRegister && <Register onClick={() => setShowRegister(false)} />}
    </div>
  );
};

export default Preheader;
