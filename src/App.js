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

  UNSAFE_componentWillUnmount() {
    this.setState({
      user: {},
      usernames: [], passwords: [],
      loggedIn: false,
      result: [],
      analytics: [],
      stackedProducts: {}
    })
  }

  componentDidMount() {
    fetch('/getStackedData')
      .then(response => response.json())
      .then(response => this.setState({ stackedProducts: response }))
  }

  signIn(username, password) {
    //   Promise.all([
    //     fetch("/getData"),
    //     fetch("/getAnalytics"),
    //     fetch("/getStackedData")
    //   ]).then(allResponses => {
    //   this.setState({
    //         result: allResponses[0].json(),
    //         analytics: allResponses[1].json(),
    //         stackedProducts: allResponses[2].json()
    //   })
    // });
    // console.log(this.state.result);

    Promise.all([
      fetch("/getData"),
      fetch("/getAnalytics"),
      fetch("/getProducts")
    ])
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([data1, data2, data3]) => this.setState({
        result: data1,
        analytics: data2,
        stackedProducts: data3[0]
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
      console.log(this.state.result, "gap  ",  this.state.analytics, "gappp -- ", this.state.stackedProducts);
    this.state.result.map(row => {
      this.state.usernames.push(row.username);
      this.state.passwords.push(row.password);
    })

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
    console.log(this.state.stackedProducts);
    const headers = ["Cluster", "Gender", "Clicks", "Total Conversion", "Age", "Time", "Channel", "Product Category 1", "Product Category 2", "Product Category 3"];

    return (
      <div>
        <Navigation isLoggedIn={this.state.loggedIn} />
        {
          (this.state.loggedIn) ?
            <div>
              <Analytics data={data} headers={headers} stackedProducts={this.state.stackedProducts} />
            </div>
            :
            <Login onSignIn={this.signIn.bind(this)} />
        }
      </div>
    );
  }

}

export default App;
