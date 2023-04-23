import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import "./AddNote.css"

export default function Addnote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description , capitalizeFirstLetter(note.tag));
        props.showAlert("success", "Note added Successfully!.")
        setNote({ title: "", description: "", tag: "" });
        resetTranscript();    
    }

    const onchange = (e) => {
        if(listening){
            setNote({ ...note , description : transcript});
        }
        else{ 
            setNote({ ...note, [e.target.name]: e.target.value });
        }
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Speech to text
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB',
        });
    };

    const stopListen = () => {
        SpeechRecognition.stopListening();
        setNote({ ...note , description : transcript });
        resetTranscript();
    }

    return (
        <div>
            <div className="container my-4">
                <h2 style={{color: "#19376D"}}>Add a Note</h2>
                <hr/>
                <form id="contactForm" data-sb-form-api-token="API_TOKEN" className='container'>

                    <div className="mb-3">
                        <label className="form-label h5" htmlFor="title">Title</label>
                        <input className="form-control" id="title" type="text" name="title" placeholder="title" data-sb-validations="required" value={note.title} onChange={onchange}/>
                        <div className="invalid-feedback" data-sb-feedback="title:required">Title is required.</div>
                    </div>

                    <div className="mb-3">
                        <div className='d-flex justify-content-between align-items-center'>
                            <label className="form-label h5" htmlFor="description">Description</label>
                            <div className='d-flex align-items-center'>
                                {listening && <i class="fa-solid fa-microphone fa-fade fa-xl" style={{color: "#bf1212"}}></i>}
                                {listening && <p className='h5 mx-2 mt-2'>listening....</p>}
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='mt-3'><strong>Mic : </strong></p>
                                <i className="fa-solid fa-circle-play fa-2xl  mx-2 my-2 micicon" onClick={listenContinuously} style={{color: "#3B71CA"}}></i>
                                <i className="fa-solid fa-circle-stop fa-2xl  mx-2 my-2 micicon" onClick={stopListen} style={{color: "#DC4C64"}}></i>
                            </div>
                        </div>
                        <input className="form-control" id="description" type="text" name="description" placeholder="description" style={{height: "5rem"}} data-sb-validations="required" value={note.description || transcript} onChange={onchange}></input>
                        <div className="invalid-feedback" data-sb-feedback="description:required">Description is required.</div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label h5" htmlFor="tag">Tag</label>
                        <input className="form-control" id="tag" type="text" name="tag" placeholder="tag" value={note.tag} onChange={onchange}/>
                    </div>

                    <div className="d-grid">
                        <button disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-lg mx-2 btn-rounded addbtncss" style={{backgroundColor:"#19376D" , color:"white"}} id="submitButton" type="submit" onClick={handleClick}>Add Note</button>
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
