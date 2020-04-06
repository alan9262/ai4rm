import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Tabular extends Component {

    render() {
        let count = 0;
        const { data, headers } = this.props;
        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {headers.map(header =>{
                                return <th>{header}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                   
                        {data.map(row =>{
                            count++;
                            return ( <tr>
                                <td>{count}</td>
                                <td>{row.gender}</td>
                                <td>{row.clicks}</td>
                                <td>{row.total_conversion}</td>
                                <td>{row.age}</td>
                                <td>{row.product_1}</td>
                                <td>{row.product_2}</td>
                                <td>{row.product_3}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Tabular;