import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function ProtectedRoutes({component : Component, ...rest}){
    return(
        <Route
        {...rest}
        render = {(props)=>{
            const username  = localStorage.getItem('username');
            if(username){
                return <Component {...props} />
            }
            else{
                return(
                    <Redirect to={{
                        pathName  : "/login",
                        state :  {
                            reon : props.location
                        }
                    }}   
                    />            
                     )
            }
        }}
        />
    )

}