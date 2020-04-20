import React, { Component, useState } from 'react';
import './App.css';
import Login from '../src/components/Login.jsx';
import Navigation from '../src/components/Navigation.jsx';
import Analytics from '../src/components/Analytics';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from 'react-bootstrap';
import Tabular from '../src/components/Tabular.jsx';
import Cookies from 'universal-cookie';

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
    localStorage.setItem('loggedIn', false);
    this.state = {
      user: {},
      usernames: [], passwords: [],
      loggedIn: localStorage.getItem('loggedIn'),
      result: [],
      analytics: []
    };
  }

  // UNSAFE_componentWillUnmount() {
  //   this.setState({
  //     user: {},
  //     usernames: [], passwords: [],
  //     loggedIn: false,
  //     result: [],
  //     analytics: [],
  //     stackedProducts: {},
  //     feature: []
  //   })
  // }

  tabClick = (e) =>{
      console.log(e.target.value);
  }

  // componentDidMount() {
  //   fetch('/getStackedData')
  //     .then(response => response.json())
  //     .then(response => this.setState({ stackedProducts: response }))
  // }

  signIn(username, password) {
    const cookies = new Cookies();
    Promise.all([
      fetch("/getData"),
      fetch("/getAnalytics"),
      fetch("/getProducts"),
      fetch("/getFeature")
    ])
      .then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]))
      .then(([data1, data2, data3, data4]) => this.setState({
        result: data1,
        analytics: data2,
        stackedProducts: data3[0],
        feature: data4
      }));

    // fetch('/getData')
    //   .then(result => result.json())
    //   .then(result => this.setState({ result: result }))

    // fetch('/getAnalytics')
    //   .then(res => res.json())
    //   .then(res => this.setState({ analytics: res }))

    // fetch('/getStackedData')
    //   .then(response => response.json())
    //   .then(response => this.setState({ stackedProducts: response }))
    console.log(this.state.result, "gap  ", this.state.analytics, "gappp -- ", this.state.stackedProducts);
    this.state.result.map(row => {
      this.state.usernames.push(row.username);
      this.state.passwords.push(row.password);
    })
    // localStorage.setItem('loggedIn', true);
    localStorage.setItem('username', username);
    localStorage.setItem('loggedIn', password);
    if (this.state.usernames.includes(username) && (this.state.passwords.includes(password) || cookies.get('pass') === password)) {
      this.setState({
        user: {
          username,
          password,
        }, loggedIn: true
      })
    } else {
      return (<h4>Please enter a valid password</h4>)

    }
  }

  render() {
    const data = this.state.analytics;
    console.log(this.state.stackedProducts);
    const headers = ["Cluster", "Gender", "Clicks", "Age", "Time", "Channel", "Product Category 1", "Product Category 2", "Product Category 3", "Conversion Probability"];

    return (
      <div>
        <Navigation isLoggedIn={this.state.loggedIn} />
        {
          (this.state.loggedIn) ?
            <div className="container" style={{padding: '8em', alignContent: 'center'}}>
              <Tabs defaultActiveKey="insight" id="uncontrolled-tab-example" onClick={this.tabClick}>
                <Tab eventKey="insight" title="Campaign Insights">
                <h4>K-Means Clustering Analysis - Attributes for the 4Rs</h4><br></br>
                    <Tabular headers={headers} data={data} />
                </Tab>
                <Tab eventKey="analytics" title="Data Analytics">
                <div>
                <Analytics data={data} headers={headers} stackedProducts={this.state.stackedProducts} feature={this.state.feature} />
                </div>
                </Tab>
              </Tabs>
            </div>
            :
            <Login onSignIn={this.signIn.bind(this)} />
        }
      </div>
    );
  }

}

export default App;
