import React from "react";
// import Lottie from "react-lottie

const Loader = () => {
  return (
    <div
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "80vh" }}
  >
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  );
};

export default Loader;
