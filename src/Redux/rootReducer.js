import { combineReducers } from 'redux'

const defaultState ={
    coordinates: null,
    restaurants: []
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




const rootReducer = combineReducers({
    coordinates: setCoords,
    restaurants: setRestaurants
})

export default rootReducer