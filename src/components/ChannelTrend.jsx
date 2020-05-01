import React, { Component } from 'react';
import { Chart } from "react-google-charts";

export default class ChannelTrend extends Component {
    state = {
        channelProduct: {}
    }

    componentDidMount(){
        Promise.all([
            fetch("/getChannel")
          ])
            .then(([res1]) => Promise.all([res1.json()]))
            .then(([data1]) => this.setState({
              channelProduct: data1
            }));
            localStorage.setItem('channelProduct', this.state.channelProduct)
    }
    render() {
        const { data } = this.props;
        let data2 = [[]];
        Object.entries(data).forEach((key, value) => {
          data2.push(key, value);
        });
        var keys = [];
        
        return (<div>
            {this.state.channelProduct[0] ? (<Chart
                    width={'600px'}
                    height={'400px'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Channels', 'Products Sold'],
                        ['Email', this.state.channelProduct[0].Email],
                        ['Facebook', this.state.channelProduct[0].Facebook],
                        ['Instagram', this.state.channelProduct[0].Instagram],
                        ['SMS', this.state.channelProduct[0].SMS],
                        ['Twitter', this.state.channelProduct[0].Twitter],
                        ['Website Ad', this.state.channelProduct[0]["Website Ad"]],
                    ]}
                    options={{
                        title: 'Which channel are we using the most?',
                        legend: { position: 'absolute' },
                        enableInteractivity: true
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />) : ""}
                </div>

        )
    }
}

