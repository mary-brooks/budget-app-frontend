import { useState, useEffect, useContext } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';

import { getAllBudgets } from '../../api/budgets.api';
import { AuthContext } from '../../context/auth.context';

function AllBudgetsPage() {
  const { user } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);

  // Helper function to format the date
  const formatDate = dateString => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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

  return (
    <Flex align='center' direction='column' padding={4} m={2}>
      {user && (
        <Heading size='lg' color='green.500'>
          {user.name}'s Budgets
        </Heading>
      )}

      {budgets &&
        budgets.map(budget => {
          return (
            <div key={budget._id}>
              <Text>{budget.name}</Text>
              <Text>{`${formatDate(budget.startDate)} - ${formatDate(
                budget.endDate
              )}`}</Text>
              <Text>{`Total Income: ${budget.totalIncome}`}</Text>
              <Text>{`Savings Goal: ${budget.savingsGoal}`}</Text>
            </div>
          );
        })}
    </Flex>
  );
}

export default AllBudgetsPage;
