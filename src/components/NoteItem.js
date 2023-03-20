import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;

    const {note , updateNote} = props;

    let day = note.date.substr(8 , 2);
    let month = note.date.substr(5 , 2);
    let year = note.date.substr(0 , 4);

    return (
        <div className='col-md-3'>
            <div className="card text-center my-3 ">
                <div className='card-header d-flex justify-content-between align-items-center' style={{backgroundColor:"#92aad0"}}>
                    <h4 className="card-title text-start">{note.title}</h4>
                    <div className='d-flex justify-content-between align-items-center flex-nowrap'>
                        <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                        <i className="fa-regular fa-trash-can mx-3" onClick={()=>{deleteNote(note._id);
                                        props.showAlert("success" , "Note deleted successfully");
                        }} 
                        ></i>
                    </div>
                </div>
                <div className="card-body">

                    <p className="card-text">{note.description}</p>

                </div>
                <div className="card-footer text-muted">
                    {day} - {month} - {year}
                </div>
            </div>
        </div>
    )
}
