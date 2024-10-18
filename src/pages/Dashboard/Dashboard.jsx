import React, { useEffect, useState } from 'react'
import './Dashboard.css';
import ProductItem from '../../components/dashboard/ProductItem';
import Dropdown from '../../components/expanddropdown';
import { getEquipmentsWithUserData as getEquips } from '../../api/equipments/equipments';
import { DateRangePicker } from 'react-date-range';
// import SpeechRecognition from "react-speech-recognition";

const Dashboard = () => {
    const [equipments, setEquipments] = useState([]);
    const [equipList, setEquipList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [perDay, setPerDay] = useState(10000);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [filteredEquipments, setFilteredEquipments] = useState([]);

    useEffect(() => {
        const fetchEquipments = async () => {
            const data = await getEquips();
            setEquipments(data);
            setFilteredEquipments(data);
            console.log(data)
        };
        fetchEquipments();
    }, []);

    useEffect(() => {
        let filtered = equipments;
        
        if (searchInput) {
            filtered = filtered.filter(equipment =>
                equipment.title.toLowerCase().includes(searchInput.toLowerCase())
            );
        }
        if (perDay) {
            filtered = filtered.filter(equipment => equipment.daily_rental <= perDay);
        }
        setFilteredEquipments(filtered);
    }, []);

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    };

    return (
        <>
            <div className='max-w-7xl my-10 mx-auto'>
                <div className='mt-4'>
                    <div className='flex justify-around'>
                        <h1 className='text-2xl font-bold text-gray-600 text-right'>Search Equipments</h1>
                        <div className=''>
                            <div className="input-group relative flex items-stretch w-full mb-4">
                                <input
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type="search"
                                    className="searchInput form-control relative flex-auto min-w-0 block w-full px-3 py-3 text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Enter your Equipment here..."
                                    aria-label="Search"
                                    aria-describedby="button-addon3"
                                />
                                <button className="searchBtn btn inline-block px-6 py-2 text-green-600 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 cursor-pointer focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="button" id="button-addon3">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex mb-10 justify-around'>
                        <div className="flex w-[240px] h-[40px] items-center border-2 rounded-lg border-[#68AC5D] px-1">
                            <i className="text-[#67b45b] pl-4 pr-2 fa-solid fa-location-dot"></i>
                            <input className="searchDash appearance-none bg-transparent w-full text-gray-800 font-semibold mr-1 py-0.5 px-1 leading-tight focus:outline-none" type="text" placeholder="Enter Pincode (e.g., 201301)" aria-label="Pincode" />
                        </div>
                        <h1 className='mt-3 mb-3 text-md font-semibold text-gray-500 text-center'>Search your desired Equipments directly by entering a keyword or the whole name.</h1>
                    </div>

                    <div className='flex justify-around w-full'>
                        <div className='w-1/4'>
                            <div className='bg-[#68AC5D] py-4 px-1 prFilter'>
                                <h1 className='text-lg font-bold text-center text-white'>Product Filters</h1>
                            </div>

                            <div className='border py-6'>
                                <span className='text-lg mb-4 font-semibold text-[#4F4F4F] border-b-2 border-[#68AC5D] pb-1 ml-6'>Categories:</span>

                                <div className='my-5'>
                                    {
                                        equipList?.map(list => (
                                            <Dropdown key={list.id} title={list.name} />
                                        ))
                                    }
                                </div>

                                <span className='text-lg mb-4 font-semibold text-[#4F4F4F] border-b-2 border-[#68AC5D] pb-1 ml-6'>Brands</span>

                                <div className='my-5'>
                                    <Dropdown title="Mahindra" />
                                    <Dropdown title="John Deere" />
                                    <Dropdown title="CLAAS India" />
                                </div>

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

                                <span className='text-lg mb-4 font-semibold text-[#4F4F4F] border-b-2 border-[#68AC5D] pb-1 ml-6'>Availability Date</span>

                                <p className='text-md pt-2 font-normal text-[#4F4F4F] pl-6'>From</p>

                                <div className='flex justify-center items-center'>
                                    <button onClick={() => setVisible1(!visible1)} className="bg-darkgreen hover:bg-green-700 text-white font-normal text-sm py-1 text-center w-1/2 my-4 px-2 rounded">
                                        DD-MM-YYYY
                                    </button>
                                    <i className="ml-4 text-lg text-[#68AC5D] fa-solid fa-calendar"></i>
                                </div>
                                <div style={{ display: visible1 ? 'block' : 'none', height: '400px', width: '200px', zIndex: 1 }}>
                                    <DateRangePicker
                                        ranges={[selectionRange]}
                                        minDate={new Date()}
                                        rangeColors={["#68AC5D"]}
                                    />
                                </div>

                                <p className='text-md font-normal text-[#4F4F4F] pl-6'>To</p>
                                <div className='flex justify-center items-center'>
                                    <button onClick={() => setVisible2(!visible2)} className="bg-darkgreen hover:bg-green-700 text-white font-normal text-sm py-1 text-center w-1/2 my-4 px-2 rounded">
                                        DD-MM-YYYY
                                    </button>
                                    <i className="ml-4 text-lg text-[#68AC5D] fa-solid fa-calendar"></i>
                                </div>
                                <div style={{ display: visible2 ? 'block' : 'none', height: '400px', width: '200px', zIndex: 1 }}>
                                    <DateRangePicker
                                        ranges={[selectionRange]}
                                        minDate={new Date()}
                                        rangeColors={["#68AC5D"]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='w-3/4 ml-8'>
                            <div className='relative flex justify-around'>
                                <h1 className='absolute top-0 left-0 text-2xl font-bold text-gray-600'>Featured Products</h1>
                                <button className="absolute top-0 right-10 shadow-md bg-darkgreen mx-auto hover:bg-green-700 text-white text-md font-normal py-1.5 px-3 rounded">
                                    More <i className="pl-1 w-5 fa-solid fa-angle-right"></i>
                                </button>
                            </div>

                            <div className='flex flex-wrap items-center'>
                                <div className='flex flex-wrap my-12'>
                                    {
                                        filteredEquipments?.map(equipment => (
                                            <ProductItem key={equipment.id} equipment={equipment} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
