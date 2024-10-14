import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import Vector from "../../img/Vector.png";
import Vector1 from "../../img/Vector1.png";
import Vector2 from "../../img/Vector2.png";
import footerBg from "../../img/footerBg.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 py-20">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-10">
        {/* Logo Section */}
        <div className="flex flex-1 items-center border-r-2 border-gray-400 pr-10">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="footerLogo" alt="Krishi Sadhan" />
            <div className="ml-4">
              <h3 className="text-3xl text-white font-extrabold tracking-wide">
                Krishi Sadhan
              </h3>
              <p className="text-md font-light text-white mt-2">
                Kisaan upkaran ka ek Matra Sadhan.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-10 border-r-2 border-gray-400">
          <div className="flex flex-wrap justify-between">
            <ul className="list-none">
              <li
                className="text-lg text-white font-semibold cursor-pointer hover:text-yellow-300 transition"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li className="text-lg text-white font-medium cursor-pointer hover:text-yellow-300 transition">
                Market
              </li>
            </ul>
            <ul className="list-none">
              <li
                className="text-lg text-white font-semibold cursor-pointer hover:text-yellow-300 transition"
                onClick={() => navigate("/support-center")}
              >
                Support Center
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer hover:text-yellow-300 transition"
                onClick={() => navigate("/help")}
              >
                Help Center
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer hover:text-yellow-300 transition"
                onClick={() => navigate("/partner-dispute")}
              >
                Partner Dispute
              </li>
              <li
                className="text-lg text-white font-medium cursor-pointer hover:text-yellow-300 transition"
                onClick={() => navigate("/faq")}
              >
                FAQs
              </li>
            </ul>
          </div>
          <p className="text-md text-white mt-4">
            Please provide us feedback{" "}
            <button
              onClick={() => navigate("/feedback")}
              className="text-xl underline hover:text-yellow-300 transition"
            >
              HERE
            </button>
          </p>
        </div>

        {/* Social Media & Info */}
        <div className="flex-1 px-10 border-r-2 border-gray-400">
          <h1 className="text-xl text-white font-bold mb-4">
            Give us a follow on social media
          </h1>
          <div className="flex my-5">
            <img
              className="socialIcons mx-3 cursor-pointer hover:scale-110 transition transform"
              src={Vector}
              alt="Social 1"
            />
            <img
              className="socialIcons mx-3 cursor-pointer hover:scale-110 transition transform"
              src={Vector1}
              alt="Social 2"
            />
            <img
              className="socialIcons mx-3 cursor-pointer hover:scale-110 transition transform"
              src={Vector2}
              alt="Social 3"
            />
          </div>
          <p className="text-lg text-white">
            Made by: <strong>Bhumit Mehta</strong>
          </p>
        </div>

        {/* Footer Background Image */}
        <div className="flex-1 flex justify-center">
          <img src={footerBg} className="footerBgImg" alt="Footer Background" />
          <h1 className="text-xl text-white font-bold mt-6">
            A Farmer's Helper Website
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
