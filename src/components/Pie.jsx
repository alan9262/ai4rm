
import React, { Component } from 'react';
import { Chart } from "react-google-charts";

export default class Pie extends Component {


    render() {
        const { vals } = this.props;
            var data2 = [[]];
            var clusterMessages = [];
            data2[0].push('Cluster', 'Value');
            vals.map((row, index) => {
                data2[0].push(row.product_1+"_pros", (1/vals.length)*100);
                clusterMessages.push(row.age, row.time, row.channel, row.product_1, row.product_2, row.product_3, row.Gender, row.predict_conver)
            })
            console.log("data here " + clusterMessages);

        
        return (
            <Chart
                width={'1000px'}
                height={'800px'}
                chartType="PieChart"
                is3D={'true'}
                loader={<div>Loading Chart</div>}
                data={[
                    [data2[0][0], data2[0][1], { role: "tooltip", type: "string", p: { html: true } }],
                    [data2[0][2], parseInt(data2[0][3]), "<ul><li> Preffered Age: " + `${clusterMessages[0]}` + "</li><li> Preffered Time: " + `${clusterMessages[1]}` + "</li><li> Preffered Channel: " + `${clusterMessages[2]}` + "</li><li> Preffered Product 1: " + `${clusterMessages[3]}` + "</li><li> Preffered Product 2: " + `${clusterMessages[4]}` + "</li><li> Preffered Product 3: " + `${clusterMessages[5]}` + "</li><li> Gender: " + `${clusterMessages[6]}` + "</li><li> Predicted Conversion: " + `${clusterMessages[7].toFixed(2)*100}` + "% </li></ul>"],
                    [data2[0][4], parseInt(data2[0][5]), "<ul><li> Preffered Age: " + `${clusterMessages[8]}` + "</li><li> Preffered Time: " + `${clusterMessages[9]}` + "</li><li> Preffered Channel: " + `${clusterMessages[10]}` + "</li><li> Preffered Product 1: " + `${clusterMessages[11]}` + "</li><li> Preffered Product 2: " + `${clusterMessages[12]}` + "</li><li> Preffered Product 3: " + `${clusterMessages[13]}` + "</li><li> Gender: " + `${clusterMessages[14]}` + "</li><li> Predicted Conversion: " +  `${clusterMessages[15].toFixed(2)*100}` + "% </li></ul>"],
                    [data2[0][6], parseInt(data2[0][7]), "<ul><li> Preffered Age: " + `${clusterMessages[16]}` + "</li><li> Preffered Time: " + `${clusterMessages[17]}` + "</li><li> Preffered Channel: " + `${clusterMessages[18]}` + "</li><li> Preffered Product 1: " + `${clusterMessages[19]}` + "</li><li> Preffered Product 2: " + `${clusterMessages[20]}` + "</li><li> Preffered Product 3: " + `${clusterMessages[21]}` + "</li><li> Gender: " + `${clusterMessages[22]}` + "</li><li> Predicted Conversion: " + `${clusterMessages[23].toFixed(2)*100}` + "% </li></ul>"],
                ]}
                options={{
                    title: 'Different segments (clusters) of our users',
                    legend: 'Clusters',
                    tooltip: { isHtml: true, trigger: "visible" },
                    pieSliceText: 'label',
                    slices: {
                        0: { offset: 0.2 }
                    },
                }}
                rootProps={{ 'data-testid': '5' }}
            />
        )
    }
}