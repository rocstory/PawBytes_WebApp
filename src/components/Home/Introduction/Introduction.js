import React from "react";
import "./Introduction.css";
//import introData from "../fixtures/introduction_data.json";

function Introduction(props)
{

    return(
        <div className="intro-container">

        <div className="imgContainer-circle intro-img-container">
          <img style={{ objectFit: "cover", width: "100%", height: "100%" }} 
                src={ "https://pawbytes.s3.amazonaws.com/misty4.JPG"} alt="pawpal icon" />
        </div>

        <div className="intro-text-container">
            <h3>About Us</h3>
            <p>
                Paw Bytes is a popular restaurant, home to many software engineers! Customers from all over come to 
                enjoy many delicious entries as well as the company of our wonderful Paw Pals and Paw Associates. 
                Customers are welcome to purchase any item off our menu and stay in the restaurant for a flat rate of $1.00!
            </p>
        </div>
      </div>
    )
}

export default Introduction;