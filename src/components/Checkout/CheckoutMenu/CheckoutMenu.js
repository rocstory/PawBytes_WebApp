import React from "react";
import {CartContext} from "../../../CartContext";
import {formatToCurrency } from  "../../../utilities";
import {add_order_into_db} from "../../../pawbytesDB";
import "./CheckoutMenu.css";

import CheckoutItem from "./CheckoutItem/CheckoutItem";

class CheckoutMenu extends React.Component
{
    static contextType = CartContext;

    constructor()
    {
        super();
        this.state = {
            orderIsPlaced: false
        }
    }

    sendOrderToDB = async (products, balance, customerid) => {

        if (customerid && (products.length > 0))
        {
            
            // get the current date
            let currentDate = new Date();
            let formattedDate = currentDate.getMonth() + '/' + currentDate.getDay() + '/' + currentDate.getFullYear();
            let order = {
                orderdate: formattedDate,
                balance: balance,
                customerid: customerid, 
                itemsummary: products
            }
            await add_order_into_db(order);
            this.context.clearItemsFromCart();
            this.setState({
                orderIsPlaced: true
            });
        }
    }

    render()
    {
        const cartItemsArray = Array.from(this.context.cartItems.values());
        const cartItems = cartItemsArray.map( item => {
            return (
                <CheckoutItem key={item.productid} item={item} />
            )
        });

        return (
            <div style={Object.assign( {}, this.props.springAnimProp)} 
                className="main-container-bg checkout-menu-container">
                <div className="cart-display" >
                    <ul className="item-list" >
                        {cartItems}
                    </ul>
                </div>
                <div className="details">

                    { this.state.orderIsPlaced 
                            ? <p>Thank you!</p> 
                            : <p>Order Total: {formatToCurrency(this.context.balance)} </p> 
                    }
                    <button 
                        className="clickable hover-rsgold button-style"
                        onClick={ () => { this.sendOrderToDB(cartItemsArray, this.context.balance, this.props.customerid);}}
                        >Place Order </button>
                </div>
            </div>
        )
    }
};

export default CheckoutMenu