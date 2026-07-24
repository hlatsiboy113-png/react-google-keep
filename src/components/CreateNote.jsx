import { useState, useRef, useEffect } from "react";
import {
  MdOutlinePushPin,
  MdPushPin,
  MdCheckBox,
  MdBrush,
  MdImage,
  MdPalette,
  MdPersonAdd,
  MdNotificationsNone,
  MdArchive,
  MdMoreVert,
  MdUndo,
  MdRedo,
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

function CreateNote({ addNote, labels }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    pinned: false,
    color: "#ffffff",
    labels: [],
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const colorRef = useRef(null);
  const moreRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (colorRef.current && !colorRef.current.contains(e.target)) {
        setShowColors(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setShowMore(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function expandNote() {
    setIsExpanded(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    if (!note.title.trim() && !note.content.trim()) return;
    addNote({ ...note });
  }

  function closeNote() {
    if (note.title.trim() || note.content.trim()) {
      handleSubmit();
    }
    setIsExpanded(false);
    setShowColors(false);
    setShowMore(false);
    setNote({
      title: "",
      content: "",
      pinned: false,
      color: "#ffffff",
      labels: [],
    });
  }

  function toggleLabel(label) {
    setNote((prev) => {
      const hasLabel = prev.labels.includes(label);
      return {
        ...prev,
        labels: hasLabel
          ? prev.labels.filter((l) => l !== label)
          : [...prev.labels, label],
      };
    });
  }

  return (
    <div
      className="create-note"
      style={{ backgroundColor: note.color }}
    >
      {!isExpanded ? (
        <div className="collapsed-note" onClick={expandNote}>
          <span className="placeholder-text">Take a note...</span>
          <div className="collapsed-icons">
            <button className="icon-btn" type="button" title="New list">
              <MdCheckBox />
            </button>
            <button className="icon-btn" type="button" title="New note with drawing">
              <MdBrush />
            </button>
            <button className="icon-btn" type="button" title="New note with image">
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
              className="icon-btn pin-btn"
              type="button"
              onClick={() =>
                setNote((prev) => ({ ...prev, pinned: !prev.pinned }))
              }
              title={note.pinned ? "Unpin note" : "Pin note"}
            >
              {note.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
            </button>
          </div>

          <textarea
            name="content"
            placeholder="Take a note..."
            value={note.content}
            onChange={handleChange}
          />

          {note.labels.length > 0 && (
            <div className="note-labels">
              {note.labels.map((label) => (
                <span key={label} className="label-chip">
                  {label}
                  <button onClick={() => toggleLabel(label)}>
                    <MdClose />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="create-note-footer">
            <div className="note-actions">
              <button className="icon-btn" type="button" title="Remind me">
                <MdNotificationsNone />
              </button>

              <div className="color-container" ref={colorRef}>
                <button
                  className="icon-btn"
                  type="button"
                  onClick={() => setShowColors(!showColors)}
                  title="Background options"
                >
                  <MdPalette />
                </button>
                {showColors && (
                  <div className="color-picker-popup">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`color-dot${note.color === color ? " selected" : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setNote((prev) => ({ ...prev, color }));
                        }}
                        title={color === "#ffffff" ? "Default" : ""}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button className="icon-btn" type="button" title="Collaborator">
                <MdPersonAdd />
              </button>

              <button className="icon-btn" type="button" title="Add image">
                <MdImage />
              </button>

              <button className="icon-btn" type="button" title="Archive">
                <MdArchive />
              </button>

              <div className="color-container" ref={moreRef}>
                <button
                  className="icon-btn"
                  type="button"
                  onClick={() => setShowMore(!showMore)}
                  title="More"
                >
                  <MdMoreVert />
                </button>
                {showMore && (
                  <div className="more-popup">
                    <div className="more-section">
                      <p className="popup-title">Labels</p>
                      {labels.map((label) => (
                        <label key={label} className="more-item">
                          <input
                            type="checkbox"
                            checked={note.labels.includes(label)}
                            onChange={() => toggleLabel(label)}
                          />
                          <span>{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="icon-btn" type="button" title="Undo">
                <MdUndo />
              </button>

              <button className="icon-btn" type="button" title="Redo">
                <MdRedo />
              </button>
            </div>

            <button className="close-btn" type="button" onClick={closeNote}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateNote;