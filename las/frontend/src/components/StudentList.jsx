import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/students');
    setStudents(res.data);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container mt-5">
  <h2 className="text-center mb-4 text-primary">Student List</h2>
  <div className="mb-3 text-end">
    <Link to="/add" className="btn btn-success">Add New Student</Link>
  </div>

  <div className="table-responsive shadow">
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Student ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Department</th>
          <th>Enrollment Year</th>
          <th>Is Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student._id}>
            <td>{student.studentID}</td>
            <td>{student.fname}</td>
            <td>{student.lname}</td>
            <td>{student.email}</td>
            <td>{new Date(student.dob).toLocaleDateString()}</td>
            <td>{student.department}</td>
            <td>{student.enrollmentYear}</td>
            <td>
              <span className={`badge ${student.isActive ? 'bg-success' : 'bg-secondary'}`}>
                {student.isActive ? 'Yes' : 'No'}
              </span>
            </td>
            <td>
              <Link to={`/edit/${student._id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
              <button className="btn btn-sm btn-danger" onClick={() => deleteStudent(student._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default StudentList;