// import React from "react";
// import './ProductItem.css';
// import item1 from '../../img/item1.png';
// import { Link, useNavigate } from "react-router-dom";

// const ProductItem = ({ equipment }) => {
//     console.log("here",equipment)
    
//     const navigate = useNavigate();
//     return (
        
//             <div className="my-6">
//                 <div className="mx-2 itemDiv p-4">
//                     <Link to={`/product/${equipment.id}`}><img style={{ height: '220px', width: '230px', objectFit: 'cover' }} src={equipment?.image || item1} alt="" /></Link>
//                     <div className="flex justify-around my-2 p-3">
//                         <div>
//                             <h1 className="text-2x; font-semibold text-gray-500">{equipment?.title.substring(0,10)}</h1>
//                             <span className="text-xs font-semibold text-gray-700">4.5</span>
//                             <span className="fa fa-star checked text-xs text-yellow-400"></span>
//                             <span className="fa fa-star checked text-xs text-yellow-400 font-semibold"></span>
//                             <span className="fa fa-star checked text-xs text-yellow-400 font-semibold"></span>
//                             <span className="fa fa-star text-xs text-yellow-400 font-semibold"></span>
//                             <span className="fa fa-star text-xs text-yellow-400 font-semibold"></span>
//                         </div>
//                         <p className="text-xs pl-8 font-semibold text-gray-500 pt-3">{equipment?.manufacturer}</p>
//                     </div>

//                     <p className="text-lg font-bold text-gray-600">Rs {equipment.daily_rental} per Day</p>
//                     <p className="text-sm font-bold text-gray-500">Rs {equipment.hourly_rental} per Hour</p>
//                     <button onClick={() => navigate(`/product/${equipment.id}`)} className="bg-darkgreen hover:bg-green-700 text-white font-bold py-1 text-center w-full my-4 px-8 rounded">
//                         View Details
//                     </button>
//                 </div>
//             </div>
//     );
// };

// export default ProductItem;

// import React from "react";
// import './ProductItem.css';
// import item1 from '../../img/item1.png';
// import { Link, useNavigate } from "react-router-dom";

// const ProductItem = ({ equipment }) => {
//     const navigate = useNavigate();
//     console.log(equipment)
//     return (
//         <div className="my-6">
//             <div className="mx-2 itemDiv p-4">
//                 <Link to={`/product/${equipment.id}`}>
//                     <img 
//                         style={{ height: '220px', width: '230px', objectFit: 'cover' }} 
//                         src={equipment?.images?.[0] || item1} 
//                         alt={equipment?.equipment_id || "Equipment Image"} 
//                     />
//                 </Link>
//                 <div className="flex justify-around my-2 p-3">
//                     <div>
//                         <h1 className="text-2xl font-semibold text-gray-500">
//                             {equipment.title }
//                         </h1>
//                         <span className="text-xs font-semibold text-gray-700">4.5</span>
//                         <span className="fa fa-star checked text-xs text-yellow-400"></span>
//                         <span className="fa fa-star checked text-xs text-yellow-400 font-semibold"></span>
//                         <span className="fa fa-star checked text-xs text-yellow-400 font-semibold"></span>
//                         <span className="fa fa-star text-xs text-yellow-400 font-semibold"></span>
//                         <span className="fa fa-star text-xs text-yellow-400 font-semibold"></span>
//                     </div>
//                     <p className="text-xs pl-8 font-semibold text-gray-500 pt-3">
//                         {equipment?.location?.city || "Unknown Location"}
//                     </p>
//                 </div>

//                 <p className="text-lg font-bold text-gray-600">
//                     Rs {equipment?.daily_rent || "N/A"} per Day
//                 </p>
//                 <p className="text-sm font-bold text-gray-500">
//                     Engine Power: {equipment?.specs?.engine_power || "N/A"}
//                 </p>
//                 <p className="text-sm font-bold text-gray-500">
//                     Transmission: {equipment?.specs?.transmission || "N/A"}
//                 </p>
//                 <button 
//                     onClick={() => navigate(`/product/${equipment.id}`)} 
//                     className="bg-darkgreen hover:bg-green-700 text-white font-bold py-1 text-center w-full my-4 px-8 rounded"
//                 >
//                     View Details
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProductItem;





import React from "react";
import './ProductItem.css';
import item1 from '../../img/item1.png';
import { Link, useNavigate } from "react-router-dom";

const ProductItem = ({ equipment }) => {
    const navigate = useNavigate();
    console.log(equipment)
    return (
        <div class="flex justify-center items-center p-1 my-2">
    <div class=" mx-0  ">
     
        <div class="relative flex max-w-[18rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
            <Link to={`/product/${equipment.id}`}>
            <img 
                        // style={{ height: '220px', width: '230px', objectFit: 'cover' }} 
                        src={equipment?.images?.[0] || item1} 
                        alt={equipment?.equipment_id || "Equipment Image"} 
                    /></Link>
            </div>
            <div class="p-6">
                <h4 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    UI/UX Review Check
                </h4>
                <p class="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                    Because it&apos;s about motivating the doers. Because I&apos;m here to follow my dreams and inspire others.
                </p>
            </div>
            <div class="flex items-center justify-between p-6">
                <div class="flex items-center -space-x-3">
                    <img alt="natali craig"
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
                        class="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10" />
                </div>
                <p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
                    January 10
                </p>
            </div>
        </div>
    </div>
</div>
    );
};

export default ProductItem;
