
import React, { Component } from 'react';
import { Chart } from "react-google-charts";

export default class Pie extends Component {


    render() {
        const { vals } = this.props;
        let data = [
            ['Task', 'Hours per Day'],
            ['Work', 11],
            ['Eat', 2],
            ['Commute', 2],
            ['Watch TV', 2],
            ['Sleep', 7],
        ];
        let data2 = [[]];
        data2[0].push('Cluster', 'Value');
        vals.map((row, index) => {
            data2[0].push(row.product_1+"_pros", (1/vals.length)*100);
        })
        console.log("data here " + data2);
        return (
            <Chart
                width={'800px'}
                height={'400px'}
                chartType="PieChart"
                is3D="true"
                loader={<div>Loading Chart</div>}
                data={[
                    [data2[0][0], data2[0][1]],
                    [data2[0][2], parseInt(data2[0][3])],
                    [data2[0][4], parseInt(data2[0][5])],
                    [data2[0][6], parseInt(data2[0][7])],
                ]}
                options={{
                    title: 'Different segments of our users',
                    legend: 'Clusters',
                    tooltip: { trigger: 'selection' },
                    pieSliceText: 'label',
                    slices: {
                        2: { offset: 0.2 }
                    },
                }}
                rootProps={{ 'data-testid': '5' }}
            />
        )
    }
}