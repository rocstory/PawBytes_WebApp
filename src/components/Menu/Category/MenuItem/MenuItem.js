import React from 'react';
import {formatToCurrency } from  "../../../../utilities";

import './MenuItem.css';

function MenuItem(props)
{
    const name = {float: "left"}
    const price ={ float: "right"}

    return (
        <div className="menuitem-container">

            <div className="menuitem-img-container imgContainer-circle">
                <img src={props.product.imgurl} alt="product icon"/>
            </div>

            <div className="menuitem-label menuitem-details">
                <h3 style={Object.assign({}, name )} >{ props.product.name}  </h3>
                <h3 style={Object.assign({}, price ) } >{formatToCurrency(props.product.price)} </h3>
            </div>
            
        </div>
    )
}

export default MenuItem;