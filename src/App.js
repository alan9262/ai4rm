import React, { Component, useState } from 'react';
import './App.css';
import Login from '../src/components/Login.jsx';
import Navigation from '../src/components/Navigation.jsx';
import Analytics from '../src/components/Analytics';
import UserPage from '../src/components/UserPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from 'react-bootstrap';
import Tabular from '../src/components/Tabular.jsx';
import Cookies from 'universal-cookie';
import Example from './components/Carousel';
import Background from '../src/images/download.jpeg'
import Pie from '../src/components/Pie.jsx';
import {
  Nav,
  Button
} from 'reactstrap';
const ROLES = ['customer', 'admin', 'campaign'];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      role: "",
      usernames: [], passwords: [],
      loggedIn: false,
      result: [],
      analytics: [],
      timeBasedProducts: [],
      confMatrix: []
    };
  }

  toggleOpenFunction = () => {
    localStorage.setItem('loggedIn', false);
    this.state = {
      user: {},
      usernames: [], passwords: [],
      loggedIn: localStorage.getItem('loggedIn'),
      result: [],
      analytics: [],
      timeBasedProducts: [],
      confMatrix: []
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

  tabClick = () => {

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
    let thisRole = "";
    this.state.result.map(row => {
      this.state.usernames.push(row.username);
      this.state.passwords.push(row.password);
      console.log("role hwewe" , row.role);
      if(row.username === username && password === row.password){
        thisRole = row.role; 
      }  
    })
    // localStorage.setItem('loggedIn', true);
    localStorage.setItem('username', username);
    localStorage.setItem('loggedIn', password);
    if (this.state.usernames.includes(username) && (this.state.passwords.includes(password) || cookies.get('pass') === password)) {
      this.setState({
        role: thisRole,
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
    const headers = ["Cluster", "Gender", "Clicks", "Age", "Time", "Channel", "Product Category 1", "Product Category 2", "Product Category 3", "Conversion Probability"];
    console.log("ROLE -- ", this.state.role)
    return (
      <div>
        <Navigation isLoggedIn={this.state.loggedIn} role={this.state.role}/>
        {this.state.role !== 'customer' ? (<div className="header-app" >  
        <div className="carousel">
            <Example />
          </div>     
        </div>) : ""}
        {
          (this.state.loggedIn) ?
            (<div>
              {this.state.role === 'campaign' || this.state.role === 'admin' ? 
              <div className="container" style={{ alignContent: 'center' }}>
                <br></br>
                
                <Tabs defaultActiveKey="insight" id="uncontrolled-tab-example" onClick={this.tabClick}>
                  <Tab eventKey="insight" title="Prediction Board"><br></br>
                    <div className="container" style={{ alignContent: 'center', marginLeft: '10rem' }}>
                      <Pie vals={data} />
                    </div>
                  </Tab>
                  {/* </div> */}
                  <Tab eventKey="analytics" title="Data Insights">
                    <div>
                      <Analytics data={data} headers={headers} stackedProducts={this.state.stackedProducts}
                        feature={this.state.feature} confMatrix={this.state.confMatrix} timeBasedProducts={this.state.timeBasedProducts} />
                    </div>
                  </Tab>
                </Tabs>
              </div>: <UserPage/>}</div>)
            :
            <Login onSignIn={this.signIn.bind(this)} />
        }
      </div>
    );
  }
}

export default App;
