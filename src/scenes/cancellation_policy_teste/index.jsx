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
  ListItem,
  List,
  ListItemText,
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
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';


const Rule = ({ rule, index, handleRuleChange }) => {
  return (
    <ListItem key={index}>
      <ListItemText
        primary={`Regra ${index + 1}: ${rule.condition} ${rule.duration} ${
          rule.unit
        } ${rule.condition === 'até' ? 'até' : 'após'} ${
          rule.condition === 'até' && rule.deadline ? rule.deadline + ' - ' : 'start date'
        } ${rule.percentage}%`}
      />
      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel>Condição</InputLabel>
        <Select
          value={rule.condition}
          onChange={(e) => handleRuleChange(index, 'condition', e.target.value)}
        >
          <MenuItem value="antes">Antes</MenuItem>
          <MenuItem value="após">Após</MenuItem>
          <MenuItem value="até">Até</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Duração"
        type="number"
        value={rule.duration}
        onChange={(e) => handleRuleChange(index, 'duration', e.target.value)}
        sx={{ marginRight: 1 }}
      />
      <FormControl sx={{ minWidth: 120, marginRight: 1 }}>
        <InputLabel>Unidade</InputLabel>
        <Select
          value={rule.unit}
          onChange={(e) => handleRuleChange(index, 'unit', e.target.value)}
        >
          <MenuItem value="dias">Dias</MenuItem>
          <MenuItem value="horas">Horas</MenuItem>
        </Select>
      </FormControl>
      {rule.condition === 'até' ? (
        <TextField
          label="Data Limite"
          type="date"
          value={rule.deadline}
          onChange={(e) => handleRuleChange(index, 'deadline', e.target.value)}
          sx={{ marginRight: 2 }}
        />
      ) : (
        <TextField
          label="Data Limite"
          type="text"
          value={rule.deadline || 'start date'}
          disabled
          sx={{ marginRight: 2 }}
        />
      )}
      <TextField
        label="Percentagem"
        type="number"
        value={rule.percentage}
        onChange={(e) => handleRuleChange(index, 'percentage', e.target.value)}
        sx={{ marginRight: 2 }}
      />
    </ListItem>
  );
};


