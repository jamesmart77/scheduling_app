import React, { Component } from "react";
import SweetAlert from 'sweetalert2-react';
import PropTypes from 'prop-types';

export class Unauthorized extends Component {
   render(){
        return(
            <div className='unauthorized-container'>
                <SweetAlert
                    show={true}
                    type='error'
                    title='Unauthorized'
                    text='Umm this is awkward, but we do not recognize you. Please login in (again).'
                    onConfirm={() => window.location.replace('/users/login')}
                />
            </div> 
        )
    }
}

Unauthorized.propTypes = {

}

export default Unauthorized;