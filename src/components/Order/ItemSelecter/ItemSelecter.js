import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {formatToCurrency, fetchProductsFromDB } from  "../utilities";
import {Spring} from 'react-spring/renderprops';


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

    const container = 
    {
        border: "2px solid black",
        flex: "0 1 1 150px",
    };

    const navbar = 
    {
        width: "32em",
        listStyle: "none",
        padding: "0",
        marginLeft: "1px",
        overflow: "auto",
        whiteSpace: "nowrap",

        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap"
    };
    const category_item_container = {
        height: "21.5em",
        overflowY: "auto",
        overflowX: "hidden",
        borderTop: "2px dotted black",
    }

    return (
        <div style={container} className="main-container-bg">
            <ul style={navbar}>
                <li onClick={() => this.loadCategoryItems(this.state.sides)}  > <MenuCategory name="Sides" catType="side"/> </li>
                <li onClick={() => this.loadCategoryItems(this.state.drinks)} > <MenuCategory name="Drinks" catType="drink"/> </li>
                <li onClick={() => this.loadCategoryItems(this.state.main)}  > <MenuCategory name="Main" catType="meal"   /> </li>
                <li onClick={() => this.loadCategoryItems(this.state.desserts)} > <MenuCategory name="Desserts" catType="dessert" /> </li>
            </ul>

            <div style={category_item_container}>
                { (this.state.categoryItems.length === 0) ? renderPrompt() : renderItemDisplay(this.state.categoryItems)}
            </div>
            
        </div>
    )

  }; // render
  
};

export default ItemSelecter;

function renderItemDisplay(categoryItems)
{
    const item_list = 
    {
        listStyle: "none",
        padding: "0",
        margin: "0"
    }

    return (
        <ul style={item_list}> {categoryItems} </ul>
    )
};



function renderPrompt()
{
     
    const container =
    {
        backgroundColor: "white",
        height: "99%",
        placeItems: "center",
        textAlign: "center"
    }

    const faIcon =
    {
        fontSize: "10em",
    }

    return (
        <div style={container}> 
            <FontAwesomeIcon style={faIcon} icon={["fas", "arrow-up"]} />
            <p style={{fontWeight: "bold", fontSize: "2em"}}> Select A Category Above</p> 
        </div>
)
}


class MenuCategory extends React.Component
{
    constructor()
    {
        super();

        this.state =
        {
            style: "fas",
            faIcon: "lightbulb",
            isHovered: false,
            backgroundColor: "gold",
            cursor: "pointer"
        };
    }

    initializeCategoryIcon = () =>
    {
        let category_type = this.props.catType;
        let icon = "";
        switch (category_type.toLowerCase())
        {
            case "side":
                icon ="hotdog";
                break;
            case "dessert":
                icon ="ice-cream";
                break;
            case "meal":
                icon ="hamburger";
                break;
            case "drink":
                icon = "mug-hot";
                break;
            default:
                icon ="lightbulb";
                break;
        };
        this.setState( () => 
        {
            return {
                faIcon: icon
            }
        });

    }; // initializeCategoryIcon

    componentDidMount()
    {
        this.initializeCategoryIcon();
    };
    
    render() 
    {
        
        const containerStyle =
        {
            backgroundColor: "white",
            border: "2px solid black",
            width: "6em",
            height: "4em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden"
        }

        const childStyle =
        {
            textAlign: "center",
            margin: "0",
            fontSize: "1.4em"
        }
        
        
        return (
            <div style={Object.assign( {}, containerStyle)} 
                onMouseEnter={this.toggleHover} 
                onMouseLeave={this.toggleHover} 
                className="clickable hover-rsgold"
                
                >
                <div style={childStyle} > <FontAwesomeIcon icon={[this.state.style, this.state.faIcon]} /> </div>
                <p style={childStyle} >{this.props.name}</p> 
            </div>        
        )
    }
};

function Item(props)
{
    const container =
    {
        borderBottom: "1px dotted black",
        background: "white",
        width: "100%",
        height: "5em",
        overflowY: "auto",
        padding: "0.5em",
        display: "flex"
    }
    
    const details =
    {
        marginLeft: "1em",
        width: "70%"
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
        <Spring
            from={{opacity: 0, marginTop: -500}}
            to={{opacity: 1, marginTop: 0}}
        >
            {sprops => (
                   <div style={Object.assign({}, container, sprops )}
                   className="hover-rsgold clickable"
                   onClick={()=> props.data.updateSelectedItem(props.prod)} >
                      <div style={imgContainer} className="imgContainer-circle">
                          <img src={props.prod.imgurl} alt="product icon"/>
                      </div>
      
                      <div style={details}>
                          <h3 style={Object.assign({}, label, name )} >{ props.prod.name.substring(0,25)}  </h3>
                          <h3 style={Object.assign({}, label, price ) } >{formatToCurrency(props.prod.price)} </h3>
                      </div>
                      
                  </div> 
                )}
        </Spring>
    )
};
