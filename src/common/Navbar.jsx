import React, { useEffect } from 'react';
import { Flex, Spacer, IconButton, Button } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('auth') === 'true';

  useEffect(() => {
    const savedColorMode = localStorage.getItem('colorMode');
    if (savedColorMode && savedColorMode !== colorMode) {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  const handleToggleTheme = () => {
    toggleColorMode();
    localStorage.setItem('colorMode', colorMode === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  };

  return (
    <Flex p="4" boxShadow="base" mb="4">
      <Spacer />
      <IconButton
        aria-label="Toggle theme"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={handleToggleTheme}
        mr="2"
      />
      {isAuthenticated && (
        <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
      )}
    </Flex>
  );
};

export default Navbar;
