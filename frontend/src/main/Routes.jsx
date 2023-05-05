import React from "react"
import {Switch, Route, Redirect } from 'react-router'

import Home from "../Components/home/Home"
import UserCrud from "../Components/user/UserCrud"
import Login from "../Components/login/Login"
import Studant from "../Components/user/Studant"
import Diario from "../Components/diario/Diario"

export default props =>

    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/servidores' component={UserCrud}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/estudantes' component={Studant}/>
        <Route exact path='/diario' component={Diario}/>
        <Route exact path='https://github.com/lucasalvespc'/>
        <Redirect from='*' to='/' />
    </Switch>