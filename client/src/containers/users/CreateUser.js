import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Input, Button, Container } from 'react-materialize';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import SweetAlert from 'sweetalert2-react';

export class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleCreateUser() {

    }

    render() {
        return (
            <div className='user-creation-container'>
                <Container>
                    <h5 className='header center'>Welcome to Sched-Aroo!</h5>
                    <div className='header-subtext'>
                        <p>
                            Please provide the following information to create your account. Your informtion will
                            not be sold or distributed but is simply to create an awesome experience!
                        </p>
                    </div>
                    <Row l={4} m={6} s={10}>
                        <Input s={12}
                            type="email" 
                            label="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <Input s={12} m={6}
                            type="text" 
                            label="First Name"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                        <Input s={12} m={6}
                            type="text" 
                            label="Last Name"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                        <Input s={12} m={6}
                            type="password" 
                            label="Password" 
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <Input s={12} m={6}
                            type="password" 
                            label="Confirm Password" 
                            name="passwordConfirm"
                            value={this.state.passwordConfirm}
                            onChange={this.handleChange}
                        />
                    </Row>
                    <Row s={9}>
                        <Button s={9} onClick={this.handleCreateUser}>Done</Button>
                    </Row>

                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated
    }
}

function mapDispatchToProps(dispatch){
    return {
        userActions: bindActionCreators(userActions, dispatch),
        responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
    }
}

CreateUser.propTypes = {
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);