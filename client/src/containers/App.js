import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Landing from './Landing'
import { Row } from 'react-materialize';

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
          {/* Add Top Nav Here */}
          <Row className='app-container'>
            <Switch>
              <Route path='/' component={Landing}/>
            </Switch>
          </Row>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  // store: PropTypes.object.isRequired,
  children: PropTypes.element
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(App);
