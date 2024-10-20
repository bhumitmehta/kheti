import React from 'react';
import ProductItem from '../../components/dashboard/ProductItem';

const ProductList = ({ equipments }) => {
    return (
        <div className='w-3/4 ml-8'>
            <h1 className='text-2xl font-bold text-gray-600'>Featured Products</h1>
            <div className='flex flex-wrap my-12'>
                {equipments?.map(equipment => (
                    <ProductItem key={equipment.id} equipment={equipment} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
