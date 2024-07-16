import React, { useState } from 'react';
import axios from 'axios';
import './Quality.css';
import Header from '../Header';
import Sidebar from '../Sidebar';
import ProfilePage from "../weigh-bridgeOperator/TransactionProfileData";

const QualityForm = () => {
 const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
 const [selectedOption, setSelectedOption] = useState('');
 const [searchTerm, setSearchTerm] = useState('');
 const [searchInput, setSearchInput] = useState('');
 const [profileData, setProfileData] = useState(null);
 const [formData, setFormData] = useState({
    size: '',
    feM: '',
    feT: '',
    mtz: '',
    carbon: '',
    sulphur: '',
    nonMag: '',
    moisture: '',
    vm: '',
    ash: '',
    fc: '',
    loi: '',
 });

 const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
 };

 const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
 };

 const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const payload = mapFormDataToPayload(selectedOption, formData);
        console.log('Submitting payload:', payload); // Log the payload before sending
        const response = await axios.post('http://localhost:7070/api/v1/materials/create', payload);
        console.log('Form submitted successfully:', response.data);
        // Reset form data or perform additional actions after successful submission
    } catch (error) {
        console.error('Error submitting form:', error);
        // Consider showing an error message to the user
    }
};


 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
 };

 const handleProfileSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:7070/api/v1/master-transaction/name/${searchInput}`);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error:', error);
      // Consider showing an error message to the user
    }
 };

 const mapFormDataToPayload = (option, formData) => {
    // Construct the payload object based on the selected option and all form data fields
    return {
      type: option,
      ...formData // Spread all form data fields into the payload
    };
  };
  


  return (
     
      <div style={{ marginLeft: '180px' }}>
        <h2 className='text-center'>Quality Operator Form</h2>
        <div className="search-dropdown-row">
          <div className="row w-100">
            <div className="col-md-4">
              <input
                type="text"
                className="WeighBridgeForm-search-input"
                placeholder="Search by Ticket Number"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <button
                type="button"
                className="WeighBridgeForm-search-button"
                onClick={handleProfileSearch}
              >
                Search
              </button>
            </div>
            <div className="col-md-4">
              <div className="dropdown-container">
                <select value={selectedOption} onChange={handleOptionChange}>
                  <option value="">Select an option</option>
                  <option value="spongeIron">Sponge Iron</option>
                  <option value="coal">Coal</option>
                  <option value="ironOres">Iron Ores</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Render ProfilePage if profileData is available */}
        {profileData && <ProfilePage profileData={profileData} />}

        {/* Show form only if an option is selected */}
        {selectedOption && (
          <form onSubmit={handleSubmit}>
            <div className="fields-container">
              {/* Sponge Iron Fields */}
              {selectedOption === 'spongeIron' && (
                <>
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="size">Size:</label>
                      <input
                        type="text"
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="feM">Fe(m):</label>
                      <input
                        type="text"
                        id="feM"
                        name="feM"
                        value={formData.feM}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="feT">%Fe(t):</label>
                      <input
                        type="text"
                        id="feT"
                        name="feT"
                        value={formData.feT}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="mtz"> %Mtz:</label>
                      <input
                        type="text"
                        id="mtz"
                        name="mtz"
                        value={formData.mtz}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="carbon">% Carbon:</label>
                      <input
                        type="text"
                        id="carbon"
                        name="carbon"
                        value={formData.carbon}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="sulphur"> % Sulphur:</label>
                      <input
                        type="text"
                        id="sulphur"
                        name="sulphur"
                        value={formData.sulphur}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="nonMag">% Non-Mag: </label>
                      <input
                        type="text"
                        id="nonMag"
                        name="nonMag"
                        value={formData.nonMag}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </>
              )}

{selectedOption === 'coal' && (
  <>
    <div className="row">
      <div className="col-md-3">
        <label htmlFor="moisture">Moisture:</label>
        <input
          type="text"
          id="moisture"
          name="moisture"
          value={formData.moisture}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="vm">Volatile Matter (VM):</label>
        <input
          type="text"
          id="vm"
          name="vm"
          value={formData.vm}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-md-3">
        <label htmlFor="ash">Ash:</label>
        <input
          type="text"
          id="ash"
          name="ash"
          value={formData.ash}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="fc"> Fixed Carbon (FC) :</label>
        <input
          type="text"
          id="fc"
          name="fc"
          value={formData.fc}
          onChange={handleInputChange}
        />
      </div>
    </div>
  </>
)}

{/* Iron Ores Fields */}
{selectedOption === 'ironOres' && (
  <>
    <div>
      <label htmlFor="size">Size in mm:</label>
      <input
        type="text"
        id="size"
        name="size"
        value={formData.size}
        onChange={handleInputChange}
      />
      <label htmlFor="feT">%Fe(t):</label>
      <input
        type="text"
        id="feT"
        name="feT"
        value={formData.feT}
        onChange={handleInputChange}
      />
      <label htmlFor="loi">Loss on Ignition (LOI):</label>
      <input
        type="text"
        id="loi"
        name="loi"
        value={formData.loi}
        onChange={handleInputChange}
      />
    </div>
  </>
)}
</div>

{/* Submit Button */}
<div className="submit-button-container">
  <button type="submit" className="submit-button">
    Submit
  </button>
</div>
</form>
)}
</div>
 );
};

export default QualityForm;