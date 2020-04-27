import React, { Component } from 'react';
import Tabular from './Tabular';
import RFTable from './RFTable';
import MatrixTable from './MatrixTable';
import HistoChart from './HistoChart';
import StackedColumnChart from './StackedColumnChart';
import BarChart from './BarChart';
import { Alert } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';


export default class Analytics extends Component {
    state = {
        timeBasedProducts: [],
        confMatrix: [],
        clusters: []
    }

    accuracy(acc) {
        return (acc.toFixed(2) * 100);
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
                confMatrix: data2
            }));
        var cluster = [];
        this.props.data.map((row) => {
            cluster.push("Top" + " " + row.channel + " " + row.product_1 + " buyers")
        });
        this.setState({
            clusters: cluster
        })

    }

    

    render() {
        const { data, headers, stackedProducts, feature, view, role } = this.props;
        const { confMatrix, timeBasedProducts } = this.state;
        console.log("role", role);
        let dataRow = data.reduce(function (prev, current) {
            return (prev.y > current.y) ? prev : current
        })
        // dataRow[0].predict_conver = Math.round(parseInt(dataRow[0].predict_conver)) * 100;
        let headings = ["Age", "Interest Channel", "Gender", "Session duration", "Season", "Product Category", "Quantity",
            "Clicks", "Impression"];
        return (
            <div>
                <br></br>
                <Alert key={1} variant="primary">What should you know about targeting customers?</Alert><br></br>

                <br></br>
                <div className="label-div">
                    <div>
                    </div><br></br>
                    <div className="col">
                        <div className="row flex-nowrap">
                            <div className="card-label">
                                <h5 className="card-label-text">Right age for users</h5>
                                <h1 style={{ textAlign: "center", color: "green" }}><br></br>{dataRow.age}</h1>
                            </div>
                            <div className="card-label">
                                <h5 className="card-label-text">Right Content for users</h5>
                                <h1 style={{ textAlign: "center", color: "green" }}><br></br>{dataRow.product_1}</h1>
                            </div>
                            <div className="card-label">
                                <h5 className="card-label-text">Right Channel for users</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{dataRow.channel}</h1>
                            </div>
                            <div className="card-label">
                                <h5 className="card-label-text">Right Time for users</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{dataRow.time}</h1>
                            </div>
                            <div className="card-label">
                                <h5 className="card-label-text">Prediction accuracy</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{(dataRow.predict_conver * 100).toFixed(0)}%</h1>
                            </div>
                        </div>

                    </div>
                </div><hr></hr>


                <Row>
                    <Col xs={6} md={6}>

                        <StackedColumnChart clusters={this.state.clusters} stackedProducts={stackedProducts ? stackedProducts : null} />

                    </Col>
                    <Col xs={6} md={6}>
                        <div style={{ paddingLeft: "3rem" }}>
                            <HistoChart vals={timeBasedProducts} X={"age"} Y={"total_conversion"} />
                        </div>
                    </Col>
                </Row>
                <Alert key={2} variant="primary">What should you focus on marketing promotion?</Alert><br></br>
                <Row>
                    <Col xs={6} md={6}>

                        <BarChart data={feature ? feature : null} />

                    </Col>
                </Row>

                <br></br>
                {/* <div className="table-defined-box">
                    


                </div>

                <div className="container table-defined" >

                    
                </div><br></br><hr></hr> */}
                
            </div>
        )
    }
}