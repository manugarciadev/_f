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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Badge, Avatar} from '@mui/material';
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
import SearchIcon from '@mui/icons-material/Search';
import Autosuggest from 'react-autosuggest';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LoopIcon from '@mui/icons-material/Loop';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';




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

// Componente de pesquisa com autocompletar


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cancellationPolicys, setCancellationPolicys] = useState(null);
  const [title, setTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState('Non Refundable');
  const [showInclusions, setShowInclusions] = useState(true);
  const [newInclusionTitle, setNewInclusionTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySite, setCompanySite] = useState('');
  const [showAddedProductAlert, setShowAddedProductAlert] = useState(false);
  const [selectedTypeOption, setSelectedTypeOption] = useState('');
  const [classesData, setClassesData] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [filteredInclusions, setFilteredInclusions] = useState([]);
  const [selectedInclusion, setSelectedInclusion] = useState(null);
   const [temporaryId, setTemporaryId] = useState(null);
   const [draggedImages, setDraggedImages] = useState([]);

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


  const handleImageChange = (event) => {
    const files = event.target.files;
  
    // Lógica para processar os arquivos e adicionar URLs ao estado
    // Exemplo: adicionar todas as imagens selecionadas
    const newImages = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => URL.createObjectURL(file));
  
    // Concatenar as novas imagens com as imagens existentes
    setDraggedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSelect = (inclusion) => {
    setSelectedInclusion(inclusion);
  };

  // ...

// handleSearch

// Função de sugestão para react-autosuggest
const getSuggestions = (value, inclusions) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : inclusions.filter(inclusion =>
    inclusion.title.toLowerCase().includes(inputValue)
  );
};

// Componente de pesquisa com autocompletar
const SearchAutocomplete = ({ inclusions, handleSelect }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const filteredSuggestions = inputLength === 0 ? [] : inclusions.filter(inclusion =>
      inclusion.title.toLowerCase().includes(inputValue)
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(value);
    }
  };

  const handleClearSelection = () => {
    setSelectedInclusion(null);
  };

  const inputProps = {
    placeholder: 'Pesquisar',
    value,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
  };

  const renderSuggestion = (suggestion) => (
    <ListItem button onClick={() => handleSelect(suggestion)}>
      <ListItemText primary={suggestion.title} />
    </ListItem>
  );

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion.title}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderInputComponent={(inputProps) => <TextField {...inputProps} variant="outlined" fullWidth />}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <Paper {...containerProps} square>
          <List>{children}</List>
        </Paper>
      )}
      onSuggestionSelected={(event, { suggestion }) => handleSelect(suggestion)}
    />
  );
};

const handleClearSelection = () => {
  setSelectedInclusion(null);
};

