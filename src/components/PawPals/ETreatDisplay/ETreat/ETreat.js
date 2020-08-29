import React from "react";
import {Spring} from 'react-spring/renderprops';

import './ETreat.css';


function ETreat(props)
{

    return (

        <Spring
            from={{opacity: 0, marginTop: -500}}
            to={{opacity: 1, marginTop: 0}}
        >
            {springProp => (
                <div className="etreat-container" style={Object.assign( {}, springProp)} >
                <div className="treat-header"> 
                    <p style={{float: "left"}}>{props.treat.sender}</p> 
                    <p style={{float: "right"}}>{props.treat.datereceived}</p>  
                </div>
    
                <div>
                    <p style={{textAlign: "left"}}> {props.treat.text}</p>
                </div>
            </div>
            )}
            
        </Spring>
    )
    
}

export default ETreat;