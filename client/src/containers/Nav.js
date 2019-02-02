import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navbar, NavItem } from 'react-materialize';
import * as userActions from '../store/user/actions';

export class Nav extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout(){
        await this.props.userActions.logoutCurrentUser();
        //TODO refactor with history.push
        window.location.replace('/');
    }


    render() {
        const { currentUser } = this.props;
        
        return (
            <div className='nav-container'>
                <Navbar brand='Sched-Aroo' right>
                    {currentUser.email === '' ? (
                        <NavItem href='/users/login'>Login</NavItem>
                    ) : (
                        <div>
                            <NavItem href='/groups/create'>Create Group</NavItem>
                            <NavItem onClick={this.handleLogout}>Logout</NavItem>
                        </div>
                    )}
                </Navbar>
            </div>
        )
    }
}

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

Nav.propTypes = {
    currentUser: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);