import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MenuCategory.css';


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
        return (
            <div 
                onMouseEnter={this.toggleHover} 
                onMouseLeave={this.toggleHover} 
                className="mc-container clickable hover-rsgold"
                
                >
                <div> <FontAwesomeIcon icon={[this.state.style, this.state.faIcon]} /> </div>
                <p >{this.props.name}</p> 
            </div>        
        )
    }
};

export default MenuCategory;