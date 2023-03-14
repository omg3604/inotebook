import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <NoteState>
      <Router>
        <div>
          <NavBar></NavBar>
          <div className='container'>
          <Routes>
            <Route exact path='/' element={<Home></Home>}></Route>
            <Route exact path='/about' element={<About></About>}></Route>
          </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
