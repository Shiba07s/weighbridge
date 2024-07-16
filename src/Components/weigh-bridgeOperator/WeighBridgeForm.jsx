import React, { useState } from "react";
import axios from "axios";
import Header from "../Header";
import Sidebar from "../Sidebar";
import ProfilePage from "./TransactionProfileData";
import "./weigh.css";

const WeighBridgeForm = () => {
  const [profileData, setProfileData] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [formData, setFormData] = useState({
    weighOperatorId: "",
    transactionId: "",
    grossWeight: "",
    tareWeight: "",
    netWeight: "",
  });

  const toggleSidebar = () => {
    setOpenSidebarToggle((prev) => !prev);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7070/api/v1/master-transaction/name/${searchInput}`
      );
      const data = response.data;

      if (data) {
        setFormData(data);
        setProfileData(data);
      } else {
        setFormData({
          weighOperatorId: "",
          transactionId: "",
          grossWeight: "",
          tareWeight: "",
          netWeight: "",
        });
        setProfileData(null);
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      setFormData({
        weighOperatorId: "",
        transactionId: "",
        grossWeight: "",
        tareWeight: "",
        netWeight: "",
      });
      setProfileData(null);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const grossWeight = parseFloat(name === "grossWeight" ? value : formData.grossWeight);
    const tareWeight = parseFloat(name === "tareWeight" ? value : formData.tareWeight);
    const netWeight = isNaN(grossWeight) || isNaN(tareWeight) ? "" : grossWeight - tareWeight;

    setFormData({
      ...formData,
      [name]: value,
      netWeight: netWeight.toString(),
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const payload = {
        transactionId: formData.transactionId || "",
      };

      if (formData.grossWeight) {
        payload.grossWeight = formData.grossWeight;
        if (!formData.tareWeight && !formData.netWeight) {
          // Only gross weight submitted
          payload.weighBridgeOperatorStatus = "At weigh-bridge";
          payload.wboEntryTime = new Date().toLocaleString(); // Set current local time
        } else if (formData.tareWeight && formData.netWeight) {
          // Gross weight, tare weight, and net weight submitted
          payload.tareWeight = formData.tareWeight;
          payload.netWeight = formData.netWeight;
          payload.wboEntryTime= formData.wboEntryTime;
          payload.weighBridgeOperatorStatus = "At weigh-bridge";
          payload.wboExitTime = new Date().toLocaleString(); // Set current local time
        }
      }

      const response = await axios.post(
        'http://localhost:7070/api/v1/weighbridgeoperator/create',
        payload
      );

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(formData);

  //   try {
  //     const response = await axios.post(
  //       'http://localhost:7070/api/v1/weighbridgeoperator/create',
  //       {
  //         transactionId: formData.transactionId,
  //         grossWeight: formData.grossWeight,
  //         tareWeight: formData.tareWeight,
  //         netWeight: formData.netWeight,
  //       }
  //     );

  //     console.log("API Response:", response.data);
  //   } catch (error) {
  //     console.error("Error submitting form data:", error);
  //   }
  // };

  return (
     

      <div className="WeighBridgeForm-container">
        <h2 className="text-center mb-4">WB Information</h2>
        <div className="WeighBridgeForm-search-row">
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
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {profileData && <ProfilePage profileData={profileData} />}

        <form className="WeighBridgeForm-gate-form w-100" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <div className="WeighBridgeForm-form-group">
                <label htmlFor="grossWeight" className="WeighBridgeForm-form-label">
                  Gross Weight:
                </label>
                <input
                  type="text"
                  name="grossWeight"
                  value={formData.grossWeight}
                  onChange={handleChange}
                  className="WeighBridgeForm-form-input"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="WeighBridgeForm-form-group">
                <label htmlFor="tareWeight" className="WeighBridgeForm-form-label">
                  Tare Weight
                </label>
                <input
                  type="text"
                  name="tareWeight"
                  value={formData.tareWeight}
                  onChange={handleChange}
                  className="WeighBridgeForm-form-input"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="WeighBridgeForm-form-group">
                <label htmlFor="netWeight" className="WeighBridgeForm-form-label">
                  Net Weight
                </label>
                <input
                  type="text"
                  name="netWeight"
                  value={formData.netWeight}
                  readOnly
                  className="WeighBridgeForm-form-input"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="WeighBridgeForm-submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
   );
};

export default WeighBridgeForm;