import React, { Component } from "react";
import { Navbar, NavItem} from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class Nav extends Component {

    render(){
        const { currentUser, handleLogout } = this.props;

        return(
            <Navbar id='nav' brand='Sched-Aroo' right>
                {currentUser.email === '' ? (
                    <NavItem href='/users/login'>Login</NavItem>
                ) : (
                    <NavItem onClick={handleLogout}>Logout</NavItem>
                )}
            </Navbar>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

Nav.propTypes = {
    currentUser: PropTypes.object,
    handleLogout: PropTypes.func
};

export default connect(mapStateToProps)(Nav);
