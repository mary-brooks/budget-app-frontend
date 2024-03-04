import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
  Button,
} from '@chakra-ui/react';

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
    <Flex align='center' direction='column'>
      {user && (
        <Heading size='2xl' mt={4} mb={6}>
          {user.name}'s Budgets
        </Heading>
      )}

      <Flex justify='space-around'>
        {budgets &&
          budgets.map(budget => {
            return (
              <Card
                key={budget._id}
                margin={2}
                variant='outline'
                size='lg'
                minW='20rem'
              >
                <CardHeader>
                  <Heading size='lg' color='green.500'>
                    {budget.name}
                  </Heading>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Flex justify='space-between'>
                      <Heading size='md' color='green.500'>
                        Date:
                      </Heading>
                      <Text fontSize='md' fontWeight='bold'>{`${formatDate(
                        budget.startDate
                      )} - ${formatDate(budget.endDate)}`}</Text>
                    </Flex>

                    <Flex justify='space-between'>
                      <Heading size='md' color='green.500'>
                        Total Income:
                      </Heading>
                      <Text fontSize='md' fontWeight='bold'>
                        {budget.totalIncome}
                      </Text>
                    </Flex>

                    <Flex justify='space-between'>
                      <Heading size='md' color='green.500'>
                        Savings Goal:
                      </Heading>
                      <Text fontSize='md' fontWeight='bold'>
                        {budget.savingsGoal}
                      </Text>
                    </Flex>
                  </Stack>
                </CardBody>

                <CardFooter>
                  <Link to={`/budgets/${budget._id}`}>
                    <Button colorScheme='green' variant='solid'>
                      View Budget
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
      </Flex>
    </Flex>
  );
}

export default AllBudgetsPage;
