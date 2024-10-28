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
    const [perDay, setPerDay] = useState(10000); // Ensure perDay is initialized with a large value
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false); // State for mobile filter panel

    useEffect(() => {
        const fetchEquipments = async () => {
            const cookieData = Cookies.get('equipments'); // Check if data is stored in cookies
            if (cookieData) {
                const parsedData = JSON.parse(cookieData);
                setEquipments(parsedData);
                setFilteredEquipments(parsedData);
                console.log('Loaded from cookies:', parsedData);
            } else {
                const data = await getEquips();
                setEquipments(data);
                setFilteredEquipments(data);
                Cookies.set('equipments', JSON.stringify(data), { expires: 1 }); // Store in cookie for 1 day
                console.log('Fetched and stored in cookies:', data);
            }
        };
        fetchEquipments();
    }, []);

    useEffect(() => {
        let filtered = [...equipments]; // Ensure we're working with a copy of the original data

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

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    };
    const equipList = [
        "tractor",
        "Implements",
        "Harvestor"
    ];

    return (
        <div className='max-w-full mx-20 my-8'>
            <SearchBar setSearchInput={setSearchInput} />
            
            <div className='flex mt-8'>
                {/* Show filter button on mobile */}
                <button 
                    className="filter-toggle-btn mobile-only" 
                    onClick={() => setIsFilterPanelOpen(true)}
                >
                    Show Filters
                </button>

                {/* Filter Panel */}
                <div className={`filter-panel ${isFilterPanelOpen ? "open" : ""}`}>
                    <FilterPanel
                        equipList={equipList}
                        perDay={perDay}
                        setPerDay={setPerDay}
                        selectionRange={selectionRange}
                    />
                    <button 
                        className="close-filter-btn mobile-only" 
                        onClick={() => setIsFilterPanelOpen(false)}
                    >
                        Close Filters
                    </button>
                </div>

                {/* Featured Products */}
                <FeaturedProducts filteredEquipments={filteredEquipments} />
            </div>
        </div>
    );
};

export default Dashboard;
