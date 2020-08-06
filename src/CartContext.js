import React from 'react';

export const CartContext = React.createContext();

class CartProvider extends React.Component
{
    state = 
    {
        cartItems: new Map(),
        cartAmount: 0,
        balance: 0,
        customerid: null,
    }

    render() {
        return (
            <CartContext.Provider 
                value={{
                    cartItems: this.state.cartItems,
                    cartAmount: this.state.cartAmount,
                    balance: this.state.balance,
                    customerid: this.state.customerid,

                    addToCart: (item) => {
                        //capture the current state
                        let currentCartAmount = this.state.cartAmount;
                        let currentBalance = this.state.balance;
                        let currentCart = this.state.cartItems;

                        if (currentCart.has(item.productid))
                        {
                            let itemToUpdate = currentCart.get(item.productid);       // get this item's current data from the collection
                            

                            currentCartAmount -= itemToUpdate.quantity;         // subtract item's quantity from the total cart amount
                            currentBalance -= itemToUpdate.linetotal;           // subtract this item's line total from the balance
                            
                            item.quantity += itemToUpdate.quantity;             // Add the previous item's quantity to this item.
                            item.linetotal += itemToUpdate.linetotal;           // Add the previous line total to the item.

                        }

                        // update context
                        currentCart.set(item.productid, item);
                        currentCartAmount += item.quantity;
                        currentBalance += item.linetotal;

                        this.setState((prevState) => ({cartItems: currentCart, cartAmount: currentCartAmount, balance: currentBalance }));
                        
                    },

                    removeFromCart: (item) =>
                    {
                        let updatedBalance = this.state.balance;
                        let updatedCartAmount = this.state.cartAmount;
                        let currentCart = this.state.cartItems;

                        if (currentCart.has(item.productid))
                        {
                            let toBeRemoved = currentCart.get(item.productid); 
                            updatedBalance -= toBeRemoved.linetotal;
                            updatedCartAmount -= toBeRemoved.quantity;
                            currentCart.delete(item.productid);
                        }
                        
                        if (updatedBalance < 0)
                        {
                            updatedBalance = 0;
                        }

                        this.setState((prevState) => ({cartItems: currentCart, cartAmount: updatedCartAmount, balance: updatedBalance }));
                    },
                    clearItemsFromCart: () =>
                    {
                        this.setState((prevState) => ({cartItems: new Map(), cartAmount: 0, balance: 0}));
                    },
                    setCustomerID: (customerid) =>
                    {
                        this.setState((prevState) => ({customerid: customerid}));
                        
                    }
                }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
};

export default CartProvider;