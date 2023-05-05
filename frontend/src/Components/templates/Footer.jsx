import './Footer.css'
import React from 'react'
import {  Link } from 'react-router-dom'
import logo from '../../imgs/logo192.png';


export default props =>
    
    <footer className='footer'>
        <a href="https://github.com/lucasalvespc">
            <span className='footer'>
            Desenvolvido com <img src={logo} alt="logo" width='25px' />  por
            <strong> Lucas <span className="text">Alves</span> </strong>
        </span>
        </a>
        </footer>