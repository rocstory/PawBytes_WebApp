import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {fetchProductsFromDB } from  "../../../utilities";

import Item from './Item/Item';
import MenuCategory from './MenuCategory/MenuCategory';

import "./ItemSelecter.css";

class ItemSelecter extends React.Component
{

    constructor()
    {
        super();

        this.state =
        {
            sides: [],
            drinks: [],
            main: [],
            desserts: [],

            categoryItems: [],
            selectedItem: null
        }
    };

  
  populateCategories(categoriesCollection)
  {
    let sides = [];
    let drinks = [];
    let main = [];
    let desserts = [];
    
    categoriesCollection.forEach((products, category) => {
        switch (category)
        {
            case "sides":
                sides = products;
                break;
            case "drinks":
                drinks = products;
                break;
            case "main":
                main = products;
                break;
            case "desserts":
                desserts = products;
                break;
            default:
                break;
        }

    });

    this.setState((prevState) => ({ sides: sides , drinks: drinks, main: main, desserts: desserts}));
  };
  

  loadCategoryItems = (selectedCategory) =>
  {
      const data = selectedCategory.map(product =>{
          return (
              <Item key={product._id} prod={product} data={this.props.data} />
          )
      })

      this.setState({categoryItems: data})
  }

  async componentDidMount()
  {
      // fetch from the database
      let categories =  await fetchProductsFromDB();
      this.populateCategories(categories);
  };

  render()
  {
    return (
        <div className="sel-container main-container-bg">
            <ul className="sel-navbar">
                <li onClick={() => this.loadCategoryItems(this.state.sides)}  > <MenuCategory name="Sides" catType="side"/> </li>
                <li onClick={() => this.loadCategoryItems(this.state.drinks)} > <MenuCategory name="Drinks" catType="drink"/> </li>
                <li onClick={() => this.loadCategoryItems(this.state.main)}  > <MenuCategory name="Main" catType="meal"   /> </li>
                <li onClick={() => this.loadCategoryItems(this.state.desserts)} > <MenuCategory name="Desserts" catType="dessert" /> </li>
            </ul>

            <div className="category-item-container" >
                { (this.state.categoryItems.length === 0) ? renderPrompt() : renderItemDisplay(this.state.categoryItems)}
            </div>
            
        </div>
    )

  }; // render
  
};

export default ItemSelecter;

function renderItemDisplay(categoryItems)
{
    return (
        <ul className="sel-item-list" > {categoryItems} </ul>
    )
};

function renderPrompt()
{
    const faIcon = { fontSize: "10em"}

    return (
        <div className="sel-prompt-container"> 
            <FontAwesomeIcon style={faIcon} icon={["fas", "arrow-up"]} />
            <p style={{fontWeight: "bold", fontSize: "2em"}}> Select A Category Above</p> 
        </div>
    )
}

