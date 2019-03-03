import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Col, Row, Button } from 'react-materialize';

export class Landing extends Component {
    render() {
        const { currentUser } = this.props;

        return (
            <div className='landing-container'>
                <Container>
                    <Row>
                        <Col l={10} s={12} offset='l1'>
                            <div>
                                <Row>
                                    <h3 className='header center'>Own Your Group Schedules</h3>
                                </Row>
                                <Row>
                                    <Col s={12}>
                                        <div className='description-text center'>
                                            <p>
                                                Tired of manually working your group schedules? Let <b>Sched-Aroo</b> do the heavy 
                                                lifting for you!
                                            </p>
                                            <p>
                                                With our dynamic algorithms that consider volunteer unavailability dates, 
                                                service area preferences, and provide an elegant user experience, scheduling 
                                                recurring group events will turn to ease.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='landing-actions-row'>
                                    { currentUser.firstName ? (
                                        <Col s={6} offset='s3'>
                                            <Button
                                                className='primary-button login-button'
                                                waves='light' 
                                                node='a' 
                                                href='/users'>My Account</Button>
                                        </Col>
                                    ) : (
                                        <div>
                                            <Col m={6} s={12}>
                                                <Button
                                                    className='primary-button login-button'
                                                    waves='light' 
                                                    node='a' 
                                                    href='/users/login'>Login</Button>
                                            </Col>
                                            <Col m={6} s={12}>
                                                <Button
                                                    className='secondary-button right'
                                                    waves='light' 
                                                    node='a' 
                                                    href='/users/create'>Create New Account</Button>
                                            </Col>
                                        </div>
                                    )}
                                </Row>
                            </div>              
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

Landing.propTypes = {
    currentUser: PropTypes.object
};

export default connect(mapStateToProps)(Landing);