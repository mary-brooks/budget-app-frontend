import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllTransactions } from '../../api/transactions.api';

import {
  Button,
  Box,
  Flex,
  VStack,
  Heading,
  StackDivider,
  Text,
} from '@chakra-ui/react';

function AllTransactionsPage() {
  const { budgetId } = useParams();

  const [transactions, setTransactions] = useState([]);

  // Helper function to format the date
  const formatDate = dateString => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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

  return (
    <>
      <Heading size='2xl' color='green.500' textAlign='center' m={4}>
        All Transactions
      </Heading>

      {!transactions && <p>Loading...</p>}

      <Flex justify='center' align='center' width='100%'>
        <VStack
          borderWidth='1px'
          borderRadius='lg'
          divider={<StackDivider />}
          spacing='4'
          width='40%'
          p={6}
          m={2}
        >
          {transactions &&
            transactions.map(transaction => {
              return (
                <Flex
                  key={transaction._id}
                  justify='space-between'
                  width='100%'
                >
                  <Box w='30%'>
                    <Heading size='sm' mb={2}>
                      {transaction.vendor}
                    </Heading>
                    <Box p={2} bg='green.50' borderRadius='lg' w='fit-content'>
                      <Text fontSize='sm'>{transaction.category}</Text>
                    </Box>
                  </Box>
                  <Box w='30%'>
                    <Text fontSize='md' fontWeight='bold' mb={2}>
                      {`€${transaction.amount}`}
                    </Text>
                    <Text fontSize='sm'>{`on ${formatDate(
                      transaction.date
                    )}`}</Text>
                  </Box>
                  <Box w='10%'>
                    <Button
                      colorScheme='green'
                      variant='ghost'
                      // onClick={() => handleEditTransaction(transaction)}
                    >
                      Edit
                    </Button>
                  </Box>
                </Flex>
              );
            })}
        </VStack>
      </Flex>
    </>
  );
}

export default AllTransactionsPage;
