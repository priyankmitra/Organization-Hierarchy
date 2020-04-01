import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

    constructor(props) {
        super(props);
        
    }
    render() {
    return (
      <div>
        <NavMenu username={this.props.username} />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
