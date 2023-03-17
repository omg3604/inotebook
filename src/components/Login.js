import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    //const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");

    let navigate = useNavigate();

    // const onchangeEmail = (e) => {
    //     setEmail(e.target.value);
    // }

    // const onchangePassword = (e) => {
    //     setPassword(e.target.value);
    // }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API Call
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials), // body data type must match "Content-Type" header
        });

        const json = await response.json();
        console.log(json);

        if (json.success === true) {
            // Login Successful , Save the auth toekn and Redirect to Home page
            // alert("Logged in Successfully");
            console.log(json.authToken);
            localStorage.setItem('token', json.authToken);
            console.log("the auth token is : ", localStorage.getItem('token'));
            navigate("/");
            props.showAlert("success", "Logged In successfully");
        }
        else {
            // Login Unsuccessfull
            // alert("Invalid Credentials , Login Unsuccessfull.");
            props.showAlert("warning", json.error);
        }


        setCredentials({ email: "", password: "" });
        // setEmail("");
        // setPassword("");
    }

    return (
        <div className='container my-5'>
            <div className="container my-5">
                <div className="card text-black" style={{ borderRadius: "25px" }}>
                    <div className="card-body p-md-3">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc6-S-VnSgVpVmKh9duISEhAQQ-bd7oXJm5wosD_SFew&usqp=CAU&ec=48600113"
                                    className="img-fluid rounded mx-auto d-block" alt="Sample image" />

                            </div>
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 p-3">

                                <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                                <form className="mx-1 mx-md-3" onSubmit={handleSubmit}>



                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                        <label className="form-label me-3" htmlFor="email">Email</label>
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder='Enter Email' value={credentials.email} onChange={onchange} required />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <label className="form-label me-3" htmlFor="password">Password</label>
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="password" className="form-control" id="password" name='password' placeholder='Enter Password' value={credentials.password} onChange={onchange} required />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                                    </div>

                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;