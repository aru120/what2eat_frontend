import React from 'react'
import { connect } from 'react-redux'
import { getRestaurants, setSearchTerm  } from '../Redux/actions'


class Search extends React.Component{

    state={
        term: ""
    }

    changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    searchHandler = e =>{
        e.preventDefault()
        const latitude = this.props.coords.latitude
        const longitude = this.props.coords.longitude
        console.log(this.state.term)
        this.props.setSearchTerm(this.state.term)
        this.props.getRestaurants(latitude,longitude,0,this.state.term)


    }

    render(){
        return(
           <form onSubmit={this.searchHandler}>
               <input type="text" name="term" placeholder="Cuisine,Restaurant" value={this.state.term} onChange={this.changeHandler}/>
               <button className="randomButton">Search</button>
           </form>
        )
    }
}

function msp(state){
    return({
        coords: state.coordinates,
    })
}

function mdp(dispatch){
    return({
        getRestaurants: (latitude,longitude,offset,term) => dispatch(getRestaurants(latitude,longitude,offset,term)),
        setSearchTerm: (term) => dispatch(setSearchTerm(term))
    })
}
export default connect(msp,mdp)(Search)