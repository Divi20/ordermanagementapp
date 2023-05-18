import React, {Component, Suspense, lazy} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ProtectedRoutes from "./ProtectedRoutes";


const Login = lazy(()=> import('./components/Login'));
const OrderManagementPage = lazy(()=> import('./components/OrderManagementPage'))

export class AppRoutes extends Component {

    render(){
        return(
            <Suspense fallback=''>
            <Switch>
            <Route exact path='/'>
            <Redirect to ="/login"></Redirect>
            </Route>
            <Route exact path='/login' component={Login}></Route>
            <ProtectedRoutes exact path='/ordermanagementpage' component={OrderManagementPage}></ProtectedRoutes>
            </Switch>
            </Suspense>
        )
    }
}