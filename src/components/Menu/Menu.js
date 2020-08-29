import React from 'react';
import {ProductContext} from "../../ProductContext";
import {fetchProductsFromDB } from  "../../utilities";
import {Spring} from 'react-spring/renderprops';
import Category from './Category/Category';

class Menu extends React.Component
{
    static contextType = ProductContext; 

    constructor()
    {
        super();
        this.state = {
            categoryCollection: new Map()
        }
    }
    
    /**
     * Generate categories provided by the database
     */
     getCategoryComponents = () =>
     {
        
        const categoryArray = Array.from(this.state.categoryCollection.keys());
        
        const data = categoryArray.map(category => {
            // get the array associated with this category
            let products = this.state.categoryCollection.get(category);
            return (
                <Category key={category} name={category} products={products} />
            )
        });
        return data;
     }

    async componentDidMount()
    {
        let categories = await fetchProductsFromDB();
        this.setState((prevState) => 
            ({ categoryCollection: categories}));
    }

    render()
    {
        const categories = this.getCategoryComponents();

        const container =
        {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
        }
        

        return (

            <Spring
                from={{opacity: 0, marginTop: -500}}
                to={{opacity: 1, marginTop: 0}}
            >
                {props => (
                    <div style={Object.assign( {}, container, props)} >
                        {categories}               
                    </div>
                )}
          
            </Spring>
        )
    };
};

export default Menu;
