import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header';
import Sidebar from '../Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const GateUser = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [formData, setFormData] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [transporters, setTransporters] = useState([]);
  const [selectedTransporter, setSelectedTransporter] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          transportersResponse,
          suppliersResponse,
          materialsResponse,
        ] = await Promise.all([
          axios.get('http://localhost:7070/api/v1/transporters'),
          axios.get('http://localhost:7070/api/v1/suppliers'),
          axios.get('http://localhost:7070/api/v1/materials'),
        ]);

        setTransporters(transportersResponse.data.content);
        setSuppliers(suppliersResponse.data.content);
        setMaterials(materialsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      gateKeeperStatus: 'At Gate-Keeper',
      gateKeeperEntryTime: new Date().toLocaleString(),
      gateKeeperExitTime: new Date().toLocaleString(),
    };

    try {
      const response = await axios.post(
        'http://localhost:7070/api/v1/gate-user/transaction/create',
        updatedFormData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Form data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7070/api/v1/vehicles/name/${searchInput}`
      );
      const data = response.data;

      if (data) {
        setFormData(data);
      } else {
        clearFormData();
        toast.info('No vehicle data found');
      }
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
      clearFormData();
      toast.error(` ${error.response.data}`);
    }
  };

  const clearFormData = () => {
    setFormData({});
  };

  const handleTransporterChange = async (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedTransporterName = e.target.options[selectedIndex].text;
    console.log('selectedTransporterName: ' + selectedTransporterName);
    setSelectedTransporter(selectedTransporterName);

    try {
      const response = await axios.get(
        `http://localhost:7070/api/v1/transporters/name?transporterName=${selectedTransporterName}`
      );
      const data = response.data;
      setFormData({ ...formData, ...data });
    } catch (error) {
      console.error('Error fetching transporter data:', error);
    }
  };

  const handleSupplierChange = async (e) => {

    const selectedIndex = e.target.selectedIndex;
    const selectedSupplierName = e.target.options[selectedIndex].text;

     console.log('selectedSupplierName :'+ selectedSupplierName)

    setSelectedSupplier(selectedSupplierName);

    try {
      const response = await axios.get(
        `http://localhost:7070/api/v1/suppliers/name?supplierName=${selectedSupplierName}`
      );
      const data = response.data;
      setFormData({ ...formData, ...data });
    } catch (error) {
      console.error('Error fetching transporter data:', error);
    }
  };

  // const handleSupplierChange = (e) => {
  //   const selectedSupplierId = e.target.value;
  //   setSelectedSupplier(selectedSupplierId);
  //   // Handle the selected supplier change here
  // };

  const handleMaterialChange = async (e) => {
    const selectedMaterialName = e.target.value;
    setSelectedMaterial(selectedMaterialName);

    try {
      const response = await axios.get(
        `http://localhost:7070/api/v1/materials/name/${selectedMaterialName}`
      );
      const data = response.data;
      setFormData({ ...formData, ...data });
    } catch (error) {
      console.error('Error fetching material data:', error);
    }
  };

  return (
    <div className="container">
      <div className="col-12">
        <h2 className="text-center mb-4">Vehicle Gate Entry</h2>
        <div className="mb-3 d-flex justify-content-start">
          <div className="row w-100">
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Vehicle Number"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-primary "
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className="col-md-2">
              <select
                className="form-control"
                value={selectedTransporter}
                onChange={handleTransporterChange}
              >
                <option value="">Select Transporter</option>
                {transporters.map((transporter) => (
                  <option
                    key={transporter.transporterId}
                    value={transporter.transporterId}
                  >
                    {transporter.transporterName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-control"
                value={selectedSupplier}
                onChange={handleSupplierChange}
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option
                    key={supplier.supplierId}
                    value={supplier.supplierId}
                  >
                    {supplier.supplierName}
                  </option>
                ))}
              </select>
            </div>
          {/* ##########dropdown for material ########### */}
          {/* <div className="col-md-2">
            <select
              className="form-control"
              value={selectedMaterial}
              onChange={handleMaterialChange}
            >
              <option value="">Select Material</option>
              {materials.map((material) => (
                <option key={material.materialId} value={material.materialName}>
                  {material.materialName}
                </option>
              ))}
            </select>
          </div> */}

<div className="col-md-2">
  <select
    className="form-control"
    value={formData.materialName}
    onChange={(e) => handleChange({ target: { name: 'materialName', value: e.target.value } })}
  >
    <option value="">Select Material Name</option>
    <option value="Sponge Iron">Sponge Iron</option>
    <option value="Coal">Coal</option>
    <option value="Iron Ores">Iron Ores</option>
  </select>
</div>
          {/* ##########dropdown for in/out bound ########### */}

          <div className="col-md-2">
  <select
    className="form-control"
    value={formData.inboundOutbound}
    onChange={(e) => handleChange({ target: { name: 'entryType', value: e.target.value } })}
  >
    <option value="">Select Inbound/Outbound</option>
    <option value="inbound">Inbound</option>
    <option value="outbound">Outbound</option>
  </select>
</div>

{/* className="gate-form w-100" */}


          </div>
      </div>
      
      <form  onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="vehicleId" className="form-label">
                Vehicle ID
              </label>
              <input
                type="text"
                className="form-control"
                id="vehicleId"
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="registrationNumber" className="form-label">
                Registration Number
              </label>
              <input
                type="text"
                className="form-control"
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="vehicleName" className="form-label">
                Vehicle Name
              </label>
              <input
                type="text"
                className="form-control"
                id="vehicleName"
                name="vehicleName"
                value={formData.vehicleName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="vehicleNumber" className="form-label">
                Vehicle Number
              </label>
              <input
                type="text"
                className="form-control"
                id="vehicleNumber"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="driverName" className="form-label">
                Driver Name
              </label>
              <input
                type="text"
                className="form-control"
                id="driverName"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="driverDLNumber" className="form-label">
                Driver DL Number
              </label>
              <input
                type="text"
                className="form-control"
                id="driverDLNumber"
                name="driverDLNumber"
                value={formData.driverDLNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="driverContactNumber" className="form-label">
                Driver Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                id="driverContactNumber"
                name="driverContactNumber"
                value={formData.driverContactNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="model" className="form-label">
                Model
              </label>
              <input
                type="text"
                className="form-control"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
              />
            </div>
          </div>
{/* ############################### Transporter Dropdown Data  ################################ */}
<div className="mb-2 text-danger text-center" style={{ fontSize: '15px' }}>
  <span className="text-uppercase">Transporters Details </span>
</div>



<div className="col-md-3" style={{ display: "none" }}>
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              ID
            </label>
            <input
              type="text"
              className="form-control"
              id="transporterId"
              name="transporterId"
              value={formData.transporterId}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="transporterName" className="form-label">
              Transporter Name
            </label>
            <input
              type="text"
              className="form-control"
              id="transporterName"
              name="transporterName"
              value={formData.transporterName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              className="form-control"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
    
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="registrationNumber" className="form-label">
              Registration Number
            </label>
            <input
              type="text"
              className="form-control"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
            />
          </div>
        </div> */}
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="membershipId" className="form-label">
              Membership ID
            </label>
            <input
              type="text"
              className="form-control"
              id="membershipId"
              name="membershipId"
              value={formData.membershipId}
              onChange={handleChange}
            />
          </div>
        </div>
{/* ############################### Supplier Dropdown Data  ################################ */}
<div className="mb-2 text-danger text-center" style={{ fontSize: '15px' }}>
  <span className="text-uppercase">Suppliers Details </span>
</div>

<div className="col-md-3" style={{ display: "none" }}>
          <div className="mb-3">
            <label htmlFor="supplierId" className="form-label">
              Supplier ID
            </label>
            <input
              type="text"
              className="form-control"
              id="supplierId"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="supplierName" className="form-label">
              Supplier Name
            </label>
            <input
              type="text"
              className="form-control"
              id="supplierName"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="supplierAddress" className="form-label">
              Supplier Address
            </label>
            <input
              type="text"
              className="form-control"
              id="supplierAddress"
              name="supplierAddress"
              value={formData.supplierAddress}
              onChange={handleChange}
            />
          </div>
        </div>
       
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="supplierContact" className="form-label">
              Supplier Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="supplierContact"
              name="supplierContact"
              value={formData.supplierContact}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="supplierEmail" className="form-label">
              Supplier Email
            </label>
            <input
              type="email"
              className="form-control"
              id="supplierEmail"
              name="supplierEmail"
              value={formData.supplierEmail}
              onChange={handleChange}
            />
          </div>
        </div>

{/* ############################### Material Dropdown Data  ################################ */}
<div className="mb-2 text-danger text-center" style={{ fontSize: '15px' ,display: 'none'}} >
  <span className="text-uppercase">Material Details </span>
</div>

        <div className="col-md-3" style={{ display: "none" }}>
          <div className="mb-3">
            <label htmlFor="materialId" className="form-label">
              Material ID
            </label>
            <input
              type="text"
              className="form-control"
              id="materialId"
              name="materialId"
              value={formData.materialId}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3" style={{ display: "none" }}>
          <div className="mb-3">
            <label htmlFor="materialName" className="form-label">
              Material Name
            </label>
            <input
              type="text"
              className="form-control"
              id="materialName"
              name="materialName"
              value={formData.materialName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3" style={{ display: "none" }}>
          <div className="mb-3">
            <label htmlFor="materialType" className="form-label">
              Material Type
            </label>
            <input
              type="text"
              className="form-control"
              id="materialType"
              name="materialType"
              value={formData.materialType}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row" style={{ display: "none" }}>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="parameter1Name" className="form-label">
              Parameter 1 Name
            </label>
            <input
              type="text"
              className="form-control"
              id="parameter1Name"
              name="parameter1Name"
              value={formData.parameter1Name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="parameter1Value" className="form-label">
              Parameter 1 Value
            </label>
            <input
              type="text"
              className="form-control"
              id="parameter1Value"
              name="parameter1Value"
              value={formData.parameter1Value}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="parameter2Name" className="form-label">
              Parameter 2 Name
            </label>
            <input
              type="text"
              className="form-control"
              id="parameter2Name"
              name="parameter2Name"
              value={formData.parameter2Name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="parameter2Value" className="form-label">
              Parameter 2 Value
            </label>
            <input
              type="text"
              className="form-control"
              id="parameter2Value"
              name="parameter2Value"
              value={formData.parameter2Value}
              onChange={handleChange}
            />
          </div>
        </div>

        </div>
        
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
   
   );
};

export default GateUser;
