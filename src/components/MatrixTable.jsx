import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class MatrixTable extends Component {

    render() {
        let count = 0;
        var headers = [];
        var tableKeys = [];
        var valueKeys = [];
        const { data, flag } = this.props;
        console.log("matrix", this.props);
        if (flag === 1) {
            headers = ["Confusion Matrix", ""]
        } else {
            headers = ["Time of the day", "Products bought"]
        }
        if(data[0]){
            Object.entries(data[0]).forEach(([key, value]) => {
                tableKeys.push(key);
                valueKeys.push(value);
    
            })
        }

        if(tableKeys[5] && valueKeys[5]){
            this.props.accuracy(valueKeys[5]);
            
        }
        

        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        
                        {flag !== 1 ? <tr>
                            <td><b>{headers[0]}</b></td>
                            <td><b>{headers[1]}</b></td>
                        </tr> : " "}
                    </thead>
                    < tbody >
                        <tr>
                            <td>{tableKeys[1]}</td>
                            <td>{valueKeys[1]}</td>
                        </tr>
                        <tr>
                            <td>{tableKeys[2]}</td>
                            <td>{valueKeys[2]}</td>
                        </tr>
                        <tr>
                            <td>{tableKeys[3]}</td>
                            <td>{valueKeys[3]}</td>
                        </tr>
                        <tr>
                            <td>{tableKeys[4]}</td>
                            <td>{valueKeys[4]}</td>
                        </tr>
                        </tbody>
                </Table>
            </div >
        )
    }
}
