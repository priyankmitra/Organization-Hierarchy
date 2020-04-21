import React, { Component } from 'react';
import { Form, Input, Segment, Button, Grid } from 'semantic-ui-react';

import { Home } from './Home';
export class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EmployeeId: "",
            DisplayName: "",
            ReportingManagerUserName: "",
            EmployeeUsername: "",
            Email: "",
            Profilepic: null,
            UserRegisteredOrNot: 0,
            DepartmentName: "",
            Designation: "",
            Office: "",
            Region: "",
            showChart: false,
            RmList: []
        };
        this.setAdData();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        /*console.log(this.state);
        console.log(data.get('ReportingManagerUsername'));*/
        fetch('api/registerUser', {
            method: 'POST',
            body: data

        }).then((Response) => {
            if (Response.status === 200) {
                alert("Data Sucessfully Updated.");
            }
            this.setState({
                showChart: true
            });
        }).catch((error) => console.log(error));

    }
    render() {
        return this.state.showChart ? <Home isUserRegistered={1} /> : <div class="ui navy blue inverted segment" style={{ marginLeft: 400, marginRight: 400, marginTop: 20 }}>
            
            <h2>Update your details!</h2>

            <Form onSubmit={this.handleSubmit}  >
                <Form.Field fluid>
                    <label>Employee Id</label>
                    <Input readOnly type='id' name='EmployeeId' placeholder='Employee Id' defaultValue={this.state.EmployeeId} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field fluid>
                    <label>Employee Display Name</label>
                    <Input readOnly type='displayname' name='DisplayName' placeholder='Display Name' defaultValue={this.state.DisplayName} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field fluid>
                    <label>Employee Username</label>
                    <Input readOnly type='name' name='EmployeeUsername' placeholder='Username' defaultValue={this.state.EmployeeUsername} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field fluid>
                    <label>Email</label>
                    <Input readonly="" type='email' name='Email' placeholder='example@gmail.com' defaultValue={this.state.Email} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field fluid>
                    <label>Designation</label>
                    <Input readonly="" type='designation' name='Designation' placeholder='enter designation name' defaultValue={this.state.Designation} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field fluid>
                    <label>Department Name</label>
                    <Input readOnly="" type='department' name='DepartmentName' placeholder='enter department name' defaultValue={this.state.DepartmentName} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field fluid label='ReportingManagerUsername' required name='ReportingManagerUserName' control='select' defaultValue="hello" onChange={this.handleChange}>
                    <option value=''>Select Reporting Manager</option>
                    {this.state.RmList.map(rm =>

                        <option key={rm.employeeId} value={rm.employeeUsername}>{rm.displayName}({rm.employeeUsername})</option>

                    )}
                </Form.Field>
                <Form.Field fluid>
                    <label>Profile Picture</label>
                    <Input type='file' name='profilepic' placeholder='example@gmail.com' onChange={this.handleChange} />
                </Form.Field>
              
                <Form.Field fluid>
                    <label>Office Name</label>
                    <Input readonly="" type='office' name='Office' placeholder='enter region' defaultValue={this.state.Office} onChange={this.handleChange} />
                </Form.Field>
                <Form.Field fluid>
                    <label>Region</label>
                    <Input readonly="" type='region' name='Region' placeholder='enter office' defaultValue={this.state.Region} onChange={this.handleChange} />
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

    async setAdData() {
        const response = await fetch('api/ad_data');
        const data = await response.json();

        const Rmresponse = await fetch('api/rm_data');
        const RmData = await Rmresponse.json();
        this.setState({

            EmployeeId: data[0].employeeId,
            DisplayName: data[0].displayName,
            EmployeeUsername: data[0].employeeUsername,
            Email: data[0].email,
            DepartmentName: data[0].department,
            Designation: data[0].designation,
            Office: data[0].officeName,
            Region: data[0].region ,
            RmList: RmData
        });
        console.log(this.state);
    }
}
