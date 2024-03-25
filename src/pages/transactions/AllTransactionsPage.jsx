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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Center,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

function AllTransactionsPage() {
  const { budgetId } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [searchVendor, setSearchVendor] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchAmount, setSearchAmount] = useState('');

  // State and logic for Add Transaction modal
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    setSelectedTransaction(null);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  // Helper function to format the date (DD/MM/YYYY)
  const formatDate = dateString => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  const handleVendorChange = e => {
    setSearchVendor(e.target.value);
  };

  const handleCategoryChange = e => {
    setSearchCategory(e.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const vendorMatch =
      !searchVendor ||
      transaction.vendor.toLowerCase().includes(searchVendor.toLowerCase());

    const categoryMatch =
      !searchCategory ||
      transaction.category.toLowerCase().includes(searchCategory.toLowerCase());

    return vendorMatch && categoryMatch;
  });

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
      <Heading size='2xl' color='green.900' textAlign='center' mt={4} mb={8}>
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
        <Box borderWidth='1px' borderRadius='lg' padding={6} width='60%' mb={6}>
          <Heading size='md' color='green.700' mb={6}>
            Search Transactions
          </Heading>
          <Flex width='100%' justify='space-between' bg='green.50' p={4}>
            <Box w='30%'>
              <Text fontSize='md' fontWeight='bold' mb={2}>
                By vendor:
              </Text>
              <Input
                type='text'
                placeholder='Search...'
                onChange={handleVendorChange}
              />
            </Box>
            <Box w='30%'>
              <Text fontSize='md' fontWeight='bold' mb={2}>
                By category:
              </Text>
              <Input
                type='text'
                placeholder='Search...'
                onChange={handleCategoryChange}
              />
            </Box>

            <Box w='20%'>
              <Text fontSize='md' fontWeight='bold' mb={2}>
                By date:
              </Text>
              <Input type='date' />
            </Box>

            <Box w='15%'>
              <Text fontSize='md' fontWeight='bold' mb={2}>
                By amount:
              </Text>
              <Input type='number' placeholder='0.00' />
            </Box>
          </Flex>
        </Box>

        <Box borderWidth='1px' borderRadius='lg' width='50%' p={6} mb={4}>
          <Flex justify='flex-end'>
            <Button colorScheme='green' variant='outline' mb={6}>
              Add Transaction
            </Button>
          </Flex>
          <VStack divider={<StackDivider />} spacing='4' mb={6} p={2}>
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
              filteredTransactions.map(transaction => {
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
                      <Box
                        p={2}
                        bg='green.100'
                        borderRadius='lg'
                        w='fit-content'
                      >
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
          <Center>
            <Link to={`/budgets/${budgetId}`}>
              <Button colorScheme='green' variant='solid'>
                Back to budget
              </Button>
            </Link>
          </Center>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          {!selectedTransaction && (
            <ModalHeader color='green.700'>Add Transaction</ModalHeader>
          )}
          {selectedTransaction && (
            <ModalHeader color='green.700'>Edit Transaction</ModalHeader>
          )}
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
