import { useState } from "react";
import {
  MdPushPin,
  MdOutlinePushPin,
  MdEdit,
  MdDelete,
} from "react-icons/md";

function NoteCard({
  note,
  deleteNote,
  togglePin,
  editNote,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editedNote, setEditedNote] = useState({
    ...note,
  });

  function startEditing() {
    setEditedNote({ ...note });
    setIsEditing(true);
  }

  function saveChanges() {
    editNote(editedNote);
    setIsEditing(false);
  }

  function cancelEditing() {
    setEditedNote({ ...note });
    setIsEditing(false);
  }

  return (
    <div className="note-card">
      <div className="note-header">
        {isEditing ? (
          <input
            type="text"
            value={editedNote.title}
            onChange={(e) =>
              setEditedNote({
                ...editedNote,
                title: e.target.value,
              })
            }
          />
        ) : (
          <h3>{note.title}</h3>
        )}

        <button
          className="pin-btn"
          onClick={() => togglePin(note.id)}
        >
          {note.pinned ? (
            <MdPushPin />
          ) : (
            <MdOutlinePushPin />
          )}
        </button>
      </div>

      {isEditing ? (
        <textarea
          value={editedNote.content}
          onChange={(e) =>
            setEditedNote({
              ...editedNote,
              content: e.target.value,
            })
          }
        />
      ) : (
        <p>{note.content}</p>
      )}

      <div className="note-actions">
        {isEditing ? (
          <>
            <button onClick={saveChanges}>
              Save
            </button>

            <button onClick={cancelEditing}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={startEditing}>
              <MdEdit />
            </button>

            <button
              onClick={() => deleteNote(note.id)}
            >
              <MdDelete />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NoteCard;