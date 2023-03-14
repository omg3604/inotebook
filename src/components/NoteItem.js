import React from 'react'

export default function NoteItem(props) {
    const {title , desp} = props;
    return (
        <div className='col-md-3'>
            <div className="card text-center container my-3">
                <h5 className="card-header card-title">{title}</h5>
                <div className="card-body">                    

                    <p className="card-text">{desp}</p>
                    <a href="#" className="btn btn-primary mx-2">Modify</a>
                    <a href="#" className="btn btn-danger mx-2">Delete</a>
                </div>
                <div className="card-footer text-muted">
                    2 days ago
                </div>
            </div>
        </div>
    )
}
