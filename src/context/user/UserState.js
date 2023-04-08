import React from "react";
import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const host = "https://odd-mite-shoe.cyclic.app";
    const [details, setDetails] = useState({_id:"" , name:"" , email:"" , date:""})

    // Get user details
    const getUserDetails = async (token) => {
        //console.log("the token is", token);
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            }
        });
        //console.log(response);
        const json = await response.json();
        // console.log("getting user details");
        //console.log(json);
        setDetails({
            _id : json._id,
            name : json.name,
            email : json.email,
            date : json.date
        })
        //console.log(details);
    }

    // Edit User Details
    const editUser = async (id , name , email) =>{
        // API Call
        const response = await fetch(`${host}/api/auth/editUser/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({name , email}), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        setDetails({id:details.id , name:name , email:email , date:details.date});
        getUserDetails(localStorage.getItem('token'));
    }

    // Delete User Account
    const deleteUser = async(userid) => {
        const response = await fetch(`${host}/api/auth/deleteUser/${userid}` , {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
    }

    return (
        <UserContext.Provider value={{ details , getUserDetails , editUser , deleteUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;