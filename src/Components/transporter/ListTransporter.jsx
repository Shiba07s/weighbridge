import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Header from '../Header'
import Sidebar from '../Sidebar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const ListTransporter = () => {
  const [transporters, setTransporters] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalPages: 1,
    totalElements: 0,
    lastPage: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransporters();
  }, []);

  const fetchTransporters = async (pageNumber = 0) => {
    try {
      const response = await axios.get(`http://localhost:7070/api/v1/transporters?pageNumber=${pageNumber}&pageSize=10&sortBy=transporterId&sortDir=asc`);
      setTransporters(response.data.content);
      setPaginationInfo({
        pageNumber: response.data.pageNumber,
        pageSize: response.data.pageSize,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        lastPage: response.data.lastPage,
      });
    } catch (error) {
      console.error('Error fetching transporters:', error);
    }
  };

  const addNewTransporters = () => {
    navigate(`/add-transporters`);
  };

  const updateTransporters = (transporterId) => {
    navigate(`/edit-transporters/${transporterId}`);
  };

  const handleDeleteTransporter = async (transporterId) => {
    try {
      await axios.delete(`http://localhost:7070/api/v1/transporters/delete/${transporterId}`);
      setTransporters(transporters.filter(transporter => transporter.transporterId !== transporterId));
    } catch (error) {
      console.error(error);
    }
  };

  const goToFirstPage = () => {
    fetchTransporters(0);
  };

  const goToLastPage = () => {
    fetchTransporters(paginationInfo.totalPages - 1);
  };

  return (
    <div className='container'>
      <h2 className='text-center'>List Of Transporters</h2>
      <button className='btn btn-primary mb-2' onClick={addNewTransporters}>
        Add Transporters
      </button>
      <div className="table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl">
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Transporter Name</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Membership ID</th>
              <th style={{ width: '15%' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {transporters.map(transporter => (
              <tr key={transporter.transporterId}>
                <td>{transporter.transporterId}</td>
                <td>{transporter.transporterName}</td>
                <td>{transporter.contactNumber}</td>
                <td>{transporter.email}</td>
                <td>{transporter.address}</td>
                <td>{transporter.membershipId}</td>
                <td>
                  <div>
                    <button
                      className="button-edit task-button"
                      onClick={() => updateTransporters(transporter.transporterId)}
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
                      onClick={() => handleDeleteTransporter(transporter.transporterId)}
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
          <PaginationLink previous onClick={() => fetchTransporters(paginationInfo.pageNumber - 1)} disabled={paginationInfo.pageNumber === 0} />
        </PaginationItem>
        {[...Array(paginationInfo.totalPages)].map((_, index) => (
          <PaginationItem key={index} active={index === paginationInfo.pageNumber}>
            <PaginationLink onClick={() => fetchTransporters(index)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink next onClick={() => fetchTransporters(paginationInfo.pageNumber + 1)} disabled={paginationInfo.lastPage} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last onClick={goToLastPage} />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default ListTransporter;
