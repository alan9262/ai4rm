import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';


class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    submit(e) {
        e.preventDefault()
        let username = this.state.username;
        let password = this.state.password;
        this.props.onSignIn(username, password)
        
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center", padding: "1em" }}><b><b>TCS - AI4RM </b></b> </h1>
                <div className="login-form">
                    <Form onSubmit={this.submit.bind(this)}>
                        <h4 style={{ textAlign: "center" }}>Sign in</h4><hr></hr>
                        <FormGroup>
                            <Input onChange={e => this.setState({ username: e.target.value })} type="username" placeholder="username" />
                        </FormGroup>
                        <FormGroup>
                            <Input onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="password" />
                        </FormGroup>
                        <div style={{ textAlign: "center", padding: "1em" }}>
                            <Button>Login</Button>
                        </div>
                    </Form>
                </div>
            </div>

        )
    }


}

export default Login;