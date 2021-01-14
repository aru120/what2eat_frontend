import React, {useState, useEffect } from 'react'

function RestaurantDetails ({ match }){

    useEffect(()=>{
        fetchItem()
    },[])

    const [item,setItem] = useState({
        location: {},
        categories: []
    });

    const fetchItem = async ()=>{
        
        const fetchItem = await  fetch(`http://localhost:3000/home/${match.params.id}`,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(match.params.id),
        })
        const item = await fetchItem.json();
        setItem(item)
        console.log(item)
    }

    const isOpen = (bool) =>{
        if(!bool){
            return <h3 style={{color: "green"}}>Opened</h3>    
        }
        else{
            return <h3 style={{color:"red"}}>Closed</h3>
        }
    }



    return(
        <div>
            <img src={item.image_url} />
            <h1>{item.name}</h1>
            {item.categories.map(category => <span>{category.title} </span>)}
            <h4>Rating: {item.rating}/5</h4>
            <h3>{item.display_phone} </h3>
            <h3>{item.location["address1"]}</h3>
            <h3>{item.location.city},{item.location.state}</h3>
            <h3>{item.location.zip_code}</h3>
            {isOpen(item.is_closed)}
            <button>Add to Favorites</button>
        </div>
    )
}

export default RestaurantDetails