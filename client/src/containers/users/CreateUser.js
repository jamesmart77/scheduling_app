import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Input, Button, Container, Icon } from 'react-materialize';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import SweetAlert from 'sweetalert2-react';
import ReactToolTip from 'react-tooltip';
import * as EmailValidator from 'email-validator';
import LoadingSpinner from '../../components/LoadingSpinner';

export class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleSubmitBug = this.handleSubmitBug.bind(this);
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


    handleReset(){
        this.props.responseHandlerActions.reset();
    }

    handleSubmitBug(){
        let win = window.open("https://github.com/jamesmart77/scheduling_app/issues", "_blank")
        win.focus();
        this.handleReset();
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
        const { isEmailAvailable, loginUnauthorized } = this.props;
        const htmlText = "<div>Some of the information provided seems to invalid. Verify the following and try again.<ul><li>All fields are populated</li><li>Email is properly formatted</li><li>Email is available (check mark)</li><li>Passwords match</li></ul></div>";
        
        if(this.state.isLoading){
            return <LoadingSpinner/>
        } else {
            return (
                <div className='user-creation-container'>
                    <Container>
                        <SweetAlert
                            show={this.state.showModal}
                            type='error'
                            title='Whoops!'
                            html={htmlText}
                            onConfirm={() => this.setState({ showModal: false })}
                        />
                        <SweetAlert
                            show={loginUnauthorized}
                            type='error'
                            title='Error'
                            text='An error occurred when creating your account. Please retry and if problem persists submit a bug on GitHub.'
                            onConfirm={this.handleReset}
                            showCancelButton={true}
                            cancelButtonText='Submit Bug'
                            onCancel={this.handleSubmitBug}

                        />
                        <h5 className='header center'>Welcome to Sched-Aroo!</h5>
                        <div className='header-subtext'>
                            <p>
                                Please provide the following to create your account. These details will be used
                                by others to search and add you to groups. Your informtion is safe - we'll
                                just use it to create an awesome experience! 
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
                                <div data-tip='This email address is not available' data-type='error'>
                                    <ReactToolTip effect="solid" className='do-not-disturb-tooltip'/>
                                    <Icon tiny className='do-not-disturb-icon'>do_not_disturb</Icon>
                                </div>
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
                            <Button s={9} className='primary-button' onClick={this.handleCreateUser}>Create Account</Button>
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        isEmailAvailable: state.isEmailAvailable,
        loginUnauthorized: state.loginUnauthorized,
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
    loginUnauthorized: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);