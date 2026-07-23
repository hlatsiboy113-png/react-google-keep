import { useEffect, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CreateNote from "./components/CreateNote";
import NotesGrid from "./components/NotesGrid";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState("notes");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...newNote, archived: false },
    ]);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function togglePin(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  }

  function toggleArchive(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  }

  function editNote(updatedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
  }

  // Which notes belong on the currently selected sidebar page
  const pageNotes = notes.filter((note) =>
    currentPage === "archive" ? note.archived : !note.archived
  );

  const sortedNotes = [...pageNotes].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned ?? false)
  );

  const filteredNotes = sortedNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNotesGrid = currentPage === "notes" || currentPage === "archive";

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="container">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <main className="content">
          {currentPage === "notes" && <CreateNote addNote={addNote} />}

          {showNotesGrid && filteredNotes.length === 0 && (
            <p className="empty-state">
              {currentPage === "archive"
                ? "No archived notes"
                : "Notes you add appear here"}
            </p>
          )}

          {showNotesGrid && filteredNotes.length > 0 && (
            <NotesGrid
              notes={filteredNotes}
              deleteNote={deleteNote}
              togglePin={togglePin}
              toggleArchive={toggleArchive}
              editNote={editNote}
            />
          )}

          {(currentPage === "reminders" || currentPage === "labels") && (
            <p className="empty-state">
              {currentPage === "reminders"
                ? "Reminders aren't built yet — coming in a future update."
                : "Labels aren't built yet — coming in a future update."}
            </p>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
