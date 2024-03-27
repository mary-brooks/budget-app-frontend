import { Flex, ButtonGroup, Button, Heading, Box } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <Flex
      align='center'
      justify='space-between'
      p={2}
      borderWidth='1px'
      borderRadius='lg'
      m={2}
      h='fit-content'
    >
      <Link to='/'>
        <Box p={4} bg='green.100' borderRadius='full' w='fit-content'>
          <Heading size='md'>Budget Buddy</Heading>
        </Box>
      </Link>

      <ButtonGroup>
        {!isLoggedIn && (
          <>
            <Link to='/login'>
              <Button colorScheme='green' variant='solid'>
                Login
              </Button>
            </Link>
            <Link to='/signup'>
              <Button colorScheme='green' variant='outline'>
                Sign up
              </Button>
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to='/budgets'>
              <Button colorScheme='green' variant='solid'>
                Budgets
              </Button>
            </Link>

            <Link to='/'>
              <Button
                colorScheme='green'
                variant='outline'
                onClick={logOutUser}
              >
                Log out
              </Button>
            </Link>
          </>
        )}
      </ButtonGroup>
    </Flex>
  );
}

export default Navbar;
