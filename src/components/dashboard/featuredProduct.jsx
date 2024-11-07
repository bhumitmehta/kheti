import React from 'react';
import ProductItem from '../../components/dashboard/ProductItem';

const FeaturedProducts = ({ filteredEquipments }) => {
    return (
        <div className='w-full ml-3'>
            <div className='relative flex  justify-around'>
                {/* <h1 className='text-2xl font-bold text-gray-600'>Featured Products</h1> */}
            </div>

            <div className='flex flex-wrap items-center'>
                <div className='flex flex-wrap my-1'>
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
