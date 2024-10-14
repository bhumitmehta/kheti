import React from "react";
import "./step1.css";

const equipments = [
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Tractors.jpg",
    title: "Tractors"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Tillage_Equipment.jpg",
    title: "Tillage Equipment"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Seeding_Equipment.jpg",
    title: "Seeding Equipments"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Landscaping_Equipment.jpg",
    title: "Landscape Equipment"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Crop_Protection.jpg",
    title: "Crop Protection"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Harvest_Equipment.jpg",
    title: "Harvest Equipment"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Post_Harvest.jpg",
    title: "Post Harvest"
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/www.beroni.in/farmease-app/categories/Haulage.jpg",
    title: "Haulage"
  }
];

const Step1 = ({ data, setData, nextStep }) => {
  // Function to handle equipment selection
  const handleSelect = (equipment) => {
    setData({ ...data, equipment_type: equipment.title });
    nextStep(); // Move to the next step upon selection
  };

  return (
    <div className="my-6">
      <div className="mx-4 sm:mx-8 lg:mx-16">
        <h1 className="text-center text-xl sm:text-2xl lg:text-3xl font-medium my-10">
          Step 1: Select Equipment Type
        </h1>
        
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16">
          {equipments.map((equipment) => (
            <div
              key={equipment.title}
              className={`w-full relative cursor-pointer p-2 rounded-lg shadow-md hover:shadow-xl transform transition-all duration-300 ${
                data.equipment_type === equipment.title ? 'ring-4 ring-green-500' : ''
              }`}
              onClick={() => handleSelect(equipment)} // Call handleSelect on click
            >
              <h1 className="equipTitle text-center font-semibold text-base sm:text-lg">{equipment.title}</h1>
              <img
                className="equipImg w-full h-32 object-cover rounded-md"
                src={equipment.img}
                alt={equipment.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step1;
