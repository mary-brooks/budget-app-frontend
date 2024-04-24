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
  InputGroup,
  InputLeftElement,
  Center,
} from '@chakra-ui/react';

import { FaEuroSign } from 'react-icons/fa';

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

  // Helper function to format the date to ISO format without time component (YYYY-MM-DD)
  const formatDateForDB = dateString => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate;
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

  const filteredTransactions = transactions.filter(transaction => {
    const vendorMatch =
      !searchVendor ||
      transaction.vendor.toLowerCase().includes(searchVendor.toLowerCase());

    const categoryMatch =
      !searchCategory ||
      transaction.category.toLowerCase().includes(searchCategory.toLowerCase());

    const dateMatch =
      !searchDate || transaction.date.includes(formatDateForDB(searchDate));

    const amountMatch =
      !searchAmount ||
      transaction.convertedAmount.toString().includes(searchAmount);

    return vendorMatch && categoryMatch && dateMatch && amountMatch;
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
      <Heading
        size={{ base: 'xl', md: '2xl' }}
        color='green.900'
        textAlign='center'
        mt={4}
        mb={{ base: 4, md: 6 }}
      >
        All Transactions
      </Heading>

      {!transactions && <p>Loading...</p>}

      <Flex
        justify='center'
        align='center'
        flexDirection='column'
        width='100%'
        gap={2}
        p={2}
      >
        <Box borderWidth='1px' borderRadius='lg' padding={6} mb={6} maxW='100%'>
          <Heading size='md' color='green.700' mb={6}>
            Search Transactions
          </Heading>
          <Flex
            width='100%'
            justify={{ base: 'flex-start', md: 'space-between' }}
            direction={{ base: 'column', md: 'row' }}
            bg='green.50'
            gap={2}
            p={4}
          >
            <Box w={{ base: '100%', md: '30%' }}>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight='bold'
                mb={2}
              >
                By vendor:
              </Text>
              <Input
                size={{ base: 'sm', md: 'md' }}
                type='text'
                placeholder='Search...'
                onChange={e => setSearchVendor(e.target.value)}
              />
            </Box>
            <Box w={{ base: '100%', md: '30%' }}>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight='bold'
                mb={2}
              >
                By category:
              </Text>
              <Input
                size={{ base: 'sm', md: 'md' }}
                type='text'
                placeholder='Search...'
                onChange={e => setSearchCategory(e.target.value)}
              />
            </Box>

            <Box w={{ base: '100%', md: '20%' }}>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight='bold'
                mb={2}
              >
                By date:
              </Text>
              <Input
                size={{ base: 'sm', md: 'md' }}
                type='date'
                onChange={e => setSearchDate(e.target.value)}
              />
            </Box>

            <Box w={{ base: '100%', md: '15%' }}>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight='bold'
                mb={2}
              >
                By amount:
              </Text>
              <InputGroup>
                <InputLeftElement pointerEvents='none' h='full'>
                  <FaEuroSign />
                </InputLeftElement>
                <Input
                  size={{ base: 'sm', md: 'md' }}
                  type='number'
                  placeholder='0.00'
                  onChange={e => setSearchAmount(e.target.value)}
                />
              </InputGroup>
            </Box>
          </Flex>
        </Box>

        <Box
          borderWidth='1px'
          borderRadius='lg'
          width={{ base: '100%', sm: '80%', md: '75%', lg: '60%', xl: '50%' }}
          p={{ base: 4, md: 6 }}
          mb={4}
        >
          <Flex justify={{ base: 'center', sm: 'flex-end' }}>
            <Button
              colorScheme='green'
              variant='outline'
              mb={6}
              size={{ base: 'sm', md: 'md' }}
              onClick={onOpen}
            >
              Add Transaction
            </Button>
          </Flex>
          <VStack divider={<StackDivider />} spacing='4' mb={6}>
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
                    wrap='wrap'
                    width='100%'
                    gap={2}
                  >
                    <Box w={{ base: '45%', sm: '30%' }}>
                      <Heading size={{ base: 'xs', md: 'sm' }} mb={2}>
                        {transaction.vendor}
                      </Heading>
                      <Box
                        p={{ base: 1, md: 2 }}
                        bg='green.100'
                        borderRadius='lg'
                        w='fit-content'
                      >
                        <Text fontSize={{ base: 'xs', md: 'sm' }}>
                          {transaction.category}
                        </Text>
                      </Box>
                    </Box>
                    <Box
                      w={{ base: '45%', sm: '30%' }}
                      textAlign={{ base: 'right', sm: 'left' }}
                    >
                      <Text
                        fontSize={{ base: 'sm', md: 'md' }}
                        fontWeight='bold'
                        mb={2}
                      >
                        {`€${transaction.convertedAmount}`}
                      </Text>
                      <Text
                        fontSize={{ base: 'xs', md: 'sm' }}
                      >{`on ${formatDate(transaction.date)}`}</Text>
                    </Box>
                    <Box
                      w={{ base: '100%', sm: '15%' }}
                      textAlign='center'
                      mt={{ base: 4, sm: 0 }}
                    >
                      <Button
                        colorScheme='green'
                        variant='ghost'
                        size={{ base: 'xs', md: 'sm' }}
                        onClick={() => handleEditTransaction(transaction)}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Flex>
                );
              })}

            {transactions && filteredTransactions.length === 0 && (
              <Flex w='100%' justify='center' align='center'>
                <Box p={2} bg='green.50' borderRadius='lg' w='fit-content'>
                  <Text fontSize='sm' fontStyle='italic'>
                    No transactions match the search criteria.
                  </Text>
                </Box>
              </Flex>
            )}
          </VStack>
          <Center>
            <Link to={`/budgets/${budgetId}`}>
              <Button
                colorScheme='green'
                variant='solid'
                size={{ base: 'sm', md: 'md' }}
              >
                Back to budget
              </Button>
            </Link>
          </Center>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
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
