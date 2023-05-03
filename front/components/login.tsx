import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
    InputRightElement,
    InputGroup,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useState } from 'react';
  
  export default function Login() {
    
    
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [login, setLogin] = useState({
      email: '',
      password: '',
    })
    const toast = useToast()

    const router = useRouter()

    
    const onChange = (e: any) => {
      // varible name and value
      let name = e.target.name
      let value = e.target.value
      // setter hooks value and prev value
      setLogin(prev => ({...prev, [name]: value}))
    }
    
    const Login = async() => {
      try {
          setIsLoading(true)
          // je traite mes donnees
          let data = qs.stringify({
              'email': login.email,
              'password': login.password,
          });

          // axios et la route que je veux consommer
          let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'http://localhost:8000/login',
              headers: { 
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              data : data
          };

          // execute la route
          const response = await axios.request(config)
    
          toast({
              title: 'Votre compte est connecter',
              description: "Direction votre dashboard",
              status: 'success',
              duration: 3000,
              isClosable: true,
          })
          
          setIsLoading(false)

          document.cookie = "token="+response.data.data.jwt+";path=/;"

          router.push('/dashboard')
          
      } catch (err:any) {
          
          setIsLoading(false)

          toast({
              title: err.response.data.data.titleError,
              description: err.response.data.data.error,
              status: 'error',
              duration: 3000,
              isClosable: true,
          })
      }

  }



    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input name="email" onChange={onChange} type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input  onChange={onChange} name="password" type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  isLoading={isLoading}
                  onClick={Login}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Me connecter
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }