import React from "react";
import {CartContext} from "../../../CartContext";
import {formatToCurrency } from  "../../../utilities";
import {Link} from 'react-router-dom';

import './ItemSummary.css';

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
                
        let productName = null;
        let productLineTotal = null;
        let productImage = <div className="is-img-container imgContainer-circle"> </div>; 
        let unitPrice = null;

        if (this.props.selectedItem)
        {
            productName = this.props.selectedItem.name;
            unitPrice = (this.props.selectedItem.price == null) ? formatToCurrency(0) : formatToCurrency(this.props.selectedItem.price)
            productLineTotal = formatToCurrency(this.state.lineTotal);
            productImage = <div className="is-img-container imgContainer-circle"> <img src={this.props.selectedItem.imgurl} alt="selected product icon" /> </div>;
        }

        

        return(
            <div className="main-container-bg is-container">
                <div>
                    <h1 className="is-selected-item">Selected Product</h1>
                    <div>
                        {productImage}
                        <div className="is-details">
                            <h3>Product Name: {productName}</h3>
                            <h3>Unit Price: {unitPrice}</h3>
                            <label className="is-label" htmlFor="quantity">Quantity</label>

                            <input className="is-input" 
                                    id="quantity" placeholder="Enter quantity here" 
                                    onChange={this.updateItemQuantity}
                            ></input>

                            <h3>Line Total: {productLineTotal} </h3>
                        </div>
                    </div>

                    <CartContext.Consumer>
                        { context => (
                            <button 
                                className="is-button add-to-cart-button clickable" 
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
                        <button className="is-button clickable">
                            Proceed to Checkout
                        </button> 
                    </Link>
                    
                </div>
            </div>
        )
    }
}


export default ItemSummary
