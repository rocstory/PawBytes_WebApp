import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Spring} from 'react-spring/renderprops';
import {animated} from 'react-spring';
import {get_pawpals_from_db, get_etreats_from_db} from '../../../pawbytesDB';

import "./PawPal.css";


function PawPal(props)
{
    const container_bg =
    {
        backgroundColor: props.pawpal.colortheme,
    }

    const imgContainer =
    {
        width: "5em",
        height:"5em",
        float: "left"
    }

    const nameStyle =
    {
        float: "left",
    }

    const details =
    {
        marginLeft: "1.2em",
        textTransform: "capitalize"
    }

    return (
        <div style={container_bg} 
            className="clickable hover-rsgold pawpal-container"
            onClick={()=> props.data.updateSelectedPawPal(props.pawpal)} >


            <div className="imgContainer-circle pawpal-img-container">
                <img src={props.pawpal.album[0]} alt="pawpal icon"/>
            </div>
            <div  className="pawpal-details">
                <p className="pawpal-name-style" >Name: {props.pawpal.name}</p> <br/>
                <p className="pawpal-name-style" >Tagname: {props.pawpal.tagname}</p>
            </div>
            
        </div>
    )
}

export default PawPal; 