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
        <Box
          p={{ base: 2, md: 4 }}
          bg='green.100'
          borderRadius='full'
          w='fit-content'
        >
          <Heading size={{ base: 'xs', md: 'md' }}>Budget Buddy</Heading>
        </Box>
      </Link>

      <ButtonGroup>
        {!isLoggedIn && (
          <>
            <Link to='/login'>
              <Button
                colorScheme='green'
                variant='solid'
                size={{ base: 'xs', sm: 'sm', md: 'md' }}
              >
                Login
              </Button>
            </Link>
            <Link to='/signup'>
              <Button
                colorScheme='green'
                variant='outline'
                size={{ base: 'xs', sm: 'sm', md: 'md' }}
              >
                Sign up
              </Button>
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to='/budgets'>
              <Button
                colorScheme='green'
                variant='solid'
                size={{ base: 'xs', sm: 'sm', md: 'md' }}
              >
                Budgets
              </Button>
            </Link>

            <Link to='/'>
              <Button
                colorScheme='green'
                variant='outline'
                onClick={logOutUser}
                size={{ base: 'xs', sm: 'sm', md: 'md' }}
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
