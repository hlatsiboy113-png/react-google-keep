import { useState } from "react";

import { MdPushPin, MdOutlinePushPin, MdArchive,} 
from "react-icons/md";

function NoteCard({ note, deleteNote, togglePin, toggleArchive, editNote, }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);
  

function saveChanges() {
  editNote(editedNote);
  setIsEditing(false);
}

function startEditing() {
  setEditedNote(note);
  setIsEditing(true);
}

return (
<div className="note-card">
  <div className="note-header">
    {isEditing ? (
      <>
      <input
      value={editedNote.title}
      onChange={(e) =>
        setEditedNote({
          ...editedNote,
          title: e.target.value,
        })
      }
/>

          <textarea
            value={editedNote.content}
            onChange={(e) =>
              setEditedNote({
                ...editedNote,
                content: e.target.value,
              })
            }
          />
        </>
        ) : (
        <>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        </>
      )}
      
      <button
        className="pin-btn"
        onClick={() => togglePin(note.id)}
        >
          {note.pinned ?(
            <MdPushPin />
          ) : (
            <MdOutlinePushPin />
          )}
        </button>
      </div>


      <button onClick={() => deleteNote(note.id)}>
        Delete
      </button>
      <button
        className="icon-btn"
        onClick={() => toggleArchive(note.id)}
      >
      {isEditing ? (
        <button onClick={saveChanges}>
          Save
        </button>
      ) : (
        <button onClick={() => setIsEditing}>
          Edit
        </button>
      )}
      </button>
    </div>
  );
}

export default NoteCard;