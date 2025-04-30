import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from '../Nav/Nav';
import bgImage from "./update.jpeg";

function Updatenote() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:4000/notes/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.note));
    };
    fetchHandler();
  }, [id]);

  // Handle only letters input for name and grammer fields
  const handleLettersOnly = (e) => {
    // Replace anything that is not a letter or space
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    handleChange(e);
  };

  // Implementing the sendrequest function
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:4000/notes/${id}`, {
        name: String(inputs.name),
        note: String(inputs.note),
        grammer: String(inputs.grammer),
        complexsentence: String(inputs.complexsentence),
        description: String(inputs.description),
      })
      .then((res) => res.data);
  };

  // Implementing the function that should happen when making inputs and submitting
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // After where should navigate, url related function
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/notedetails'), alert("Notedetails updated successfully"));
  };

  return (
    <div>
      <Nav />
      <div className="position-relative d-flex align-items-center justify-content-center vh-100"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}>
        <form onSubmit={handleSubmit}>
          <h1 style={{ marginTop: "90px" }}>Update Notes</h1>
          <div className="mb-3">
            <label htmlFor="InputName" className="form-label">Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              aria-describedby="nameHelp" 
              onChange={handleLettersOnly} 
              value={inputs.name} 
            />
            <div id="namehelp" className="form-text">Please remember the name you are able to search by this keyword</div>
          </div>
          <div className="mb-3">
            <label htmlFor="InputNote" className="form-label">Note</label>
            <textarea name="note" className="form-control" onChange={handleChange} value={inputs.note} required />
          </div>
          <div className="mb-3">
            <label htmlFor="InputGrammer" className="form-label">Grammer</label>
            <input 
              type="text" 
              className="form-control" 
              name="grammer" 
              onChange={handleLettersOnly} 
              value={inputs.grammer} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputComplexsentence" className="form-label">Complex sentence</label>
            <input type="text" className="form-control" name="complexsentence" onChange={handleChange} value={inputs.complexsentence} required />
          </div>
          <div className="mb-3">
            <label htmlFor="InputDescription" className="form-label">Description</label>
            <input type="text" className="form-control" name="description" onChange={handleChange} value={inputs.description} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Updatenote;
