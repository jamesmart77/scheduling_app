import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../store/user/actions';
import * as responseHandlerActions from '../store/responseHandler/actions';
import Unauthorized from '../components/Unauthorized';

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.userActions.userValidation();
    }

    render() {
        const { isAuthenticated } = this.props;
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
    isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);