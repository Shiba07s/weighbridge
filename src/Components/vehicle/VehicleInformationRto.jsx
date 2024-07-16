import React, { useState } from 'react';
import axios from 'axios';

const VehicleInformationRto = () => {
    const [regNo, setRegNo] = useState('');
    const [vehicleData, setVehicleData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const options = {
          method: 'POST',
          url: 'https://rto-vehicle-information-verification-india.p.rapidapi.com/api/v1/rc/vehicleinfo',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'a64513deacmsh44bb9832b737912p155839jsn37fd9d5435e2',
            'X-RapidAPI-Host': 'rto-vehicle-information-verification-india.p.rapidapi.com'
          },
          data: {
            reg_no: regNo,
            consent: 'Y',
            consent_text: 'I hear by declare my consent agreement for fetching my information via AITAN Labs API'
          }
        };
  
        const response = await axios.request(options);
        setVehicleData(response.data.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <h2>Vehicle Information</h2>
        <div>
          <input
            type="text"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            placeholder="Enter Registration Number"
          />
          <button onClick={handleSearch} disabled={!regNo || loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && <p>Error: {error}</p>}
        {vehicleData && (
          <div>
            <h3>Basic Information:</h3>
            <p>Registration Number: {vehicleData.reg_no}</p>
            <p>Owner: {vehicleData.owner_name}</p>
            <p>Model: {vehicleData.model}</p>
  
            <h3>Vehicle Details:</h3>
            <p>Chassis Number: {vehicleData.chassis_no}</p>
            <p>Engine Number: {vehicleData.engine_no}</p>
            <p>Vehicle Class: {vehicleData.vehicle_class_desc}</p>
            {/* Add more fields as needed */}
            
            <h3>Insurance Details:</h3>
            <p>Insurance Company: {vehicleData.vehicle_insurance_details.insurance_company_name}</p>
            <p>Policy Number: {vehicleData.vehicle_insurance_details.policy_no}</p>
            {/* Add more fields as needed */}
            
            <h3>Permit Details:</h3>
            <p>Permit Type: {vehicleData.permit_details.permit_type}</p>
            <p>Permit Valid From: {vehicleData.permit_details.permit_valid_from}</p>
            {/* Add more fields as needed */}
            
            <h3>Tax Details:</h3>
            <p>Tax Amount: {vehicleData.latest_tax_details.tax_amt}</p>
            <p>Receipt Date: {vehicleData.latest_tax_details.rcpt_dt}</p>
            {/* Add more fields as needed */}
            
            {/* Add other sections and fields as needed */}
          </div>
        )}
      </div>
    );
  };

export default VehicleInformationRto;
