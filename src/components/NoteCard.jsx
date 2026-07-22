<button
  className="pin-btn"
  onClick={() => togglePin(note.id)}
>
  {note.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
</button>

import { MdPushPin, MdOutlinePushPin } 
from "react-icons/md";

function NoteCard({ note, deleteNote, togglePin }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <button onClick={() => deleteNote(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default NoteCard;