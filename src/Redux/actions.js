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
        fetch('http://localhost:3000/api/home',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coordinates),
    })
    .then(r => r.json())
    .then(data => 
        {
        const yelpResponse = convertYelpResponse(data.businesses)
        dispatch({ type: actionTypes.setRestaurants, payload: yelpResponse})
        }
        )
   
    }
}

function convertYelpResponse(array){
    let arr = []
    array.forEach(restObj =>{

        const categorey = restObj.categories.map(categorey => categorey.title)
        
        const object = {
            name: restObj.name,
            image: restObj.image_url,
            categories: categorey,
            displayPhone: restObj.display_phone,
            phone: restObj.phone,
            price: restObj.price,
            yelpid: restObj.id, 
            address: restObj.location["address1"],
            city: restObj.location.city,
            state: restObj.location.state,
            zipcode: restObj.location.zip_code,
            rating: restObj.rating

        }
        arr.push(object)
    })
    return arr
}



export function setUser(userObj,history){
    return function (dispatch){
        fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers: {
                accepts: "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({ user: userObj })
        })
        .then(r => r.json())
        .then(data =>{
            localStorage.setItem("token", data.jwt)
            localStorage.setItem("user_id",data.user.id)
            console.log("INSIDE SET USER",data.user.restaurants)
            dispatch({type: actionTypes.setUser, payload: data.user})

             if (data.user.restaurants.length != 0){
                dispatch({type: actionTypes.addFavorite, payload: data.user.restaurants})
             }
            history.push("/home")
             
            return fetch(`http://localhost:3000/api/user/${data.user.id}`)
            .then(r => r.json())
            .then(userData =>{
                dispatch({type: actionTypes.setUser,payload: userData})
            })
        })
    }
}

export function updateFavorite(resObj){
    // console.log("WORKING ADD FAVORITE",resObj)
    return function (dispatch){
        dispatch({type: actionTypes.updateFavorite,payload:resObj})
    }
}
