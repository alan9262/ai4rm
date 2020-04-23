import React, { Component } from 'react';
import { Chart } from "react-google-charts";

export default class BarChart extends Component {

    render() {
        const { data } = this.props;
        return (
            <Chart
                width={'800px'}
                height={'300px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Attributes', 'Contribution Value', { role: 'style' } ],
                    ["Age", data[0].age, 'color: gray'],
                    ["Interest Channel", data[0].interest_channel, 'color: #76A7FA'],
                    ["Gender", data[0].Gender, 'opacity: 0.2'],
                    ["Session duration", data[0].session_duration_min, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF'],
                    ["Season", data[0].Season, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2'],
                    ["Product Category", data[0].product_category_name, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2'],
                    ["Quantity", data[0].Product_Ordered_Quantity, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2'],
                    ["Clicks", data[0].Clicks, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2'],
                    ["Impression", data[0].Impression, 'stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2']
                ]}
                options={{
                    // Material design options
                    chart: {
                        title: 'Random Forest Attribute Significance',
                        subtitle: 'How each attribute contributes to a prediction',
                    },
                }}
                // For tests
                rootProps={{ 'data-testid': '2' }}
            />

        )
    }
}