import { VStack, Center, Text, Heading, Button } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <>
      <Center h='82vh'>
        <Center bg='green.50' borderRadius='lg' w='30%' padding={4}>
          <VStack spacing={6} padding={4}>
            <Heading color='green.700' size='3xl'>
              Oops!
            </Heading>
            <Text fontSize='2xl' color='green.500' fontWeight='bold'>
              Page not found.
            </Text>
            <Link to='/'>
              <Button colorScheme='green' variant='solid'>
                Return to home
              </Button>
            </Link>
          </VStack>
        </Center>
      </Center>
    </>
  );
}

export default ErrorPage;