const CancellationPolicy = () => {
  const [title, setTitle] = useState('');
  const [cancellationPolicies, setCancellationPolicies] = useState([]);
  const [rules, setRules] = useState([
    {
      duration: 7,
      unit: 'dias',
      condition: 'antes',
      deadline: '2023-01-01',
      percentage: 50,
    },
    {
      duration: 3,
      unit: 'dias',
      condition: 'até',
      deadline: '2023-02-01',
      percentage: 25,
    },
  ]);

  const addRule = () => {
    const newRule = {
      duration: 0,
      unit: 'dias',
      condition: 'antes',
      deadline: '',
      percentage: 0,
    };

    setRules([...rules, newRule]);
  };

  const handleRuleChange = (index, field, value) => {
    const updatedRules = [...rules];
    updatedRules[index][field] = value;
    setRules(updatedRules);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  
  const handleVerify = () => {
    console.log(cancellationPolicies);
  };

  const handleAddCancellationPolicy = () => {
    const newCancellationPolicy = {
      title,
      rules,
    };
    //onAddCancellationPolicy(newCancellationPolicy);
    const apiUrl = '/api_/cancellation-policy';
  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Adicione quaisquer cabeçalhos adicionais necessários aqui
      },
      body: JSON.stringify(newCancellationPolicy),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao adicionar Cancellation Policy');
        }
        return response.json();
      })
      .then(responseData => {
        // Se a solicitação for bem-sucedida, você pode manipular a resposta aqui se necessário
        console.log('Cancellation Policy adicionada com sucesso:', responseData);
      })
      .catch(error => {
        // Se houver algum erro durante a solicitação, você pode lidar com isso aqui
        console.error('Erro durante a solicitação:', error.message);
      });
  
    // Não é mais necessário adicionar localmente, pois será feito no servidor
    // setInclusions((prevInclusions) => [...prevInclusions, newInclusion]);
    setNewInclusionTitle(''); // Limpa o título após adicionar a inclusão
    setShowAddedProductAlert(true);
    // Limpar o estado para a próxima entrada
    setTitle('');
    setRules([]);
  };
   
  // >>>>>

  const [cancellationPolicys, setCancellationPolicys] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Non Refundable');
  const [showInclusions, setShowInclusions] = useState(false);
  const [newInclusionTitle, setNewInclusionTitle] = useState('');
  const [showAddedProductAlert, setShowAddedProductAlert] = useState(false);
  const [products, setProducts] = useState(null);

  // ...



  
  const [singleRule, setSingleRule] = useState([
    {
      percentage: '',
      days: '',
      hours: '',
    },
  ]);
 


  useEffect(() => {
    // Define um temporizador para esconder o alerta após 5 segundos
    const timeoutId = setTimeout(() => {
      setShowAddedProductAlert(false);
    }, 5000);

    // Limpa o temporizador quando o componente é desmontado ou quando showAddedProductAlert muda
    return () => clearTimeout(timeoutId);
  }, [showAddedProductAlert]);

 

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('/api_/cancellation-policy');
        setCancellationPolicies(prevCancellationPolicys => [...response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();



  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Lógica de pesquisa aqui, usando o valor em 'searchTerm'
    console.log('Realizar pesquisa com:', searchTerm);
  };

const handleTest = () => { console.log(inclusions);};


// No início do seu componente ou onde você define outras funções
const [inclusions, setInclusions] = useState([]); // Certifique-se de ter um estado para armazenar suas inclusões

const handleShowInclusions = () => {
  setShowInclusions(!showInclusions);
};

const handleRemoveInclusion = (id) => {
  // Lógica para remover uma inclusão pelo ID
  setInclusions((prevInclusions) => prevInclusions.filter((inclusion) => inclusion.id !== id));
};

const handleEdit = (id) => {
  // Lógica para editar uma inclusão pelo ID
  const editedInclusion = inclusions.find((inclusion) => inclusion.id === id);
  // Faça algo com a inclusão editada, por exemplo, preencha um formulário de edição
};



const handleAddInclusion = () => {
  // Lógica para adicionar uma nova inclusão
  const apiUrl = '/api/cancellation-policy';
  
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Adicione quaisquer cabeçalhos adicionais necessários aqui
    },
    //body: JSON.stringify(newInclusion),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao adicionar Cancellation Policy');
      }
      return response.json();
    })
    .then(responseData => {
      // Se a solicitação for bem-sucedida, você pode manipular a resposta aqui se necessário
      console.log('Cancellation Policy adicionada com sucesso:', responseData);
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
<Header title="CANCELLATION POLICY'S ❌" subtitle="Create and set up all the Inclusions available for the Products." />

</div>
{showAddedProductAlert && (
 <Alert sx={{marginLeft: 235, width: 300}} variant="filled" severity="success">
    Inclusion Added!
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
        <>
        <br/>
            <div>
<TextField
  label="Pesquisar"
  variant="outlined"
  fullWidth
  onChange={(e) => setSearchTerm(e.target.value)}
  InputProps={{
    endAdornment: (
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    ),
  }}
/>
</div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showInclusions ? (
                cancellationPolicies.map((cancellationPolicy) => (
                  <TableRow key={cancellationPolicy.id}>
                    <TableCell>
                      <AssistantPhotoIcon fontSize="medium" /> {cancellationPolicy.title}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(cancellationPolicy.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveInclusion(cancellationPolicy.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ height: '300px' }}>
                    No Cancellation Policy's Available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>)}
      {!showInclusions && (
        <></>
      )}
    </div>
    <br />
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ flex: 1, borderBottom: '1px solid black', marginRight: '10px' }}></div>
      <h2 className="text-center">Create a New Cancellation Policy</h2>
      <div style={{ flex: 1, borderBottom: '1px solid black', marginLeft: '10px' }}></div>
    </div>
    <h4 className="text-center" style={{ color: 'gray' }}>Add a new Cancellation Policy to be added to the products.</h4>
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
      <div>
      <TextField
        label="Título do Cancelation Policy"
        value={title}
        onChange={handleTitleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ flex: 1, borderBottom: '1px solid black', marginRight: '10px' }}></div>
      <h2 className="text-center">Rules</h2>
      <div style={{ flex: 1, borderBottom: '1px solid black', marginLeft: '10px' }}></div>
    </div>
    <Button fullWidth variant="contained" color="primary" onClick={addRule}>
        <AddIcon/>
      </Button>
    <Box sx={{maxHeight:'400px', overflow:'auto'}}>
      <List>
        {rules.map((rule, index) => (
          <Rule
            key={index}
            index={index}
            rule={rule}
            handleRuleChange={handleRuleChange}
          />
        ))}
      </List>
      </Box>
    </div>
    </Box>
    <div>
        <Button sx={{width:'200px'}} variant="contained" color="primary" onClick={handleAddCancellationPolicy}>
          Add Cancellation Policy <CheckIcon />
        </Button>
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


export default CancellationPolicy;
