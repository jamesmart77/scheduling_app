import React, { Component } from "react";
import { Container, Row, Button } from 'react-materialize';

export class Unauthorized extends Component {
   render(){
        return(
            <Container className='unauthorized-container'>
                <Row>
                    <h3 className='center'>Unauthorized</h3>
                    <p>Ummm this is awkward, but we do not know who you are...Sorry for the 
                        inconvenience but please log in before continuing.
                    </p>
                        <Button href='/users/login'>Log In</Button>
                </Row>
            </Container> 
        )
    }
}

export default Unauthorized;
