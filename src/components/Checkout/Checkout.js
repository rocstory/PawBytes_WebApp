import React from "react";
import {CartContext} from "../../CartContext";
import {Spring} from 'react-spring/renderprops';
import "./Checkout.css";

import ContactForm from './ContactForm/ContactForm';
import CheckoutMenu from './CheckoutMenu/CheckoutMenu';

class Checkout extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            customerid: null,
        }
    }
    static contextType = CartContext; // give checckout component access to the cart context

    setCustomerID = (updatedCustomerID) =>
    {
        this.setState({
            customerid: updatedCustomerID
        });
    }; // setCustomer

    render()
    {
        return (
            <Spring
                from={{opacity: 0, marginTop: -500}}
                to={{opacity: 1, marginTop: 0}}
            >
                {sprops => (
                    <div>
                        { !this.context.customerid  
                            ? <ContactForm customerid={this.context.customerid}  springAnimProp={sprops} setCustomerID={this.setCustomerID} />
                            : <CheckoutMenu 
                                customerid={this.context.customerid}
                                springAnimProp={sprops} />
                        }
                    </div>
                )}
            </Spring>
        ) // return
    } // render
};
export default Checkout;

