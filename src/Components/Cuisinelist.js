import React from 'react'
import { cuisines } from '../List/Cuisine'
import { getRestaurants,setSearchTerm } from '../Redux/actions'
import {connect} from 'react-redux'

class Cuisinelist extends React.Component{

    state={
        buttonTerm: ""
    }


  cuisinelist  = ()=>{
        const shuffled = this.shuffleArray(cuisines)
        const slicedArray = shuffled.slice(0,5)
        return slicedArray.map(index => <button onClick={this.runner.bind(this,{index})}>{index}</button>)
    }

    cuisinelistHandler=(value)=>{
      
        this.props.setSearchTerm(value.index)
      return new Promise((resolve,reject)=>{
          resolve(this.setState({buttonTerm: value.index}))
        
      })  
        
    }

    runner = (value) =>{
      return  this.cuisinelistHandler(value)
      .then(this.runSearch)
    }

    runSearch = () =>{
        const latitude = this.props.coords.latitude
        const longitude = this.props.coords.longitude

        this.props.getRestaurants(latitude,longitude,0,this.state.buttonTerm)


    }

    shuffleArray = (array) =>{
        let m = array.length
        let t = null;
        let i = 0;

        while(m){
            i = Math.floor(Math.random() * m--);

            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array
    }

    render(){
        return(
            <div>
                {this.cuisinelist()}
            </div>
        )
    }

}

function msp(state){
    return({
        coords: state.coordinates,
        stateRestaurant: state.restaurants,
        searchTerm: state.searchTerm
        

    })
}

function mdp(dispatch){
    return({
        getRestaurants: (latitude,longitude,offset,term) => dispatch(getRestaurants(latitude,longitude,offset,term)),
        setSearchTerm: (term) => dispatch(setSearchTerm(term))

        
    })
}
export default connect(msp,mdp)(Cuisinelist)