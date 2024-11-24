// import React, { useEffect, useRef, useState, useContext } from 'react';
// import './Preheader.css';
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthContext";
// import Login from "../../pages/Authentication/Login";
// import Register from "../../pages/Authentication/Register";
// import UserProfile from "../../img/user_icon.svg"
// const Preheader = () => {
//   const navigate = useNavigate();
//   const { currentUser, logout } = useContext(AuthContext);
//   const translateElementRef = useRef(null);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   useEffect(() => {
//     const addGoogleTranslateScript = () => {
//       if (!document.querySelector('script[src*="translate.google.com"]')) {
//         const script = document.createElement('script');
//         script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//         script.async = true;
        
//         document.body.appendChild(script);
//       }
//     };

//     window.googleTranslateElementInit = () => {
//       if (window.google && window.google.translate && typeof window.google.translate.TranslateElement === 'function') {
//         new window.google.translate.TranslateElement(
//           { pageLanguage: 'en', includedLanguages: 'en,hi,mr', autoDisplay: false },
//           'google_translate_element'
//         );
//         translateElementRef.current = document.querySelector('.goog-te-combo');
//       } else {
//         console.error('Google Translate API is not properly loaded.');
//       }
//     };

//     addGoogleTranslateScript();

//     const observer = new MutationObserver(() => {
//       const iframe = document.querySelector('iframe.goog-te-banner-frame');
//       if (iframe) iframe.remove();
//     });
//     observer.observe(document.body, { childList: true, subtree: true });

//     return () => {
//       observer.disconnect();
//       const googleTranslateScript = document.querySelector('script[src*="translate.google.com"]');
//       if (googleTranslateScript) {
//         googleTranslateScript.remove();
//       }
//     };
//   }, []);

//   const translateLanguage = (event) => {
//     const lang = event.target.value;
//     if (translateElementRef.current) {
//       translateElementRef.current.value = lang;
//       setTimeout(() => {
//         translateElementRef.current.dispatchEvent(new Event('change', { bubbles: true }));
       
       
//       }, 100);
     
//        // Delay to ensure the change is registered
//     }
//   };

//   return (
//     <div className="preheader flex items-center justify-between px-6 py-2 bg-green-600 text-white shadow-md">
//       <div className="preheader-left">
//         <input type="text" className="search-bar w-48 p-2 rounded-md" placeholder="Search..." />
//       </div>

//       <div className="ml-4">
//         <div id="google_translate_element"></div>
//         <select onChange={translateLanguage} className="language-dropdown p-2 rounded-md bg-white text-black">
//           <option value="">Select Language</option>
//           <option value="en">English</option>
//           <option value="hi">Hindi</option>
//           <option value="mr">Marathi</option>
//         </select>
//       </div>

//       <div className="auth-buttons relative flex items-center">
//         {!currentUser ? (
//           <>
//             <button onClick={() => setShowLogin(true)} className="px-4 py-2 mx-2 bg-blue-600 text-white rounded-md">
//               Login
//             </button>
//             <button onClick={() => setShowRegister(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md">
//               Sign Up
//             </button>
//           </>
//         ) : (
//           <div
//             className="relative flex items-center cursor-pointer"
//             onMouseEnter={() => setShowDropdown(true)}
//             onMouseLeave={() => setShowDropdown(false)}
//           >
//             <img
//               src={currentUser.photoURL || UserProfile} // Use a placeholder if photoURL is undefined
//               alt="Profile"
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             {showDropdown && (
//               <div className="dropdown-menu absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg z-10">
//                 <button
//                   onClick={() => {
//                     navigate("/profile");
//                     setShowDropdown(false);
//                   }}
//                   className="w-full px-4 py-2 text-left hover:bg-gray-200"
//                 >
//                   Profile
//                 </button>
//                 <button
//                   onClick={() => {
//                     logout();
//                     navigate("/");
//                   }}
//                   className="w-full px-4 py-2 text-left hover:bg-gray-200"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Modals for Login and Register */}
//       {showLogin && <Login onClick={() => setShowLogin(false)} />}
//       {showRegister && <Register onClick={() => setShowRegister(false)} />}
//     </div>
//   );
// };

// export default Preheader;
