import NoteCard from "./NoteCard";

function NotesGrid({
  notes,
  deleteNote,
  togglePin,
  toggleArchive,
  editNote,
  changeColor
}) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          togglePin={togglePin}
          toggleArchive={toggleArchive}
          editNote={editNote}
          changeColor={changeColor}
        />
      ))}
    </div>
  );
}

export default NotesGrid;