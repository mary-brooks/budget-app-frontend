import { useState, useEffect } from 'react';

import { getAllBudgets } from '../../api/budgets.api';

function AllBudgetsPage() {
  const [budgets, setBudgets] = useState([]);

  const getBudgets = async () => {
    try {
      const response = await getAllBudgets();
      console.log(response);
      setBudgets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);

  return <div>AllBudgetsPage</div>;
}

export default AllBudgetsPage;
