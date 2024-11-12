import React, { useState, useEffect } from 'react';
import Home from './Home.js';
import Work from "./Work";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import imagePath from './assets/ME.png';
import './Navbar.css';
const Navbar = ({ navbarType }) => {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {

                setShowNavbar(false);
            } else {

                setShowNavbar(true);
            }
            setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollTop]);
    const navbarClass = navbarType === 'fixed' ? 'navbar fixed-top' : 'navbar sticky-top';
    const navbarVisibility = showNavbar ? '' : 'd-none';
   return (
       <Router>
           <div className={`${navbarVisibility}`}>
           <nav className="navbar navbar-expand-lg fixed-top navbar-light sticky-top shadow-md bg-dark bg-opacity-50" style={{backgroundColor: 'transparent'}}>
               <div className="container">
                   <a className="navbar-brand text-white" href="/">
                       <img src={imagePath} alt="MemoMe Logo" style={{width: '40px', height: '40px', marginRight: '10px'}}/>

                   </a>
                   <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                           data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                           aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                   </button>
                   <div className="collapse navbar-collapse" id="navbarNav">
                       <ul className="navbar-nav ms-auto">

                           <li className="nav-item ">
                                   <Link className="nav-link text-white" to={'/'}>Home</Link>
                           </li>

                           <li className="nav-item">
                                   <Link className="nav-link text-white" to={'/workspace'}>Workspace</Link>
                           </li>
                       </ul>
                   </div>
                   <a className="navbar-nav ms-auto" href="/profile">
                       <FontAwesomeIcon icon={faUser} style={{fontSize: '1.5rem', color: '#fff'}}/>
                   </a>
               </div>
           </nav></div>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/workspace" element={<Work/>}></Route>
    </Routes>
</Router>

);
           }
           export default Navbar;