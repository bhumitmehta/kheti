import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import Dropdown from '../expanddropdown/Dropdown';
import { getBrandsByEquipmentType } from '../../api/equipments/equipments';
import './FilterSideBar.css';

const FilterPanel = ({ perDay, setPerDay, isOpen, setIsOpen }) => {
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const equipmentCategories = [
        { name: 'Tractor', value: 'tractor' },
        { name: 'Tillage', value: 'tillage' },
        // Add more categories as needed
    ];

    const fetchBrands = async (equipmentType) => {
        const brands = await getBrandsByEquipmentType(equipmentType);
        setBrandList(brands.map((brand) => brand.name));
    };

    const handleEquipmentChange = (equipmentValue) => {
        setSelectedEquipment((prevSelected) => {
            if (prevSelected.includes(equipmentValue)) {
                // Remove equipment if it is already selected
                return prevSelected.filter((item) => item !== equipmentValue);
            } else {
                // Add equipment if it is not selected
                return [...prevSelected, equipmentValue];
            }
        });
        fetchBrands(equipmentValue);
    };

    return (
        <div className={`filter-panel ${isOpen ? "open" : ""} shadow-lg border rounded-lg`}>
            {/* Close button for mobile */}
           {isOpen&&<button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 md:hidden lg:hidden"
            >
                ✕
            </button>}

            {/* Sidebar Header */}
            <div className='bg-[#68AC5D] py-3'>
                <h1 className='text-lg font-bold text-center text-white'>Product Filters</h1>
            </div>

            {/* Sidebar container */}
            <div className='p-4'>
                {/* Category Section */}
                <span className='text-sm mb-4 font-semibold text-[#4F4F4F] border-b-2 border-[#68AC5D] pb-1 ml-4'>Categories:</span>
                <div className='my-4 ml-4'>
                    {equipmentCategories.map((equipment, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={equipment.value}
                                value={equipment.value}
                                checked={selectedEquipment.includes(equipment.value)}
                                onChange={() => handleEquipmentChange(equipment.value)}
                                className="mr-2"
                            />
                            <label htmlFor={equipment.value} className='text-lg font-medium text-gray-800'>
                                {equipment.name}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Brand Section */}
                <span className='text-sm mb-4 font-semibold text-[#4F4F4F] border-b-2 border-[#68AC5D] pb-1 ml-4'>Brands</span>
                <div className='my-4 ml-4'>
                    {brandList.length ? brandList.map((brand, index) => (
                       <p className='text-sm font-large text-gray-700' key={index}>{brand}</p>
                    )) : (
                        <>
                            <p className='text-sm font-medium text-gray-700'>Mahindra</p>
                            <p className='text-sm font-medium text-gray-700'>John Deere</p>
                            <p className='text-sm font-medium text-gray-700'>CLAAS India</p>
                        </>
                    )}
                </div>

                {/* Price Range Section */}
                <span className='text-sm mb-4 font-semibold text-[#4F4F4F] border-b-2 border-[#68AC5D] pb-1 ml-4'>Price Range</span>
                <div className='my-4 ml-4'>
                    <p className='text-xs font-semibold text-gray-600'>Price per day</p>
                    <input
                        type="range"
                        min="0"
                        max="100000"
                        value={perDay}
                        onChange={(e) => setPerDay(e.target.value)}
                        className="rangeInput appearance-none w-full h-6 bg-[#68AC5D] rounded focus:outline-none"
                    />
                    <p className='text-xs mt-1 font-normal text-gray-600'>Rs. 0 to {perDay}</p>
                </div>

                {/* Date Range Picker Section */}
                <span className='text-sm mb-4 font-semibold text-[#4F4F4F] border-b-2 border-[#68AC5D] pb-1 ml-4'>Availability</span>
                {/* <p className='text-xs mt-2 font-normal text-gray-600 ml-4'>From</p> */}
                <div className='flex justify-center items-center my-2'>
                    <button onClick={() => setIsOpen(!isOpen)} className="bg-darkgreen hover:bg-green-700 text-white font-medium text-xs py-1 w-full my-2 px-2 rounded">
                        Select Date Range
                    </button>
                    <i className="ml-2 text-sm text-[#68AC5D] fa-solid fa-calendar"></i>
                </div>
                <div style={{ display: isOpen ? 'block' : 'none' }}>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#68AC5D"]}
                        onChange={(ranges) => setSelectionRange(ranges.selection)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
