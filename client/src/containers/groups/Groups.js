import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import Unauthorized from '../../components/Unauthorized';
import LoadingSpinner from '../../components/LoadingSpinner';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentWillMount(){
        this.props.userActions.userValidation();
        this.setState({ isLoading: false })
    }

    render() {
        const { isAuthenticated, loginUnauthorized } = this.props;
        if (this.state.isLoading){
            return <LoadingSpinner/>
        }
        if(!isAuthenticated) {
            return <Unauthorized/>
        } else {
            return (
                <div className='user-container'>
                    <h3>Welcome to the User Home page!</h3>
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
    isAuthenticated: PropTypes.bool,
    loginUnauthorized: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);