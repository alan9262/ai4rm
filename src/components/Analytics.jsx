import React, { Component } from 'react';
import HistoChart from './HistoChart';
import StackedColumnChart from './StackedColumnChart';
import BarChart from './BarChart';
import { Alert } from 'react-bootstrap';
import { Row, Col } from 'reactstrap';
import ChannelTrend from './ChannelTrend';


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
            clusters: cluster,
            wasOpened1: false,
            wasOpened2: false,
            wasOpened3: false,
        })

    }

    render() {


        const { data, stackedProducts, feature, channelProduct } = this.props;
        const { timeBasedProducts } = this.state;
        console.log("channelProduct")
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
                {/* <div className="card-label">
                    <h5 className="card-label-text">Total number of Channels</h5>
                    <h1 style={{ textAlign: "center", color: "green" }}><br></br>{(Object.keys(channelProduct).length)}</h1>
                </div> */}
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
                    <Col xs={6} md={6}>
                        <ChannelTrend data={channelProduct} />
                    </Col>
                </Row>
                <br></br>
            </div>
        )
    }
}