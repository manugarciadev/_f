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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Badge} from '@mui/material';
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
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon, point } from "leaflet";




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

// Componente de pesquisa com autocompletar filtered


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cancellationPolicys, setCancellationPolicys] = useState(null);
  const [title, setTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState('Non Refundable');
  const [showInclusions, setShowInclusions] = useState(true);
  const [newInclusionTitle, setNewInclusionTitle] = useState('');
  const [showAddedProductAlert, setShowAddedProductAlert] = useState(false);
  const [selectedTypeOption, setSelectedTypeOption] = useState('');
  const [classesData, setClassesData] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filteredInclusions, setFilteredInclusions] = useState([]);
  const [selectedInclusion, setSelectedInclusion] = useState(null);
  const [temporaryId, setTemporaryId] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  
  
  const getLocation = () => { addLocation(markerPosition.lat, markerPosition.lng); }
  const editLocation = () => { editExecLocation(markerPosition.lat, markerPosition.lng); }

  const addLocation = async (lat, lon) => {
    try {
      // Realiza a solicitação GET para obter os dados de localização
      const response = await fetch(`https://us1.locationiq.com/v1/reverse?key=pk.a27ec22d30a7547f775718dde28159b5&lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();
  
      // Verifica se a solicitação GET foi bem-sucedida
      if (response.ok) {
        // Se a solicitação GET foi bem-sucedida, extrai os dados de localização e realiza uma solicitação POST
        const location = data;
  
        // Dados a serem enviados no corpo da solicitação POST addLoc
        const postData = {
          name: newInclusionTitle,
          title: location.display_name,
          address: location.address,
          coordinates: markerPosition,
          type: selectedTypeOption
          
        };
  
        console.log("Data", postData);
  
        // Realiza a solicitação POST
        const postResponse = await fetch('/api_/dropoff-places', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });
  
        // Verifica se a solicitação POST foi bem-sucedida markerPosition
        if (postResponse.ok) {
          console.log('Solicitação POST bem-sucedida!');
        } else {
          console.error('Erro ao realizar a solicitação POST:', postResponse.status);
        }
      } else {
        console.error('Erro ao obter dados de localização:', response.status);
      }
    } catch (error) {
      console.error('Erro ao obter ou processar dados de localização:', error);
    }
  };

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  const getIconByType = (type) => {
    switch (type) {
      case 'health':
        return healthIcon;
      case 'accomodation':
        return accomodationIcon;
      case 'security':
        return securityIcon;
      case 'style':
        return styleIcon;
      case 'energy':
        return energyIcon;
      case 'transport':
        return transportIcon;
      case 'pin':
        return pinIcon;
      case 'pdi':
        return pickUpDroppOffIcon;
      default:
        return pinIcon;
    }
  };
       
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]); // posição inicial do marcador
  
  const handleMarkerDragEnd = (e) => {
    setMarkerPosition(e.target.getLatLng()); // Atualiza a posição do marcador quando ele é arrastado
  };


  // ...
  const pinIcon = new Icon({
    //iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png", pinIcon
   iconUrl: require("./icons/pin.png"),
   iconSize: [38, 38] // size of the icon
 });

   const healthIcon = new Icon({
    //iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
   iconUrl: require("./icons/hospital.png"),
   iconSize: [38, 38] // size of the icon
 });

 const securityIcon = new Icon({
  //iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
 iconUrl: require("./icons/police-station.png"),
 iconSize: [38, 38] // size of the icon
});

const styleIcon = new Icon({
  //iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
 iconUrl: require("./icons/haircut.png"),
 iconSize: [38, 38] // size of the icon
});

const accomodationIcon = new Icon({
  //iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
 iconUrl: require("./icons/home.png"),
 iconSize: [38, 38] // size of the icon
});

const transportIcon = new Icon({
  //iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
 iconUrl: require("./icons/bus-station.png"),
 iconSize: [38, 38] // size of the icon
});

const energyIcon = new Icon({
  //iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
 iconUrl: require("./icons/power.png"),
 iconSize: [38, 38] // size of the icon
});

const pickUpDroppOffIcon = new Icon({
  //iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
 iconUrl: require("./icons/bus-station.png"),
 iconSize: [38, 38] // size of the icon
});



  const handleSelect = (inclusion) => {
    setSelectedInclusion(inclusion);
  };

  const toggleView = () => {
    setShowInclusions((prevShowInclusions) => !prevShowInclusions);
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

// Componente de pesquisa com autocompletar open
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

const GroupsTable = ({ data }) => {

  const handleRemoveGroup = (id) => {
    // Lógica para remover uma inclusão pelo ID fetch
    const apiUrl = '/api_/classes/dropoff-places';
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
          throw new Error('Erro ao excluir Group');
          
        }
        console.log('Group excluída com sucesso');
      })
      .catch(error => {
        console.error('Erro durante a solicitação de Group:', error.message);
      });
  
      window.location.reload();
  };


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <IconButton onClick={() => openGroupModal(item)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleRemoveGroup(item._id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


// Componente de Tabela handleSearch
const InclusionsTable = ({ classes, inclusions, selectedInclusion, handleRemoveInclusion, handleClearSelection }) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

 

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  return (
<div>
{classes.length > 0 && inclusions.length > 0 && classes.map((classObj, index) => (
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
                            {inclusions.length > 0 && inclusions.map((inclusion) => {
                                if (inclusion.type === classObj.title) {
                                    return (
                                        <TableRow key={inclusion._id}>
                                            <TableCell>
                                                <AssistantPhotoIcon fontSize="medium" /> {inclusion.name}
                                            </TableCell>
                                            <TableCell>
                                                 {inclusion.title}
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
  const selectedValue = event.target.value; // Valor selecionado no Select
  setSelectedTypeOption(selectedValue);
  const selectedOption = classesData.find(option => option.title === selectedValue); // Encontrar o objeto correspondente ao valor selecionado
  const selectedOptionId = selectedOption ? selectedOption._id : null; // Extrair o _id do objeto selecionado, ou null se não encontrado
  setSelectedOptionId(selectedOptionId);
  // Agora você pode fazer o que quiser com selectedOptionId, como atribuí-lo a uma variável temporária
  // Por exemplo:
  // setTemporaryId(selectedOptionId);
};


  
  const openEditModal = (inclusion) => {
    //openCategoryModal(inclusion);
    setTemporaryId(inclusion._id);
    const lat = parseFloat(inclusion.coordinates.lat);
    const lng = parseFloat(inclusion.coordinates.lng);
    setMarkerPosition([lat, lng]);
    setTemporaryId(inclusion._id);
    setNewInclusionTitle(inclusion.name);
    setSelectedTypeOption(inclusion.type);
    setSelectedType(inclusion.type);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openCategoryModal = (inclusion) => {
    // Functionality to open modal with the inclusion data
    setTemporaryId(inclusion._id);
    setNewInclusionTitle(inclusion.title);
    setSelectedTypeOption(inclusion.type);

    console.log("Open modal for inclusion:", inclusion);
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const openGroupModal = (inclusion) => {
    // Functionality to open modal with the inclusion data
    setTemporaryId(inclusion._id);
    setNewInclusionTitle(inclusion.title);
    

    console.log("Open modal for Group:", inclusion);
    setIsGroupModalOpen(true);
  };

  const closeGroupModal = () => {
    setIsGroupModalOpen(false);
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
      const response = await axios.get('/api_/dropoff-places');
      setInclusions(prevInclusions => [...response.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataClasses = async () => {
    try {
      const response = await axios.get('/api_/classes/dropoff-places');
      // Definir classesData com os dados recebidos da resposta
      setClassesData(response.data);
      
      // Filtrar os objetos que têm a string "categories" dentro do array options
      //const filteredData = response.data.filter(item => item.options && item.options.includes("categories"));
      
      // Definir classesData com os objetos filtrados
      //setClassesData(filteredData);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  

  const closeEditCategoryModal = () => {
    setIsEditCategoryModalOpen(false);
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
    title: newInclusionTitle,
    type: selectedTypeOption
  };

  console.log(">",temporaryId);
    
    try {
      const response = await fetch(`/api_/dropoff-places/${temporaryId}`, {
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

    setNewInclusionTitle("");

    window.location.reload();

  };

  const editExecLocation = async (lat, lon) => {
    try {
        // Realiza a solicitação GET para obter os dados de localização
        const response = await fetch(`https://us1.locationiq.com/v1/reverse?key=pk.a27ec22d30a7547f775718dde28159b5&lat=${lat}&lon=${lon}&format=json`);
        const data = await response.json();

        // Verifica se a solicitação GET foi bem-sucedida
        if (response.ok) {
            // Se a solicitação GET foi bem-sucedida, extrai os dados de localização e realiza uma solicitação PUT
            const location = data;

            // Dados a serem enviados no corpo da solicitação PUT updateLoc
            const putData = {
                id: temporaryId,
                name: newInclusionTitle,
                title: location.display_name,
                address: location.address,
                coordinates: markerPosition,
                type: selectedTypeOption
            };

            console.log("Data", putData);

            // Realiza a solicitação PUT
            const putResponse = await fetch(`/api_/dropoff-places/${temporaryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(putData)
            });

            // Verifica se a solicitação PUT foi bem-sucedida
            if (putResponse.ok) {
                console.log('Solicitação PUT bem-sucedida!');
            } else {
                console.error('Erro ao realizar a solicitação PUT:', putResponse.status);
            }
        } else {
            console.error('Erro ao obter dados de localização:', response.status);
        }
    } catch (error) {
        console.error('Erro ao obter ou processar dados de localização:', error);
    }
};


  const updateGroup = async () => {

    const groupBody = {
      title: newInclusionTitle,
    };
  
    console.log(">",temporaryId);
      
      try {
        const response = await fetch(`/api_/classes/dropoff-places/${temporaryId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(groupBody),
        });
  
        if (response.ok) {
          // Inclusion updated successfully
          console.log('Group updated successfully');
        } else {
          // Handle error
          console.error('Failed to update Group');
        }
      } catch (error) {
        console.error('Error updating Group:', error);
      }
  
    window.location.reload();
  
    };
  
   

const handleRemoveInclusion = (id) => {
  // Lógica para remover uma inclusão pelo ID
  const apiUrl = '/api_/dropoff-places';
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
  // Lógica para editar uma inclusão pelo ID AutoSuggest
  const editedInclusion = inclusions.find((inclusion) => inclusion.id === id);
  // Faça algo com a inclusão editada, por exemplo, preencha um formulário de edição
};

const handleTitleChange = (e) => {
  // Lógica para atualizar o título enquanto o usuário digita
  // Por exemplo, você pode armazenar o título em um estado
  setNewInclusionTitle(e.target.value);
};

const handleAddInclusion = () => {

  const apiUrl = '/api_/dropoff-places';
  // Lógica para adicionar uma nova inclusão
  const newInclusion = {
    id: generateUniqueId(), // Implemente uma função para gerar IDs únicos
    title: newInclusionTitle,
    type: selectedTypeOption,
    additionalId: selectedOptionId
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
  window.location.reload()
};

const handleAddGroup = () => {

  const apiUrl = '/api_/classes';
  // Lógica para adicionar uma nova inclusão
  const newInclusion = {
    id: generateUniqueId(), // Implemente uma função para gerar IDs únicos
    title: newInclusionTitle,
    options: ["dropoffs"]
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
        throw new Error('Erro ao adicionar Group');
      }
      return response.json();
    })
    .then(responseData => {
      // Se a solicitação for bem-sucedida, você pode manipular a resposta aqui se necessário
      console.log('Group adicionada com sucesso:', responseData);
    })
    .catch(error => {
      // Se houver algum erro durante a solicitação, você pode lidar com isso aqui
      console.error('Erro durante a solicitação:', error.message);
    });

  // Não é mais necessário adicionar localmente, pois será feito no servidor
  // setInclusions((prevInclusions) => [...prevInclusions, newInclusion]);

  setNewInclusionTitle(''); // Limpa o título após adicionar a inclusão
  setShowAddedProductAlert(true);
  window.location.reload()
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
<Header title="Drop - Off Places 🚇" subtitle="Create and set up all the Drop - Off Places available for the Products." />
</div>
{showAddedProductAlert && (
       <Alert sx={{marginLeft: 235, width: 300}} variant="filled" severity="success">
          Pick - Up Place Added!
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
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', height: 730, width: 800, transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: 2 }} variant="h5">
                        Drop - Off Place 🚇 | Add Pick - up Place
                        </Typography>
                       
                        <div style={{ marginLeft: 'auto' }}>
                        <Button onClick={closeCategoryModal} variant="contained" sx={{marginRight:'4px'}} >
                            cancel </Button>
                        <Button onClick={getLocation} variant="contained" >
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
                             <MapContainer
                                center={markerPosition}
                                zoom={10}
                                style={{ width: '50vw', height: '30vh', marginLeft: '20px', borderRadius: '10px' }}
                              >
                                <TileLayer
                                  url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=gWxmhZ3tn1T2ihkx2CMD"
                                  attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                                />
                                <Marker
                                  position={markerPosition}
                                  draggable={true}
                                  eventHandlers={{
                                    dragend: handleMarkerDragEnd // Define o manipulador de eventos para atualizar a posição do marcador quando arrastado
                                  }}
                                  icon={getIconByType(selectedType)}
                                >
                                  <Popup>Position: {markerPosition.toString()}</Popup>
                                </Marker>
                              </MapContainer>
                              <TextField fullWidth label="Title" id="outlined-size-normal" onChange={handleTitleChange} defaultValue={newInclusionTitle} />
                             
                              <Select
                              //label="Select Cat"
                                fullWidth
                                value={selectedType}
                                onChange={handleChange}
                                style={{ minWidth: 350 }}
                              >
                                <MenuItem value="pin">Default</MenuItem>
                                <MenuItem value="pin">Attraction</MenuItem>
                                <MenuItem value="health">Health</MenuItem>
                                <MenuItem value="accomodation">Accomodation</MenuItem>
                                <MenuItem value="security">Security</MenuItem>
                                <MenuItem value="style">Style</MenuItem>
                                <MenuItem value="energy">Energy</MenuItem>
                                <MenuItem value="pdi">Pick Up & Drop - Off</MenuItem>
                                
                              </Select>
                            <FormControl fullWidth> {/* Definir fullWidth para ocupar todo o espaço disponível */}
                              <InputLabel>Select a Group</InputLabel>
                              <Select
                                fullWidth
                                value={selectedTypeOption}
                                onChange={handleOptionTypeChange}
                              >
                                {classesData && classesData.length > 0 && classesData.map((option, index) => (
                                  <MenuItem key={index} value={option.title}>
                                    {option.title}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                         <br />
                      <br />
                 </div>    
              </Box>
            </Modal>
            <Modal open={isEditModalOpen} onClose={closeEditModal}>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', height: 800, width: 800, transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: 2 }} variant="h5">
                        Drop - Off Place 🚇 | Edit Location
                        </Typography>
                       
                        <div style={{ marginLeft: 'auto' }}>
                        <Button variant="contained" sx={{marginRight:'4px'}} >
                            cancel </Button>
                        <Button onClick={editLocation} variant="contained" >
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
                             <MapContainer
                                center={markerPosition}
                                zoom={10}
                                style={{ width: '50vw', height: '30vh', marginLeft: '20px', borderRadius: '10px' }}
                              >
                                <TileLayer
                                  url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=gWxmhZ3tn1T2ihkx2CMD"
                                  attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                                />
                                <Marker
                                  position={markerPosition}
                                  draggable={true}
                                  eventHandlers={{
                                    dragend: handleMarkerDragEnd // Define o manipulador de eventos para atualizar a posição do marcador quando arrastado
                                  }}
                                  icon={accomodationIcon}
                                >
                                  <Popup>Posição do marcador: {markerPosition.toString()}</Popup>
                                </Marker>
                              </MapContainer>

                            <FormControl fullWidth> {/* Definir fullWidth para ocupar todo o espaço disponível */}
                            <TextField fullWidth label="Title" id="outlined-size-normal" onChange={handleTitleChange} defaultValue={newInclusionTitle} />
                             
                              <Select
                              //label="Select Cat"
                                fullWidth
                                value={selectedType}
                                onChange={handleChange}
                                style={{ minWidth: 350 }}
                              >
                                <MenuItem value="pin">Default</MenuItem>
                                <MenuItem value="pin">Attraction</MenuItem>
                                <MenuItem value="health">Health</MenuItem>
                                <MenuItem value="accomodation">Accomodation</MenuItem>
                                <MenuItem value="security">Security</MenuItem>
                                <MenuItem value="style">Style</MenuItem>
                                <MenuItem value="energy">Energy</MenuItem>
                                <MenuItem value="pdi">Pick Up & Drop - Off</MenuItem>
                                
                              </Select>
                              <InputLabel>Select a Group</InputLabel>
                              <Select
                                fullWidth
                                value={selectedTypeOption}
                                onChange={handleOptionTypeChange}
                              >
                                {classesData && classesData.length > 0 && classesData.map((option, index) => (
                                  <MenuItem key={index} value={option.title}>
                                    {option.title}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                         <br />
                      <br />
                 </div>    
              </Box>
            </Modal>


            <Modal open={isGroupModalOpen} onClose={closeGroupModal}>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', height: 400, width: 600, transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: 2 }} variant="h5">
                           Group 📁 | Edit
                        </Typography>
                       
                        <div style={{ marginLeft: 'auto' }}>
                        <Button onClick={closeGroupModal} variant="contained" sx={{marginRight:'4px'}} >
                            cancel </Button>
                        <Button onClick={updateGroup} variant="contained" >
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
                            <TextField fullWidth label="Title" id="outlined-size-normal" onChange={handleTitleChange} defaultValue={newInclusionTitle} />
                        
                          </Box>
                         <br />
                      <br />
                 </div>    
              </Box>
            </Modal>
          
          <br/>
          <br/>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant={showInclusions ? 'contained' : 'outlined'}
                onClick={() => toggleView(true)}
                style={{ marginRight: '8px' }}
              >
                Drop - Off Places
              </Button>
              <Button
                variant={!showInclusions ? 'contained' : 'outlined'}
                onClick={() => toggleView(false)}
              >
                Groups
              </Button>
            </div>
          <div>
            {showInclusions ? (
              <>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <SearchAutocomplete
                  inclusions={inclusions}
                  handleSelect={handleSelect}
                />
                <InclusionsTable
                  classes={classesData}
                  inclusions={inclusions}
                  selectedInclusion={selectedInclusion}
                  handleRemoveInclusion={handleRemoveInclusion}
                  handleClearSelection={handleClearSelection}
                />
                 <br />
                 </div>

          <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ flex: 1, borderBottom: '1px solid black', marginRight: '10px' }}></div>
            <h2 className="text-center">Create a New Drop - Off Place</h2>
            <div style={{ flex: 1, borderBottom: '1px solid black', marginLeft: '10px' }}></div>
          </div>
          <h4 className="text-center" style={{ color: 'gray' }}>Add a new Drop - Off Place to be added to the products.</h4>
          <br />
      
          <div>
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '20px' }}>
              <Button sx={{}} fullWidth variant="contained" color="primary" onClick={openCategoryModal}>
                Add Drop - Off Place <CheckIcon />
              </Button>
              <br />
            </div>
          </div>
          <br />
              </div>
              </>
            ) : (
              <>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <SearchAutocomplete
                  inclusions={inclusions}
                  handleSelect={handleSelect}
                />
                <GroupsTable
                  data={classesData}
                  //onEdit={updateGroup}
                  //onRemove={handleRemoveGroup}
                />
                 <br />
                 </div>

          <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ flex: 1, borderBottom: '1px solid black', marginRight: '10px' }}></div>
            <h2 className="text-center">Create a New Group</h2>
            <div style={{ flex: 1, borderBottom: '1px solid black', marginLeft: '10px' }}></div>
          </div>
          <h4 className="text-center" style={{ color: 'gray' }}>Add a new Group to be added to the products.</h4>
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
            <TextField fullWidth label="Title" id="outlined-size-normal" onChange={handleTitleChange} defaultValue="" />
          </Box>
          <div>
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '20px' }}>
              <Button sx={{}} fullWidth variant="contained" color="primary" onClick={handleAddGroup}>
                Add Group <CheckIcon />
              </Button>
              <br />
            </div>
          </div>
          <br />
              </div>
              </>
            )}
          </div>
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

