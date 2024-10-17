import "./App.css";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./api/userdata/profile.js";
import {
  getLoginAction,
  getSaveProfileAction,
  getSaveTokenAction
} from "./redux/actions";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";


// Import your pages
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Help from "./pages/CustomerCare/Help";
import Header from "./components/header/header";
import FAQ from "../src/pages/CustomerCare/FAQ";
import Footer from "./components/footer/Footer";
import Dashboard from "../src/pages/Dashboard/Dashboard.jsx";
import AddProduct from "../src/pages/AddProduct/AddProduct";
import Product from "./pages/Product/Product.jsx";
import ContactUs from "../src/pages/ContactUs/ContactUs";
import CancellationPolicy from "../src/pages/CancellationPolicy/CancellationPolicy";
import UpdateProfile from "../src/pages/updateProfile/index";
import BookingHistory from "../src/pages/BookingHistory/BookingHistory.jsx";
import EquipmentReport from "../src/pages/CustomerCare/EquipmentReport";
import BlogPostPage from "../src/pages/Blog/BlogPostPage.jsx";


// Import the ProtectedRoute component
import ProtectedRoute from "./components/ProtectedRoute";
import Alert from './utils/alert';
import ChatbotPage from "./pages/Blog/ChatBot.jsx";

function App() {
  const dispatch = useDispatch();

  // Fetch and set token from cookies
  useEffect(() => {
    const access = Cookies.get("access-token");
    const refresh = Cookies.get("refresh-token");
    dispatch(
      getSaveTokenAction({
        accessToken: access,
        refreshToken: refresh
      })
    );
  }, [dispatch]);

  // Fetch and set user profile based on access token
  useEffect(() => {
    const fetchUserProfile = async () => {
      const access = Cookies.get("access-token");
      if (access) {
        const uuid = Cookies.get("uuid");
        dispatch(getLoginAction());
        const data = await getProfile({
          uuid: uuid,
          accessToken: access
        });
        dispatch(getSaveProfileAction(data));
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="help" element={<Help />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="policy" element={<CancellationPolicy />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="equipment-report/:id" element={<EquipmentReport />} />
        <Route path="blog" element={<BlogPostPage />} />
        <Route path="chatbot" element={<ChatbotPage />} />
        {/* Protected Routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="addproduct"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="update-profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="booking-history"
          element={
            <ProtectedRoute>
              <BookingHistory />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      <Alert/>
      <Footer />

    </>
  );
}

export default App;
