import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import axios from 'axios';

import '../Login.css';

export default function SignInPage() {

    const navigator = useNavigate();

    const [formData,setFormData]=useState({
        name: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData,[e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSubmit = {
            username: formData.name,
         
            password: formData.password,
             
        };
    
        try {
            const response = await axios.post('http://localhost:7079/api/auth/signin', dataToSubmit);
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
                navigator('/homepage');
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
                navigator('/homepage');
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
        // <div className='login-page'>
        <div className="text-center" >
            <h2>Sign in to us</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label id="reset_pass_lbl">Username or email address</label><br/>
                    <input 
                        type="text"
                     name="name"
                     value={formData.name}
                      onChange={handleChange} required  />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required  />
                </p>
                {/* <p>
                    <label id="reset_pass_lbl">Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required  />
                </p> */}
                <p>
                    <button id="sub_btnn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
        // </div>
    )
}
