import React, { Component } from 'react';
import { Chart } from "react-google-charts";

export default class StackedColumnChart extends Component {


    render() {
        const { stackedProducts } = this.props;
        var values = [" lovers", " buyers", " pros"]
        var names = [];
        var ob1 = [];
        var ob = [];
        let i =0;
        console.log("here in stackedProducts", stackedProducts);
        for (var key of Object.keys(stackedProducts)) {
            if (key !== "_id") {
                ob1.push(key + values[i]);
                i++;
            }
        }

        var products = stackedProducts;
        delete products["_id"];
        console.log("products  ", products);

        // let coolStuff = Object.values(products).reduce((t, {Cool Stuff}) => t + value, 0)

        var myMap = new Map();
        let j = 0;
        for (let cluster in products) {
            ob.push(cluster + values[j++]);
            for (let category in cluster) {
                
                // console.log("category  ", category);
                if (!myMap.get(category)) {
                    myMap.set(category, [cluster[category]]);
                } else {
                    let list = [];
                    myMap.set(category, list.push(myMap.get(category), (cluster[category])));
                }
            }

        }
        console.log("myMap  ", myMap);
        let list = [];

        list.push(['Product', 'Cluster 1', 'Cluster 2', 'Cluster 3']);
        Object.entries(stackedProducts).forEach(([key, value]) => {
            if (key == "_id") {
                list.push(`${key}`, value)
                // list.push(value);
            }
            //use key and value here
        })
        names.push(list);
        var vals = [];
        var data1 = [[]];
        data1[0].push(list);

        Object.entries(names[0]).forEach(([key, value]) => {
            //use key and value here
            vals.push(key, value);
        })
        // data={[
        //     ["Product", ob[0], ob[1], ob[2]],
        //     [ob[0], vals[5][0], vals[5][1], vals[5][2]],
        //     [ob[1], vals[9][0], vals[9][1], vals[9][2]],
        //     [ob[2], vals[13][0], vals[13][1], vals[13][2]]
        // ]}
        console.log("vals   ", vals, ob);
        //use key and value here
        return (
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ["Product", ob[0], ob[1], ob[2]],
                    [ob[0], stackedProducts["Cluster 1"]["Cool Stuff"], stackedProducts["Cluster 2"]["Cool Stuff"], stackedProducts["Cluster 3"]["Cool Stuff"]],
                    [ob[1], stackedProducts["Cluster 1"]["Fashion"], stackedProducts["Cluster 2"]["Fashion"], stackedProducts["Cluster 3"]["Fashion"]],
                    [ob[2], stackedProducts["Cluster 1"]["Mobile"], stackedProducts["Cluster 2"]["Mobile"], stackedProducts["Cluster 3"]["Mobile"]],
                ]}

                options={{
                    title: 'Cluster wise breakdown of products',
                    chartArea: { width: '50%' },

                    hAxis: {
                        title: 'Total Products',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'Product Categories',
                    },
                    bars: 'horizontal',
                    axes: {
                        y: {
                            0: { side: 'right' },
                        },
                    },
                    animation: {
                        startup: true,
                        easing: 'linear',
                        duration: 1000,
                    },
                    enableInteractivity: false,
                }}
                chartEvents={[
                    {
                        eventName: 'animationfinish',
                        callback: () => {
                            console.log('Animation Finished')
                        },
                    },
                ]}
                // For tests
                rootProps={{ 'data-testid': '1' }}
            />

        )
    }
}