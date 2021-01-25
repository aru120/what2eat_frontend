import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {Navbar, Nav} from 'react-bootstrap'
import '../Style/Navigation.scss'

class Navigation extends React.Component{

     logOutHandler = () =>{
        localStorage.clear()
        window.location.href = '/home'
    }

    render(){

        return(
            <Navbar className="navcontainer" >
                <Navbar.Brand>
                    <img src="/what2eatlogo.png" alt="what2eatlogo" />
                </Navbar.Brand>
                <Nav className="ml-auto navLinks" >
                    <Nav.Item className="mr-3">
                        <NavLink className="navyLink" to="/home">
                            Home
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item className="mr-3 navyLink">
                        {this.props.user ? 
                            <NavLink  className="navyLink" to="/favorites">
                        Favorites
                        </NavLink>
                        :
                        null
                    
                        }
                    </Nav.Item>
                
                {this.props.user ? 
                <Nav.Item className="mr-3 navyLink">
                {this.props.user.username}
                </Nav.Item> : 
                <>
                <Nav.Item className="mr-3 navyLink">
                <NavLink className="navyLink" to="/login">   
                  Login
                </NavLink>
                </Nav.Item >
                <Nav.Item className="mr-3 navyLink">   
                <NavLink className="navyLink" to="/signup">
                   Sign Up
                </NavLink>
                </Nav.Item> 
                </> }
                {this.props.user ?  <Nav.Item className="mr-3 navyLink" onClick={this.logOutHandler}>Log out</Nav.Item>  : null }
               
                </Nav>
              
            </Navbar>
        )
    }
}

function msp(state){
    return({
        user: state.user
    })
}

export default connect(msp)(Navigation)