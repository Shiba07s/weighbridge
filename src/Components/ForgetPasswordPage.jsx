import React , {useEffect, useState} from 'react'
import { Link, json } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

import '../App.css'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ForgetPasswordPage() {

    const navigator= useNavigate();
  const [formData, setFormData] = useState({
        email: '',
    });

    const handleChange = (e) =>{
        setFormData({... formData,[e.target.name]: e.target.value});
    }

    const handleSubmit =async (e) =>{
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:7079/api/auth/send-mail', formData);
    
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
                sessionStorage.setItem('email', formData.email);
 
                navigator('/retype-password');

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
                sessionStorage.setItem('email', formData.email);

                navigator('/retype-password')

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
 
 

    // function changePassword(){
    //     navigator('/retype-password')

    // }
    return (
        <div className='login-page'>
        <div className="text-center ">
            <h2>Reset your password</h2>
            <h5>Enter your email address and we will send you a new password</h5>
            <form onSubmit={handleSubmit}>
                <p>
                    <label id="reset_pass_lbl">Email address</label><br/>
                    <input type="email" name="email" value={formData.name} onChange={handleChange} required />
                </p>
                <p>
                    <button id="sub_btnn" type="submit" >Send password reset email</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
        </div>
    )
}
