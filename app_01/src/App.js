// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.js';
import Work from './Work';
import Navbar from './Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

    return (
        <>
            <Navbar  />
        </>

    );
}

export default App;
