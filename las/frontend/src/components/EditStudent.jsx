import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditStudent() {
  const [formData, setFormData] = useState({
    studentID: '', fname: '', lname: '', email: '', dob: '', department: '', enrollmentYear: '', isActive: true
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/students/${id}`)
      .then(res => setFormData(res.data));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/students/${id}`, formData);
    navigate('/students');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Student</h2>
      {Object.keys(formData).map((key) => (
        key !== 'isActive' ? (
          <div key={key}>
            <label>{key}: </label>
            <input name={key} value={formData[key]} onChange={handleChange} required />
          </div>
        ) : (
          <div key={key}>
            <label>{key}: </label>
            <input type="checkbox" name={key} checked={formData[key]} onChange={handleChange} />
          </div>
        )
      ))}
      <button type="submit">Update Student</button>
    </form>
  );
}

export default EditStudent;