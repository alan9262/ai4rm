import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class RFTable extends Component {
    render() {
        let count = 0;
        const { data, headers } = this.props;
        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th style={{background: "lightcoral"}}><b>{"Attribute"}</b></th>
                            <th style={{background: "lightcoral"}}><b>{"Contribution Value"}</b></th>
                        </tr>
                    </thead>
                    {data ? 
                    <tbody>
                        
                        <tr>
                            <td>{headers[0]}</td>
                            <td>{data.age.toFixed(4)}</td>
                        </tr>
                        <tr>
                            <td>{headers[1]}</td>
                            <td>{data.interest_channel.toFixed(4)}</td>
                        </tr>
                        <tr>
                            <td>{headers[2]}</td>
                            <td>{data.Gender.toFixed(4)}</td>
                        </tr>
                        <tr>
                            <td>{headers[3]}</td>
                            <td>{data.session_duration_min.toFixed(4)}</td>
                        </tr>
                        <tr>
                            <td>{headers[4]}</td>
                            <td>{data.Season.toFixed(4)}</td>
                        </tr>
                        <tr>
                            <td>{headers[5]}</td>
                            <td>{data.product_category_name.toFixed(4)}</td>
                        </tr>
                        <tr>
                            <td>{headers[6]}</td>
                            <td>{data.Product_Ordered_Quantity.toFixed(4)}</td>
                        </tr>
                        <tr>
                            <td>{headers[7]}</td>
                            <td>{data.Clicks.toFixed(4)}</td>
                        </tr>
                        <tr>
                            <td>{headers[8]}</td>
                            <td>{data.Impression.toFixed(4)}</td>
                        </tr>
                    </tbody>
                    : ""}
                </Table>
            </div>
        )
    }
}
