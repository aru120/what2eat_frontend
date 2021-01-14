import actionTypes from './actionTypes'
import axios from 'axios'

export function getCoords(){
   return dispatch => {
       const geolocation = navigator.geolocation;
       geolocation.getCurrentPosition((position) =>{
           console.log(position.coords)
           dispatch({type: actionTypes.getCoordinates, payload: position.coords})
       })
   }
}


export function getRestaurants(lat,long){
    const coordinates = {latitude: lat, longitude: long}
   
    

    return function(dispatch){
        fetch('http://localhost:3000/home',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coordinates),
    })
    .then(r => r.json())
    .then(data => dispatch({ type: actionTypes.setRestaurants, payload: data.businesses}))
   
    }
}

// function convertResponse(array){

// }