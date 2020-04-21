import React, { Component } from 'react';
import { Chart } from "react-google-charts";

export default class StackedColumnChart extends Component {

    
    render() {
        const { stackedProducts } = this.props;
        var values = []
        var names = [];
        var ob = [];
        console.log("here in stackedProducts", stackedProducts);
        if(stackedProducts !== undefined || stackedProducts !== null ){
            for (var key of Object.keys(stackedProducts)) {
                if (key !== "_id") {
                    ob.push(key);
                }
            }
        }
        
        // Object.entries(stackedProducts).forEach(entry => {
        //     console.log(entry[0]);
        //     console.log(entry[1]);
        //     //use key and value here
        //   });

        // var output = {
        //     fieldName: "",
        //     fieldValue: []
        // };

        // ob.forEach(function (item) {
        //     var existing = output.filter(function (v, i) {
        //         return v.name == item.name;
        //     });
        //     if (existing.length) {
        //         var existingIndex = output.indexOf(existing[0]);
        //         output[existingIndex].value = output[existingIndex].value.concat(item.value);
        //     } else {
        //         if (typeof item.value == 'string')
        //             item.value = [item.value];
        //         output.push(item);
        //     }
        // });
        // console.log(ob);
        // for (let [key, value] of Object.entries(ob)) {
        //     console.log(`${key}: ${value[0]}`);
        //   }
        let myMap = new Map();
        let list = [];
        // ob.map((row) =>{
        //     names.map(name =>{
        //         if(myMap.has(name)){
        //             let tmpList = [];
        //             console.log(myMap.get(name));
        //             tmpList.push(myMap.get(name));
        //             tmpList.find(myMap.get(name)).push(row[name]);
        //             myMap.set(name, tmpList);
        //         }else{
        //             myMap.set(name, row[name]);
        //         }
                
        //     })
        //     console.log(myMap);
        // })
        // myMap.forEach((value, key) => {
        //     list.push(key, value);
        //   })
        list.push(['Product', 'Cluster 1', 'Cluster 2', 'Cluster 3']);
        Object.entries(stackedProducts).forEach(([key, value]) => {
            if(key !== "_id"){
                list.push(`${key}`, value)
                // list.push(value);
            }
            //use key and value here
          })
          names.push(list);
          var vals= [];
       Object.entries(names[0]).forEach(([key, value]) => {
            console.log("here alan ------ ", key, value);
            //use key and value here
            vals.push(key, value);
          })
          console.log("Alan ----- ", vals);
        
            
            //use key and value here
        return (
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [vals[1][0], vals[1][1], vals[1][2], vals[1][3]],
                    [ob[0], vals[5][0], vals[5][1], vals[5][2]],
                    [ob[1], vals[9][0], vals[9][1], vals[9][2]],
                    [ob[2], vals[13][0], vals[13][1], vals[13][2]]
                ]}
            //    data = {names[0]}
            //    data = {Object.entries(names[0]).forEach(([key, value]) => {
            //     console.log(key, value);
            //     //use key and value here
            //   })}
                
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
                }}
                // For tests
                rootProps={{ 'data-testid': '1' }}
            />
        )
    }
}