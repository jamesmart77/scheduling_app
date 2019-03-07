import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as groupActions from '../../store/group/actions';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import Unauthorized from '../../components/Unauthorized';
import Unauthenticated from '../../components/Unauthenticated';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import { Row, Col, Input, Button, Collapsible, CollapsibleItem } from 'react-materialize';

export class Group extends Component {
    constructor(props) {
        super(props);
        this.handleReset = this.handleReset.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isLoading: true,
            email: '',
            showModal: false
        }
    }

    componentWillMount(){
        this.initialSequence();
    }

    async initialSequence() {
        const { match: { params } } = this.props;
        await this.props.userActions.userAuthentication();
        await this.props.userActions.userAuthorization(params.groupId);
        if(this.props.allUsers[0].id === 0){
            await this.props.userActions.loadAllUsers();
        }
        this.setState({ isLoading: false })
    }

    handleReset() {
        this.props.responseHandlerActions.reset();
        this.props.history.push('/users');
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    async handleAddUser() {
        const { email } = this.props;
        const foundUser = this.props.allUsers.filter(user => user.email === email);

        if( email === '' || foundUser.length === 0 ) {
                this.setState({ showModal: true });
        } else {
            try {
                await this.props.groupActions.addUserToGroup({email: this.state.email}, this.props.match.params.groupId);
                window.Materialize.toast('Member Added Successfully', 1500, 'rounded');
            } catch (error) {
                console.error("Error adding new user...", error);
            }
        }
    }

    render() {
        const { isAuthenticated, unauthorized, ownedGroups, allUsers, match: { params } } = this.props;
        
        //destructuring allows us to access first element of array from filter -- only 1 group will be returned
        const [first] = ownedGroups.filter(group => group.id == params.groupId);

        if (this.state.isLoading){
            return <LoadingSpinner/>
        }
        if(!isAuthenticated) {
            return <Unauthenticated/>
        } 
        if(unauthorized) {
            return <Unauthorized handleReset={this.handleReset}/>
        } else {
            return (
                <div className='group-container'>
                    <SweetAlert
                        show={this.state.showModal}
                        type='error'
                        title='Whoops!'
                        text='Please ensure a valid email is provided and is associated to an active user. Only emails for active users are allowed.'
                        onConfirm={() => this.setState({ showModal: false })}
                    />
                    <Row>
                        <Col s={10} offset='s1'>
                            <h3 className='header truncate'>{first.name && first.name.toUpperCase()}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col m={8} s={10} offset='s1 m2'>
                            <h5 className='sub-header'>Group Members</h5>
                            {first.groupMembers && first.groupMembers[0].id !== 0 ? (
                                
                                first.groupMembers.map(member => {
                                    return (
                                        <Collapsible accordion key={'memberId-' + member.id}>
                                            <CollapsibleItem header={member.firstName + " " + member.lastName}>
                                                Tada!!!
                                            </CollapsibleItem>
                                        </Collapsible>
                                    )
                                })
                            ) : (
                                <div>There are no members for this group yet</div>
                            )}

                            <div className='add-member-container'>
                                <Col m={8} s={12} offset='m2'>
                                    <h5 className='sub-header'>Add New Member</h5>
                                    <Input
                                        s={12}
                                        type='select'  
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    >
                                        <option value="" disabled selected>Email Address</option>
                                        {allUsers && allUsers.map(user => {
                                            return (
                                                <option key={user.id} value={user.email}>
                                                    {user.firstName} {user.lastName} ({user.email})
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                                <Col m={6} s={12} offset='m3'>
                                    <Button className='primary-button' onClick={this.handleAddUser}>Add Member</Button>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        unauthorized: state.unauthorized,
        ownedGroups: state.ownedGroups,
        allUsers: state.allUsers,
    }
}

function mapDispatchToProps(dispatch){
    return {
        groupActions: bindActionCreators(groupActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
    }
}

Group.propTypes = {
    currentUser: PropTypes.object,
    ownedGroups: PropTypes.array,
    allUsers: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    unauthorized: PropTypes.bool,
    loginUnauthorized: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);