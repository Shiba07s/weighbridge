import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:7070/api/v1/transporters';

export const listTransporters = () => axios.get(REST_API_BASE_URL);

export const createTransporter = (transporter) => axios.post(`${REST_API_BASE_URL}/create`, transporter);

export const getTransporter = (transporterId) => axios.get(`${REST_API_BASE_URL}/${transporterId}`);
