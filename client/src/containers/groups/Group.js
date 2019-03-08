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
        this.handleSubmitBug = this.handleSubmitBug.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isLoading: true,
            email: '',
            showModal: false,
            group: null,
            availableUsers: []
        }
    }

    componentWillMount(prevProps){
        this.initialSequence(prevProps);
    }

    componentDidUpdate(prevProps) {
        this.loadGroupInfo(prevProps);
    }
    
    componentDidMount(prevProps) {
        this.loadGroupInfo(prevProps);
    }

    loadGroupInfo(prevProps) {
        if(prevProps && this.props){
            if((prevProps.ownedGroups !== this.props.ownedGroups) || 
                (prevProps.allUsers !== this.props.allUsers ) ||
                this.state.group === null) {
                
                    const { ownedGroups, allUsers, match: { params }} = this.props;
                
                    if(ownedGroups && ownedGroups.length > 0) {
                        //destructuring allows access to first element of array from filter -- only 1 group will be returned
                        const [first] = ownedGroups.filter(group => group.id == params.groupId);
                        this.setState({ group: first });
                        
                        if(allUsers && allUsers[0] && allUsers[0].id !== 0){
    
                            if(first && first.groupMembers){
                                let availableUsers = [];
                                allUsers.filter(user => {
                                    if(!first.groupMembers.some(member => user.id === member.id)){
                                        availableUsers.push(user);
                                    }
                                });
                                this.setState({availableUsers: availableUsers});
                            }
                        }
                    }
            }
        }
    }

    async initialSequence(prevProps) {
        const { userActions, allUsers, match: { params } } = this.props;
        const { group, availableUsers } = this.state;

        await userActions.userAuthentication();
        await userActions.userAuthorization(params.groupId);
        if(allUsers[0].id === 0){
            await userActions.loadAllUsers();
        }

        if(group === null || availableUsers.length === 0){
            await this.loadGroupInfo(prevProps);
        }
    
        this.setState({ isLoading: false })
    }

    handleReset(shouldRedirect) {
        this.props.responseHandlerActions.reset();
        if(shouldRedirect){
            this.props.history.push('/users');
        }
    }

    handleSubmitBug(){
        let win = window.open("https://github.com/jamesmart77/scheduling_app/issues", "_blank")
        win.focus();
        this.handleReset(true);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    async handleAddUser() {
        const { email, availableUsers } = this.state;
        const foundUser = availableUsers.filter(user => user.email === email);

        if( email === '' || foundUser.length === 0 ) {
                this.setState({ showModal: true });
        } else {
            try {
                await this.props.groupActions.addUserToGroup({email: this.state.email}, this.props.match.params.groupId);
                window.Materialize.toast('Member Added Successfully', 1500, 'rounded');
                this.setState({ email: ''})
            } catch (error) {
                console.error("Error adding new user...", error);
            }
        }
    }

    render() {
        const { isAuthenticated, unauthorized, addUserToGroupErrpr } = this.props;
        const { group, availableUsers } = this.state;
        
        if (this.state.isLoading){
            return <LoadingSpinner/>
        }
        if(!isAuthenticated) {
            return <Unauthenticated/>
        } 
        if(unauthorized) {
            return <Unauthorized handleReset={() => this.handleReset(true)}/>
        } else {
            return (
                <div className='group-container'>
                    <SweetAlert
                        show={this.state.showModal}
                        type='warning'
                        title='Whoops!'
                        text='Please ensure a valid email is provided and is associated to an active user. Only emails for active users are allowed.'
                        onConfirm={() => this.setState({ showModal: false })}
                    />
                    <SweetAlert
                        show={addUserToGroupErrpr}
                        type='error'
                        title='Error Adding Member'
                        text='An error occurred when trying to add the new member. Please try logging back in and if the problem persists submit a bug. Sorry for the inconvenience'
                        onConfirm={() => this.handleReset(false)}
                        showCancelButton={true}
                        cancelButtonText='Submit Bug'
                        onCancel={this.handleSubmitBug}
                    />
                    <Row>
                        <Col s={10} offset='s1'>
                            <h3 className='header truncate'>{group.name && group.name.toUpperCase()}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col m={8} s={10} offset='s1 m2'>
                            <h5 className='member-header'>Group Members</h5>
                            {group && group.groupMembers && 
                                group.groupMembers.length > 0 && 
                                group.groupMembers[0].id !== 0 ? (
                                
                                group.groupMembers.map(member => {
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

                            <Col l={8} s={12} offset='l2'>
                                <h5 className='add-new-header'>Add New Member</h5>
                                {availableUsers.length > 0 ? ( 
                                    <div className='add-member-container'>
                                            <Input
                                                s={12}
                                                type='select'  
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                            >
                                                <option value="" disabled selected>Email Address</option>
                                                {availableUsers && availableUsers.map(user => {
                                                    return (
                                                        <option key={user.id} value={user.email}>
                                                            {user.firstName} {user.lastName} ({user.email})
                                                        </option>
                                                    )
                                                })}
                                            </Input>
                                        <Col l={8} m={10} s={12} offset='m1 l2'>
                                            <Button className='primary-button' onClick={this.handleAddUser}>Add Member</Button>
                                        </Col>
                                    </div>
                                ) : (
                                    <div>All available users have been added to this group...</div>
                                    )
                                }
                            </Col>
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
        addUserToGroupErrpr: state.addUserToGroupErrpr
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
    addUserToGroupErrpr: PropTypes.bool,
    unauthorized: PropTypes.bool,
    loginUnauthorized: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);