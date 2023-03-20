import React, { useContext, useEffect , useRef , useState } from 'react'
import './Account.css'
import userContext from '../context/user/userContext';

const Account = (props) => {
    const Ucontext = useContext(userContext);
    const { details , editUser , getUserDetails} = Ucontext;
    const { _id, name, email, date } = details;
    //  console.log(details);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [newdata, setNewdata] = useState({id:_id , ename:name, eemail:email, edate:date});

    const updateUser = (currentdata) => {
        ref.current.click();    // for opening the modal on clicking edit icon
        setNewdata({...newdata , ename : details.name , eemail : details.email});   // for populating the form with current note values
    }

    const handleClick = (e)=>{ 
        // console.log(_id);
        editUser(_id ,newdata.ename , newdata.eemail);
        //console.log("Updating the note...", note);
        refClose.current.click();   // for closing the modal after clicking save changes button
        //props.showAlert("success" , "User Data updated successfully");
    }

    useEffect(() => {
        getUserDetails(localStorage.getItem('token'));
    }, []);

    const onchange= (e)=>{
        setNewdata({...newdata, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit User Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='container '>
                                <div className="form-group d-flex my-3">
                                    <label htmlFor="ename" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="ename" name="ename" placeholder="Enter name" onChange={onchange} value={newdata.ename} minLength={2} required />
                                </div>
                                <div className="form-group d-flex my-3">
                                    <label htmlFor="eemail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="eemail" name="eemail" placeholder="Enter Email" onChange={onchange} value={newdata.eemail} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div className="box">
                            <div className="box-icon">
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" className='image-fluid' style={{ maxWidth: "100%", maxHeight: "100%" }}></img>
                            </div>
                            <i className="fa-solid fa-pen-to-square align-item-center" onClick={()=>{updateUser(newdata)}}></i>
                            <div className="info">
                                <h4 className="text-center">{name}</h4>
                            </div>
                            <div className='container'>
                                <table className="table table-borderless text-center">
                                    <tbody>
                                        <tr>
                                            <td>Id</td>
                                            <td>:</td>
                                            <td>{_id}</td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td>:</td>
                                            <td>{name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>:</td>
                                            <td>{email}</td>
                                        </tr>
                                        <tr>
                                            <td>Date Joined</td>
                                            <td>:</td>
                                            <td>{date.substring(0, 10)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;