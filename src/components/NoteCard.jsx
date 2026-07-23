import { useState } from "react";
import {
  MdPushPin,
  MdOutlinePushPin,
  MdEdit,
  MdDelete,
  MdDeleteForever,
  MdRestore,
  MdPalette,
  MdArchive,
  MdUnarchive,
  MdPersonAdd,
  MdImage,
  MdNotificationsNone,
  MdCheck,
  MdClose,
} from "react-icons/md";

const COLORS = [
  "#ffffff",
  "#f28b82",
  "#fbbc04",
  "#fff475",
  "#ccff90",
  "#a7ffeb",
  "#cbf0f8",
  "#aecbfa",
  "#d7aefb",
];

function NoteCard({
  note,
  deleteNote,
  restoreNote,
  permanentlyDeleteNote,
  togglePin,
  editNote,
  toggleArchive,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const [editedNote, setEditedNote] = useState({ ...note });

  function startEditing() {
    setEditedNote({
      ...note,
      color: note.color || "#ffffff",
    });
    setIsEditing(true);
  }

  function saveChanges() {
    editNote(editedNote);
    setIsEditing(false);
    setShowColors(false);
  }

  function cancelEditing() {
    setEditedNote({ ...note });
    setIsEditing(false);
    setShowColors(false);
  }

  function handleColor(color) {
    setEditedNote((prev) => ({ ...prev, color }));
  }

  // Notes in the Bin get a simplified, non-editable toolbar
  if (note.trashed) {
    return (
      <div
        className="note-card"
        style={{ backgroundColor: note.color || "#ffffff" }}
      >
        <div className="note-header">
          <h3>{note.title}</h3>
        </div>

        <p>{note.content}</p>

        <div className="note-actions">
          <button
            className="icon-btn"
            onClick={() => restoreNote(note.id)}
            title="Restore"
          >
            <MdRestore />
          </button>

          <button
            className="icon-btn"
            onClick={() => permanentlyDeleteNote(note.id)}
            title="Delete forever"
          >
            <MdDeleteForever />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="note-card"
      style={{
        backgroundColor: isEditing
          ? editedNote.color
          : note.color || "#ffffff",
      }}
    >
      {/* Header */}
      <div className="note-header">
        {isEditing ? (
          <input
            className="edit-title"
            type="text"
            placeholder="Title"
            value={editedNote.title}
            onChange={(e) =>
              setEditedNote({ ...editedNote, title: e.target.value })
            }
          />
        ) : (
          <h3>{note.title}</h3>
        )}

        <button className="icon-btn" onClick={() => togglePin(note.id)}>
          {note.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
        </button>
      </div>

      {/* Content */}
      {isEditing ? (
        <textarea
          className="edit-content"
          placeholder="Take a note..."
          value={editedNote.content}
          onChange={(e) =>
            setEditedNote({ ...editedNote, content: e.target.value })
          }
        />
      ) : (
        <p>{note.content}</p>
      )}

      {/* Toolbar */}
      {isEditing ? (
        <div className="note-actions">
          <button
            className="icon-btn"
            onClick={() =>
              setEditedNote((prev) => ({ ...prev, archived: !prev.archived }))
            }
            title={editedNote.archived ? "Unarchive" : "Archive"}
          >
            {editedNote.archived ? <MdUnarchive /> : <MdArchive />}
          </button>

          <div className="color-container">
            <button
              className="icon-btn"
              onClick={() => setShowColors(!showColors)}
            >
              <MdPalette />
            </button>

            {showColors && (
              <div className="color-picker">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="color-dot"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColor(color)}
                  />
                ))}
              </div>
            )}
          </div>

          <button className="icon-btn">
            <MdPersonAdd />
          </button>

          <button className="icon-btn">
            <MdImage />
          </button>

          <button className="icon-btn">
            <MdNotificationsNone />
          </button>

          <button className="icon-btn" onClick={() => deleteNote(note.id)}>
            <MdDelete />
          </button>

          <button className="icon-btn" onClick={saveChanges}>
            <MdCheck />
          </button>

          <button className="icon-btn" onClick={cancelEditing}>
            <MdClose />
          </button>
        </div>
      ) : (
        <div className="note-actions">
          <button className="icon-btn" onClick={startEditing}>
            <MdEdit />
          </button>

          <button className="icon-btn" onClick={() => deleteNote(note.id)}>
            <MdDelete />
          </button>

          <button
            className="icon-btn"
            onClick={() => toggleArchive(note.id)}
            title={note.archived ? "Unarchive" : "Archive"}
          >
            {note.archived ? <MdUnarchive /> : <MdArchive />}
          </button>
        </div>
      )}
    </div>
  );
}

export default NoteCard;
