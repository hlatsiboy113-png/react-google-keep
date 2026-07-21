import NoteCard from "./NoteCard";

function NotesGrid({ notes, deleteNote, togglePin, toggleArchive }) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          togglePin={togglePin}
          toggleArchive={toggleArchive}
        />
      ))}
    </div>
  );
}

export default NotesGrid;