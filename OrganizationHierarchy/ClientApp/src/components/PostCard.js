import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { Home } from './Home';


export class PostCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showPostCard: this.props.showPostCard
        }
    }
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Employee Detail
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        Contents
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            /*<div>
                <div class="ui link cards">
                    <div class="card">
                        <div class="image">
                            <img src="/images/avatar2/large/matthew.png" />
                        </div>
                        <div class="content">
                            <div class="header">Matt Giampietro</div>
                            <div class="meta">
                                <a>Friends</a>
                            </div>
                            <div class="description">
                                Matthew is an interior designer living in New York.
                            </div>
                        </div>
                        <div class="extra content">
                            <span class="right floated">
                                Joined in 2013
                                </span>
                            <span>
                                <i class="user icon"></i>
                                    75 Friends
                                </span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="image">
                            <img src="/images/avatar2/large/molly.png" />
                        </div>
                        <div class="content">
                            <div class="header">Molly</div>
                            <div class="meta">
                                <span class="date">Coworker</span>
                            </div>
                            <div class="description">
                                Molly is a personal assistant living in Paris.
      </div>
                        </div>
                        <div class="extra content">
                            <span class="right floated">
                                Joined in 2011
      </span>
                            <span>
                                <i class="user icon"></i>
        35 Friends
      </span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="image">
                            <img src="/images/avatar2/large/elyse.png" />
                        </div>
                        <div class="content">
                            <div class="header">Elyse</div>
                            <div class="meta">
                                <a>Coworker</a>
                            </div>
                            <div class="description">
                                Elyse is a copywriter working in New York.
      </div>
                        </div>
                        <div class="extra content">
                            <span class="right floated">
                                Joined in 2014
      </span>
                            <span>
                                <i class="user icon"></i>
        151 Friends
      </span>
                        </div>
                    </div>
                </div>
            </div>*/
        );
    }
        
}

