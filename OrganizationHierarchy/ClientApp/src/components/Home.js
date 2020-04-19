import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AddButton } from './AddButton';
import { EditForm } from './EditForm';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import "./Home.css";
import { PostCard } from './PostCard';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

require('highcharts/modules/sankey')(Highcharts);
require('highcharts/modules/organization')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);

var showPostCard = false;

const postCardDetails = {
    Name: "",
    Title: "",
    Email: "",
    Office: ""
}

const constOptions = {
    chart: {
        height: 900,
        inverted: true
    },

    title: {
        text: 'NAV Organization Hierarchy'
    },

    accessibility: {
        point: {
            descriptionFormatter: function (point) {
                var nodeName = point.toNode.name,
                    nodeId = point.toNode.id,
                    nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
                    parentDesc = point.fromNode.id;
                return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
            }
        }
    },
    plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        this.showpostcard = 1;
                        console.log(this.showpostcard);
                        Popup(this);
                        /*alert('\nName:        ' + this.id + '\nTitle:          ' + this.title
                            + '\nEmail:         ' + this.email + '\nOffice:        '+this.office);
                        postCardDetails.Name =  this.id;
                        postCardDetails.Title = this.title;
                        postCardDetails.Email= this.email;
                        postCardDetails.Office = this.office;
                        showPostCard = true;*/
                        
                    }
                }
            }
        }
    },
    series: [{
        type: 'organization',
        name: 'Highsoft',/*
        linkRadius: 0,
        linkLineWidth: 2,*/
        keys: ['from', 'to'],
        data: [["NAV", "Sudha Gupta"],
            ["NAV", "Nav Gupta"]],
        levels: [{
            level: 0,
            color: 'silver',
            dataLabels: {
                color: 'black'
            },
            height: 25
        }, {
            level: 1,
            color: 'silver',
            dataLabels: {
                color: 'black'
            },
            height: 25
        }, {
            level: 2,
            color: '#980104'

        }, {
            level: 4,
            color: '#359154'
        }],
        nodes: [{ "id": "NAV", "name": "NAV" }, { "id": "Sudha Gupta", "name": "Sudha Gupta","title":"CTO" }, {"id":"Nav Gupta","name":"Nav Gupta","title":"CEO"}],
        colorByPoint: false,
        color: '#007ad0',
        dataLabels: {
            color: 'white'
        },
        borderColor: 'white',
        nodeWidth: 90
    }],
    tooltip:
    {
        outside: true
    },
    exporting:
    {
        allowHTML: true,
        sourceWidth: 800,
        sourceHeight: 600
    }

}


/*
function Show(props) {
    return (*//*
        <Router>
        <div>
                <Route path='/postcard'>*//*
                    <PostCard />
               *//* </Route>
        </div>
        </Router>*//*
    );
}*/


function Popup(props) {



        /*return (
            <PostCard showpostcard={props.showpostcard} / >
        );*/
}

function DisplayChart(props) {
    return (
        <figure class="highcharts-figure">
            <div id="container">

                <HighchartsReact highcharts={Highcharts} options={props.stateOptions} />
            </div>
        </figure>
    );
}

export class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            relation: [], userNodes: [], stateOptions: {}, isUserRgistered: this.props.isUserRegistered,
            showEditForm: false , showPopup:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log("data ayega");
        this.populateRegisteredUserData();
        console.log("data aagaya");

    }

    handleSubmit() {
        this.setState({
            showEditForm: true
        })
    }

    render() {
        
        return this.state.showEditForm ? <EditForm /> : <div>
            <Button onClick={this.handleSubmit} > Edit and Sync </Button>
            <DisplayChart relationData={this.state.relation} nodeData={this.state.userNodes} stateOptions={this.state.stateOptions} />
        </div>;
        
    }

    async populateRegisteredUserData() {

        var relationTable = [];
        var singleRelation = [];
        var username = this.props.username;

        const responseForregisteredUserInformation = await fetch('api/registeredUserInformation');
        const data = await responseForregisteredUserInformation.json();
        

        var i;
        for (i = 0; i < data.length; i++) {
            singleRelation = [];
            singleRelation.push(data[i].reportingManagerUsername);
            var employeeUsername = data[i].employeeUsername;
            singleRelation.push(employeeUsername);
            relationTable.push(singleRelation);
        }
       
        var allUsers = [];

        
        for (i = 0; i < data.length; i++) {
            var singleUser = {};
            singleUser.id = data[i].employeeUsername;
            singleUser.name = data[i].displayName;
            singleUser.title = data[i].designation;
            singleUser.description = data[i].departmentName;
            singleUser.email = data[i].email;
            singleUser.office = data[i].office;
            singleUser.image = data[i].profilepicPath;
            singleUser.showpostcard = 0;
            allUsers.push(singleUser);
        }

        constOptions.series[0].data = relationTable;
        constOptions.series[0].nodes = allUsers;
        var nav = {};
        nav.id = "NAV";
        constOptions.series[0].nodes.push(nav);

        this.setState({ relation: relationTable, userNodes: allUsers, stateOptions: constOptions});
        
    }
}