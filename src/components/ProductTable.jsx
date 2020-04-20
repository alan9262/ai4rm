import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class ProductTable extends Component {

    render() {
        let count = 0;
        const { vals, headers } = this.props;
        return (
            < div >
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <td><b>Product Category</b></td>
                        <td><b>Total observations</b></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Product Category</b></td>
                        <td><b>Total observations</b></td>
                    </tr>
                </tbody>
            </Table>
            </div >
        )
    }
}