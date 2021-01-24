import { combineReducers } from 'redux'

const defaultState ={
    coordinates: null,
    restaurants: [],
    user: null,
    favorites: [],
    searchTerm: ""
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
        case "ADD_RESTAURANTS":
            const currentState = state
            const newRestaurants = action.payload
            const newState = currentState.concat(newRestaurants)
            return newState
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
        case "REMOVE_FAVORITE":
            return [...state].filter(restaurant => restaurant.id !== action.payload)
        case "RELOAD_FAVORITES":
            return action.payload
        default:
            return state
    }
}

function searchTerm (state= defaultState.searchTerm, action){
    switch(action.type){
        case "SET_SEARCHTERM":
            return action.payload
        default:
            return state    
        
    }
}

const rootReducer = combineReducers({
    coordinates: setCoords,
    restaurants: setRestaurants,
    user: setUser,
    favorites: addFavorite,
    searchTerm: searchTerm
})

export default rootReducer