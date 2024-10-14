import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
// Components
import InputField from "../../components/input/InputField";
import Alert from "../../utils/alert.jsx"; // Import the new Alert component

// Functions
import { postRegisterData } from "../../api/userdata/auth";
import { isEmail, isEmpty, isValidPassword } from "../../utils/validation";

// Images
import cross_black from "../../img/cross_black.svg";
import logo from "../../img/logo.png";

const Register = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [pin_code, setPincode] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // For success or error messages

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (
      isEmpty(first_name) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(pin_code) ||
      isEmpty(phone_number) ||
      isEmpty(last_name)
    ) {
      setAlertType("danger");
      setMessage("Please fill in all the details");
      return;
    }

    if (!isEmail(email)) {
      setAlertType("danger");
      setMessage("Enter a valid Email");
      return;
    }

    if (!isValidPassword(password)) {
      setAlertType("danger");
      setMessage("Password must be at least 4 characters long");
      return;
    }

    try {
      setLoading(true);
      const data = await postRegisterData({
        first_name,
        email,
        password,
        last_name,
        pin_code,
        phone_number
      });

      if (!data.success) {
        setLoading(false)
        setAlertType("danger");
        setMessage("Registration failed. Please try again.");

      } else {
        setSuccess(true);
        setAlertType("success");
        setMessage(data.message);
        navigate({
          pathname: "../verify-otp",
          search: `?${createSearchParams({
            phone_number
          })}`
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlertType("danger");
      setMessage("Server issue, try again later.");
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col fixed top-0 bg-[#219653] z-50 w-full">
      <div className="absolute top-2 right-2">
        <img
          src={cross_black}
          className="cursor-pointer hover:opacity-90 bg-[#E5E5E5] rounded-full p-2 shadow-xl"
          alt="close"
          onClick={() => onClick(false)}
        />
      </div>
      <div className="flex justify-center py-9">
        <div
          className="px-9 relative w-2/3"
          style={{
            backgroundColor: "#219653",
            paddingTop: "5rem",
            paddingBottom: "5rem"
          }}
        >
          <form
            onSubmit={handleRegister}
            className="bg-white relative p-9 pt-3 mx-auto drop-shadow-md rounded-3xl flex flex-col justify-center text-center w-3/4"
          >
            <div className="absolute -top-12 flex flex-col left-1/2 -translate-x-1/2">
              <img
                className="h-24 w-24 border-full mx-auto"
                style={{
                  filter: "drop-shadow(0px 4px 4px rgba(104, 172, 93, 0.25))"
                }}
                src={logo}
                alt="logo"
              />
            </div>
            <h1 className="text-2xl font-bold" style={{ marginTop: "3rem" }}>
              Register Here
            </h1>
            <p className="font-semibold mb-4">Enter your details</p>
            <InputField
              placeholder="First Name*"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              required={true}
            />
            <InputField
              placeholder="Last Name*"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              required={true}
            />
            <InputField
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              required={false}
            />
            <InputField
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required={true}
            />
            <InputField
              placeholder="Pincode*"
              value={pin_code}
              onChange={(e) => setPincode(e.target.value)}
              type="text"
              required={true}
            />
            <InputField
              placeholder="Phone Number*"
              value={phone_number}
              onChange={(e) => {
                let inputNumber = e.target.value;

                // Check if phone number starts with +91
                if (!inputNumber.startsWith("+91")) {
                  inputNumber = "+91" + inputNumber;
                }

                setPhoneNumber(inputNumber);
              }}
              type="text"
              required={true}
            />

            <button
              className="px-6 py-1 w-32 mx-auto rounded-lg text-white text-xl font-semibold bg-[#219653] hover:opacity-90"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {message && <Alert type={alertType} message={message} />}

            {success && (
              <p className="text-center text-green-400">
                Registered successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
