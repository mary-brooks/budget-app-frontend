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
      <Box h='fit-content'>
        <Flex
          m={2}
          align='center'
          justify='center'
          borderWidth='1px'
          borderRadius='lg'
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify={{ md: 'space-between' }}
            align={{ base: 'center' }}
            gap={2}
          >
            <Flex
              justify='center'
              align='center'
              w={{ base: '80%', sm: '60%', md: '35%' }}
              p={4}
              ml={{ base: 0, md: 6 }}
            >
              <Image src={homePageImage} />
            </Flex>
            <Center w={{ base: '100%', md: '60%' }}>
              <Flex
                gap={{ base: 4, lg: 10 }}
                justify='center'
                align='center'
                flexDirection='column'
                w='100%'
                p={{ base: 4, md: 6 }}
                mr={{ md: 2 }}
              >
                <Heading
                  color='green.700'
                  size={{
                    base: 'md',
                    md: 'lg',
                    lg: 'xl',
                    xl: '2xl',
                    '2xl': '3xl',
                  }}
                  textAlign='center'
                >
                  Welcome to
                  <Box
                    p={{ base: 2, md: 4 }}
                    mx={{ base: 2, md: 4 }}
                    my={2}
                    bg='green.100'
                    borderRadius='full'
                    w='fit-content'
                    h='fit-content'
                    display='inline-block'
                  >
                    Budget Buddy
                  </Box>
                </Heading>
                <Text
                  w={{ sm: '70%', md: '90%' }}
                  fontSize={{
                    base: 'sm',
                    md: 'md',
                    lg: 'lg',
                    xl: 'xl',
                    '2xl': '2xl',
                  }}
                  color='green.500'
                  fontWeight='bold'
                  textAlign='center'
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
                        size={{ base: 'sm', md: 'md' }}
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
                      <Button
                        colorScheme='green'
                        variant='solid'
                        size={{ base: 'sm', md: 'md' }}
                      >
                        My Budgets
                      </Button>
                    </Link>
                  </Center>
                )}
              </Flex>
            </Center>
          </Flex>
        </Flex>
        <Flex justify='space-between' m={2} h='10%'>
          <Center
            bg='green.700'
            p={4}
            w='50%'
            borderTopLeftRadius='lg'
            borderBottomLeftRadius='lg'
          >
            <Text
              fontSize={{ base: 'xs', md: 'sm' }}
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
            <Flex
              justify='space-between'
              flexDirection={{ base: 'column', md: 'row' }}
              alignItems='center'
              gap={4}
              w='fit-content'
            >
              <Text
                fontSize={{ base: 'xs', md: 'sm' }}
                fontWeight='bold'
                color='white'
                textAlign={{ base: 'center' }}
              >
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
