import React from 'react'
import {connect} from 'react-redux'
import RestaurantCard from './RestaurantCard'

class Favorite extends React.Component{


    renderFavorites = ()=>{
       return this.props.favorites.map(restaurant => <RestaurantCard key={restaurant.yelpid} restaurantObj={restaurant}/>)
    }

    render(){
        console.log("inside favorites",this.props.user.favorites)
        return(
            <div>
            <h1>Inside Favorite Container</h1>
            {this.renderFavorites()}
            </div>
        )
    }
}

function msp(state){
    return({
        user: state.user,
        favorites: state.favorites
    })
}

export default connect(msp)(Favorite)