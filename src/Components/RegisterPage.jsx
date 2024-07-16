import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import axios from 'axios'; // Import Axios
import '../Login.css';
import Select from 'react-select'; // Import Select from react-select

import { useNavigate } from 'react-router-dom';
 

export default function SignUpPage() {

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [roles, setRoles] = useState([]);

 const navigator = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:7079/api/auth/get/roles');
            const rolesData = response.data.map(role => ({ value: role.id, label: role.name }));
            setRoles(rolesData);
        } catch (error) {
            console.error("Failed to fetch roles:", error);
            toast.error("Failed to fetch roles. Please try again later.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    fetchRoles();
}, []);

 
const handleSelectChange = (selectedOption) => {
  setSelectedOptions(selectedOption);
};

const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
});

 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       // Extract role IDs from the selected options
       const selectedRoleIds = selectedOptions.map(option => option.label);

       // Include the selected role IDs in the formData object
      //  const dataToSubmit = {
      //      ...formData,
      //      roles: selectedRoleIds, // Assuming the server expects roles as an array of IDs
      //  };
      const dataToSubmit = {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRoleIds, // Send roles as an array of strings
    };

      const response = await axios.post('http://localhost:7079/api/auth/signup', dataToSubmit);
      console.log(response.data);
      // Handle success, e.g., show a success message or redirect

     
            // Check if the response data is an object and has a message property
            if (typeof response.data === 'object' && response.data.message) {
              // Display the message property without double quotes
              toast.success(response.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
              navigator('/login');
          } else {
              // If the response data is not an object or doesn't have a message property,
              // display the entire data as a string without double quotes
              toast.success(response.data, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
              navigator('/login');
          }
      } catch (error) {
          // Assuming the error response also contains a message property
          if (error.response && error.response.data && error.response.data.message) {
              // Display the error message without double quotes
              toast.error(error.response.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
          } else {
              // If the error response doesn't have a message property,
              // display the entire error response data as a string without double quotes
              toast.error(error.response?.data, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
          }
      }
  }

 return (
  <div className='login-page'>
    <div className="text-center">
      <h2 > Join us</h2>
      <h5>Create your personal account</h5>
      <form onSubmit={handleSubmit}>
        <p>
          <label id="reset_pass_lbl">Username</label><br/>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </p>
        <p>
          <label id="reset_pass_lbl">Email address</label><br/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </p>
        <p>
          <label id="reset_pass_lbl">Password</label><br/>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </p>
        <p>
                    <label id="reset_pass_lbl">Select roles</label><br />
                    <Select 
    options={roles}
    value={selectedOptions}
    onChange={handleSelectChange}
    isMulti
    styles={{
        option: (provided, state) => ({
            ...provided,
            color: 'black'
        })
    }}
/>

                </p>
        <p>
          <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
        </p>
        <p>
          <button id="sub_btnn" type="submit">Register</button>
        </p>
      </form>
      <footer>
        <p><Link to="/">Back to Homepage</Link>.</p>
      </footer>
    </div>
    </div>
 );
}
