import React from 'react'
import { Route, Switch } from 'react-router-dom'
import RestaurantContainer from './RestaurantContainer'

class Header extends React.Component{


    render(){
        return(
            <div>
                <Switch>
                    <>
                        <Route path="/home" component={RestaurantContainer} />
                        
                    </>
                </Switch>
            </div>
        )
    }
}

export default Header