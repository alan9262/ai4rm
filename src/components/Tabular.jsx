import React, { Component } from 'react';
import { Table, Alert, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class Tabular extends Component {
    state = {
        popoverOpen: false,
        setPopoverOpen: false,
        banner: ""
    }
    toggle = () => this.setState({setPopoverOpen: !this.state.popoverOpen});
    toggle1 = (e) => {
        this.setState({id: e.target.id});
    }
    render() {
        let count = 0;
        let tableID = 0;
        const { data, headers } = this.props;
        
        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {headers.map(header => {
                                return <th style={{background: "lightcoral"}}>{header}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data !== null ? data.map(row => {
                            let clusters = "Top ";
                            count++;
                            clusters = clusters + " " + row.product_1 + " buyers";
                            // row.cluster = clusters;
                            return (<tr>
                                <td>{clusters}</td>
                                <td>{row.Gender}</td>
                                <td>{row.clicks.toFixed(2)}</td>
                                <td>{row.age}</td>
                                <td>{row.time}</td>
                                <td>{row.channel}</td>
                                <td >{row.product_1}</td>
                                <td>{row.product_2}</td>
                                <td > {row.product_3}</td>
                                <td>{row.predict_conver.toFixed(2)}</td>
                            </tr>)
                        }) : null}
                    </tbody>
                </Table>
                
            </div>
        )
    }
}

export default Tabular;