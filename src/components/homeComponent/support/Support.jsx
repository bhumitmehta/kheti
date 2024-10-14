import React from "react";
import "./Support.css";
import vector11 from "../../../img/vector11.svg";
import vector22 from "../../../img/vector22.svg";
import vector33 from "../../../img/vector33.svg";

const Support = () => {
  return (
    <div className="support-container">
      <h1 className="support-title">What we offer</h1>
      <p className="support-description">
        Being a part of Krishi Sahaayaak, this is what you get from us:
      </p>
      <div className="support-items">
        <div className="support-item">
          <img className="support-img" src={vector11} alt="Crop Recommendation" />
          <h3>Crop Recommendation</h3>
          <p>Know which crop to grow to avoid overproduction.</p>
        </div>
        <div className="support-item">
          <img className="support-img" src={vector22} alt="Trusted Sellers/Buyers" />
          <h3>Trusted Sellers/Buyers</h3>
          <p>Ensured safety of your experience.</p>
        </div>
        <div className="support-item">
          <img className="support-img" src={vector33} alt="Farming Methods" />
          <h3>Know the New Ways of Farming</h3>
          <p>Get solutions to your problem with our Kethi Vedica.</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
