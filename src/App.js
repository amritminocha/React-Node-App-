import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Login from './containers/Login/Login';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Signup from './containers/Signup/Signup';
import FeedBack from './containers/FeedBack/FeedBack';
import Verify from './components/verify'

import { BrowserRouter,Route } from 'react-router-dom';

class App extends Component{
  state = {
    show : false
  }

  componentDidMount(){
    console.log(this.props);
  }

  render(){
    const a = <Login data={this.state.loginCheck} />
    const b=a.props.data;
    console.log("b----"+b);
  return (
    <BrowserRouter>
    <div>
      <Layout>
        <Route path="/" exact component={Login} />
        <Route path="/Signup" exact component={Signup} />
        <Route path="/home" exact component={BurgerBuilder} />
        <Route path="/feedback" exact component={FeedBack} />
        <Route exact path="/send"><h1>Please go to your inbox to verify email</h1></Route> 
        <Route exact path="/verify/:email/:id" component={Verify} / >
        <Route exact path="/email-verification"><h1 Please firstly verify your email which has already been sent to your inbox /></Route>
        {this.state.show ? <BurgerBuilder/>:null}
      </Layout>
    </div>
    </BrowserRouter>
  );
  }
}

export default App;
