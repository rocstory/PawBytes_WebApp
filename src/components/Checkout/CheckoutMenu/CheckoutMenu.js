import React from "react";
import {CartContext} from "../../../CartContext";
import {formatToCurrency } from  "../../../utilities";
import {add_order_into_db} from "../../../pawbytesDB";
import "./CheckoutMenu.css";

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


export default CheckoutMenu