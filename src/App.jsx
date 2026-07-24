import { useEffect, useState, useCallback } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CreateNote from "./components/CreateNote";
import NotesGrid from "./components/NotesGrid";
import EditLabelsModal from "./components/EditLabelsModal";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [labels, setLabels] = useState(() => {
    const savedLabels = localStorage.getItem("labels");
    return savedLabels ? JSON.parse(savedLabels) : ["Sample Label 1", "Sample Label 2"];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState("notes");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showEditLabels, setShowEditLabels] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("labels", JSON.stringify(labels));
  }, [labels]);

  const refreshNotes = useCallback(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  function addLabel(labelName) {
    if (labelName.trim() && !labels.includes(labelName.trim())) {
      setLabels((prev) => [...prev, labelName.trim()]);
    }
  }

  function deleteLabel(labelName) {
    setLabels((prev) => prev.filter((l) => l !== labelName));
    setNotes((prev) =>
      prev.map((note) => ({
        ...note,
        labels: (note.labels || []).filter((l) => l !== labelName),
      }))
    );
  }

  function addNote(newNote) {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        ...newNote,
        id: Date.now(),
        archived: false,
        trashed: false,
        collaborators: newNote.collaborators || [],
        reminder: newNote.reminder || null,
        image: newNote.image || null,
        labels: newNote.labels || [],
      },
    ]);
  }

  function deleteNote(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, trashed: true, archived: false } : note
      )
    );
  }

  function restoreNote(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, trashed: false } : note
      )
    );
  }

  function permanentlyDeleteNote(id) {
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
        note.id === id
          ? { ...note, archived: !note.archived, pinned: false }
          : note
      )
    );
  }

  function editNote(updatedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? { ...note, ...updatedNote } : note
      )
    );
  }

  function addCollaborator(id, email) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              collaborators: [...(note.collaborators || []), email],
            }
          : note
      )
    );
  }

  function removeCollaborator(id, email) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              collaborators: (note.collaborators || []).filter(
                (c) => c !== email
              ),
            }
          : note
      )
    );
  }

  function setReminder(id, reminder) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, reminder } : note
      )
    );
  }

  function removeReminder(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, reminder: null } : note
      )
    );
  }

  function addImage(id, imageBase64) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, image: imageBase64 } : note
      )
    );
  }

  function removeImage(id) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, image: null } : note
      )
    );
  }

  function toggleLabel(id, label) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id !== id) return note;
        const currentLabels = note.labels || [];
        const hasLabel = currentLabels.includes(label);
        return {
          ...note,
          labels: hasLabel
            ? currentLabels.filter((l) => l !== label)
            : [...currentLabels, label],
        };
      })
    );
  }

  const pageNotes = notes.filter((note) => {
    if (currentPage === "trash") return note.trashed;
    if (note.trashed) return false;
    if (currentPage === "archive") return note.archived;
    if (labels.includes(currentPage)) {
      return !note.archived && (note.labels || []).includes(currentPage);
    }
    return !note.archived;
  });

  const sortedNotes = [...pageNotes].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned ?? false)
  );

  const filteredNotes = sortedNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNotesGrid =
    currentPage === "notes" ||
    currentPage === "archive" ||
    currentPage === "trash" ||
    labels.includes(currentPage);

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onRefresh={refreshNotes}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="container">
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isOpen={sidebarOpen}
          labels={labels}
          onEditLabels={() => setShowEditLabels(true)}
        />

        <main className="content">
          {currentPage === "notes" && <CreateNote addNote={addNote} labels={labels} />}

          {showNotesGrid && filteredNotes.length === 0 && (
            <p className="empty-state">
              {currentPage === "archive"
                ? "No archived notes"
                : currentPage === "trash"
                ? "No notes in Bin"
                : labels.includes(currentPage)
                ? `No notes with label "${currentPage}"`
                : "Notes you add appear here"}
            </p>
          )}

          {showNotesGrid && filteredNotes.length > 0 && (
            <NotesGrid
              notes={filteredNotes}
              deleteNote={deleteNote}
              restoreNote={restoreNote}
              permanentlyDeleteNote={permanentlyDeleteNote}
              togglePin={togglePin}
              toggleArchive={toggleArchive}
              editNote={editNote}
              addCollaborator={addCollaborator}
              removeCollaborator={removeCollaborator}
              setReminder={setReminder}
              removeReminder={removeReminder}
              addImage={addImage}
              removeImage={removeImage}
              toggleLabel={toggleLabel}
              labels={labels}
            />
          )}

          {currentPage === "reminders" && (
            <p className="empty-state">Notes with upcoming reminders appear here</p>
          )}
        </main>
      </div>

      {showEditLabels && (
        <EditLabelsModal
          labels={labels}
          onAdd={addLabel}
          onDelete={deleteLabel}
          onClose={() => setShowEditLabels(false)}
        />
      )}
    </>
  );
}

export default App;