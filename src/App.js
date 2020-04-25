import React, { Component } from 'react';
import './App.css';
import Login from '../src/components/Login.jsx';
import Navigation from '../src/components/Navigation.jsx';
import Analytics from '../src/components/Analytics';
import UserPage from '../src/components/UserPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from 'react-bootstrap';
import Pie from '../src/components/Pie.jsx';

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
      confMatrix: [],
      labels: [],
      view: "",
      error: ""
    };
  }

  getData() {
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

    this.state.result.map(row => {
      this.state.usernames.push(row.username);
      this.state.passwords.push(row.password);
      console.log("role hwewe", row.role);
    })
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
      confMatrix: [],
      labels: []

    };
  }

  logout = () => {
    this.setState({
      role: "",
      user: {},
      usernames: [], passwords: [],
      labels: []
    })
  }

  signIn(username, password) {
    // localStorage.setItem('loggedIn', true);
    
    if (this.state.usernames.includes(username) && (this.state.passwords.includes(password))) {
      this.setState({
        user: {
          username,
          password,
        }, loggedIn: true
      })

      this.state.result.map((row) => {
        if (row.username === username && row.password === password) {
          this.setState({
            role: row.role
          })
          return;
        }
      })
    }
    localStorage.setItem('username', username);
    localStorage.setItem('loggedIn', this.state.loggedIn);
    localStorage.setItem('ROLE', this.state.role);
  }


  renderPage = (s) => {
    this.setState({ view: s })
  }

  render() {
    const data = this.state.analytics;
    const headers = ["Cluster", "Gender", "Clicks", "Age", "Time", "Channel", "Product Category 1", "Product Category 2", "Product Category 3", "Conversion Probability"];
    console.log("ROLE -- ", this.state.role)
    { this.getData() }
    return (
      <div>
        <Navigation isLoggedIn={this.state.loggedIn} role={this.state.role} renderPage={this.renderPage.bind(this)} />

        {!this.state.loggedIn || !localStorage.getItem('loggedIn') ? (<div>
          <Login onSignIn={this.signIn.bind(this)} logout={this.logout.bind(this)} />
          {this.state.error ? <div>{this.state.error}</div> : ""}
        </div>) : ""}
        {(this.state.loggedIn || !localStorage.getItem('loggedIn')) ?
          <div>
            <div>
              {(this.state.role === 'campaign' || (this.state.role === 'admin' && (this.state.view === 'market' || this.state.view === ""))) ?
                <div>
                  {/* <MarketPage /> */}
                  <div className="container" style={{ alignContent: 'center' }}>
                    <br></br>
                    <Tabs defaultActiveKey="insight" id="uncontrolled-tab-example" onClick={this.tabClick}>
                      <Tab eventKey="insight" title="Prediction Board"><br></br>
                        <div className="container" style={{ alignContent: 'center', marginLeft: '10rem' }}>
                          {data ? <Pie vals={data} rendered={true} /> : "Chart is loading..."}
                        </div>
                      </Tab>
                      <Tab eventKey="analytics" title="Data Insights">
                        <div>
                          {data ? <Analytics rendered={true} data={data} headers={headers} stackedProducts={this.state.stackedProducts}
                            feature={this.state.feature} confMatrix={this.state.confMatrix} timeBasedProducts={this.state.timeBasedProducts} />
                            : "Chart is loading..."}
                        </div>
                      </Tab>
                    </Tabs>
                  </div></div> : ""}
            </div>

            {(this.state.role === 'customer' || (this.state.role === 'admin' && (this.state.view === 'customer'))) ? (<div>
              <UserPage labels={this.state.labels} log={this.state.loggedIn} /></div>) : ""}


          </div>
          :
          ""}
      </div>
    );
  }
}

export default App;
