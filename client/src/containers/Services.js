import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../store/user/actions';
import * as responseHandlerActions from '../store/responseHandler/actions';
import { Row, Col, Icon, Input, Button } from 'react-materialize';
import { Fade } from 'react-reveal';

export class Services extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.state = {
            expandSection: false,
            serviceName: ''
        }
    }

    handleExpand(){
        this.setState({expandSection: !this.state.expandSection});
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const { isAuthenticated, currentUser, ownedGroups } = this.props;
        const { expandSection } = this.state;

        return (
            <div className='services-container'>
                <Row>
                    <Col m={8} s={10} offset='s1 m2'>
                        <Row>
                            <Col s={10}>
                                <h5 className='header'>Add Service Area </h5>
                            </Col>
                            <Col s={2}>
                                <div className='header-icon' onClick={this.handleExpand}>
                                    <Icon className={expandSection ? "expand-open" : "expand-close"} right>expand_more</Icon>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col s={12}>
                                <Fade duration={750} left opposite when={expandSection}>
                                    <div className='center'>
                                        <Input l={6} m={8} s={12} offset='l2'
                                            type='text'  
                                            name="serviceName"
                                            value={this.state.serviceName}
                                            onChange={this.handleChange} />
                                        <Col m={2} s={10} offset='s1'>
                                            <Button className='add-btn' floating>
                                                <Icon>add</Icon>
                                            </Button>
                                        </Col>
                                    </div>
                                </Fade>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        ownedGroups: state.ownedGroups,
        isAuthenticated: state.isAuthenticated
    }
}

function mapDispatchToProps(dispatch){
    return {
        userActions: bindActionCreators(userActions, dispatch),
        responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
    }
}

Services.propTypes = {
    ownedGroups: PropTypes.array,
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);