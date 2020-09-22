import React, { Component } from 'react';
import loginImg from '../Login/login.svg';
import axios from '../../Backend/server';
import { Button } from 'react-bootstrap';
class Signup extends Component {
    state = {
        subject:'',
        text:'',
        email:'',
    }

    inputHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = () => {
        
    fetch('http://localhost:8080/feedback', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject:this.state.subject,
        email:this.state.email,
        text:this.state.text
      })
    })
    .then(response=> response.json(),()=>{
        console.log("Server received our data");
    })
    .catch(err => console.log(err));
        
    }


    render() {
        return (
            <div>
                
                    <input name="subject" type="text" id="subject" value={this.state.subject} onChange={(e)=>this.inputHandler(e)} placeholder="Subject"/><br />
                    <input name="email" type="text" id="email" value={this.state.email} onChange={(e)=>this.inputHandler(e)} placeholder="Email"/><br />
                    <textarea name="text" id="text" value={this.state.text} rows="10" cols="30" onChange={(e)=>this.inputHandler(e)} placeholder="Your generous feedback!"/><br />
                    <button onClick={this.handleSubmit}>SUBMIT</button>               
            </div>
        );
    }
}

export default Signup;