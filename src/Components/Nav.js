import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends React.Component{

     logOutHandler = () =>{
        localStorage.clear()
        window.location.href = '/home'
    }

    render(){

        return(
            <nav>
                <h3>What2Eat</h3>
                <ul>
                <NavLink to="/home">
                    <li>Home</li>
                </NavLink>
                <NavLink to="/favorites">
                    <li>Favorites</li>
                </NavLink>
                {this.props.user ? this.props.user.username : 
                <>
                <NavLink to="/login">   
                    <li>Login</li>
                </NavLink>
                <NavLink to="/signup">
                    <li>Sign Up</li>
                </NavLink> 
                </> }
                {this.props.user ?  <button onClick={this.logOutHandler}>Log out</button>  : null }
               
                </ul>
            </nav>
        )
    }
}

function msp(state){
    return({
        user: state.user
    })
}

export default connect(msp)(Nav)