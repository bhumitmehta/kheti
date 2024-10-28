import React, { useState, useEffect } from 'react';
import Dropdown from '../expanddropdown/Dropdown';
import { DateRangePicker } from 'react-date-range';
import { getBrandsByEquipmentType } from '../../api/equipments/equipments'; // Import the function that fetches brands from Firestore
import './FilterSideBar.css'

const FilterPanel = ({ equipList, perDay, setPerDay, selectionRange, setVisible1, visible1, setVisible2, visible2 }) => {
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [brandList, setBrandList] = useState([]);

    // Function to fetch brands dynamically when an equipment type is selected
    const fetchBrands = async (equipmentType) => {
        const brands = await getBrandsByEquipmentType(equipmentType);
        setBrandList(brands.map((brand) => brand.name)); // Assuming the brand data has a 'name' field
    };

    // Handle when an equipment type is selected
    const handleEquipmentChange = (equipmentType) => {
        setSelectedEquipment(equipmentType);
        fetchBrands(equipmentType); // Fetch corresponding brands
    };

    return (
        <div className='max-w-sm md:w-1/4 p-4 filter-panel'>
            <div className='bg-[#68AC5D] py-4 px-1 prFilter'>
                <h1 className='text-lg font-bold text-center text-white'>Product Filters</h1>
            </div>

            <div className='border py-6'>
                {/* Dropdown for Categories */}
                <span className='text-lg mb-4 font-semibold text-[#4F4F4F] border-b-2 border-[#68AC5D] pb-1 ml-6'>
                    <Dropdown 
                        key={1} 
                        title={"Categories"} 
                        options={equipList} 
                        onSelect={handleEquipmentChange} // Call when an equipment type is selected
                    />
                </span>

                {/* Dropdown for Brands with dynamically fetched options */}
                <div className='my-5'>
                    <Dropdown 
                        title="Brands" 
                        options={brandList.length ? brandList : ["Select a category first"]} // Show brands or fallback text
                    />
                </div>

                {/* Price Range Slider */}
                <span className='text-lg mb-4 font-semibold text-[#4F4F4F] border-b-2 border-[#68AC5D] pb-1 ml-6'>Price Range</span>
                <div className='my-5'>
                    <p className='text-md font-semibold text-[#4F4F4F] pl-8'>Price per day</p>
                    <input
                        type="range"
                        min="0"
                        max="100000"
                        value={perDay}
                        onChange={(e) => setPerDay(e.target.value)}
                        className="rangeInput form-range text-green-100 appearance-none w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
                    />
                    <p className='text-md mb-3 font-normal text-[#4F4F4F] pl-8'>Rs. 0 to {perDay}</p>
                </div>

                {/* Availability Date */}
                <span className='text-lg mb-4 font-semibold text-[#4F4F4F] border-b-2 border-[#68AC5D] pb-1 ml-6'>Availability Date</span>
                <p className='text-md pt-2 font-normal text-[#4F4F4F] pl-6'>From</p>
                <div className='flex justify-center items-center'>
                    <button onClick={() => setVisible1(!visible1)} className="bg-darkgreen hover:bg-green-700 text-white font-normal text-sm py-1 text-center w-1/2 my-4 px-2 rounded">
                        {selectionRange.startDate.toLocaleDateString('en-GB')}
                    </button>
                    <i className="ml-4 text-lg text-[#68AC5D] fa-solid fa-calendar"></i>
                </div>
                <div className={`calendar-overlay ${visible1 ? 'block' : 'hidden'}`}>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#68AC5D"]}
                        onChange={() => setVisible1(false)}
                    />
                    <button className="close-btn" onClick={() => setVisible1(false)}>Close</button>
                </div>

                <p className='text-md font-normal text-[#4F4F4F] pl-6'>To</p>
                <div className='flex justify-center items-center'>
                    <button onClick={() => setVisible2(!visible2)} className="bg-darkgreen hover:bg-green-700 text-white font-normal text-sm py-1 text-center w-1/2 my-4 px-2 rounded">
                        {selectionRange.endDate.toLocaleDateString('en-GB')}
                    </button>
                    <i className="ml-4 text-lg text-[#68AC5D] fa-solid fa-calendar"></i>
                </div>
                <div className={`calendar-overlay ${visible2 ? 'block' : 'hidden'}`}>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#68AC5D"]}
                        onChange={() => setVisible2(false)}
                    />
                    <button className="close-btn" onClick={() => setVisible2(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
