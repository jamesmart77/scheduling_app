import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as serviceActions from '../store/service/actions';
import * as responseHandlerActions from '../store/responseHandler/actions';
import { Row, Col, Icon, Input, Button } from 'react-materialize';
import { Fade } from 'react-reveal';

export class Services extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleAddService = this.handleAddService.bind(this);
        this.state = {
            expandSection: false,
            serviceName: '',
            showAlert: false,
            showError: false
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

    async handleAddService(){
        const { serviceName } = this.state;
        const { currentUser, groupId } = this.props;

        if(serviceName === '' || serviceName.length < 3){
            this.setState({ showAlert: true })
        } else {
            try {
                await this.props.serviceActions.createService(serviceName, groupId, currentUser.id);
                window.Materialize.toast('Service Added Successfully', 2500, 'rounded');
                this.setState({ serviceName: ''});
            } catch(error){
                this.setState({ showError: true});
            }
        }
    }

    render() {
        const { expandSection } = this.state;

        return (
            <div className='services-container'>
            {/* TODO - add 2 sweet alerts */}
                <Row>
                    <Col l={8} s={12} offset='l2'>
                        <Col s={10}>
                            <h5 className='header'>Group Service Areas</h5>
                        </Col>
                        <Col s={2}>
                            <div className='header-icon' onClick={this.handleExpand}>
                                <Icon className={expandSection ? "expand-open" : "expand-close"} right>expand_more</Icon>
                            </div>
                        </Col>
                        <Row>
                            <Col s={12}>
                                <Fade duration={750} left opposite when={expandSection}>
                                    <div className='center'>
                                        <Input m={10} s={12}
                                            type='text'  
                                            name="serviceName"
                                            placeholder='Minimum 2 characters...'
                                            value={this.state.serviceName}
                                            onChange={this.handleChange} />
                                        <Col m={2} s={10} offset='s1'>
                                            <Button className='add-btn' floating onClick={this.handleAddService}>
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
        serviceActions: bindActionCreators(serviceActions, dispatch),
        responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
    }
}

Services.propTypes = {
    ownedGroups: PropTypes.array,
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    groupId: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);