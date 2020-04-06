import React, { Component } from 'react';

export default class Customer extends Component{

    state = { text: ""}

    componentWillMount(){
        this.setState({text: ""})
    }

    componentWillUnmount(){
        this.setState({text: ""})
    }

    render(){
        return(
            <h1 className="container">{this.state.text}</h1>
        )
    }
}