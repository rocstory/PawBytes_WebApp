import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Spring} from 'react-spring/renderprops';
import {get_pawpals_from_db} from '../../pawbytesDB';

import "./PawPals.css";

import PawPal from './PawPal/PawPal';
import ETreatDisplay from './ETreatDisplay/ETreatDisplay';


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
                    <div className="pawpal-menu" style={Object.assign( {},props)}>
                                        
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

export default PawPals;

