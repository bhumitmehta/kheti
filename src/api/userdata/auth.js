import axios from "axios";
import instance from "../../api/config";
import Cookies from "js-cookie";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

import { getAuth , signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth ,db} from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import {collection, doc,setDoc} from 'firebase/firestore'
//const url = "https://krishi-sadhan-app.herokuapp.com";
const url = "http://localhost:8000";

export const postRegisterData = async ({
  first_name,
  email,
  password,
  last_name,
  pin_code,
  phone_number,
}) => {
  try {
    const auth = getAuth(); // Get the Firebase Auth instance

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Optionally, store additional user data in Firestore
    const usersCollectionRef = collection(db, "users"); // Get the 'users' collection
    await setDoc(doc(usersCollectionRef, user.uid), { // Use user.uid for the document ID
      first_name,
      last_name,
      email,
      pin_code,
      phone_number,
      uid : user.uid,
      createdAt: new Date(),
    });

    return Promise.resolve(user);
  } catch (error) {
    if (error.message === "Firebase: Error (auth/email-already-in-use)."){
      error.message = "Email Already in use do u what to login "
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
};

export const postLoginDataEmail = async ({ email, password }) => {
  try {
    const auth = getAuth(); // Get Firebase Auth instance
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // The signed-in user info
    const user = userCredential.user;

    // You can retrieve the user's token if needed
    const token = await user.getIdToken();

    return Promise.resolve({
      user, // user object with user details
      token, // ID token for secure backend interactions
    });
  } catch (err) {
    console.log(err.message);
    return Promise.reject(err.message); // Return error message
  }
};


export const postLoginDataPhone = async ({ phone_number }) => {
  try {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container', 
      {}, 
      auth
    );

    const confirmationResult = await signInWithPhoneNumber(auth, phone_number, recaptchaVerifier);

    // Store the confirmation result and return it for further OTP verification
    return Promise.resolve(confirmationResult);
  } catch (error) {
    return Promise.reject(error.message);
  }
};


export const verifyOtp = async ({ phone_number, otp }) => {
  try {
    const res = await axios.post(`${url}/users/signup/verify-otp`, {
      phone_number,
      otp
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
};

export const verifyOtpLogin = async ({ phone_number, otp }) => {
  try {
    const res = await axios.post(`${url}/users/login/verify-otp`, {
      phone_number: phone_number,
      otp: otp
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
};


export const logoutUser = async () => {
  try {
    await signOut(auth);
    return Promise.resolve("Logout successful");
  } catch (error) {
    return Promise.reject(error.message);
  }
};



export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return Promise.resolve("Password reset email sent");
  } catch (error) {
    return Promise.reject(error.message);
  }
};


export const resetPassword = async (password, accessToken) => {
  try {
    const res = await instance.post(
      `${url}/api/auth/reset-password`,
      { password },
      {
        headers: { Authorization: accessToken }
      }
    );
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
};

export const updateProfile = async ({ formData, accessToken }) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  };
  try {
    const uuid = Cookies.get("uuid");
    const res = await instance.put(`${url}/users/${uuid}/`, formData, {
      headers
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
};

export const updatePassword = async (password, accessToken) => {
  try {
    const res = await instance.post(
      `${url}/api/auth/reset-password`,
      { password },
      {
        headers: { Authorization: accessToken }
      }
    );
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
};

export const postCancellationData = async ({
  booking_id,
  cancel_reason,
  description,
  token
}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    };
    const res = await instance.post(
      `${url}/enquiry/cancel-form`,
      {
        booking_id,
        cancel_reason,
        description
      },
      { headers }
    );
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err.response?.data?.msg);
  }
};
