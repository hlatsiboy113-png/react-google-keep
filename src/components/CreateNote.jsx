import "../styles/createNote.css";
import { useState } from "react";

import {
  MdOutlinePushPin,
  MdPushPin,
  MdCheckBox,
  MdEdit,
  MdImage,
  MdPalette,
  MdPersonAdd,
  MdNotificationsNone,
  MdArchive,
} from "react-icons/md";

function CreateNote({ addNote }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    pinned: false,
  });

const [isExpanded, setIsExpanded] = useState(false);



function expandNote() {
  setIsExpanded(true);
}

function closeNote() {
  if(note.title || note.content){
    handleSubmit();
}

setIsExpanded(false);

setNote({
    title: "",
    content: "",
    pinned: false,
  });
}


function handleChange(event) {

  const { name, value } = event.target;
  setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

function handleSubmit() {
  if (!note.title.trim() && !note.content.trim()) {
    return;
  }

  addNote({
    id: Date.now(),
    title: note.title,
    content: note.content,
    pinned: note.pinned,
  });
}


return (
  <div className="create-note">

    {!isExpanded ? (
      <div className="collapsed-note" onClick={expandNote}>
        <span className="placeholder-text">
          Take a note...
        </span>

        <div className="collapsed-icons">
          <button className="icon-btn">
            <MdCheckBox />
          </button>

          <button className="icon-btn">
            <MdEdit />
          </button>

          <button className="icon-btn">
            <MdImage />
          </button>
        </div>
      </div>

    ) : (

      <>
        <div className="create-note-header">

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
          />

          <button
            className="pin-btn"
            onClick={() => 
              setNote((prev) => ({
                ...prev,
                pinned: !prev.pinned,
              }))
            }
          >
            {note.pinned ? 
              <MdPushPin /> :
              <MdOutlinePushPin />
            }
          </button>
        </div>

        <textarea
          name="content"
          placeholder="Take a note..."
          value={note.content}
          onChange={handleChange}
        />

        <div className="create-note-footer">
          <div className="note-actions">
            <button className="icon-btn"><MdCheckBox /></button>
            <button className="icon-btn"><MdPalette /></button>
            <button className="icon-btn"><MdPersonAdd /></button>
            <button className="icon-btn"><MdImage /></button>
            <button className="icon-btn"><MdNotificationsNone /></button>
            <button className="icon-btn"><MdArchive /></button>
          </div>

        <button className="text-btn" onClick={closeNote}>Close</button>
      </div>   
      </>

    )}

  </div>
);

}

export default CreateNote;