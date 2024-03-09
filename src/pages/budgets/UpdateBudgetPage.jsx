import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getBudget, updateBudget, deleteBudget } from '../../api/budgets.api';

import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogOverlay,
  Heading,
  Box,
  Flex,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Button,
  IconButton,
  Text,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

function UpdateBudgetPage() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [startDate, setStartDate] = useState('');
  const [startDateError, setStartDateError] = useState('');

  const [endDate, setEndDate] = useState('');
  const [endDateError, setEndDateError] = useState('');

  const [totalIncome, setTotalIncome] = useState('');
  const [totalIncomeError, setTotalIncomeError] = useState('');

  const [savingsGoal, setSavingsGoal] = useState('');
  const [savingsGoalError, setSavingsGoalError] = useState('');

  const [categoryAllocation, setCategoryAllocation] = useState([
    { name: '', amount: '' },
  ]);

  const [error, setError] = useState(null);

  const { budgetId } = useParams();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleCategoryChange = (index, value) => {
    const newCategoryAllocation = [...categoryAllocation];
    newCategoryAllocation[index].name = value;
    setCategoryAllocation(newCategoryAllocation);
  };

  const handleAmountChange = (index, value) => {
    const newCategoryAllocation = [...categoryAllocation];
    newCategoryAllocation[index].amount = parseFloat(value) || 0;
    setCategoryAllocation(newCategoryAllocation);
  };

  const handleAddItem = () => {
    setCategoryAllocation([...categoryAllocation, { name: '', amount: '' }]);
  };

  const handleNameBlur = () => {
    if (!name || name.trim() === '') {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const handleStartDateBlur = () => {
    if (!startDate) {
      setStartDateError('Start date is required');
    } else {
      setStartDateError('');
    }
  };

  const handleEndDateBlur = () => {
    if (!endDate) {
      setEndDateError('End date is required');
    } else {
      setEndDateError('');
    }
  };

  const handleIncomeBlur = () => {
    if (!totalIncome) {
      setTotalIncomeError('Total income is required');
    } else {
      setTotalIncomeError('');
    }
  };

  const handleSavingsBlur = () => {
    if (!savingsGoal) {
      setSavingsGoalError('Savings goal is required');
    } else {
      setSavingsGoalError('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Check for empty name
    if (!name) {
      setNameError('Name is required');
      return;
    }

    // Check for empty start date
    if (!startDate) {
      setStartDateError('Start date is required');
      return;
    }

    // Check for empty end date
    if (!endDate) {
      setEndDateError('End date is required');
      return;
    }

    // Check for empty total income
    if (!totalIncome) {
      setTotalIncomeError('Total income is required');
      return;
    }

    // Check for empty savings goal
    if (!savingsGoal) {
      setSavingsGoalError('Savings goal is required');
      return;
    }

    // Clear any previous errors
    setNameError('');
    setStartDateError('');
    setEndDateError('');
    setTotalIncomeError('');
    setSavingsGoalError('');

    const requestBody = {
      name,
      startDate,
      endDate,
      totalIncome,
      savingsGoal,
      categoryAllocation,
    };

    try {
      await updateBudget(requestBody, budgetId);
      navigate(`/budgets/${budgetId}`);
    } catch (error) {
      console.log('Error updating budget', error.message);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBudget(budgetId);
      navigate('/budgets');
    } catch (error) {
      console.log('Error deleting budget', error.message);
      setError(error.message);
    }
  };

  const getSingleBudget = async () => {
    try {
      const response = await getBudget(budgetId);
      console.log(response);

      const budget = response.data;

      setName(budget.name);
      setStartDate(formatDate(budget.startDate));
      setEndDate(formatDate(budget.endDate));
      setTotalIncome(budget.totalIncome);
      setSavingsGoal(budget.savingsGoal);
      setCategoryAllocation(budget.categoryAllocation);
    } catch (error) {
      console.log('Error retrieving budget', error);
      setError(error);
    }
  };

  const formatDate = dateString => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate;
  };

  useEffect(() => {
    getSingleBudget();
  }, []);

  return (
    <>
      <Box
        maxW='lg'
        mt={4}
        mb={8}
        mx='auto'
        padding={4}
        borderWidth='1px'
        borderRadius='lg'
      >
        <Heading size='lg' textAlign='center' mb={2}>
          Edit Budget
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!nameError} isRequired>
              <FormLabel>Budget name:</FormLabel>
              <Input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={handleNameBlur}
              />
              <FormErrorMessage>{nameError}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!startDateError} isRequired>
              <FormLabel>Start date:</FormLabel>
              <Input
                type='date'
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                onBlur={handleStartDateBlur}
              />
              <FormErrorMessage>{startDateError}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!endDateError} isRequired>
              <FormLabel>End date:</FormLabel>
              <Input
                type='date'
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                onBlur={handleEndDateBlur}
              />
              <FormErrorMessage>{endDateError}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!totalIncomeError} isRequired>
              <FormLabel>Total income:</FormLabel>
              <Input
                type='number'
                placeholder='0'
                value={totalIncome}
                onChange={e => setTotalIncome(e.target.value)}
                onBlur={handleIncomeBlur}
              />
              <FormErrorMessage>{totalIncomeError}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!savingsGoalError} isRequired>
              <FormLabel>Savings goal:</FormLabel>
              <Input
                type='number'
                placeholder='0'
                value={savingsGoal}
                onChange={e => setSavingsGoal(e.target.value)}
                onBlur={handleSavingsBlur}
              />
              <FormErrorMessage>{savingsGoalError}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Budget by spending category:</FormLabel>
              {categoryAllocation.map((item, index) => (
                <Flex
                  key={index}
                  justify='flex-start'
                  gap={2}
                  mb={2}
                  width='100%'
                >
                  <Select
                    placeholder='Select Category'
                    width='65%'
                    value={item.name}
                    onChange={e => handleCategoryChange(index, e.target.value)}
                  >
                    <option>Rent / Mortgage</option>
                    <option>Bills</option>
                    <option>Groceries</option>
                    <option>Transport</option>
                    <option>Restaurants</option>
                    <option>Shopping</option>
                    <option>Entertainment</option>
                  </Select>

                  <Input
                    type='number'
                    placeholder='0'
                    width='20%'
                    value={item.amount}
                    onChange={e => handleAmountChange(index, e.target.value)}
                  />

                  {index === categoryAllocation.length - 1 && (
                    <IconButton
                      aria-label='Add Category'
                      icon={<AddIcon />}
                      onClick={handleAddItem}
                      colorScheme='green'
                      variant='ghost'
                    />
                  )}
                </Flex>
              ))}
            </FormControl>

            <ButtonGroup>
              <Button type='submit' colorScheme='green' variant='solid'>
                Update Budget
              </Button>

              <Button onClick={onOpen} colorScheme='green' variant='outline'>
                Delete Budget
              </Button>
            </ButtonGroup>

            <AlertDialog
              motionPreset='slideInBottom'
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>Discard budget?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  Are you sure you want to discard this budget? It will be
                  permenantly deleted.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={onClose}
                    colorScheme='green'
                    variant='outline'
                  >
                    No
                  </Button>
                  <Button
                    onClick={handleDelete}
                    colorScheme='green'
                    variant='solid'
                    ml={3}
                  >
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {error && <Text color='red.500'>{error}</Text>}
          </VStack>
        </form>
      </Box>
    </>
  );
}

export default UpdateBudgetPage;
