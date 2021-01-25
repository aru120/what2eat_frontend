import React from 'react'
import { connect } from 'react-redux'
import { getRestaurants,setSearchTerm } from '../Redux/actions'
import RestaurantCard from '../Components/RestaurantCard'
import Search from '../Components/Search'
import {withRouter} from 'react-router-dom'
import {Container,Row,Col} from 'react-bootstrap'
import '../Style/RestaurantContainer.scss'




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

       this.props.getRestaurants(latitude,longitude,this.state.currentPage,this.props.searchTerm)
    }

    componentWillUnmount(){
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

            if(this.props.stateRestaurant.length === 0 ){
              return  <h1>No Restaurants like that</h1>
            }
            else{
                return this.props.stateRestaurant.map(restaurant => <Col key={restaurant.id}><RestaurantCard key={restaurant.id} restaurantObj={restaurant} /> </Col>)
            }
        }
    }

    infiniteScroll = ()=>{
        const latitude = this.props.coords.latitude
        const longitude = this.props.coords.longitude
        const searchT = this.props.searchTerm

        
            
            if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && this.state.fetchFlag){
                let newPage = this.state.currentPage
                newPage += 20
                console.log("CURRENT PAGE", newPage)
                this.setState(prevState =>({fetchFlag: !prevState.fetchFlag}))
                this.setState({currentPage: newPage})
                console.log("SEARCH TERM", searchT)
                this.props.getRestaurants(latitude,longitude,newPage,searchT)
                setTimeout(()=>{
                      this.setState(prevState =>({fetchFlag: !prevState.fetchFlag}))
                      console.log("INSIDE SET TIMEOUT",this.state.fetchFlag)
                },5000)

        
        }
    }


    randomRedirect = () =>{
        this.props.history.push("/random")
    }


render(){
    return(
        <div>
            
           
          
           <button className="randomButton" onClick={this.randomClickHandler}>Random from list</button>
           <button className="randomButton" onClick={this.randomRedirect}>Random a restaurant near you</button>
           
           <Search />
           {/* {this.cuisinelist()} */}
           <Container className="mt-5" >
                   <h2>Restaurants near you</h2>
               <Row className="my-auto text-justify row">
           {this.props.stateRestaurant ? this.renderRestaurants() : <h2>Finding restaurants near you </h2>}

               </Row>

           </Container>
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

export default withRouter(connect(msp,mdp)(RestaurantContainer))