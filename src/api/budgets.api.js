import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    //retrieve the token from local storage
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  });
};

setAuthorizationHeaders();

export const getAllBudgets = () => {
  return axios.get(`${baseURL}/budgets`);
};

export const getBudget = budgetId => {
  return axios.get(`${baseURL}/budgets/${budgetId}`);
};

export const addBudget = budget => {
  return axios.post(`${baseURL}/budgets`, budget);
};

export const updateBudget = (updatedBudget, budgetId) => {
  return axios.put(`${baseURL}/budgets/${budgetId}`, updatedBudget);
};

export const deleteBudget = budgetId => {
  return axios.delete(`${baseURL}/budgets/${budgetId}`);
};
