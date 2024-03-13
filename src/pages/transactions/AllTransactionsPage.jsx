import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllTransactions } from '../../api/transactions.api';

function AllTransactionsPage() {
  const { budgetId } = useParams();

  const [transactions, setTransactions] = useState('');

  const getTransactions = async () => {
    try {
      const response = await getAllTransactions(budgetId);
      console.log(response);
      setTransactions(response.data);
    } catch (error) {
      console.log('Error retrieving transactions', error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return <div></div>;
}

export default AllTransactionsPage;
