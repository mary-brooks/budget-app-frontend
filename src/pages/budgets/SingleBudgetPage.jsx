import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { getBudget } from '../../api/budgets.api';
import { useParams } from 'react-router-dom';

function SingleBudgetPage() {
  const { budgetId } = useParams();

  const [budget, setBudget] = useState();

  const getSingleBudget = async () => {
    try {
      const response = await getBudget(budgetId);
      console.log(response);
      setBudget(response.data);
    } catch (error) {
      console.log('Error retrieving budget', error.message);
    }
  };

  useEffect(() => {
    getSingleBudget();
  }, []);

  return (
    <>
      <div>SingleBudgetPage</div>
      {budget && (
        <Link to={`/budgets/update/${budget._id}`}>
          <Button colorScheme='green' variant='outline'>
            Edit Budget
          </Button>
        </Link>
      )}
    </>
  );
}

export default SingleBudgetPage;
