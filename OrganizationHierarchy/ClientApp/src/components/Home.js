import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ButtonComponent } from './ButtonComponent';

import "./Home.css";
import { PostCard } from './PostCard';

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
    plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function (props) {
                        alert('\nName:        ' + this.id + '\nTitle:          ' + this.title
                            + '\nEmail:         ' + this.email + '\nOffice:        '+this.office);
                        postCardDetails.Name =  this.id;
                        postCardDetails.Title = this.title;
                        postCardDetails.Email= this.email;
                        postCardDetails.Office = this.office;
                        showPostCard = true;
                        /*const [show, setShow] = useState(false);

                        const handleClose = () => setShow(false);
                        const handleShow = () => setShow(true);

                        return (
                            <>
                                <Button variant="primary" onClick={handleShow}>
                                    Launch demo modal
      </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modal heading</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
          </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Save Changes
          </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        );*/
                        console.log(Home.showPostCard);
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
        <div>
            <ButtonComponent />
        </div>
    );
        
}

function CheckRegisteredOrNot(props) {
    const isUserRgistered = props.isUserRgistered;
    
    if (isUserRgistered==1)
    {
        if(props.showPostCard === false)
            return <DisplayChart relationData={props.relation} nodeData={props.userNodes} stateOptions={props.stateOptions} />
        else
            return <PostCard/>
    }
    else
        return <DisplayButton/>
}


export class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            relation: [], userNodes: [], stateOptions: {}, isUserRgistered : 0, showPostCard : false 
        }
    }

    componentDidMount() {
        this.populateRegisteredUserData();
    }

    render() {
        return (
            <div>
            
                <CheckRegisteredOrNot isUserRgistered={this.state.isUserRegistered} relation={this.state.relation}
                    userNodes={this.state.userNodes} stateOptions={this.state.stateOptions}
                        showPostCard={showPostCard} />
            </div>
        );
    }

    async populateRegisteredUserData() {

        var relationTable = [];
        var singleRelation = [];
        var username = this.props.username;

        const responseForregisteredUserInformation = await fetch('api/registeredUserInformation');
        const data = await responseForregisteredUserInformation.json();

        const responseForRegisterUser = await fetch('api/isRegisteredUserOrNot');
        const isUserRegistered  = await responseForRegisterUser.json();

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
            singleUser.image = 'https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132314/AnneJorunn.jpg';
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