import React, { Component } from 'react';




export default class EditDetails extends Component
{
  static displayName = App.name;

    constructor(props)
{
    super(props);
    this.state = {
    username: ""
        }
}

componentDidMount()
{
    this.populateUsernaameData();
}
render()
{

    return (

      < div >

            < Layout username ={ this.state.username} >
 
                   < Route path = '/editDetails' component ={ EditDetails} />
      
                    </ Layout >
      
                  < Home username ={ this.state.username} />
         
                 </ div >
    );
}
async populateUsernaameData()
{
    const response = await fetch('api/username');
    const data = await response.json();
    this.setState({ username: data[0]});

}
}
