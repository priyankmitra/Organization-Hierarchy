import React, { Component } from 'react';
import { EditForm } from './EditForm';
import { Button, Container, Header, Segment, Grid } from 'semantic-ui-react';

export class EditButton extends Component {
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
        return this.state.showForm ? <EditForm /> : <div>
            <Segment>
                
                        <Button onClick={this.handleSubmit} > Edit Details </Button>
                    
            </Segment>
        </div>;
    }
}