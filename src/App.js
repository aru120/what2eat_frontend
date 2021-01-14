import logo from './logo.svg';
// import './App.css';
import React from 'react'
import { connect } from 'react-redux'
import {getCoords} from './Redux/action'
import RestaurantContainer from './Containers/RestaurantContainer'
import Nav from './Components/Nav'
import { Route, Switch } from 'react-router-dom'
import Favorites from './Components/Favorites';
import RestaurantBody from './Containers/RestaurantBody';
import RestaurantDetails from './Components/RestaurantDetails';


class App extends React.Component{

  componentDidMount(){
    this.props.getCoords()
  }

  render(){

    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/home" exact component={RestaurantBody} />
          <Route path="/favorites" component={Favorites} />
          <Route path='/home/:id' component={RestaurantDetails}/>
        </Switch>
      </div>
    );
  }
}

function mdp(dispatch){
  return({
    getCoords: () => dispatch(getCoords())
  })
}

function msp(state){
  return({
      coords: state.coordinates
  })
}
export default connect(msp,mdp)(App);
