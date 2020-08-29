import React from "react";
import {formatToCurrency} from  "../../../../utilities";
import {Spring} from 'react-spring/renderprops';

import './Item.css';

function Item(props)
{
    return (
        <Spring
            from={{opacity: 0, marginTop: -500}}
            to={{opacity: 1, marginTop: 0}}
        >
            {sprops => (
                   <div style={Object.assign({}, sprops )}
                    className="item-container hover-rsgold clickable"
                    onClick={()=> props.data.updateSelectedItem(props.prod)} >
                      <div className="item-img-container imgContainer-circle">
                          <img src={props.prod.imgurl} alt="product icon"/>
                      </div>
      
                      <div className="item-details">
                          <h3  className="item-name" >{ props.prod.name.substring(0,25)}  </h3>
                          <h3  className="item-price">{formatToCurrency(props.prod.price)} </h3>
                      </div>
                      
                  </div> 
                )}
        </Spring>
    )
};

export default Item;