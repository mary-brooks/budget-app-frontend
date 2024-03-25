import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';

import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError('Email is required');
    } else {
      setEmailError(null);
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError(null);
    }
  };

  const handleNameBlur = () => {
    if (!name) {
      setNameError('Name is required');
    } else {
      setNameError(null);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Check for empty email
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    // Check for empty password
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    // Check for empty name
    if (!name) {
      setNameError('Name is required');
      return;
    }

    // Clear any previous errors
    setEmailError(null);
    setPasswordError(null);
    setNameError(null);
    setError(null);

    const user = { email, password, name };

    try {
      await signup(user);
      navigate('/login');
    } catch (error) {
      console.log('Error signing up', error);
      setError(error.response.data.message);
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
        <Heading size='lg' color='green.700' textAlign='center' mb={2}>
          Sign up
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!nameError} isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={handleNameBlur}
              />
              <FormErrorMessage>{nameError}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!emailError} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!passwordError} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
              />
              <FormErrorMessage>{passwordError}</FormErrorMessage>
            </FormControl>

            <Button type='submit' colorScheme='green' variant='solid'>
              Sign up
            </Button>
          </VStack>
        </form>
      </Box>

      <VStack spacing={4}>
        {error && <Text color='red.500'>{error}</Text>}

        <Text>Already have an account?</Text>
        <Link to={'/login'}>
          <Button colorScheme='green' variant='outline'>
            Login
          </Button>
        </Link>
      </VStack>
    </>
  );
}

export default Signup;
