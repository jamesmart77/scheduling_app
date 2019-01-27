import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Row, Container, Button } from 'react-materialize';
import LoadingSpinner from '../components/LoadingSpinner';
import * as actions from '../store/user/actions';
import { Redirect } from 'react-router-dom'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
            isLogginIn: false
        }
    }

    async handleLogin(){
        this.setState({ isLogginIn: true });
        await actions.loginCurrentUser(this.state.email, this. state.password);

        if (this.props.currentUser.email !== '') {
            return <Redirect to='/user' />
        }
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
                    {this.state.isLogginIn ?
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

Login.propTypes = {
    currentUser: PropTypes.object
};

export default connect(mapStateToProps)(Login);