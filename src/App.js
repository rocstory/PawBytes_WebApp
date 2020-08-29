import React from 'react';
import './utilities.css';
import './App.css';
import CartProvider from './CartContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Credit from "./components/Credit/Credit";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Order from "./components/Order/Order";
import Checkout from "./components/Checkout/Checkout";
import PawPals from "./components/PawPals/PawPals";

import {get_credits_from_db} from './pawbytesDB';


class App extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      credits: null,
    }
  }

  async componentDidMount()
  {
    const credits_data = await get_credits_from_db();

    const credits = credits_data.map((credit) => {
      return (
        <Credit key={credit._id} 
                imgSrc={credit.imgSrc} 
                role={credit.role} 
                name={credit.name} 
                contactLinks={credit.contactLinks} />
      )
    });

    this.setState((prevState) => ({credits: credits }));
  }

  render()
  {
    return (
      <Router>
        <div className="App">
            <CartProvider>
              <Nav/>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Menu" component={Menu} />
                <Route path="/Order" component={Order} />
                <Route path="/Checkout" component={Checkout} />
                <Route path="/PawPals" component={PawPals} />
              </Switch>
            </CartProvider>
            <footer>
              <div>
                <h1>Special Thanks</h1>
                <p>I want to give a big thanks to everyone who submitted photos of their pets!</p>
              </div>

              <div className="credits-container">
                <h1>Credits</h1>

                <div className="credits">
                  { this.state.credits}
                </div>
              </div>
            </footer>
        </div>
      </Router>
    )
  }
};

export default App;

