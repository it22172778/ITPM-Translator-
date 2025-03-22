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
    console.log("abc");
    fetchHandler().then((data) => {
      console.log("data", data);
      setNotes(data.Notes);
    })
      .catch((e) => console.log(e));
  }, []);

  // Implementing the downloading report function
  const componentRef = useRef(null);
  const handleprint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Notes Report",
    onAfterPrint: () => alert("Notes Report Successfully Downloaded!"),
  });

  // Implementing the search functions
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
          backgroundImage: `url(${bgimg})`, backgroundSize: "cover", position: "sticky", WebkitPosition: "sticky",
          MozPosition: "sticky"
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

        <div className="note-panel-container" style={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* Left Sidebar for Note List */}
          <div className="note-list" style={{ width: '30%', padding: '10px', borderRight: '1px solid #ddd', position: 'absolute', top: '100px', left: '10px' }}>
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
              width: '70%',
              padding: '20px',  // Increased padding to make the card bigger
              marginLeft: '32%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Optional: Add some shadow for better card appearance
              borderRadius: '8px',  // Optional: Add rounded corners to the card
              backgroundColor: 'white'  // Optional: Make the card background white for better contrast
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
            <button className="btn btn-primary" id='downloadreport' onClick={() => {
              handleprint();
            }}>Download Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
