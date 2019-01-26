import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Nav from '../components/Nav';

export class Landing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='landing-container'>
                <Nav/>
                <h5>Welcome to the landing page!</h5>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

Landing.propTypes = {
    currentUser: PropTypes.object
};

export default connect(mapStateToProps)(Landing);