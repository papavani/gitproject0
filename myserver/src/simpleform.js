import React , {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';

const SimpleForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [branch, setBranch] = useState('');
    const [passedOutYear, setPassedOutYear] = useState([]);

    const handleFirstNameChange=(event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange=(event) => {
        setLastName(event.target.value);
    };
    const handleGenderChange=(event) => {
        setGender(event.target.value);
    };
    const handleEmailChange =(event) => {
        setEmail(event.target.value);
    };
    const handleMobileNoChange=(event) => {
        setMobileNo(event.target.value);
    };
    const handleBranchChange=(event) => {
        setBranch(event.target.value);
    };
    const handlePassedOutYearChange = (event) => {
        const year = event.target.value;
        if (event.target.checked) {
          setPassedOutYear((prevYears) => [...prevYears, year]);
        } else {
          setPassedOutYear((prevYears) => prevYears.filter((y) => y !== year));
        }
      };
      const [fetchedData, setFetchedData] = useState([]);

  // Function to fetch data from the server using GET request
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/users');

      // Assuming the response contains an array of user data
      setFetchedData(response.data);
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Create an object with the form data
        const formData = {
         firstName,
         lastName,
         gender,
         email ,
         mobileNo,
         branch,
         passedOutYear
        };

    
        // Send the form data to the server using Axios
        try {
          const response = await axios.post('http://localhost:3005/users', formData);
    
          console.log('Form data submitted successfully!', response.data);
          

          // Update the table with the newly submitted data
          setFetchedData([...fetchedData, response.data]);

          resetForm();
        } catch (error) {
          console.error('Error while submitting form data:', error);
          
        }
      };
      const resetForm = () => {
        setFirstName('');
        setLastName('');
        setGender('');
        setBranch('');
        setEmail('');
        setMobileNo('');
        setPassedOutYear([]);
      }
    const isSubmitDisabled = !(firstName && lastName && gender && email && mobileNo && branch && passedOutYear.length>0); 
    return (
        <div className='container'>
            <h2> Simple Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label > FirstName :</label>
                    <input type="text" name="FirstName" value={firstName} onChange={handleFirstNameChange} required />

                </div>
                <div>
                    <label > LastName :</label>
                    <input type="text" name="LastName" value={lastName} onChange={handleLastNameChange} required />
                </div>
                <div>
          <label>Gender:</label>
          <label>
            <input type="radio"  name="gender"   value="male"  checked={gender === 'male'} onChange={handleGenderChange}
            />
            Male
          </label>
          <label>
            <input type="radio"  name="gender"   value="female" checked={gender === 'female'} onChange={handleGenderChange}
            />
            FeMale
          </label>
          </div>
               <div>
                    <label> Email:</label>
                    <input type="text" name="email" value={email} onChange={handleEmailChange} required />
                </div>
                <div>
                    <label> mobileNo:</label>
                    <input type="text" name="mobileNo" value={mobileNo} onChange={handleMobileNoChange} required />
                </div>
                <div>
          <label>Branch:</label>
          <select value={branch} onChange={handleBranchChange} required>
            <option value="">Select Branch</option>
            <option value="ECE">ECE</option>
            <option value="CSE">CSE</option>
            <option value="EEE">EEE</option>
          </select>
        </div>
        <div className='passed-out-check-boxes'>
          <label>Passed Out Year:</label>
          <label>
          <input
              type="checkbox"
              value="2016-2020" 
              checked={passedOutYear.includes('2016-2020')}
              onChange={handlePassedOutYearChange}
            />
            2016-2020
          </label>
          <label>
            <input
              type="checkbox"
              value="2017-2021"
              checked={passedOutYear.includes('2017-2021')}
              onChange={handlePassedOutYearChange}
            />
            2017-2021
          </label>
          <label>
            <input
            type="checkbox"
            value="2018-2022"
            checked={passedOutYear.includes('2018-2022')}
            onChange={handlePassedOutYearChange}
            />
            2018-2022
          </label>
          
        </div> 
        <div className='submit-button'>
                <button type="submit" disabled={isSubmitDisabled}>
                   Submit
                </button>
        </div>
            </form>
            {/* Display the fetched data */}
      <div className='Fetched Data'>
        <h3>Student Data:</h3>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Branch</th>
              <th>Passed Out Year</th>
            </tr>
          </thead>
          <tbody>
          {fetchedData.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.mobileNo}</td>
                <td>{user.branch}</td>
                <td>{user.passedOutYear?.join(', ')}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default SimpleForm;
