import { useEffect, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CreateNote from "./components/CreateNote";
import NotesGrid from "./components/NotesGrid";
import SearchBar from "./components/SearchBar";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
});

const [searchTerm, setSearchTerm] = useState("");

const sortedNotes = [...notes].sort(
  (a, b) => Number(b.pinned) - Number(a.pinned ?? false)
);

const filteredNotes = sortedNotes.filter((note) =>
  note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  note.content.toLowerCase().includes(searchTerm.toLowerCase())
);



function addNote(newNote) {
  setNotes((prevNotes) => [...prevNotes, newNote]);
}

useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);


function deleteNote(id) {
  setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
  );
}

function togglePin(id) {
  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note.id === id
        ? { ...note, pinned: !note.pinned }
        : note
    )
  );
}

function toggleArchive(id) {
  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note.id === id
        ? { ...note, archived: !note.archived }
        : note
    )
  );
}

function editNote(updatedNote) {
  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note.id === updatedNote.id
        ? updatedNote
        : note
    )
  );
}

function changeColor(id, color) {
  console.log("Changing:", id, color);

  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note.id === id
        ? { ...note, color }
        : note
    )
  );
}

return (
  <>
  <Header 
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
  />
  
  <div className="container">
    <Sidebar />
    
    <main className="content">
      
      <CreateNote addNote={addNote}/>
      
      <NotesGrid
        notes={filteredNotes}
        deleteNote={deleteNote}
        togglePin={togglePin}
        toggleArchive={toggleArchive}
        editNote={editNote}
        changeColor={changeColor}
      />
    </main>
  </div>
  </>
  );
}

export default App;