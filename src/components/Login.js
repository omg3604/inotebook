import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [credentials , setCredentials] = useState({email: "" , password: ""});
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
        setCredentials({...credentials , [e.target.name] : e.target.value});
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

        if(json.success === true){
            // Login Successful , Save the auth toekn and Redirect to Home page
            // alert("Logged in Successfully");
            localStorage.setItem('token' , json.authtoken);
            navigate("/");
        }
        else{
            // Login Unsuccessfull
            alert("Invalid Credentials , Login Unsuccessfull.");
        }

        setCredentials({email:"" , password:""});
        // setEmail("");
        // setPassword("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder='Enter Email' value={credentials.email} onChange={onchange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder='Enter Password' value={credentials.password} onChange={onchange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;