import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Login from './containers/Login/Login';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends Component{
  state = {
    showBurgerPage : true
  }
  render(){
  return (
    <div>
      <Layout>
        {this.state.showBurgerPage && <BurgerBuilder/>}
      </Layout>
    </div>
  );
  }
}

export default App;
