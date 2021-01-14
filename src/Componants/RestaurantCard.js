import React from 'react'


class RestaurantCard extends React.Component{




    render(){
        return(
            <div>
             <img src={this.props.restaurantObj.image_url} width="200" height="200" />   
            <h3>{this.props.restaurantObj.name}</h3>
            {this.props.restaurantObj.categories.length === 0 ? null : <h2>{this.props.restaurantObj.categories.map(cuisine => <p>{cuisine.title}</p>)}</h2> }
            </div>
        )
    }

}



export default RestaurantCard