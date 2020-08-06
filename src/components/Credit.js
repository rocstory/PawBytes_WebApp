import React from "react";
import "./Credit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function getLinks(links)
{
    const data = links.map(link =>
        {
            return (
                <Link key={link.srcType} srcLink={link.srcLink} srcType={link.srcType} />
            )
        })

        return data;
}


function Credit(props)
{

    let allLinks = getLinks(props.contactLinks);

    // this can be refactored
    return (
    <div className="credit-container">
        <div className="credit-img-container">
            <img src={props.imgSrc} alt="credit icon"/>
        </div>

        <div className="contact-info">
            <h1> {props.role} </h1>
            <h1> {props.name} </h1>
            
            <div className="contact-links">
                {allLinks}
            </div>
        </div>
    </div>
    );

}; // class

export default Credit;

class Link extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            isHovered: false,
            backgroundColor: "gold",
            iconStyle: "fas",
            faIcon: "lightbulb"
        }; 

    }

    componentDidMount()
    {
        this.setLinkStates()
    }

    setLinkStates =  () => 
    {

        let srcType = this.props.srcType;

        let style = "fas";
        let fa_icon = "lightbulb";
        let bgColor = "white";
        switch(srcType)
        {
            case "twitter":
                bgColor = "#00ACED"; 
                style = "fab";
                fa_icon = "twitter";
                break;
            case "instagram":
                bgColor = "#E1306C"; 
                style = "fab";
                fa_icon = "instagram";
                break;
            case "facebook":
                bgColor = "#4267B2"; 
                style = "fab";
                fa_icon = "facebook";
                break;
            case "github":
                bgColor = "#6cc644"; 
                style = "fab";
                fa_icon = "github";
                break;
            case "youtube":
                bgColor = "#ff0000"; 
                style = "fab";
                fa_icon = "youtube";
                break; 
            case "tumblr":
                bgColor = "#35465c";
                style = "fab";
                fa_icon = "tumblr";
                break;
            case "linkedin":
                bgColor = "#007bb5";
                style="fab";
                fa_icon = "linkedin";
                break;
            default:
                bgColor = "gold"; 
                style = "fas";
                fa_icon = "lightbulb";
                break;
        }
        
        this.setState( () => 
            { return {
                backgroundColor: bgColor,
                iconStyle: style,
                faIcon: fa_icon
            }})
        
        return [style, fa_icon];
    }

    toggleHover = () =>
    {
        this.setState( prevState => { return {isHovered: !prevState.isHovered }})
        
    }

    render()
    {
        let genIcon = [this.state.iconStyle, this.state.faIcon]; 
        let linkStyle;

        if (this.state.isHovered)
        {
            linkStyle = {backgroundColor: this.state.backgroundColor};
        }
        else
        {
            linkStyle = {backgroundColor: "white"};
        }
        
        return (
            <a href={this.props.srcLink} target="_blank" rel="noopener noreferrer">
                <div style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} className="link-container">
                    <FontAwesomeIcon icon={genIcon} /> 
                </div>
            </a>
        )
    }
};