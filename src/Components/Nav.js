import React from 'react';
import { NavLink } from 'react-router-dom'

function Nav(){
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
                <li>Login</li>
                <li>Sign Up</li>
            </ul>
        </nav>
    )
}

export default Nav