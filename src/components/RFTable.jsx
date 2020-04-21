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
                        <td><b>{"Attribute"}</b></td>
                            <td><b>{"Contribution Value"}</b></td>
                        </tr>
                    </thead>
                    {data ? 
                    <tbody>
                        
                        <tr>
                            <td>{headers[0]}</td>
                            <td>{data.age.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>{headers[1]}</td>
                            <td>{data.interest_channel.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>{headers[2]}</td>
                            <td>{data.Gender.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>{headers[3]}</td>
                            <td>{data.session_duration_min.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>{headers[4]}</td>
                            <td>{data.Season.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>{headers[5]}</td>
                            <td>{data.product_category_name}</td>
                        </tr>
                        <tr>
                            <td>{headers[6]}</td>
                            <td>{data.Product_Ordered_Quantity.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>{headers[7]}</td>
                            <td>{data.Clicks.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>{headers[8]}</td>
                            <td>{data.Impression.toFixed(2)}</td>
                        </tr>
                    </tbody>
                    : ""}
                </Table>
            </div>
        )
    }
}
