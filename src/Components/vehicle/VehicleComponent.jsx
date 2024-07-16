import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";

const VehicleComponent = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState({
    registrationNumber: "",
    vehicleName: "",
    driverName: "",
    driverDLNumber: "",
    driverContactNumber: "",
    model: "",
    color: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:7070/api/v1/vehicles/${id}`).then((response) => {
        setVehicleData(response.data);
      }).catch((error) => console.error("Error fetching vehicle:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevState) => ({...prevState, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!vehicleData.registrationNumber.trim()) {
      validationErrors.registrationNumber = "Vehicle Registration Number is required";
    }
    if (!vehicleData.vehicleName.trim()) {
      validationErrors.vehicleName = "Vehicle Name is required";
    }
    if (!vehicleData.driverName.trim()) {
      validationErrors.driverName = "Driver Name is required";
    }
    if (!vehicleData.driverDLNumber.trim()) {
      validationErrors.driverDLNumber = "Driver DL Number is required";
    }
    if (!vehicleData.driverContactNumber.trim()) {
      validationErrors.driverContactNumber = "Driver Contact Number is required";
    }
    if (!vehicleData.color.trim()) {
      validationErrors.color = "Vehicle Color Name is required";
    }
    if (!vehicleData.model.trim()) {
      validationErrors.model = "Vehicle Model Name is required";
    }

    return validationErrors;
  };

  const saveVehicle = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Prevent form submission if there are validation errors
    }

    try {
      let response;
      if (id) {
        response = await axios.put(`http://localhost:7070/api/v1/vehicles/update/${id}`, vehicleData);
      } else {
        response = await axios.post("http://localhost:7070/api/v1/vehicles/create", vehicleData);
      }
      console.log("Success:", response.data);
      navigate("/get-vehicles");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
     
      <div className="container text-center">
        <br /><br />
        <div className="row">
          <div className="card-body">
            <form onSubmit={saveVehicle}>
              <h2 className="text-center">{id? "Update" : "Add"} Vehicle</h2>

              {/* Registration Number */}
              <div className="form-group mb-2">
                <label className="form-label">Registration Number</label>
                <input
                  type="text"
                  placeholder="Enter Registration Number"
                  name="registrationNumber"
                  value={vehicleData.registrationNumber}
                  className={`form-control ${errors.registrationNumber? "is-invalid" : ''}`}
                  onChange={handleChange}
                />
                {errors.registrationNumber && (
                  <div className="invalid-feedback">{errors.registrationNumber}</div>
                )}
              </div>

              {/* Vehicle Name */}
              <div className="form-group mb-2">
                <label className="form-label">Vehicle Name</label>
                <input
                  type="text"
                  placeholder="Enter Vehicle Name"
                  name="vehicleName"
                  value={vehicleData.vehicleName}
                  className={`form-control ${errors.vehicleName? "is-invalid" : ''}`}
                  onChange={handleChange}
                />
                {errors.vehicleName && (
                  <div className="invalid-feedback">{errors.vehicleName}</div>
                )}
              </div>

              {/* Driver Name */}
              <div className="form-group mb-2">
                <label className="form-label">Driver Name</label>
                <input
                  type="text"
                  placeholder="Enter Driver Name"
                  name="driverName"
                  value={vehicleData.driverName}
                  className={`form-control ${errors.driverName? "is-invalid" : ''}`}
                  onChange={handleChange}
                />
                {errors.driverName && (
                  <div className="invalid-feedback">{errors.driverName}</div>
                )}
              </div>

              {/* Driver DL Number */}
              <div className="form-group mb-2">
                <label className="form-label">Driver DL Number</label>
                <input
                  type="text"
                  placeholder="Enter Driver DL Number"
                  name="driverDLNumber"
                  value={vehicleData.driverDLNumber}
                  className={`form-control ${errors.driverDLNumber? "is-invalid" : ''}`}
                  onChange={handleChange}
                />
                {errors.driverDLNumber && (
                  <div className="invalid-feedback">{errors.driverDLNumber}</div>
                )}
              </div>

              {/* Driver Contact Number */}
              <div className="form-group mb-2">
                <label className="form-label">Driver Contact Number</label>
                <input
                  type="text"
                  placeholder="Enter Driver Contact Number"
                  name="driverContactNumber"
                  value={vehicleData.driverContactNumber}
                  className={`form-control ${errors.driverContactNumber? "is-invalid" : ''}`}
                  onChange={handleChange}
                />
                {errors.driverContactNumber && (
                  <div className="invalid-feedback">{errors.driverContactNumber}</div>
                )}
              </div>

              {/* Model */}
              <div className="form-group mb-2">
                <label className="form-label">Model</label>
                <input
                  type="text"
                  placeholder="Enter Model"
                  name="model"
                  value={vehicleData.model}
                  className={`form-control ${errors.model? "is-invalid" : ''}`}
                  onChange={handleChange}
                />
                {errors.model && (
                  <div className="invalid-feedback">{errors.model}</div>
                )}
              </div>

              {/* Color */}
              <div className="form-group mb-2">
                <label className="form-label">Color</label>
                <input
                  type="text"
                  placeholder="Enter Color"
                  name="color"
                  value={vehicleData.color}
                  className={`form-control ${errors.color? 'is-invalid': ''}`}
                  onChange={handleChange}
                />
                {errors.color && (
                  <div className="invalid-feedback">{errors.color}</div>
                )}
              </div>

              <button type="submit" className="btn btn-success">
                {id? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
   );
};

export default VehicleComponent;
