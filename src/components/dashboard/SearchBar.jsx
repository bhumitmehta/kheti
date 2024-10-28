import React from 'react';

const SearchBar = ({ searchInput, setSearchInput }) => {
    return (
        <div className='flex flex-col md:flex-row items-center justify-around p-4'>
            <h1 className='text-xl md:text-2xl font-bold text-gray-600 text-center mb-2 md:mb-0'>Search Equipments</h1>
            <div className='w-full md:w-auto'>
                <div className="input-group relative flex items-center w-full">
                    <input
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="search"
                        className="searchInput form-control relative flex-auto min-w-0 w-full md:w-80 px-3 py-2 text-gray-700 bg-white border border-solid border-gray-300 rounded-md focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none transition ease-in-out"
                        placeholder="Enter your Equipment here..."
                        aria-label="Search"
                        aria-describedby="button-addon3"
                    />
                    <button 
                        className="searchBtn btn inline-block px-4 py-2 ml-2 text-green-600 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none transition duration-150 ease-in-out"
                        type="button" 
                        id="button-addon3"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
