import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Search from './Search';

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
                {this.props.user ? 
                    <NavLink to="/favorites">
                    <li>Favorites</li>
                </NavLink>
                :
                null
            
                }
                
                {this.props.user ? this.props.user.username : 
                <>
                <NavLink to="/login">   
                    <li>Login</li>
                </NavLink>
                <NavLink to="/random">
                    <li>random</li>
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