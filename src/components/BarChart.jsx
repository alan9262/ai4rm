import React, { Component } from 'react';
import { Chart } from "react-google-charts";

export default class BarChart extends Component {

    render() {
        const { data } = this.props;
        console.log("BarChart pe hun ", data);
        return (
            <Chart
                width={'1000px'}
                height={'500px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Attributes', 'Contribution Value'],
                    ["Age", data[0].age],
                    ["Interest Channel", data[0].interest_channel],
                    ["Gender", data[0].Gender],
                    ["Session duration", data[0].session_duration_min],
                    ["Season", data[0].Season],
                    ["Product Category", data[0].product_category_name],
                    ["Quantity", data[0].Product_Ordered_Quantity],
                    ["Clicks", data[0].Clicks],
                    ["Impression", data[0].Impression]
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