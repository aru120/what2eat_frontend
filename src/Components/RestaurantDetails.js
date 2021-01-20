import React, {useState, useEffect } from 'react'
import { updateFavorite, removeFavorite } from '../Redux/actions'
import {connect} from 'react-redux'

class RestaurantDetails extends React.Component{

   componentDidMount(){
       this.fetchItem()
   }

    

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
        if(bool){
            return <h3 style={{color: "green"}}>Opened</h3>    
        }
        else{
            return <h3 style={{color:"red"}}>Closed</h3>
        }
    }


     addToFav = () =>{
       
            
        

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
        let flag = true
        const foundObj = this.props.favorites.find(favorite => favorite.yelpid === this.props.match.params.id)

        console.log("FOUND OBJECT",foundObj)
        if(this.props.user && !foundObj){
                      flag = false
        }
        return flag
    }


    checkRemoveFavorites = () =>{
        let flag = false
        const foundObj = this.props.favorites.find(favorite => favorite.yelpid === this.props.match.params.id)
        if(foundObj){
            flag = true
        }

        return flag
    }
    

    checkDistance = (lat2,lon2) =>{

        const lat1 = this.props.coords.latitude
        const lon1 = this.props.coords.longitude
        const p = 0.017453292519943295;    
         const c = Math.cos;
        const a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

        
        const results = 12742 * Math.asin(Math.sqrt(a)) * 0.6214; 
        return results.toFixed(2)
    }



    restaurantHours = () =>{
        const date = new Date()
        const todaysDay = date.getDay()

      const hoursArray =  this.state.restObj.hours[0].open[todaysDay]
      let startTime = hoursArray.start
      let endTime = hoursArray.end

        let startHour24
        let startAMPM
        let endHour24
        let endAMPM
        let startHour
        let endHour
      if(startTime === "0000"){
           startHour = 12
           startAMPM = 'am'
      }else{
         startHour24 = parseInt(startTime.substring(0,2),10)
         startHour = ((startHour24 + 11)%12) +1
         startAMPM = startHour24 > 11 ? 'pm' : 'am';
        }
        
    if(endTime === "0000"){
             endHour = 12
             endAMPM = 'am'
    }else{
         endHour24 = parseInt(endTime.substring(0,2),10)
        endHour = ((endHour24 + 11)%12) +1
         endAMPM = endHour24 > 11 ? 'pm' : 'am';
    }
        
    
    // const startMinute = startTime.substring(2)
      
    //   const startHour = parseInt(startTime.substring(0,2),10)
      const startMinute = startTime.substring(2)
      const endMinute = endTime.substring(2)


      return <h3>Hours: {startHour}:{startMinute}{startAMPM} - {endHour}:{endMinute}{endAMPM} </h3>

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
                 {this.restaurantHours()}
                <h4>Rating: {this.state.restObj.rating}/5</h4>
                <h3>{this.state.restObj.display_phone} </h3>
                <h3>{this.state.restObj.location["address1"]}</h3>
                <h3>{this.state.restObj.location.city},{this.state.restObj.location.state}</h3>
                <h3>{this.state.restObj.location.zip_code}</h3>
                <h3>Distance: {this.checkDistance(this.state.restObj.coordinates.latitude,this.state.restObj.coordinates.longitude)}miles </h3>
                {this.isOpen(this.state.restObj.hours[0].is_open_now)}
                {this.checkFavorites() ? null :  <button onClick={this.addToFav}>Add to Favorites</button> }
              {this.checkRemoveFavorites() ? <button onClick={this.removeFav}>Remove from Favorite</button> : null }  
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
        user: state.user,
        coords: state.coordinates
    })
}

function mdp(dispatch){
    return({
        updateFavorite: (resObj) => dispatch(updateFavorite(resObj)),
        removeFavorite: (resObj) => dispatch(removeFavorite(resObj))
    })
}

export default connect(msp,mdp)(RestaurantDetails)