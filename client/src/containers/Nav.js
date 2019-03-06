import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navbar, NavItem, Dropdown, Button, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import * as userActions from '../store/user/actions';

export class Nav extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout(){
        window.location.replace('/');
        this.props.userActions.logoutCurrentUser();
    }

    render() {
        const { currentUser } = this.props;
        
        return (
            <div className='nav-container'>
                <Navbar brand='Sched-Aroo' right>
                    {!currentUser.email ? (
                        <NavItem href='/users/login'>Login</NavItem>
                    ) : (
                        <div>
                            <li>Welcome, {currentUser.firstName}</li>
                            <Dropdown className='nav-options-large' trigger={
                                <Button s={12} 
                                        className='nav-options-large-btn'
                                        tooltip='Menu Options'
                                        >
                                    <Icon right>
                                        more_vert
                                    </Icon>
                                </Button>
                            }>
                                <div>
                                    <li>
                                        <Link to='/users'>My Account</Link>
                                    </li>
                                    <li>
                                        <Link to='/groups/create'>Create Group</Link>
                                    </li>
                                    <NavItem divider />
                                    <li onClick={this.handleLogout}>
                                        <Icon left>exit_to_app</Icon>
                                        <span className='logout-text'>Logout</span>
                                    </li>
                                </div>
                            </Dropdown>
                            <div className='nav-options-med-to-small'>
                                    <li>
                                        <Link to='/users'>My Account</Link>
                                    </li>
                                    <li>
                                        <Link to='/groups/create'>Create Group</Link>
                                    </li>
                                    <NavItem divider />
                                    <NavItem className='logout-text' onClick={this.handleLogout}>Logout<Icon right>exit_to_app</Icon></NavItem>
                                </div>
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