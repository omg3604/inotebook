import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;

    const {note , updateNote} = props;
    return (
        <div className='col-md-3'>
            <div className="card text-center my-3 ">
                <div className='card-header d-flex justify-content-between align-items-center'>
                    <h4 className="card-title">{note.title}</h4>
                    <div>
                        <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                        <i className="fa-regular fa-trash-can mx-3" onClick={()=>{deleteNote(note._id)}} ></i>
                    </div>
                </div>
                <div className="card-body">

                    <p className="card-text">{note.description}</p>

                </div>
                <div className="card-footer text-muted">
                    2 days ago
                </div>
            </div>
        </div>
    )
}
