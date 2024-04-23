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
  const [error, setError] = useState(null);

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
      console.log('Error retrieving budgets', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);

  return (
    <>
      <Flex
        direction='column'
        justify='center'
        align='center'
        gap={{ base: 4, md: 6 }}
      >
        {user && (
          <Heading
            size={{ base: 'xl', md: '2xl' }}
            mt={6}
            mb={4}
            color='green.800'
          >
            {user.name}'s Budgets
          </Heading>
        )}

        <Flex justify='space-evenly' wrap='wrap'>
          {budgets &&
            budgets.map(budget => {
              return (
                <Card key={budget._id} margin={2} variant='outline' size='lg'>
                  <CardHeader p={{ base: 4, md: 6 }}>
                    <Heading size={{ base: 'md', md: 'lg' }} color='green.700'>
                      {budget.name}
                    </Heading>
                  </CardHeader>

                  <CardBody p={{ base: 4, md: 6 }}>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Flex justify='space-between'>
                        <Heading
                          size={{ base: 'sm', md: 'md' }}
                          color='green.500'
                          mr={1}
                        >
                          Date:
                        </Heading>
                        <Text
                          fontSize={{ base: 'sm', md: 'md' }}
                          fontWeight='bold'
                        >{`${formatDate(budget.startDate)} - ${formatDate(
                          budget.endDate
                        )}`}</Text>
                      </Flex>

                      <Flex justify='space-between'>
                        <Heading
                          size={{ base: 'sm', md: 'md' }}
                          color='green.500'
                          mr={1}
                        >
                          Total Income:
                        </Heading>
                        <Text
                          fontSize={{ base: 'sm', md: 'md' }}
                          fontWeight='bold'
                        >
                          {budget.totalIncome}
                        </Text>
                      </Flex>

                      <Flex justify='space-between'>
                        <Heading
                          size={{ base: 'sm', md: 'md' }}
                          color='green.500'
                          mr={1}
                        >
                          Savings Goal:
                        </Heading>
                        <Text
                          fontSize={{ base: 'sm', md: 'md' }}
                          fontWeight='bold'
                        >
                          {budget.savingsGoal}
                        </Text>
                      </Flex>
                    </Stack>
                  </CardBody>

                  <CardFooter p={{ base: 4, md: 6 }}>
                    <Link to={`/budgets/${budget._id}`}>
                      <Button
                        colorScheme='green'
                        variant='solid'
                        size={{ base: 'sm', md: 'md' }}
                      >
                        View Budget
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
        </Flex>

        <Link to='/budgets/add'>
          <Button
            colorScheme='green'
            variant='outline'
            size={{ base: 'sm', md: 'md' }}
            mb={4}
          >
            Add Budget
          </Button>
        </Link>

        {error && (
          <Text color='red.500' mb={4}>
            {error}
          </Text>
        )}
      </Flex>
    </>
  );
}

export default AllBudgetsPage;
