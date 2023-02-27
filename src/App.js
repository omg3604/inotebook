import React, { Component }  from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
        <div>
          <NavBar></NavBar>
          <Routes>
            <Route exact path='/' element={<Home></Home>}></Route>
            <Route exact path='/about' element={<About></About>}></Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
