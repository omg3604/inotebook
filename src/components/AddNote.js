import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

export default function Addnote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description , capitalizeFirstLetter(note.tag));
        props.showAlert("success", "Note added Successfully!.")
        setNote({ title: "", description: "", tag: "" });
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div>
            <div className="container my-4">
                <h2>Add a Note</h2>
                <hr/>
                <form id="contactForm" data-sb-form-api-token="API_TOKEN" className='container'>

                    <div className="mb-3">
                        <label className="form-label h5" htmlFor="title">Title</label>
                        <input className="form-control" id="title" type="text" name="title" placeholder="title" data-sb-validations="required" value={note.title} onChange={onchange}/>
                        <div className="invalid-feedback" data-sb-feedback="title:required">Title is required.</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label h5" htmlFor="description">Description</label>
                        <input className="form-control" id="description" type="text" name="description" placeholder="description" style={{height: "5rem"}} data-sb-validations="required" value={note.description} onChange={onchange}></input>
                        <div className="invalid-feedback" data-sb-feedback="description:required">Description is required.</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label h5" htmlFor="tag">Tag</label>
                        <input className="form-control" id="tag" type="text" name="tag" placeholder="tag" value={note.tag} onChange={onchange}/>
                    </div>

                    <div className="d-grid">
                        <button disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary btn-lg mx-2 btn-rounded" style={{backgroundColor: "#92aad0" , borderColor: "#92aad0"}} id="submitButton" type="submit" onClick={handleClick}>Add Note</button>
                    </div>

                </form>
            </div>
            {/* <div className='container my-3'>
                <h2>Add a Note</h2>
                <form className='container '>
                    <div className="form-group d-flex my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Enter title" value={note.title} onChange={onchange} required />
                    </div>
                    <div className="form-group d-flex my-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="Enter description" value={note.description} onChange={onchange} required />
                    </div>
                    <div className="form-group d-flex my-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="Note tag" value={note.tag} onChange={onchange} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className='btn btn-primary my-3 btn-rounded' style={{ backgroundColor: "#92aad0", borderColor: "#92aad0" }} onClick={handleClick}>Add</button>
                </form>
            </div> */}
        </div>
    )
}
