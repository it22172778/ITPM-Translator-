import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Note.css';

function Note(props) {
    const {_id,name,note,grammer,complexsentence,description}=props.note;

    //implementing the delete function below delete handler
    const history=useNavigate();
    
    const deleteHandler=async()=>{
     const userconfirm=window.confirm("Are you sure you want to delete this note?")
     if(userconfirm){
      try{
      await axios.delete(`http://localhost:4000/notes/${_id}`)
      // .then(res=>res.data)
      // .then(()=>history("/"))
      window.alert("Bookmark Deleted Successfully");
      history("/notedetails");
      window.location.reload();
      }catch(error){
      console.log("Error in note deleting:",error);
      };
    }
      
    }
  return (
    <div style={{alignItems:'center'}}>
       <div className="card" style={{width: '25rem', backgroundColor: '#964B00', color: 'white'}}>
   
   <div className="card-body" >
     <h5 className="card-title" style={{fontSize:'30px', color: 'white'}}>Note Display</h5>
     {/* <h2>ID:{_id}</h2> */}
      <h2 className="black-text" style={{color: 'white'}}>Name:{name}</h2>
      <h2 className="black-text" style={{color: 'white'}}>Note:{note}</h2>
      <h2 className="black-text" style={{color: 'white'}}>Grammer:{grammer}</h2>
      <h2 className="black-text" style={{color: 'white'}}>Complex Sentence:{complexsentence}</h2>
      <h2 className="black-text" style={{color: 'white'}}>Description:{description}</h2>
     {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
      {/* <button className='bt'>
      <Link to={`/notedetails/${_id}`} className='btn btn-primary'>Update</Link>
      </button>
      <button  className='btn btn-primary'>Delete</button>  */}
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
