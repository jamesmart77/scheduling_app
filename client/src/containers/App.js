import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Landing from './Landing'
import Login from './Login'
import { Row } from 'react-materialize';
import Nav from './Nav';
import User from './User';

export class App extends Component {

  constructor(props){
    super(props);
  
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Row className='app-container'>
            <Nav/>
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route path='/login' component={Login}/>
              <Route path='/users' component={User}/>
            </Switch>
          </Row>
        </div>
      </BrowserRouter>
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

export default connect(mapStateToProps)(App);
