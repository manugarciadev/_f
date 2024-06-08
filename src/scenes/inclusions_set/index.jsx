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
import {Checkbox, FormControlLabel, FormLabel, InputAdornment, TextField, ModalDialog, DialogTitle, DialogContent, DialogActions, Dialog, Modal } from '@mui/material';
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
import Flag from 'react-flagkit';




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
  const [filteredInclusions, setFilteredInclusions] = useState([]);
  const [selectedInclusion, setSelectedInclusion] = useState(null);
  const [temporaryId, setTemporaryId] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [hoveredLanguage, setHoveredLanguage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSelect = (inclusion) => {
    setSelectedInclusion(inclusion);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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

const removeLanguage = (languageCode) => {
  const updatedSelectedLanguages = selectedLanguages.filter(language => language.code !== languageCode);
  setSelectedLanguages(updatedSelectedLanguages);
};

const GroupsTable = ({ data }) => {

  const handleRemoveGroup = (id) => {
    // Lógica para remover uma inclusão pelo ID
    const apiUrl = '/api_/classes/inclusions';
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
    openCategoryModal(inclusion);
  };

  const openCategoryModal = (inclusion) => {
    // Functionality to open modal with the inclusion data
    setTemporaryId(inclusion._id);
    setNewInclusionTitle(inclusion.title);
    setSelectedTypeOption(inclusion.type);
    setSelectedLanguages(inclusion.languages);

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
      const response = await axios.get('/api_/inclusions');
      setInclusions(prevInclusions => [...response.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataClasses = async () => {
    try {
      const response = await axios.get('/api_/classes/inclusions');
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


const getLanguageName = (code) => {
  switch (code) {
      case 'AF':
          return 'Afeganistão';
      case 'AL':
          return 'Albânia';
      case 'DZ':
          return 'Argélia';
      case 'AS':
          return 'Samoa Americana';
      case 'AD':
          return 'Andorra';
      case 'AO':
          return 'Angola';
      case 'AI':
          return 'Anguilla';
      case 'AQ':
          return 'Antártida';
      case 'AG':
          return 'Antígua e Barbuda';
      case 'AR':
          return 'Argentina';
      case 'AM':
          return 'Armênia';
      case 'AW':
          return 'Aruba';
      case 'AU':
          return 'Austrália';
      case 'AT':
          return 'Áustria';
      case 'AZ':
          return 'Azerbaijão';
      case 'BS':
          return 'Bahamas';
      case 'BH':
          return 'Bahrein';
      case 'BD':
          return 'Bangladesh';
      case 'BB':
          return 'Barbados';
      case 'BY':
          return 'Belarus';
      case 'BE':
          return 'Bélgica';
      case 'BZ':
          return 'Belize';
      case 'BJ':
          return 'Benin';
      case 'BM':
          return 'Bermudas';
      case 'BT':
          return 'Butão';
      case 'BO':
          return 'Bolívia';
      case 'BQ':
          return 'Bonaire, Santo Eustáquio e Saba';
      case 'BA':
          return 'Bósnia e Herzegovina';
      case 'BW':
          return 'Botsuana';
      case 'BV':
          return 'Ilha Bouvet';
      case 'BR':
          return 'Brasil';
      case 'IO':
          return 'Território Britânico do Oceano Índico';
      case 'BN':
          return 'Brunei Darussalam';
      case 'BG':
          return 'Bulgária';
      case 'BF':
          return 'Burkina Faso';
      case 'BI':
          return 'Burundi';
      case 'CV':
          return 'Cabo Verde';
      case 'KH':
          return 'Camboja';
      case 'CM':
          return 'Camarões';
      case 'CA':
          return 'Canadá';
      case 'KY':
          return 'Ilhas Cayman';
      case 'CF':
          return 'República Centro-Africana';
      case 'TD':
          return 'Chade';
      case 'CL':
          return 'Chile';
      case 'CN':
          return 'China';
      case 'CX':
          return 'Ilha Christmas';
      case 'CC':
          return 'Ilhas Cocos (Keeling)';
      case 'CO':
          return 'Colômbia';
      case 'KM':
          return 'Comores';
      case 'CG':
          return 'Congo';
      case 'CD':
          return 'República Democrática do Congo';
      case 'CK':
          return 'Ilhas Cook';
      case 'CR':
          return 'Costa Rica';
      case 'HR':
          return 'Croácia';
      case 'CU':
          return 'Cuba';
      case 'CW':
          return 'Curaçao';
      case 'CY':
          return 'Chipre';
      case 'CZ':
          return 'República Tcheca';
      case 'CI':
          return 'Costa do Marfim';
      case 'DK':
          return 'Dinamarca';
      case 'DJ':
          return 'Djibouti';
      case 'DM':
          return 'Dominica';
      case 'DO':
          return 'República Dominicana';
      case 'EC':
          return 'Equador';
      case 'EG':
          return 'Egito';
      case 'SV':
          return 'El Salvador';
      case 'GQ':
          return 'Guiné Equatorial';
      case 'ER':
          return 'Eritréia';
      case 'EE':
          return 'Estônia';
      case 'SZ':
          return 'Essuatíni';
      case 'ET':
          return 'Etiópia';
      case 'FK':
          return 'Ilhas Falkland (Malvinas)';
      case 'FO':
          return 'Ilhas Faroe';
      case 'FJ':
          return 'Fiji';
      case 'FI':
          return 'Finlândia';
      case 'FR':
          return 'França';
      case 'GF':
          return 'Guiana Francesa';
      case 'PF':
          return 'Polinésia Francesa';
      case 'TF':
          return 'Territórios Franceses do Sul';
      case 'GA':
          return 'Gabão';
      case 'GM':
          return 'Gâmbia';
      case 'GE':
          return 'Geórgia';
      case 'DE':
          return 'Alemanha';
      case 'GH':
          return 'Gana';
      case 'GI':
          return 'Gibraltar';
      case 'GR':
          return 'Grécia';
      case 'GL':
          return 'Groenlândia';
      case 'GD':
          return 'Granada';
      case 'GP':
          return 'Guadalupe';
      case 'GU':
          return 'Guam';
      case 'GT':
          return 'Guatemala';
      case 'GG':
          return 'Guernsey';
      case 'GN':
          return 'Guiné';
      case 'GW':
          return 'Guiné-Bissau';
      case 'GY':
          return 'Guiana';
      case 'HT':
          return 'Haiti';
      case 'HM':
          return 'Ilha Heard e Ilhas McDonald';
      case 'VA':
          return 'Santa Sé';
      case 'HN':
          return 'Honduras';
      case 'HK':
          return 'Hong Kong';
      case 'HU':
          return 'Hungria';
      case 'IS':
          return 'Islândia';
      case 'IN':
          return 'Índia';
      case 'ID':
          return 'Indonésia';
      case 'IR':
          return 'Irã';
      case 'IQ':
          return 'Iraque';
      case 'IE':
          return 'Irlanda';
      case 'IM':
          return 'Ilha de Man';
      case 'IL':
          return 'Israel';
      case 'IT':
          return 'Itália';
      case 'JM':
          return 'Jamaica';
      case 'JP':
          return 'Japão';
      case 'JE':
          return 'Jersey';
      case 'JO':
          return 'Jordânia';
      case 'KZ':
          return 'Cazaquistão';
      case 'KE':
          return 'Quênia';
      case 'KI':
          return 'Kiribati';
      case 'KP':
          return 'Coreia do Norte';
      case 'KR':
          return 'Coreia do Sul';
      case 'KW':
          return 'Kuwait';
      case 'KG':
          return 'Quirguistão';
      case 'LA':
          return 'Laos';
      case 'LV':
          return 'Letônia';
      case 'LB':
          return 'Líbano';
      case 'LS':
          return 'Lesoto';
      case 'LR':
          return 'Libéria';
      case 'LY':
          return 'Líbia';
      case 'LI':
          return 'Liechtenstein';
      case 'LT':
          return 'Lituânia';
      case 'LU':
          return 'Luxemburgo';
      case 'MO':
          return 'Macau';
      case 'MG':
          return 'Madagáscar';
      case 'MW':
          return 'Malaui';
      case 'MY':
          return 'Malásia';
      case 'MV':
          return 'Maldivas';
      case 'ML':
          return 'Mali';
      case 'MT':
          return 'Malta';
      case 'MH':
          return 'Ilhas Marshall';
      case 'MQ':
          return 'Martinica';
      case 'MR':
          return 'Mauritânia';
      case 'MU':
          return 'Maurício';
      case 'YT':
          return 'Mayotte';
      case 'MX':
          return 'México';
      case 'FM':
          return 'Micronésia';
      case 'MD':
          return 'Moldávia';
      case 'MC':
          return 'Mônaco';
      case 'MN':
          return 'Mongólia';
      case 'ME':
          return 'Montenegro';
      case 'MS':
          return 'Montserrat';
      case 'MA':
          return 'Marrocos';
      case 'MZ':
          return 'Moçambique';
      case 'MM':
          return 'Myanmar';
      case 'NA':
          return 'Namíbia';
      case 'NR':
          return 'Nauru';
      case 'NP':
          return 'Nepal';
      case 'NL':
          return 'Países Baixos';
      case 'NC':
          return 'Nova Caledônia';
      case 'NZ':
          return 'Nova Zelândia';
      case 'NI':
          return 'Nicarágua';
      case 'NE':
          return 'Níger';
      case 'NG':
          return 'Nigéria';
      case 'NU':
          return 'Niue';
      case 'NF':
          return 'Ilha Norfolk';
      case 'MK':
          return 'Macedônia do Norte';
      case 'MP':
          return 'Ilhas Marianas do Norte';
      case 'NO':
          return 'Noruega';
      case 'OM':
          return 'Omã';
      case 'PK':
          return 'Paquistão';
      case 'PW':
          return 'Palau';
      case 'PS':
          return 'Território da Palestina';
      case 'PA':
          return 'Panamá';
      case 'PG':
          return 'Papua Nova Guiné';
      case 'PY':
          return 'Paraguai';
      case 'PE':
          return 'Peru';
      case 'PH':
          return 'Filipinas';
      case 'PN':
          return 'Pitcairn';
      case 'PL':
          return 'Polônia';
      case 'PT':
          return 'Portugal';
      case 'PR':
          return 'Porto Rico';
      case 'QA':
          return 'Catar';
      case 'RE':
          return 'Reunião';
      case 'RO':
          return 'Romênia';
      case 'RU':
          return 'Rússia';
      case 'RW':
          return 'Ruanda';
      case 'BL':
          return 'Saint Barthélemy';
      case 'SH':
          return 'Santa Helena, Ascensão e Tristão da Cunha';
      case 'KN':
          return 'Saint Kitts e Nevis';
      case 'LC':
          return 'Santa Lúcia';
      case 'MF':
          return 'Saint Martin (parte francesa)';
      case 'PM':
          return 'Saint Pierre e Miquelon';
      case 'VC':
          return 'São Vicente e Granadinas';
      case 'WS':
          return 'Samoa';
      case 'SM':
          return 'San Marino';
      case 'ST':
          return 'São Tomé e Príncipe';
      case 'SA':
          return 'Arábia Saudita';
      case 'SN':
          return 'Senegal';
      case 'RS':
          return 'Sérvia';
      case 'SC':
          return 'Seychelles';
      case 'SL':
          return 'Serra Leoa';
      case 'SG':
          return 'Singapura';
      case 'SX':
          return 'Sint Maarten (parte holandesa)';
      case 'SK':
          return 'Eslováquia';
      case 'SI':
          return 'Eslovênia';
      case 'SB':
          return 'Ilhas Salomão';
      case 'SO':
          return 'Somália';
      case 'ZA':
          return 'África do Sul';
      case 'GS':
          return 'Ilhas Geórgia do Sul e Sandwich do Sul';
      case 'SS':
          return 'Sudão do Sul';
      case 'ES':
          return 'Espanha';
      case 'LK':
          return 'Sri Lanka';
      case 'SD':
          return 'Sudão';
      case 'SR':
          return 'Suriname';
      case 'SJ':
          return 'Svalbard e Jan Mayen';
      case 'SE':
          return 'Suécia';
      case 'CH':
          return 'Suíça';
      case 'SY':
          return 'Síria';
      case 'TW':
          return 'Taiwan';
      case 'TJ':
          return 'Tajiquistão';
      case 'TZ':
          return 'Tanzânia';
      case 'TH':
          return 'Tailândia';
      case 'TL':
          return 'Timor-Leste';
      case 'TG':
          return 'Togo';
      case 'TK':
          return 'Tokelau';
      case 'TO':
          return 'Tonga';
      case 'TT':
          return 'Trindade e Tobago';
      case 'TN':
          return 'Tunísia';
      case 'TR':
          return 'Turquia';
      case 'TM':
          return 'Turcomenistão';
      case 'TC':
          return 'Ilhas Turks e Caicos';
      case 'TV':
          return 'Tuvalu';
      case 'UG':
          return 'Uganda';
      case 'UA':
          return 'Ucrânia';
      case 'AE':
          return 'Emirados Árabes Unidos';
      case 'GB':
          return 'Reino Unido';
      case 'US':
          return 'Estados Unidos';
      case 'UM':
          return 'Ilhas Menores Distantes dos Estados Unidos';
      case 'UY':
          return 'Uruguai';
      case 'UZ':
          return 'Uzbequistão';
      case 'VU':
          return 'Vanuatu';
      case 'VE':
          return 'Venezuela';
      case 'VN':
          return 'Vietnã';
      case 'VG':
          return 'Ilhas Virgens Britânicas';
      case 'VI':
          return 'Ilhas Virgens Americanas';
      case 'WF':
          return 'Wallis e Futuna';
      case 'EH':
          return 'Saara Ocidental';
      case 'YE':
          return 'Iêmen';
      case 'ZM':
          return 'Zâmbia';
      case 'ZW':
          return 'Zimbábue';
      default:
          return '';
  }
};

const translateText = async (targetLang, targetText) => {
  const options = {
    method: 'POST',
    url: 'https://swift-translate.p.rapidapi.com/translate',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '61ac3cf5c0mshd278aec1da3dbfdp15af41jsn3ecbf3ce9154',
      'X-RapidAPI-Host': 'swift-translate.p.rapidapi.com'
    },
    data: {
      text: targetText, // Texto que você quer traduzir
      sourceLang: 'en', // Código da língua de origem (sempre em inglês)
      targetLang: targetLang // Código da língua de destino
    }
  };

  try {
    const response = await axios.request(options);
    const translatedText = response.data.translatedText;
    const newSelectedLanguages = [...selectedLanguages, { code: targetLang.toUpperCase(), text: translatedText }];
    setSelectedLanguages(newSelectedLanguages);
    console.log(">>>",selectedLanguages);
  } catch (error) {
    console.error('Erro ao traduzir o texto:', error);
  }
};

const toggleLanguageSelection = (targetLang, targetText) => {

  if (!newInclusionTitle) {
    setOpenDialog(true);
    return; // Se newInclusionTitle estiver vazio, abre o diálogo e sai da função
  }

  // Verifica se a linguagem já está selecionada
  const isSelected = selectedLanguages.some(language => language.code === targetLang);

  // Se estiver selecionada, remove da lista
  if (isSelected) {
    const updatedSelectedLanguages = selectedLanguages.filter(language => language.code !== targetLang);
    setSelectedLanguages(updatedSelectedLanguages);
  } else { // Se não estiver selecionada, traduz e adiciona à lista translate
    translateText(targetLang, targetText);
  }
};


  const updateInclusion = async () => {

  const inclusionBody = {
    title: newInclusionTitle,
    type: selectedTypeOption
  };

  console.log(">",temporaryId);
    
    try {
      const response = await fetch(`/api_/inclusions/${temporaryId}`, {
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

  const updateGroup = async () => {

    const groupBody = {
      title: newInclusionTitle,
    };
  
    console.log(">",temporaryId);
      
      try {
        const response = await fetch(`/api_/classes/inclusions/${temporaryId}`, {
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
  const apiUrl = '/api_/inclusions';
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

  const apiUrl = '/api_/inclusions';
  // Lógica para adicionar uma nova inclusão
  const newInclusion = {
    id: generateUniqueId(), // Implemente uma função para gerar IDs únicos
    title: newInclusionTitle,
    type: selectedTypeOption,
    additionalId: selectedOptionId,
    languages: selectedLanguages
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
    options: ["inclusions"]
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
<Header title="Inclusions ✅" subtitle="Create and set up all the Inclusions available for the Products." />
</div>
{showAddedProductAlert && (
       <Alert sx={{marginLeft: 235, width: 300}} variant="filled" severity="success">
          Category Added!
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
                           Inclusion ✅ | Edit
                        </Typography>
                       
                        <div style={{ marginLeft: 'auto' }}>
                        <Button onClick={closeCategoryModal} variant="contained" sx={{marginRight:'4px'}} >
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
                              <List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
                                {selectedLanguages.map((language) => (
                                  <ListItem
                                    sx={{marginTop: 10 ,height: 20}}
                                    key={language.code}
                                    onMouseEnter={() => setHoveredLanguage(language)}
                                    onMouseLeave={() => setHoveredLanguage(null)}
                                    //button
                                    //onClick={() => openLangModal(language)}
                                    secondaryAction={<button onClick={() => removeLanguage(language.code)}>X</button>}
                                  >
                                    <Flag country={language.code.toUpperCase()} />
                                    {hoveredLanguage === language && (
                                      <span title={""}>{language.text}</span>
                                    )}
                                  </ListItem>
                                ))}
                                </List>
                              <Divider/>
                              <TextField fullWidth label="Title" id="outlined-size-normal" onChange={handleTitleChange} defaultValue={newInclusionTitle} />
                              <FormControl fullWidth> {/* Definir fullWidth para ocupar todo o espaço disponível */}
                                <InputLabel>Select a Class</InputLabel>
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
                              <List
                                  id="language-list"
                                  style={{
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                  }}
                                >
                                  {['pt', 'en', 'fr', 'es', 'de'].map((language) => (
                                    <ListItem
                                      key={language}
                                      onClick={() => toggleLanguageSelection(language, newInclusionTitle)} // Chamada da função de tradução ou remoção ao clicar
                                      button
                                      selected={selectedLanguages.some(lang => lang.code === language)} // Verifica se a linguagem está selecionada
                                    >
                                      <ListItemText>
                                        <Flag country={language.toUpperCase()} /> {getLanguageName(language.toUpperCase())}
                                      </ListItemText>
                                    </ListItem>
                                  ))}
                                </List>
                                <Dialog open={openDialog} onClose={handleCloseDialog}>
                                  <DialogTitle>Aviso</DialogTitle>
                                  <DialogContent>
                                    Por favor, escreva o "Inclusion" antes de selecionar um idioma.
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleCloseDialog}>OK</Button>
                                  </DialogActions>
                                </Dialog>
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
                Inclusions
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
            <h2 className="text-center">Create a New Inclusion</h2>
            <div style={{ flex: 1, borderBottom: '1px solid black', marginLeft: '10px' }}></div>
          </div>
          <h4 className="text-center" style={{ color: 'gray' }}>Add a new inclusion to be added to the products.</h4>
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
            <List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
              {selectedLanguages.map((language) => (
                <ListItem
                  sx={{marginTop: 10 ,height: 20}}
                  key={language.code}
                  onMouseEnter={() => setHoveredLanguage(language)}
                  onMouseLeave={() => setHoveredLanguage(null)}
                  //button
                  //onClick={() => openLangModal(language)}
                  secondaryAction={<button onClick={() => removeLanguage(language.code)}>X</button>}
                >
                  <Flag country={language.code.toUpperCase()} />
                  {hoveredLanguage === language && (
                    <span title={""}>{language.text}</span>
                  )}
                </ListItem>
              ))}
              </List>
             <Divider/>
            <TextField fullWidth label="Title" id="outlined-size-normal" onChange={handleTitleChange} defaultValue={newInclusionTitle} />
            <FormControl fullWidth> {/* Definir fullWidth para ocupar todo o espaço disponível */}
              <InputLabel>Select a Class</InputLabel>
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
            <List
            fu
                id="language-list"
                style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {['pt', 'en', 'fr', 'es', 'de'].map((language) => (
                  <ListItem
                    key={language}
                    onClick={() => toggleLanguageSelection(language, newInclusionTitle)} // Chamada da função de tradução ou remoção ao clicar
                    button
                    selected={selectedLanguages.some(lang => lang.code === language)} // Verifica se a linguagem está selecionada language.code.toUpperCase()
                  >
                    <ListItemText>
                      <Flag country={language.toUpperCase()} /> {getLanguageName(language.toUpperCase())}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Aviso</DialogTitle>
                <DialogContent>
                  Por favor, escreva o "Inclusion" antes de selecionar um idioma.
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>OK</Button>
                </DialogActions>
              </Dialog>
          </Box>
          <div>
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '20px' }}>
              <Button sx={{}} fullWidth variant="contained" color="primary" onClick={handleAddInclusion}>
                  Add Inclusion <CheckIcon />
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

