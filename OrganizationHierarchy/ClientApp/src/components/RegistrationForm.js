import React, { Component } from 'react';
import { Form, Input, Segment, Button, Grid } from 'semantic-ui-react';
export class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ReportingManagerUserName:"",
            EmployeeUsername: "",
            Email: "",
            Profilepic: "",
            UserRegisteredOrNot: 0,
            DepartmentName: "",
            Designation: "",
            Office: "",
            Region: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        //console.log(JSON.parse(JSON.stringify(this.state)));

        const data = new FormData(event.target);
        console.log(this.state);
        console.log(data.get('ReportingManagerUsername'));
        fetch('api/registerUser', {
            method: 'POST',
            body: data

        }).then((response) => response.json())

            .then((responseJson) => {
                console.log(responseJson);

            });
    }
    render() {
        return <div class="ui navy blue inverted segment" style={{ marginLeft: 400, marginRight: 400, marginTop: 20 }}>
            <Form onSubmit={this.handleSubmit} >

                <Form.Field fluid>
                    <label>Employee Username</label>
                    <Input type='name' name='EmployeeUsername' placeholder='Username' defaultValue={this.state.EmployeeUsername} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field fluid>
                    <label>Email</label>
                    <Input type='email' name='Email' placeholder='example@gmail.com' defaultValue={this.state.Email} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field fluid>
                    <label>Designation</label>
                    <Input type='designation' name='Designation' placeholder='enter designation name' defaultValue={this.state.Designation} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field fluid>
                    <label>Department Name</label>
                    <Input type='department' name='DepartmentName' placeholder='enter department name' defaultValue={this.state.DepartmentName} onChange={this.handleChange} />
                </Form.Field>
                {/*<Form.Field fluid>
                    <label>Profilepic</label>
                    <Input type='file' name='profilepic' placeholder='example@gmail.com' onChange={this.handleChange} />
                </Form.Field>
                /*<Form.Field fluid label='ReportingManagerUsername' control='select' onChange={this.handleChange}>
                    <option value='anil'>Anil Kumar Modest</option>
                    <option value='puneet'>Puneet Singhal</option>
                    <option value='aniruddha'>Aniruddha Jain</option>
                    <option value='rahul'>Rahul Gupta</option>
                </Form.Field>*/}
                <Form.Field fluid>
                    <label>OfficeName</label>
                    <Input type='office' name='Office' placeholder='enter region' defaultValue={this.state.Office} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field fluid>
                    <label>Region</label>
                    <Input type='region' name='Region' placeholder='enter office' defaultValue={this.state.Region} onChange={this.handleChange} />
                </Form.Field>
                <Grid>
                    <Grid.Column textAlign="center">
                        <Form.Field>
                            <Button type="submit" color='blue'>Submit</Button>
                        </Form.Field>
                    </Grid.Column>
                </Grid>
            </Form>
        </div>
    }
}
