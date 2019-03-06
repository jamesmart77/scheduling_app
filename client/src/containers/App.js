import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Landing from './Landing';
import Login from './users/Login';
import CreateGroup from './groups/CreateGroup';
import Group from './groups/Group';
import { Row } from 'react-materialize';
import Nav from './Nav';
import CreateUser from './users/CreateUser';
import User from './users/User';
import SweetAlert from 'sweetalert2-react';
import * as responseHandlerActions from '../store/responseHandler/actions';
import LoadingSpinner from '../components/LoadingSpinner';

export class App extends Component {

  constructor(props){
    super(props);
    this.handleErrorReset = this.handleErrorReset.bind(this);
  }

  handleErrorReset(){
    this.props.responseHandlerActions.reset();
  }

  render() {
    const { isServerError, initialLoad, currentUser } = this.props;
    
    return (
      <BrowserRouter>
        <div className="App">
          <Row className='app-container'>
            <Nav/>
            { initialLoad && !currentUser.firstName && <LoadingSpinner /> }
            <SweetAlert
              show={isServerError}
              type='error'
              title='An Error Occurred'
              text='We have caught an error that occurred with a recent action you performed. Please retry and contact your group owner if problem persists.'
              onConfirm={this.handleErrorReset}
            />
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route exact path='/users' component={User}/>
              <Route path='/users/login' component={Login}/>
              <Route path='/users/create' component={CreateUser}/>
              <Route exact path='/groups/create' component={CreateGroup}/>
              <Route path='/groups/:groupId' component={Group}/>
            </Switch>
          </Row>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  isServerError: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    initialLoad: state.initialLoad,
    isServerError: state.isServerError
  }
}

function mapDispatchToProps(dispatch){
  return {
      responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
