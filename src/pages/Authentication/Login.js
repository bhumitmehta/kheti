import React, { useState, useContext } from "react";
import { useAlert } from "../../contexts/AlertContext"; // Import the Alert context
import InputField from "../../components/input/InputField";
import Loader from "../../components/loader/loader.jsx";
import Alert from "../../utils/alert.jsx"; // Reusable alert component
import { AuthContext } from "../../contexts/AuthContext"; // Import AuthContext
import { postLoginDataEmail } from "../../api/userdata/auth"; // Import API method

import logo from "../../img/logo.png";
import cross_black from "../../img/cross_black.svg";

const Login = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { showAlert } = useAlert(); // Using the alert context
  const { setCurrentUser } = useContext(AuthContext); // Access setCurrentUser from AuthContext

  async function handleLoginEmail(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postLoginDataEmail({ email, password });
      if (response) {
        // Simulate the user object returned by your API
        const user = {
          email: response.email,
          token: response.token, // Assuming token is part of the response
        };

        // Set the authenticated user in the AuthContext
        setCurrentUser(user);

        setLoading(false);
        showAlert("success", "Login successful");
        onClick(false); // Close the login modal
      }
    } catch (err) {
      setLoading(false);
      showAlert("danger", `${err.message}`); // Show error alert
      console.error(err);
    }
  }

  return (
    <div className="fixed top-0 right-0 w-full z-50 bg-green-600 opacity-95">
      <div className="absolute top-2.5 right-24">
        <img
          src={cross_black}
          alt="Close"
          className="cursor-pointer bg-gray-200 rounded-full p-2 shadow-lg transition-opacity duration-300 ease-in-out"
          onClick={() => onClick(false)}
        />
      </div>

      {loading && <Loader />}
      <Alert /> {/* Place the Alert component here */}
      <div className={`filter ${loading ? "blur-sm" : "none"}`}>
        <div className="flex justify-center py-12">
          <div className="bg-green-600 rounded-xl py-16 px-5 w-full md:w-2/3 lg:w-2/3 xl:w-2/3 max-w-lg">
            <form
              onSubmit={handleLoginEmail}
              className="bg-white rounded-3xl p-10 w-4/5 mx-auto shadow-lg text-center"
            >
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                <img src={logo} alt="logo" className="h-24 w-24 filter drop-shadow-lg" />
              </div>

              <h1 className="mt-16 font-bold text-2xl">Login Here</h1>

              <p className="mb-5 text-lg">Login Using Email</p>
              <InputField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                required
              />
              <InputField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />

              <button
                className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg mt-5 transition-opacity duration-300 ease-in-out"
                type="submit"
                disabled={loading}
              >
                Login
              </button>

              <p className="text-lg mt-5 underline cursor-pointer">Forgot Password?</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
