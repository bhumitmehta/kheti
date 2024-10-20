import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import SearchBar from '../../components/dashboard/SearchBar';
import FilterPanel from '../../components/dashboard/FilterSidebar';
import FeaturedProducts from '../../components/dashboard/featuredProduct';
import { getEquipmentsWithUserData as getEquips } from '../../api/equipments/equipments';
import Cookies from 'js-cookie';
// import FilterContext from '../../contexts/FilterContext';

const Dashboard = () => {
    const [equipments, setEquipments] = useState([]);
    const [filteredEquipments, setFilteredEquipments] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [perDay, setPerDay] = useState(10000); // Ensure perDay is initialized with a large value
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    // Fetch equipment data and store it in cookies if not already present
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

    // Filter logic triggered on searchInput or perDay change
    useEffect(() => {
        let filtered = [...equipments]; // Ensure we're working with a copy of the original data

        // Search filter
        if (searchInput) {
            filtered = filtered.filter(equipment =>
                equipment.title.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        // Per Day filter (Ensure it's checked correctly)
        if (perDay) {
            filtered = filtered.filter(equipment => equipment.daily_rental <= perDay);
        }

        // Log filtered results to debug
        console.log('Filtered Equipments:', filtered);

        // Set the filtered equipment state
        setFilteredEquipments(filtered);
    }, [searchInput, perDay, equipments]); // Re-run filter whenever searchInput, perDay, or equipments change

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    };
    const equipList = [
        "tractor",
        "Implements",
        "Harvestor"

    ]

    return (
        <div className='max-w-full mx-20 my-8'>
            <SearchBar setSearchInput={setSearchInput} />
            <div className='flex mt-8'>
                
                <FilterPanel
                    equipList={equipList}
                    perDay={perDay}
                    setPerDay={setPerDay}
                    selectionRange={selectionRange}
                />
                
                <FeaturedProducts filteredEquipments={equipments} />
            </div>
        </div>
    );
};

export default Dashboard;