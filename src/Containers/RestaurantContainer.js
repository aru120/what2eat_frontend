import React from 'react'
import { connect } from 'react-redux'
import { getRestaurants } from '../Redux/actions'
import RestaurantCard from '../Components/RestaurantCard'

class RestaurantContainer extends React.Component{

    state={
        randomFlag: false,
        currentPage: 0,
        fetchFlag: true
    }

    componentDidMount(){
        const latitude = this.props.coords.latitude
        const longitude = this.props.coords.longitude
        {window.addEventListener('scroll',this.infiniteScroll)}

       this.props.getRestaurants(latitude,longitude,this.state.currentPage)
    }

    componentWillMount(){
        window.removeEventListener('scroll',this.infiniteScroll)
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

    infiniteScroll = ()=>{
        const latitude = this.props.coords.latitude
        const longitude = this.props.coords.longitude

        
            
            if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && this.state.fetchFlag){
                let newPage = this.state.currentPage
                newPage += 20
                console.log("CURRENT PAGE", newPage)
                this.setState(prevState =>({fetchFlag: !prevState.fetchFlag}))
                this.setState({currentPage: newPage})

                setTimeout(()=>{
                      this.setState(prevState =>({fetchFlag: !prevState.fetchFlag}))
                      console.log("INSIDE SET TIMEOUT",this.state.fetchFlag)
                },5000)

        
            // this.props.getRestaurants(latitude,longitude,newPage)
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
        stateRestaurant: state.restaurants,
        

    })
}

function mdp(dispatch){
    return({
        getRestaurants: (latitude,longitude,offset) => dispatch(getRestaurants(latitude,longitude,offset))
        
    })
}

export default connect(msp,mdp)(RestaurantContainer)