import React from 'react'
import { useContext , useState } from 'react';
import noteContext from '../context/notes/noteContext';

export default function Addnote() {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:""});

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title , note.description , note.tag);
        setNote({title:"", description:"", tag:""});
    }

    const onchange= (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <div className='container my-3'>
                <h2>Add a Note</h2>
                <form className='container '>
                    <div className="form-group d-flex my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Enter title" value={note.title} onChange={onchange} required/>
                    </div>
                    <div className="form-group d-flex my-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="Enter description" value={note.description} onChange={onchange} required/>
                    </div>
                    <div className="form-group d-flex my-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="Note tag" value={note.tag} onChange={onchange} />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add</button>
                </form>
            </div>
        </div>
    )
}
