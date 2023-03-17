import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <NoteState>
      <Router>
        <div>
          <NavBar></NavBar>
          <Alert></Alert>
          <div className='container'>
          <Routes>
            <Route exact path='/' element={<Home></Home>}></Route>
            <Route exact path='/about' element={<About></About>}></Route>
            <Route exact path='/Login' element={<Login></Login>}></Route>
            <Route exact path='/Signup' element={<Signup></Signup>}></Route>
          </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
