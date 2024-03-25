import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';

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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);

  const { storeToken, authenticateUser } = useContext(AuthContext);

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

    // Clear any previous errors
    setEmailError(null);
    setPasswordError(null);
    setError(null);

    const user = { email, password };

    try {
      // login response with the jwt token
      const response = await login(user);
      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (error) {
      console.log('Error logging in', error);
      setError(error.response?.data?.message || 'An error occurred');
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
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!emailError}>
              <FormLabel>Email</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!passwordError}>
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
              Login
            </Button>
          </VStack>
        </form>
      </Box>

      <VStack spacing={4}>
        {error && <Text color='red.500'>{error}</Text>}

        <Text>Don't have an account yet?</Text>
        <Link to={'/signup'}>
          <Button colorScheme='green' variant='outline'>
            Sign up
          </Button>
        </Link>
      </VStack>
    </>
  );
}

export default Login;
