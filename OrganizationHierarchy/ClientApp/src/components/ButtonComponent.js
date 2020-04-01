import React, { Component } from 'react';
import { RegistrationForm } from './RegistrationForm';
import { Button, Container, Header, Segment, Grid } from 'semantic-ui-react';

export class ButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.setState({
            showForm: true
        })
    }
    render() {
        return this.state.showForm ? <RegistrationForm /> : <div className="container-Add">
            <Segment className= "ui navy blue inverted segment" style={{ margin: 70 }} inverted>
                <Header as="h2" textAlign="center" style={{ leftmargin: 150, margin: 50 }}>Username is not registered. Click on "Add me" to register yourself.</Header>
                <Grid>
                    <Grid.Column textAlign="center">
                        <Button onClick={this.handleSubmit} style={{ textAlign: "center" }}> Add Me </Button>
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>;
    }
}