import React from 'react';
import {ProductContext} from "../../ProductContext";
import {formatToCurrency, fetchProductsFromDB } from  "../../utilities";
import {Spring} from 'react-spring/renderprops';


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


function Category(props)
{
    const container = {
        border: "2px solid black",
        backgroundColor: "whitesmoke",
        flex: "0 1 600px",
        margin: "5px"
        //width: "40em",
        //marginBottom: "1.2em"
    }



    const title = 
    {
        textAlign: "center",
        textDecoration: "none",
        textTransform: "capitalize",
        borderBottom: "2px dashed black"
    }

    const productContainer =
    {
        border: "0px solid red", 
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around"
    }
    

    const items = props.products.map(product => {
        return ( <MenuItem key={product._id} product={product}/> )
    })

    return (
        <div style={container}>
            <h1 style={title}>{props.name}</h1>
            <div style={productContainer}>
                {items}
            </div>
        </div>
    )
}; 

function MenuItem(props)
{
    const container =
    {
        border: "0px solid black",
        background: "white",
        width: "100%",
        height: "5em",
        overflow: "hidden",
        padding: "0.5em",
        display: "flex"
    }
    
    const details =
    {
        marginLeft: "1em",
        width: "80%"
    }

    const imgContainer =
    {
        border: "2px solid black",
        width: "4em",
        height: "4em",
    }

    const label =
    {
        display: "inline-block",
        textAlign: "center",
        textTransform: "capitalize"
    }

    const name =
    {
        float: "left",
    }

    const price =
    {
        float: "right",
    }

    return (
        <div style={container} >

            <div style={imgContainer} className="imgContainer-circle">
                <img src={props.product.imgurl} alt="product icon"/>
            </div>

            <div style={details}>
                <h3 style={Object.assign({}, label, name )} >{ props.product.name}  </h3>
                <h3 style={Object.assign({},label, price ) } >{formatToCurrency(props.product.price)} </h3>
            </div>
            
        </div>
    )
}
