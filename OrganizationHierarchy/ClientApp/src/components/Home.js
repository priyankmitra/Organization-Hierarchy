import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ButtonComponent } from './ButtonComponent';

import "./Home.css";

require('highcharts/modules/sankey')(Highcharts);
require('highcharts/modules/organization')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);


const constOptions = {
    chart: {
        height: 700,
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

function DisplayChart(props) {
    return (
        <figure class="highcharts-figure">
            <div id="container">
                
                <HighchartsReact highcharts={Highcharts} options={props.stateOptions} />
            </div>
        </figure>
    );
}

function DisplayButton(props) {
    return (
        <div>/*
        
            <ButtonComponent />
            </div>
    );
        
}

function CheckRegisteredOrNot(props) {
    const isUserRgistered = props.isUserRgistered;
    
    if (isUserRgistered)
    {
        return <DisplayChart relationData={props.relation} nodeData={props.userNodes} stateOptions={props.stateOptions} />
    }
    return <DisplayButton/>
}


export class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            relation: [], userNodes: [], stateOptions: {}, isUserRgistered : false
        }
    }

    componentDidMount() {
        this.populateRegisteredUserData();
    }

    render() {
        return (
            <div>
            
                <CheckRegisteredOrNot isUserRgistered={this.state.isUserRegistered} relation={this.state.relation} userNodes={this.state.userNodes} stateOptions={this.state.stateOptions} />
            </div>
        );
    }

    async populateRegisteredUserData() {
        const response = await fetch('api/registeredUserInformation');
        const data = await response.json();

        var isUserRegistered = false;
        var relationTable = [];
        var singleRelation = [];
        var username = this.props.username;

        var i;
        for (i = 0; i < data.length; i++) {
            singleRelation = [];
            singleRelation.push(data[i].reportingManagerUsername);
            var employeeUsername = data[i].employeeUsername;
            singleRelation.push(employeeUsername);

            

            if (employeeUsername === username) {
                console.log(employeeUsername);
                isUserRegistered = true;
            }

            relationTable.push(singleRelation);
        }
       
        var allUsers = [];

        
        for (i = 0; i < data.length; i++) {
            var singleUser = {};
            singleUser.id = data[i].employeeUsername;
            singleUser.name = data[i].employeeUsername;
            singleUser.title = data[i].designation;
            singleUser.description = data[i].departmentName;
            allUsers.push(singleUser);
        }

        constOptions.series[0].data = relationTable;
        constOptions.series[0].nodes = allUsers;
        var nav = {};
        nav.id = "NAV";
        constOptions.series[0].nodes.push(nav);

       // console.log(isUserRegistered);
        this.setState({ relation: relationTable, userNodes: allUsers, stateOptions: constOptions, isUserRegistered: isUserRegistered });
        
    }
}