import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../Redux/actions'

class Login extends React.Component{

    state={
        username: "",
        password: ""
    }



    loginHandler = (e) => {
        e.preventDefault()
        this.props.user(this.state,this.props.history)
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }


    render(){
        return(
            
            <div>
                <h2>Log In</h2>
                <form onSubmit={this.loginHandler}>
                    <label>Username</label>
                    <input type="text" name="username" value={this.state.username} required onChange={this.changeHandler}/>
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} required onChange={this.changeHandler} />
                    <button>Log In</button>

                </form>
            </div>
        )
    }
}

function mdp(dispatch){
    return(
        {
            user: (userObj,history) => dispatch(setUser(userObj,history))
        }
    )
}

export default connect(null,mdp)(Login)