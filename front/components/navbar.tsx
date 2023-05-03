import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Navbar(props:any) {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter()
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>

          {props.token ? <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={() => {
                    const Deconnexion = async() => {
                      let config: any = {
                          method: 'POST',
                          url: 'http://localhost:3000/api/deconnexion',
                          headers: { 
                              'Content-Type': 'application/x-www-form-urlencoded',
                              'Authorization': 'Bearer '+props.token
                          }
                      };
                  
                      const returnAxios : any = await axios(config)
                       setTimeout(() => {
                         router.push('/')
                       },1000)
                      }
                      Deconnexion();
                  }}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex> :   <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}>
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'}
            href={'#'}
            _hover={{
              bg: 'green.300',
            }}>
            Sign Up
          </Button>
        </Stack> }
        </Flex>
      </Box>
    </>
  );
}