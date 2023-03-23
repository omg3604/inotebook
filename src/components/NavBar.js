import React, { useContext , useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context/user/userContext';

const NavBar = (props) => {
    const context = useContext(UserContext);
    const {details} = context;

    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
        props.showAlert('success', 'Logged Out successfully!');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid mx-3">
                    <Link className="navbar-brand" style={{color: "#403586"}} to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ?
                            <form className="d-flex">
                                <Link className='btn btn-primary mx-2 btn-rounded' style={{backgroundColor: "#92aad0" , borderColor: "#92aad0"}} to="/Login" role='button'> Login </Link>
                                <Link className='btn btn-primary mx-2 btn-rounded' style={{backgroundColor: "#92aad0" , borderColor: "#92aad0"}} to="/Signup" role='button'> Signup </Link>
                            </form>
                        :   <form className="d-flex mx-2">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-light dropdown-toggle d-flex flex-row align-items-center " data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <p className='mx-2 pt-3'>{details.name}</p>
                                        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" className="rounded-circle" style={{width : "40px"}} alt="Avatar"></img>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <Link className="dropdown-item" aria-current="page" to="/Account">My Account</Link>
                                        <a className="dropdown-item" href="/">Another action</a>
                                        <a className="dropdown-item" href="/">Something else here</a>
                                        <div className="dropdown-divider"></div>
                                        <Link className='btn btn-primary mx-2 btn-rounded' style={{backgroundColor: "#92aad0" , borderColor: "#92aad0"}} to="/Login" role='button' onClick={handleLogout}> Log out </Link>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;