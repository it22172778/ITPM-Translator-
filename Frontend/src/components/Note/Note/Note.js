import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Note.css';

function Note(props) {
  const { _id, name, note, grammer, complexsentence, description } = props.note;

  const navigate = useNavigate(); // Corrected variable name from history to navigate

  const deleteHandler = async () => {
    const userConfirm = window.confirm("Are you sure you want to delete this note?");
    if (userConfirm) {
      try {
        await axios.delete(`http://localhost:4000/notes/${_id}`);
        window.alert("Bookmark Deleted Successfully");
        navigate("/notedetails"); // Corrected navigation
      } catch (error) {
        console.log("Error in note deleting:", error);
      }
    }
  };

  return (
    <div style={{ alignItems: 'center' }}>
      <div className="card" style={{ width: '34rem' }}>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: '30px' }}>Note Display</h5>
          <h2 className="black-text">Name: {name}</h2>
          <h2 className="black-text">Note: {note}</h2>
          <h2 className="black-text">Grammer: {grammer}</h2>
          <h2 className="black-text">Complex Sentence: {complexsentence}</h2>
          <h2 className="black-text">Description: {description}</h2>
          <button
            className="nav_btn_log"
            onClick={() => (window.location.href = `/notedetails/${_id}`)}
          >
            Update
          </button>
          <button
            className="nav_btn_regi"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Note;
