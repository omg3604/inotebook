import NoteContext from "./noteContext";
import React from "react";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        // console.log("getting all notes");
        console.log(json);
        setNotes(json);
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        //console.log("adding a new note!");
        // API Call
        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({title , description , tag}), // body data type must match "Content-Type" header
        });
        //console.log(JSON.stringify({title , description , tag}));
        const newnote = await response.json();
        setNotes(notes.concat(newnote));
    }

    // Delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        }); 

        const txt = await response.text(); // parses JSON response into native JavaScript object
        console.log(txt);

        //console.log("deleteing the note with id : " + id);
        let newnotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newnotes);
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({title , description , tag}), // body data type must match "Content-Type" header
        });
        const txt = await response.text(); // parses JSON response into native JavaScript object
        console.log(txt);

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                notes[index].title = title;
                notes[index].description = description;
                notes[index].tag = tag;
                break;
            }
        }
        //console.log(notes);
        setNotes(notes);            
        getNotes();         // for fetching all the updated notes from server to display to client.
    }

    // Get all notes by Tag
    const getNotesByTag = async (tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchNotesByTag`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({tag}),
        });
        const json = await response.json();
        // console.log("getting all notes");
        console.log(json);
        setNotes(json);
    }

    // Delete all notes of a User
    const deleteAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/deleteAllNotes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        console.log(json);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes , getNotesByTag , deleteAllNotes}}> 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;