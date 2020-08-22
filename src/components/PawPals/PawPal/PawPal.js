import React from "react";

import "./PawPal.css";


function PawPal(props)
{
    const container_bg =
    {
        backgroundColor: props.pawpal.colortheme,
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