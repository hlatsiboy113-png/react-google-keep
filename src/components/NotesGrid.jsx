import NoteCard from "./NoteCard";

function NotesGrid({
  notes,
  deleteNote,
  togglePin,
  editNote,
}) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          togglePin={togglePin}
          editNote={editNote}
        />
      ))}
    </div>
  );
}

export default NotesGrid;