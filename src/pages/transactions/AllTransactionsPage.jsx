import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getAllTransactions } from '../../api/transactions.api';
import TransactionForm from '../../components/TransactionForm';

import {
  Button,
  Box,
  Flex,
  VStack,
  Heading,
  StackDivider,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

function AllTransactionsPage() {
  const { budgetId } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Helper function to format the date
  const formatDate = dateString => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // State and logic for Add Transaction modal
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    setSelectedTransaction(null);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  // handler function for adding or updating a transaction
  const handleUpdateTransaction = async () => {
    try {
      const response = await getAllTransactions(budgetId);
      const sortedTransactions = response.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error('Error updating transaction', error);
    }

    onClose(); // Close the modal after adding a transaction
  };

  // Handler function for editing a transaction
  const handleEditTransaction = transaction => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  const getTransactions = async () => {
    try {
      const response = await getAllTransactions(budgetId);
      const sortedTransactions = response.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setTransactions(sortedTransactions);
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

      <Flex
        justify='center'
        align='center'
        flexDirection='column'
        width='100%'
        gap={2}
      >
        <Flex width='40%' justify='flex-end'>
          <IconButton
            aria-label='Add Category'
            icon={<AddIcon />}
            colorScheme='green'
            variant='outline'
            onClick={onOpen}
          />
        </Flex>

        <Flex></Flex>
        <VStack
          borderWidth='1px'
          borderRadius='lg'
          divider={<StackDivider />}
          spacing='4'
          width='40%'
          p={6}
          m={2}
        >
          {transactions.length === 0 && (
            <Flex w='100%' justify='center' align='center'>
              <Box p={2} bg='green.50' borderRadius='lg' w='fit-content'>
                <Text fontSize='sm' fontStyle='italic'>
                  Your transactions will appear here.
                </Text>
              </Box>
            </Flex>
          )}

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
                      {`€${transaction.convertedAmount}`}
                    </Text>
                    <Text fontSize='sm'>{`on ${formatDate(
                      transaction.date
                    )}`}</Text>
                  </Box>
                  <Box w='10%'>
                    <Button
                      colorScheme='green'
                      variant='ghost'
                      onClick={() => handleEditTransaction(transaction)}
                    >
                      Edit
                    </Button>
                  </Box>
                </Flex>
              );
            })}
        </VStack>
        <Link to={`/budgets/${budgetId}`}>
          <Button colorScheme='green' variant='solid' mb={6}>
            Back to budget
          </Button>
        </Link>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              <TransactionForm
                budgetId={budgetId}
                onClose={onClose}
                onUpdateTransaction={handleUpdateTransaction}
                selectedTransaction={selectedTransaction}
              />
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AllTransactionsPage;
