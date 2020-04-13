import React, { Component } from 'react';
import Tabular from './Tabular';
import Chart from './Chart';
import StackedColumnChart from './StackedColumnChart';


export default class Analytics extends Component {

    render() {
        const { data, headers, stackedProducts } = this.props;
        return (
            <div className="container">
                <br></br><br></br><br></br>
                <h4 style={{ textAlign: "center" }}>Campaign Analytics</h4><hr></hr>
                <h6><i>This line chart shows the <b>age (X-axis)</b> vs <b>Total Conversion (Y-axis) </b></i></h6>
                <Chart data={data} /><br></br>
                <h6><i>The below result is for k-means clustering (what age is buying buying what?)</i></h6>
                <h6>Right People </h6>
                <Tabular headers={headers} data={data} />
                <br></br>
                <h6><i>More charts in progress ...</i></h6><br></br>
                <StackedColumnChart stackedProducts={stackedProducts}/>
            </div>
        )
    }
}