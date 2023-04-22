import React from 'react'
import { Link } from 'react-router-dom'
import './WithoutLogin.css'

const WithoutLogin = () => {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid mb-4 pb-4">
        <div className="container">
          <h1 className="display-4 ">Welcome to the iNoteBook</h1>
          <h3 className="display-7 " >Ultimate Note Making Website</h3>
          <p className="lead my-3">Create and organize your notes with ease</p>
          <Link to="/Login" className="btn btn-primary btn-lg mt-4 btncss" >Get Started</Link>
        </div>
      </div>

      <section className="features mb-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 rotate">
              <div className="feature-box">
                <i className="fa-solid fa-rocket fa-3x"></i>
                <h3>Easy to Use</h3>
                <p>Our note-making platform is designed to be user-friendly and intuitive.</p>
              </div>
            </div>
            <div className="col-md-4 rotate">
              <div className="feature-box">
                <i className="fas fa-folder fa-3x"></i>
                <h3>Organize Your Notes</h3>
                <p>Create folders and tags to keep your notes organized and easy to find.</p>
              </div>
            </div>
            <div className="col-md-4 rotate">
              <div className="feature-box">
                <i className="fas fa-globe fa-3x"></i>
                <h3>Access Anywhere</h3>
                <p>Access your notes from anywhere with an internet connection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='my-5'>
<hr></hr>
      </div>
    </div>
  )
}

export default WithoutLogin;