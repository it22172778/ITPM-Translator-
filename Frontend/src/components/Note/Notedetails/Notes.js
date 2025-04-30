import React, { useState, useEffect, useRef } from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import Note from "../Note/Note";
import { useReactToPrint } from "react-to-print";
import './Notes.css';

const URL = "http://localhost:4000/notes";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function Notes() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      setNotes(data.Notes);
      setFilteredNotes(data.Notes);
    }).catch((e) => console.log(e));
  }, []);

  const componentRef = useRef(null);
  const handleprint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Notes Report",
    onAfterPrint: () => alert("Notes Report Successfully Downloaded!"),
  });

  const handlesearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = notes.filter((note) =>
      note.name.toLowerCase().includes(query) ||
      note.description.toLowerCase().includes(query)
    );
    setFilteredNotes(filtered);
    setNoResults(filtered.length === 0);
  };

  return (
    <div>
      <Nav />
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
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
          Stay on top of your translations and enhance them with your own insights. This section enables you to manage, edit, and delete notes for every translated text. Just click on a note to make changes or remove it, and use the 'Add New Note' button to add more to your collection. Keep everything organized and maximize your bilingual journey with our easy-to-use note management feature.
        </p>

        <div className="note-panel-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <div className="note-list" style={{ width: '30%', padding: '10px', borderRight: '1px solid #ddd', position: 'absolute', top: '250px', left: '10px' }}>
            <h2 style={{ color: '#05043f', fontSize: '28px', fontWeight: 'bold' }}>Your Notes</h2>
            <ul>
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note, index) => (
                  <li 
                    key={index} 
                    onClick={() => setSelectedNote(note)} 
                    style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc', color: '#05043f', fontSize: '20px', fontWeight: 'bold' }}
                  >
                    {note.name}
                  </li>
                ))
              ) : (
                <li style={{ padding: '10px', color: '#05043f', fontWeight: 'bold' }}>No Notes Found</li>
              )}
            </ul>
          </div>

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
              marginTop: '-475px'
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
            <button className="btn btn-primary" id='downloadreport' onClick={handleprint} style={{ fontSize: '18px', width: '200px', fontWeight: 'bold', marginTop: '20px' }}>
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
