import { createContext, useState } from "react";

const FilterContext = createContext({});

export const FilterProvider = ({ children }) => {
    // Define the initial state for filters
    const initialFilterState = {
        equipment_type: '',
        manufacturer: '',
        model_type: '',
        price_range: [0, 100000],
        available_from: '',
        available_till: '',
        location: {
            latitude: null,
            longitude: null,
            address: '',
            city: '',
            state: '',
            zipCode: '',
        },
    };

    // Manage filter state
    const [filters, setFilters] = useState(initialFilterState);

    // Handle changes in the filters (similar to form handling)
    const handleFilterChange = e => {
        const { type, name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? e.target.checked : value,
        }));
    };

    // Function to update price range
    const handlePriceChange = (min, max) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            price_range: [min, max],
        }));
    };

    // Function to update location (latitude, longitude, etc.)
    const handleLocationChange = (newLocation) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            location: {
                ...prevFilters.location,
                ...newLocation,
            },
        }));
    };

    // Function to reset filters to initial state
    const resetFilters = () => {
        setFilters(initialFilterState);
    };

    // Check if all mandatory filters are filled (this is an example, modify it based on your needs)
    const canApplyFilters = filters.equipment_type !== '' && filters.manufacturer !== '';

    return (
        <FilterContext.Provider value={{
            filters,
            setFilters,
            handleFilterChange,
            handlePriceChange,
            handleLocationChange,
            resetFilters,
            canApplyFilters
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterContext;
