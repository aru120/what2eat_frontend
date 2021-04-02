import React from 'react'
import {connect} from 'react-redux'
import RestaurantCard from './RestaurantCard'
import {Container, Row, Col} from 'react-bootstrap'
import '../Style/Favorite.scss'

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
       return this.props.favorites.map(restaurant => <Col key={restaurant.id}><RestaurantCard key={restaurant.yelpid} restaurantObj={restaurant}/></Col>)
    }

  
    randomClickHandler = () =>{
        this.setState(prevState=>({randomFlag: !prevState.randomFlag}))
    }

    render(){
        return(
            <div>
            {/* <h1 className="favHeader">Favorites</h1> */}
            <div className="favButtonContainer">
            <button className="randomFavButton" onClick={this.randomClickHandler}>Random Favorites</button>
            </div>
            <Container className="mt-5">
                <Row className="my-auto text-justify">
            {this.renderFavorites()}

                </Row>

            </Container>
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