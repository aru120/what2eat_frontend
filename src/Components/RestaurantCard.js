import React from 'react'
import {withRouter} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import '../Style/RestaurantCard.scss'


class RestaurantCard extends React.Component{


    redirectFromCard =()=>{
        this.props.history.push(`/home/${this.props.restaurantObj.yelpid}`)
    }


    render(){
        
        return(
            <div>
            <Card className="ml-4 mr-4 mb-5"style={{width: '18rem', height:"25rem"}}>
                
                <Card.Img src={this.props.restaurantObj.image} style={{width:"auto", height:"200px"}} />
                <Card.Body>           
                      <Card.Title>
              {this.props.restaurantObj.name}
             </Card.Title>
             <Card.Subtitle>
            {this.props.restaurantObj.address}
            </Card.Subtitle>
            <Card.Text>
            {this.props.restaurantObj.categories.length === 0 ? null : <Card.Text className="categorylist">{this.props.restaurantObj.categories.map(cuisine => <li>{cuisine}</li>)}</Card.Text> }
            </Card.Text>
            </Card.Body>
            <Card.Body>
            <Button onClick={this.redirectFromCard} variant="primary">See Details</Button>
            </Card.Body>

            </Card>
            </div>
        )
    }

}



export default withRouter(RestaurantCard)