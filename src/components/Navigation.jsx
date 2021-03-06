import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Form, Button, Navbar } from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';
import {
    Nav
} from 'reactstrap';

export default class Navigation extends Component {

    onMarketClick = () => {
        this.props.renderPage("market");
    }

    onCustomerCLick = () => {
        this.props.renderPage("customer");
    }
    onDataSClick = () => {
        this.props.renderPage("datas");
    }

    toggle(){
        this.props.toggleOpenFunction();
    }

    render() {
        const { isLoggedIn, role, user } = this.props;
        return (
            <div>
                {isLoggedIn ?
                    <div>
                        <Navbar bg="dark" variant="dark">
                            <Router>
                                <Navbar.Brand href="#home"><b>TCSAI4RM</b></Navbar.Brand>&nbsp;
                    <Nav className="mr-auto">
                                    {role === 'admin' ? (<span style={{ display: "inline-flex" }}>
                                        <Button variant="outline-info" onClick={this.onMarketClick}>Marketer</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button style={{ textAlign: "flex-inline" }} variant="outline-info" onClick={this.onCustomerCLick}>Customer</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button style={{ textAlign: "flex-inline" }} variant="outline-info" onClick={this.onDataSClick}>Data Scientist</Button>
                                    </span>) : ""}
                                    
                                </Nav>
                                <Form inline>
                                        <h6 style={{color: "aliceblue", margin: "auto"}}>Welcome, {user}!</h6>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-info" onClick={this.toggle.bind(this)}>Logout</Button>
                                </Form>
                            </Router>
                        </Navbar>
                    </div> : <div><Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home"><b>TCSAI4RM</b></Navbar.Brand>
                    </Navbar></div>}</div>
        )
    }
}