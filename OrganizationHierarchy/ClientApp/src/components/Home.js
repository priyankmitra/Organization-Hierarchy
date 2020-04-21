import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, Header, Image, Modal, Icon, Card } from 'semantic-ui-react';
import "./Home.css";

import { AddButton } from './AddButton';
import { EditForm } from './EditForm';
import PostCardModal from './PostCardModal';
import EditFormModal from './EditFormModal';


require('highcharts/modules/sankey')(Highcharts);
require('highcharts/modules/organization')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);

const constOptions = {
    chart: {
        height: 600,
        inverted: true
    },

    title: {
        text: ""
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
                        Popup(this.options);
                    }
                }
            }
        }
    },
    series: [{
        type: 'organization',
        name: 'Highsoft',
        /*linkRadius: 0,
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
            color: '#980103'

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
        nodeWidth: 80
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

function Popup(props) {        
    this.setState({
        showPopup: true,
        image: props.image,
        name: props.name,
        email : props.email,
        designation:props.title,
        department:props.description,
        office: props.office
    })
    
}

function DisplayChart(props) {
    return (
        <figure className="highcharts-figure">
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
            showEditForm: false, showPopup: false,
            employeeId: "", image: "", name: "", email: "", designation: "", department: "", office: "",

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        Popup = Popup.bind(this);
    }

    componentDidMount() {
        this.populateRegisteredUserData();
    }

    handleSubmit() {
        this.setState({
            showEditForm: true
        })
    }
    
   
    render() {
        return (
            <div>
                <Button onClick={this.handleSubmit}  > Sync and Edit </Button>
                <EditFormModal
                    modalOpen={this.state.showEditForm}
                    handleClose={
                        () => {
                            this.setState({ showEditForm: false })
                        }
                    }

                />

                <PostCardModal 
                    modalOpen={this.state.showPopup}
                    handleClose={
                        () => {
                            this.setState({ showPopup: false })
                        }
                    }
                    image={this.state.image}
                    name={this.state.name}
                    email={this.state.email}
                    designation={this.state.designation}
                    department={this.state.department}
                    office={this.state.office}
                    reportingManager={this.state.reportingManager}
                />
                <DisplayChart relationData={this.state.relation} nodeData={this.state.userNodes} stateOptions={this.state.stateOptions} />
            </div>
            );
        
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
            singleUser.reportingManager = data[i].reportingManagerUsername;
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