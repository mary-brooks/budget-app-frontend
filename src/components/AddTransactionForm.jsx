import { useState } from 'react';
import { addTransaction } from '../api/transactions.api';

import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';

function AddTransactionForm({ budgetId, onClose, onAddTransaction }) {
  const [vendor, setVendor] = useState('');
  const [vendorError, setVendorError] = useState('');

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');

  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const [error, setError] = useState(null);

  const handleVendorBlur = () => {
    if (!vendor || vendor.trim() === '') {
      setVendorError('Vendor is required');
    } else {
      setVendorError('');
    }
  };

  const handleAmountBlur = () => {
    if (!amount) {
      setAmountError('Amount is required');
    } else {
      setAmountError('');
    }
  };

  const handleDateBlur = () => {
    if (!date) {
      setDateError('Date is required');
    } else {
      setDateError('');
    }
  };

  const handleCategoryBlur = () => {
    if (!category || category === 'Select Category') {
      setCategoryError('Category is required');
    } else {
      setCategoryError('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Check for empty vendor
    if (!vendor) {
      setVendorError('Vendor is required');
      return;
    }

    // Check for empty date
    if (!date) {
      setDateError('Date is required');
      return;
    }

    // Check for empty category
    if (!category) {
      setCategoryError('Category is required');
      return;
    }

    // Check for empty amount
    if (!amount) {
      setAmountError('Amount is required');
      return;
    }

    // Clear any previous errors
    setVendorError('');
    setDateError('');
    setCategoryError('');
    setAmountError('');

    const requestBody = {
      amount,
      vendor,
      category,
      date,
    };

    try {
      await addTransaction(requestBody, budgetId);
      onAddTransaction();
    } catch (error) {
      console.log('Error adding transaction', error);
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!vendorError} isRequired>
            <FormLabel>Vendor:</FormLabel>
            <Input
              type='text'
              value={vendor}
              onChange={e => setVendor(e.target.value)}
              onBlur={handleVendorBlur}
            />
            <FormErrorMessage>{vendorError}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!dateError} isRequired>
            <FormLabel>Date:</FormLabel>
            <Input
              type='date'
              value={date}
              onChange={e => setDate(e.target.value)}
              onBlur={handleDateBlur}
            />
            <FormErrorMessage>{dateError}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!categoryError} isRequired>
            <FormLabel>Category:</FormLabel>
            <Select
              placeholder='Select Category'
              value={category}
              onChange={e => setCategory(e.target.value)}
              onBlur={handleCategoryBlur}
            >
              <option>Rent / Mortgage</option>
              <option>Bills</option>
              <option>Groceries</option>
              <option>Transport</option>
              <option>Restaurants</option>
              <option>Shopping</option>
              <option>Entertainment</option>
            </Select>
            <FormErrorMessage>{categoryError}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!amountError} isRequired>
            <FormLabel>Amount:</FormLabel>
            <Input
              type='number'
              placeholder='0'
              value={amount}
              onChange={e => setAmount(e.target.value)}
              onBlur={handleAmountBlur}
            />
            <FormErrorMessage>{amountError}</FormErrorMessage>
          </FormControl>

          <Button type='submit' colorScheme='green' variant='solid'>
            Add Transaction
          </Button>

          {error && <Text color='red.500'>{error}</Text>}
        </VStack>
      </form>
    </>
  );
}

export default AddTransactionForm;
