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

    accuracy(acc) {
        return (acc.toFixed(2) * 100 + "%");
    }

    componentDidMount() {
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
                accuracy: this.accuracy(62)
            }));
    }

    render() {
        const { data, headers, stackedProducts, feature } = this.props;
        const { confMatrix, timeBasedProducts } = this.state;
        let headings = ["Age", "Interest Channel", "Gender", "Session duration", "Season", "Product Category", "Quantity",
            "Clicks", "Impression"];
        return (
            <div>
                <br></br>
                <div className="label-div">
                    <div className="card-label">
                        <h5 className="card-label-text">Total cluster (segments) of users</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{data.length}</h1>

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
                </div>
                <div className="container table-defined">
                    {/* <StackedColumnChart stackedProducts={stackedProducts ? stackedProducts : null} style={{ paddingLeft: '2em' }} /><br></br> */}
                    <BarChart data={feature ? feature : null} />
                </div>

                <div className="container table-defined" >
                    <HistoChart vals={data} X={"age"} Y={"total_conversion"} />
                </div><br></br>


                <div className="container table-defined" >
                <h4 className="text-emphasis">k-means clustering (Segments of users based on dataset!)</h4>
                    <Tabular headers={headers} data={data ? data : null} />
                </div>
                <br></br>

                <div className="container table-defined">
                    <h4 className="text-emphasis">Time Based Products (What time are we selling the most?)</h4>
                    <MatrixTable data={timeBasedProducts ? timeBasedProducts : null} />
                </div><br></br>

                <div className="container table-defined ">
       
                        <h4 className="text-emphasis">Random Forest Analysis </h4>
                        <h6 className="text-emphasis-left" >Contribution of attributes</h6>
                        <h6 className="text-emphasis-right">Confusion Matrix</h6>
                    <div>
                        <div style={{ float: 'left' }}><RFTable headers={headings} data={feature ? feature[0] : null} /></div>
                        <div style={{ float: 'right' }}><MatrixTable flag={1} accuracy={this.accuracy.bind(this)} data={confMatrix ? confMatrix : null} /></div>
                    </div>
                </div>

            </div>
        )
    }
}