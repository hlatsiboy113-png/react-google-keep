import { useState } from "react";
import {
  MdPushPin,
  MdOutlinePushPin,
  MdEdit,
  MdDelete,
  MdPalette
} from "react-icons/md";

function NoteCard({
  note,
  deleteNote,
  togglePin,
  editNote,
  changeColor,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editedNote, setEditedNote] = useState({
    ...note,
  });

  const [showColors, setShowColors] = useState(false);

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
  }

  function cancelEditing() {
    setEditedNote({ ...note });
    setIsEditing(false);
  }

  function changeColor(id, color) {
  console.log(id, color);

  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note.id === id
        ? { ...note, color }
        : note
    )
  );
}

return (
  <div
    className="note-card"
    style={{
      backgroundColor: note.color || "#ffffff",
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

    {/* Note Content */}
    {isEditing ? (
      <textarea
        className="edit-content"
        placeholder="Take a note..."
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

    {/* Action Buttons */}
    <div className="note-actions">
      {isEditing ? (
        <>
          <div className="color-container">
            <button
              className="icon-btn"
              onClick={() => setShowColors(!showColors)}
            >
              <MdPalette />
            </button>

            {showColors && (
              <div className="color-picker">
                <button
                  className="color-dot"
                  style={{ background: "#ffffff" }}
                  onClick={() => {
                    changeColor(note.id, "#f28b82");

                    setEditedNote({
                      ...editedNote,
                      color: "#f28b82",
                    });

                    setShowColors(false);
                  }}
                />

                <button
                  className="color-dot"
                  style={{ background: "#f28b82" }}
                  onClick={() => {
                    changeColor(note.id, "#f28b82");
                    setShowColors(false);
                  }}
                />

                <button
                  className="color-dot"
                  style={{ background: "#fff475" }}
                  onClick={() => {
                  changeColor(note.id, "#f28b82");

                  setEditedNote({
                    ...editedNote,
                    color: "#f28b82",
                  });

                  setShowColors(false);
                }}
                />

                <button
                  className="color-dot"
                  style={{ background: "#ccff90" }}
                  onClick={() => {
                    changeColor(note.id, "#ccff90");
                    setShowColors(false);
                  }}
                />

                <button
                  className="color-dot"
                  style={{ background: "#aecbfa" }}
                  onClick={() => {
                    changeColor(note.id, "#aecbfa");
                    setShowColors(false);
                  }}
                />
              </div>
            )}
          </div>

          <button onClick={saveChanges}>Save</button>

          <button onClick={cancelEditing}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={startEditing}>
            <MdEdit />
          </button>

          <button onClick={() => deleteNote(note.id)}>
            <MdDelete />
          </button>
        </>
      )}
    </div>
  </div>
);
}
export default NoteCard;