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
            <Navbar className="navcontainer" variant="dark" bg="dark">
                <Navbar.Brand>What2Eat</Navbar.Brand>
                <Nav className="justify-content-end" >
                    <Nav.Item>
                        <NavLink to="/home">
                            Home
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        {this.props.user ? 
                            <NavLink to="/favorites">
                        Favorites
                        </NavLink>
                        :
                        null
                    
                        }
                    </Nav.Item>
                
                {this.props.user ? this.props.user.username : 
                <>
                <Nav.Item>
                <NavLink to="/login">   
                  Login
                </NavLink>
                </Nav.Item>
                <Nav.Item>   
                <NavLink to="/signup">
                   Sign Up
                </NavLink>
                </Nav.Item> 
                </> }
                {this.props.user ?  <button onClick={this.logOutHandler}>Log out</button>  : null }
               
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