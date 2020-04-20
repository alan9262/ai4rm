import React, { Component } from 'react';
import Tabular from './Tabular';
import RFTable from './RFTable';
import ProductTable from './ProductTable';
import HistoChart from './HistoChart';
import StackedColumnChart from './StackedColumnChart';
import Pie from './Pie';
import BarChart from './BarChart';
import { Button } from 'react-bootstrap';


export default class Analytics extends Component {

    state = {
        bar: false,
        clus: false,
        more: false
    }

    randforest = () => {
        this.setState({
            bar: !this.state.bar
        })
    }
    cluster = () => {
        this.setState({
            clus: !this.state.clus
        })
    }
    more = () => {
        this.setState({
            more: !this.state.more
        })
    }

    render() {
        const { data, headers, stackedProducts, feature } = this.props;
        let headings = ["Age", "Interest Channel", "Gender", "Session duration", "Season", "Product Category", "Quantity",
            "Clicks", "Impression"];
        return (
            <div className="container">
                <br></br><br></br><br></br>
                <h4 style={{ textAlign: "center" }}>Campaign Analytics</h4><hr></hr>

                <Button onClick={this.cluster.bind(this)}>Cluster wise breakdown of products</Button><br></br><hr></hr>
                {this.state.clus ?
                    <div className="container" style={{ display: 'inline-flex' }}>
                        <StackedColumnChart stackedProducts={stackedProducts ? stackedProducts : null} style={{ paddingLeft: '2em' }} />
                    </div> : ""}

                <Button onClick={this.randforest.bind(this)}>Random Forest Feature Importance</Button><br></br><hr></hr>
                {this.state.bar ? <div className="container"><BarChart data={feature? feature: null} /></div> : " "}

                <Button onClick={this.more.bind(this)}>More Analysis</Button><br></br>
                {this.state.more ? <div className="container" style={{ display: 'inline-flex' }}>
                    <HistoChart vals={data} X={"age"} Y={"total_conversion"} />
                    <Pie vals={data} />
                </div> : ""}<br></br>

                <h6 style={{float: 'right'}}><i>Right People - Right Time - Right Channel - Right Product </i></h6>
                <div className="container">
                <h4>K-Means Clustering Analysis - Attributes for the 4Rs</h4><br></br>
                    <Tabular headers={headers} data={data ? data: null} />
                </div>
                <br></br>
                <div className="container">
                    <h4>Random Forest Analysis - Contribution of attributes</h4><br></br>
                    <RFTable headers={headings} data={feature ? feature[0] : null} />
                </div>
                <div className="container">
                    <h4>Total number of observations</h4><br></br>
                    <ProductTable vals={stackedProducts}/>
                </div>

            </div>
        )
    }
}