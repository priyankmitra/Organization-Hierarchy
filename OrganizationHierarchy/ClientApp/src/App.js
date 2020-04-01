import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            username : ""
        }
    }

    componentDidMount() {
        this.populateUsernaameData();
    }
    render() {
        
      return (
        <div>
            <Layout username={this.state.username} />
            <Home username={this.state.username} />
        </div>
    );
    }
    async populateUsernaameData() {
        const response = await fetch('api/username');
        const data = await response.json();
        this.setState({username : data[0]});

    }
}
