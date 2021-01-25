import logo from './logo.svg';
import './App.scss';
import React from 'react'
import { connect } from 'react-redux'
import {getCoords} from './Redux/actions'
import RestaurantContainer from './Containers/RestaurantContainer'
import Navigation from './Components/Navigation'
import { Route, Switch } from 'react-router-dom'
import Favorites from './Components/Favorites';
import RestaurantBody from './Containers/RestaurantBody';
import RestaurantDetails from './Components/RestaurantDetails';
import Login from './Components/Login'
import Signup from './Components/Signup';
import { setUser,updateUser,reloadFavorite } from './Redux/actions'
import Random from './Components/Random';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component{

  componentDidMount(){
    this.props.getCoords()

    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))


    if (token) {
      fetch('http://localhost:3000/api/profile', {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(r => r.json())
      .then(data => {
          console.log("INSIDE APP COMPOPNENT",data)
          this.props.updateUser(user)
          this.props.reloadFavorite(user.restaurants)
      })
    }



  }

  render(){

    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/home" exact component={RestaurantBody} />
          <Route path="/favorites" component={Favorites} />
          <Route path='/home/:id' component={RestaurantDetails}/>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/random" component={Random} />
        </Switch>
      </div>
    );
  }
}

function mdp(dispatch){
  return({
    getCoords: () => dispatch(getCoords()),
    setUser: (userObj) => dispatch(setUser(userObj)),
    updateUser: (userObj) => dispatch(updateUser(userObj)),
    reloadFavorite:(favArray) => dispatch(reloadFavorite(favArray))
  })
}

function msp(state){
  return({
      coords: state.coordinates
  })
}
export default connect(msp,mdp)(App);
