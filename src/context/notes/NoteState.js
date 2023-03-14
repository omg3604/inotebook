import NoteContext from "./noteContext";
import React from "react";
import { useState } from "react";
const NoteState = (props)=>{

    const notesInitial = [
        {
          "_id": "64103cb61b8d50b27205e43a",
          "user": "63fa3e8d7fcf9b87f5b6ab29",
          "title": "Title1 - om",
          "description": "This is the title description. - om2",
          "tag": "general - om2",
          "date": "2023-03-14T09:21:58.111Z",
          "__v": 0
        },
        {
          "_id": "64103cbf1b8d50b27205e43c",
          "user": "63fa3e8d7fcf9b87f5b6ab29",
          "title": "Tit - om",
          "description": "This is the title description. - om2",
          "tag": "general - om2",
          "date": "2023-03-14T09:22:07.519Z",
          "__v": 0
        },
        {
          "_id": "64103cbf1b8d50b27205e43c",
          "user": "63fa3e8d7fcf9b87f5b6ab29",
          "title": "Tit - om",
          "description": "This is the title description. - om2",
          "tag": "general - om2",
          "date": "2023-03-14T09:22:07.519Z",
          "__v": 0
        },
        {
          "_id": "64103cbf1b8d50b27205e43c",
          "user": "63fa3e8d7fcf9b87f5b6ab29",
          "title": "Tit - om",
          "description": "This is the title description. - om2",
          "tag": "general - om2",
          "date": "2023-03-14T09:22:07.519Z",
          "__v": 0
        },
        {
          "_id": "64103cbf1b8d50b27205e43c",
          "user": "63fa3e8d7fcf9b87f5b6ab29",
          "title": "Tit - om",
          "description": "This is the title description. - om2",
          "tag": "general - om2",
          "date": "2023-03-14T09:22:07.519Z",
          "__v": 0
        },
        {
          "_id": "64103cbf1b8d50b27205e43c",
          "user": "63fa3e8d7fcf9b87f5b6ab29",
          "title": "Tit - om",
          "description": "This is the title description. - om2",
          "tag": "general - om2",
          "date": "2023-03-14T09:22:07.519Z",
          "__v": 0
        }
      ];

      const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes , setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;