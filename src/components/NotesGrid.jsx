import NoteCard from "./NoteCard";

function NotesGrid({
  notes,
  deleteNote,
  restoreNote,
  permanentlyDeleteNote,
  togglePin,
  toggleArchive,
  editNote,
}) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          restoreNote={restoreNote}
          permanentlyDeleteNote={permanentlyDeleteNote}
          togglePin={togglePin}
          toggleArchive={toggleArchive}
          editNote={editNote}
        />
      ))}
    </div>
  );
}

export default NotesGrid;
