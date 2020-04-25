import React, { Component } from 'react';

import Login from './components/Login.jsx';
import Navigation from './components/Navigation.jsx';
import Analytics from './components/Analytics';
import UserPage from './components/UserPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Toast } from 'react-bootstrap';
import Pie from './components/Pie.jsx';

class Main extends Component {
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
      view: "",
      error: "",
      stackedProducts: {}

    };
  }
  getData(username, password) {
    console.log("here in get data ")
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
    })
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
          // return;
        }
      })
    }
    localStorage.setItem('stackedProducts', this.state.stackedProducts);
    localStorage.setItem('result', this.state.result);
    localStorage.setItem('analytics', this.state.analytics);
    // localStorage.setItem('stackedProducts', this.state.stackedProducts);
    localStorage.setItem('feature', this.state.feature);
    localStorage.setItem('username', this.state.user.username);
    localStorage.setItem('user', this.state.user);
    localStorage.setItem('loggedIn', this.state.loggedIn);
    localStorage.setItem('ROLE', this.state.role);
  }


  toggleOpenFunction() {
    console.log("here in toggle open ")
    localStorage.setItem('loggedIn', false);
    this.setState({
      user: {},
      usernames: [], passwords: [],
      loggedIn: false,
      result: [],
      analytics: [],
      timeBasedProducts: [],
      confMatrix: [],
    });
    return <Login onSignIn={this.signIn.bind(this)} />
  }

  logout = () => {
    this.setState({
      role: "",
      user: {},
      usernames: [], passwords: [],
    })
    return <Login onSignIn={this.signIn.bind(this)} />
  }
  componentDidMount() {
    console.log("here in componentDidMount open ")
    // this.setState({
    //   loggedIn : localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn') : this.state.loggedIn,
    //   stackedProducts: localStorage.getItem('stackedProducts') ? localStorage.getItem('stackedProducts') : this.state.stackedProducts,
    //   analytics: localStorage.getItem('analytics') ? localStorage.getItem('analytics') : this.state.analytics,
    //   feature: localStorage.getItem('feature') ? localStorage.getItem('feature') : this.state.feature,
    //   user: localStorage.getItem('user') ? localStorage.getItem('user') : this.state.user
    // })
  }
  signIn(username, password) {
    console.log("here in signin  ")
    localStorage.setItem('loggedIn', true);


    this.getData(username, password)

  }


  renderPage = (s) => {
    this.setState({ view: s })
  }

  render() {
    // const data = this.state.analytics;
    var data = localStorage.getItem('analytics') ? localStorage.getItem('analytics') : this.state.analytics;
    var stackedProducts = localStorage.getItem('stackedProducts') ? localStorage.getItem('stackedProducts') : this.state.stackedProducts;
    const feature = localStorage.getItem('feature') ? localStorage.getItem('feature') : this.state.feature;
    const headers = ["Cluster", "Gender", "Clicks", "Age", "Time", "Channel", "Product Category 1", "Product Category 2", "Product Category 3", "Conversion Probability"];
    return (
      <div>
        <Navigation user={this.state.user.username} isLoggedIn={this.state.loggedIn} role={this.state.role} renderPage={this.renderPage.bind(this)} toggleOpenFunction={this.toggleOpenFunction.bind(this)} />

        {!this.state.loggedIn ? (<div>
          <Login onSignIn={this.signIn.bind(this)} logout={this.logout.bind(this)} /><p><br></br><br></br><br></br></p>
          {this.state.error ? <div>{this.state.error}</div> : ""}
        </div>) : ""}
        {(this.state.loggedIn) ?
          <div>
            <div>
              {(this.state.role === 'campaign' || (this.state.role === 'admin' && (this.state.view === 'market' || this.state.view === ""))) ?
                <div>
                  {/* <MarketPage /> */}
                  <div className="container" style={{ alignContent: 'center' }}>
                    <br></br>
                    <Tabs defaultActiveKey="insight" id="uncontrolled-tab-example" onClick={this.tabClick}>
                      <Tab eventKey="insight" title="Prediction Board"><br></br>
                        <div>
                          {this.state.analytics ? (
                            <div>
                              <Toast animation={true} bsPrefix="toast-class" style={{
                                display: "table-header-group",
                                margin: '2rem'
                              }}><Toast.Header closeButton={false} closeLabel={'Close'}>
                                  <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                  <strong className="mr-auto">Market Prediction</strong>
                                  <small>based on data insights</small>
                                </Toast.Header>
                                <Toast.Body><b>Target </b>: {this.state.analytics[0].age} group for {this.state.analytics[0].product_1} at {this.state.analytics[0].time} through {this.state.analytics[0].channel}. </Toast.Body>
                              </Toast><br></br>
                              <div className="container" style={{ alignContent: 'center', margin: 'auto', minHeight: '1000px', minWidth: '800px' }}>
                                <Pie vals={this.state.analytics} rendered={true} width={'1000px'} height={'800px'} /></div>
                            </div>)
                            : "Chart is loading..."}
                        </div>
                      </Tab>
                      <Tab eventKey="analytics" title="Data Insights" unmountOnExit={false}>
                        <div>
                          <Analytics rendered={true} data={this.state.analytics} headers={headers} stackedProducts={this.state.stackedProducts}
                            feature={this.state.feature} confMatrix={this.state.confMatrix} timeBasedProducts={this.state.timeBasedProducts} />

                        </div>
                      </Tab>
                    </Tabs>
                  </div></div> : ""}
            </div>

            {(this.state.role === 'customer' || (this.state.role === 'admin' && (this.state.view === 'customer'))) ? (<div>
              <UserPage log={this.state.loggedIn} /></div>) : ""}


          </div>
          :
          ""
        }
      </div>
    );
  }
}

export default Main;
