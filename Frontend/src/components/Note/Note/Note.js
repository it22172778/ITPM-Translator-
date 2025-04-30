import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Note.css';

function Note(props) {
  const { _id, name, note, grammer, complexsentence, description } = props.note;
  const history = useNavigate();

  const deleteHandler = async () => {
    const userconfirm = window.confirm("Are you sure you want to delete this note?");
    if (userconfirm) {
      try {
        await axios.delete(`http://localhost:4000/notes/${_id}`);
        window.alert("Note Deleted Successfully");
        history("/notedetails");
        window.location.reload();
      } catch (error) {
        console.log("Error in note deleting:", error);
      }
    }
  };

  return (
    <div style={{ alignItems: 'center' }}>
      <div className="card" style={{ width: '35rem', backgroundColor: '#63C5DA', color: 'white', padding: '20px' }}>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: '30px', color: '#05043f' }}><strong>Note</strong></h5>

          {/* Aligning text to the left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            <h2 className="black-text" style={{ color: '#05043f', margin: '0', fontSize: '18px' }}><strong>Name:</strong> {name}</h2>
            <h2 className="black-text" style={{ color: '#05043f', margin: '0', fontSize: '18px' }}><strong>Note:</strong> {note}</h2>
            <h2 className="black-text" style={{ color: '#05043f', margin: '0', fontSize: '18px' }}><strong>Grammer:</strong> {grammer}</h2>
            <h2 className="black-text" style={{ color: '#05043f', margin: '0', fontSize: '18px' }}><strong>Complex Sentence:</strong> {complexsentence}</h2>
            <h2 className="black-text" style={{ color: '#05043f', margin: '0', fontSize: '18px' }}><strong>Description:</strong> {description}</h2>
          </div>

          {/* Buttons container with margin-top for spacing */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '30px' }}>
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
    </div>
  );
}

export default Note;
