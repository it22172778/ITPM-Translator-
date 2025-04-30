import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from '../Nav/Nav';

function Updatenote() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:4000/notes/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.note));
    };
    fetchHandler();
  }, [id]);

  const handleLettersOnly = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    handleChange(e);
  };

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

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      alert("Note details updated successfully");
      history('/notedetails');
    });
  };

  return (
    <div>
      <Nav />
      <div className="d-flex align-items-center justify-content-center vh-100">
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white" style={{ minWidth: "400px" }}>
          <h2 className="mb-4 text-center">Update Notes</h2>
          <div className="mb-3">
            <label htmlFor="InputName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleLettersOnly}
              value={inputs.name || ''}
              required
            />
            <div id="namehelp" className="form-text">Please remember the name; you can search by this keyword.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="InputNote" className="form-label">Note</label>
            <textarea
              name="note"
              className="form-control"
              onChange={handleChange}
              value={inputs.note || ''}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputGrammer" className="form-label">Grammer</label>
            <input
              type="text"
              className="form-control"
              name="grammer"
              onChange={handleLettersOnly}
              value={inputs.grammer || ''}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputComplexsentence" className="form-label">Complex sentence</label>
            <input
              type="text"
              className="form-control"
              name="complexsentence"
              onChange={handleChange}
              value={inputs.complexsentence || ''}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputDescription" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              onChange={handleChange}
              value={inputs.description || ''}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Updatenote;
