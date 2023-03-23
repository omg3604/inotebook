import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    
    let navigate = useNavigate();

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API Call
        const {name , email , password } = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name , email , password}), // body data type must match "Content-Type" header
        });

        const json = await response.json();
        console.log(json);

        if (json.success === true) {
            // Login Successful , Save the auth toekn and Redirect to Home page
            // alert("Logged in Successfully");
            // localStorage.setItem('token', json.authtoken);
            navigate("/Login");
            props.showAlert("success" , "Signup done successfully");
        }
        else {
            // Login Unsuccessfull
            //alert(`Signup Unsuccessful ${json.error}`);
            props.showAlert("warning" , json.error);
        }

        setCredentials({ name: "", email: "", password: "", cpassword: "" });
    }

    return (
        <div>
            <div className="container my-5" >
                <hr/>
                <div className="card text-black" style={{borderColor:"white"}}>
                    <div className="card-body p-md-3">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 p-3 " style={{backgroundColor:"#eceaf7" , borderRadius: "20px"}}>

                                <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                <form className="mx-1 mx-md-3" onSubmit={handleSubmit}>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                        <label className="form-label me-3" htmlFor="name">Name</label>
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="text" id="name" name="name" className="form-control" onChange={onchange} required minLength={5}/>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                        <label className="form-label me-3" htmlFor="email">Email</label>
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="email" id="email" name="email" className="form-control" onChange={onchange} required />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <label className="form-label me-3" htmlFor="password">Password</label>
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="password" id="password" name="password" className="form-control" onChange={onchange} required minLength={6}/>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                        <label className="form-label me-3" htmlFor="cpassword">Password</label>
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="password" id="cpassword" name="cpassword" className="form-control" onChange={onchange} required minLength={6}/>
                                            <label className="form-label" htmlFor="cpassword">*Confirm your password</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="submit" className='btn btn-primary mx-2 btn-rounded' style={{backgroundColor: "#92aad0" , borderColor: "#92aad0"}}>Submit</button>
                                    </div>

                                </form>

                            </div>
                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                    className="img-fluid rounded " alt="Sample image" />

                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    )
}

export default Signup