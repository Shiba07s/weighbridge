import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DriverComponent = () => {
 const { driverId } = useParams(); // Get the driver ID from the URL
 const navigate = useNavigate();
 const [driverData, setDriverData] = useState({
    driverName: '',
    driverContact: '',
    dlNo: '',
    dlExpiryDate: '',
 });

 useEffect(() => {
    if (driverId) { // If there's an ID, fetch the driver data
        console.log('driverId'+driverId)
      axios.get(`http://localhost:7070/api/v1/drivers/${driverId}`)
        .then(response => {
          setDriverData(response.data);
        })
        .catch(error => console.error('Error fetching driver:', error));
    }
 }, [driverId]); // Corrected to use driverId

 const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverData(prevState => ({ ...prevState, [name]: value }));
 };

 const saveDriver = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (driverId) { // If there's an ID, update the driver
        response = await axios.put(`http://localhost:7070/api/v1/drivers/${driverId}`, driverData);
      } else { // Otherwise, create a new driver
        response = await axios.post('http://localhost:7070/api/v1/drivers/create', driverData);
      }
      console.log('Success:', response.data);
      navigate('/drivers'); // Redirect to drivers list or another page
    } catch (error) {
      console.error('Error:', error);
    }
 };

 return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          <h2 className='text-center'>{driverId ? 'Update' : 'Add'} Driver</h2>
          <div className='card-body'>
            <form onSubmit={saveDriver}>
              {/* Driver Name */}
              <div className='form-group mb-2'>
                <label className='form-label'>Driver Name</label>
                <input
                 type='text'
                 placeholder='Enter Driver Name'
                 name='driverName'
                 value={driverData.driverName}
                 className='form-control'
                 onChange={handleChange}
                />
              </div>
              {/* Driver Contact */}
              <div className='form-group mb-2'>
                <label className='form-label'>Driver Contact</label>
                <input
                 type='text'
                 placeholder='Enter Driver Contact'
                 name='driverContact'
                 value={driverData.driverContact}
                 className='form-control'
                 onChange={handleChange}
                />
              </div>
              {/* DL Number */}
              <div className='form-group mb-2'>
                <label className='form-label'>DL Number</label>
                <input
                 type='text'
                 placeholder='Enter DL Number'
                 name='dlNo'
                 value={driverData.dlNo}
                 className='form-control'
                 onChange={handleChange}
                />
              </div>
              {/* DL Expiry Date */}
              <div className='form-group mb-2'>
                <label className='form-label'>DL Expiry Date</label>
                <input
                 type='date'
                 placeholder='Enter DL Expiry Date'
                 name='dlExpiryDate'
                 value={driverData.dlExpiryDate}
                 className='form-control'
                 onChange={handleChange}
                />
              </div>
              <button type='submit' className='btn btn-success'>
                {driverId ? 'Update' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
 );
};

export default DriverComponent;
