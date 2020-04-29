import React, { Component } from 'react';
import HistoChart from './HistoChart';
import StackedColumnChart from './StackedColumnChart';
import BarChart from './BarChart';
import { Alert } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';


export default class Analytics extends Component {
    state = {
        timeBasedProducts: [],
        confMatrix: [],
        clusters: [],
        wasOpened1: Boolean,
        wasOpened2: Boolean,
        wasOpened3: Boolean,
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
            clusters: cluster,
            wasOpened1: false,
            wasOpened2: false,
            wasOpened3: false,
        })

    }



    showDiv1() {
        this.setState({ wasOpened1: !this.state.wasOpened1 })
    }
    showDiv2() {
        this.setState({ wasOpened2: !this.state.wasOpened2 })
    }
    showDiv3() {
        this.setState({ wasOpened3: !this.state.wasOpened3 })
    }



    render() {
        const wasOpened1 = this.state.wasOpened1;
        const wasOpened2 = this.state.wasOpened2;
        const wasOpened3 = this.state.wasOpened3;

        const { data, headers, stackedProducts, feature, view, role } = this.props;
        const { confMatrix, timeBasedProducts } = this.state;
        let dataRow = data.reduce(function (prev, current) {
            return (prev.y > current.y) ? prev : current
        })
        // dataRow[0].predict_conver = Math.round(parseInt(dataRow[0].predict_conver)) * 100;
        let headings = ["Age", "Interest Channel", "Gender", "Session duration", "Season", "Product Category", "Quantity",
            "Clicks", "Impression"];

        console.log(this.wasOpened)
        return (
            <div>
                <br></br>
                <Alert key={1} variant="primary">What should you know about targeting customers?</Alert><br></br>
                <h2>Click to see the clusters:</h2>
                <br></br>
                <div id="myBtnContainer">
                    <button className="btn" onClick={() => this.showDiv1()} > Cluster 1</button>
                    <button className="btn" onClick={() => this.showDiv2()} > Cluster 2</button>
                    <button className="btn" onClick={() => this.showDiv3()} > Cluster 3</button>
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
                                <h5 className="card-label-text">Prediction accuracy</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{(data[0].predict_conver * 100).toFixed(0)}%</h1>
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
                                <h5 className="card-label-text">Prediction accuracy</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{(data[1].predict_conver * 100).toFixed(0)}%</h1>
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
                                <h5 className="card-label-text">Prediction accuracy</h5> <h1 style={{ textAlign: "center", color: "green" }}><br></br>{(data[2].predict_conver * 100).toFixed(0)}%</h1>
                            </div>
                        </div>)}
                </div>


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