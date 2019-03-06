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
import { Row, Col } from 'react-materialize';

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
        const { isAuthenticated, unauthorized, ownedGroups, match: { params } } = this.props;
        
        //destructuring allows us to access first element of array from filter -- only 1 group will be returned
        const [first] = ownedGroups.filter(group => group.id == params.groupId);

        console.log("Active Group: ", first);
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
        ownedGroups: state.ownedGroups
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
    ownedGroups: PropTypes.array,
    isAuthenticated: PropTypes.bool,
    unauthorized: PropTypes.bool,
    loginUnauthorized: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);