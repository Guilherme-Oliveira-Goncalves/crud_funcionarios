import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/funcionario",
});

export const fetchEmployees = () => api.get("/"); //simplificação das funções
export const createEmployee = (data) => api.post("/", data);
export const updateEmployee = (id, data) => api.put(`/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/${id}`);

export default api;

//conexao com o backend
