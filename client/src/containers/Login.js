import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Row, Container, Button } from 'react-materialize';
import LoadingSpinner from '../components/LoadingSpinner';
import * as userActions from '../store/user/actions';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
            isLoggedIn: false
        }
    }

    componentDidMount(){
        this.isUserLoggedIn();
    }

    componentDidUpdate(){
        this.isUserLoggedIn();
    }

    isUserLoggedIn(){
        if (this.props.currentUser.email !== '') {
            this.props.history.push('/users');
        }
    }

    async handleLogin(){
        this.setState({ isLogginIn: true });
        await this.props.userActions.loginCurrentUser(this.state.email, this. state.password);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className='login-container'>
                <Container>
                    {this.state.isLoggedIn ?
                        <LoadingSpinner/>
                    :
                        <div>
                            <h5 className='center'>Login to Your Account</h5>
                            <Row l={4} m={6} s={10}>
                                <Input s={12}
                                    type="email" 
                                    label="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    validate={true}
                                    error="Please enter valid email address"
                                />
                                <Input s={12}
                                    type="password" 
                                    label="password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </Row>
                            <Row s={9}>
                                <Button className="right" onClick={() => this.handleLogin()}>Login</Button>
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
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch){
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

Login.propTypes = {
    currentUser: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);