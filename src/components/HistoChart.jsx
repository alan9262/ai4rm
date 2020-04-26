import React, { Component } from 'react';
import { Chart } from "react-google-charts";

export default class HistoChart extends Component {
  render() {
    const { vals } = this.props;
    let data2 = [[]];
    Object.entries(vals).forEach(([key, value]) => {
      data2.push(key, value);
    })
    var keys = [];
    var values = [];
    values[0] = data2[2] ? data2[2]["00:00 - 06:00"] : 0;
    values[1] = data2[2] ? data2[2]["00:06 - 12:00"] : 0;
    values[2] = data2[2] ? data2[2]["12:00 - 18:00"] : 0;
    values[3] = data2[2] ? data2[2]["18:00 - 23:59"] : 0;
    console.log("keys ", keys);
    console.log("values ", values);

    return (
      <Chart
        width={'600px'}
        height={'400px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Time', 'Products Sold'],
          ['Post midnight 00:00 - 06:00', Math.round(values[0])],
          ['Post midnight 00:06 - 12:00', Math.round(values[1])],
          ['Afternoon 12:00 - 18:00', Math.round(values[2])],
          ['Evening 18:00 - 23:59', Math.round(values[3])],
        ]}
        options={{
          title: 'When are we selling most products?',
          legend: { position: 'fixed' },
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    )
  }
}

