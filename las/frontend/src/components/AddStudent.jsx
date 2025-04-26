import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const [formData, setFormData] = useState({
    studentID: '',
    fname: '',
    lname: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true,
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    let val = value;

    if (name === 'enrollmentYear') {
      val = parseInt(value, 10);
    }

    if (type === 'checkbox') {
      val = checked;
    }

    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://student-management-system-2zew.onrender.com/students', formData);
      navigate('/students');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Add New Student</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        {Object.keys(formData).map((key) =>
          key !== 'isActive' ? (
            <div className="mb-3" key={key}>
              <label htmlFor={key} className="form-label text-capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
              <input
                type={key === 'email' ? 'email' : key === 'dob' ? 'date' : 'text'}
                className="form-control"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            <div className="form-check mb-3" key={key}>
              <input
                type="checkbox"
                className="form-check-input"
                id={key}
                name={key}
                checked={formData[key]}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor={key}>Is Active</label>
            </div>
          )
        )}
        <button type="submit" className="btn btn-success w-100">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
