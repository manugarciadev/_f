import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import AddIcon from "@mui/icons-material/Add";
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import Axios from 'axios'; // Importe o Axios
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Container, Grid, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Fab from '@mui/material/Fab';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AppsIcon from '@mui/icons-material/Apps';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';



const options = [
  { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'manager', label: 'Manager' },
];


const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginLeft:'160px',
  },
  icon: {
    fontSize: '2rem', // Ajuste o tamanho do ícone conforme necessário
    marginRight: '10px', // Espaçamento entre o ícone e o título
  },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // Estilos personalizados para as células da tabela (se necessário)
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // Estilos personalizados para as linhas da tabela (se necessário)
}));



const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [draggedImages, setDraggedImages] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("St4rt%");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [allowLogin, setAllowLogin] = useState(false);
  const [onlyReceiveEmail, setOnlyReceiveEmail] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // State for selected role
  const [droppedImage, setDroppedImage] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [data, setData] = useState(null);
  const [showUsers, setShowUsers] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [packageTours, setPackageTours] = useState(null);
  const handleShowUsers = () => {
    setShowUsers(!showUsers);
    console.log(data);
  };


  
  useEffect(() => {
    // Primeira solicitação
    const fetchData = async () => {
      try {
        const response = await axios.get('/api_/package-tour');
        setPackageTours(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da primeira solicitação:', error);
      }
    };
    // Chame as funções de solicitação
    fetchData();
  }, []);






  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagem(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {

    const userData = {
      name: firstName,
      surname: lastName,
      email: email,
      phoneNumber: phoneNumber,
      role: selectedOption,
      image: imagem, 
      password: password
     
    };

    console.log(userData);
    // Replace 'YOUR_BACKEND_URL' with the actual URL of your Quarkus backend endpoint
    const backendURL = "http://localhost:8081/api_/users";

    Axios.post(backendURL, userData)
      .then((response) => {
        // Handle success response from the backend if needed
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error response from the backend if needed
        console.error(error);
      });
  };

  
  const handleDrop = (event) => {
    event.preventDefault();
    const imageUrl = event.dataTransfer.getData('text/plain');
    addImage(imageUrl);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...draggedImages];
    updatedImages.splice(index, 1);
    setDraggedImages(updatedImages);
  };

  const addImage = (imageUrl) => {
    setDraggedImages([...draggedImages, imageUrl]);
  };

  const handleEdit = async (user) => {
    try {
      // Faz a chamada PUT para o endpoint do backend com o usuário atualizado
      await axios.put(`http://localhost:8081/api/users/${user.id}`, user);
      console.log('Usuário atualizado:', user);
      // Implemente aqui a lógica para atualizar os dados do usuário na tabela
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
    }
  };

  const handleRemove = async (user) => {
    try {
      // Faz a chamada DELETE para o endpoint do backend para remover o usuário
      await axios.delete(`http://localhost:8081/api/users/${user.id}`);
      console.log('Usuário removido:', user);
      // Implemente aqui a lógica para remover o usuário da tabela
    } catch (error) {
      console.error('Erro ao remover o usuário:', error);
    }
  };


  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'manager', label: 'Manager' },
  ];
  




  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  

      
  const history = useNavigate();
      const handleVoltar = () => {
        history(-1);
      };

      const shouldRenderBotaoVoltar = history.length > 1;

  return (
    <Box m="20px">

<div style={{ display: 'flex', alignItems: 'center' }}>
{shouldRenderBotaoVoltar && (
<Button
variant="contained"
color="primary"
startIcon={<ArrowBackIcon />}
onClick={handleVoltar}
sx={{marginBottom:'45px', marginRight:'10px'}}

/>
)}
 <Header title="REQUEST MANAGER TABLE 📅" subtitle="Managing Requests in a table format." />

</div>
  <br/>
  <br/>


        <Dialog open={isModalOpen} onClose={handleCloseModal}>
  <DialogTitle>  <div style={styles.container}>
        <AccountCircleIcon style={styles.icon} />
        <h3>Create a New Account</h3>
      </div></DialogTitle>
  <DialogContent>
  <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper 
            sx={{
              backgroundColor: 'white',
              marginRight: '5px',
              border: '3px dashed gray',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
              padding: '10px',
              minHeight: '370px',
              height: '80px',
              transition: 'height 0.3s ease',
              width:'500px'
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event)}
          >
            {draggedImages.length === 0 ? (
              <div className="empty-container-message" style={{marginLeft:"80px"}}>
                <h3 className="text-center">Drag photos here.</h3>
                <h5 className="text-center" style={{ color: 'gray'}}>
                  Supported file types are: .jpeg, .jpg, .png
                </h5>
               
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {imagem && (
                  <img src={imagem} alt="Imagem escolhida" style={{ width: '300px', height: 'auto' }} />
                )}
              </div>
            ) : (
              draggedImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className="square-image"
                  style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    margin: '5px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`Dragged Image ${index}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Button
                    className="remove-button"
                    variant="dark"
                    size="small"
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      width: '20px',
                      height: '20px',
                      padding: '0',
                      fontSize: '14px',
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    &times;
                  </Button>
                </div>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
    <TextField
        id="name"
        label="First Name"
        fullWidth
        margin="normal"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <TextField
        id="surname"
        label="Last Name"
        fullWidth
        margin="normal"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <TextField
        id="username"
        label="Email"
        fullWidth
        margin="normal"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    <br/>
    <div>
      <FormControl fullWidth>
        <InputLabel>Roles</InputLabel>
        <br/>
        <Select value={selectedOption} onChange={handleOptionChange}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    <TextField
      id="phoneNumber"
      label="Phone Number"
      fullWidth
      onChange={(e) => setPhoneNumber(e.target.value)}
      value={phoneNumber}
      margin="normal"
      // Add onChange and value props to handle input state
    />
    <br/>
    <br/>
    <Divider variant="middle" />
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography style={{marginLeft:"30px"}}>Allow Login</Typography>
      <Switch
        // Add onChange and checked props to handle the switch state
      />
    </Box>
    <Divider variant="middle" />
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography style={{marginLeft:"30px"}}>Only Recieve Email</Typography>
      <Switch
        // Add onChange and checked props to handle the switch state
      />
    </Box>
    <Divider variant="middle" />
  </DialogContent>
  <DialogActions>
  <Box display="flex" alignItems="center" justifyContent="space-between" style={{marginRight:"200px"}}>
    <Button onClick={handleCloseModal}  variant="contained" style={{marginRight:"10px"}}
        color="primary"
      >
      Cancel
    </Button>
    <Button onClick={handleSubmit} variant="contained"
        color="primary"
        startIcon={<AddIcon />}>
      Create
    </Button>
    <br/>
    <br/>
  </Box>
  </DialogActions>
</Dialog>
<TableContainer component={Paper} sx={{backgroundColor: '#f5f5f5'}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>TITLE</strong></TableCell>
            <TableCell><strong>START DATE</strong></TableCell>
            <TableCell><strong>END DATE</strong></TableCell>
            <TableCell><strong>DURATION</strong></TableCell>
            <TableCell><strong>DESTINATIONS</strong></TableCell>
            <TableCell><strong>PRICE P/ PAX</strong></TableCell>
            <TableCell><strong>CLIENTS BUDGET</strong></TableCell>
            <TableCell><strong>NUMBER OF PAX</strong></TableCell> {/* New column for Actions */}
            <TableCell><strong>PARTNER</strong></TableCell>
            <TableCell><strong>RATE</strong></TableCell>
            <TableCell><strong>STATUS</strong></TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {packageTours ? (
            packageTours.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.tituto}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button variant="contained" color="info" onClick={() => handleEdit(row)} sx={{marginRight:'5px'}}>
                    <EditIcon/>
                  </Button>
                  <Button variant="contained" color="info" onClick={() => handleRemove(row)}>
                    <CloseIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{height:'700px'}}>
                      No Packages Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default Team;


