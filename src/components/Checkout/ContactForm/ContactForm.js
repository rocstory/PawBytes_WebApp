import React from "react";
import {CartContext} from "../../../CartContext";
import {get_customer_from_db, set_customer_into_db} from "../../../pawbytesDB";
import "./ContactForm.css";

class ContactForm extends React.Component
{
    constructor() {
        super();
        
        this.state = {
            firstname: '',
            lastname: '',
            email:'',
            phonenumber:'362-555-0100',
            street: '182 Crystal Cove',
            city: 'Birdwell',
            state: 'CT',
            zipcode: '06520',
            customer: null,
        }
    }

    static contextType = CartContext;

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    confirmCustomer =  async (event) => {
        event.preventDefault();
        let re = /[a-zA-Z0-9]+/
        let validName = RegExp(re);


        if (!validName.test(this.state.firstname))
        {
            return;
        }

        if (!this.props.customerid) // if the customer does not exist 
        {
            let gen_email = this.state.firstname + this.state.lastname.charAt(0) + "@pawpals.com"; // generate email
            // create the customer
            let newCustomer = {
                name:  { firstname: this.state.firstname, lastname: this.state.lastname},
                contactInformation: { email: gen_email, phonenumber: this.state.phonenumber},
                address: {street: this.state.street, city: this.state.city, state: this.state.state, zipcode: this.state.zipcode}
            }

            let customerid = await set_customer_into_db(newCustomer);
            this.context.setCustomerID(customerid); // save id
            this.props.setCustomerID(customerid);
        }
    }

    async componentDidMount() {
        if (this.props.customerid) // if the customer exists..
        {
            const customer = await get_customer_from_db(this.props.customerid);
            
            
            this.setState((prevState) => {
                return {
                    firstname: customer.name.firstname,
                    lastname: customer.name.lastname,
                }
            });
        };
    };
    
    render()
    {
        return (
            <div className="contact-form-container">
                <h2>Register</h2>
                <p>Please fill out this form to proceed with your order.</p>
                <hr/>
                <form>
                    <label htmlFor="firstname">First Name</label> <br/>
                    <input name="firstname" onChange={this.handleChange}></input>
                    <br/>
                    <label htmlFor="lastname">Last Name</label> <br/>
                    <input name="lastname" onChange={this.handleChange}></input>
                    <br/>
                    <p>Other fields are ommitted to avoid users from inputting sensitive information</p>
                </form>
                <div className="button-ctrl">
                    <button
                        onClick={this.confirmCustomer}
                        className='input-button clickable'
                    >Confirm</button>
                </div>
            </div>
        )
    } // render
};

export default ContactForm;