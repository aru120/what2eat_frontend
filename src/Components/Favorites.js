import React from 'react'
import {connect} from 'react-redux'
import RestaurantCard from './RestaurantCard'

class Favorite extends React.Component{

    state={
        randomFlag: false
    }

    renderFavorites = ()=>{
        if(this.state.randomFlag){
            const random = Math.floor(Math.random() * this.props.favorites.length)
            const randomObj = this.props.favorites[random]
            return <RestaurantCard key={randomObj.id} restaurantObj={randomObj} />
        }
       return this.props.favorites.map(restaurant => <RestaurantCard key={restaurant.yelpid} restaurantObj={restaurant}/>)
    }

  
    randomClickHandler = () =>{
        this.setState(prevState=>({randomFlag: !prevState.randomFlag}))
    }

    render(){
        return(
            <div>
            <h1>Inside Favorite Container</h1>
            <button onClick={this.randomClickHandler}>Random Favorites</button>
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