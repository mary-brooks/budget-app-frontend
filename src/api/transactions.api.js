import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

export const getAllTransactions = budgetId => {
  return axios.get(`${baseURL}/budgets/${budgetId}/transactions`);
};

export const getRecentTransactions = (budgetId, limit) => {
  return axios.get(
    `${baseURL}/budgets/${budgetId}/transactions?limit=${limit}`
  );
};

export const getTransaction = (budgetId, transactionId) => {
  return axios.get(
    `${baseURL}/budgets/${budgetId}/transactions/${transactionId}`
  );
};

export const addTransaction = (transaction, budgetId) => {
  return axios.post(`${baseURL}/budgets/${budgetId}/transactions`, transaction);
};

export const updateTransaction = (
  updatedTransaction,
  budgetId,
  transactionId
) => {
  return axios.put(
    `${baseURL}/budgets/${budgetId}/transactions/${transactionId}`,
    updatedTransaction
  );
};

export const deleteTransaction = (budgetId, transactionId) => {
  return axios.delete(
    `${baseURL}/budgets/${budgetId}/transactions/${transactionId}`
  );
};
