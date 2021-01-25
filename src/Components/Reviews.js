import React from 'react'

function Review(props){
    console.log("INSIDE REVIEW", props)
    return (
        <div>
            <p>User: {props.reviewObj.user.name}</p>
            <p>"{props.reviewObj.text}"</p>
        </div>
    )
}

export default Review