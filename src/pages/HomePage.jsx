import {
  Flex,
  Box,
  VStack,
  Center,
  Image,
  Text,
  Heading,
  Button,
} from '@chakra-ui/react';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import homePageImage from '../assets/home-page-img.png';

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Flex
        w='99%'
        h='82vh'
        m={2}
        align='center'
        justify='center'
        borderWidth='1px'
        borderRadius='lg'
      >
        <Flex justify='space-between' gap={2}>
          <Flex justify='center' align='center' w='35%' p={4} ml={6}>
            <Image src={homePageImage} />
          </Flex>
          <Center w='60%'>
            <VStack spacing={12} w='100%' p={4} mr={2}>
              <Heading color='green.700' size='3xl'>
                Welcome to
                <Box
                  p={4}
                  mx={4}
                  bg='green.100'
                  borderRadius='full'
                  w='fit-content'
                  display='inline'
                >
                  Budget Buddy
                </Box>
              </Heading>
              <Text fontSize='2xl' color='green.500' w='90%' fontWeight='bold'>
                A simple budgeting tool to help you effortlessly manage your
                money and transform your financial habits.
              </Text>
              {!isLoggedIn && (
                <Link to='/signup'>
                  <Button colorScheme='green' variant='solid' size='lg'>
                    Get Started
                  </Button>
                </Link>
              )}

              {isLoggedIn && (
                <Link to='/budgets'>
                  <Button colorScheme='green' variant='solid' size='lg'>
                    My Budgets
                  </Button>
                </Link>
              )}
            </VStack>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

export default HomePage;
