import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import InputField from "../../components/input/InputField";
import Alert from "../../utils/alert.jsx"; // Import the Alert component
import { useAlert } from "../../contexts/AlertContext"; // Import the useAlert hook
import { postRegisterData } from "../../api/userdata/auth";
import { isEmail, isEmpty, isValidPassword } from "../../utils/validation";
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
  const navigate = useNavigate();
  
  const { showAlert } = useAlert(); // Use the alert context

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
      showAlert("danger", "Please fill in all the details");
      return;
    }

    if (!isEmail(email)) {
      showAlert("danger", "Enter a valid Email");
      return;
    }

    if (!isValidPassword(password)) {
      showAlert("danger", "Password must be at least 4 characters long");
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
        phone_number,
      });

      if (!data.success) {
        setLoading(false);
        showAlert("danger", data.message);
      } else {
        showAlert("success", data.message);
        onClick(false); // Close the modal
        navigate({
          pathname: "../profile",
          search: `?${createSearchParams({
            phone_number,
          })}`,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showAlert("danger", error.message);
      console.log(error);
    }
  }

  return (
    <div className="fixed top-0 right-0 w-full h-full z-50 bg-green-600 opacity-98 overflow-y-auto"> 
      <div className="absolute top-2 z-20">
        <img
          src={cross_black}
          className="cursor-pointer hover:opacity-90 bg-[#E5E5E5] rounded-full p-2 shadow-xl"
          alt="close"
          onClick={() => onClick(false)}
        />
      </div>

      <div className="flex justify-center py-5 opacity-100 ">
        <div className="px-6 w-full max-w-lg md:max-w-3xl lg:max-w-6xl relative opacity-100">
          <form
            onSubmit={handleRegister}
            className="bg-white relative p-8 mx-auto shadow-lg rounded-3xl flex flex-col justify-center text-center w-full lg:w-3/4 opacity-100"
          >
            <div className="absolute -top-2 flex flex-col left-1/2 transform -translate-x-1/2">
              <img
                className="h-24 w-24 border-full mx-auto"
                src={logo}
                alt="logo"
              />
            </div>
            <h1 className="text-2xl font-bold mt-14">Register Here</h1>
            <p className="font-semibold mb-4">Enter your details</p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="First Name*"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                required={true}
              />
              <InputField
                label="Last Name*"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                required={true}
              />

              <InputField
                label="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                required={true}
              />
              <InputField
                label="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required={true}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
              <InputField
                label="Pincode*"
                value={pin_code}
                onChange={(e) => setPincode(e.target.value)}
                type="text"
                required={true}
              />
              <InputField
                label="Phone Number*"
                value={phone_number}
                onChange={(e) => {
                  let inputNumber = e.target.value;
                  if (!inputNumber.startsWith("+91")) {
                    inputNumber = "+91" + inputNumber;
                  }
                  setPhoneNumber(inputNumber);
                }}
                type="text"
                required={true}
              />
            </div>

            <button
              className="px-6 py-2 mt-4 mx-auto rounded-lg text-white text-lg font-semibold bg-[#219653] hover:opacity-90 w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <Alert /> {/* Add the alert component here */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
