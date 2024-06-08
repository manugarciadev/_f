import React, { useState, useEffect } from "react";
import { Box, IconButton, useTheme, Menu, MenuItem, Typography, Avatar, Divider } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const initialIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  
  




  
  // State para controlar a exibição do "dropdown"
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    // Step 1: Clear the login status from localStorage
    localStorage.removeItem("isLoggedIn");
    // Step 2: Set isLoggedIn to false in the component state
    setIsLoggedIn(false);
    // Step 3: Redirect the user to the login page
    window.location.href = "/"; // Replace "/login" with the actual URL of your login page
  };

  const handleMenuOpen = (event) => {
    const image = localStorage.getItem("userImage");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    
    setUserImage(image);
    setUserName(name);
    setUserEmail(email);    

    setAnchorEl(event.currentTarget);

  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
  {/* SEARCH BAR */}
  <Box
    display="flex"
    backgroundColor={colors.primary[400]}
    borderRadius="3px"
  >
    <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
    <IconButton type="button" sx={{ p: 1 }}>
      <SearchIcon />
    </IconButton>
  </Box>

  {/* ICONS */}
  <Box display="flex" alignItems="center">
    <IconButton onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === "dark" ? (
        <DarkModeOutlinedIcon />
      ) : (
        <LightModeOutlinedIcon />
      )}
    </IconButton>
    <IconButton>
      <NotificationsOutlinedIcon />
    </IconButton>
    <IconButton component={Link} to="/settings">
      <SettingsOutlinedIcon />
    </IconButton>
    {/* Adicione o "dropdown" para o botão PersonOutlinedIcon */}
    <IconButton onClick={handleMenuOpen}>
      <PersonOutlinedIcon />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {/* Opções do "dropdown" */}
      <MenuItem onClick={handleMenuClose}>
        <Avatar sx={{ width: 32, height: 32, mr: 2 }} src={userImage} />
        <div>
          <Typography variant="subtitle1"><strong>{userName}</strong></Typography>
          <Typography variant="body2"></Typography>{userEmail}
        </div>
      </MenuItem>
      <Divider/>
      <MenuItem sx={{left: 45}} onClick={handleLogout}>Logout   <LogoutIcon/></MenuItem>
    </Menu>
  </Box>
</Box>

  );
};

export default Topbar;
