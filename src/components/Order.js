import React from "react";
import ItemSelecter from "./ItemSelecter";
import ItemSummary from "./ItemSummary";
import {Spring} from 'react-spring/renderprops';


class Order extends React.Component
{
  constructor()
  {
    super();

    this.state =
    {
      selectedItem: null
    }
  };

  // add event listener

  getSelectedItem = (item) =>
  {
    this.setState({selectedItem: item});
  };

  render() {

    const container =
    {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }
    
    return (
      <Spring
        from={{opacity: 0, marginTop: -500}}
        to={{opacity: 1, marginTop: 0}}
      >
        {props => (
          <div style={Object.assign( {}, container, props)} >
            <ItemSelecter
            data={ {selectedItem: this.state.selectedItem, 
                    updateSelectedItem: this.getSelectedItem }}
          />

            <ItemSummary  selectedItem={this.state.selectedItem}/>

          </div>
        )}
          
        </Spring>
        
    )
  }
};

export default Order;