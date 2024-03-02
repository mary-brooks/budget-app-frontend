import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

export const getAllBudgets = () => {
  return axios.get(`${baseURL}/budgets`);
};

export const getBudget = budgetId => {
  return axios.get(`${baseURL}/budgets/${budgetId}`);
};

export const addBudget = budget => {
  return axios.post(`${baseURL}/budgets`, budget);
};

export const updateBudget = updatedBudget => {
  return axios.put(`${baseURL}/budgets/${updatedBudget._id}`, updatedBudget);
};

export const deleteBudget = budgetId => {
  return axios.delete(`${baseURL}/budgets/${budgetId}}`);
};
