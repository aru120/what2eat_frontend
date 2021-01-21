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
            <Navbar>
                <h3>What2Eat</h3>
                <Nav className="justify-content-end" as="ul">
                <NavLink to="/home">
                    Home
                </NavLink>
                {this.props.user ? 
                    <NavLink to="/favorites">
                   Favorites
                </NavLink>
                :
                null
            
                }
                
                {this.props.user ? this.props.user.username : 
                <>
                <NavLink to="/login">   
                  Login
                </NavLink>
             
                <NavLink to="/signup">
                   Sign Up
                </NavLink> 
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