import axios from "axios";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const ListDriver = () => {
    const navigate = useNavigate();

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await axios.get('http://localhost:7070/api/v1/drivers');
            setDrivers(response.data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const addNewDriver = () => {
        navigate(`/add-driver`);
    };

    const updateDriver = (driverId) => {
        navigate(`/edit-driver/${driverId}`);
    };

    return (
        <div className='container'>
            <h2 className='text-center'>List Of Drivers</h2>
            <button className='btn btn-primary mb-2' onClick={addNewDriver}>
                Add Driver
            </button>
            <div  class="table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl">
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Driver Name</th>
                        <th>Contact Number</th>
                        <th>DL Number</th>
                        <th>DL Expiry Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map(driver => (
                        <tr key={driver.driverId}>
                            <td>{driver.driverId}</td>
                            <td>{driver.driverName}</td>
                            <td>{driver.driverContact}</td>
                            <td>{driver.dlNo}</td>
                            <td>{driver.dlExpiryDate}</td>
                            <td>
                                <button
                                    className='btn btn-info'
                                    onClick={() => updateDriver(driver.driverId)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default ListDriver;
