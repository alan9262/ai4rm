import React, { Component } from 'react';
import './App.css';
import Login from '../src/components/Login.jsx';
import Navigation from '../src/components/Navigation.jsx';
import Analytics from '../src/components/Analytics';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      usernames: [], passwords: [],
      loggedIn: false,
      result: [],
      analytics: []
    };
  }

  toggleOpenFunction = () => {
    this.setState({
      loggedIn: false
    })
  }

  UNSAFE_componentWillUnmount(){
    this.setState({
      user: {},
      usernames: [], passwords: [],
      loggedIn: false,
      result: [],
      analytics: [],
      stackedProducts: {}
    })
}

  signIn(username, password) {
      Promise.all([
        fetch("/getData"),
        fetch("/getAnalytics"),
        fetch("/getStackedData")
      ]).then(allResponses => {
      this.setState({
            result: allResponses[0].json(),
            analytics: allResponses[1].json(),
            stackedProducts: allResponses[2].json()
      })
    });
    console.log(this.state.result);
  
    // fetch('/getData')
    //   .then(result => result.json())
    //   .then(result => this.setState({ result: result }))

    // fetch('/getAnalytics')
    //   .then(res => res.json())
    //   .then(res => this.setState({ analytics: res }))

    // fetch('/getStackedData')
    //   .then(response => response.json())
    //   .then(response => this.setState({ stackedProducts: response }))

    // this.state.result.map(row =>{
    //     this.state.usernames.push(row.username);
    //     this.state.passwords.push(row.password);
    // })
    
    if (this.state.usernames.includes(username) && this.state.usernames.includes(password)) {
      this.setState({
        user: {
          username,
          password,
        }, loggedIn: true
      })
    }
  }

  render() {
    const data = this.state.analytics;
    const headers = ["Cluster", "Gender", "Clicks", "Total Conversion", "Age", "Product Category 1", "Product Category 2", "Product Category 3"];

    return (
      <div>
        <Navigation isLoggedIn={this.state.loggedIn} />
        {
          (this.state.loggedIn) ?
            <div>
              <Analytics data={data} headers={headers} stackedProducts={this.state.stackedProducts}/>
            </div>
            :
            <Login onSignIn={this.signIn.bind(this)} />
        }
      </div>
    );
  }

}

export default App;
