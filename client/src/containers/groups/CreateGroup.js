import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Input, Button, Container, Icon, Chip, Col } from 'react-materialize';
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
        this.handleCreateGroup = this.handleCreateGroup.bind(this);
        this.handleAddInvite = this.handleAddInvite.bind(this);
        this.handleRemoveInvite = this.handleRemoveInvite.bind(this);
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
        if(!this.state.invites.includes(this.state.email)) {
            this.state.invites.push(this.state.email);
        }
        
        this.setState({ email: ''});
    }

    handleRemoveInvite(email){
        const updatedInvites = this.state.invites.filter(invitee => invitee !== email);
        this.setState({ invites: updatedInvites });
    }

    async handleCreateGroup() {
        const { name } = this.state;
        if( name === '' ) {
                this.setState({ showModal: true });
        } else {
            const newGroup = {
                name: name,
                invites: this.state.invites
            }
            try {
                this.setState({ isLoading: true });
                // await this.props.userActions.createUser(newUser);
            } catch {
                this.setState({ isLoading: false });
            }
        }
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
                            <SweetAlert 
                                show={this.state.show}
                                title="Whoops!"
                                type='error'
                                text='A group name is required. Please add one before proceeding.'
                                onConfirm={() => this.setState({ showModal: false })}
                            />
                            <h5 className='header center'>Let's Make A New Group</h5>
                            <div className='header-subtext'>
                                <p>
                                    Go ahead and name your group! No pressure to add people yet, but if you already know some then go for it!
                                </p>
                            </div>
                            <Row>
                                <Col m={6} s={10} offset='m3 s1'>
                                    <Input s={12}
                                        type="text" 
                                        label="Group Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                    <Input s={10}
                                        type="text" 
                                        label="Invite Members"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                    <Button floating 
                                            className='add-invite-btn right'
                                            onClick={this.handleAddInvite} 
                                            icon='add' />
                                
                                </Col>
                                <Col s={12}>
                                    <div className='group-invite-list'>
                                        {invites.length > 0 && <p>Members to Invite</p>}
                                        {invites.length > 0 && invites.map(email => {
                                            return(<Chip
                                                        key={email}
                                                        className='user-pill'
                                                        close={false}>
                                                            <Col s={10} className='user-pill-text'>{email}</Col>
                                                            <Col s={2}>
                                                                <div onClick={() => this.handleRemoveInvite(email)}>
                                                                    <Icon className='user-pill-close-btn'>close</Icon>
                                                                </div>
                                                            </Col>
                                                    </Chip>)
                                        })}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col s={8} offset='s2'>
                                    <Button className='primary-button' onClick={this.handleCreateGroup}>Create Group</Button>
                                </Col>
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