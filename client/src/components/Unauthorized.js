import React, { Component } from "react";
import { Container, Row, Button } from 'react-materialize';

export class Unauthorized extends Component {
   render(){
        return(
            <Container className='unauthorized-container'>
                <Row>
                    <h3 className='center'>Unauthorized</h3>
                    <p className='center'>
                        Sorry for the inconvenience, but please log in before continuing.
                    </p>
                        <Button className='primary-button' 
                                node='a'
                                href='/users/login'>Log In</Button>
                </Row>
            </Container> 
        )
    }
}

export default Unauthorized;
