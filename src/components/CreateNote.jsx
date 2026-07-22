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
      color: note.color || "#ffffff",
    });
  }

  function closeNote() {
    if (note.title || note.content) {
      handleSubmit();
    }

    setIsExpanded(false);

    setNote({
      title: "",
      content: "",
      pinned: false,
      color: "#ffffff",
    });

    setShowColors(false);
  }

  return (
    <div
      className="create-note"
      style={{
        backgroundColor: note.color,
      }}
    >
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
          />

          <div className="create-note-footer">
            <div className="note-actions">
              <button className="icon-btn">
                <MdCheckBox />
              </button>

              <div className="color-container">
                <button
                  className="icon-btn"
                  type="button"
                  onClick={() =>
                    setShowColors(!showColors)
                  }
                >
                  <MdPalette />
                </button>

                {showColors && (
                  <div className="color-picker">
                    <button
                      className="color-dot"
                      style={{ background: "#ffffff" }}
                      onClick={() => {
                        setNote({
                          ...note,
                          color: "#ffffff",
                        });
                        setShowColors(false);
                      }}
                    />

                    <button
                      className="color-dot"
                      style={{ background: "#f28b82" }}
                      onClick={() => {
                        setNote({
                          ...note,
                          color: "#f28b82",
                        });
                        setShowColors(false);
                      }}
                    />

                    <button
                      className="color-dot"
                      style={{ background: "#fff475" }}
                      onClick={() => {
                        setNote({
                          ...note,
                          color: "#fff475",
                        });
                        setShowColors(false);
                      }}
                    />

                    <button
                      className="color-dot"
                      style={{ background: "#ccff90" }}
                      onClick={() => {
                        setNote({
                          ...note,
                          color: "#ccff90",
                        });
                        setShowColors(false);
                      }}
                    />

                    <button
                      className="color-dot"
                      style={{ background: "#aecbfa" }}
                      onClick={() => {
                        setNote({
                          ...note,
                          color: "#aecbfa",
                        });
                        setShowColors(false);
                      }}
                    />
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

              <button className="icon-btn">
                <MdArchive />
              </button>
            </div>

            <button
              className="text-btn"
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