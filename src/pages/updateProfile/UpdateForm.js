import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import InputField from "./../../components/input/InputField.jsx"; // Import the InputField component

const UpdateForm = ({ onChange }) => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    addresses: [{ state: "", city: "", pin_code: "" }],
    profile_picture: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const db = getFirestore();
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFormData({
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email || "",
          addresses: userData.addresses || [{ state: "", city: "", pin_code: "" }],
          profile_picture: userData.profile_picture || "",
        });
      }
    };

    fetchUserData();
  }, []);

  const handleAddressChange = (index, e) => {
    const updatedAddresses = [...formData.addresses];  // Create a copy of the addresses array
    const { name, value } = e.target;  
    console.log(name,value,e.target)
    updatedAddresses[index] = {  // Update the specific address object at the index
      ...updatedAddresses[index],  // Spread the current address data
      [name]: value,  // Dynamically set the key corresponding to the input name
    };
    console.log(updatedAddresses)
    setFormData({ ...formData, addresses: updatedAddresses });  // Update the state with the new addresses
  };
  

  const addAddressField = () => {
    setFormData({
      ...formData,
      addresses: [...formData.addresses, { state: "", city: "", pin_code: "" }],
    });
  };

  const handleImageUpload = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `userProfile/${getAuth().currentUser.uid}/${file.name}`);
    setUploading(true);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setUploading(false);
    return downloadURL;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const userDocRef = doc(db, "users", getAuth().currentUser.uid);

    let profilePictureURL = formData.profile_picture;
    if (typeof formData.profile_picture === "object") {
      profilePictureURL = await handleImageUpload(formData.profile_picture);
    }

    const updatedData = {
      ...formData,
      profile_picture: profilePictureURL,
    };

    await updateDoc(userDocRef, updatedData);
    setMessage("Profile updated successfully!");
    onChange((prev) => !prev);
  };

  return (
    <div className=" w-full h-screen left-0 bg-[#68ac5d] p-9">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onChange((prev) => !prev)}
          className="bg-white ml-auto rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="text-center bg-white my-9 rounded-xl p-9">
        <h1 className="text-2xl font-semibold">Edit your Information Here</h1>
        <form onSubmit={handleUpdateProfile}>
          <div className="shadow rounded-lg p-6">
            <div className="grid lg:grid-cols-3 gap-6 sm:grid-cols-1">
              <InputField
                label="First name *"
                placeholder="First Name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
                type="text"
              />
              <InputField
                label="Last name *"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
                type="text"
              />
              <InputField
                label="Email *"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                type="text"
              />
            </div>

            {formData.addresses.map((address, index) => (
              <div key={index} className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
               <InputField
  label="State"
  placeholder="State"
  value={address.state}
  onChange={(e) => handleAddressChange(index, e)}
  required
  name="state" // Ensure this name matches the field you want to update
  type="text"
/>
<InputField
  label="City"
  placeholder="City"
  value={address.city}
  onChange={(e) => handleAddressChange(index, e)}
  required
  name="city" // Ensure this name matches the field you want to update
  type="text"
/>
<InputField
  label="Pin Code"
  placeholder="Pin Code"
  value={address.pin_code}
  onChange={(e) => handleAddressChange(index, e)}
  required
  name="pin_code" // Ensure this name matches the field you want to update
  type="text"
/>

              </div>
            ))}

            <div className="text-center mt-4">
              <button type="button" onClick={addAddressField} className="text-blue-600 hover:text-blue-800">
                Add another address
              </button>
            </div>

            <div className="relative rounded p-1 mt-6">
              <label htmlFor="profilePicture" className="bg-white text-gray-600 px-1">
                Profile Picture *
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    profile_picture: e.target.files[0],
                  })
                }
                className="py-3 px-1 outline-none block w-full"
              />
            </div>

            <p className="text-center text-green-500 text-lg my-5">{message}</p>

            <div className="mt-6 pt-3">
              <button
                type="submit"
                className="rounded text-gray-100 px-9 py-1 bg-[#68ac5d] hover:shadow-inner hover:bg-green-700 transition-all duration-300 text-xl"
              >
                {uploading ? "Uploading..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => onChange((prev) => !prev)}
                className="rounded ml-4 text-gray-100 px-9 py-1 bg-red-500 hover:shadow-inner hover:bg-red-700 transition-all duration-300 text-xl"
              >
                Discard
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;

// import React, { useState } from "react";
// //Functions
// import { useSelector } from "react-redux";
// import { updateProfile } from "../../api/authAPI";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../../firebase"; // Path to your Firebase config
// const UpdateForm = ({ onChange }) => {
//   const authState = useSelector((state) => state.authReducer);
//   const tokenState = useSelector((state) => state.tokenReducer);
//   const user = authState.user.data;
//   const [message, setMessage] = useState("");

//   const [formData, setFormData] = useState({
//     first_name: user.first_name,
//     last_name: user.last_name,
//     email: user.email,
//     addresses: user.addresses || [{ state: "", city: "", pin_code: "" }],
//     profile_picture: "",
//   });

//   const handleAddressChange = (index, e) => {
//     const updatedAddresses = [...formData.addresses];
//     updatedAddresses[index][e.target.name] = e.target.value;
//     setFormData({ ...formData, addresses: updatedAddresses });
//   };

//   const addAddressField = () => {
//     setFormData({
//       ...formData,
//       addresses: [...formData.addresses, { state: "", city: "", pin_code: "" }],
//     });
//   };

//   function getBase64(file) {
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       return reader.result;
//     };
//     reader.onerror = function (error) {
//       console.log("Error: ", error);
//     };
//   }

//   function uploadImage(file) {
//     const storageRef = ref(storage, `profile_pictures/${file.name}`);
//     return uploadBytes(storageRef, file).then((snapshot) =>
//       getDownloadURL(snapshot.ref)
//     );
//   }
  
//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     let imageUrl = formData.profile_picture;
  
//     if (formData.profile_picture) {
//       const file = formData.profile_picture; // Assuming the image file is in formData
//       imageUrl = await uploadImage(file); // Upload image and get URL
//     }
  
//     const updatedData = {
//       ...formData,
//       profile_picture: imageUrl,
//     };
  
//     const data = await updateProfile({
//       formData: updatedData,
//       accessToken: tokenState.token.accessToken,
//     });
  
//     if (data.success) {
//       setMessage(data.message);
//       onChange((prev) => !prev);
//     }
  
//     console.log(data);
//   };

//   return (
//     <div className="z-40 w-full h-screen left-0 absolute top-0 bg-[#68ac5d] p-9">
//       <div className="flex justify-end">
//         <button
//           type="button"
//           onClick={() => onChange((prev) => !prev)}
//           className="bg-white ml-auto rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//         >
//           <span className="sr-only">Close menu</span>
//           <svg
//             className="h-6 w-6"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             aria-hidden="true"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="3"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Apply max-height and make content scrollable */}
//       <div className="text-center bg-white my-9 rounded-xl p-9 max-h-[80vh] overflow-y-auto">
//         <h1 className="text-2xl font-semibold">Edit your Information Here</h1>
//         <form onSubmit={handleUpdateProfile}>
//           <div className="shadow rounded-lg p-6">
//             <div className="grid lg:grid-cols-2 gap-6">
//               <div className="focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
//                 <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
//                   <p>
//                     <label for="name" className="bg-white text-gray-600 px-1">
//                       First name *
//                     </label>
//                   </p>
//                 </div>
//                 <p>
//                   <input
//                     id="name"
//                     autoComplete="false"
//                     tabIndex="0"
//                     type="text"
//                     placeholder="First Name"
//                     value={formData.first_name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, first_name: e.target.value })
//                     }
//                     className="py-3 px-1 text-gray-900 outline-none block h-full w-full"
//                   />
//                 </p>
//               </div>

//               <div className="focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
//                 <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
//                   <p>
//                     <label for="lastname" className="bg-white text-gray-600 px-1">
//                       Last name *
//                     </label>
//                   </p>
//                 </div>
//                 <p>
//                   <input
//                     id="lastname"
//                     autoComplete="false"
//                     tabIndex="0"
//                     type="text"
//                     placeholder="Last Name"
//                     value={formData.last_name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, last_name: e.target.value })
//                     }
//                     className="py-3 px-1 outline-none block h-full w-full"
//                   />
//                 </p>
//               </div>

//               <div className="focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
//                 <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
//                   <p>
//                     <label for="username" className="bg-white text-gray-600 px-1">
//                       Email *
//                     </label>
//                   </p>
//                 </div>
//                 <p>
//                   <input
//                     id="username"
//                     autoComplete="false"
//                     tabIndex="0"
//                     type="text"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                     className="py-3 px-1 outline-none block h-full w-full"
//                   />
//                 </p>
//               </div>

//               {/* Address fields */}
//               {formData.addresses.map((address, index) => (
//                 <div key={index} className="grid lg:grid-cols-3 gap-6">
//                   <input
//                     name="state"
//                     value={address.state}
//                     onChange={(e) => handleAddressChange(index, e)}
//                     placeholder="State"
//                     className="py-3 px-1 outline-none block h-full w-full"
//                   />
//                   <input
//                     name="city"
//                     value={address.city}
//                     onChange={(e) => handleAddressChange(index, e)}
//                     placeholder="City"
//                     className="py-3 px-1 outline-none block h-full w-full"
//                   />
//                   <input
//                     name="pin_code"
//                     value={address.pin_code}
//                     onChange={(e) => handleAddressChange(index, e)}
//                     placeholder="Pin Code"
//                     className="py-3 px-1 outline-none block h-full w-full"
//                   />
//                 </div>
//               ))}
//               <button type="button" onClick={addAddressField}>
//                 Add another address
//               </button>

//               {/* Profile Picture */}
//               <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
//                 <p>
//                   <label for="profile_picture" className="bg-white text-gray-600 px-1">
//                     Profile Picture *
//                   </label>
//                 </p>
//               </div>
//               <p>
//                               <input
//                   type="file"
//                   onChange={(e) =>
//                     setFormData({ ...formData, profile_picture: e.target.files[0] })
//                   }
//                   className="py-3 px-1 outline-none block h-full w-full"
//                 />
//               </p>
//             </div>
//             <p className="text-center text-green-500 text-lg my-5">{message}</p>
//             <div className="mt-6 pt-3">
//               <button
//                 type="submit"
//                 className="rounded text-gray-100 px-9 py-1 bg-[#68ac5d] hover:shadow-inner hover:bg-green-700 transition-all duration-300 text-xl"
//               >
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={() => onChange((prev) => !prev)}
//                 className="rounded ml-4 text-gray-100 px-9 py-1 bg-red-500 hover:shadow-inner hover:bg-red-700 transition-all duration-300 text-xl"
//               >
//                 Discard
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateForm;
