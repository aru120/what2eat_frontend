import React, {useState, useEffect } from 'react'
import { updateFavorite, removeFavorite } from '../Redux/actions'
import {connect} from 'react-redux'

class RestaurantDetails extends React.Component{

   componentDidMount(){
       this.fetchItem()
   }

    // const [item,setItem] = useState({
    //     location: {},
    //     categories: []
    // }); 

    state={
        restObj: null
    }

     fetchItem = async ()=>{
        
        const fetchItem = await  fetch(`http://localhost:3000/api/home/${this.props.match.params.id}`,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.match.params.id),
        })
        const item = await fetchItem.json();
        this.setState({restObj: item})
        console.log(item)
    }

     isOpen = (bool) =>{
        if(!bool){
            return <h3 style={{color: "green"}}>Opened</h3>    
        }
        else{
            return <h3 style={{color:"red"}}>Closed</h3>
        }
    }


     addToFav = () =>{
        if(!this.props.user){
            alert("Please Login")
        } else{

            const user_id = localStorage.getItem("user_id")
            const yelpid = this.state.restObj.id
            const yelpalias = this.state.restObj.alias
            const categoriesArray = []
            if(this.state.restObj.categories.length !== 0){
                this.state.restObj.categories.forEach(categorey => categoriesArray.push(categorey.title))
            }
            console.log(categoriesArray)
            const favoriteObj = {
                
                yelpid: yelpid,
                yelpalias: yelpalias,
                name: this.state.restObj.name,
                image: this.state.restObj.image_url,
                categories: categoriesArray
            }
    
            fetch('http://localhost:3000/api/restaurant',{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(favoriteObj),
            })
            .then(r => r.json())
            .then(data => {
                this.props.updateFavorite(data)
                console.log("RESTAURANT POST",data)
                return fetch('http://localhost:3000/api/favorite',{
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user_id,
                        restaurant_id: data.id
                    }),
                })
                .then(r => r.json())
                .then(favData => console.log("FAVORITE POST", favData))
            })
        }
    }


    removeFav = ()=>{
        fetch(`http://localhost:3000/api/user/${this.props.user.id}`)
        .then(r=>r.json())
        .then(data=>{
           const found = data.restaurants.find(restaurant => restaurant.yelpid === this.state.restObj.id)
           console.log("ISIDE REMOVE",found)

           return fetch(`http://localhost:3000/api/restaurant/${found.id}`,{
               method: "DELETE"
           })
            .then(this.props.removeFavorite(found))
        })
    }

    checkFavorites = () =>{
        let flag = false
        this.props.favorites.forEach(favorite => {

            
            if(favorite.yelpid === this.props.match.params.id){
                  flag = true
            }
            
        })
        return flag
    }





    render(){
        console.log(this.props.match.params.id)
        return(
            <div>
                {this.state.restObj ?
                <>
                 <img src={this.state.restObj.image_url} />
                <h1>{this.state.restObj.name}</h1>
                {this.state.restObj.categories.map(category => <span>{category.title} </span>)}
                <h4>Rating: {this.state.restObj.rating}/5</h4>
                <h3>{this.state.restObj.display_phone} </h3>
                <h3>{this.state.restObj.location["address1"]}</h3>
                <h3>{this.state.restObj.location.city},{this.state.restObj.location.state}</h3>
                <h3>{this.state.restObj.location.zip_code}</h3>
                {this.isOpen(this.state.restObj.is_closed)}
                {this.checkFavorites() ? null :  <button onClick={this.addToFav}>Add to Favorites</button> }
                <button onClick={this.removeFav}>Remove from Favorite</button>
                </>    
            :
            <h3> One Moment please</h3>
            }
               
            </div>
        )
    }

}

function msp(state){
    return({
        favorites: state.favorites,
        user: state.user
    })
}

function mdp(dispatch){
    return({
        updateFavorite: (resObj) => dispatch(updateFavorite(resObj)),
        removeFavorite: (resObj) => dispatch(removeFavorite(resObj))
    })
}

export default connect(msp,mdp)(RestaurantDetails)