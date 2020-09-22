import React, { Component } from 'react';
import LoginForm from './LoginForm';
import loginImg from "./login.svg";
import classes from './Login.module.css';
import { Link,useHistory } from 'react-router-dom';
import axios from '../../Backend/server';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';

class Login extends Component {
    state={
        loginCheck: false,
        username:'',
        password:'',
        verification:false
    }
    componentDidMount(){
        console.log(this.props);
        
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    matchDetails = async (userName,pass) => {
        return await axios.get('https://react-example-59018.firebaseio.com/users.json')
        .then(res => {
            for(let key in res.data){
                if(res.data[key].userName===userName){
                    if(res.data[key].pass===pass){
                        if(res.data[key].verified === true){
                            return 2;
                        }
                        else{
                            return 1;
                        }
                    }
                }
            }
            return 0;
        });
    }
    
    toHandler = async () => {
        const match= await this.matchDetails(this.state.username,this.state.password);
        console.log('after await match is :'+match);
        if(match === 2){
            this.setState({loginCheck:true});
        }
        if(match === 1){
            this.setState({verification:true});
        }
        if(this.state.loginCheck){
            this.props.history.push({pathname:'/home',hash:'success'});
        }else if(this.state.verification){
            this.props.history.push({pathname:'/email-verification',hash:'unverified'});
        }else{
            alert('please fill the corect details');
        }
    }
  render() {
    return (
        <div>
        <div className={classes.baseContainer} ref={this.props.containerRef}>
            <div className={classes.header}>Login</div>
            <div className={classes.content}>
                <div >
                    <img src={loginImg} className={classes.image}  />
                </div>
                <div className={classes.form}>
                    <div className={classes.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" onChange={(e)=>{this.inputHandler(e)}} value={this.state.username} placeholder="username" />
                    </div>
                    <div className={classes.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={(e)=>{this.inputHandler(e)}} value={this.state.password} placeholder="password" />
                    </div>
                </div>
            </div>

            <div className={classes.footer}>
                <button onClick={this.toHandler}>
                    Login
                </button>
            </div>
            <div className={classes.footer}>
                <Link to={{
                    pathname:"/Signup",
                    hash: '#signup'
                }}>
                    Signup
                </Link>
            </div>
        </div>
        
        </div>
    );
  }
}

export default Login;