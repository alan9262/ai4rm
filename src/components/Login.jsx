import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Example from './Carousel';


class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    submit(e){
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        this.props.onSignIn(username, password);
    }

    render() {
        const { logout } = this.props;
        // if(logout){
        //     this.setState({username: '', password: ''})
        // }
        return (

            <div>
                <div className="header-app">
                    <Example />
                </div>
                <div className="login-form">
                    <Form onSubmit={this.submit.bind(this)}>
                        <h4 className="signin-text">Sign in</h4><hr></hr>
                        <FormGroup>
                            <Input onChange={e => this.setState({ username: e.target.value })} type="username" placeholder="username" />
                        </FormGroup>
                        <FormGroup>
                            <Input onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="password" />
                        </FormGroup>
                        <div style={{ textAlign: "center", padding: "1em" }}>
                            <Button variant="outline-dark">Login</Button>
                        </div>
                    </Form>
                </div>
            </div>

        )
    }


}

export default Login;