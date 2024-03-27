import {
  Flex,
  Box,
  Center,
  Image,
  Text,
  Heading,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import homePageImage from '../assets/home-page-img.png';

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Box h='85vh'>
        <Flex
          w='99%'
          h='90%'
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
              <Flex
                gap={12}
                justify='center'
                flexDirection='column'
                w='100%'
                p={6}
                mr={2}
              >
                <Heading color='green.700' size='3xl'>
                  Welcome to
                  <Box
                    p={4}
                    mx={4}
                    bg='green.100'
                    borderRadius='full'
                    w='fit-content'
                    h='fit-content'
                    display='inline'
                  >
                    Budget Buddy
                  </Box>
                </Heading>
                <Text
                  w='90%'
                  fontSize='2xl'
                  color='green.500'
                  fontWeight='bold'
                >
                  A simple budgeting tool to help you effortlessly manage your
                  money and transform your financial habits.
                </Text>
                {!isLoggedIn && (
                  <Center>
                    <Link to='/signup'>
                      <Button
                        colorScheme='green'
                        variant='solid'
                        size='lg'
                        alignSelf='center'
                      >
                        Get Started
                      </Button>
                    </Link>
                  </Center>
                )}

                {isLoggedIn && (
                  <Center>
                    <Link to='/budgets'>
                      <Button colorScheme='green' variant='solid' size='lg'>
                        My Budgets
                      </Button>
                    </Link>
                  </Center>
                )}
              </Flex>
            </Center>
          </Flex>
        </Flex>
        <Flex justify='space-between' m={2} w='99%' h='10%'>
          <Center
            bg='green.700'
            p={4}
            w='50%'
            borderTopLeftRadius='lg'
            borderBottomLeftRadius='lg'
          >
            <Text
              fontSize='md'
              fontWeight='bold'
              color='white'
              textAlign='center'
            >
              Made by Mary Brooks as part of the Web Development bootcamp at
              Ironhack, Lisbon.
            </Text>
          </Center>

          <Center
            bg='green.500'
            p={4}
            w='50%'
            borderTopRightRadius='lg'
            borderBottomRightRadius='lg'
          >
            <Flex justify='space-between' gap={4} w='fit-content'>
              <Text fontSize='md' fontWeight='bold' color='white' pt={2}>
                Find Mary on LinkedIn & GitHub
              </Text>
              <Flex justify='space-between' gap={2} w='fit-content'>
                <a
                  href='https://www.linkedin.com/in/mary-emma-brooks-junior-fullstack-developer/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Icon as={FaLinkedin} boxSize={8} />
                </a>
                <a
                  href='https://github.com/mary-brooks'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Icon as={FaGithub} boxSize={8} />
                </a>
              </Flex>
            </Flex>
          </Center>
        </Flex>
      </Box>
    </>
  );
}

export default HomePage;
