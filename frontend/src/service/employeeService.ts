
import axios from "axios";

const API_URL = "http://localhost:5000/employees";

export const createEmployee = async (data: any) => {
  const response = await axios.post(`${API_URL}/onboard`, data);
  return response.data;
};


export const getEmployee = async () => {
  const response = await axios.get(API_URL);
  return response.data;
}

export const getEmployeeId = async(id : number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export const DeleteEmployee = async(id :  number) => {
  const  response  =  await axios.delete(`${API_URL}/${id}`);
  return response.data;
}