import React from "react";
import {CartContext} from "../../CartContext";
import {formatToCurrency } from  "../../utilities";
import {Spring} from 'react-spring/renderprops';
import {get_customer_from_db, set_customer_into_db, add_order_into_db} from "../../pawbytesDB";
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
/*
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

        const containerStyle =
        {
            border: "2px solid black",
            width: "70%",
            height:"36em",
            display: "flex",
            margin: "auto",
            flexDirection: "column",
            padding: "0.6em",
            overflow: "hidden"
        }

        const cartDisplay =
        {
            border: "2px solid black",
            backgroundColor:"whitesmoke",
            height: "21em",
            width: "90%", 
            overflowY: "auto",
            margin: "1em auto"
        }

        const item_list = 
        {
            
            listStyle: "none",
            padding: "0",
            overflow: "auto",
            whiteSpace: "nowrap",
            margin: "0"
        }
        const details = 
        {
            margin: "0 auto",
            width: "90%",
            fontSize:"1.6em",
        }

        const buttonStyle =
        {
            border: "2px solid black",
            width: "12em",
            height:"5em",
            fontSize: "0.7em",
            fontWeight: "bold",
        }

        return (
            <div style={Object.assign( {}, containerStyle, this.props.springAnimProp)} className="main-container-bg">
                <div style={cartDisplay} >
                    <ul style={item_list} >
                        {cartItems}
                    </ul>
                </div>
                <div style={details}>

                    { this.state.orderIsPlaced 
                            ? <p>Thank you!</p> 
                            : <p>Order Total: {formatToCurrency(this.context.balance)} </p> 
                    }
                    <button 
                        style={buttonStyle} 
                        className="clickable hover-rsgold"
                        onClick={ () => { this.sendOrderToDB(cartItemsArray, this.context.balance, this.props.customerid);}}
                        >Place Order </button>
                </div>
            </div>
        )
    }
};
*/


function CheckoutItem(props) 
{
    const containerStyle =
    {
        borderBottom: "1px dotted black",
        backgroundColor: "#F3F4F6",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: "0 .5em",
        height: "5em",
        
    }
    const itemDescriptionContainer =
    {
        display: "flex",
        flexDirection: "column",
        padding: "0 .5em",
        height: "4.8em",
        width: "80%"
    }
    const prodName =
    {
        fontSize: "1.2em",
        fontWeight: "bold",
        margin: "0 0"
    }

    const itemDetailContainer =
    {
        fontSize: "1.0em",
        margin: "0px",
        padding: "0px"
    }

    const textStyle =  {margin: "0"}
    const lineTotal = formatToCurrency(props.item.linetotal);
    const buttonStyle = 
    {
        width: "4.7em", 
        height: "2em", 
        alignSelf:"flex-end", 
        marginTop: "0.9em",
        
    }
    const imgContainer =
    {
        width: "4em",
        height: "4em",
        border: "2px solid black"
    }

    return (
        <div style={containerStyle}>
            <div style={imgContainer}  className="imgContainer-circle">
                <img  src={props.item.imgurl} alt="item icon"/>
            </div>

            <div style={itemDescriptionContainer}>
                <p style={prodName}>{props.item.name}</p>

                <div style={itemDetailContainer}>
                    <p style={Object.assign({},{float: "left" }, textStyle )} >Quantity: {props.item.quantity}</p>
                    <p style={Object.assign({},{float: "right" }, textStyle )} >{lineTotal}</p>
                </div>

                <CartContext.Consumer>
                    {context => (
                            <button 
                                style={Object.assign({}, buttonStyle,)}
                                onClick={() => {  context.removeFromCart(props.item);}}>
                                Remove
                            </button>
                    )}
                    
                </CartContext.Consumer>
                
            </div>
        </div>
    );
};


