import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Row, Container, Button, Col } from 'react-materialize';
import LoadingSpinner from '../../components/LoadingSpinner';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import SweetAlert from 'sweetalert2-react';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.state = {
            email: '',
            password: '',
            isLoggingIn: false
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

    handleRedirect(){
        if (this.props.history) {
            this.props.history.push('/users/create');
        }
    }

    async handleLogin(){
        try {
            this.setState({ isLoggingIn: true });
            await this.props.userActions.loginCurrentUser(this.state.email, this.state.password);
        } catch (error) {
            console.log("Login Error: ", error);
            this.setState({ isLoggingIn: false });
        }
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleReset(){
        this.props.responseHandlerActions.reset();
    }

    render() {
        const { loginUnauthorized } = this.props;
        console.log("Login Authorization: ", loginUnauthorized);
        
        return (
            <div className='login-container'>
                <Container>
                    <SweetAlert 
                        show={loginUnauthorized}
                        type='error'
                        title='Login Attempt Failed'
                        text='The provided email and/or password were incorrect. Please try again.'
                        onConfirm={() => this.handleReset()}
                    />
                    {this.state.isLoggingIn ?
                        <LoadingSpinner/>
                    :
                        <div>
                            <h5 className='header center'>Login to Your Account</h5>
                            <Row l={4} m={6} s={10}>
                                <Input s={12}
                                    type="email" 
                                    label="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <Input s={12}
                                    type="password" 
                                    label="password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </Row>
                            <Row>
                                <Col l={8} s={12} offset='l2'>
                                    <Button className='primary-button' s={9} onClick={this.handleLogin}>Login</Button>
                                    <hr/>
                                    <Button className='secondary-button' s={9} onClick={this.handleRedirect}>Create New Account</Button>
                                </Col>
                            </Row>
                        </div>
                    }
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        loginUnauthorized: state.loginUnauthorized
    }
}

function mapDispatchToProps(dispatch){
    return {
        userActions: bindActionCreators(userActions, dispatch),
        responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
    }
}

Login.propTypes = {
    currentUser: PropTypes.object,
    loginUnauthorized: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);