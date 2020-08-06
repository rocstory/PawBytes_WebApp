import React from "react";
import {CartContext} from "../CartContext";
import {formatToCurrency } from  "../utilities";
import {Link} from 'react-router-dom';

class ItemSummary extends React.Component
{
    constructor()
    {
        super();
        this.state =
        {
            lineTotal: null,
            quantity: 0,
            
        }
    }

    updateItemQuantity = (event) =>
    {
        //check if the quantity provided is valid
        if (this.isQuantityValid(event.target.value))
        {
            if (this.props.selectedItem)    // check if the user selected an item
            {
                // begin to update the states
                // calculate line total
                let quantity = Number.parseInt(event.target.value);
                let balance = this.props.selectedItem.price * quantity;
                this.setState((prevState) => ({lineTotal: balance, quantity: quantity }));
            }
        };
    };

    generateProductInvoice()
    {
        if (!this.props.selectedItem || !this.state.quantity )
        {
            return;
        }

        const product = this.props.selectedItem;
        let selectedProduct =
        {
            productid: product._id,
            name: product.name,
            category: product.category,
            price: product.price,
            imgurl: product.imgurl,
            quantity: this.state.quantity,
            linetotal: this.state.lineTotal

            /*
            pid: product.pid,
            name: product.name,
            quantity: this.state.quantity,
            lineTotal: this.state.lineTotal,
            imgurl: product.imgurl 
            */
        }
        document.getElementById('quantity').value = '';
        this.setState((prevState) => ({lineTotal: 0, quantity: 0 }));
        
        return selectedProduct; 
    }



    /**
     * Determine if the given quantity is valid based on a set of
     * conditions.
     * 
     * @param {*} quantity 
     */

    isQuantityValid = (quantity) =>
    {
        // convert string to integer
        let isInteger = /^[0-9]+$/ig;

        if (isInteger.test(quantity))
        {
            quantity = parseInt(quantity, 10);
            // check if it a number
            if (Number.isInteger(quantity))
            {
                if (quantity > 0 && quantity <= 100)
                return true;
            }
        }
        
        return false;
    }

    render()
    {

        const container = {
            border: "2px solid black",
            flex: "0 1 400px",
            width: "30em"
        };

        const selectedItem = {
            textAlign: "center",
        };

        const details = 
        {
            paddingLeft: "1.2em"
        }
        const buttonStyle = 
        {
            color: "black",
            border: "2px solid black",
            width: "8em",
            height: "4em",
            borderRadius: "5%",
            fontWeight: "bold",
            float: "right",
            marginBottom:"1em"
        };

        const checkoutButton =
        {
            backgroundcolor: "yellow",
        }

        const addToCartButton =
        {
            backgroundColor: "#D6FFB7",
            marginLeft: "1em",
            marginRight: "1em"
        }
        const labelStyle =
        {
            marginRight: "10px",
            fontSize: "1.2em",
            fontWeight: "bold"
        }

        const inputStyle =
        {
            fontSize: "1.2em",
        }
        const imgContainer =
        {
            width:"8em",
            backgroundColor: "#F9F4F1",
            height: "8em",
            border:"2px dotted black",
            margin: "auto"
        };
        
        let productName = null;
        let productLineTotal = null;
        let productImage = <div style={imgContainer} className="imgContainer-circle"> </div>; 
        let unitPrice = null;

        if (this.props.selectedItem)
        {
            productName = this.props.selectedItem.name;
            unitPrice = (this.props.selectedItem.price == null) ? formatToCurrency(0) : formatToCurrency(this.props.selectedItem.price)
            productLineTotal = formatToCurrency(this.state.lineTotal);
            productImage = <div style={imgContainer} className="imgContainer-circle"> <img src={this.props.selectedItem.imgurl} alt="selected product icon" /> </div>;
        }

        

        return(
            <div style={container} className="main-container-bg">
                <div>
                    <h1 style={selectedItem}>Selected Product</h1>
                    <div>
                        {productImage}
                        <div style={details}>
                            <h3>Product Name: {productName}</h3>
                            <h3>Unit Price: {unitPrice}</h3>
                            <label style={labelStyle} htmlFor="quantity">Quantity</label>

                            <input style={inputStyle} 
                                    id="quantity" placeholder="Enter quantity here" 
                                    onChange={this.updateItemQuantity}
                            ></input>

                            <h3>Line Total: {productLineTotal} </h3>
                        </div>
                    </div>

                    <CartContext.Consumer>
                        { context => (
                            <button 
                                style={Object.assign( {}, buttonStyle, addToCartButton)} 
                                className="clickable "
                                onClick={() => { 
                                                    let product = this.generateProductInvoice();
                                                    if (product)
                                                    {
                                                        //console.log("Sending to cart", product);
                                                        context.addToCart(product);
                                                    }
                                                }}> 
                                Add to Cart
                            </button>
                        )}
                    </CartContext.Consumer>
                    <Link to="/checkout"> 
                        <button style={Object.assign( {}, buttonStyle, checkoutButton)} className="clickable">
                            Proceed to Checkout
                        </button> 
                    </Link>
                    
                </div>
            </div>
        )
    }
}


export default ItemSummary
