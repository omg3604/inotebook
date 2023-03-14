import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(noteContext);
    const {notes , setNotes} = context;
    return (
        <div><div className='row my-3'>
            <h2>Saved Notes!</h2>
            {notes.map((note) => {
                return <NoteItem title={note.title} desp={note.description}></NoteItem>;
            }
            )}
        </div></div>
    )
}
