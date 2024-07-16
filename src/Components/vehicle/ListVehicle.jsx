import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const ListVehicle = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    pageNumber: '',
    pageSize: '',
    totalPages: '',
    totalElements: '',
    lastPage: true,
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async (pageNumber = 0) => {
    try {
      const response = await axios.get(`http://localhost:7070/api/v1/vehicles?pageNumber=${pageNumber}&pageSize=10&sortBy=vehicleId&sortDir=asc`);
      setVehicles(response.data.content);
      setPaginationInfo({
        pageNumber: response.data.pageNumber,
        pageSize: response.data.pageSize,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        lastPage: response.data.lastPage,
      });
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const addNewVehicle = () => {
    navigate('/add-vehicles');
  };

  const updateVehicle = (id) => {
    navigate(`/edit-vehicles/${id}`);
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:7070/api/v1/vehicles/delete/${vehicleId}`);
      setVehicles(
        vehicles.filter((vehicle) => vehicle.vehicleId != vehicleId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const goToFirstPage = () => {
    fetchVehicles(0);
  };

  const goToLastPage = () => {
    fetchVehicles(paginationInfo.totalPages - 1);
  };

  return (
    <div className='container'>
      <h2 className='text-center'>List Of Vehicles</h2>
      <button className='btn btn-primary mb-2' onClick={addNewVehicle}>
        Add Vehicles
      </button>
      <div className="table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl">
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Registration Number</th>
              <th>Vehicle Name</th>
              <th>Vehicle Number</th>
              <th>Driver Name</th>
              <th>Driver DL Number</th>
              <th>Driver Contact Number</th>
              <th>Model</th>
              <th>Color</th>
              <th style={{ width: '15%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.vehicleId}>
                <td>{vehicle.vehicleId}</td>
                <td>{vehicle.registrationNumber}</td>
                <td>{vehicle.vehicleName}</td>
                <td>{vehicle.vehicleNumber}</td>
                <td>{vehicle.driverName}</td>
                <td>{vehicle.driverDLNumber}</td>
                <td>{vehicle.driverContactNumber}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.color}</td>
                <td>
                  <div>
                    <button
                      className="button-edit task-button"
                      onClick={() => updateVehicle(vehicle.vehicleId)}
                      style={{ border: "none" }}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{
                          color: "orange",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </button>
                    <button
                      className="button-delete task-button"
                      onClick={() =>
                        handleDeleteVehicle(vehicle.vehicleId)
                      }
                      style={{ border: "none" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          color: "red",
                          width: "20px",
                          height: "20px",
                          marginLeft: "20px",
                        }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination className="text-center mt-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PaginationItem>
          <PaginationLink first onClick={goToFirstPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous onClick={() => fetchVehicles(paginationInfo.pageNumber - 1)} disabled={paginationInfo.pageNumber === 0} />
        </PaginationItem>
        {[...Array(paginationInfo.totalPages)].map((_, index) => (
          <PaginationItem key={index} active={index === paginationInfo.pageNumber}>
            <PaginationLink onClick={() => fetchVehicles(index)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink next onClick={() => fetchVehicles(paginationInfo.pageNumber + 1)} disabled={paginationInfo.lastPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last onClick={goToLastPage} />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default ListVehicle;
