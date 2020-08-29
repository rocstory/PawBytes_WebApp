import React from 'react';
import Cart from "../Cart/Cart";
import "./Nav.css";
import {Link} from 'react-router-dom';

function Nav(props)
{
        
    return (
        <nav className="">
            <Link to="/" > <h3 className="title nav-title" >Paw Bytes</h3> </Link>
            <ul className="nav-fonts" id="nav-links">
                <Link to="/"> <li>Home</li> </Link>
                <Link to="/menu" > <li>Menu</li> </Link>
                <Link to="/order" > <li>Order</li> </Link>
                <Link to="/pawpals" > <li>Paw Pals</li> </Link>
            </ul>
            <Link to="/checkout"> <div><Cart/></div>  </Link>
        </nav>
    )
} 

export default Nav; 