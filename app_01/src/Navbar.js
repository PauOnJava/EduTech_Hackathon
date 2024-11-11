import React, { useState, useEffect } from 'react';
import Home from './Home.js';
import Work from "./Work";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {

   return (
       <Router>
           <nav className="navbar navbar-expand-lg navbar-light fixed-top text-white" style={{backgroundColor: 'transparent'}}>
               <div className="container">
                   {/* Logo și Link-uri */}
                   <a className="navbar-brand" href="/">
                       <img src="https://www.cdnlogo.com/logos/r/85/react.svg" alt="Logo" style={{width: '40px', height: '40px', marginRight: '10px'}}/>
                       MyApp
                   </a>
                   <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                           data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                           aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                   </button>
                   <div className="collapse navbar-collapse" id="navbarNav">
                       <ul className="navbar-nav ms-auto">

                           <li className="nav-item ">
                                   <Link className="nav-link" to={'/'}>Home</Link>
                           </li>

                           <li className="nav-item">
                                   <Link className="nav-link" to={'/workspace'}>Workspace</Link>
                           </li>
                       </ul>
                   </div>
                   {/* Pictograma utilizatorului în partea dreaptă */}
                   <a className="navbar-nav ms-auto" href="/profile">
                       <FontAwesomeIcon icon={faUser} style={{fontSize: '1.5rem', color: '#000'}}/>
                   </a>
               </div>
           </nav>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/workspace" element={<Work/>}></Route>
    </Routes>
</Router>

);
           }
           export default Navbar;