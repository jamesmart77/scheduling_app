import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import Unauthenticated from '../../components/Unauthenticated';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Container, Row, Col, Card, Button } from 'react-materialize';
import { Link } from 'react-router-dom';

export class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentWillMount(){
        this.userValidation();
    }

    async userValidation() {
        await this.props.userActions.userAuthentication();
        this.setState({ isLoading: false })
    }

    render() {
        const { isAuthenticated, currentUser, ownedGroups } = this.props;
        if (this.state.isLoading){
            return <LoadingSpinner/>
        }
        if(!isAuthenticated) {
            return <Unauthenticated/>
        } else {
            return (
                <Container className='user-container'>
                    <Row>
                        <Row>
                            <Col s={12}>
                                <h3 className='header'>Welcome {currentUser.firstName}!</h3>

                            </Col>
                        </Row>
                        <Row>
                            <Col s={12}>
                                <h5 className='sub-header'>Groups You Own</h5>
                            </Col>
                            {ownedGroups && 
                            ownedGroups.length > 0 &&
                            ownedGroups[0].id !== 0 && 
                            ownedGroups.map(group => {
                                return (
                                    <Col m={4} s={10} offset='s1'>
                                        <Card key={"group-" & group.id}
                                                className='group-card' 
                                                title={group.name} 
                                                actions={[<Link to={`/groups/${group.id}`}>View</Link>]}>
                                        </Card>
                                    </Col>
                                )
                            })}

                            {ownedGroups && 
                            ownedGroups.length > 0 &&
                            ownedGroups[0].id === 0 && 
                                <Row>
                                    <Col m={5} s={10} offset='s1'>
                                        <Button className='primary-button'
                                                onClick={() => this.props.history.push('/groups/create')}>
                                                Create New Group
                                        </Button>
                                    </Col>  
                                </Row>
                            }
                        </Row>
                    </Row>
                </Container>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        ownedGroups: state.ownedGroups,
        isAuthenticated: state.isAuthenticated
    }
}

function mapDispatchToProps(dispatch){
    return {
        userActions: bindActionCreators(userActions, dispatch),
        responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
    }
}

User.propTypes = {
    ownedGroups: PropTypes.array,
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(User);