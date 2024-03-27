import { Spinner, Center, Flex, Text } from '@chakra-ui/react';

function LoadingSpinner() {
  return (
    <Center p={6}>
      <Flex gap={4} justify='center' align='center' flexDirection='column'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='green.500'
          size='xl'
        />
        <Text fontSize='md' fontWeight='bold'>
          Loading...
        </Text>
      </Flex>
    </Center>
  );
}

export default LoadingSpinner;
