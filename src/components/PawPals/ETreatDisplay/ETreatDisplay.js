
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Spring} from 'react-spring/renderprops';
import {animated} from 'react-spring';
import {get_pawpals_from_db, get_etreats_from_db} from '../../pawbytesDB';

import "./ETreatDisplay.css";

class ETreatDisplay extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            etreats: []
        }

    }

    async componentDidMount()
    {
        const etreats = await get_etreats_from_db();
        

        this.setState((prevState) => ({etreats: etreats}));
    }
    
    render()
    {
        const container =
        {
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            overflow: "hidden"
        }

        const header =
        {
            borderBottom: "2px solid black",
            backgroundColor: "white",
            display: "flex", 
            flexDirection: "row",
            justifyContent: "center",
        }
        const headerDetails =
        {

            fontSize: "1em",
            textDecoration: "capitalize",
            marginLeft: "1em",
        }

        const body =
        {
            height: "33.3em",
            overflowY: "auto",

        }

        const imgContainer =
        {
            border: "2px solid black",
            width: "7em",
            height:"7em",
        }
        
        const buttonStyle =
        {
            width: "4.5em",
            height: "2em",
            float: "right",
        }

        let treats_data = this.state.etreats;

        let name = null;
        let tagName = null;
        let imgTag = null;
        let clearButton = null;
        if (this.props.pawpal)
        {
            imgTag = <img src={this.props.pawpal.album[0]} alt="pawpal icon"/>
            tagName = this.props.pawpal.tagname;
            name = this.props.pawpal.name;

            treats_data = this.state.etreats.filter(
                (treat) => {
                    return treat.palsmentioned.includes(this.props.pawpal._id)
                }
            );

            clearButton = <button style={buttonStyle}
                                onClick={() => {this.props.clearSelectedPawPal()}} className="clickable hover-rsgold">Clear</button>
        }

        return (
            <div style={container}>
                <animated.div>
                    <div style={Object.assign( {})} > 
                        {
                            this.props.pawpal 
                                ? <div style={header}>
                                    <div style={Object.assign( {}, imgContainer)} className="imgContainer-circle">
                                        {imgTag}
                                    </div>
                                    <div style={Object.assign( {}, headerDetails)} >
                                        <h3>Paw Pal: {name}</h3>
                                        <p>Tagname:  {tagName}</p>
                                            {clearButton}
                                    </div>
                                </div>
                                : <div style={header}><p> Hello! Please select a Paw Pal to see their E-Treat!</p> </div>
                        }
                    </div>
                </animated.div>
                

                <div style={body}>
                    {
                        treats_data.map((treat) => {
                            return <ETreat key={treat._id} treat={treat}/>
                        })
                    }
                </div>
                
            </div>
        )
    };


}