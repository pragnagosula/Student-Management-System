import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4 text-primary">Student Management System</h1>
      <p className="mb-4">Welcome! Use the options below to manage student data.</p>
      
      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-outline-primary btn-lg"
          onClick={() => navigate('/students')}
        >
          View Students
        </button>
        <button
          className="btn btn-success btn-lg"
          onClick={() => navigate('/add')}
        >
          Add Student
        </button>
      </div>
    </div>
  );
}

export default Home;
