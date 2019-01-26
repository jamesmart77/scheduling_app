import React, { Component } from "react";
import { css } from '@emotion/core';
import { ClimbingBoxLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export class LoadingSpinner extends Component {

    render(){
        const { loading } = this.props;

        return(
            <div className='sweet-loading'>
                <ClimbingBoxLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={loading}
                />
            </div> 
        )
    }
}

LoadingSpinner.propTypes = {
    loading: PropTypes.bool
}

export default LoadingSpinner;
