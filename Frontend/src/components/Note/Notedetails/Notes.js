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
  const [selectedNote, setSelectedNote] = useState(null);
  
  useEffect(() => {
    fetchHandler().then((data) => {
      setNotes(data.Notes);
    })
      .catch((e) => console.log(e));
  }, []);

  const componentRef = useRef(null);
  const handleprint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Notes Report",
    onAfterPrint: () => alert("Notes Report Successfully Downloaded!"),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handlesearch = () => {
    fetchHandler().then((data) => {
      const filteredNotes = data.Notes.filter((note) =>
        note.name.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
      setNotes(filteredNotes);
      setNoResults(filteredNotes.length === 0);
    });
  }

  return (
    <div>
      <Nav />
      <div className="bgimg"
        style={{
          backgroundImage: `url(${bgimg})`, backgroundSize: "cover", minHeight: "100vh",
          display: "flex", flexDirection: "column", alignItems: "center"
        }}>
        <br />
        <h1 className='hed1'>NOTE PANEL</h1>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <input className="search" onChange={(e) => setSearchQuery(e.target.value)}
            type='text'
            name='search'
            placeholder='Search user details'
            style={{ width: '230px', marginRight: '10px' }} />
          <button className="searchbtn" onClick={handlesearch}>Search</button>
        </div>

        <p className='theme1'>
          Keep your translations organized and enriched with personal insights. This section allows you to delete, edit, and manage notes for each translated text. 
          Simply click on a note to edit or delete it, and use the 'Add New Note' button to expand your collection. Stay organized and make the most out of your bilingual experience with our seamless note management system.
        </p>

        <div className="note-panel-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <div className="note-list" style={{ width: '30%', padding: '10px', borderRight: '1px solid #ddd', position: 'absolute', top: '250px', left: '10px' }}>
            <h2>Your Notes</h2>
            <ul>
              {notes.map((note, index) => (
                <li key={index} onClick={() => setSelectedNote(note)} style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ccc' }}>
                  {note.name}
                </li>
              ))}
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
                  <Note note={selectedNote} style={{ fontSize: '14px' }} />
                ) : (
                  <p>Select a note from the list to view details.</p>
                )}
              </div>
            )}
            <button className="btn btn-primary" id='downloadreport' onClick={handleprint}>
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
