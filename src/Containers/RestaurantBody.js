import React from 'react'
import RestaurantCard from '../Components/RestaurantCard'
import RestaurantContainer from './RestaurantContainer'
import { connect } from 'react-redux'

class RestaurantBody extends React.Component{

        

    render(){
        return(
            <div>
           {this.props.coords ? <RestaurantContainer /> : <h2>Loading...</h2>}
           </div>
        )
    }

}

function msp(state){
    return({
        coords: state.coordinates
    })
  }

export default connect(msp)(RestaurantBody)