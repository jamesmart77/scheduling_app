import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import Unauthorized from '../../components/Unauthorized';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Container, Row, Col, Card } from 'react-materialize';

export class Home extends Component {
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
        await this.props.userActions.userValidation();
        this.setState({ isLoading: false })
    }

    render() {
        const { isAuthenticated, currentUser, ownedGroups } = this.props;
        if (this.state.isLoading){
            return <LoadingSpinner/>
        }
        if(!isAuthenticated) {
            return <Unauthorized/>
        } else {
            return (
                <Container className='user-container'>
                    <Row>
                        <Col s={12}>
                            <h3 className='header'>Welcome back {currentUser.firstName}!</h3>

                        </Col>
                        <Row>
                            {ownedGroups && 
                            ownedGroups.length > 0 &&
                            ownedGroups[0].id !== 0 && 
                            ownedGroups.map(group => {
                                return (
                                    <div key={group.id}>
                                        <Col m={4} s={10} offset='s1'>
                                            <Card className='blue-grey darken-1' 
                                                    textClassName='white-text' 
                                                    title={group.name} 
                                                    actions={[<a href='#'>View</a>]}>
                                            </Card>
                                        </Col>
                                    </div>
                                )
                            })}
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

Home.propTypes = {
    ownedGroups: PropTypes.object,
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);