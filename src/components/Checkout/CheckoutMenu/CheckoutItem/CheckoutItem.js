import React from "react";
import {CartContext} from "../../../../CartContext";
import {formatToCurrency } from  "../../../../utilities";
import "./CheckoutItem.css";

function CheckoutItem(props) 
{
    const lineTotal = formatToCurrency(props.item.linetotal);
    
    return (
        <div className="checkout-item-container">
            <div className="imgContainer-circle img-container">
                <img  src={props.item.imgurl} alt="item icon"/>
            </div>

            <div className="item-description-container">
                <p className="prod-name">{props.item.name}</p>

                <div className="item-detail-container">
                    <p className="chkitem-text-style chkitem-quantity" >Quantity: {props.item.quantity}</p>
                    <p className="chkitem-text-style chkitem-linetotal">{lineTotal}</p>
                </div>

                <CartContext.Consumer>
                    {context => (
                            <button 
                                className="button-style"
                                onClick={() => {  context.removeFromCart(props.item);}}>
                                Remove
                            </button>
                    )}
                </CartContext.Consumer>
                
            </div>
        </div>
    );
};

export default CheckoutItem;