import React, { useEffect, useState } from "react";
import "./ComponentSupplier.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";

function ComponentSupplier() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const { supplierId } = useParams();
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    supplierName: "",
    supplierAddress: "",
    supplierContact: "",
    supplierEmail: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (supplierId) {
      axios
        .get(`http://localhost:7070/api/v1/suppliers/${supplierId}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching supplier:", error);
          // Handle error
        });
    }
  }, [supplierId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!formData.supplierName.trim()) {
      validationErrors.supplierName = "Supplier name is required";
    }
    if (!formData.supplierAddress.trim()) {
      validationErrors.supplierAddress = "Supplier address is required";
    }
    if (!formData.supplierContact.trim()) {
      validationErrors.supplierContact = "Supplier contact is required";
    }
    if (!formData.supplierEmail.trim()) {
      validationErrors.supplierEmail = "Supplier email is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      // If there are validation errors, set them and return early
      setErrors(validationErrors);
      return;
    }

 
    try {
      let response;
      if (supplierId) {
        response = await axios.put(`http://localhost:7070/api/v1/suppliers/update/${supplierId}`, formData);
      } else {
        response = await axios.post("http://localhost:7070/api/v1/suppliers/create", formData);
      }
      console.log("Success:", response.data);
      navigator("/get-supplier");
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
 
      <div className="container text-center">
        <form onSubmit={handleSubmit}  > 
          <h2 className="text-center">
            {supplierId ? "Update" : "Add"} Supplier Form
          </h2>
          <div>
            <label htmlFor="supplierName">Supplier Name:</label>
            <input
              type="text"
              name="supplierName"
              id="supplierName"
              value={formData.supplierName}
              className={`form-control ${
                errors.supplierName ? "is-invalid" : ""
              }`}
              onChange={handleChange}
            />
            {errors.supplierName && (
              <div className="invalid-feedback">{errors.supplierName}</div>
            )}
          </div>
          <div>
            <label htmlFor="supplierAddress">Supplier Address:</label>
            <input
              type="text"
              name="supplierAddress"
              id="supplierAddress"
              value={formData.supplierAddress}
              className={`form-control ${
                errors.supplierAddress ? "is-invalid" : ""
              }`}
              onChange={handleChange}
            />
            {errors.supplierAddress && (
              <div className="invalid-feedback">{errors.supplierAddress}</div>
            )}
          </div>
          <div>
            <label htmlFor="supplierContact">Supplier Contact:</label>
            <input
              type="text"
              name="supplierContact"
              id="supplierContact"
              value={formData.supplierContact}
              className={`form-control ${
                errors.supplierContact ? "is-invalid" : ""
              }`}
              onChange={handleChange}
            />
            {errors.supplierContact && (
              <div className="invalid-feedback">{errors.supplierContact}</div>
            )}
          </div>
          <div>
            <label htmlFor="supplierEmail">Supplier Email:</label>
            <input
              type="email"
              name="supplierEmail"
              id="supplierEmail"
              value={formData.supplierEmail}
              className={`form-control ${
                errors.supplierEmail ? "is-invalid" : ""
              }`}
              onChange={handleChange}
            />
            {errors.supplierEmail && (
              <div className="invalid-feedback">{errors.supplierEmail}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success">
                {supplierId? "Update" : "Submit"}
              </button>       
           </form>
      </div>
    );

}

export default ComponentSupplier;
