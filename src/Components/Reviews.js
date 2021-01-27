import React from 'react'

function Review(props){
    console.log("INSIDE REVIEW", props)
    return (
        <div>
            <p>"{props.reviewObj.text}"</p>
            <p>-{props.reviewObj.user.name}</p>
        </div>
    )
}

export default Review