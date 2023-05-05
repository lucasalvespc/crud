import './Nav.css'
import React from 'react'
import {  Link } from 'react-router-dom'

export default props =>
<aside className="menu-area">
    <nav className='menu'> 
        <Link to="/">
            <i className="fa fa-home"></i> Início
        </Link>
        <Link to='/servidores'>
            <i className="fa fa-users"></i> Servidores
        </Link>
        <Link to="/login">
            <i className="fa fa-user-circle-o"></i> Login
        </Link>
        <Link to= "/estudantes">
            <i className="fa fa-address-card-o"></i> Estudantes
        </Link>
        <Link to= "/diario">
            <i className="fa fa-address-book-o"></i> Diario
        </Link>
    </nav>
</aside>