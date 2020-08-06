import React from "react";
import introData from "../fixtures/introduction_data.json";

function Introduction(props)
{
    const container = 
    {
        border: "1px solid black",
        backgroundColor: "#363537", //"#8B4513",
        width: "40em",
        height: "20em",
        overflow: "hidden"
    }

    const textContainer =
    {
        height: "11.8em",
        backgroundColor: "#F0F8FF",//"#F5DEB3",
        padding: "1.2em"
    }

    const paragraphStyle =
    {
        fontFamily: "times",
    }

    const imgContainer =
    {
        width: "7em",
        height: "7em",
        margin: "auto"
    }

    return(
        <div style={container} >

        <div style={imgContainer} className="imgContainer-circle">
          <img style={{ objectFit: "cover", width: "100%", height: "100%" }} 
                src={ "https://pawbytes.s3.amazonaws.com/misty4.JPG"} alt="pawpal icon" />
        </div>

        <div style={textContainer} className="ixntro-text-container center">
            <h3 style={{textDecoration: "underline"}} >About Us</h3>
            <p style={paragraphStyle}>{introData.description}</p>
        </div>
      </div>
    )
}

export default Introduction;