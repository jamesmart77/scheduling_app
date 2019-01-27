import React, { Component } from "react";
import { css } from '@emotion/core';
import { SyncLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const override = css`
    display: block;
    margin: 0 auto;
    position: fixed;
    top: 50%;
    left: 41%;
`;

export class LoadingSpinner extends Component {

    render(){
        const { loading } = this.props;

        return(
            <div className='sweet-loading'>
                <SyncLoader
                    css={override}
                    sizeUnit={"px"}
                    size={50}
                    color={'#123abc'}
                />
            </div> 
        )
    }
}

LoadingSpinner.propTypes = {
    css: PropTypes.object
}

export default LoadingSpinner;
