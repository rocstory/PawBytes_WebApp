
import React from "react";
import {animated} from 'react-spring';
import {get_etreats_from_db} from '../../../pawbytesDB';

import "./ETreatDisplay.css";
import ETreat from "./ETreat/ETreat";

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

            clearButton = <button onClick={() => {this.props.clearSelectedPawPal()}} 
                            className="clickable hover-rsgold e-button-style">Clear</button>
        }

        return (
            <div className="edisplay-container">
                <animated.div>
                    <div> 
                        {
                            this.props.pawpal 
                                ? <div className="eheader">
                                    <div className="e-img-container imgContainer-circle">
                                        {imgTag}
                                    </div>
                                    <div className="eheader-details" >
                                        <h3>Paw Pal: {name}</h3>
                                        <p>Tagname:  {tagName}</p>
                                            {clearButton}
                                    </div>
                                </div>
                                : <div className="eheader"><p> Hello! Please select a Paw Pal to see their E-Treat!</p> </div>
                        }
                    </div>
                </animated.div>
                

                <div className="ebody">
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

export default ETreatDisplay