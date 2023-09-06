import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    mobileNo: '',
    email: '',
    branch: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBranchChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, branch: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3005/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the response from the server
        setFormData({
          firstName: '',
          lastName: '',
          gender: '',
          mobileNo: '',
          email: '',
          branch: ''
        });
      })
      .catch(error => console.log(error));
  };
  const isSubmitDisabled = !(formData.firstName && formData.lastName && formData.mobileNo && formData.email && formData.branch);


  return (
    <div>
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
        <div className="form-field">
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className='form-field'>
          <label>Gender:</label>
          <label>
            <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
            Female
          </label>
        </div>
        <div className='form-field'>
          <label>Mobile Number:</label>
          <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
        </div>
        <div className='form-field'>
          <label>Email:</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className='form-field'>
          <label>Branch:</label>
          <select name="branch" value={formData.branch} onChange={handleBranchChange}>
            <option value="">Select Branch</option>
            <option value="ECE">ECE</option>
            <option value="CSC">CSC</option>
            <option value="EEE">EEE</option>
          </select>
        </div>
        </div>
        <div className='submit-button-container'>
        <button type="submit" className="submit-button" disabled={isSubmitDisabled}>
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default App;
