import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../App.css';

export default function SignInPage() {
    const [formData,setFormData]=useState({
        password: '',
        
    });

    const navigator = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData,[e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
 // Retrieve the email from session storage
 const email = sessionStorage.getItem('email');
 if (!email) {
     // Handle the case where the email is not found in session storage
     toast.error('Email not found in session storage.', {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
     });
     return;
 }

 // Log the retrieved email to the console
 console.log('Retrieved email from session storage:', email);
        try {
            const response = await axios.put(`http://localhost:7079/api/auth/update/${email}`, formData);
            console.log(response.data);
            // Display a toast notification on successful login with the API response
            // toast.success(`Login successful! Response: ${JSON.stringify(response.data)}`, {
      
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
                navigator('/login')
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
                navigator('/login')

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
        <div className="text-center ">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>New Password</label><br/>
                    <input type="text" name="password" value={formData.password} onChange={handleChange} required  />
                </p>
                {/* <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required  />
                </p> */}
                <p>
                    <button id="sub_btnn" type="submit">Submit</button>
                </p>
            </form>
            <footer>
                {/* <p>First time? <Link to="/register">Create an account</Link>.</p> */}
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
        </div>
    )
}
