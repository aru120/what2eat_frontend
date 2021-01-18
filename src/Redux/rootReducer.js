import { combineReducers } from 'redux'

const defaultState ={
    coordinates: null,
    restaurants: [],
    user: null,
    favorites: []
}

function setCoords(state = defaultState.coordinates, action){
    switch (action.type){
        case "GET_COORDS":
            return action.payload;
            default:
                return state
    }
}

function setRestaurants(state = defaultState.restaurants, action){
    switch(action.type){
        case "SET_RESTAURANTS":
            return action.payload;
            default:
                return state
    }
}


function setUser(state = defaultState.user, action){
    switch(action.type){
        case "SET_USER":
            return action.payload;
        case "UPDATE_USER":
            return action.payload
            default:
                return state
    }
}

function addFavorite(state = defaultState.favorites, action){
    switch(action.type){
        case "ADD_FAVORITE":
            return action.payload
        case "UPDATE_FAVORITE":
            console.log("INSIDE UPDATE FAVORITE", action.payload)
            return [...state,action.payload]
        default:
            return state
    }
}


const rootReducer = combineReducers({
    coordinates: setCoords,
    restaurants: setRestaurants,
    user: setUser,
    favorites: addFavorite
})

export default rootReducer