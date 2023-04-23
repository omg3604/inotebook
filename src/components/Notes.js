import React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import userContext from '../context/user/userContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import Spinner from './Spinner';

export default function Notes(props) {


    // For maintaining the user data on the navbar upon reload also.
    const Ucontext = useContext(userContext);
    const { getUserDetails } = Ucontext;
    useEffect(() => {
        getUserDetails(localStorage.getItem('token'));
    }, [])


    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote, getNotesByTag , noteLoad} = context;

    // to display all saved notes of the user.
    useEffect(() => {
        getNotes();
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

    const updateNote = (currentNote) => {
        ref.current.click();    // for opening the modal on clicking edit icon
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });   // for populating the form with current note values
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        //console.log("Updating the note...", note);
        refClose.current.click();   // for closing the modal after clicking save changes button
        props.showAlert("success", "Note updated successfully");
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const ontagchange = (e) => {
        if (e.target.value !== "All") {
            getNotesByTag(e.target.value);
        }
        else {
            getNotes();
        }
        console.log(e.target.value);
    }

    // if (noteLoad) return <Spinner/>;
    return (
        <>
            <AddNote showAlert={props.showAlert} ></AddNote>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='container '>
                                <div className="form-group d-flex my-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Enter title" onChange={onchange} value={note.etitle} minLength={5} required />
                                </div>
                                <div className="form-group d-flex my-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Note description" onChange={onchange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="form-group d-flex my-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" placeholder="Note tag" onChange={onchange} value={note.etag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className='btn btn-secondary btn-rounded' style={{ backgroundColor: "#92aad0", borderColor: "#92aad0" }} data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className='btn btn-primary btn-rounded' style={{ backgroundColor: "#92aad0", borderColor: "#92aad0" }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-5 py-5'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 style={{color: "#19376D"}}>Saved Notes!</h2>
                    <div className='d-flex align-items-center'>
                        <p className='mx-3 my-0'>Search By Tag : </p>
                        <select className="select me-5 rounded" style={{ backgroundColor: "#19376D" ,color:"white" }} onChange={ontagchange}>
                            <option value="All">All</option>
                            <option value="General">General</option>
                            <option value="Personal">Personal</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                </div>
                <hr></hr>
                {noteLoad && <Spinner/>}
                {!noteLoad &&  <h5>{notes.length === 0 && 'No saved notes found.'}</h5>}
                {!noteLoad && notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}></NoteItem>;
                }
                )}
            </div>
        </>
    )
}
