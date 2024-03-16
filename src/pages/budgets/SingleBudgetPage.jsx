import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Button,
  IconButton,
  ButtonGroup,
  Box,
  Flex,
  VStack,
  Heading,
  StackDivider,
  Text,
  Stat,
  StatNumber,
  StatLabel,
  StatHelpText,
  CircularProgress,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { getBudget } from '../../api/budgets.api';
import {
  getRecentTransactions,
  getAllTransactions,
} from '../../api/transactions.api';
import TransactionForm from '../../components/TransactionForm';
import { useParams } from 'react-router-dom';

function SingleBudgetPage() {
  const { budgetId } = useParams();

  const [budget, setBudget] = useState();
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // State and logic for Add Transaction modal
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    setSelectedTransaction(null);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  // Helper function to format the date
  const formatDate = dateString => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to calculate total spending
  const totalSpent = allTransactions => {
    if (!budget || !transactions) return 0;

    return allTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
  };

  // Helper function to filter transactions by category
  const transactionsByCategory = category => {
    return transactions.filter(transaction => {
      return transaction.category === category;
    });
  };

  // handler function for adding or updating a transaction
  const handleUpdateTransaction = async () => {
    try {
      const response = await getRecentTransactions(budgetId, 3);
      setRecentTransactions(response.data);

      // Fetch updated budget data
      const updatedBudget = await getBudget(budgetId);
      setBudget(updatedBudget.data);

      // Fetch all transactions
      const updatedTransactions = await getAllTransactions(budgetId);
      setTransactions(updatedTransactions.data);
    } catch (error) {
      console.error('Error fetching recent transactions', error);
    }

    onClose(); // Close the modal after adding a transaction
  };

  // Handler function for editing a transaction
  const handleEditTransaction = transaction => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  const getSingleBudget = async () => {
    try {
      const response = await getBudget(budgetId);
      console.log(response);
      setBudget(response.data);
    } catch (error) {
      console.log('Error retrieving budget', error);
    }
  };

  const getLastThreeTransactions = async () => {
    try {
      const response = await getRecentTransactions(budgetId, 3);
      console.log(response);
      setRecentTransactions(response.data);
    } catch (error) {
      console.log('Error retrieving 3 most recent transactions', error);
    }
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
    getSingleBudget();
    getLastThreeTransactions();
    getTransactions();
  }, []);

  return (
    <>
      {budget && (
        <>
          <Heading size='2xl' color='green.500' textAlign='center' m={4}>
            {budget.name}
          </Heading>

          <Flex justify='space-around' p={4} mb={4} width='100%'>
            <VStack borderWidth='1px' borderRadius='lg' padding={4} width='40%'>
              <Heading size='xl' color='green.500'>
                Spending
              </Heading>
            </VStack>

            <Box borderWidth='1px' borderRadius='lg' padding={6} width='40%'>
              <Flex width='100%' justify='space-between' mb={4}>
                <Heading size='lg' color='green.500'>
                  Budget Overview:
                </Heading>
                <Link to={`/budgets/update/${budget._id}`}>
                  <Button colorScheme='green' variant='outline'>
                    Edit Budget
                  </Button>
                </Link>
              </Flex>

              <VStack
                divider={<StackDivider />}
                spacing='4'
                align='flex-start'
                bg='green.50'
                borderRadius='lg'
                p={4}
                m={2}
                mb={8}
              >
                <Flex justify='space-between' width='100%'>
                  <Heading size='md' color='green.500'>
                    Date:
                  </Heading>
                  <Text fontSize='md' fontWeight='bold' pt={2}>{`${formatDate(
                    budget.startDate
                  )} - ${formatDate(budget.endDate)}`}</Text>
                </Flex>

                <Flex justify='space-between' width='100%'>
                  <Heading size='md' color='green.500'>
                    Total Income:
                  </Heading>
                  <Text fontSize='md' fontWeight='bold' pt={2}>
                    {`€${budget.totalIncome}`}
                  </Text>
                </Flex>

                <Flex justify='space-between' width='100%'>
                  <Heading size='md' color='green.500'>
                    Savings Goal:
                  </Heading>
                  <Text fontSize='md' fontWeight='bold' pt={2}>
                    {`€${budget.savingsGoal}`}
                  </Text>
                </Flex>
              </VStack>

              <Heading size='lg' color='green.500' mb={6}>
                Total spending:
              </Heading>
              <Box bg='green.50' borderRadius='lg' p={4} m={2}>
                <Progress
                  colorScheme='green'
                  size='md'
                  value={(totalSpent(transactions) / budget.totalIncome) * 100}
                  mb={2}
                />
                <Text fontSize='md'>{`€${totalSpent(
                  transactions
                )} spent`}</Text>
              </Box>
              <Box p={4} m={2} mb={8}>
                <Text fontSize='md'>{`€${
                  budget.totalIncome - totalSpent(transactions)
                } of total budget remaining`}</Text>
                <Text>{`Spend less than €${
                  budget.totalIncome -
                  totalSpent(transactions) -
                  budget.savingsGoal
                } to meet your savings goal`}</Text>
              </Box>

              <VStack width='100%' align='flex-start' spacing='4' mb={4}>
                <Heading size='lg' color='green.500'>
                  Spending by category:
                </Heading>
                <Flex width='100%' justify='space-between' wrap='wrap'>
                  {budget.categoryAllocation.map(category => {
                    return (
                      <Flex
                        key={category.name}
                        width='45%'
                        bg='green.50'
                        borderRadius='lg'
                        p={4}
                        m={2}
                        justify='space-around'
                        alignItems='center'
                      >
                        <CircularProgress
                          value={
                            (totalSpent(transactionsByCategory(category.name)) /
                              category.amount) *
                            100
                          }
                          color='green.500'
                          thickness='15px'
                        />

                        <Box>
                          <Stat>
                            <StatLabel>{category.name}</StatLabel>
                            <StatNumber>{`€${
                              category.amount -
                              totalSpent(transactionsByCategory(category.name))
                            }`}</StatNumber>
                            <StatHelpText>{`remaining of €${category.amount}`}</StatHelpText>
                          </Stat>
                        </Box>
                      </Flex>
                    );
                  })}
                </Flex>
              </VStack>

              <Flex width='100%' justify='space-between' mb={4}>
                <Heading size='lg' color='green.500'>
                  Transactions:
                </Heading>

                <ButtonGroup>
                  <Link to={`/budgets/${budget._id}/transactions`}>
                    <Button colorScheme='green' variant='solid'>
                      View all
                    </Button>
                  </Link>
                  <IconButton
                    aria-label='Add Category'
                    icon={<AddIcon />}
                    colorScheme='green'
                    variant='outline'
                    onClick={onOpen}
                  />
                </ButtonGroup>
              </Flex>

              <Flex w='100%' justify='center' align='center'>
                {recentTransactions.length === 0 && (
                  <Box
                    mt={6}
                    p={2}
                    bg='green.50'
                    borderRadius='lg'
                    w='fit-content'
                  >
                    <Text fontSize='sm' fontStyle='italic'>
                      Your transactions will appear here.
                    </Text>
                  </Box>
                )}
              </Flex>

              <VStack
                divider={<StackDivider />}
                spacing='4'
                align='flex-start'
                borderRadius='lg'
                p={2}
                m={2}
              >
                {recentTransactions &&
                  recentTransactions.map(transaction => {
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
                            bg='green.50'
                            borderRadius='lg'
                            w='fit-content'
                          >
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
                            onClick={() => handleEditTransaction(transaction)}
                          >
                            Edit
                          </Button>
                        </Box>
                      </Flex>
                    );
                  })}
              </VStack>
            </Box>
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
      )}
    </>
  );
}

export default SingleBudgetPage;
