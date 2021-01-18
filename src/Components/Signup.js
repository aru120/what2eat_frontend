import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../Redux/actions'

class Signup extends React.Component{

    state={
        username: "",
        password: ""
    }



    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) =>{
        e.preventDefault()
        fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accepts: "application/json"
            },
            body: JSON.stringify({ user: this.state })
        })
            .then(response => response.json())
            .then(data => {

                let loginState = {
                    username: this.state.username,
                    password: this.state.password
                }
                console.log("login state", data.jwt)
                // this.props.user(loginState, this.props.history)
            })
            .catch(console.log)

    }

    render(){
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                    <h2>Sign Up</h2>

                    <label>Username</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.changeHandler} required />
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.changeHandler} required />
                    <button>Sign Up</button>
                </form>
            </div>
        )
    }
}

function mdp(dispatch){
    return(
        {
            user: (userObj) => dispatch(setUser(userObj))
        }
    )
}

export default connect(null,mdp)(Signup)