import React, { useState, useEffect, useRef } from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import Note from "../Note/Note";
import { useReactToPrint } from "react-to-print";
import './Notes.css';
import bgimg from "./bg3.jpeg";

const URL = "http://localhost:4000/notes";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function Notes() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);  // New state to hold filtered notes
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHandler().then((data) => {
      setNotes(data.Notes);
      setFilteredNotes(data.Notes); // Initially show all notes
    })
      .catch((e) => console.log(e));
  }, []);

  const componentRef = useRef(null);
  const handleprint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Notes Report",
    onAfterPrint: () => alert("Notes Report Successfully Downloaded!"),
  });

  const [noResults, setNoResults] = useState(false);

  const handlesearch = (e) => {
    const query = e.target.value.toLowerCase();  // Capture input in lowercase
    setSearchQuery(query);
    const filtered = notes.filter((note) =>
      note.name.toLowerCase().includes(query) ||   // Filter by name field (you can add more fields here if needed)
      note.description.toLowerCase().includes(query) // For example, filter by description too
    );
    setFilteredNotes(filtered);
    setNoResults(filtered.length === 0);  // If no results, show 'No Notes Found'
  };

  return (
    <div>
      <Nav />
      <div className="bgimg"
        style={{
          backgroundImage: `url(${bgimg})`, backgroundSize: "cover", minHeight: "100vh",
          display: "flex", flexDirection: "column", alignItems: "center"
        }}>
        <br />
        <h1 className='hed1' style={{ color: '#05043f', fontSize: '36px', fontWeight: 'bold' }}>NOTE PANEL</h1>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <input 
            className="search" 
            onChange={handlesearch} 
            type='text' 
            name='search' 
            value={searchQuery}
            placeholder='Search notes by name or description'
            style={{ width: '230px', marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }} 
          />
          <button className="searchbtn" onClick={handlesearch} style={{ fontSize: '18px', fontWeight: 'bold' }}>Search</button>
        </div>

        <p className='theme1' style={{ fontSize: '20px', color: '#05043f', fontWeight: 'bold' }}>
          Keep your translations organized and enriched with personal insights. This section allows you to delete, edit, and manage notes for each translated text. 
          Simply click on a note to edit or delete it, and use the 'Add New Note' button to expand your collection. Stay organized and make the most out of your bilingual experience with our seamless note management system.
        </p>

        <div className="note-panel-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <div className="note-list" style={{ width: '30%', padding: '10px', borderRight: '1px solid #ddd', position: 'absolute', top: '250px', left: '10px' }}>
            <h2 style={{ color: '#05043f', fontSize: '28px', fontWeight: 'bold' }}>Your Notes</h2> {/* Increased font size and bold */}
            <ul>
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note, index) => (
                  <li 
                    key={index} 
                    onClick={() => setSelectedNote(note)} 
                    style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc', color: '#05043f', fontSize: '20px', fontWeight: 'bold' }}
                  >
                    {note.name} {/* Increased font size and bold */}
                  </li>
                ))
              ) : (
                <li style={{ padding: '10px', color: '#05043f', fontWeight: 'bold' }}>No Notes Found</li>
              )}
            </ul>
          </div>

          {/* Middle Section for Selected Note */}
          <div className="notes-container"
            style={{
              width: '60%',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              textAlign: 'center',
              marginTop: '-475px' // Now the card is closer to the search bar
            }}>
            {noResults ? (
              <div>
                <p>No Notes Found</p>
              </div>
            ) : (
              <div ref={componentRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between' }}>
                {selectedNote ? (
                  <Note note={selectedNote} style={{ fontSize: '14px', fontWeight: 'bold' }} />
                ) : (
                  <p>Select a note from the list to view details.</p>
                )}
              </div>
            )}
            <button className="btn btn-primary" id='downloadreport' onClick={handleprint} style={{ fontSize: '18px', width: '200px', fontWeight: 'bold' }}>
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
