import React from 'react'
import { connect } from 'react-redux'
import { getRestaurants } from '../Redux/action'
import RestaurantCard from '../Components/RestaurantCard'

class RestaurantContainer extends React.Component{

    state={
        randomFlag: false
    }

    componentDidMount(){
        const latitude = this.props.coords.latitude
        const longitude = this.props.coords.longitude
        
       this.props.getRestaurants(latitude,longitude)
    }


    randomClickHandler =() =>{
        this.setState(prevState => ({randomFlag: !prevState.randomFlag}))
       console.log(this.state.randomFlag)
    }



    renderRestaurants = ()=>{
        if(this.state.randomFlag){
            const random = Math.floor(Math.random() * this.props.stateRestaurant.length)
            const randomObj = this.props.stateRestaurant[random]
            return <RestaurantCard key={randomObj.id} restaurantObj={randomObj} />
        }
        else{

            return this.props.stateRestaurant.map(restaurant => <RestaurantCard key={restaurant.id} restaurantObj={restaurant} /> )
        }
    }


render(){
    
    return(
        <div>
           <h1>RestaurantContainer</h1>
           <button onClick={this.randomClickHandler}>Random!</button>
           
           {this.props.stateRestaurant ? this.renderRestaurants() : <h2>Finding restaurants near you </h2>}
        </div>
    )
}

}

function msp(state){
    return({
        coords: state.coordinates,
        stateRestaurant: state.restaurants
    })
}

function mdp(dispatch){
    return({
        getRestaurants: (latitude,longitude) => dispatch(getRestaurants(latitude,longitude))
        
    })
}

export default connect(msp,mdp)(RestaurantContainer)