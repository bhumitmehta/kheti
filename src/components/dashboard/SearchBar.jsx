import React from 'react';

const SearchBar = ({ searchInput, setSearchInput }) => {
    return (
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
    );
};

export default SearchBar;
