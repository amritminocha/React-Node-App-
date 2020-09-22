import React, { Component } from 'react';
import loginImg from '../Login/login.svg';
import classes from './Signup.module.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import axios from '../../Backend/server';
class Signup extends Component {
    state = {
        name: '',
        email: '',
        pass: '',
        confirm_pass: '',
        email_error: '',
        name_error: '',
        pass_error: '',
        error: ''
    }

    inputHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        var a1 = 'aaa@.';
        var a2 = 'aaa@.';
        console.log(String(true));
        console.log(a1 === a2);
        axios.get('https://react-example-59018.firebaseio.com/users.json')
            .then(res => {
                console.log(res.data);
                for (let key in res.data) {
                    console.log(typeof(res.data[key].verified))
                    console.log(`https://react-example-59018.firebaseio.com/users/${key}/verified}`);
                }
            });
    }

    doesnotExist = async (email) => {

        let flag = 0;

        return await axios.get('https://react-example-59018.firebaseio.com/users.json')
            .then(res => {
                console.log(res.data);
                for (let key in res.data) {
                    if (email === res.data[key].email) {
                        console.log('in theree to make 1', email);
                        flag = 1;
                    }
                }
                console.log(flag);
                return flag;
            });

    }




    doesnotExistName = async (name) => {
        let flagg = 0;
        console.log('username check');
        return await axios.get('https://react-example-59018.firebaseio.com/users.json')
            .then(res => {
                console.log(res.data);
                for (let key in res.data) {
                    if (name === res.data[key].userName) {
                        console.log('in theree to make 1', name);
                        flagg = 1;
                    }
                }
                console.log(flagg);
                return flagg;
            });
    }

    checkSanctity = async (email, userName, pass, confirm_pass) => {
        console.log()
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log(await this.doesnotExist(this.state.email));
        if (email !== '' && userName !== '' && pass !== '' && confirm_pass !== '') {
            this.setState({ error: '' });
            console.log('all details error passed');

            if (await this.doesnotExist(this.state.email) === 0) {
                console.log('doesnot exist email passed');
                this.setState({ email_error: '' });

                if (await this.doesnotExistName(this.state.name) === 0) {
                    this.setState({ name_error: '' });
                    console.log('doesnot exist username passed');

                    if (this.state.pass == this.state.confirm_pass) {
                        this.setState({ pass_error: '' });
                        console.log('password==cpass matched passed');

                        if (reg.test(email)) {
                            this.setState({ email_error: '' });
                            console.log('email format passed');
                            return true;
                        } else {
                            this.setState({ email_error: 'check your email format' });
                            console.log('email format failed');
                        }
                    } else {
                        this.setState({ pass_error: 'Password does not match with ConfirmPassword' });
                        console.log('password==cpass matched failed');
                    }
                } else {
                    this.setState({ name_error: 'username already exist' });
                    console.log('doesnot exist username failed');
                }
            } else {
                this.setState({ email_error: 'email already exist' });
                console.log('doesnot exist email failed');
            }
        } else {
            this.setState({ error: 'please complete the details' });
            console.log('all details error failed');
        }
    };


    dataHandler = async () => {

        const check = await this.checkSanctity(this.state.email, this.state.name, this.state.pass, this.state.confirm_pass);
        console.log('check value issss:',check);
        if (check) {
            fetch('http://localhost:3001/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    userName:this.state.name,
                    password:this.state.pass 
                })
            })
                .then(response => response.json(), () => {
                    console.log("Server received our data");
                })
                .catch(err => console.log(err));

            this.props.history.push({ pathname: '/send' });
            //     console.log("checked");
            //     const userDetails = {
            //         email: this.state.email,
            //         userName: this.state.name,
            //         pass: this.state.pass
            //     }
            //     axios.post('./users.json', userDetails)
            //         .then(res => {
            //             console.log("recieved - " + res);
            //         })
            //         .catch(error => {
            //             console.log(error);
            //         });
            //     alert('Thanks:/');

        }

    }
    render() {
        return (
            <div>
                <div className={classes.baseContainer} ref={this.props.containerRef}>
                    <div className={classes.header}>Signup</div>
                    <div className={classes.content}>
                        <div >
                            <img src={loginImg} className={classes.image} />
                        </div>
                        <div className={classes.form}>
                            <div className={classes.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    placeholder="email"
                                    onChange={(e) => { this.inputHandler(e) }} />
                                <div style={{
                                    color: "red",
                                    fontSize: 12
                                }}>{this.state.email_error}</div>
                            </div>
                            <div className={classes.formGroup}>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    placeholder="username"
                                    onChange={(e) => { this.inputHandler(e) }} />
                                <div style={{
                                    color: "red",
                                    fontSize: 12
                                }}>{this.state.name_error}</div>
                            </div>
                            <div className={classes.formGroup}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="pass"
                                    value={this.state.pass}
                                    onChange={(e) => { this.inputHandler(e) }}
                                    placeholder="password" />
                                <div style={{
                                    color: "red",
                                    fontSize: 12
                                }}>{this.state.pass_error}</div>
                            </div>
                            <div className={classes.formGroup}>
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirm_pass"
                                    value={this.state.confirm_pass}
                                    onChange={(e) => { this.inputHandler(e) }} placeholder="password" />
                            </div>
                        </div>
                        <div style={{
                            color: "red",
                            fontSize: 12,
                        }}>{this.state.error}
                        </div>
                    </div>

                    <div className={classes.footer}>
                        <button
                            type="button"
                            className={classes.btn}
                            onClick={this.dataHandler}>
                            Signup
                </button>
                    </div>
                    <div className={classes.footer}>
                        <Link to={{
                            pathname: "/"
                        }}>
                            Login
                </Link>
                    </div>
                </div>

            </div>
        );
    }
}

export default Signup;