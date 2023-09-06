import React, {useState} from 'react';
import './App.css';

const App = () => {
  const[inputvalue, setInputValue]= useState('');
  const[branch,setBranch]= useState('');

  const handleChange = (event) =>
{
  setInputValue(event.target.value);
};

const handleBranchChange=(event) =>
{
  setBranch(event.target.value);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const form={
    inputvalue,
     branch
    };

  console.log('submit the form data:' ,form);
   resetForm();
};

 const resetForm = () => {
  setInputValue('');
  setBranch('');
 };

const submitDisabled = !(inputvalue && branch);
return(
  <div className='container'>
    <h2> Simple Form</h2>
  <form onSubmit={handleSubmit} >
    <div>
    <label> Inputvalue:</label>
  <input type="text" name='Inputvalue' value={inputvalue} onChange={handleChange} />&nbsp;
  </div>
  <div>
  <label> Branch:</label>
  <select value={branch} onChange={handleBranchChange}>
  <option value=" Search"> SelectBranch</option>
  <option value="ECE">ECE</option>
  <option value="CSE">CSE</option>
  <option value="EEE">EEE</option>
  </select>
  </div>
  
  <div className='Submit-button'>
  <button type="submit" disabled={submitDisabled} >

    submit
  </button>
  </div>
  </form>
   </div>
  
  
);


};

export default App;