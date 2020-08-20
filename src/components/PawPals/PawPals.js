import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Spring} from 'react-spring/renderprops';
import {animated} from 'react-spring';
import {get_pawpals_from_db, get_etreats_from_db} from '../../pawbytesDB';

import "./PawPals.css";

import PawPal from './PawPal/PawPal';


class PawPals extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            searchValue: '',
            selectedPawPal: null,
            pawpals: [],
        }
    }

    getSelectedPawPal = (pawpal) =>
    {
        this.setState({selectedPawPal: pawpal});
    }
    clearSelectedPawPal = (pawpal) =>
    {
        this.setState({selectedPawPal: null})
    }

    updateSearch = (event) =>
    {
        this.setState({searchValue: event.target.value}); 
    }

    getPawPals = async () =>
    {
        const pawpals_data = await get_pawpals_from_db();
        return pawpals_data;
    };

    async componentDidMount()
    {
        const pawpalsData = await this.getPawPals();
        this.setState((prevState) => ({pawpals: pawpalsData }));
    }

    render()
    {
        // for the paw pal search bar
        const pawpal_data = this.state.pawpals.filter( 
            (pawpal) => {

                return pawpal.name.toLowerCase().indexOf(this.state.searchValue) !== -1;
            }
        );   

        return(

            <Spring
                from={{opacity: 0, marginTop: -500}}
                to={{opacity: 1, marginTop: 0}}
            >
                {props => (
                    <div className="pawpal-container" style={Object.assign( {},props)}>
                                        
                    <div className="paw-container">
                        <form className="paw-form-container">
                            <label className="paw-input-label" htmlFor="pawname">
                                <FontAwesomeIcon icon={['fas', 'search']}/>
                            </label>
                            <input  className="paw-search-input" 
                                    id="pawname"
                                    name="pawname" 
                                    placeholder="Search Paw Pals"
                                    value={this.state.searchValue}
                                    onChange={this.updateSearch} />
                        </form>
                        
                        <ul className="paw-list">
                            {
                                pawpal_data.map((pawpal) => {
                                    return <PawPal key={pawpal._id} pawpal={pawpal}
                                            data={{ selectedPawPal: this.state.selectedPawPal,
                                                    updateSelectedPawPal: this.getSelectedPawPal}} />
                                })
                            }
                        </ul> 
                    </div>
                        <ETreatDisplay pawpal={this.state.selectedPawPal} clearSelectedPawPal={this.clearSelectedPawPal} />
                    </div>
                )}
            </Spring>
        )
    }
};


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

function ETreat(props)
{

    const container =
    {
        borderBottom: "1px dotted black",
        background: "white",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        padding: "0em 2em",
        
    }

    const header =
    {
        display: "inline-block",
    }

    const body =
    {

    }

    return (

        <Spring
            from={{opacity: 0, marginTop: -500}}
            to={{opacity: 1, marginTop: 0}}
        >
            {springProp => (
                <div style={Object.assign( {}, container, springProp)} >
                <div style={header}> 
                    <p style={{float: "left"}}>{props.treat.sender}</p> 
                    <p style={{float: "right"}}>{props.treat.datereceived}</p>  
                </div>
    
                <div style={body}>
                    <p style={{textAlign: "left"}}> {props.treat.text}</p>
                </div>
            </div>
            )}
            
        </Spring>
    )
    
}

export default PawPals;

