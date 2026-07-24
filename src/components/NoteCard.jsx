import { useState, useRef, useEffect } from "react";
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
  MdClose,
  MdMoreVert,
  MdLabelOutline,
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
  addCollaborator,
  removeCollaborator,
  setReminder,
  removeReminder,
  addImage,
  removeImage,
  toggleLabel,
  labels,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [newCollaborator, setNewCollaborator] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  const [editedNote, setEditedNote] = useState({ ...note });
  const colorRef = useRef(null);
  const collabRef = useRef(null);
  const reminderRef = useRef(null);
  const moreRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (colorRef.current && !colorRef.current.contains(e.target)) {
        setShowColors(false);
      }
      if (collabRef.current && !collabRef.current.contains(e.target)) {
        setShowCollaborators(false);
      }
      if (reminderRef.current && !reminderRef.current.contains(e.target)) {
        setShowReminder(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setShowMore(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function startEditing() {
    setEditedNote({
      ...note,
      color: note.color || "#ffffff",
      collaborators: note.collaborators || [],
      reminder: note.reminder || null,
      image: note.image || null,
      labels: note.labels || [],
    });
    setIsEditing(true);
  }

  function saveChanges() {
    editNote({ ...editedNote });
    setIsEditing(false);
    setShowColors(false);
    setShowCollaborators(false);
    setShowReminder(false);
    setShowMore(false);
  }

  function cancelEditing() {
    setEditedNote({ ...note });
    setIsEditing(false);
    setShowColors(false);
    setShowCollaborators(false);
    setShowReminder(false);
    setShowMore(false);
  }

  function handleColor(color) {
    setEditedNote((prev) => ({ ...prev, color }));
  }

  function handleAddCollaborator() {
    if (newCollaborator.trim() && newCollaborator.includes("@")) {
      addCollaborator(note.id, newCollaborator.trim());
      setEditedNote((prev) => ({
        ...prev,
        collaborators: [...(prev.collaborators || []), newCollaborator.trim()],
      }));
      setNewCollaborator("");
    }
  }

  function handleSetReminder() {
    if (reminderDate && reminderTime) {
      const reminder = new Date(`${reminderDate}T${reminderTime}`).toISOString();
      setReminder(note.id, reminder);
      setEditedNote((prev) => ({ ...prev, reminder }));
      setShowReminder(false);
    }
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        addImage(note.id, reader.result);
        setEditedNote((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  function formatReminder(dateStr) {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  if (note.trashed) {
    return (
      <div
        className="note-card"
        style={{ backgroundColor: note.color || "#ffffff" }}
      >
        {note.image && (
          <div className="note-image">
            <img src={note.image} alt="Note attachment" />
          </div>
        )}
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

  const displayNote = isEditing ? editedNote : note;
  const bgColor = displayNote.color || "#ffffff";

  return (
    <div className="note-card" style={{ backgroundColor: bgColor }}>
      {/* Pin button - absolute positioned top right */}
      <button
        className="pin-btn-corner"
        onClick={() => togglePin(note.id)}
        title={note.pinned ? "Unpin" : "Pin"}
      >
        {note.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
      </button>

      {displayNote.image && (
        <div className="note-image">
          <img src={displayNote.image} alt="Note attachment" />
          {isEditing && (
            <button
              className="remove-image-btn"
              onClick={() => {
                removeImage(note.id);
                setEditedNote((prev) => ({ ...prev, image: null }));
              }}
              title="Remove image"
            >
              <MdClose />
            </button>
          )}
        </div>
      )}

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
      </div>

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

      {displayNote.labels && displayNote.labels.length > 0 && (
        <div className="note-labels">
          {displayNote.labels.map((label) => (
            <span key={label} className="label-chip">
              <MdLabelOutline />
              {label}
              {isEditing && (
                <button
                  onClick={() => {
                    toggleLabel(note.id, label);
                    setEditedNote((prev) => ({
                      ...prev,
                      labels: prev.labels.filter((l) => l !== label),
                    }));
                  }}
                >
                  <MdClose />
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {displayNote.reminder && (
        <div className="note-reminder">
          <MdNotificationsNone />
          <span>{formatReminder(displayNote.reminder)}</span>
          {isEditing && (
            <button
              className="icon-btn remove-reminder"
              onClick={() => {
                removeReminder(note.id);
                setEditedNote((prev) => ({ ...prev, reminder: null }));
              }}
            >
              <MdClose />
            </button>
          )}
        </div>
      )}

      {displayNote.collaborators && displayNote.collaborators.length > 0 && (
        <div className="collaborators">
          {displayNote.collaborators.map((email) => (
            <span key={email} className="collaborator-chip">
              {email}
              {isEditing && (
                <button
                  className="remove-collab"
                  onClick={() => {
                    removeCollaborator(note.id, email);
                    setEditedNote((prev) => ({
                      ...prev,
                      collaborators: prev.collaborators.filter(
                        (c) => c !== email
                      ),
                    }));
                  }}
                >
                  <MdClose />
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {isEditing ? (
        <div className="note-actions edit-actions">
          <div className="color-container" ref={reminderRef}>
            <button
              className="icon-btn"
              onClick={() => setShowReminder(!showReminder)}
              title="Remind me"
            >
              <MdNotificationsNone />
            </button>
            {showReminder && (
              <div className="reminder-popup">
                <p className="popup-title">Pick date & time</p>
                <input
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                />
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                />
                <button className="save-btn" onClick={handleSetReminder}>
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="color-container" ref={collabRef}>
            <button
              className="icon-btn"
              onClick={() => setShowCollaborators(!showCollaborators)}
              title="Collaborator"
            >
              <MdPersonAdd />
            </button>
            {showCollaborators && (
              <div className="collaborator-popup">
                <p className="popup-title">Collaborators</p>
                <div className="collab-list">
                  {(editedNote.collaborators || []).map((email) => (
                    <div key={email} className="collab-item">
                      <span>{email}</span>
                      <button
                        className="icon-btn"
                        onClick={() => {
                          removeCollaborator(note.id, email);
                          setEditedNote((prev) => ({
                            ...prev,
                            collaborators: prev.collaborators.filter(
                              (c) => c !== email
                            ),
                          }));
                        }}
                      >
                        <MdClose />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="email"
                  placeholder="Email to add"
                  value={newCollaborator}
                  onChange={(e) => setNewCollaborator(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddCollaborator();
                  }}
                />
                <button className="save-btn" onClick={handleAddCollaborator}>
                  Add
                </button>
              </div>
            )}
          </div>

          <div className="color-container" ref={colorRef}>
            <button
              className="icon-btn"
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
                    className={`color-dot${editedNote.color === color ? " selected" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColor(color)}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            className="icon-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Add image"
          >
            <MdImage />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          <button
            className="icon-btn"
            onClick={() => {
              toggleArchive(note.id);
              setIsEditing(false);
            }}
            title={note.archived ? "Unarchive" : "Archive"}
          >
            {note.archived ? <MdUnarchive /> : <MdArchive />}
          </button>

          <div className="color-container" ref={moreRef}>
            <button
              className="icon-btn"
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
                        checked={(editedNote.labels || []).includes(label)}
                        onChange={() => {
                          toggleLabel(note.id, label);
                          setEditedNote((prev) => {
                            const hasLabel = (prev.labels || []).includes(label);
                            return {
                              ...prev,
                              labels: hasLabel
                                ? prev.labels.filter((l) => l !== label)
                                : [...(prev.labels || []), label],
                            };
                          });
                        }}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div className="more-divider" />
                <button
                  className="more-action"
                  onClick={() => {
                    deleteNote(note.id);
                    setIsEditing(false);
                  }}
                >
                  <MdDelete />
                  <span>Delete note</span>
                </button>
              </div>
            )}
          </div>

          <button className="icon-btn" onClick={cancelEditing} title="Cancel">
            <MdClose />
          </button>
        </div>
      ) : (
        <div className="note-actions view-actions">
          <button className="icon-btn" onClick={startEditing} title="Edit">
            <MdEdit />
          </button>
          <button
            className="icon-btn"
            onClick={() => toggleArchive(note.id)}
            title={note.archived ? "Unarchive" : "Archive"}
          >
            {note.archived ? <MdUnarchive /> : <MdArchive />}
          </button>
          <button
            className="icon-btn"
            onClick={() => deleteNote(note.id)}
            title="Delete"
          >
            <MdDelete />
          </button>
          <button className="icon-btn" title="More">
            <MdMoreVert />
          </button>
        </div>
      )}

      {isEditing && (
        <div className="edit-save-row">
          <button className="save-btn" onClick={saveChanges}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default NoteCard;