const SuppliersTable = ({ data }) => {

  const handleRemoveInclusion = (id) => {
    // Lógica para remover uma inclusão pelo ID
    const apiUrl = '/api_/suppliers';
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
  


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>Logo</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
            <TableCell>
              <Avatar alt={item.name} src={item.image} />
            </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <IconButton onClick={() => openCategoryModal(item)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleRemoveInclusion(item._id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


// Componente de Tabela
const InclusionsTable = ({ classes, inclusions, selectedInclusion, handleRemoveInclusion, handleClearSelection }) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

 

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  return (
<div>
      {classes.map((classObj, index) => (
        <div key={index}>
       <Button fullWidth onClick={() => toggleDropdown(index)} style={{ position: 'relative' }}>
          {classObj.title}
          <ArrowDropDownIcon />
          <Badge 
              sx={{ position: 'absolute', top: 15, right: 15 }} 
              badgeContent={
                  inclusions.filter((inclusion) => inclusion.type === classObj.title).length
              } 
              color="primary"  
          />
        </Button>
          {openDropdownIndex === index && inclusions.some((inclusion) => inclusion.type === classObj.title) && (
            <div>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {inclusions.map((inclusion) => {
                      if (inclusion.type === classObj.title) {
                        return (
                          <TableRow key={inclusion._id}>
                            <TableCell>
                              <AssistantPhotoIcon fontSize="medium" /> {inclusion.title}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton onClick={() => openEditModal(inclusion)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleRemoveInclusion(inclusion._id)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      }
                      return null;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      ))}
      <div style={{ display: openDropdownIndex === null ? 'block' : 'none' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {selectedInclusion && (
                <TableRow key={selectedInclusion.id}>
                  <TableCell>
                    <AssistantPhotoIcon fontSize="medium" /> {selectedInclusion.title}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => openEditModal(selectedInclusion)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveInclusion(selectedInclusion._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>

  );
};

  const handleOptionTypeChange = (event) => {
    setSelectedTypeOption(event.target.value);
  };

  
  const openEditModal = (inclusion) => {
    openCategoryModal(inclusion);
  };

  const openCategoryModal = (inclusion) => {
    // Functionality to open modal with the inclusion data
    setTemporaryId(inclusion._id);
    setNewInclusionTitle(inclusion.prefix);
    setCompanyName(inclusion.name);
    setCompanySite(inclusion.website);
    setDraggedImages(inclusion.image);

    console.log("Open modal for inclusion:", inclusion);
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };


  useEffect(() => {
    // Define um temporizador para esconder o alerta após 5 segundos
    fetchDataClasses();
    const timeoutId = setTimeout(() => {
      setShowAddedProductAlert(false);
    }, 5000);
    fetchData();

    // Limpa o temporizador quando o componente é desmontado ou quando showAddedProductAlert muda
    return () => clearTimeout(timeoutId);
  }, [showAddedProductAlert]);



  const fetchData = async () => {
    try {
      const response = await axios.get('/api_/exclusions');
      setInclusions(prevInclusions => [...response.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataClasses = async () => {
    try {
      const response = await axios.get('/api_/suppliers');
      // Definir classesData com os dados recebidos da resposta
      setClassesData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
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


  const updateInclusion = async () => {

  const inclusionBody = {
    prefix: newInclusionTitle,
    name: companyName,
    website: companySite,
    image: draggedImages,
  };

  console.log(">",temporaryId);
    
    try {
      const response = await fetch(`/api_/suppliers/${temporaryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inclusionBody),
      });

      if (response.ok) {
        // Inclusion updated successfully
        console.log('Inclusion updated successfully');
      } else {
        // Handle error
        console.error('Failed to update inclusion');
      }
    } catch (error) {
      console.error('Error updating inclusion:', error);
    }

    window.location.reload();

  };


const handleRemoveInclusion = (id) => {
  // Lógica para remover uma inclusão pelo ID
  const apiUrl = '/api_/suppliers';
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

const handleCompanyNameChange = (e) => {
  // Lógica para atualizar o título enquanto o usuário digita
  // Por exemplo, você pode armazenar o título em um estado
  setCompanyName(e.target.value);
};

const handleCompanySiteChange = (e) => {
  // Lógica para atualizar o título enquanto o usuário digita
  // Por exemplo, você pode armazenar o título em um estado
  setCompanySite(e.target.value);
};

const handleAddInclusion = () => {

  const apiUrl = '/api_/suppliers';
  // Lógica para adicionar uma nova inclusão
  const newInclusion = {
    id: generateUniqueId(), // Implemente uma função para gerar IDs únicos
    prefix: newInclusionTitle,
    name: companyName,
    website: companySite,
    image: draggedImages,
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

const [searchTerm, setSearchTerm] = useState('');

const handleSearch = (searchTerm) => {
  const filteredInclusions = inclusions.filter(inclusion =>
    inclusion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredInclusions(filteredInclusions);
  
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
<Header title="Suppliers 👥" subtitle="Create and set up all the Suppliers available for creating the Services." />
</div>
{showAddedProductAlert && (
       <Alert sx={{marginLeft: 235, width: 300}} variant="filled" severity="success">
          Partner Added!
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
          <Modal open={isCategoryModalOpen} onClose={closeCategoryModal}>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', height: 600, width: 600, transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: 2 }} variant="h5">
                        Suppliers 👥 | Edit
                        </Typography>
                       
                        <div style={{ marginLeft: 'auto' }}>
                        <Button variant="contained" sx={{marginRight:'4px'}} >
                            cancel </Button>
                        <Button onClick={updateInclusion} variant="contained" >
                            Save <CheckIcon sx={{marginLeft:'4px'}}/>
                        </Button>
                        </div>
                      </div>

                        <br />
                        <Divider variant="horizontal" />

                        <div>
                          <br />
                          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > :not(style)': { m: 1 },
              marginRight: '18px',
              width: '100%', // Definir a largura total para ocupar toda a largura disponível
              flexWrap: 'wrap', // Permitir que os itens quebrem para a próxima linha se não houver espaço suficiente
            }}
          >
            <Paper
          sx={{
            backgroundColor: 'white',
            marginRight: '5px',

            width: '600px',
            border: '3px dashed gray',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            padding: '10px',
            // minHeight: '370px',
            height: '200px',
            transition: 'height 0.3s ease',
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event)}
        >
          {draggedImages.length === 0 ? (
            <div className="empty-container-message">
              <h3 className="text-center">Drag photos here.</h3>
              <h5 className="text-center" style={{ color: 'gray' }}>
                Supported file types are: .jpeg, .jpg, .png
              </h5>
            
              <input type="file" accept="image/*" onChange={handleImageChange} multiple />
            </div>
          ) : (
            draggedImages.map((imageUrl, index) => (
              <div
                key={index}
                className="square-image"
                style={{
                  position: 'relative',
                  width: '100px',
                  height: '200px',
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
        <TextField fullWidth label="Prefix" id="outlined-size-normal" onChange={handleTitleChange} defaultValue={newInclusionTitle} />
            <TextField fullWidth label="Company Name" id="outlined-size-normal" onChange={handleCompanyNameChange} defaultValue={companyName} />
            <TextField fullWidth label="Company Website" id="outlined-size-normal" onChange={handleCompanySiteChange} defaultValue={companySite} />
          
          </Box>
                         <br />
                      <br />
                 </div>    
              </Box>
            </Modal>
         
          <br/>
          <br/>
          
   
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {showInclusions && (
              <>
           
               <SearchAutocomplete
               inclusions={inclusions}
               handleSelect={handleSelect}
               
             />
             <SuppliersTable
               data={classesData}
             />
             </>
            )}

          </div>
          <br />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ flex: 1, borderBottom: '1px solid black', marginRight: '10px' }}></div>
            <h2 className="text-center">Create a New Suppliers </h2>
            <div style={{ flex: 1, borderBottom: '1px solid black', marginLeft: '10px' }}></div>
          </div>
          <h4 className="text-center" style={{ color: 'gray' }}>Add a new Partner to be added to the products.</h4>
          <br />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > :not(style)': { m: 1 },
              marginRight: '18px',
              width: '100%', // Definir a largura total para ocupar toda a largura disponível
              flexWrap: 'wrap', // Permitir que os itens quebrem para a próxima linha se não houver espaço suficiente
            }}
          >
            <Paper
          sx={{
            backgroundColor: 'white',
            marginRight: '5px',

            width: '600px',
            border: '3px dashed gray',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            padding: '10px',
            // minHeight: '370px',
            height: '200px',
            transition: 'height 0.3s ease',
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event)}
        >
          {draggedImages.length === 0 ? (
            <div className="empty-container-message">
              <h3 className="text-center">Drag photos here.</h3>
              <h5 className="text-center" style={{ color: 'gray' }}>
                Supported file types are: .jpeg, .jpg, .png
              </h5>
            
              <input type="file" accept="image/*" onChange={handleImageChange} multiple />
            </div>
          ) : (
            draggedImages.map((imageUrl, index) => (
              <div
                key={index}
                className="square-image"
                style={{
                  position: 'relative',
                  width: '100px',
                  height: '200px',
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
            <TextField fullWidth label="Prefix" id="outlined-size-normal" onChange={handleTitleChange} defaultValue={newInclusionTitle} />
            <TextField fullWidth label="Company Name" id="outlined-size-normal" onChange={handleCompanyNameChange} defaultValue={companyName} />
            <TextField fullWidth label="Company Website" id="outlined-size-normal" onChange={handleCompanySiteChange} defaultValue={companySite} />
          
          </Box>
          <div>
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '20px' }}>
              <Button sx={{}} fullWidth variant="contained" color="primary" onClick={handleAddInclusion}>
                Add Partner <CheckIcon />
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

