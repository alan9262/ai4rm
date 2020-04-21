import React, { Component } from 'react';
import { Table, Alert, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class Tabular extends Component {
    state = {
        popoverOpen: false,
        setPopoverOpen: false,
        id: ""
    }
    toggle = () => this.setState({setPopoverOpen: !this.state.popoverOpen});
    toggle1 = (e) => {
        console.log("event here  ", e);
        this.setState({id: e.target.id});
    }
    render() {
        let count = 0;
        let tableID = 0;
        const { data, headers } = this.props;
        let stats = Math.max.apply(Math, data.map(function (o) { return [o.age, o.time, o.channel, o.predict_conver]; }))
        let stats2 = data.filter(elem => elem.predict_conver > 0.59)
        console.log("opo ", this.state.popoverOpen , "   id here ", this.state.id);

        
        return (
            <div>
                {/* <Popover isOpen={this.state.setPopoverOpen} target={this.state.id} toggle={this.toggle}>
                    <PopoverHeader>Most Selling Products</PopoverHeader>
                    <PopoverBody>
                        {this.state.id === 1 ? <div><ul>
                            Calvin Klein.
                            Yves Saint Laurent.
                            Dolce  Gabbana.
                        </ul></div>: ""}
                        {this.state.id === 2 ? <div><ul>
                            Product Category 2.
                            Product Category 3.
                            Product Category 4.
                        </ul></div>: ""}
                        {this.state.id === 3 ? <div><ul>
                            Product Category 5.
                            Product Category 6.
                            Product Category 7.
                        </ul></div>: ""}
                    </PopoverBody>
                </Popover>
                <Popover placement="bottom" isOpen={this.state.setPopoverOpen} target="product_2" toggle={this.toggle}>
                    <PopoverHeader>Popover Title</PopoverHeader>
                    <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                </Popover>
                <Popover placement="bottom" isOpen={this.state.setPopoverOpen} target="product_3" toggle={this.toggle}>
                    <PopoverHeader>Popover Title</PopoverHeader>
                    <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                </Popover> */}
                <br></br>
                <Alert color="primary">
                    Target to sell for age group {stats2[0].age} during {stats2[0].time} through the channel {stats2[0].channel} as it has the highest prediction for conversion {stats2[0].predict_conver.toFixed(2)}
                </Alert>
                <p><b>Total number of clusters:</b> {data.length}</p>
                <p><b>Most Bought Product Category:</b> {data !== null ? data[0].product_1 : ""}</p>
                <p><b>Preferred Channel:</b> {data ? data[0].channel : ""}</p>
                <p><b>Preferred Time:</b> {data ? data[0].time : ""}</p>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {headers.map(header => {
                                return <th>{header}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data !== null ? data.map(row => {
                            let clusters = "Cluster_";
                            count++;
                            clusters = clusters + count + "_" + row.product_1;
                            row.cluster = clusters;
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