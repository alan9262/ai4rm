import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Tabular extends Component {
   
    render() {
        let count = 0;
        
        const { data, headers } = this.props;
        return (
            <div>
                <p><b>Total number of clusters:</b> {data.length}</p>
                <p><b>Most Bought Product Category:</b> {data!== null ? data.product_1 : ""}</p>
                <p><b>Preferred Channel:</b> {data ? data.channel : ""}</p>
                <p><b>Preferred Time:</b> {data ? data.time : ""}</p>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {headers.map(header =>{
                                return <th>{header}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data !== null ? data.map(row =>{
                            let clusters = "Cluster_";
                            count++;
                            clusters = clusters + count + "_" + row.product_1;
                            return ( <tr>
                                <td>{clusters}</td>
                                <td>{row.Gender}</td>
                                <td>{row.clicks.toFixed(2)}</td>
                                <td>{row.age}</td>
                                <td>{row.time}</td>
                                <td>{row.channel}</td>
                                <td>{row.product_1}</td>
                                <td>{row.product_2}</td>
                                <td>{row.product_3}</td>
                                <td>{row.predict_conver.toFixed(2)}</td>
                                </tr>)
                        }): null }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Tabular;