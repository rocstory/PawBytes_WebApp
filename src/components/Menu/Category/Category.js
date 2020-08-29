import React from 'react';
import MenuItem from './MenuItem/MenuItem';

import './Category.css';

function Category(props)
{
    
    const items = props.products.map(product => {
        return ( <MenuItem key={product._id} product={product}/> )
    })
    
    return (
        <div className="category-container">
            <h1 className="category-title">{props.name}</h1>
            <div className="cat-product-container">
                {items}
            </div>
        </div>
    )
}; 

export default Category;