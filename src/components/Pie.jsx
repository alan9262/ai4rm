
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
        data2[0].push('Cluster', 'Gender');
        vals.map( (row, index) =>{
            data2[0].push(index, row.channel);
        })
        console.log(data2);
        return (
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Cluster', 'Gender'],
                    ['Cluster 1', 22],
                    ['Cluster 2', 11],
                    ['Cluster 3', 11]
                ]}
                options={{
                    title: 'My Daily Activities',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        )
    }
}