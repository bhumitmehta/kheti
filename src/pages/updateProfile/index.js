import React, { useState, useEffect } from "react";
import Sticky from "react-sticky-el";
import UpdateForm from "./UpdateForm";
import userIcon from "../../img/user_icon.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null); // Initialize user state

  // Check for access token and user data in cookies and redirect if token is absent
  useEffect(() => {
    const token = Cookies.get("access-token");
    const userCookie = Cookies.get("user");

    if (!token) {
      navigate("/");
    } else if (userCookie) {
      try {
        // Attempt to parse the user cookie
        console.log({userCookie})
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user cookie format", error);
        setUser(null); // Handle error gracefully
      }
    }
  }, [navigate]);

  if (!user) return <div>Loading...</div>; // Show a loader until user data is available

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Sticky Edit Form */}
      <Sticky>{edit && <UpdateForm onChange={setEdit} />}</Sticky>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center bg-[#68AC5D] p-6 rounded-t-lg">
          <h1 className="text-4xl text-white font-bold">Profile</h1>
          <button
            onClick={() => setEdit(true)}
            className="bg-white text-gray-700 rounded-full px-4 py-2 font-semibold hover:bg-gray-200"
          >
            Edit
          </button>
        </div>

        <div className="flex flex-wrap p-8">
          {/* Profile Image Section */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              className="w-48 h-48 rounded-full border shadow-md"
              src={user.profile_image ? user.profile_image : userIcon}
              alt="Profile"
            />
          </div>

          {/* Profile Details Section */}
          <div className="w-full md:w-2/3 mt-6 md:mt-0 md:pl-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="font-semibold text-gray-600">First Name</label>
                <p className="bg-gray-200 p-2 rounded-md">{user.first_name || "N/A"}</p>
              </div>

              {/* Last Name */}
              <div>
                <label className="font-semibold text-gray-600">Last Name</label>
                <p className="bg-gray-200 p-2 rounded-md">{user.last_name || "N/A"}</p>
              </div>

              {/* Email */}
              <div>
                <label className="font-semibold text-gray-600">Email</label>
                <p className="bg-gray-200 p-2 rounded-md">{user.email || "N/A"}</p>
              </div>

              {/* Address */}
              <div>
                <label className="font-semibold text-gray-600">Address</label>
                <p className="bg-gray-200 p-2 rounded-md">
                  {user.address || "No Address added yet"}
                </p>
              </div>

              {/* City */}
              <div>
                <label className="font-semibold text-gray-600">City</label>
                <p className="bg-gray-200 p-2 rounded-md">
                  {user.city || "No City added yet"}
                </p>
              </div>

              {/* State */}
              <div>
                <label className="font-semibold text-gray-600">State</label>
                <p className="bg-gray-200 p-2 rounded-md">
                  {user.state || "No State added yet"}
                </p>
              </div>

              {/* Pincode */}
              <div>
                <label className="font-semibold text-gray-600">Pincode</label>
                <p className="bg-gray-200 p-2 rounded-md">{user.pin_code || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
