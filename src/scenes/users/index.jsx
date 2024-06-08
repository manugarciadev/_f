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
import Modal from "@mui/material/Modal";
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



const roleOptions = [
  { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'manager', label: 'Manager' },
];

const regionOptions = [
  { value: 'rai', label: 'RAI' },
    { value: 'sid', label: 'SID' },
    { value: 'vxe', label: 'VXE' },
    { value: 'bvc', label: 'BVC' },
    { value: 'sne', label: 'SNE' },
    { value: 'mmo', label: 'MMO' },
    { value: 'sfl', label: 'SFL' },

];

const groupsData = [
  {
    _id: '1',
    name: 'Example 1',
    description: 'Description 1',
    view: true,
    add: false,
    edit: true,
    delete: false,
  },
  {
    _id: '2',
    name: 'Example 2',
    description: 'Description 2',
    view: false,
    add: true,
    edit: false,
    delete: true,
  },
  // Add more examples as needed
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


const UsersTable = ({ data, handleEdit, handleRemove }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
      {/* ... (Your buttons and other components) ... */}
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
        <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>IMAGE</strong></TableCell>
            <TableCell><strong>NAME</strong></TableCell>
            <TableCell><strong>SURNAME</strong></TableCell>
            <TableCell><strong>EMAIL</strong></TableCell>
            <TableCell><strong>PHONE NUMBER</strong></TableCell>
            <TableCell><strong>REGION</strong></TableCell>
            <TableCell><strong>ROLE</strong></TableCell>
            <TableCell><strong>ACTIONS</strong></TableCell> {/* New column for Actions */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? (
            data.map((row, index) => (
              <TableRow key={row.username}>
                 <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Avatar alt={row.name} src={row.image} />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <Button variant="contained" color="info" onClick={() => handleEdit(row)} sx={{ marginRight: '5px' }}>
                    <EditIcon />
                  </Button>
                  <Button variant="contained" color="info" onClick={() => handleRemove(row)}>
                    <CloseIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ height: '700px' }}>
                No Users Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const GroupsTable = ({ data, handleEdit, handleRemove }) => {

  const getEmoji = (value) => (value ? '🟢' : '🔴');

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
      {/* ... (Your buttons and other components) ... */}
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
        <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>NAME</strong></TableCell>
            <TableCell><strong>VIEW</strong></TableCell>
            <TableCell><strong>ADD</strong></TableCell>
            <TableCell><strong>EDIT</strong></TableCell>
            <TableCell><strong>DELETE</strong></TableCell>
            <TableCell><strong>ACTIONS</strong></TableCell> {/* New column for Actions */}
        </TableHead>
        <TableBody>
          {groupsData ? (
            groupsData.map((row, index) => (
              <TableRow key={row._id}>
                  <TableCell>{index + 1}</TableCell>
                 <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{getEmoji(row.view)}</TableCell>
                <TableCell>{getEmoji(row.add)}</TableCell>
                <TableCell>{getEmoji(row.edit)}</TableCell>
                <TableCell>{getEmoji(row.delete)}</TableCell>
                <TableCell>
                  <Button variant="contained" color="info" onClick={() => handleEdit(row)} sx={{ marginRight: '5px' }}>
                    <EditIcon />
                  </Button>
                  <Button variant="contained" color="info" onClick={() => handleRemove(row)}>
                    <CloseIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ height: '700px' }}>
                No Groups Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};



const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [view, setView] = useState(false);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [draggedImages, setDraggedImages] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("BCEUser#2024");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [allowLogin, setAllowLogin] = useState(false);
  const [onlyReceiveEmail, setOnlyReceiveEmail] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // State for selected role
  const [droppedImage, setDroppedImage] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [data, setData] = useState(null);
  const [showUsers, setShowUsers] = useState(false);
  const [selectedRoleOption, setSelectedRoleOption] = useState('');
  const [selectedRegionOption, setSelectedRegionOption] = useState('');
  const [selectedTable, setSelectedTable] = useState('users'); // Default to 'users', you can change this based on your needs
  const [selectedResourcesOptions, setSelectedResourcesOptions] = useState(null);
  const [selectedLocationsOptions, setSelectedLocationsOptions] = useState(null);
  const [groupsData, setGroupsData] = useState(null);
  const [selectedHumanResourceOptions, setSelectedHumanResourceOptions] = useState([]);
  

  useEffect(() => {
    // Função para fazer a solicitação GET
    fetchDataGroups();
    fetchData();
  }, []);

  const handleSelectHumanResourceChange = (event) => {
    const selected = event.target.value;
    setSelectedHumanResourceOptions(selected);
  };

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleSelectLocationsChange = (event) => {
    setSelectedLocationsOptions(event.target.value);
  };


  const handleSwitchChange = (event) => {
    setAllowLogin(event.target.checked);
  };
  const handleSelectResourcesChange = (event) => {
    setSelectedResourcesOptions(event.target.value);
  };

  const handleShowUsers = () => {
    setShowUsers(!showUsers);
    console.log(data);
  };
  const fetchDataGroups = async () => {
    try {
      const response = await axios.get('/api_/groups');
      setGroupsData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/api_/users');
      setData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };





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

  const handleRoleOptionChange = (event) => {
    setSelectedRoleOption(event.target.value);
  };

  const handleRegionOptionChange = (event) => {
    setSelectedRegionOption(event.target.value);
  };
 
  const handleSubmit = () => {
    
    const userData = {
      name: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      role: selectedRoleOption,
      region: selectedRegionOption,
      profileImage: imagem, 
      password: password
    };
  
    console.log(userData);
  
    // Define o backendURL com base no valor de allowLogin
    let backendURL = "";
    if (allowLogin) {
      backendURL = "/api_/users";
    } else {
      backendURL = "/api_/partners";
    }
  
    Axios.post(backendURL, userData)
      .then((response) => {
        // Handle success response from the backend if needed
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error response from the backend if needed
        console.error(error);
      });
  
    setIsModalOpen(false);
    window.location.reload();
  };
  

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedOptions(event.target.value); // Usando event.target.value para obter as opções selecionadas
  };

  const handleButtonClick = () => {
    console.log("Opções Selecionadas:", selectedOptions);
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

// selectedOptions

  const handleEdit = async (user) => {
    try {
      // Faz a chamada PUT para o endpoint do backend com o usuário atualizado
      await axios.put(`/api_/users/${user.id}`, user);
      console.log('Usuário atualizado:', user);
      // Implemente aqui a lógica para atualizar os dados do usuário na tabela
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
    }
  };

  const handleRemove = async (user) => {
    try {
      // Faz a chamada DELETE para o endpoint do backend para remover o usuário
      await axios.delete(`/api_/users/${user.id}`);
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

  const handleOpenGroupModal = () => {
    setIsGroupModalOpen(true);
  };

  const handleCloseGroupModal = () => {
    setIsGroupModalOpen(false);
  };
  

  return (
    <Box m="20px">
       <Modal open={isGroupModalOpen} onClose={handleCloseGroupModal}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            width: "80%",
            margin: "auto",
            overflowY: "auto"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
              borderRadius: 8,
              p: 2,
              width: "70%",
              maxHeight: "80vh", // Set a maximum height for the modal content
              marginTop: "100px"
            }}
          >
            <h1 className="text-center">Add Groups 👥 | System Groups</h1>
            <IconButton
              edge="end" // Coloque o botão no canto direito
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
              sx={{ marginLeft: 155, marginTop: -8 }}
            >
              <CloseIcon />
            </IconButton>
            <br />
            <br />

            <Container>
              {/* Fields on the right side */}
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
                multiline
                rows={4}
              />
              <br />
              <br />
            </Container>
         
            {/* Switches for view, create, edit, delete */}
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
              <div>
                <label>
                <VisibilityIcon/>  View 
                  <input type="checkbox" checked={view} onChange={() => setView(!view)} />
                </label>
              </div>
              <div>
                <label>
                <AddIcon/>  Create 
                  <input type="checkbox" checked={create} onChange={() => setCreate(!create)} />
                </label>
              </div>
              <div>
                <label>
                <EditIcon/>  Edit 
                  <input type="checkbox" checked={edit} onChange={() => setEdit(!edit)} />
                </label>
              </div>
              <div>
                <label>
                <DeleteIcon/>  Delete 
                  <input type="checkbox" checked={deleteGroup} onChange={() => setDeleteGroup(!deleteGroup)} />
                </label>
              </div>
            </div>
         

            <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ marginTop: 5, marginLeft: 0 }}>
              Add Group <CheckIcon sx={{ marginLeft: '4px' }} />
            </Button>
          </Box>
        </Box>
      </Modal>


        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              width: "80%",
              margin: "auto",
              overflowY: "auto"
            }}
          >
            
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.paper",
                borderRadius: 8,
                p: 2,
                width: "70%",
                maxHeight: "80vh", // Set a maximum height for the modal content
                marginTop: "100px"
              }}
            >
        
              <h1 className="text-center">Add Users 👥 | System Users</h1>
              <IconButton
              edge="end" // Coloque o botão no canto direito
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
              sx={{ marginLeft: 155, marginTop: -8 }}
            >
              <CloseIcon />
            </IconButton>
              <br/>
              <br/>

              <Container>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    {/* Move the Paper component here */}
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
            height: 'auto',
            transition: 'height 0.3s ease',
            width: '500px'
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event)}
        >
          {draggedImages.length === 0 ? (
            <div className="empty-container-message" style={{ marginLeft: '80px' }}>
              <h3 className="text-center">Drag photos here.</h3>
              <h5 className="text-center" style={{ color: 'gray' }}>
                Supported file types are: .jpeg, .jpg, .png
              </h5>

              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagem && (
                <img
                  src={imagem}
                  alt="Imagem escolhida"
                  style={{ maxWidth: '50%', height: 'auto' }}
                />
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
                  style={{ width: '50%', height: '50%', objectFit: 'cover' }}
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
        <br/>
        <Typography variant="h5">Resources 🧰 </Typography>
        <Select
          multiple
          value={selectedHumanResourceOptions}
          onChange={handleSelectHumanResourceChange}
          style={{ minWidth: 350 }}
        >
          {groupsData && groupsData.length > 0 && // Verifica se groupsData não é null e não está vazio
            groupsData
              .filter(group => group && group.type === 'humans') // Filtra os dados pelo tipo "human"
              .map((group, index) => (
                <MenuItem key={index} value={group.title}>{group.title}</MenuItem>
              ))
          }
      </Select>
    
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* Fields on the right side */}
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
                    <TextField
                      id="phoneNumber"
                      label="Phone Number"
                      fullWidth
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                      margin="normal"
                      // Add onChange and value props to handle input state
                    />
                    <div>
                      <FormControl fullWidth>
                        <InputLabel>Roles</InputLabel>
                        <br />
                        <Select value={selectedRoleOption} onChange={handleRoleOptionChange}>
                          {roleOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <FormControl fullWidth>
                        <InputLabel>Region</InputLabel>
                        <br />
                        <Select value={selectedRegionOption} onChange={handleRegionOptionChange}>
                          {regionOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <br/>
                    

                    <br/>
                   
                    <Typography variant="h5">Allow Login  🔒</Typography>
                    <Switch
                      checked={allowLogin}
                      onChange={handleSwitchChange}
                      name="allowLoginSwitch"
                      inputProps={{ 'aria-label': 'allow login switch' }}
                      label="Allow Login"
                    />
                    <br/>
                  
                  </Grid>
                </Grid>
              </Container>
              <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ marginTop: 5, marginLeft: 0 }}>
                      Add User <CheckIcon sx={{ marginLeft: '4px' }} />
                    </Button>
            </Box>
          </Box>
        </Modal>
      <Header title="USERS 👤" subtitle="Managing the System Users" />
      
  

        <Dialog >
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
        <Select value={selectedRoleOption} onChange={handleRoleOptionChange}>
          {roleOptions.map((option) => (
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

<Button onClick={handleOpenGroupModal} variant="contained" color="info" fullWidth>
     Add New Group <AddIcon/>  
</Button>
<Button onClick={handleOpenModal} variant="contained" color="info" fullWidth>
     Add New User <AddIcon/>  
</Button>
  
<div>
      <Select value={selectedTable} onChange={handleTableChange}>
        <MenuItem value="users">Users Table</MenuItem>
        <MenuItem value="groups">Groups Table</MenuItem>
      </Select>

      {selectedTable === 'users' ? (
        <UsersTable
          data={data}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        />
      ) : (
        <GroupsTable
        data={data}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        />
      )}
    </div>
    </Box>
  );
};

export default Team;


