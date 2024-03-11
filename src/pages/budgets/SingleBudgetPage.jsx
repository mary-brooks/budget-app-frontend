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
  ModalFooter,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { getBudget } from '../../api/budgets.api';
import { getRecentTransactions } from '../../api/transactions.api';
import { useParams } from 'react-router-dom';

function SingleBudgetPage() {
  const { budgetId } = useParams();

  const [budget, setBudget] = useState();
  const [recentTransactions, setRecentTransactions] = useState([]);

  // State and logic for Add Transaction modal
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  // Helper function to format the date
  const formatDate = dateString => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  useEffect(() => {
    getSingleBudget();
    getLastThreeTransactions();
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

            <Box borderWidth='1px' borderRadius='lg' padding={4} width='40%'>
              <Heading size='lg' color='green.500' mb={6}>
                Budget Overview:
              </Heading>
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
              <Box bg='green.50' borderRadius='lg' p={4} m={2} mb={8}>
                <Progress colorScheme='green' size='md' value={20} mb={2} />
                <Text size='md'>€ of total budget remaining</Text>
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
                          value={30}
                          color='green.500'
                          thickness='15px'
                        />
                        <Box>
                          <Stat>
                            <StatLabel>{category.name}</StatLabel>
                            <StatNumber>€</StatNumber>
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
                    <Button colorScheme='green' variant='outline'>
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
              <VStack
                divider={<StackDivider />}
                spacing='4'
                align='flex-start'
                borderRadius='lg'
                p={4}
                m={2}
                mb={8}
              >
                {recentTransactions &&
                  recentTransactions.map(transaction => {
                    return (
                      <Flex justify='space-between' width='90%'>
                        <Box>
                          <Heading size='sm' mb={2}>
                            {transaction.vendor}
                          </Heading>
                          <Box p={2} bg='green.50' borderRadius='lg'>
                            <Text size='sm'>{transaction.category}</Text>
                          </Box>
                        </Box>
                        <Box>
                          <Text size='md' fontWeight='bold' mb={2}>
                            {`€${transaction.amount}`}
                          </Text>
                          <Text>{`on ${formatDate(transaction.date)}`}</Text>
                        </Box>
                      </Flex>
                    );
                  })}
              </VStack>
            </Box>
          </Flex>

          <Link to={`/budgets/update/${budget._id}`}>
            <Button colorScheme='green' variant='outline'>
              Edit Budget
            </Button>
          </Link>

          <Modal isOpen={isOpen} onClose={onClose} size='md'>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Transaction</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Your form component goes here */}
                {/* Example: <TransactionForm onClose={onClose} /> */}
              </ModalBody>
              <ModalFooter>
                {/* You can add footer buttons or actions here */}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}

export default SingleBudgetPage;
