import 'bootstrap/dist/css/bootstrap.min.css'
import'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'

import Logo from '../Components/templates/Logo'
import Nav from '../Components/templates/Nav'
import Routes from './Routes'
import Footer from '../Components/templates/Footer'

export default props =>
  <BrowserRouter>
        <div className='app'>
            <Logo />
            <Nav />
            <Routes/>
            <Footer />
        </div>

  </BrowserRouter>
  