import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Landing from './Landing'
import Login from './Login'
import { Row } from 'react-materialize';
import Nav from '../components/Nav';
import User from './User';
import * as userActions from '../store/user/actions';

export class App extends Component {

  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout(){
    await this.props.userActions.logoutCurrentUser();
    window.location.replace('/');
}

  render() {
    return (
      <Router>
        <div className="App">
          <Row className='app-container'>
            <Nav handleLogout={this.handleLogout}/>
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route path='/users/login' component={Login}/>
              <Route path='/users/home' component={User}/>
            </Switch>
          </Row>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
      userActions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
