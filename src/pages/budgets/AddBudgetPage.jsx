import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addBudget } from '../../api/budgets.api';

import {
  Center,
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
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

function AddBudgetPage() {
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

  const navigate = useNavigate();

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
    } else if (endDate && new Date(startDate) > new Date(endDate)) {
      setStartDateError('Start date cannot be after the end date');
    } else {
      setStartDateError('');
    }
  };

  const handleEndDateBlur = () => {
    if (!endDate) {
      setEndDateError('End date is required');
    } else if (startDate && new Date(endDate) < new Date(startDate)) {
      setEndDateError('End date cannot be before the start date');
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

    // Check if start date is after end date
    if (new Date(startDate) > new Date(endDate)) {
      setStartDateError('Start date cannot be after the end date');
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
      await addBudget(requestBody);
      navigate('/budgets');
    } catch (error) {
      console.log('Error adding budget', error);
      setError(error.message);
    }
  };

  return (
    <>
      <Center p={2}>
        <Box
          maxW='100%'
          mt={4}
          mb={8}
          padding={4}
          borderWidth='1px'
          borderRadius='lg'
        >
          <Heading color='green.700' size='lg' textAlign='center' mb={2}>
            Add Budget
          </Heading>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} w='100%'>
              <FormControl isInvalid={!!nameError} isRequired>
                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                  Budget name:
                </FormLabel>
                <Input
                  size={{ base: 'sm', md: 'md' }}
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onBlur={handleNameBlur}
                />
                <FormErrorMessage>{nameError}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!startDateError} isRequired>
                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                  Start date:
                </FormLabel>
                <Input
                  size={{ base: 'sm', md: 'md' }}
                  type='date'
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  onBlur={handleStartDateBlur}
                />
                <FormErrorMessage>{startDateError}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!endDateError} isRequired>
                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                  End date:
                </FormLabel>
                <Input
                  size={{ base: 'sm', md: 'md' }}
                  type='date'
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  onBlur={handleEndDateBlur}
                />
                <FormErrorMessage>{endDateError}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!totalIncomeError} isRequired>
                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                  Total income:
                </FormLabel>
                <Input
                  size={{ base: 'sm', md: 'md' }}
                  type='number'
                  placeholder='0'
                  value={totalIncome}
                  onChange={e => setTotalIncome(e.target.value)}
                  onBlur={handleIncomeBlur}
                />
                <FormErrorMessage>{totalIncomeError}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!savingsGoalError} isRequired>
                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                  Savings goal:
                </FormLabel>
                <Input
                  size={{ base: 'sm', md: 'md' }}
                  type='number'
                  placeholder='0'
                  value={savingsGoal}
                  onChange={e => setSavingsGoal(e.target.value)}
                  onBlur={handleSavingsBlur}
                />
                <FormErrorMessage>{savingsGoalError}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                  Budget by spending category:
                </FormLabel>
                {categoryAllocation.map((item, index) => (
                  <Flex
                    key={index}
                    justify='flex-start'
                    align='center'
                    gap={2}
                    mb={2}
                    width='100%'
                  >
                    <Select
                      size={{ base: 'sm', md: 'md' }}
                      placeholder='Select Category'
                      width='65%'
                      value={item.name}
                      onChange={e =>
                        handleCategoryChange(index, e.target.value)
                      }
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
                      size={{ base: 'sm', md: 'md' }}
                      type='number'
                      placeholder='0'
                      width='15%'
                      value={item.amount}
                      onChange={e => handleAmountChange(index, e.target.value)}
                    />

                    {index === categoryAllocation.length - 1 && (
                      <IconButton
                        size={{ base: 'xs', sm: 'sm', md: 'md' }}
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
                <Button
                  type='submit'
                  colorScheme='green'
                  variant='solid'
                  size={{ base: 'sm', md: 'md' }}
                >
                  Add Budget
                </Button>
                <Link to='/budgets'>
                  <Button
                    colorScheme='green'
                    variant='outline'
                    size={{ base: 'sm', md: 'md' }}
                  >
                    Return to Budgets
                  </Button>
                </Link>
              </ButtonGroup>

              {error && <Text color='red.500'>{error}</Text>}
            </VStack>
          </form>
        </Box>
      </Center>
    </>
  );
}

export default AddBudgetPage;
