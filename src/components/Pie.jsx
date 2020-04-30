
import React, { Component } from 'react';
import { Chart } from "react-google-charts";

export default class Pie extends Component {


    render() {
        const { vals } = this.props;
        var data2 = [[]];
        var clusterMessages = [];
        data2[0].push('Cluster', 'Value');
        vals.map((row, index) => {
            data2[0].push("Top" + " " + row.channel + " " + row.product_1 + " buyers", (1 / vals.length) * 100);
            clusterMessages.push(row.age, row.time, row.channel, row.product_1, row.product_2, row.product_3, row.Gender, row.predict_conver)
        })
        return (
            <div>
                <div style={{marginLeft: '5rem', marginTop: '3rem'}}>
            <Chart
                width={'1500px'}
                height={'1100px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [data2[0][0], data2[0][1], { role: "tooltip", type: "string", p: { html: true } }],
                    [data2[0][2], parseInt(data2[0][3]), "<ul><li><b> Preferred Age: </b>" + `${clusterMessages[0]}` + "</li><li><b> Preferred Time: </b>" + `${clusterMessages[1]}` + "</li><li><b> Preferred Channel: </b>" + `${clusterMessages[2]}` + "</li><li><b> Preferred Product 1: </b>" + `${clusterMessages[3]}` + "</li><li><b> Preferred Product 2: </b>" + `${clusterMessages[4]}` + "</li><li><b> Preferred Product 3: </b>" + `${clusterMessages[5]}` + "</li><li><b> Gender: </b>" + `${clusterMessages[6]}` + "</li><li><b> Predicted Conversion: </b>" + `${clusterMessages[7].toFixed(2) * 100}` + "% </li></ul>"],
                    [data2[0][4], parseInt(data2[0][5]), "<ul><li><b> Preferred Age: </b>" + `${clusterMessages[8]}` + "</li><li><b> Preferred Time: </b>" + `${clusterMessages[9]}` + "</li><li> <b>Preferred Channel: </b>" + `${clusterMessages[10]}` + "</li><li><b> Preferred Product 1: </b>" + `${clusterMessages[11]}` + "</li><li><b> Preferred Product 2: </b>" + `${clusterMessages[12]}` + "</li><li><b> Preferred Product 3: </b>" + `${clusterMessages[13]}` + "</li><li><b> Gender: </b>" + `${clusterMessages[14]}` + "</li><li><b> Predicted Conversion: </b>" + `${clusterMessages[15].toFixed(2) * 100}` + "% </li></ul>"],
                    [data2[0][6], parseInt(data2[0][7]), "<ul className='tooltip-list'><li><b> Preferred Age: </b>" + `${clusterMessages[16]}` + "</li><li><b> Preferred Time: </b>" + `${clusterMessages[17]}` + "</li><li><b> Preferred Channel: </b>" + `${clusterMessages[18]}` + "</li><li><b> Preferred Product 1: </b>" + `${clusterMessages[19]}` + "</li><li><b> Preferred Product 2: </b>" + `${clusterMessages[20]}` + "</li><li><b> Preferred Product 3: </b>" + `${clusterMessages[21]}` + "</li><li><b> Gender: </b>" + `${clusterMessages[22]}` + "</li><li><b> Predicted Conversion: </b>" + `${clusterMessages[23].toFixed(2) * 100}` + "% </li></ul>"],
                ]}

                options={{
                    title: '** The cut-out portion of the chart shows the most likely converted people.',
                    legend: 'Clusters',
                    animation: true,
                    tooltip: { isHtml: true, trigger: "visible" },
                    pieSliceText: 'label',
                    is3D: true,
                    slices: {
                        2: { offset: 0.2 }
                    }
                }}
                rootProps={{ 'data-testid': '5' }}
            />
            </div>
            </div>
        )
    }
}