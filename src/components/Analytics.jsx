import React, { Component } from 'react';
import Tabular from './Tabular';
import RFTable from './RFTable';
import MatrixTable from './MatrixTable';
import HistoChart from './HistoChart';
import StackedColumnChart from './StackedColumnChart';
import Pie from './Pie';
import BarChart from './BarChart';
import { Button } from 'react-bootstrap';


export default class Analytics extends Component {
    state = {
        accuracy: 100,
        timeBasedProducts: [],
        confMatrix: []
    }
    
    accuracy(acc){
        return (acc.toFixed(2) * 100 + "%");
    }

    componentDidMount(){
        Promise.all([
            fetch("/getTimeBasedProducts", {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              }),
            fetch("/getConfusionMatrix", {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
          ])
          .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
          .then(([data1, data2]) => this.setState({
            timeBasedProducts: data1,
            confMatrix: data2,
            accuracy: this.accuracy(62)
          }));
          console.log("here ", this.state.accuracy);
    }

    render() {
        const { data, headers, stackedProducts, feature } = this.props;
        const {confMatrix, timeBasedProducts} = this.state;
        let headings = ["Age", "Interest Channel", "Gender", "Session duration", "Season", "Product Category", "Quantity",
            "Clicks", "Impression"];
        return (
            <div>
                <br></br><br></br><br></br>
                <h4 style={{ textAlign: "center" }}>Data Analytics</h4><hr></hr>
                <div style={{ display: '-webkit-box', position: 'relative' }}>
                    {/* <StackedColumnChart stackedProducts={stackedProducts ? stackedProducts : null} style={{ paddingLeft: '2em' }} /><br></br> */}
                    <BarChart data={feature ? feature : null} />
                </div>

                <div style={{ display: 'inline-flex' }}>
                    <HistoChart vals={data} X={"age"} Y={"total_conversion"} />
                    <Pie vals={data} />
                </div><br></br>

                
                <div className="container">
                    <h6 style={{ float: 'right' }}><i>Right People - Right Time - Right Channel - Right Product </i></h6>
                    <Tabular headers={headers} data={data ? data : null} />
                </div>
                <br></br>
                <div className="container">
                    <h4>Time Based Products (What time are we selling the most?)</h4>
                    <MatrixTable data={timeBasedProducts ? timeBasedProducts : null} />
                </div><br></br>

                <div className="container">
                    <h4>Random Forest Analysis </h4><br></br>
                    <h6>Contribution of attributes</h6>
                    <RFTable headers={headings} data={feature ? feature[0] : null} />
                </div><br></br>
                <div className="container">
                    <h6>Confusion Matrix</h6>
                    <MatrixTable flag={1} accuracy={this.accuracy.bind(this)} data={confMatrix ? confMatrix : null}/>
                </div>
                
            </div>
        )
    }
}