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
import { Row, Col, Input, Button, Toast } from 'react-materialize';

export class Group extends Component {
    constructor(props) {
        super(props);
        this.handleReset = this.handleReset.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isLoading: true,
            email: ''
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
        await this.props.groupActions.addUserToGroup({email: this.state.email}, this.props.match.params.groupId);
        window.Materialize.toast('Member Added Successfully', 1500)
    }

    render() {
        const { isAuthenticated, unauthorized, ownedGroups, match: { params } } = this.props;
        
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
                    <Row>
                        <Col s={10} offset='s1'>
                            <h3 className='header truncate'>{first.name && first.name.toUpperCase()}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col m={5} s={10} offset='m1 s1'>
                            <h5>Group Members</h5>
                            <Input s={12}
                                    type="email" 
                                    label="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                            />
                            <Button onClick={this.handleAddUser}>Add Member</Button>
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