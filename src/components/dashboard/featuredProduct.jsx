import React from 'react';
import ProductItem from '../../components/dashboard/ProductItem';

const FeaturedProducts = ({ filteredEquipments }) => {
    return (
        <div className='w-3/4 ml-8'>
            <div className='relative flex  justify-around'>
                <h1 className='text-2xl font-bold text-gray-600'>Featured Products</h1>
                <button className=" top-0 right-10 shadow-md bg-darkgreen mx-auto hover:bg-green-700 text-white text-md font-normal py-1.5 px-3 rounded">
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
    );
};

export default FeaturedProducts;
