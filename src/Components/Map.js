import React from 'react'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    useJsApiLoader
} from '@react-google-maps/api'
import {connect} from 'react-redux'

const libraries = ["places"];
const mapContainerStyle={
    width: "100vw",
    height: "100vh"
};

const center ={
    lat: 43.653225,
    lng: -79.383186,
}



 function Map (props){

    // const center ={
    //     lat: props.center.latitude,
    //     lng: props.center.longitude
    // }

    console.log(center)

    const {isLoaded,loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries,
        
    })

    // const [map,setMap] = React.useState(null)
    // const onLoad = React.useCallback(function callback(map){
    //     const bounds = new window.google.maps.LatLngBounds();
    //     map.fitBounds(bounds)
    //     setMap(map)
    // },[])

    // const onUnmount = React.useCallback(function callback(map){
    //     setMap(null)
    // },[])

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";


    return  <div style={{height:"100vh", width:"100vw"}}>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} ></GoogleMap>
       
    </div>
}

function msp (state){
    return({
        coords: state.coordinates
    })
}

export default connect(msp)(React.memo(Map))