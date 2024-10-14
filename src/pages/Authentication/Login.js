import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Components
import InputField from "../../components/input/InputField";
import Loader from "../../components/loader/loader.jsx";
import Alert from "../../utils/alert.jsx"; // Reusable alert components

// Functions
import {
  postLoginDataEmail,
  postLoginDataPhone,
  verifyOtpLogin
} from "../../api/userdata/auth";
import {
  getLoginAction,
  getSaveTokenAction,
  getSaveProfileAction
} from "../../redux/actions";

// Images
import logo from "../../img/logo.png";
import cross_black from "../../img/cross_black.svg";

const Login = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [data, setData] = useState();
  const [OTP, setOTP] = useState("");
  const [successOTP, setSuccessOTP] = useState(false);
  const [error, setError] = useState(false);
  const [alertType, setAlertType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLoginEmail(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postLoginDataEmail({ email, password });
      if (response) {
        setLoading(false);
        setSuccess(true);
        setMessage(response.message);
        saveLoginData(response);
      }
    } catch (err) {
      setLoading(false);
      setSuccess(false);
      setMessage("Server Issue, Try again later");
      console.error(err);
    }
  }

  async function handleLoginPhone() {
    setShowOTP(true);
    try {
      const response = await postLoginDataPhone({ phone_number: phoneNumber });
      if (response.success) {
        setData(response);
        setShowOTP(true);
      }
    } catch (err) {
      setSuccess(false);
      setLoading(false);
      setMessage("Server Issue, Try again later");
      console.error(err);
    }
  }

  async function verifyOTP(e) {
    e.preventDefault();
    try {
      const response = await verifyOtpLogin({
        phone_number: phoneNumber,
        otp: OTP
      });
      if (response.success) {
        saveLoginData(response);
        setSuccessOTP(true);
        setLoading(false);
        navigate("/");
      } else {
        setOTP("");
        setError(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function saveLoginData(data) {
    setSuccess(data.success);
    setMessage(data.message);
    localStorage.setItem("isLoggedIn", true);

    if (data && data.token) {
      const expiration = new Date().setDate(new Date().getDate() + 1);
      Cookies.set("access-token", data.token, { path: "/", expires: expiration });
      Cookies.set("refresh-token", data.token, { path: "/", expires: expiration });
      Cookies.set("uuid", data.uid, { path: "/", expires: expiration });
      Cookies.set("user", JSON.stringify(data));
    } else {
      console.error("Tokens not found in response data.");
      setMessage("Login failed: Tokens missing from response.");
      return;
    }

    dispatch(getLoginAction());
    dispatch(getSaveTokenAction({ accessToken: data.token, refreshToken: data.token }));
    dispatch(getSaveProfileAction(data));

    setLoading(false);
    navigate("/");
  }

  const buttonStyles = {
    padding: "12px 24px",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#219653",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  };

  const inputStyles = {
    padding: "10px 30px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "16px",
    fontSize: "14px",
  };

  return (
    <div style={{ position: "fixed", top: 0, right: 0, width: "100%", zIndex: 50, backgroundColor: "#219653", opacity: 0.95 }}>
      <div style={{ position: "absolute", top: "10px", right: "100px" }}>
        <img
          src={cross_black}
          alt="Close"
          style={{
            cursor: "pointer",
            backgroundColor: "#E5E5E5",
            borderRadius: "50%",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            transition: "opacity 0.3s ease",
          }}
          onClick={() => onClick(false)}
        />
      </div>

      {loading && <Loader />}

      {/* OTP VERIFICATION SCREEN */}
      <div
        style={{
          transition: "opacity 0.5s, transform 0.5s",
          display: showOTP ? "block" : "none",
          transform: showOTP ? "translateX(0)" : "translateX(-100%)",
          opacity: showOTP ? 1 : 0,
        }}
      >
        <div style={{ backgroundColor: "#219653", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "20px", width: "400px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <form onSubmit={verifyOTP} style={{ display: "flex", flexDirection: "column", position: "relative", paddingTop: "10px" }}>
              <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "18px" }}>Enter the OTP sent to your Registered Number</h1>
              <input
                placeholder="OTP"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                type="text"
                required
                style={inputStyles}
              />
              <button style={{ ...buttonStyles, margin: "0 auto", display: "block", width: "150px" }} type="submit">
                Verify OTP
              </button>
              {/* {successOTP && <SuccessMsg msg="OTP verified successfully!" />}
              {error && <ErrorMsg msg="Wrong OTP, please try again!" />} */}
            </form>
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Didn't receive OTP? <span style={{ color: "#1e90ff", textDecoration: "underline", cursor: "pointer" }}>Resend</span>
            </p>
          </div>
        </div>
      </div>

      {/* LOGIN FORM SCREEN */}
      <div style={{ filter: loading ? "blur(4px)" : "none", display: showOTP ? "none" : "block" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "50px 0" }}>
          <div style={{ backgroundColor: "#219653", borderRadius: "16px", padding: "60px 20px", width: "60%" }}>
            <form
              onSubmit={handleLoginEmail}
              style={{
                backgroundColor: "#fff",
                borderRadius: "24px",
                padding: "40px",
                width: "70%",
                margin: "0 auto",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <div style={{ position: "absolute", top: "40px", left: "50%", transform: "translateX(-50%)" }}>
                <img src={logo} alt="logo" style={{ height: "96px", width: "96px", filter: "drop-shadow(0px 4px 4px rgba(104, 172, 93, 0.25))" }} />
              </div>

              <h1 style={{ marginTop: "60px", fontWeight: "700", fontSize: "24px" }}>Login Here</h1>
              {/* {success && <SuccessMsg msg={message} />}
              {error && <ErrorMsg msg={message} />} */}
              <p style={{ marginBottom: "20px", fontSize: "16px" }}>Login Using Email</p>
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                style={inputStyles}
              />
              <input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                style={inputStyles}
              />
              <button
                style={buttonStyles}
                type="submit"
                disabled={loading}
              >
                Login
              </button>

              <p style={{ fontSize: "16px", fontWeight: "600", margin: "40px 0" }}>OR</p>

              <div>
                <p style={{ marginBottom: "20px", fontSize: "16px" }}>Login Using Phone</p>
                <input
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  style={inputStyles}
                />
                <button
                  style={buttonStyles}
                  onClick={handleLoginPhone}
                  disabled={loading}
                >
                  Send OTP
                </button>
              </div>

              <p style={{ fontSize: "16px", marginTop: "20px", textDecoration: "underline", cursor: "pointer" }}>
                Forgot Password?
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
