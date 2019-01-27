import React, { Component } from "react";
import { Navbar, NavItem} from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Nav extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const { currentUser } = this.props;

        return(
            <Navbar brand='Sched-Aroo' right>
                {currentUser.email === '' ? (
                    <NavItem href='/login'>Login</NavItem>
                ) : (
                    <NavItem href='/'>Logout</NavItem>
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
    currentUser: PropTypes.object
};

export default connect(mapStateToProps)(Nav);
