import React, { Component } from "react";
import { css } from '@emotion/core';
import { SyncLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const override = css`
    display: block;
    margin: 0 23%;
    position: fixed;
    top: 50%;
`;

export class LoadingSpinner extends Component {

    render(){
        const { loading } = this.props;

        return(
            <div className='sweet-loading'>
                <SyncLoader
                    css={override}
                    sizeUnit={"rem"}
                    size={3.5}
                    color={'#64908A'}
                />
            </div> 
        )
    }
}

LoadingSpinner.propTypes = {
    css: PropTypes.object
}

export default LoadingSpinner;
