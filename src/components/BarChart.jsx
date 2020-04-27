import React, { PureComponent } from 'react';
import { Chart } from "react-google-charts";

export default class BarChart extends PureComponent {

    render() {
        const { data } = this.props;
        return (
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Attributes', 'Contribution Value', { role: 'style' } ],
                    ["Age", data[0].age, 'color: gray'],
                    ["Interest Channel", data[0].interest_channel, 'color: gray'],
                    ["Gender", data[0].Gender, 'color: gray'],
                    ["Session duration", data[0].session_duration_min, 'color: gray'],
                    ["Season", data[0].Season, 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF'],
                    ["Product Category", data[0].product_category_name, 'color: #76A7FA'],
                    ["Quantity", data[0].Product_Ordered_Quantity, 'color: #76A7FA'],
                    ["Clicks", data[0].Clicks, 'color: #76A7FA'],
                    ["Impression", data[0].Impression, 'color: #76A7FA']
                ]}
                options={{
                    // Material design options
                    chart: {
                        title: 'Attribute Significance for prediction',
                        subtitle: 'How each attribute based on user data contributes to a prediction',
                    },
                    animation: {
                        startup: true,
                        easing: 'linear',
                        duration: 3000,
                      },
                      enableInteractivity: true,
                    }}
                    chartEvents={[
                      {
                        eventName: 'animationfinish',
                        callback: () => {
                          console.log('Animation Finished')
                        },
                      },
                    ]}
                rootProps={{ 'data-testid': '2' }}
            />

        )
    }
}