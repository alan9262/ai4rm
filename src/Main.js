import React, { Component } from 'react';

import Login from './components/Login.jsx';
import Navigation from './components/Navigation.jsx';
import Analytics from './components/Analytics';
import UserPage from './components/UserPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast, Button, Alert } from 'react-bootstrap';
import Pie from './components/Pie.jsx';
import iphone11white from '../src/images/iphone11white.png';
import applewatch from '../src/images/applewatch.jpg';
import dyson from '../src/images/dyson.jpg';
import chanel from '../src/images/chanel.jpg';
import organic_oil from '../src/images/organic_oil.jpeg';
import Tabular from '../src/components/Tabular';
import RFTable from '../src/components/RFTable';
import MatrixTable from '../src/components/MatrixTable';
import { local } from 'd3-selection';

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
      stackedProducts: {},
      marketer: true,
      insights: false,
      productArray: [2, 3, 1],
      error: "",
      age: 0,
      wasOpened1: true,
      wasOpened2: false,
      wasOpened3: false,
      variantColor1: 'success',
      variantColor2: 'dark',
      variantColor3: 'dark',
      variantColor4: 'secondary',
      variantColor5: 'outline-info',
      channelProduct: []
    };
  }

  componentWillUnmount() {
    this.setState({
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
      stackedProducts: {},
      marketer: true,
      insights: false,
      error: ""
    });
  }

  componentDidMount() {

    // if (localStorage.getItem('loggedIn') === "true") {
    //   this.setState({
    //     stackedProducts: localStorage.getItem('stackedProducts'),
    //     result: localStorage.getItem('result'),
    //     analytics: localStorage.getItem('analytics'),
    //     // localStorage.setItem('stackedProducts', this.state.stackedProducts);
    //     feature: localStorage.getItem('feature'),
    //     user: localStorage.getItem('user'),
    //     role: localStorage.getItem('ROLE')
    //   })
    // } else {
      Promise.all([
        fetch("/getTimeBasedProducts", {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }

        }),
        fetch("/getConfusionMatrix", {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }

        })
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => this.setState({
          timeBasedProducts: data1,
          confMatrix: data2,
          marketer: true
        }));

      Promise.all([
        fetch("/getChannel")
      ])
        .then(([res1]) => Promise.all([res1.json()]))
        .then(([data1]) => this.setState({
          channelProduct: data1
        }));
      localStorage.setItem('channelProduct', this.state.channelProduct)
      this.signIn();
    // }


  }

  shuffle(array) {
    // console.log("array before shuffle ", array);
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    // console.log("array after shuffle ", array);
    return array;
  }

  getData(username, password) {
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
    var tmp = 0;
    let ageArray = [];
    let ages = [];
    this.state.result.map(row => {
      this.state.usernames.push(row.username);
      this.state.passwords.push(row.password);
      tmp = parseInt(row.age);
    })
    this.setState({
      age: tmp
    })

    this.state.analytics.map(a => {
      if (this.state.age >= 31 && this.state.age <= 40) {
        this.setState({
          productArray: [2, 3, 1]
        })
      } else {
        var array = this.shuffle(this.state.productArray);
        this.setState({
          productArray: array
          // productArray: [1, 2, 3]
        })
      }
    })
    // console.log("productArray", this.state.productArray);

    if (this.state.usernames.includes(username) && (this.state.passwords.includes(password))) {
      this.setState({
        user: {
          username,
          password,
        }
      })

      this.state.result.map((row) => {
        if (row.username === username && row.password === password) {
          this.setState({
            error: "",
            role: row.role,
            loggedIn: true
          })
          
        }
      })

      var cluster = [];
      this.state.analytics.map((row) => {
        cluster.push("Top" + " " + row.channel + " " + row.product_1 + " buyers")
      });
      this.setState({
        clusters: cluster
      })
      localStorage.setItem('stackedProducts', this.state.stackedProducts);
      localStorage.setItem('result', this.state.result);
      localStorage.setItem('analytics', this.state.analytics);
      // localStorage.setItem('stackedProducts', this.state.stackedProducts);
      localStorage.setItem('feature', this.state.feature);
      localStorage.setItem('username', this.state.user.username);
      localStorage.setItem('user', this.state.user);
      console.log("this.state.loggedIn ", this.state.loggedIn)
      localStorage.setItem('loggedIn', this.state.loggedIn);
      localStorage.setItem('ROLE', this.state.role);
    }
  }


  toggleOpenFunction() {
    localStorage.clear();
    this.setState({
      user: {},
      role: "",
      usernames: [], passwords: [],
      loggedIn: false,
      result: [],
      analytics: [],
      confMatrix: [],
      view: "",
      error: "",
      stackedProducts: {},
      marketer: true,
      insights: false,
      productArray: [2, 3, 1],
      error: "",
      age: 0,
      wasOpened1: true,
      wasOpened2: false,
      wasOpened3: false,
      variantColor1: 'success',
      variantColor2: 'dark',
      variantColor3: 'dark',
      variantColor4: 'secondary',
      variantColor5: 'outline-info',
    });
    return <Login onSignIn={this.signIn.bind(this)} />
  }

  logout = () => {
    console.log("in logout")
    this.setState({
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
      stackedProducts: {},
      marketer: true,
      insights: false,
      productArray: [2, 3, 1],
      error: ""
    })
    return <Login onSignIn={this.signIn.bind(this)} />
  }

  signIn(username, password) {
    this.getData(username, password)

  }

  onPredictClick = () => {
    this.setState({
      marketer: true,
      insights: false,
      variantColor4: this.state.variantColor4 === "secondary" ? "outline-info" : "secondary",
      variantColor5: this.state.variantColor5 === "outline-info" ? "secondary" : "outline-info"
    })
  }

  onInsightClick = () => {

    this.setState({
      marketer: false,
      insights: true,
      variantColor4: this.state.variantColor4 === "secondary" ? "outline-info" : "secondary",
      variantColor5: this.state.variantColor5 === "outline-info" ? "secondary" : "outline-info"
    })
  }

  renderPage = (s) => {
    if (s === 'customer') {
      this.setState({ view: s, insights: false })
    } else if (s === 'market') {
      this.setState({ view: s, insights: true })
    } else {
      this.setState({ view: s })
    }
  }

  showDiv1() {
    this.setState({ wasOpened1: !this.state.wasOpened1, variantColor1: this.state.variantColor1 === "success" ? "outline-info" : "success" })
  }
  showDiv2() {
    this.setState({ wasOpened2: !this.state.wasOpened2, variantColor2: this.state.variantColor2 === "success" ? "outline-info" : "success" })
  }
  showDiv3() {
    this.setState({ wasOpened3: !this.state.wasOpened3, variantColor3: this.state.variantColor3 === "success" ? "outline-info" : "success" })
  }

  getMath(object, name) {
    if (name === 'sensitivity') {
      return (object["True Positive"] / (object["True Positive"] + object["False Negative"])).toFixed(2);
    }
    if (name === 'specificity') {
      return (object["True Negative"] / (object["True Negative"] + object["False Postitive"])).toFixed(2);
    }
    if (name === 'precision') {
      return (object["True Positive"] / (object["True Positive"] + object["False Postitive"])).toFixed(2);
    }
    if (name === 'fallout') {
      return (object["False Postitive"] / (object["True Negative"] + object["False Postitive"])).toFixed(2);
    }
    if (name === 'threatscore') {
      return (object["True Positive"] / (object["True Positive"] + object["False Negative"] + object["False Postitive"])).toFixed(2);
    }

  }

  render() {
    // console.log("channelProduct", this.state.channelProduct);
    const data = this.state.analytics;
    const wasOpened1 = this.state.wasOpened1;
    const wasOpened2 = this.state.wasOpened2;
    const wasOpened3 = this.state.wasOpened3;
    // console.log("error ", this.state.error);
    // var data = localStorage.getItem('analytics') ? localStorage.getItem('analytics') : this.state.analytics;
    var stackedProducts = this.state.stackedProducts;
    const feature = this.state.feature;
    const headers = ["Cluster", "Gender", "Clicks", "Age", "Time", "Channel", "Product Category 1", "Product Category 2", "Product Category 3", "Conversion Probability"];
    let headings = ["Age", "Interest Channel", "Gender", "Session duration", "Season", "Product Category", "Quantity",
      "Clicks", "Impression"];
    let dataRow = this.state.analytics[0] ? this.state.analytics.reduce(function (prev, current) {
      return (prev.predict_conver > current.predict_conver) ? prev : current
    }) : ""
    return (
      <div>
        <Navigation user={this.state.user.username} isLoggedIn={this.state.loggedIn} role={this.state.role} renderPage={this.renderPage.bind(this)} toggleOpenFunction={this.toggleOpenFunction.bind(this)} />

        {!this.state.loggedIn ? (<div>
          <Login onSignIn={this.signIn.bind(this)} logout={this.logout.bind(this)} /><p><br></br><br></br><br></br></p>
          {this.state.error ? <div className="error-label">{this.state.error}</div> : ""}
        </div>) : ""}
        {(this.state.loggedIn) ?
          <div>
            <div>
              {(this.state.role === 'campaign' || (this.state.role === 'admin' && (this.state.view === 'market' || this.state.view === ""))) ?
                <div style={{ display: "-webkit-inline-box" }}>
                  <div className="scrollmenu-vertical">
                    <label className="table-header-group topSellingLabel" style={{ padding: "1em" }}>Top selling products now..</label>
                    <div><img className="img" src={iphone11white} alt=""></img></div>
                    <div><img className="img" src={applewatch} alt=""></img></div>
                    <div><img className="img" src={organic_oil} alt=""></img></div>
                    <div><img className="img" src={dyson} alt=""></img></div>
                    <div><img className="img" src={chanel} alt=""></img></div>
                  </div>
                  {/* <MarketPage /> */}
                  <div className="container" style={{ alignContent: 'center' }}>
                    <br></br>

                    {this.state.role === 'admin' || this.state.role === 'campaign' ? (<span style={{ display: "inline-flex" }}>
                      <Button variant={this.state.variantColor4} onClick={this.onPredictClick}>Prediction Board</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button style={{ textAlign: "flex-inline" }} variant={this.state.variantColor5} onClick={this.onInsightClick}>Data Insights</Button>
                    </span>) : ""}<br></br><br></br>

                    <div>
                      {this.state.marketer ? <div>
                        {this.state.analytics ? (
                          <div style={{ alignContent: 'center', maxWidth: "fit-content", position: "relative" }} >
                            <div style={{ fontSize: "medium" }}>
                              <Alert variant="success">
                                <Alert.Heading>Hello, {this.state.user.username}!</Alert.Heading>
                                <p>
                                  The below data represents our users and their buying patterns. Based on the patterns, you can find the market prediction below.
  </p>
                                <hr />
                                <p className="mb-0 asterisk">
                                  The pop-ed out area in the pie chart shows the most favourable groups of customers.
  </p>
                              </Alert>
                            </div>
                            <div className="toast-class">
                              <Toast animation={true} bsPrefix="toast-class" style={{
                                display: "table-header-group",
                                margin: '1rem',
                                position: 'relative',
                                zIndex: 999

                              }}>
                                <Toast.Header closeButton={false} closeLabel={'Close'}>
                                  <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                  <strong className="mr-auto">Market Prediction</strong>
                                  <small>based on data insights</small>
                                </Toast.Header>
                                {dataRow ? (<Toast.Body><div style={{ fontSize: "medium" }}><b>Target </b>: {dataRow.age} age group customers for product category {dataRow.product_1} at ({dataRow.time}) through channel {dataRow.channel}.</div> </Toast.Body>) : ""}
                              </Toast></div><br></br><br></br><br></br>
                            <h6>Click/Unclick to see the different segment of users and their 4Rs:</h6>
                            <br></br>
                            <div id="myBtnContainer">
                              <Button variant={this.state.variantColor1} className="btn" onClick={() => this.showDiv1()} > Segment 1</Button>&nbsp;&nbsp;
                              <Button variant={this.state.variantColor2} className="btn" onClick={() => this.showDiv2()} > Segment 2</Button>&nbsp;&nbsp;
                              <Button variant={this.state.variantColor3} className="btn" onClick={() => this.showDiv3()} > Segment 3</Button><br></br><br></br><hr></hr>
                            </div>
                            <div class="container">
                              {wasOpened1 && (
                                <div className="row flex-nowrap" id="filterDiv1" >
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right age for users</h5>
                                    <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[0].age}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right Content for users</h5>
                                    <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[0].product_1}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right Channel for users</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[0].channel}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right Time for users</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[0].time}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Conversion prediction</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{(data[0].predict_conver * 100).toFixed(0)}%</h1>
                                  </div>
                                </div>
                              )}
                              {wasOpened2 && (
                                <div className="row flex-nowrap" id="filterDiv2">
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right age for users</h5>
                                    <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[1].age}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right Content for users</h5>
                                    <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[1].product_1}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right Channel for users</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[1].channel}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right Time for users</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[1].time}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Conversion prediction</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{(data[1].predict_conver * 100).toFixed(0)}%</h1>
                                  </div>
                                </div>)}
                              {wasOpened3 && (
                                <div className="row flex-nowrap" id="filterDiv3">
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right age for users</h5>
                                    <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[2].age}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right Content for users</h5>
                                    <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[2].product_1}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right Channel for users</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[2].channel}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Right Time for users</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data[2].time}</h1>
                                  </div>
                                  <div className="card-label">
                                    <h5 className="card-label-text">Conversion prediction</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{(data[2].predict_conver * 100).toFixed(0)}%</h1>
                                  </div>
                                </div>)}
                            </div>
                            <div className="container label-pammer" style={{ marginTop: '-2rem' }}>
                              <Pie vals={this.state.analytics} /></div>
                          </div>)
                          : "Chart is loading..."} </div> : ""}
                    </div>
                    {(this.state.insights || this.state.view === 'datas') ?
                      <div>
                        <Analytics channelProduct={localStorage.getItem('channelProduct')} rendered={true} data={this.state.analytics} headers={headers} stackedProducts={this.state.stackedProducts}
                          feature={this.state.feature} role={this.state.role} view={this.state.view} confMatrix={this.state.confMatrix} timeBasedProducts={this.state.timeBasedProducts} />

                      </div> : ""}


                  </div></div> : ""}
            </div>

            {(this.state.role === 'customer' || (this.state.role === 'admin' && this.state.view === 'customer')) ? (<div>
              {this.state.productArray ? <UserPage log={this.state.loggedIn} arrange={this.state.productArray} /> : ""}</div>) : ""}

            {(this.state.insights || this.state.view === 'datas') ? <div>
              <br></br>
              <div className="container table-defined" >
                {(this.state.role === 'campaign' || this.state.view === 'market') ?
                  <h4 className="text-emphasis">Segments of users based on dataset!</h4>
                  :
                  <h4 className="text-emphasis">k-means clustering (Segments of users based on dataset!)</h4>
                }

                <Tabular headers={headers} data={data ? data : null} />
              </div>
              <br></br>
              {this.state.timeBasedProducts ? <div><div className="container table-defined">
                <h4 className="text-emphasis">Time Based Products (What time are we selling the most?)</h4>
                <MatrixTable data={this.state.timeBasedProducts ? this.state.timeBasedProducts : null} />
              </div><hr></hr></div> : ""}

              {this.state.view === 'datas' ? (<div className="container table-defined ">
                <h4 className="text-emphasis">Random Forest Analysis </h4>
                <hr></hr>
                <div style={{ display: "inline-flex" }}>
                  {this.state.confMatrix[0] ? <p style={{ textAlign: "left", padding: "1rem" }}><b>Accuracy: </b>{(this.state.confMatrix[0].Accuracy) * 100}%</p> : ""}
                  {this.state.confMatrix[0] ? <p style={{ textAlign: "left", padding: "1rem" }}><b>Sensitivity: </b>{(this.getMath(this.state.confMatrix[0], 'sensitivity'))}</p> : ""}
                  {this.state.confMatrix[0] ? <p style={{ textAlign: "center", padding: "1rem" }}><b>Specificity: </b>{(this.getMath(this.state.confMatrix[0], 'specificity'))}</p> : ""}
                  {this.state.confMatrix[0] ? <p style={{ textAlign: "center", padding: "1rem" }}><b>Precision: </b>{(this.getMath(this.state.confMatrix[0], 'precision'))}</p> : ""}
                  {this.state.confMatrix[0] ? <p style={{ textAlign: "right", padding: "1rem" }}><b>Fall out: </b>{(this.getMath(this.state.confMatrix[0], 'fallout'))}</p> : ""}
                  {this.state.confMatrix[0] ? <p style={{ textAlign: "right", padding: "1rem" }}><b>Threat score: </b>{(this.getMath(this.state.confMatrix[0], 'threatscore'))}</p> : ""}<hr></hr>
                </div>
                <div>
                  <div style={{ float: 'left' }}><h6 className="text-emphasis-right" >Contribution of attributes</h6><RFTable headers={headings} data={feature ? feature[0] : null} /></div>
                  <div style={{ float: 'right' }}><h6 className="text-emphasis-right">Confusion Matrix</h6><MatrixTable flag={1} data={this.state.confMatrix ? this.state.confMatrix : null} /></div>
                </div>
              </div>) : ""}

            </div> : ""}
          </div>
          :
          ""
        }
      </div>
    );
  }
}

export default Main;
