import React from "react";

const ProfilePage = ({ profileData }) => {
  return (
    <div>
      <h2 className="text-center blink-text">Profile Details</h2>
      <div className="row">
        <div className="col-md-4">
          <p className="blue-label">Transaction ID  : {profileData.transactionId}</p>
          <p className="blue-label">Transporter Name: {profileData.transporterName}</p>
          <p className="blue-label">Contact Number  : {profileData.contactNumber}</p>
          <p className="blue-label">Supplier Name   : {profileData.supplierName}</p>
          <p className="blue-label">Supplier Contact: {profileData.supplierContact}</p>

        </div>

        <div className="col-md-4">
          <p className="blue-label">Material Name: {profileData.materialName}</p>
          <p className="blue-label">Registration Number: {profileData.registrationNumber}</p>
          <p className="blue-label">Vehicle Name: {profileData.vehicleName}</p>
          <p className="blue-label">Driver Name: {profileData.driverName}</p>
          </div>
          <div className="col-md-4">
          <p className="blue-label">Driver DL Number: {profileData.driverDLNumber}</p>
          <p className="blue-label">Driver Contact Number: {profileData.driverContactNumber}</p>
          <p className="blue-label">Model: {profileData.model}</p>
          <p className="blue-label">Material Type: {profileData.materialType}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
