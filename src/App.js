import logo from './logo.svg';
// import './App.css';
import React from 'react'
import { connect } from 'react-redux'
import {getCoords} from './Redux/action'
import RestaurantContainer from './Containers/RestaurantContainer'

class App extends React.Component{

  componentDidMount(){
    this.props.getCoords()
  }

  render(){

    return (
      <div className="App">
       <h1>Inside APP</h1>
        {this.props.coords ? <RestaurantContainer /> : <h1>One Moment please</h1>}
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
