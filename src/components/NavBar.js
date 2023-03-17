import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = (props) => {

    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
        props.showAlert('success' , 'Logged Out successfully!');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
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
                            <form className="d-flex" role="search">
                                <Link className='btn btn-primary mx-2' to="/Login" role='button'> Login </Link>
                                <Link className='btn btn-primary mx-2' to="/Signup" role='button'> Signup </Link>
                            </form>
                        :    <form className="d-flex" role="search">
                                <Link className='btn btn-primary mx-2' to="/Login" role='button' onClick={handleLogout}> Log out </Link>
                            </form>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar