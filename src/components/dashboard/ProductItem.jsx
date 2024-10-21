import React from "react";
import './ProductItem.css';
import item1 from '../../img/item1.png';
import defaultUserIcon from '../../img/user_icon.svg'; // Default user icon
import { Link } from "react-router-dom";
import moment from 'moment'; // Moment.js to format dates

const ProductItem = ({ equipment }) => {

    const defaultUserName = "Anonymous"; // Default user name

    // Format dates using moment.js
    const availableFrom = moment(equipment?.available_from).format('MMMM Do, YYYY');
    const availableTill = moment(equipment?.available_till).format('MMMM Do, YYYY');

    return (
        <div className="flex justify-center items-center p-1 my-2">
            <div className="mx-0">
                <div className="relative flex max-w-[18rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                    
                    {/* Product Image */}
                    <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                        <Link to={`/product/${equipment.id}`}>
                            <img 
                                // style={{ height: '220px', width: '230px', objectFit: 'cover' }} 
                                src={equipment?.images?.[0] || item1} 
                                alt={equipment?.equipment_id || "Equipment Image"} 
                            />
                        </Link>
                    </div>

                    {/* Equipment Details */}
                    <div className="p-6">
                        <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            {equipment.equipment_id || 'Unknown Equipment'}
                        </h4>
                        <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                            {`Available from ${availableFrom} till ${availableTill}`}
                        </p>
                        <p className="block mt-1 font-sans text-lg antialiased font-normal leading-relaxed text-gray-700">
                            {`Daily Rent: ₹${equipment?.daily_rent}`}
                        </p>
                    </div>

                    {/* User Info and Date */}
                    <div className="flex items-center justify-between p-6">
                        <div className="flex items-center -space-x-3">
                            {/* User Profile Image */}
                            <img 
                                alt={equipment?.user?.name || defaultUserName}
                                src={equipment?.user?.profile_img || defaultUserIcon}
                                className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
                            />
                        </div>
                        <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                            {equipment?.user?.name || defaultUserName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
