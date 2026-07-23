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
    archived: false,
    color: "#ffffff",
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [showColors, setShowColors] = useState(false);

  function expandNote() {
    setIsExpanded(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit() {
    if (!note.title.trim() && !note.content.trim()) return;

    addNote({
      id: Date.now(),
      title: note.title,
      content: note.content,
      pinned: note.pinned,
      archived: false,
      color: note.color,
    });
  }

  function closeNote() {
    if (note.title || note.content) {
      handleSubmit();
    }

    setIsExpanded(false);
    setShowColors(false);

    setNote({
      title: "",
      content: "",
      pinned: false,
      archived: false,
      color: "#ffffff",
    });
  }

  const colors = [
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

  return (
    <div
      className="create-note"
      style={{
        backgroundColor: note.color,
        border: "1px solid #dadce0",
        boxShadow: "0 1px 4px rgba(0,0,0,.2)",
      }}
    >
      {!isExpanded ? (
        <div className="collapsed-note" onClick={expandNote}>
          <span className="placeholder-text">
            Take a note...
          </span>

          <div className="collapsed-icons">
            <button className="icon-btn" type="button">
              <MdCheckBox />
            </button>

            <button className="icon-btn" type="button">
              <MdEdit />
            </button>

            <button className="icon-btn" type="button">
              <MdImage />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="create-note-header"
            style={{
              backgroundColor: note.color,
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={note.title}
              onChange={handleChange}
              style={{
                backgroundColor: note.color,
              }}
            />

            <button
              className="pin-btn"
              type="button"
              onClick={() =>
                setNote((prev) => ({
                  ...prev,
                  pinned: !prev.pinned,
                }))
              }
            >
              {note.pinned ? (
                <MdPushPin />
              ) : (
                <MdOutlinePushPin />
              )}
            </button>
          </div>

          <textarea
            name="content"
            placeholder="Take a note..."
            value={note.content}
            onChange={handleChange}
            style={{
              backgroundColor: note.color,
            }}
          />

          <div
            className="create-note-footer"
            style={{
              backgroundColor: note.color,
            }}
          >
            <div className="note-actions">
              <button className="icon-btn" type="button">
                <MdCheckBox />
              </button>

              <div className="color-container">
                <button
                  className="icon-btn"
                  type="button"
                  onClick={() => setShowColors(!showColors)}
                >
                  <MdPalette />
                </button>

                {showColors && (
                  <div className="color-picker">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className="color-dot"
                        style={{
                          backgroundColor: color,
                        }}
                        onClick={() => {
                          setNote((prev) => ({
                            ...prev,
                            color,
                          }));
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button className="icon-btn" type="button">
                <MdPersonAdd />
              </button>

              <button className="icon-btn" type="button">
                <MdImage />
              </button>

              <button className="icon-btn" type="button">
                <MdNotificationsNone />
              </button>

              <button className="icon-btn" type="button">
                <MdArchive />
              </button>
            </div>

            <button
              className="text-btn"
              type="button"
              onClick={closeNote}
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default CreateNote;