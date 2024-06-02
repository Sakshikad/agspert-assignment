import React, { useEffect } from "react";
import { Flex, Spacer, IconButton, Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("auth") === "true";

  useEffect(() => {
    const savedColorMode = localStorage.getItem("colorMode");
    if (savedColorMode && savedColorMode !== colorMode) {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  const handleToggleTheme = () => {
    const newColorMode = colorMode === "light" ? "dark" : "light";
    toggleColorMode();
    localStorage.setItem("colorMode", newColorMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  const isLoginPage = location.pathname === "/";

  return (
    <Flex p="4" boxShadow="base" mb="4">
      <Spacer />
      <IconButton
        aria-label="Toggle theme"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={handleToggleTheme}
        mr="2"
      />

      {isAuthenticated && !isLoginPage && (
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
