import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../api/transactions.api';

import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Button,
  ButtonGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Checkbox,
} from '@chakra-ui/react';

function TransactionForm({
  budgetId,
  onUpdateTransaction,
  selectedTransaction,
}) {
  const CURRENCY_API_KEY = `${import.meta.env.VITE_CURRENCY_API_KEY}`;

  const [vendor, setVendor] = useState('');
  const [vendorError, setVendorError] = useState('');

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  const [convertedAmount, setConvertedAmount] = useState('');

  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');

  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');

  const [currency, setCurrency] = useState('EUR');
  const [isTransactionAbroad, setIsTransactionAbroad] = useState(false);

  const [error, setError] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

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
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

      if (selectedDate > today) {
        setDateError('Selected date cannot be in the future');
      } else {
        setDateError('');
      }
    }
  };

  const handleCategoryBlur = () => {
    if (!category || category === 'Select Category') {
      setCategoryError('Category is required');
    } else {
      setCategoryError('');
    }
  };

  // Helper function to format the date to ISO format without time component (YYYY-MM-DD)
  const formatDate = dateString => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString().split('T')[0];
    return formattedDate;
  };

  // If there is a selected transaction, populate form fields with it's details
  useEffect(() => {
    if (selectedTransaction) {
      setVendor(selectedTransaction.vendor || '');
      setAmount(selectedTransaction.amount || '');
      setDate(formatDate(selectedTransaction.date) || '');
      setCategory(selectedTransaction.category || '');

      if (selectedTransaction.currency !== 'EUR') {
        setIsTransactionAbroad(true);
        setCurrency(selectedTransaction.currency);
      } else {
        setIsTransactionAbroad(false);
      }
    }
  }, [selectedTransaction]);

  // Handle changes related to amount, currency, and transaction type
  useEffect(() => {
    if (isTransactionAbroad) {
      getConversion();
    } else {
      setConvertedAmount(amount);
    }
  }, [amount, currency, isTransactionAbroad, date]);

  // Log changes in isTransactionAbroad
  useEffect(() => {
    console.log('isTransactionAbroad:', isTransactionAbroad);
  }, [isTransactionAbroad]);

  const handleSubmit = async e => {
    e.preventDefault();

    // Check for empty vendor
    if (!vendor) {
      setVendorError('Vendor is required');
      return;
    }

    // Check for empty date
    if (!date || dateError) {
      setDateError('Valid date is required');
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
      convertedAmount,
      currency,
      vendor,
      category,
      date,
    };

    try {
      if (selectedTransaction) {
        await updateTransaction(requestBody, budgetId, selectedTransaction._id);
      } else {
        await addTransaction(requestBody, budgetId);
      }

      onUpdateTransaction();
    } catch (error) {
      console.log('Error handling transaction', error);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    setShowDeleteAlert(true); // Show delete alert
  };

  const confirmDelete = async () => {
    try {
      await deleteTransaction(budgetId, selectedTransaction._id);
      onUpdateTransaction();
    } catch (error) {
      console.log('Error deleting transaction', error);
      setError(error.message);
    }
  };

  const getConversion = async () => {
    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

      // Check if the selected date is today's date
      const isToday = date === currentDate;

      let endpoint = '';

      if (isToday) {
        endpoint = 'https://api.freecurrencyapi.com/v1/latest'; // Endpoint for today's date
      } else {
        endpoint = 'https://api.freecurrencyapi.com/v1/historical'; // Endpoint for other dates
      }

      const params = {
        apikey: CURRENCY_API_KEY,
        base_currency: 'EUR',
        currencies: currency,
      };

      // If historical, add date parameter
      if (!isToday) {
        params.date = date;
      }

      const response = await axios.get(endpoint, {
        params: params,
      });

      // Extract conversion rate from the response based on the selected currency
      let conversionRate;

      if (isToday) {
        conversionRate = response.data.data[currency];
      } else {
        conversionRate =
          response.data.data[date] && response.data.data[date][currency];
      }

      if (typeof conversionRate !== 'undefined') {
        // Divide user's inputted amount by the conversion rate and update the state
        const convertedAmountValue = (amount / conversionRate).toFixed(2);
        setConvertedAmount(convertedAmountValue);
      } else {
        console.log('Conversion rate not available');
      }
    } catch (error) {
      console.log(error);
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
              onChange={e => setDate(formatDate(e.target.value))}
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

          {!selectedTransaction && (
            <FormControl>
              <Checkbox
                colorScheme='green'
                checked={isTransactionAbroad}
                onChange={() => setIsTransactionAbroad(!isTransactionAbroad)}
              >
                Transaction abroad
              </Checkbox>
            </FormControl>
          )}

          {isTransactionAbroad && (
            <>
              <FormControl>
                <FormLabel>Currency:</FormLabel>
                <Select
                  placeholder='EUR'
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                >
                  <option>GBP</option>
                  <option>CHF</option>
                  <option>USD</option>
                  <option>CAD</option>
                  <option>AUD</option>
                  <option>NZD</option>
                  <option>JYP</option>
                  <option>HKD</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Amount in Euros:</FormLabel>
                <Input
                  type='number'
                  placeholder='0'
                  value={convertedAmount}
                  readOnly
                />
              </FormControl>
            </>
          )}

          {selectedTransaction && (
            <ButtonGroup mb={6}>
              <Button type='submit' colorScheme='green' variant='solid'>
                Update Transaction
              </Button>
              <Button
                colorScheme='green'
                variant='outline'
                onClick={handleDelete}
              >
                Delete
              </Button>
            </ButtonGroup>
          )}

          {!selectedTransaction && (
            <Button
              type='submit'
              colorScheme='green'
              variant='solid'
              m={2}
              mb={6}
            >
              Add Transaction
            </Button>
          )}

          {error && <Alert status='error'>{error}</Alert>}

          {/* Delete confirmation alert */}
          {showDeleteAlert && (
            <Alert
              status='warning'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              gap={2}
            >
              <AlertIcon />
              <AlertTitle>
                Are you sure you want to delete this transaction?
              </AlertTitle>
              <AlertDescription>This action cannot be undone.</AlertDescription>
              <ButtonGroup>
                <Button colorScheme='red' size='sm' onClick={confirmDelete}>
                  Delete
                </Button>
                <Button
                  colorScheme='gray'
                  size='sm'
                  onClick={() => setShowDeleteAlert(false)}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Alert>
          )}
        </VStack>
      </form>
    </>
  );
}

export default TransactionForm;
