import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { RegistrationForm } from './components/RegistrationForm';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isUserRegistered:0
        }
    }

    componentDidMount() {
        this.populateUsernaameData();
    }
    render() {

        if (this.state.isUserRegistered === 0) {
            return (
                <div>
                    <Layout username={this.state.username} />
                    <RegistrationForm />
                </div>
            );
        }
        else {
            return (
                <div>
                    <Layout username={this.state.username} />
                    <Home username={this.state.username} isUserRegistered={this.state.isUserRegistered} />
                </div>
            );
        }
      
    }
    async populateUsernaameData() {
        const response = await fetch('api/username');
        const data = await response.json();
        const responseForRegisterUser = await fetch('api/isRegisteredUserOrNot');
        const isUserRegistered = await responseForRegisterUser.json();
        this.setState({ username: data[0], isUserRegistered: isUserRegistered});

    }
}
