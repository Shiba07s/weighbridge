import React, { useState, useEffect } from "react";

import {
  listEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../WBServices/allapi";
import { useNavigate, useParams } from "react-router-dom";

const GateKepper = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
  });
  const { id } = useParams();

  const [employees, setEmployees] = useState([]);

  const [searchId, setSearchId] = useState(""); // State to store the value from the search bar

  const handleSearchChange = (e) => {
    setSearchId(e.target.value); // Update the searchId state as the user types in the search bar
  };

  useEffect(() => {
    // Fetch data from API
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees()
      .then((Response) => {
        setEmployees(Response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function saveEOrUpdatemployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email, mobileNumber };
      console.log(employee);

      if (searchId) {
        updateEmployee(searchId, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employee");
          })
          .catch((error) => {
            console.erreo(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "FirstName is Required";
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.lastName = "LastName is Required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email Id is Required";
      valid = false;
    }
    if (mobileNumber.trim()) {
      errorsCopy.mobileNumber = "";
    } else {
      errorsCopy.mobileNumber = "MobileNumber is Required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function callapi() {
    getEmployee(searchId)
      .then((response) => {
        const employeeData = response.data;
        setFirstName(employeeData.firstName || "");
        setLastName(employeeData.lastName || "");
        setEmail(employeeData.email || "");
        setMobileNumber(employeeData.mobileNumber || "");
      })
      .catch((error) => {
        // console.error('Error fetching employee data:', error);
        if (error.response && error.response.status === 404) {
          alert("User Not exist with id : " + searchId);
        } else {
          alert("Failed to fetch employee data");
        }
      });
  }

  return (
    <div className="form-control-sm">
      <div className="input-group">
        <div className="form-outline" data-mdb-input-init>
          <input
            id="form1"
            type="search"
            onChange={handleSearchChange}
            class="form-control"
          />
          <label className="form-label" htmlFor="form1">
            Search
          </label>
        </div>
        <button
          type="button"
          onClick={callapi}
          class="btn btn-primary"
          data-mdb-ripple-init
        >
          <i class="fas fa-search"></i>
        </button>
      </div>

      <div className="col">
        <div className="form-control-sm">
          {/* {
                    pageTitle()
                } */}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First name</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name ..."
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last name</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name ..."
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  placeholder="Enter Employee mail id ..."
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Mobile Number</label>
                <input
                  type="number"
                  placeholder="Enter Employee Mobile Number ..."
                  name="mobileNummber"
                  value={mobileNumber}
                  className={`form-control ${
                    errors.mobileNumber ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setMobileNumber(e.target.value)}
                ></input>
                {errors.mobileNumber && (
                  <div className="invalid-feedback">{errors.mobileNumber}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveEOrUpdatemployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GateKepper;
