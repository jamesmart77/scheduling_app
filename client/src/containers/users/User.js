import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import Unauthorized from '../../components/Unauthorized';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Row, Col } from 'react-materialize';

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
        const { isAuthenticated, currentUser } = this.props;
        if (this.state.isLoading){
            return <LoadingSpinner/>
        }
        if(!isAuthenticated) {
            return <Unauthorized/>
        } else {
            return (
                <div className='user-container'>
                    <Row>
                        <Col s={10} offset='s1'>
                            <h3>Welcome back {currentUser.firstName}!</h3>

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
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);