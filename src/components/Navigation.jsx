import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Customer from './Customer.jsx';
import App from '../App'
import {
    Nav,
    Button
} from 'reactstrap';

export default class Navigation extends Component {

    render() {
        const { isLoggedIn } = this.props;
        return (
            <div>
                {isLoggedIn ?
                    <div>
                        <Navbar bg="dark" variant="dark">
                            <Router>
                                <Navbar.Brand href="#home"><b>TCSAI4RM</b></Navbar.Brand>&nbsp;
                    <Nav className="mr-auto">
                                    <Link to="/analytics">Analytics </Link>&nbsp;&nbsp;&nbsp;
                      <Link to="/customer">Customer</Link>
                                </Nav>
                                <Switch>
                                    <Route path='/' component={Customer} />
                                    <Route path='/customer' component={Customer} />
                                    <Route path='/analytics' component={App} />
                                </Switch>
                                <Form inline>
                                    <Button variant="outline-info" onClick={this.props.toggleOpenFunction}>Logout</Button>
                                </Form>
                            </Router>
                        </Navbar>
                    </div> : <div><Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home"><b>TCSAI4RM</b></Navbar.Brand>
                    </Navbar></div>}</div>
        )
    }
}