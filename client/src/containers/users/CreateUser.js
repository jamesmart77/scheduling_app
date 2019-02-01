import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Input, Button, Container, Icon } from 'react-materialize';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import SweetAlert from 'sweetalert2-react';
import * as EmailValidator from 'email-validator';
import LoadingSpinner from '../../components/LoadingSpinner';

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
            passwordConfirm: '',
            showModal: false,
            isLoading: false
        }
    }

    componentDidMount(){
        this.isUserLoggedIn();
    }

    componentDidUpdate(){
        this.isUserLoggedIn();
    }

    isUserLoggedIn(){
        if (this.props.currentUser.email !== '' && !this.props.loginUnauthorized) {
            this.props.history.push('/users');
        }
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });

        if(name === 'email' && EmailValidator.validate(value)) {
            this.handleEmailValidation(value);
        }
    };

    handleEmailValidation(address) {
        this.props.userActions.emailAddressValidation(address);
    }

    async handleCreateUser() {
        const { firstName, lastName, email, password, passwordConfirm} = this.state;
        if( firstName === '' ||
            lastName === '' ||
            email === '' ||
            password === '' ||
            passwordConfirm=== '' ||
            !EmailValidator.validate(email) ||
            !this.props.isEmailAvailable ||
            (password !== passwordConfirm)) {
                this.setState({ showModal: true });
        } else {
            const newUser = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            }
            try {
                this.setState({ isLoading: true });
                await this.props.userActions.createUser(newUser);
            } catch {
                this.setState({ isLoading: false });
            }
        }
    }

    render() {
        const { isEmailAvailable } = this.props;
        const htmlText = "<div>Some of the information provided seems to invalid. Verify the following and try again.<ul><li>All fields are populated</li><li>Email is properly formatted</li><li>Email is available (check mark)</li><li>Passwords match</li></ul></div>";
        console.log("isEmailAddressAvailable: ", isEmailAvailable);
        return (
            <div className='user-creation-container'>
                <Container>
                    {this.state.isLoading &&
                        <LoadingSpinner/>
                    }
                    <SweetAlert
                        show={this.state.showModal}
                        type='error'
                        title='Whoops!'
                        html={htmlText}
                        onConfirm={() => this.setState({ showModal: false })}
                    />
                    <h5 className='header center'>Welcome to Sched-Aroo!</h5>
                    <div className='header-subtext'>
                        <p>
                            Please provide the following to create your account. Your informtion is safe - we're
                            just need it to create an awesome experience!
                        </p>
                    </div>
                    <Row l={4} m={6} s={10}>
                        <Input s={11}
                            type="email" 
                            label="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        {isEmailAvailable ? (
                            <Icon tiny className='check-icon'>check</Icon>
                        ) : (
                            <Icon tiny className='do-not-disturb-icon'>do_not_disturb</Icon>
                        )}
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
                        <Button s={9} className='create-user-button' onClick={this.handleCreateUser}>Create Account</Button>
                    </Row>

                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        isEmailAvailable: state.isEmailAvailable
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
    isAuthenticated: PropTypes.bool,
    isEmailAvailable: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);