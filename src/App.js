import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main';
import Login from './components/Login';
import UserPage from './components/UserPage'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* <Login onSignIn={this.signIn.bind(this)} logout={this.logout.bind(this)} /> */}
        <Main/>
      </div>
    );
  }
}

export default App;
