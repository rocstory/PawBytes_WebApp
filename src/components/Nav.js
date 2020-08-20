import React from 'react';
import Cart from "./Cart/Cart";
import "./Nav.css";
import {Link} from 'react-router-dom';

function Nav(props)
{
    const navFonts =
    {
        fontSize: "1.2em",
        fontWeight: "bold"
    }
    const linkStyle = 
    {
        color: "white",
        textDecoration: "none"
    }

    const title =
    {
        fontSize: "1.5em"
    }
    
    return (
        <nav className="">
            <Link style={linkStyle} to="/" > <h3 style={title} className="title" >Paw Bytes</h3> </Link>
            <ul style={navFonts} id="nav-links">
                <Link style={linkStyle} to="/"> <li>Home</li> </Link>
                <Link style={linkStyle} to="/menu" > <li>Menu</li> </Link>
                <Link style={linkStyle} to="/order" > <li>Order</li> </Link>
                <Link style={linkStyle} to="/pawpals" > <li>Paw Pals</li> </Link>
            </ul>
            <Link to="/checkout"> <div><Cart/></div>  </Link>
        </nav>
    )
} 

export default Nav; 