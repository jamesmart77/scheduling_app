import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='user-container'>
                <h3>Welcome to the User Home page!</h3>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

Home.propTypes = {
    currentUser: PropTypes.object
};

export default connect(mapStateToProps)(Home);