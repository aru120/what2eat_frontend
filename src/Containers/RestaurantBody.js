import React from 'react'
import RestaurantCard from '../Components/RestaurantCard'
import RestaurantContainer from './RestaurantContainer'
import { connect } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import CuisineList from '../Components/Cuisinelist'


class RestaurantBody extends React.Component{

        

    render(){
        return(
            <div>
            <CuisineList />    
           {this.props.coords ? <RestaurantContainer /> : <> <Spinner animation="grow" variant="success" />
  <Spinner animation="grow" variant="danger" />
  <Spinner animation="grow" variant="warning" /></>}
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