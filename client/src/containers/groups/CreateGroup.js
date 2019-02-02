import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Input, Button, Container, Icon, Tag, Col } from 'react-materialize';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import SweetAlert from 'sweetalert2-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import Unauthorized from '../../components/Unauthorized';

export class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleAddInvite = this.handleAddInvite.bind(this);
        this.initialPageLoad = this.initialPageLoad.bind(this);
        this.state = {
            name: '',
            email: '',
            invites: [],
            showModal: false,
            isLoading: true
        }
    }

    componentWillMount(){
        this.initialPageLoad();
    }

    async initialPageLoad(){
        await this.props.userActions.userValidation();
        //TODO add getCurrentUserInfo method if it's not present -- mimick userValidation but return payload
        this.setState({ isLoading: false })
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

    handleAddInvite(){
        this.state.invites.push(this.state.email);
        this.setState({ email: ''});
    }

    async handleCreateUser() {
        // const { firstName, lastName, email, password, passwordConfirm} = this.state;
        // if( firstName === '' ||
        //     lastName === '' ||
        //     email === '' ||
        //     password === '' ||
        //     passwordConfirm=== '' ||
        //     !EmailValidator.validate(email) ||
        //     !this.props.isEmailAvailable ||
        //     (password !== passwordConfirm)) {
        //         this.setState({ showModal: true });
        // } else {
        //     const newUser = {
        //         email: email,
        //         firstName: firstName,
        //         lastName: lastName,
        //         password: password
        //     }
        //     try {
        //         this.setState({ isLoading: true });
        //         await this.props.userActions.createUser(newUser);
        //     } catch {
        //         this.setState({ isLoading: false });
        //     }
        // }
    }

    render() {
        const { isAuthenticated } = this.props;
        const { invites } = this.state;
    
        if(this.state.isLoading){
            return <LoadingSpinner/>
        } else {
            if(this.props.currentUser.email === '' || !isAuthenticated){
                return <Unauthorized/>
            } else {
                return (
                    <div className='group-creation-container'>
                        <Container>
                            <h5 className='header center'>Let's Make A New Group</h5>
                            <div className='header-subtext'>
                                <p>
                                    Go ahead and name your group! No pressure to add people yet, but if you already know some then go for it!
                                </p>
                            </div>
                            <Row>
                                <Col l={4} m={6} s={10}>
                                    <Input s={12}
                                        type="text" 
                                        label="Group Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                    <Input s={9}
                                        type="text" 
                                        label="Invite Members"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                    <div onClick={this.handleAddInvite}>
                                        <Icon medium>add</Icon>
                                    </div>
                                </Col>
                                <Col s={12}>
                                    <div className='group-invite-list'>
                                        {invites.length !== 0 && invites.map(email => {
                                            return(<Tag className='user-pill' close={true}>{email}</Tag>)
                                        })}
                                    </div>
                                </Col>
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

CreateGroup.propTypes = {
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    isEmailAvailable: PropTypes.bool,
    loginUnauthorized: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);