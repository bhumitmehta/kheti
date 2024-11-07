import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import SearchBar from '../../components/dashboard/SearchBar';
import FilterPanel from '../../components/dashboard/FilterSidebar';
import FeaturedProducts from '../../components/dashboard/featuredProduct';
import { getEquipmentsWithUserData as getEquips } from '../../api/equipments/equipments';
import Cookies from 'js-cookie';

const Dashboard = () => {
    const [equipments, setEquipments] = useState([]);
    const [filteredEquipments, setFilteredEquipments] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [perDay, setPerDay] = useState(10000); 
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

    useEffect(() => {
        const fetchEquipments = async () => {
            const cookieData = Cookies.get('equipments'); 
            if (cookieData) {
                const parsedData = JSON.parse(cookieData);
                setEquipments(parsedData);
                setFilteredEquipments(parsedData);
                console.log('Loaded from cookies:', parsedData);
            } else {
                const data = await getEquips();
                setEquipments(data);
                setFilteredEquipments(data);
                Cookies.set('equipments', JSON.stringify(data), { expires: 1 });
                console.log('Fetched and stored in cookies:', data);
            }
        };
        fetchEquipments();
    }, []);

    useEffect(() => {
        let filtered = [...equipments];

        // Search filter
        if (searchInput) {
            filtered = filtered.filter(equipment =>
                equipment.title.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        // Per Day filter
        if (perDay) {
            filtered = filtered.filter(equipment => equipment.daily_rental <= perDay);
        }

        // Set the filtered equipment state
        setFilteredEquipments(filtered);
    }, [searchInput, perDay, equipments]);

    const equipList = [
        "tractor",
        "Implements",
        "Harvester"
    ];

    return (
        <div className='max-w-full md:mx-20'>
            {/* <SearchBar setSearchInput={setSearchInput} /> */}

            <div className='flex mt-0'>
                {/* Show filter button on mobile */}
                <button 
                    className="filter-toggle-btn mobile-only" 
                    onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)} // Toggle filter panel
                >
                    {isFilterPanelOpen ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Filter Panel */}
                <div className='filter-panel-container'>
                    <FilterPanel
                        isOpen={isFilterPanelOpen} // Pass the state
                        setIsOpen={setIsFilterPanelOpen} // Pass the function to toggle
                        equipList={equipList}
                        perDay={perDay}
                        setPerDay={setPerDay}
                    />
                </div>

                {/* Featured Products */}
                <div className="featured-products-container">
                    <FeaturedProducts filteredEquipments={equipments} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
