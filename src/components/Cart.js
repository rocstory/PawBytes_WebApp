import React from "react";
import icon from '../assets/images/icons/checkoutBag.png';
import {CartContext} from "../CartContext";

function Cart(props)
{
    const container =
    {
        textAlign: "center",
        width: "11em",
        height: "auto",
        overflow: "hidden"
    }

    const imgStyle =
    {
        width: "5em",
        height: "5em"
    }

    const amountContainer =
    {
        border: "2px solid black",
        borderRadius: "30%",
        width: "5em",
        height: "2em",
        backgroundColor: "white",
        float: "right",
        marginTop: "3em"
    }

    const amntStyle =
    {
        margin: "auto",
        fontSize: "1.7em",
        color: "black"
    }

    return (
            <div style={container} >
                <img style={imgStyle} className="clickable" src={icon} alt="checkout bag" />
                <div style={amountContainer} className="clickable">
                    <CartContext.Consumer>
                    { context => ( <p style={amntStyle}>{ context.cartAmount}</p> )}
                    </CartContext.Consumer>
                </div>
            </div>
        
    )
}

export default Cart;
