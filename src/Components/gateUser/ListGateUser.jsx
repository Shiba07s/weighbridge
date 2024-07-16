import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Header'
import Sidebar from '../Sidebar'

const ListGateUser = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

   const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect( () => {
    fetchTransactions();

  }, []);

   const  fetchTransactions = async () => {
    try {
       const response = await axios.get('http://localhost:7070/api/v1/gate-user/transaction');
       setTransactions(response.data);
    } catch (error) {
        console.error('error fetching transactions data', error);
    }
   };

   const addNewTransaction = () => {
    navigate('/gate-user');
    
   };

  //  const updateTransactions = (transactionId) => {
  //   navigate(`/edit-page/${transactionId}`);
  //  };

  return (
     
    <div className='container mt-2 '>
        <h2 className='text-center'>List Of Transaction Details</h2>
        <button className='btn btn-primary mb-2' onClick={addNewTransaction}>
      Add Transaction
    </button>
    <div  class="table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl">

        <table className='table table-striped table-bordered'>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Transporter Name</th>
          <th>Contact Number</th>
          <th>Membership ID</th>
          <th>Registration Number</th>
          <th>Vehicle Name</th>
          <th>Vehicle Number</th>
          <th>Driver Name</th>
          <th>Driver DL Number</th>
          <th>Driver Contact Number</th>
          <th>Model</th>
          <th>Material Name</th>
          <th>Material Type</th>
          <th>Supplier Name</th>
          <th>Supplier Contact</th>
          <th>Entry Type</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
  {transactions.map(transaction => (
    <tr key={transaction.transactionId}>
      <td>{transaction.transactionId}</td>
      <td>{transaction.transporterName}</td>
      <td>{transaction.contactNumber}</td>
      <td>{transaction.membershipId}</td>
      <td>{transaction.registrationNumber}</td>
      <td>{transaction.vehicleName}</td>
      <td>{transaction.vehicleNumber}</td>
      <td>{transaction.driverName}</td>
      <td>{transaction.driverDLNumber}</td>
      <td>{transaction.driverContactNumber}</td>
      <td>{transaction.model}</td>
      <td>{transaction.materialName}</td>
      <td>{transaction.materialType}</td>
      <td>{transaction.supplierName}</td>
      <td>{transaction.supplierContact}</td>
      <td>{transaction.entryType}</td>
      {/* <td>
        <button
          className='btn btn-info'
          onClick={() => updateTransactions(transaction.transactionId)}
        >
          Update
        </button>
      </td> */}
    </tr>
  ))}
</tbody>

        </table>
        </div>
        
    </div>
   )
}

export default ListGateUser