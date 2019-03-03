import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Row, Col, Preloader } from 'react-materialize';

export class LoadingSpinner extends Component {

    render(){
        return(
            <div className='loading-container'>
                <Row>
                    <Col s={12}>
                        <Preloader className='loading-spinner' flashing/>
                    </Col>
                </Row>
            </div> 
        )
    }
}

LoadingSpinner.propTypes = {
    css: PropTypes.object
}

export default LoadingSpinner;
