import axios from "axios";

const REST_API_BASE_URL='http://localhost:7070/api/v1/suppliers';

//simplified version
// export const listSuppliers =() => axios.get(REST_API_BASE_URL);

export const listSuppliers = (pageNumber = 0, pageSize = 10, sortBy = 'supplierId', sortDir = 'asc') => {
    // Construct the query string
    const queryString = `?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
  
    // Make the API call
    return axios.get(`${REST_API_BASE_URL}${queryString}`);
  };

// export const listEmployees = () => {
//     return axios.get(REST_API_BASE_URL);
// }

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployee= (employeeId) => axios.get(REST_API_BASE_URL+ '/'+ employeeId);


 export const deleteSupplier = (supplierId) => axios.delete(REST_API_BASE_URL+ '/delete/'+ supplierId);
