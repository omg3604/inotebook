import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer text-dark ">
            <div className="container pt-2">
                <div className="row">
                    <div className="col-md-6 text-end">
                        <p>&copy; 2023 iNoteBook</p>
                    </div>
                    <div className="col-md-6">
                        <p>Made with &hearts; by Om Golhani</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;