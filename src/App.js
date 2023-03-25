import React from 'react';
import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import UserState from './context/user/UserState';
import Alert from './components/Alert';
import Footer from './components/Footer';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      msg: message
    })
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }
  return (
    <UserState>
      <NoteState>
        <Router>
          <div>
            <NavBar showAlert={showAlert}></NavBar>
            <Alert alert={alert} ></Alert>
            <div className='container'>
              <Routes>
                <Route exact path='/' element={<Home showAlert={showAlert}></Home>}></Route>
                <Route exact path='/about' element={<About></About>}></Route>
                <Route exact path='/Login' element={<Login showAlert={showAlert}></Login>}></Route>
                <Route exact path='/Signup' element={<Signup showAlert={showAlert}></Signup>}></Route>
                <Route exact path='/Account' element={<Account showAlert={showAlert}></Account>}></Route>
              </Routes>
            </div>
            <Footer></Footer>
          </div>
        </Router>
      </NoteState>
    </UserState>
  );
}

export default App;
