import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';

const TransporterComponent = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [errors, setErrors] = useState({});
  const { transporterId } = useParams();
  const navigate = useNavigate();
  const [transporterName, setTransporterName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [membershipId, setMembershipId] = useState('');

  useEffect(() => {
    if (transporterId) {
      axios.get(`http://localhost:7070/api/v1/transporters/${transporterId}`)
       .then(response => {
          const { transporterName, contactNumber, email, address, membershipId } = response.data;
          setTransporterName(transporterName);
          setContactNumber(contactNumber);
          setEmail(email);
          setAddress(address);
          setMembershipId(membershipId);
        })
       .catch(error => console.error('Error fetching transporter:', error));
    }
  }, [transporterId]);

  const validateForm = () => {
    const validationErrors = {};

    if (!transporterName.trim()) {
      validationErrors.transporterName = "Transporter Name is required";
    }
    if (!contactNumber.trim()) {
      validationErrors.contactNumber = "Contact Number is required";
    }
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!address.trim()) {
      validationErrors.address = "Address is required";
    }
    if (!membershipId.trim()) {
      validationErrors.membershipId = "Membership ID is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSaveTransporter = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      let response;
      const data = { transporterName, contactNumber, email, address, membershipId };
      if (transporterId) {
        response = await axios.put(`http://localhost:7070/api/v1/transporters/update/${transporterId}`, data);
      } else {
        response = await axios.post('http://localhost:7070/api/v1/transporters/create', data);
      }
      console.log('Success:', response.data);
      navigate('/get-transporters');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className='container text-center'>
      <br /> <br />
      <form onSubmit={handleSaveTransporter}>
        <h2 className='text-center'>{transporterId ? 'Update' : 'Add'} Transporter</h2>
        <div className='form-group mb-2'>
          <label htmlFor='transporterName' className='form-label'>Transporter Name</label>
          <input
            type='text'
            id='transporterName'
            placeholder='Enter Transporter Name'
            value={transporterName}
            className={`form-control ${errors.transporterName ? "is-invalid" : ''}`}
            onChange={(e) => setTransporterName(e.target.value)}
          />
          {errors.transporterName && (
            <div className='invalid-feedback'>{errors.transporterName}</div>
          )}
        </div>
        <div className='form-group mb-2'>
          <label htmlFor='contactNumber' className='form-label'>Contact Number</label>
          <input
            type='text'
            id='contactNumber'
            placeholder='Enter Contact Number'
            value={contactNumber}
            className={`form-control ${errors.contactNumber ? "is-invalid" : ''}`}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          {errors.contactNumber && (
            <div className='invalid-feedback'>{errors.contactNumber}</div>
          )}
        </div>
        <div className='form-group mb-2'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input
            type='text'
            id='email'
            placeholder='Enter Email'
            value={email}
            className={`form-control ${errors.email ? "is-invalid" : ''}`}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div className='invalid-feedback'>{errors.email}</div>
          )}
        </div>
        <div className='form-group mb-2'>
          <label htmlFor='address' className='form-label'>Address</label>
          <input
            type='text'
            id='address'
            placeholder='Enter Address'
            value={address}
            className={`form-control ${errors.address ? "is-invalid" : ''}`}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <div className='invalid-feedback'>{errors.address}</div>
          )}
        </div>
        <div className='form-group mb-2'>
          <label htmlFor='membershipId' className='form-label'>Membership ID</label>
          <input
            type='text'
            id='membershipId'
            placeholder='Enter Membership ID'
            value={membershipId}
            className={`form-control ${errors.membershipId ? "is-invalid" : ''}`}
            onChange={(e) => setMembershipId(e.target.value)}
          />
          {errors.membershipId && (
            <div className='invalid-feedback'>{errors.membershipId}</div>
          )}
        </div>

        {/* Repeat similar structure for other input fields */}
        <button type='submit' className='btn btn btn-success'>
          {transporterId ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default TransporterComponent;
