import NoteCard from "./NoteCard";

function NotesGrid({
  notes,
  deleteNote,
  togglePin,
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
          editNote={editNote}
          changeColor={changeColor}
        />
      ))}
    </div>
  );
}

export default NotesGrid;