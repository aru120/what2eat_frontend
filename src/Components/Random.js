import React from 'react'
import {connect} from 'react-redux'
import { updateFavorite, removeFavorite } from '../Redux/actions'
import RestaurantCard from './RestaurantCard'


class Random extends React.Component{

    state={
        randomObj: null
    }

    componentDidMount(){
        this.fetchItem()
    }

  

    fetchItem = async ()=>{

        const randomNumber = Math.floor(Math.random() * Math.floor(900))
        console.log(randomNumber)
        const randomObj ={
            latitude: this.props.coords.latitude,
            longitude: this.props.coords.longitude,
            randomNumber: randomNumber
        }
        const fetchItem = await fetch(`http://localhost:3000/api/random`,{
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(randomObj)
        })
        const item = await fetchItem.json();
       this.convertYelpResponse(item.businesses[0])
    }

    convertYelpResponse = (array) =>{
        

        const arrCategory = array.categories.map(category => category.title)

        const object ={
             name: array.name,
            image: array.image_url,
            categories: arrCategory,
            displayPhone: array.display_phone,
            phone: array.phone,
            price: array.price,
            yelpid: array.id, 
            address: array.location["address1"],
            city: array.location.city,
            state: array.location.state,
            zipcode: array.location.zip_code,
            rating: array.rating
        }
            this.setState({randomObj : object})
    }


    renderRandomRestaurant = ()=>{
        return <RestaurantCard key={this.state.randomObj.id} restaurantObj={this.state.randomObj} />
    }




//     addToFav = () =>{
       
            
        

//         const user_id = localStorage.getItem("user_id")
//         const yelpid = this.state.restObj.id
//         const yelpalias = this.state.restObj.alias
//         const categoriesArray = []
//         if(this.state.restObj.categories.length !== 0){
//             this.state.restObj.categories.forEach(categorey => categoriesArray.push(categorey.title))
//         }
//         console.log(categoriesArray)
//         const favoriteObj = {
            
//             yelpid: yelpid,
//             yelpalias: yelpalias,
//             name: this.state.restObj.name,
//             image: this.state.restObj.image_url,
//             categories: categoriesArray
//         }

//         fetch('http://localhost:3000/api/restaurant',{
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(favoriteObj),
//         })
//         .then(r => r.json())
//         .then(data => {
//             this.props.updateFavorite(data)
//             console.log("RESTAURANT POST",data)
//             return fetch('http://localhost:3000/api/favorite',{
//                 method: "POST",
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     user_id: user_id,
//                     restaurant_id: data.id
//                 }),
//             })
//             .then(r => r.json())
//             .then(favData => console.log("FAVORITE POST", favData))
//         })
    
// }


// removeFav = ()=>{
//     fetch(`http://localhost:3000/api/user/${this.props.user.id}`)
//     .then(r=>r.json())
//     .then(data=>{
//        const found = data.restaurants.find(restaurant => restaurant.yelpid === this.state.restObj.id)
//        console.log("ISIDE REMOVE",found)

//        return fetch(`http://localhost:3000/api/restaurant/${found.id}`,{
//            method: "DELETE"
//        })
//         .then(this.props.removeFavorite(found))
//     })
// }

// checkFavorites = () =>{
//     let flag = true
//     const foundObj = this.props.favorites.find(favorite => favorite.yelpid === this.props.match.params.id)

//     console.log("FOUND OBJECT",foundObj)
//     if(this.props.user && !foundObj){
//                   flag = false
//     }
//     return flag
// }


// checkRemoveFavorites = () =>{
//     let flag = false
//     const foundObj = this.props.favorites.find(favorite => favorite.yelpid === this.props.match.params.id)
//     if(foundObj){
//         flag = true
//     }

//     return flag
// }


// checkDistance = (lat2,lon2) =>{

//     const lat1 = this.props.coords.latitude
//     const lon1 = this.props.coords.longitude
//     const p = 0.017453292519943295;    
//      const c = Math.cos;
//     const a = 0.5 - c((lat2 - lat1) * p)/2 + 
//       c(lat1 * p) * c(lat2 * p) * 
//       (1 - c((lon2 - lon1) * p))/2;

    
//     const results = 12742 * Math.asin(Math.sqrt(a)) * 0.6214; 
//     return results.toFixed(2)
// }



// restaurantHours = () =>{
//     const date = new Date()
//     const todaysDay = date.getDay()

//   const hoursArray =  this.state.restObj.hours[0].open[todaysDay]
//   let startTime = hoursArray.start
//   let endTime = hoursArray.end

//     let startHour24
//     let startAMPM
//     let endHour24
//     let endAMPM
//     let startHour
//     let endHour
//   if(startTime === "0000"){
//        startHour = 12
//        startAMPM = 'am'
//   }else{
//      startHour24 = parseInt(startTime.substring(0,2),10)
//      startHour = ((startHour24 + 11)%12) +1
//      startAMPM = startHour24 > 11 ? 'pm' : 'am';
//     }
    
// if(endTime === "0000"){
//          endHour = 12
//          endAMPM = 'am'
// }else{
//      endHour24 = parseInt(endTime.substring(0,2),10)
//     endHour = ((endHour24 + 11)%12) +1
//      endAMPM = endHour24 > 11 ? 'pm' : 'am';
// }
    

// // const startMinute = startTime.substring(2)
  
// //   const startHour = parseInt(startTime.substring(0,2),10)
//   const startMinute = startTime.substring(2)
//   const endMinute = endTime.substring(2)


//   return <h3>Hours: {startHour}:{startMinute}{startAMPM} - {endHour}:{endMinute}{endAMPM} </h3>

// }



    render(){
        console.log(this.state.randomObj)
        return(
            <div>
                 {this.state.randomObj ? this.renderRandomRestaurant() : null }
                {/* {this.state.restObj ?
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
            } */}
            </div>
        )
    }
}

function msp(state){
    return({
        coords: state.coordinates,
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

export default connect(msp,mdp)(Random)