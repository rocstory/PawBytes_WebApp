import React from "react";
import icon from '../../assets/images/icons/checkoutBag.png';
import {CartContext} from "../../CartContext";

import "./Cart.css";

function Cart(props)
{

    return (
            <div className="cart-container">
                <img className="clickable cart-img-style" src={icon} alt="checkout bag" />
                <div className="cart-amount-container clickable">
                    <CartContext.Consumer>
                    { context => ( <p className="amount-style" >{ context.cartAmount}</p> )}
                    </CartContext.Consumer>
                </div>
            </div>
        
    )
}

export default Cart;
