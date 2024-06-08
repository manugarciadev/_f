import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import icon from "./img/icon.png";
import backgroundImg from "./img/capa.jpg";
import Footer from "./Footer";
import { IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios"; // Import Axios
import Alert from "@mui/material/Alert";
import Sidebar from "../global/Sidebar";



export default function SignInSide() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  
const handleErrorAlertClose = () => {setShowErrorAlert(false);};



  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
  
    try {
      const response = await fetch('/api_/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Certifique-se de que a solicitação foi bem-sucedida antes de tentar acessar os dados
      if (response.ok) {
        const responseData = await response.json();
  
        // Acessando os dados do usuário da resposta
        const user = responseData.user;
  
        // Armazenando os dados do usuário no localStorage
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userImage", user.profileImage);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userRegion", user.region);
  
        // Se o login for bem-sucedido, você pode redirecionar ou fazer outras operações
        console.log('Login bem-sucedido');
  
        // Redirecionamento para a página após o login
        window.location.href = "/request-board";
      } else {
        // Trate o caso em que a resposta não foi bem-sucedida (por exemplo, credenciais inválidas)
        console.error('Credenciais inválidas');
        showErrorAlert(true);
      }
    } catch (error) {
      // Se houver um erro durante a solicitação, você pode lidar com isso aqui
      console.error('Erro durante a solicitação de login:', error.message);
      showErrorAlert(true);
    }
  };
  

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>

      {showErrorAlert && (
        <Alert  variant="filled" sx={{width:300}}  onClose={handleErrorAlertClose} severity="error">
        Login Failed!
        </Alert>
)}
     
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <HelpOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 35,
          }}
        >
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3">
                  <img
                    src={icon}
                    alt="Icon-Bu-Country-Tours"
                    style={{ width: "170px", height: "auto" }}
                  />
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit} 
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Footer />
        </Box>
      </Container>
      
    </>
  );
}
