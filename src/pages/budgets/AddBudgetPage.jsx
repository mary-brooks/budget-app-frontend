import { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

import {
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
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

function AddBudgetPage() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [startDateError, setStartDateError] = useState(null);

  const [endDate, setEndDate] = useState(null);
  const [endDateError, setEndDateError] = useState(null);

  const [totalIncome, setTotalIncome] = useState(null);
  const [totalIncomeError, setTotalIncomeError] = useState(null);

  const [savingsGoal, setSavingsGoal] = useState(null);
  const [savingsGoalError, setSavingsGoalError] = useState(null);

  const [categoryAllocation, setCategoryAllocation] = useState([
    { name: '', amount: '' },
  ]);

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
    if (!name) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const handleStartDateBlur = () => {
    if (!startDate) {
      setStartDateError('Start date is required');
    } else {
      setStartDateError(null);
    }
  };

  const handleEndDateBlur = () => {
    if (!endDate) {
      setEndDateError('End date is required');
    } else {
      setEndDateError(null);
    }
  };

  const handleIncomeBlur = () => {
    if (!totalIncome) {
      setTotalIncomeError('Total income is required');
    } else {
      setTotalIncomeError(null);
    }
  };

  const handleSavingsBlur = () => {
    if (!totalIncome) {
      setSavingsGoalError('Savings goal is required');
    } else {
      setSavingsGoalError(null);
    }
  };

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
          Add Budget
        </Heading>

        <form>
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

            <Button type='submit' colorScheme='green' variant='solid'>
              Add Budget
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
}

export default AddBudgetPage;
