import React, { useState, useEffect  } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  useTheme,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import {Checkbox, FormControlLabel, FormLabel, InputAdornment, TextField, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import GroupIcon from '@mui/icons-material/Group';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import IconButton from '@mui/material/IconButton';
import { v4 as uuidv4 } from 'uuid';
import Divider from '@mui/material/Divider';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import Alert from '@mui/material/Alert';




const top100Films = [  // Substitua com suas opções
  'Non Refundable',
  'Fully Refundable',
  'Simple',
  'Advanced',
];

const comboOptions = [  // Substitua com suas opções
  'Day(s)',
  'Hour(s)',
  
];

const combo2Options = [  // Substitua com suas opções
  'or more',
  'or less',
  'Up to'
  
];

const combo3Options = [  // Substitua com suas opções
  'start date',
  'start time',

  
];



const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cancellationPolicys, setCancellationPolicys] = useState(null);
  const [title, setTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState('Non Refundable');
  const [showInclusions, setShowInclusions] = useState(false);
  const [newInclusionTitle, setNewInclusionTitle] = useState('');
  const [showAddedProductAlert, setShowAddedProductAlert] = useState(false);
  const [selectedTypeOption, setSelectedTypeOption] = useState('');
  // ...
  const [selectedClassEndOptions, setSelectedClassEndOptions] = useState([]);
  

  const handleSelectClassEndChange = (event) => {
    const selected = event.target.value;
    setSelectedClassEndOptions(selected);
  };


  const handleOptionTypeChange = (event) => {
    setSelectedTypeOption(event.target.value);
  };


  useEffect(() => {
    // Define um temporizador para esconder o alerta após 5 segundos
    const timeoutId = setTimeout(() => {
      setShowAddedProductAlert(false);
    }, 5000);
    fetchData();

    // Limpa o temporizador quando o componente é desmontado ou quando showAddedProductAlert muda
    return () => clearTimeout(timeoutId);
  }, [showAddedProductAlert]);



  const fetchData = async () => {
    try {
      const response = await axios.get('/api_/classes');
      setInclusions(prevInclusions => [...response.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  
  const [singleRule, setSingleRule] = useState([
    {
      percentage: '',
      days: '',
      hours: '',
    },
  ]);
  const [rules, setRules] = useState([
    {
      percentage: '',
      days: '',
      hours: '',
    },
  ]);


// No início do seu componente ou onde você define outras funções
const [inclusions, setInclusions] = useState([]); // Certifique-se de ter um estado para armazenar suas inclusões

const handleShowInclusions = () => {
  setShowInclusions(!showInclusions);
};

const handleRemoveInclusion = (id) => {
  // Lógica para remover uma inclusão pelo ID
  const apiUrl = '/api_/classes';
  const deleteUrl = `${apiUrl}/${id}`;

  fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // Adicione quaisquer cabeçalhos adicionais necessários aqui
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao excluir inclusão');
        
      }
      console.log('Inclusão excluída com sucesso');
    })
    .catch(error => {
      console.error('Erro durante a solicitação de exclusão:', error.message);
    });

    window.location.reload();
};

const handleEdit = (id) => {
  // Lógica para editar uma inclusão pelo ID
  const editedInclusion = inclusions.find((inclusion) => inclusion.id === id);
  // Faça algo com a inclusão editada, por exemplo, preencha um formulário de edição
};

const handleTitleChange = (e) => {
  // Lógica para atualizar o título enquanto o usuário digita
  // Por exemplo, você pode armazenar o título em um estado
  setNewInclusionTitle(e.target.value);
};

const handleAddInclusion = () => {

  const apiUrl = '/api_/classes';
  // Lógica para adicionar uma nova inclusão
  const newInclusion = {
    //id: generateUniqueId(), // Implemente uma função para gerar IDs únicos
    title: newInclusionTitle,
    options: selectedClassEndOptions
  };
  
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Adicione quaisquer cabeçalhos adicionais necessários aqui
    },
    body: JSON.stringify(newInclusion),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao adicionar inclusão');
      }
      return response.json();
    })
    .then(responseData => {
      // Se a solicitação for bem-sucedida, você pode manipular a resposta aqui se necessário
      console.log('Inclusão adicionada com sucesso:', responseData);
    })
    .catch(error => {
      // Se houver algum erro durante a solicitação, você pode lidar com isso aqui
      console.error('Erro durante a solicitação:', error.message);
    });

  // Não é mais necessário adicionar localmente, pois será feito no servidor
  // setInclusions((prevInclusions) => [...prevInclusions, newInclusion]);
  setNewInclusionTitle(''); // Limpa o título após adicionar a inclusão
  setShowAddedProductAlert(true);
};

// Função para gerar IDs únicos (exemplo)
const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

      
  const history = useNavigate();
      const handleVoltar = () => {
        history(-1);
      };

      const shouldRenderBotaoVoltar = history.length > 1;
  
    return (
            
          <Box m="20px" textAlign="center">
          
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
            <Header title="Classes 📤" subtitle="Create and set up all the Classes available for the Products Atributes." />
          </div>
          {showAddedProductAlert && (
            <Alert sx={{marginLeft: 235, width: 300}} variant="filled" severity="success">
                Class Added!
            </Alert>
          )}
<Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  height="100%"
>
  <div
    className="container"
    style={{ maxWidth: "1200px", width: "100%" }}
  >
    <div className="row">
      <div className="col-md-6">
        <div className="card-body d-flex align-items-center justify-content-center">
          <br />
          <Fab onClick={handleShowInclusions}>
            {showInclusions ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </Fab>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {showInclusions && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {showInclusions ? (
                      inclusions.map((inclusion) => (
                        <TableRow key={inclusion.id}>
                          <TableCell>
                            <AssistantPhotoIcon fontSize="medium" /> {inclusion.title}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton onClick={() => handleEdit(inclusion.id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleRemoveInclusion(inclusion._id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} align="center" sx={{ height: '300px' }}>
                          No Classes Available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {!showInclusions && (
              <></>
            )}
          </div>
          <br />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ flex: 1, borderBottom: '1px solid black', marginRight: '10px' }}></div>
            <h2 className="text-center">Create a New Class</h2>
            <div style={{ flex: 1, borderBottom: '1px solid black', marginLeft: '10px' }}></div>
          </div>
          <h4 className="text-center" style={{ color: 'gray' }}>Add a new Class to be added to the products.</h4>
          <br />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > :not(style)': { m: 1 },
              marginRight: '18px',
            }}
          >
            <TextField fullWidth label="Title" id="outlined-size-normal" onChange={handleTitleChange} defaultValue="" />
            <Select
              multiple
              value={selectedClassEndOptions}
              onChange={handleSelectClassEndChange}
              style={{ minWidth: 350 }}
            >
              <MenuItem key={0} value="inclusions">Inclusions</MenuItem>
              <MenuItem key={1} value="exclusions">Exclusions</MenuItem>
              <MenuItem key={2} value="Themes">Themes</MenuItem>
              <MenuItem key={3} value="categories">Categories</MenuItem>
              <MenuItem key={4} value="whattobring">What to Bring</MenuItem>
              <MenuItem key={5} value="locations">Locations</MenuItem>

             
           </Select>
          </Box>
          <div>
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '20px' }}>
              <Button sx={{}} fullWidth variant="contained" color="primary" onClick={handleAddInclusion}>
                Add Class <CheckIcon />
              </Button>
              <br />
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
        <br />
      </div>
    </div>
  </div>
</Box>
</Box>






  );
};

export default Dashboard;

