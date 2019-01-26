import React from "react";
import { Row, Col, Navbar, NavItem} from 'react-materialize';

export class Nav extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <Navbar brand='Sched-Aroo' right>
                <NavItem href='/login'>Login</NavItem>
            </Navbar>
        )
    }
}


export default Nav;
