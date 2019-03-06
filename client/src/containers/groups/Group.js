import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import Unauthorized from '../../components/Unauthorized';
import Unauthenticated from '../../components/Unauthenticated';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Link } from 'react-router-dom';

export class Group extends Component {
    constructor(props) {
        super(props);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            isLoading: true
        }
    }

    componentWillMount(){
        this.userValidation();
    }

    async userValidation() {
        const { match: { params } } = this.props;
        await this.props.userActions.userAuthentication();
        await this.props.userActions.userAuthorization(params.groupId);
        this.setState({ isLoading: false })
    }

    handleReset() {
        this.props.responseHandlerActions.reset();
        this.props.history.push('/users');
    }

    render() {
        const { isAuthenticated, unauthorized } = this.props;
        // console.log("PROPS: ", this.props);
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
                    <h3>Welcome to the Group Home page!</h3>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        unauthorized: state.unauthorized
    }
}

function mapDispatchToProps(dispatch){
    return {
        userActions: bindActionCreators(userActions, dispatch),
        responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
    }
}

Group.propTypes = {
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    unauthorized: PropTypes.bool,
    loginUnauthorized: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);