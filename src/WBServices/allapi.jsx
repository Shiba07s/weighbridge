import axios from "axios"; 

const Base_Url='http://localhost:8080/EMS/api/all-emp';

export const listEmployees=() => axios.get(Base_Url);
export const createEmployee=(employee)=>axios.post('http://localhost:8080/EMS/api/create-emp',employee);

export const getEmployee=(employeeId)=>axios.get('http://localhost:8080/EMS/api/get-emp'+"/"+employeeId);

export const updateEmployee=(employeeId,employee)=>axios.put("http://localhost:8080/EMS/api/update" + "/"+ employeeId,employee);


