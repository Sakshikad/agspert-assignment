import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, VStack, Heading, Box } from '@chakra-ui/react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      localStorage.setItem('auth', 'true');
      navigate('/sales');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <VStack spacing={6} alignItems="center">
      <Box textAlign="center">
        <Heading as="h1" size="lg">Login</Heading>
      </Box>
      <VStack spacing={4} w="300px">
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="green" onClick={handleLogin} w="100%">
          Login
        </Button>
      </VStack>
    </VStack>
  );
};

export default LoginPage;
