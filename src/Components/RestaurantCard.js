import React from 'react'
import { Link } from 'react-router-dom'


class RestaurantCard extends React.Component{




    render(){
        
        return(
            <Link to={`/home/${this.props.restaurantObj.yelpid}`}>
            <div style={{border: '2px solid black'}}>
             <img src={this.props.restaurantObj.image} width="200" height="200" />   
            <h1>{this.props.restaurantObj.name}</h1>
            {this.props.restaurantObj.categories.length === 0 ? null : <h2>{this.props.restaurantObj.categories.map(cuisine => <p>{cuisine}</p>)}</h2> }

            </div>
            </Link>
        )
    }

}



export default RestaurantCard