import React, { Component } from 'react';
import { Home } from './Home';
import { Button, Header, Image, Modal , Grid, Container, Segment} from 'semantic-ui-react'

 class PostCardModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            

        };
        
    }
    render() {
        return (
            <Modal open={this.props.modalOpen} size='mini' style={{ marginLeft: 400, marginRight: 400, marginTop: 20 }} >
                <Header as='h2'>
                    <Image circular src={this.props.image} /> {this.props.name}
                </Header>

                <Modal.Content>

                        <Modal.Description>
                        <Segment.Group horizontal>
                            <Segment><Segment.Group raised>
                                    <Segment>{this.props.designation}</Segment>
                                    <Segment>{this.props.department}</Segment>
                                    <Segment>{this.props.email}</Segment>
                                    <Segment>{this.props.office}</Segment>
                            </Segment.Group></Segment>
                        </Segment.Group>
                        </Modal.Description>
                </Modal.Content>
                
                <Modal.Actions>
                    <div align="center">
                        <Button color='green' onClick={this.props.handleClose} inverted>
                                Close
                        </Button>
                    </div>
                </Modal.Actions>
                   
                </Modal>
            );
    }
        
}

export default PostCardModal