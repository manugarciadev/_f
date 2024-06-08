import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Alert,
  List,
  ListItem,
  ListItemText,
  Select,
  InputLabel,
  Tab,
  Tabs,

} from "@mui/material";
import PropTypes from 'prop-types';
import { tokens } from "../../theme";
import { v4 as uuidv4 } from 'uuid';
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Stepper, Step, StepLabel, IconButton } from '@mui/material';
import { Person, Email, Phone, Done } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import './product_activity_form.css';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import axios from 'axios';
import { CircularProgress, FormLabel } from '@mui/material';
import icon from "./img/icon.png";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import TranslateIcon from '@mui/icons-material/Translate';
import Fab from '@mui/material/Fab';
import Flag from 'react-flagkit';
import Slider from '@mui/material/Slider';
import Autosuggest from 'react-autosuggest';

import {
  MapContainer,
  TileLayer,
  Polygon
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from './data';
import { Container, Grid, Paper } from '@mui/material';
import success from "./success.png";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import EditIcon from '@mui/icons-material/Edit';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ExtensionIcon from '@mui/icons-material/Extension';


const rates = [
  { id: 1, title: 'Rate 1' },
  { id: 2, title: 'Rate 2' },
  { id: 3, title: 'Rate 3' },
];

const steps = [
  { label: 'Basic Information', icon: <Person /> },
  { label: 'Media & Description', icon: <Email /> },
  { label: 'Start Time & Duration', icon: <Email /> },
  { label: 'Inclusions & Exclusions', icon: <Phone /> },
  { label: 'Pricing', icon: <Phone /> },
  { label: 'Important Information', icon: <Phone /> },
  { label: 'Tasks & Resources', icon: <Phone /> },
  { label: 'Finished', icon: <Done /> },
];


const ageRanges = [
  { id: 1, title: 'Child (0-18)', status: 'Active 🟢' },
  { id: 2, title: 'Youth(19-35)', status: 'Active 🟢' },
  { id: 3, title: 'Adult(36-50)', status: 'Active 🟢' },

];



function SeasonPriceEditor({ seasons, onSeasonPriceChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSeasonIndex, setCurrentSeasonIndex] = useState(null);
  const [price, setPrice] = useState('');

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setCurrentSeasonIndex(index);
    setPrice(seasons[index].price);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentSeasonIndex(null);
    setPrice('');
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };


  const handleSave = () => {
    if (currentSeasonIndex !== null) {
      onSeasonPriceChange(currentSeasonIndex, price);
      handleClose();
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={(event) => handleClick(event, 0)} // Use o índice 0 para abrir todas as estações
      >
        Seasons
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {seasons.map((season, index) => (
          <MenuItem key={index}>
            <div>
              <span>
                {season.inicialMonth} - {season.finalMonth}
              </span>
              <TextField
                label="Preço"
                value={price}
                onChange={handlePriceChange}
              />
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}




const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


const SelectableItems = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems((prevSelected) => [...prevSelected, item]);
    }
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item}>
          <input
            type="checkbox"
            checked={selectedItems.includes(item)}
            onChange={() => handleItemChange(item)}
          />
          <label>{item}</label>
        </div>
      ))}
    </div>
  );
};


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



const ModalContent = ({ categories, themes }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((c) => c !== category)
      );
    } else {
      setSelectedCategories((prevSelected) => [...prevSelected, category]);
    }
  };

  const handleThemeChange = (theme) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes((prevSelected) =>
        prevSelected.filter((t) => t !== theme)
      );
    } else {
      setSelectedThemes((prevSelected) => [...prevSelected, theme]);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width:"200px" }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Categories</Typography>
        {categories.map((category) => (
          <Box key={category} sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <Typography>{category}</Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ width: "100%" }} />
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h6">Themes</Typography>
        {themes.map((theme) => (
          <Box key={theme} sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={selectedThemes.includes(theme)}
              onChange={() => handleThemeChange(theme)}
            />
            <Typography>{theme}</Typography>
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mt: 2 }}
      >
        Adicionar
      </Button>
    </Box>
  );
};



const center = [15.166214,-23.555734]; // 15.166214, -23.555734


const initialExamples = [
  {
    title: "Example Cancellation Policy 1",
    type: "SomeType",
    rules: [
      {
        day: "Monday",
        hour: "10:00 AM",
        percentage: "10%"
      },
      {
        day: "Tuesday",
        hour: "11:00 AM",
        percentage: "20%"
      }
    ]
  },
  // Adicione mais exemplos conforme necessário
];

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  const [testesData, setTestesData] = useState([
    { "_id": 1, "title": "Portuguese" },
    { "_id": 2, "title": "English" },
    { "_id": 3, "title": "Spanish" },
    // Adicione mais idiomas conforme necessário
  ]);


const {data} = props;

  useEffect(() => {
    // Simule um atraso para demonstração
    handleGenerateFields();
    // >>>
    fetchDataClasses();
    fetchDataCancellationPolicys();
    fetchDataGroups();
    fetchDataInclusions();
    fetchDataExclusions();
    fetchDataCategories();
    fetchDataThemes();
    fetchDataAgeRange();
    fetchDataLanguages();
    fetchDataWhatToBring();
    setTimeout(() => {
    setIsLoading(false); // Defina isLoading como false após o atraso
}, 2000); // Tempo de atraso em milissegundos cancellationPolicys
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [openEditRate, setOpenEditRate] = useState(false);
  const [openThemes, setOpenThemes] = useState(false);
  const [openResourcesModal, setOpenResourcesModal] = useState(false);
  const [openStartTimeModal, setOpenStartTimeModal] = useState(false);
  const [openEditTasksModal, setOpenEditTasksModal] = useState(false);
  const [openTasksModal, setOpenTasksModal] = useState(false);    
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [value, setValue] = useState(0);
  const [idTask, setIdTask] = useState('');
  // idTask
  const [openCategories, setOpenCategories] = useState(false);
  const [openCancellationPolicys, setOpenCancellationPolicys] = useState(false);
  const [draggedImages, setDraggedImages] = useState([]);
  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState(0);
  const [inicialHour, setInicialHour] = useState(0);
  const [inicialMinute, setInicialMinute] = useState(0);
  const [containerHeight, setContainerHeight] = useState('200px');
  const [maxParticipants, setMaxParticipants] = useState(4);
  const [minParticipants, setMinParticipants] = useState(0); // Adicione esta linha
  const [prices, setPrices] = useState({});
  const [price, setPrice] = useState();
  const [descount, setDescount] = useState();
  // >>> 
  const [selectedInclusions, setSelectedInclusions] = useState(data.inclusions);
  const [selectedExclusions, setSelectedExclusions] = useState(data.exclusions);
  const [selectedCategories, setSelectedCategories] = useState(data.categories);
  const [selectedThemes, setSelectedThemes] = useState(data.themes);
  const [selectedLanguages, setSelectedLanguages] = useState(data.languagesAvailable);
  const [selectedPresentLanguages, setSelectedPresentLanguages] = useState(data.languagesPresent);
  const [selectedConstraintLanguages, setSelectedConstraintLanguages] = useState(data.languagesAvailable);
  const [selectedRateLanguages, setSelectedRateLanguages] = useState([]);
  const [selectedCancellationPolicys, setSelectedCancellationPolicys] = useState([]);
  // >>> 
  const [openInclusions, setOpenInclusions] = useState(false);
  const [openExclusions, setOpenExclusions] = useState(false);
  const [openKnowBeforeYouGo, setOpenKnowBeforeYouGo] = useState(false);
  const [openLanguages, setOpenLanguages] = useState(false);
  const [rateTitle, setRateTitle] = useState('');
  const [showPricePerPerson, setShowPricePerPerson] = useState(false);
  const [showPricePerGroup, setShowPricePerGroup] = useState(false);
  const [pricePerGroup, setPricePerGroup] = useState([]);
  const [minParticipantsPerGroup, setMinParticipantsPerGroup] = useState('');
  const [maxParticipantsPerGroup, setMaxParticipantsPerGroup] = useState('');
  const [pricePerGroupSingular, setPricePerGroupSingular] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [productData, setProductData] = useState(null);
  const [selectedLanguageDetails, setSelectedLanguageDetails] = useState(null);
  const [titleTask, setTitleTask] = useState('');
  const [descriptionTask, setDescriptionTask] = useState('');
  // >>> Form fieling fields
  const [code, setCode] = useState(data.code);
  const [title, setTitle] = useState('');
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [second, setSecond] = useState(0);
  // >>>
  const [minuteDuration, setMinuteDuration] = useState(0);
  const [hourDuration, setHourDuration] = useState(0);
  const [secondDuration, setSecondDuration] = useState(0);
  // >>>
  const [minute, setMinute] = useState(0);
  const [localization, setLocalization] = useState('');
  const [categoriesForTrip, setCategoriesForTrip] = useState(null);
  const [themes, setThemes] = useState(null);
  const [cancellationPolicys, setCancellationPolicys] = useState(null)
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [image, setImage] = useState();
  const [video, setVideo] = useState(null);
  const [rates, setRates] = useState([]);
  const [productRates, setProductRates] = useState(data.rates);
  const [productEditTasks, setProductEditTasks] = useState(null);
  const [inclusions, setInclusions] = useState();
  const [inclusionsDescription, setInclusionsDescription] = useState('');
  const [exclusions, setExclusions] = useState();
  const [exclusionsDescription, setExclusionsDescription] = useState('');
  const [languagesSelected, setLanguagesSelected] = useState();
  //const [, set] = useState();
  //const [price, setPrice] = useState();
  const [knowBeforeYouGo, setKnowBeforeYouGo] = useState();
  const [knowBeforeYouGoDescription, setKnowBeforeYouGoDescription] = useState('');
  const [whatToBring, setWhatToBring] = useState('');
  const [cancelationPolicy, setCancelationPolicy] = useState();
  const [minIntegrantes, setMinIntegrantes] = useState('');
  const [maxIntegrantes, setMaxIntegrantes] = useState('');
  const [categories, setCategories] = useState([
    { title: 'Adult', startAge: 18, endAge: 99 },
    { title: 'Child', startAge: 3, endAge: 12 },
  ]);
  const [camposGerados, setCamposGerados] = useState({});
  const [generatedArray, setGeneratedArray] = useState([]);
  const [allRates, setAllRates] = useState(null);
  const ages = [22,33,18,7,30];
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [language, setLanguage] = useState('');
  const [languages, setLanguages] = useState(data.languages);
  const [productInclusions, setProductInclusions] = useState(null);
  const [productExclusions, setProductExclusions] = useState(null);
  const [productLanguages, setProductLanguages] = useState(null);
  const [ageRangesData, setAgeRangesData] = useState(null);
  const [productCategories, setProductCategories] = useState(null);
  const [productThemes, setProductThemes] = useState(null);
  const [productWhatToBring, setProductWhatToBring] = useState(null);
  const [selectedWhatToBrings, setSelectedWhatToBrings] = useState(data.whatToBring);
  const [selectedTimes, setSelectedTimes] = useState(data.startTimes);
  const [selectedStartTimes, setSelectedStartTimes] = useState([]);
  const [isLanguageFormVisible, setIsLanguageFormVisible] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [groupsData, setGroupsData] = useState();
  const [classesData, setClassesData] = useState();
  const [selectedClass, setSelectedClass] = useState('');
  const [temporaryRate, setTemporaryRate] = useState(null);
  const [temporaryIndex, setTemporaryIndex] = useState(null);
  const [selectedTourType, setSelectedTourType] = useState(data.rateType);
   const allCountryCodes = [
    "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"
];

const SearchAutocomplete = ({ options, handleSelect, toggleConstraintLanguageSelection }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const filteredSuggestions = inputLength === 0 ? [] : options.filter(option =>
      getLanguageName(option).toLowerCase().includes(inputValue)
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
    setValue('');
  };

  const handleSearch = (searchTerm) => {
    // Aqui você pode adicionar a lógica para lidar com a seleção
    console.log('Selecionado:', searchTerm);
  };

  const inputProps = {
    placeholder: 'Pesquisar',
    value,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
  };

  const renderSuggestion = (suggestion) => (
    <ListItem button onClick={() => handleSelect(suggestion)}>
      <ListItemText primary={getLanguageName(suggestion)} onClick={() => toggleConstraintLanguageSelection(suggestion)} />
    </ListItem>
  );

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      renderInputComponent={(inputProps) => <TextField {...inputProps} variant="outlined" fullWidth />}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <Paper {...containerProps} square>
        <List style={{ maxHeight: '202px', overflowY: 'auto' }}>{children}</List>
      </Paper>
      )}
    />
  );
};
  

const selectClass = (option) => { setSelectedClass(option); console.log(selectClass); }
 

 TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

 const handleRemoveSubtask = (index) => {
  const updatedSubtasks = [...subtasks];
  updatedSubtasks.splice(index, 1); // Remove a subtarefa na posição index
  setSubtasks(updatedSubtasks);
};


  const handleAddSubtask = () => {
    setSubtasks([...subtasks, '']); // Adicionando uma nova subtarefa vazia ao estado de subtarefas
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openLangModal = (lg) => {

    console.log(">:",languages);
    
    const languageDetails = {
      code: lg,
      name: getLanguageName(lg),
    };
    setSelectedLanguageDetails(languageDetails);

    setIsLangModalOpen(true);
    console.log(selectedLanguageDetails, isLangModalOpen);

    supportLanguage.title = languages.find(language => language.code === lg).title;
    supportLanguage.shortDescription = languages.find(language => language.code === lg).shortDescription;
    supportLanguage.longDescription = languages.find(language => language.code === lg).longDescription;
    
    
  };

  const closeLangModal = () => {
    setIsLangModalOpen(false);
    setSupportLanguage({
      title: '',
      shortDescription: '',
      longDescription: '',
    });
  };
  
// handleAdd
  const [newLanguage, setNewLanguage] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    language: '',
  });

  let [supportLanguage, setSupportLanguage] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    language: '',
  });

  
  const [seasons, setSeasons] = useState([
    { inicialMonth: 'September', finalMonth: 'Outubro', price: '' },
    { inicialMonth: 'March', finalMonth: 'August', price: '' },
    { inicialMonth: 'Outober', finalMonth: 'November', price: '' }
    // Outras estações do ano
  ]);
   const [examples, setExamples] = useState(null);
  const [selectedPolicies, setSelectedPolicies] = useState([]);

  const handleDebugCp = () => {console.log(selectedPolicies)};

  const handlePolicySelection = (exampleIndex) => {
    const selectedPolicy = examples[exampleIndex];
    setSelectedPolicies([...selectedPolicies, selectedPolicy]);
  };
  
  const handlePricePerPersonChange = () => {
    setShowPricePerPerson(!showPricePerPerson);
    setShowPricePerGroup(false); // Garante que o outro switch seja desmarcado
  };

  const handlePricePerGroupChange = () => {
    setShowPricePerGroup(!showPricePerGroup);
    setShowPricePerPerson(false); // Garante que o outro switch seja desmarcado
  };

  const handleAddPricePerGroup = () => {
    const newPrice = {
      min: minParticipantsPerGroup,
      max: maxParticipantsPerGroup,
      price: pricePerGroupSingular,
    };
  
    setPricePerGroup([...pricePerGroup, newPrice]);
    
    // Limpar os campos após adicionar
    setMinParticipantsPerGroup('');
    setMaxParticipantsPerGroup('');
    setPricePerGroupSingular('');
  };
  
  const handleSeasonPriceChange = (index, newPrice) => {
    const updatedSeasons = [...seasons];
    updatedSeasons[index].price = newPrice;
    setSeasons(updatedSeasons);
  };

  const handleDeleteLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1); // Remove the language at the given index
    setLanguages(updatedLanguages);
  };

  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (language) => {
    setLanguage(language)
    setSelectedLanguage(language);
    setAnchorEl(null);
    setIsLanguageFormVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLanguage((prevLanguage) => ({
      ...prevLanguage,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSupportLanguage((prevLanguage) => ({
      ...prevLanguage,
      [name]: value
    }));
  };


  const handleEditLanguage = (title, shortDescription, longDescription) => {
    // Verifique se o idioma selecionado existe no array
    const editedLanguageIndex = languages.findIndex(language => language.language === selectedLanguageDetails.name);
    
    if (editedLanguageIndex !== -1) {
      // Faça uma cópia do array de idiomas
      const updatedLanguages = [...languages];
      
      // Obtenha o idioma editado
      const editedLanguage = updatedLanguages[editedLanguageIndex];
      
      // Atualize os campos com os valores de newLanguage se eles estiverem vazios
      const updatedTitle = newLanguage.title !== '' ? newLanguage.title : title;
      const updatedShortDescription = newLanguage.shortDescription !== '' ? newLanguage.shortDescription : shortDescription;
      const updatedLongDescription = newLanguage.longDescription !== '' ? newLanguage.longDescription : longDescription;
      
      // Atualize o objeto do idioma no array com os novos valores
      updatedLanguages[editedLanguageIndex] = {
        ...editedLanguage,
        title: updatedTitle,
        shortDescription: updatedShortDescription,
        longDescription: updatedLongDescription
      };
      
      // Atualize o estado com o novo array de idiomas
      setLanguages(updatedLanguages);
    }
    
    // Feche o modal
    closeLangModal();

    // Limpe os campos de entrada
   

    setSupportLanguage({
      title: '',
      shortDescription: '',
      longDescription: '',
    });


};


  const handleAddLanguage = () => {
    // Create a new language object from newLanguage state
    const languageObject = {
      title: newLanguage.title,
      shortDescription: newLanguage.shortDescription,
      longDescription: newLanguage.longDescription,
      language: selectedLanguageDetails.name,
      code: selectedLanguageDetails.code
    };

    // Add the language object to the languages array
    setLanguages([...languages, languageObject]);

    // Clear the input fields
    setNewLanguage({
      title: '',
      shortDescription: '',
      longDescription: '',
    });

    closeLangModal();


    
  };

  const handleGenerateFields = () => {
    const from = parseInt(minIntegrantes);
    const to = parseInt(maxIntegrantes);

    if (from > to) {
      return; // Handle invalid input
    }

    if (from > to || selectedPolicies.length === 0) {
      return; // Handle invalid input or empty selectedPolicies
    }

    const newCamposGerados = {};

    selectedPolicies.forEach((category) => {
      const newCampos = [];

      for (let i = from; i <= to; i += 2) {
        const field = {
          id: new Date().getTime() + i,
          from: i,
          to: Math.min(i + 1, to),
          price: '',
          descount:''
        };

        newCampos.push(field);
      }

      newCamposGerados[category.title] = newCampos;
    });

    setCamposGerados(newCamposGerados);
    setGeneratedArray([]);
  };
// addRate
  function countAgeCategories() {
    const counts = [];
    generatedArray.forEach(category => {
      counts.push({
        title: category.title,
        count: 0
      });
    });
  
    ages.forEach(age => {
      generatedArray.forEach(category => {
        if (age >= category.startAge && age <= category.endAge) {
          const categoryIndex = counts.findIndex(item => item.title === category.title);
          if (categoryIndex !== -1) {
            counts[categoryIndex].count++;
          }
        }
      });
    });
  
    //const ttp = calculateTotalPriceArray(counts);
    //console.log(ttp);
    return counts;
  }


  function calculateTotalPriceArray(counts) {
    let totalPrice = 0;
  
    counts.forEach(categoryCount => {
      const { title, count } = categoryCount;
      const category = generatedArray.find(cat => cat.title === title);
  
      if (category) {
        const field = category.fields.find(f => count >= f.from && count <= f.to);
  
        if (field) {
          totalPrice += field.price * count;
        }
      }
    });
  
    return totalPrice;
  }

  const handlePriceChange = (categoryTitle, id, event) => {
    const newCampos = camposGerados[categoryTitle].map((campo) =>
      campo.id === id ? { ...campo, price: event.target.value } : campo
    );
    setCamposGerados((prevCampos) => ({
      ...prevCampos,
      [categoryTitle]: newCampos,
    }));
  };

  const handleDescountChange = (categoryTitle, id, event) => {
    const newCampos = camposGerados[categoryTitle].map((campo) =>
      campo.id === id ? { ...campo, descount: event.target.value } : campo
    );
    setCamposGerados((prevCampos) => ({
      ...prevCampos,
      [categoryTitle]: newCampos,
    }));
  };

// subTasks

  const handleLimitChange = (categoryTitle, id, type, value) => {
    const newCampos = camposGerados[categoryTitle].map((campo) =>
      campo.id === id ? { ...campo, [type]: parseInt(value) } : campo
    );
    setCamposGerados((prevCampos) => ({
      ...prevCampos,
      [categoryTitle]: newCampos,
    }));
  };

  const handleRemoveField = (categoryTitle, id) => {
    const newCampos = camposGerados[categoryTitle].filter((campo) => campo.id !== id);
    setCamposGerados((prevCampos) => ({
      ...prevCampos,
      [categoryTitle]: newCampos,
    }));
  };

  const handleAddField = (categoryTitle) => {
    const categoryFields = camposGerados[categoryTitle];
    const lastField = categoryFields[categoryFields.length - 1];

    if (lastField.to + 2 <= parseInt(maxIntegrantes)) {
      const newField = {
        id: new Date().getTime(),
        from: lastField.to + 1,
        to: Math.min(lastField.to + 2, parseInt(maxIntegrantes)),
        price: '',
        descount:''
      };

      setCamposGerados((prevCampos) => ({
        ...prevCampos,
        [categoryTitle]: [...categoryFields, newField],
      }));
    }
  };

// 

  const handleUpdatePrice = (index, field, value) => {
    const updatedPricePerGroup = [...pricePerGroup];
    updatedPricePerGroup[index][field] = value;
    setPricePerGroup(updatedPricePerGroup);
  };

  // Função para remover preço por grupo
  const handleRemovePrice = (index) => {
    const updatedPricePerGroup = [...pricePerGroup];
    updatedPricePerGroup.splice(index, 1);
    setPricePerGroup(updatedPricePerGroup);
  };

  const handleGenerateArray = () => {
    const newArray = [];
    categories.forEach((category) => {
      if (camposGerados[category.title]) {
        const categoryFields = camposGerados[category.title].map((campo) => ({
          from: campo.from,
          to: campo.to,
          price: campo.price,
        }));
        newArray.push({ title: category.title, startAge: category.startAge, endAge: category.endAge, fields: categoryFields });
      }
    });
    setGeneratedArray(newArray);
    console.log(generatedArray);
  };

  const handleCheckboxChange = (policy) => {
    const isPolicySelected = selectedPolicies.some((selectedPolicy) => selectedPolicy._id === policy._id);
  
    const updatedPolicies = isPolicySelected
      ? selectedPolicies.filter((selectedPolicy) => selectedPolicy._id !== policy._id)
      : [...selectedPolicies, policy];
  
    setSelectedPolicies(updatedPolicies);
  };

  // handleAddStartTime
  
  const handleStartTimeCheckboxChange = (policy) => {
    setSelectedStartTimes((prevSelectedStartTimes) => {
      const isSelected = prevSelectedStartTimes.some((selectedPolicy) => selectedPolicy.id === policy.id);
      return isSelected
        ? prevSelectedStartTimes.filter((selectedPolicy) => selectedPolicy.id !== policy.id)
        : [...prevSelectedStartTimes, policy];
    });
  };
  
  

  // >>> Setters for variables
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleRateTitleChange = (event) => {
    setRateTitle(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleHourChange = (event) => {
    setHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setMinute(event.target.value);
  };

  const handleSecondDurationChange = (event) => {
    setSecondDuration(event.target.value);
  };

  const handleHourDurationChange = (event) => {
    setHourDuration(event.target.value);
  };

  const handleMinuteDurationChange = (event) => {
    setMinuteDuration(event.target.value);
  };

  const handleShortDescriptionChange = (event) => {
    setShortDescription(event.target.value);
  };

  const handleLongDescriptionChange = (event) => {
    setLongDescription(event.target.value);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.value);
  };

  const handleInclusionsDescriptionChange = (event) => {
    setInclusionsDescription(event.target.value);
  };

  const handleExclusionsDescriptionChange = (event) => {
    setExclusionsDescription(event.target.value);
  };

  const handleWhatToBringChange = (event) => {
    setWhatToBring(event.target.value);
  };

  const handleKnowBeforeYouGoDescriptionChange = (event) => {
    setKnowBeforeYouGoDescription(event.target.value);
  };

  const handleCancelationPolicyChange = (event) => {
    setCancelationPolicy(event.target.value);
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

  const handleStartMinuteChange = (event, newValue) => {
    setStartMinute(newValue);
  };


// ::: Tasks

const [productTasks, setProductTasks] = useState(data.tasks);


const editarProductTask = () => {

  const updatedTask = {
    idTask: idTask,
    title: titleTask,
    description: descriptionTask,
    subtasks: subtasks
  };

  setProductTasks(prevTasks => {
    const index = prevTasks.findIndex(task => task.idTask === idTask);

    if (index !== -1) {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = { ...updatedTask, idTask }; // Atualiza a tarefa com os novos dados, mantendo o id original
      return updatedTasks;
    } else {
      console.log("A tarefa com o ID especificado não foi encontrada.");
      return prevTasks; // Retorna o array original se a tarefa não for encontrada
    }
  });
  handleCloseEditTasksModal();
};

const [selectedHumanResourceOptions, setSelectedHumanResourceOptions] = useState(data.humanResources);
const [optionsWithCountHumanResource, setOptionsWithCountHumanResource] = useState(data.materialResources);



const addToProductTask = () => {
  const newTask = {
    idTask: uuidv4(),
    title: titleTask,
    description: descriptionTask,
    subtasks: subtasks
  };
  // Aqui você pode adicionar a nova tarefa ao seu array de tarefas ou realizar qualquer outra operação necessária
  setProductTasks([...productTasks, newTask]);

  handleCloseTasksModal();
  // >>>
};


// v4

// ::: Human Resources


  const handleSelectHumanResourceChange = (event) => {
    const selected = event.target.value;
    setSelectedHumanResourceOptions(selected);

    const newOptionsWithCount = selected.map(option => ({
      id: option,
      title: option,
      number: 0
    }));
    setOptionsWithCountHumanResource(newOptionsWithCount);
  };

  const handleRemoveHumanResourceSelected = () => {
    setOptionsWithCountHumanResource([]);
    setSelectedHumanResourceOptions([]);
    console.log(groupsData);
  };

  // ::: Material Resources
  const [selectedMaterialResourceOptions, setSelectedMaterialResourceOptions] = useState([]);
  const [optionsWithCountMaterialResource, setOptionsWithCountMaterialResource] = useState([]);

  const handleSelectMaterialResourceChange = (event) => {
    const selected = event.target.value;
    setSelectedMaterialResourceOptions(selected);

    const newOptionsWithCount = selected.map(option => ({
      id: uuidv4(),
      title: option,
      number: 0
    }));
    setOptionsWithCountMaterialResource(newOptionsWithCount);
  };

  const handleRemoveMaterialResourceSelected = () => {
    setOptionsWithCountMaterialResource([]);
    setSelectedMaterialResourceOptions([]);
  };

// ::: Human Resources

  const handleIncrementHumanResource = (index) => {
    const newOptionsWithCount = [...optionsWithCountHumanResource];
    newOptionsWithCount[index].number++;
    setOptionsWithCountHumanResource(newOptionsWithCount);
  };

  const handleDecrementHumanResource = (index) => {
    const newOptionsWithCount = [...optionsWithCountHumanResource];
    if (newOptionsWithCount[index].number > 0) {
      newOptionsWithCount[index].number--;
    }
    setOptionsWithCountHumanResource(newOptionsWithCount);
  };

  const handleRemoveOptionFieldHumanResource = (index) => {
    const newOptionsWithCount = [...optionsWithCountHumanResource];
    newOptionsWithCount.splice(index, 1);
    setOptionsWithCountHumanResource(newOptionsWithCount);
  };

  // ::: Material Resources

  const handleIncrementMaterialResource = (index) => {
    const newOptionsWithCount = [...optionsWithCountMaterialResource];
    newOptionsWithCount[index].number++;
    setOptionsWithCountMaterialResource(newOptionsWithCount);
  };

  const handleDecrementMaterialResource = (index) => {
    const newOptionsWithCount = [...optionsWithCountMaterialResource];
    if (newOptionsWithCount[index].number > 0) {
      newOptionsWithCount[index].number--;
    }
    setOptionsWithCountMaterialResource(newOptionsWithCount);
  };

  const handleRemoveOptionFieldMaterialResource = (index) => {
    const newOptionsWithCount = [...optionsWithCountMaterialResource];
    newOptionsWithCount.splice(index, 1);
    setOptionsWithCountMaterialResource(newOptionsWithCount);
  };

  const handleInicialHourChange = (event) => {
    setInicialHour(event.target.value);
  };

  const handleSuccessAlertClose = () => {
    setShowSuccessAlert(false);
  };

  const handleErrorAlertClose = () => {
    setShowErrorAlert(false);
  };

  const sendToParentComponent = (data) => {
    // Chama a função passada como prop para enviar dados ao componente pai
    props.sendToParentComponent(data);
  };


  // >>> Handle Submit -> Persist Day - Tour Activity

// generateArray

const updateDayTour = async () => {

  const dataBody = {
    //_id: 'c4567',
    code: code,
    name: title,
    ex: 1,
    emo: "ex",
    tipe: "Tour",
    type: "day-tour-activity",
    day: day,
    hour: hour,
    minute: minute,
    rateType: selectedTourType,
    localization: localization,
    themes: selectedThemes,
    categories: selectedCategories,
    shortDescription: shortDescription,
    description: longDescription,
    startTimes: selectedTimes,
    images: draggedImages,

    ...(draggedImages.length > 0 && {
      image: draggedImages[0],
    }),
    videos: video,
    // >>>
    inclusions: selectedInclusions,
    inclusionsDescription,
    // >>>
    exclusions: selectedExclusions,
    exclusionsDescription,
    // >>>
    languagesAvailable: selectedConstraintLanguages,
    languagesPresent: selectedPresentLanguages,
    languages: languages,
    // Configurar campos com valores do primeiro objeto em languages, se existir
    ...(languages.length > 0 && {
        name: languages[0].title,
        shortDescription: languages[0].shortDescription,
        description: languages[0].longDescription,
        // ... outros campos ...
    }),
    // >>>
    knowBeforeYouGo: knowBeforeYouGo,
    knowBeforeYouGoDescription,
    // >>>
    whatToBring,
    rates: productRates,
    tasks: productTasks,
    noteCount: 0,
    isAccomodation: false,
    humanResources: optionsWithCountHumanResource,
    materialResources: optionsWithCountMaterialResource
    // ... outros campos ...
};

    
    try {
      const response = await fetch(`/api_/day-tour-activity/${data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataBody),
      });

      if (response.ok) {
        // Inclusion updated successfully
        console.log('Day Tour updated successfully');
      } else {
        // Handle error
        console.error('Failed to update Day Tour');
      }
    } catch (error) {
      console.error('Error updating Day Tour:', error);
    }

    window.location.reload();

  };


  const handlePostRequest = async () => {

    const data = {
      //_id: 'c4567',
      code: code,
      name: title,
      ex: 1,
      emo: "ex",
      tipe: "Tour",
      type: "day-tour-activity",
      day: day,
      hour: hour,
      minute: minute,
      localization: localization,
      themes: selectedThemes,
      categories: selectedCategories,
      shortDescription: shortDescription,
      description: longDescription,
      startTimes: selectedTimes,
      images: draggedImages,

      ...(draggedImages.length > 0 && {
        image: draggedImages[0],
      }),
      videos: video,
      // >>>
      whatToBring: selectedWhatToBrings,
      inclusions: selectedInclusions,
      inclusionsDescription,
      // >>>
      exclusions: selectedExclusions,
      exclusionsDescription,
      // >>>
      languagesAvailable: selectedConstraintLanguages,
      languagesPresent: selectedPresentLanguages,
      languages: languages,
      // Configurar campos com valores do primeiro objeto em languages, se existir
      ...(languages.length > 0 && {
          name: languages[0].title,
          shortDescription: languages[0].shortDescription,
          description: languages[0].longDescription,
          // ... outros campos ...
      }),
      // >>>
      knowBeforeYouGo: knowBeforeYouGo,
      knowBeforeYouGoDescription,
      // >>>
      whatToBring,
      rates: productRates,
      tasks: productTasks,
      noteCount: 0,
      isAccomodation: false,
      humanResources: optionsWithCountHumanResource,
      materialResources: optionsWithCountMaterialResource
      // ... outros campos ...
  };
  
  // start-time
   

    try {

      const response = await fetch('/api_/day-tour-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      //sendToParentComponent(data);


      if (response.status === 200) {
        const data = await response.json();
        console.log('Atividade de turismo criada:', data);
        setShowSuccessAlert(true);
      } else {
        const errorMessage = await response.json();
        console.error('Erro ao criar a atividade de turismo:', errorMessage);
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação POST:', error);
      setShowErrorAlert(true);
    }
  };




// noteCount handleRemoveRate

  
  // >>> Handling Debug

  const handleDebug = () => {
   
      console.log("Code ->",code);
      console.log("Title ->",title);
      console.log("Start - Times ->",selectedTimes);
      console.log("localization ->",localization);
      console.log("Short Description ->",shortDescription);
      console.log("Long Description ->",longDescription);
      console.log("Image ->",image);
      console.log("All Images ->",draggedImages);
      console.log("Video ->",video);
      console.log("Inclusions ->",selectedInclusions);
      console.log("Exclusions ->",selectedExclusions);
      console.log("Categories ->",selectedCategories);
      console.log("Themes ->",selectedThemes);
      console.log("Languages For Product ->",languages);
      console.log("Languages Available On Rate ->",selectedRateLanguages);
      console.log("Languages Available ->",selectedLanguages);
      console.log("Languages Present ->",selectedPresentLanguages);
      //console.log(price);
      console.log("Know Before You Go ->",knowBeforeYouGo);
      console.log("What to Bring ->",whatToBring);
      console.log("Rates ->",productRates);
      console.log("Categorys p Number Human:", optionsWithCountHumanResource);
      console.log("Categorys p Number Human:", optionsWithCountMaterialResource);
      console.log("Tasks:", productTasks);
      console.log("Classes:", classesData);
      console.log("Cancell selected:", selectedCancellationPolicys);
      console.log("Rates", productRates);


      
      }

      // handleAddRate

      const initializeTiers = (min, max) => {
        const tiers = [];
        for (let i = min; i <= max; i += 2) {
          tiers.push(`${i}-${i + 1}`);
        }
        return tiers;
      };

      const generateTiers = () => {
        const tiers = [];
        for (let i = minParticipants; i <= maxParticipants; i += 2) {
          if (i + 1 <= maxParticipants) {
            tiers.push({ start: i, end: i + 1, price: 0 });
          } else {
            tiers.push({ start: i, end: i, price: 0 });
          }
        }
        return tiers;
      };
    

// handleAddRate


const toggleRateLanguageSelection = (language) => {
  if (selectedRateLanguages.includes(language)) {
    // If language is already selected, remove it
    setSelectedRateLanguages((prevSelectedRateLanguages) =>
      prevSelectedRateLanguages.filter((lang) => lang !== language)
    );
  } else {
    // If language is not selected, add it
    setSelectedRateLanguages((prevSelectedRateLanguages) => [...prevSelectedRateLanguages, language]);
  }
};

      const toggleCancellationPolicySelection = (language) => {
        // Se o idioma já estiver selecionado, ele será removido. Caso contrário, será adicionado.
        setSelectedCancellationPolicys((prevSelectedCancellationPolicys) =>
          prevSelectedCancellationPolicys.includes(language)
            ? prevSelectedCancellationPolicys.filter((lang) => lang !== language)
            : [...prevSelectedCancellationPolicys, language]
        );
      };

      const togglePresentLanguageSelection = (language) => {
        if (selectedPresentLanguages.includes(language)) {
          // If language is already selected, remove it
          setSelectedPresentLanguages((prevSelectedPresentLanguages) =>
            prevSelectedPresentLanguages.filter((lang) => lang !== language)
          );
        } else {
          // If language is not selected, add it
          setSelectedPresentLanguages((prevSelectedPresentLanguages) => [...prevSelectedPresentLanguages, language]);
          
        }
      };

      const toggleLanguageSelection = (language) => {
        if (selectedLanguages.includes(language)) {
          // If language is already selected, remove it
          setSelectedLanguages((prevSelectedLanguages) =>
            prevSelectedLanguages.filter((lang) => lang !== language)
          );
        } else {
          // If language is not selected, add it
          setSelectedLanguages((prevSelectedLanguages) => [...prevSelectedLanguages, language]);
          
        }
      };

      const toggleComplexLanguageSelection = (language) => {
        if (selectedPresentLanguages.includes(language)) {
          // If language is already selected, remove it
          setSelectedPresentLanguages((prevSelectedPresentLanguages) =>
            prevSelectedPresentLanguages.filter((lang) => lang !== language)
          );
          // >>>
          setLanguages((prevLanguages) =>
          prevLanguages.filter((lang) => lang.code !== language)
        );
      
        } else {
          // If language is not selected, add it
          setSelectedPresentLanguages((prevSelectedPresentLanguages) => [...prevSelectedPresentLanguages, language]);
          
        }
      };


      const toggleThemeSelection = (language) => {
        if (selectedThemes.includes(language)) {
          // If language is already selected, remove it
          setSelectedThemes((prevSelectedThemes) =>
            prevSelectedThemes.filter((lang) => lang !== language)
          );
        } else {
          // If language is not selected, add it
          setSelectedThemes((prevSelectedThemes) => [...prevSelectedThemes, language]);
        }
      };

      const toggleCategorySelection = (language) => {
        if (selectedCategories.includes(language)) {
          // If language is already selected, remove it
          setSelectedCategories((prevSelectedCategories) =>
            prevSelectedCategories.filter((lang) => lang !== language)
          );
        } else {
          // If language is not selected, add it
          setSelectedCategories((prevSelectedCategories) => [...prevSelectedCategories, language]);
        }
      };

      const toggleInclusionSelection = (language) => {
        if (selectedInclusions.includes(language)) {
          // If language is already selected, remove it
          setSelectedInclusions((prevSelectedInclusions) =>
            prevSelectedInclusions.filter((lang) => lang !== language)
          );
        } else {
          // If language is not selected, add it
          setSelectedInclusions((prevSelectedInclusions) => [...prevSelectedInclusions, language]);
        }
      };

      const toggleExclusionSelection = (language) => {
        if (setSelectedExclusions.includes(language)) {
          // If language is already selected, remove it
          setSelectedExclusions((prevSelectedExclusions) =>
            prevSelectedExclusions.filter((lang) => lang !== language)
          );
        } else {
          // If language is not selected, add it
          setSelectedExclusions((prevSelectedExclusions) => [...prevSelectedExclusions, language]);
        }
      };

      const toggleWhatToBringSelection = (language) => {
        if (setSelectedExclusions.includes(language)) {
          // If language is already selected, remove it
          setSelectedExclusions((prevSelectedExclusions) =>
            prevSelectedExclusions.filter((lang) => lang !== language)
          );
        } else {
          // If language is not selected, add it
          setSelectedExclusions((prevSelectedExclusions) => [...prevSelectedExclusions, language]);
        }
      };

      const toggleConstraintLanguageSelection = (language) => {
        if (selectedConstraintLanguages.includes(language)) {
          // If language is already selected, remove it
          setSelectedConstraintLanguages((prevSelectedConstraintLanguages) =>
            prevSelectedConstraintLanguages.filter((lang) => lang !== language)
          );
        } else {
          // If language is not selected, add it
          setSelectedConstraintLanguages((prevSelectedConstraintLanguages) => [...prevSelectedConstraintLanguages, language]);
        }
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


  // Função para gerar os tiers com base nos tiers existentes na categoria
  const generateTiersForCategory = (category) => {
    const categoryTiers = rates.find((rate) => rate.category === category)?.tiers;
    return categoryTiers || [];
  };

  // Função para atualizar um tier específico de uma categoria
  const handleTierChange = (category, index, value, field) => {
    setRates((prevRates) => {
      const updatedRates = [...prevRates];
      const rateToUpdate = { ...updatedRates.find((rate) => rate.category === category) };
      const updatedTiers = [...rateToUpdate.tiers];

      if (field === 'start') {
        updatedTiers[index].start = parseInt(value);
      } else if (field === 'end') {
        updatedTiers[index].end = parseInt(value);
      } else if (field === 'price') {
        updatedTiers[index].price = parseFloat(value);
      }

      rateToUpdate.tiers = updatedTiers;
      const rateIndex = updatedRates.findIndex((rate) => rate.category === category);
      updatedRates[rateIndex] = rateToUpdate;

      return updatedRates;
    });
  };


const initializePricesForCategory = (category) => {
  const tiers = generateTiers();
  const newRate = {
    category: category,
    tiers: tiers,
  };

  setRates((prevRates) => [...prevRates, newRate]);
};

  // Atualiza os preços para um determinado tier de uma categoria
  const handleChangePrice = (category, tier, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [category]: {
        ...prevPrices[category],
        [tier]: parseFloat(value),
      },
    }));
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const resourcedata = useState([ { name: "John", age: 25 },
  { name: "Jane", age: 30 },]);
 

  const handleRowSelect = (row) => {
    // Adicione ou remova a linha da lista de selecionados
    setSelectedRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.includes(row);
      return isSelected
        ? prevSelectedRows.filter((selectedRow) => selectedRow !== row)
        : [...prevSelectedRows, row];
    });

    console.log(selectedRows);
  };




  // Remove um tier específico de uma categoria
  const handleRemoveTier = (category, tier) => {
    setPrices((prevPrices) => {
      const updatedPrices = { ...prevPrices };
      delete updatedPrices[category][tier];
      return updatedPrices;
    });
  };

// Adiciona um novo tier à categoria
const handleAddTier = (category) => {
  setPrices((prevPrices) => {
    const updatedPrices = { ...prevPrices };
    const tiers = generateTiersForCategory(category);

    let nextTierStart = 1;
    let nextTierEnd = 2;

    // Verifica se já existem tiers para essa categoria
    if (tiers.length > 0) {
      const lastTier = tiers[tiers.length - 1];
      const lastTierEnd = parseInt(lastTier.split('-')[1], 10);

      if (lastTierEnd < maxParticipants) {
        nextTierStart = lastTierEnd + 1;
        nextTierEnd = Math.min(nextTierStart + 1, maxParticipants);
      } else {
        return updatedPrices;
      }
    }

    const nextTier = `${nextTierStart}-${nextTierEnd}`;
    updatedPrices[category] = {
      ...updatedPrices[category],
      [nextTier]: 0,
    };

    return updatedPrices;
  });
};
  const calculateTotalPrice = () => {
    // Implemente aqui a lógica para calcular o preço total com base nos tiers e preços inseridos.
    // Para este exemplo, vamos apenas exibir os preços de todas as categorias e tiers no console.
    console.log(prices);
  };

  const handleSetDefault = (id) => {
    const updatedRates = productRates.map(rate => ({
      ...rate,
      sel: rate.id === id ? 1 : 0 // Define sel como 1 para o rate selecionado, caso contrário, define como 0
    }));
    
    // Atualiza o estado productRates com os novos rates
    setProductRates(updatedRates); // Assumindo que você está usando useState para gerenciar productRates
    console.log(updatedRates);
  };
  
  const editRate = (updatedRateService) => {


    const newArray = [];
    categories.forEach((category) => {
      if (camposGerados[category.title]) {
        const categoryFields = camposGerados[category.title].map((campo) => ({
          from: campo.from,
          to: campo.to,
          price: campo.price,
          descount: campo.descount
        }));
        newArray.push({ 
          //id: uuidv4(),
          title: category.title, 
          startAge: category.startAge, 
          endAge: category.endAge, 
          fields: categoryFields 
        });
      }
    });
// addRate
    const updatedRateEdit = {
      idRate: updatedRateService.idRate, // Gera um ID único para o novo rate
      title: rateTitle,
      sel: 0,
      startTimes: selectedStartTimes,
      languages: selectedRateLanguages,
      cancelationPolicys: selectedCancellationPolicys,
      price: newArray,
      minIntegrantes: minIntegrantes,
      maxIntegrantes: maxIntegrantes,
      constraints: selectedPolicies,
      camposGerados: camposGerados
    };

    setProductRates(prevRates => {
      const index = prevRates.findIndex(rate => rate.idRate === updatedRateEdit.idRate);
      if (index !== -1) {
        const updatedRates = [...prevRates];
        updatedRates[index] = updatedRateEdit;
        console.log("Editado!", updatedRateEdit);
        return updatedRates;
      } else {
        // Se o objeto com o idRate especificado não existir, apenas adicione-o ao array
        return [...prevRates, updatedRateEdit];
      }
    });
    
    handleCloseEditRateModal();
     
  };
  
  

  const handleAddRate = () => {

    const newArray = [];
    categories.forEach((category) => {
      if (camposGerados[category.title]) {
        const categoryFields = camposGerados[category.title].map((campo) => ({
          from: campo.from,
          to: campo.to,
          price: campo.price,
          descount: campo.descount
        }));
        newArray.push({ 
          //id: uuidv4(),
          title: category.title, 
          startAge: category.startAge, 
          endAge: category.endAge, 
          fields: categoryFields 
        });
      }
    });
    
  
    const newRate = {
      idRate: uuidv4(), // Gera um ID único para o novo rate
      title: rateTitle,
      sel: 0,
      startTimes: selectedStartTimes,
      languages: selectedRateLanguages,
      cancelationPolicys: selectedCancellationPolicys,
      price: newArray,
      minIntegrantes: minIntegrantes,
      maxIntegrantes: maxIntegrantes,
      constraints: selectedPolicies,
      camposGerados: camposGerados
    };
  
    // Use uma função de callback para atualizar o estado com a nova taxa
    setProductRates((prevRates) => [...prevRates, newRate]);
  
    console.log(productRates);
  
    // Limpar os campos após adicionar a taxa
    setRateTitle('');
    handleCloseModal();
    
  };
  
  const handleRemoveRate = (idToRemove) => {
    // Filtrar as taxas para remover a taxa com o id correspondente
    const updatedRates = productRates.filter((rate) => rate.idRate !== idToRemove);
  
    // Atualizar o estado com as taxas filtradas
    setProductRates(updatedRates);
  };

  const handleRemoveTask = (idToRemove) => {
    // Filtrar as taxas para remover a taxa com o id correspondente
    const updatedTasks = productTasks.filter((task) => task.idTask !== idToRemove);
  
    // Atualizar o estado com as taxas filtradas
    setProductTasks(updatedTasks);
  };
  

const handleSecondChange = (event) => {
    setSecond(event.target.value);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const imageUrl = event.dataTransfer.getData('text/plain');
    addImage(imageUrl);
  };

  const handleEdit = (rateId) => {
    // Handle the edit action here
    console.log(`Editing rate with ID: ${rateId}`);
  };

  const handleRemove = (rateId) => {
    // Handle the remove action here
    console.log(`Removing rate with ID: ${rateId}`);
  };

// handleAddRate
  const handleRemoveImage = (index) => {
    const updatedImages = [...draggedImages];
    updatedImages.splice(index, 1);
    setDraggedImages(updatedImages);
  };

  const addImage = (imageUrl) => {
    setDraggedImages([...draggedImages, imageUrl]);
  };

  // temporaryRate

  const handleOpenEditRateModal = (rate) => {

    setTemporaryRate(rate);
    //setCancellationPolicys(rate.cancellationPolicys);
    setCamposGerados(rate.camposGerados);
    setSelectedRateLanguages(rate.languages);
    setRateTitle(rate.title);
    setSelectedPolicies(rate.constraints);
    setSelectedCancellationPolicys(rate.cancelationPolicys);
    setSelectedLanguages(rate.languages);
    setMinIntegrantes(rate.minIntegrantes);
    setMaxIntegrantes(rate.maxIntegrantes);
    setOpenEditRate(true);
    
   

  };

  // generateFields handleAddRate

  const handleCloseEditRateModal = () => {
    setOpenEditRate(false);
  };


  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleStartHourChange = (e) => {
    setStartHour(e.target.value);
  };


  const handleOpenLanguagesModal = () => {
    setOpenLanguages(true);
  };

  const handleCloseLanguagesModal = () => {
    setOpenLanguages(false);
  };

  
  const handleOpenCategoriesModal = () => {
    setOpenCategories(true);
  };

  const handleCloseCategoriesModal = () => {
    setOpenCategories(false);
  };

    const handleOpenCancellationPolicysModal = () => {
    setOpenCancellationPolicys(true);
  };

  const handleCloseCancellationPolicysModal = () => {
    setOpenCancellationPolicys(false);
  };


  const handleOpenInclusionsModal = () => {
    setOpenInclusions(true);
  };

  const handleCloseInclusionsModal = () => {
    setOpenInclusions(false);
  };


  const handleOpenResourcesModal = () => {
    setOpenResourcesModal(true);
  };

  const handleCloseResourcesModal = () => {
    setOpenResourcesModal(false);
  };

  const handleOpenStartTimeModal = (startTime, i) => {

  setTemporaryIndex(i);

  const [hour, minute, second] = startTime.value.split(':').map(val => parseInt(val));
  const [hourDuration, minuteDuration, secondDuration] = startTime.duration.split(':').map(val => parseInt(val));

  // Set states with parsed values

  // >>>
  setHour(hour);
  setMinute(minute);
  setSecond(second);

  setHourDuration(hourDuration);
  setMinuteDuration(minuteDuration);
  setSecondDuration(secondDuration);
  setOpenStartTimeModal(true);
  };

  const handleCloseStartTimeModal = () => {
    setOpenStartTimeModal(false);
  };

  const handleOpenTasksModal = () => {
    setOpenTasksModal(true);
  };

  const handleCloseTasksModal = () => {
    setOpenTasksModal(false);
  };

  const handleEditStartTime = (startTime) => {
    
    
    // Start - Time
    setHour();
    setMinute();
    setSecond();
    // Duration
    setHourDuration();
    setMinuteDuration();
    setSecondDuration();
    // >>>
    
  };

   const handleOpenEditTasksModal = (tasks) => {
    setProductEditTasks(tasks);
    setIdTask(tasks.idTask);
    setTitleTask(tasks.title);
    setDescriptionTask(tasks.description);
    setSubtasks(tasks.subtasks);
    setOpenEditTasksModal(true);
  };

  const handleCloseEditTasksModal = () => {
    setOpenEditTasksModal(false);
  };



  const handleOpenExclusionsModal = () => {
    setOpenExclusions(true);
  };

  const handleCloseExclusionsModal = () => {
    setOpenExclusions(false);
  };

  const handleOpenThemesModal = () => {
    // Supondo que classesData seja o seu array
    const firstTitle = classesData.length > 0 ? classesData[0].title : '';
    setSelectedClass(firstTitle);
    // Agora firstTitle contém o título do primeiro objeto do array classesData

    setOpenThemes(true);
  };
 // handleAddRate
  const handleCloseThemesModal = () => {
    setOpenThemes(false);
  };

  const handleOpenKnowBeforeYouGoModal = () => {
    setOpenKnowBeforeYouGo(true);
  };

  const handleCloseKnowBeforeYouGoModal = () => {
    setOpenKnowBeforeYouGo(false);
  };

  const handleAddKnowBeforeYouGo = () => {
    // Logic to add selected languages to the array
    // You can adapt this logic based on your actual implementation
    setKnowBeforeYouGo([...selectedLanguages, /* selected language */]);
    setSelectedLanguages([])
    handleCloseKnowBeforeYouGoModal();
  };


  const handleAddLanguages = () => {
    // Logic to add selected languages to the array
    // You can adapt this logic based on your actual implementation
    setLanguagesSelected([...selectedLanguages, /* selected language */]);
    setSelectedLanguages([])
    handleCloseLanguagesModal();
  };

  const handleAddCategories = () => {
    // Logic to add selected languages to the array
    // You can adapt this logic based on your actual implementation
    setCategoriesForTrip([...selectedLanguages, /* selected language */]);
    setSelectedLanguages([])
    handleCloseCategoriesModal();
  };

  const handleAddThemes = () => {
    // Logic to add selected languages to the array
    // You can adapt this logic based on your actual implementation
    setThemes([...selectedLanguages, /* selected language */]);
    //setSelectedLanguages([])
    handleCloseThemesModal();
  };

  const handleAddInclusions = () => {
    // Logic to add selected languages to the array
    // You can adapt this logic based on your actual implementation
    setInclusions([...selectedLanguages, /* selected language */]);
    setSelectedLanguages([])
    handleCloseInclusionsModal();
  };

  const handleAddExclusions = () => {
     // Logic to add selected languages to the array
    // You can adapt this logic based on your actual implementation
    setExclusions([...selectedLanguages, /* selected language */]);
    setSelectedLanguages([])
    handleCloseExclusionsModal();
  };

  // >>>
 const handleLanguageSelection = (language) => {
    const languageTitle = language.title;
  
    if (selectedLanguages.includes(languageTitle)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== languageTitle));
    } else {
      setSelectedLanguages([...selectedLanguages, languageTitle]);
    }
  };

  const handleCancellCheckboxChange = (policy) => {
    const isPolicySelected = selectedCancellationPolicys.some((selectedPolicy) => selectedPolicy._id === policy._id);
  
    const updatedPolicies = isPolicySelected
      ? selectedCancellationPolicys.filter((selectedPolicy) => selectedPolicy._id !== policy._id)
      : [...selectedCancellationPolicys, policy];
  
    setSelectedCancellationPolicys(updatedPolicies);
  };

  const handleCancellationPolicySelection = (language) => {
    const languageTitle = language.title;
  
    if (selectedCancellationPolicys.includes(languageTitle)) {
      setSelectedCancellationPolicys(selectedCancellationPolicys.filter((lang) => lang !== languageTitle));
    } else {
      setSelectedCancellationPolicys([...selectedCancellationPolicys, languageTitle]);
    }
  };

   const handleInclusionSelection = (inclusion) => {
    const inclusionTitle = inclusion.title;
  
    if (selectedInclusions.includes(inclusionTitle)) {
      setSelectedInclusions(selectedInclusions.filter((inc) => inc !== inclusionTitle));
    } else {
      setSelectedInclusions([...selectedInclusions, inclusionTitle]);
    }
  };


  const handleThemeSelection = (theme) => {
    const themeTitle = theme.title;
  
    if (selectedThemes.includes(themeTitle)) {
      setSelectedThemes(selectedThemes.filter((thm) => thm !== themeTitle));
    } else {
      setSelectedThemes([...selectedThemes, themeTitle]);
    }
  };

  
  const handleCategorySelection = (category) => {
    const categoryTitle = category.title;
  
    if (selectedCategories.includes(categoryTitle)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== categoryTitle));
    } else {
      setSelectedCategories([...selectedCategories, categoryTitle]);
    }
  };

  
  const handleExclusionSelection = (exclusion) => {
    const exclusionTitle = exclusion.title;
  
    if (selectedExclusions.includes(exclusionTitle)) {
      setSelectedExclusions(selectedExclusions.filter((exc) => exc !== exclusionTitle));
    } else {
      setSelectedExclusions([...selectedExclusions, exclusionTitle]);
    }
  };

  const handleWhatToBringSelection = (exclusion) => {
    const exclusionTitle = exclusion.title;
  
    if (selectedWhatToBrings.includes(exclusionTitle)) {
      setSelectedWhatToBrings(selectedWhatToBrings.filter((exc) => exc !== exclusionTitle));
    } else {
      setSelectedWhatToBrings([...selectedWhatToBrings, exclusionTitle]);
    }
  };
  

  // >>> camposGerados


 const fetchDataGroups = async () => {
    try {
      const response = await axios.get('/api_/groups');
      setGroupsData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataInclusions = async () => {
    try {
      const response = await axios.get('/api_/inclusions');
      setProductInclusions(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataExclusions = async () => {
    try {
      const response = await axios.get('/api_/exclusions');
      setProductExclusions(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
 
  const fetchDataCategories = async () => {
    try {
      const response = await axios.get('/api_/categories');
      setProductCategories(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataThemes = async () => {
    try {
      const response = await axios.get('/api_/themes');
      setProductThemes(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataLanguages = async () => {
    try {
      const response = await axios.get('/api_/languages');
      setProductLanguages(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataWhatToBring = async () => {
    try {
      const response = await axios.get('/api_/what-to-bring');
      setProductWhatToBring(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataAgeRange = async () => {
    try {
      const response = await axios.get('/api_/age-ranges');
      setAgeRangesData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataClasses = async () => {
    try {
      const response = await axios.get('/api_/classes');
      setClassesData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataCancellationPolicys = async () => {
    try {
      const response = await axios.get('/api_/cancellation-policy');
      setCancellationPolicys(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };

  
  const handleAddTime = () => {
    if (hour !== '' && minute !== '') {
      const newTime = {
        id: new Date().getTime(), // Adiciona um ID único baseado em timestamp
        value: `${hour}:${minute}:${second}`, // O valor real do start time
        duration: `${hourDuration}:${minuteDuration}:${secondDuration}`
      };
  
      setSelectedTimes([...selectedTimes, newTime]);
      // Limpa os campos de entrada após adicionar o tempo
      setHour(0);
      setMinute(0);
      setSecond(0);
      // >>>
      setHourDuration(0);
      setMinuteDuration(0);
      setSecondDuration(0);
    }
  };

  const handleEditTime = () => {
    // Crie uma nova matriz de tempos onde o tempo editado substitui o tempo antigo no índice especificado

      const editedTime = {
        id: new Date().getTime(), // Adiciona um ID único baseado em timestamp
        value: `${hour}:${minute}${second}`, // O valor real do start time
        duration: `${hourDuration}:${minuteDuration}:${secondDuration}`
      };
  
   
    
    const updatedTimes = [...selectedTimes];
    updatedTimes[temporaryIndex] = editedTime;
  
    // Atualize o estado com a nova matriz de tempos
    setSelectedTimes(updatedTimes);

    handleCloseStartTimeModal();
  };
  
// handleEdit

  const handleRemoveTime = (index) => {
    const updatedTimes = [...selectedTimes];
    updatedTimes.splice(index, 1);
    setSelectedTimes(updatedTimes);
  };

  // handleDrop props

  const handleNext = () => {


  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  handleDebug();
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);

};
// camposGerados
  
    return (

   
  
<Box m="20px" textAlign="center">
<Header title="DAY TOUR ACTIVITY 🌳" subtitle="Create a product with Day Tour Activity features" />
<Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  height="100%"
>
  <div className="container" style={{ maxWidth: "800px", width: "100%" }}>
    <div className="row">
      <div className="col-md-6">
        <div className="card-body d-flex align-items-center justify-content-center">
        <div>
      {isLoading ? ( // Se isLoading for verdadeiro, exiba o spinner
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress style={{ color: 'green', width: '80px', height: '80px' }} />
        </div>
      ) : ( // Caso contrário, renderize o componente real
      <Box m="20px" textAlign="center">
      {/* HEADER */}
      {/* HEADER */}

      {showSuccessAlert && (
        <Alert  variant="filled" sx={{width:300}}  onClose={handleSuccessAlertClose} severity="success">
            Product Addded Successfully!
        </Alert>
      )}
      {showErrorAlert && (
         <Alert  variant="filled" sx={{width:300}}  onClose={handleErrorAlertClose} severity="error">
            An Error Occured While Adding the Product!
         </Alert>
      )}


<Box display="flex" justifyContent="space-between" alignItems="center">
</Box>
      <Box display="flex" justifyContent="space-between" alignItems="center"></Box>

      <div className="container">
      <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <div>

     </div>
        ) : (
          <div>
            {/* Renderizar o conteúdo do formulário com base no passo atual */}
            {activeStep === 0 && (

            <div>
                <br/>
                <h2 className="text-center">Give your Experience a Code</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Give your Experience a code that serves as an presentation.</h4>
                <br/>
                <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center', // Adiciona alinhamento horizontal ao centro
                      '& > :not(style)': { m: 1 },
                      marginRight: '18px',
                    }}
                  >
                    <TextField value={code} label="Code" id="outlined-size-normal" onChange={handleCodeChange} defaultValue="" />
                  </Box>
                  <br />
                   
                   <h2 className="text-center">What is the Type of your Expirience</h2>
                   <h4 className="text-center" style={{ color: 'gray' }}>Pick the product Type( Private / Group / Private & Group).</h4>
                   <br/>
                   <select
                      fullWidth
                      id="tourType"
                      name="tourType"
                      value={selectedTourType}
                      onChange={(event) => setSelectedTourType(event.target.value)}
                    >
                      <option value="private">Private</option>
                      <option value="group">Group</option>
                      <option value="all"> Private & Group</option>
                    </select>
                  <br />
         
                <br/>
                <h2 className="text-center">Chose the Themes that best describe your Expirience</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Help your travallers find what they are looking for. Are you offering a walking tour?</h4>
                <br/>
                <List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
                  {selectedThemes.map((language) => (
                    <ListItem
                      sx={{marginTop: 10 ,height: 20}}
                      key={language}
                      button
                      //onClick={() => openLangModal(language)}
                      secondaryAction={<button onClick={() => toggleThemeSelection(language)}>X</button>}
                    >
                      <ListItemText primary={language} />
                    </ListItem>
                  ))}
                </List>
                <br/>

                <Box>
                <Button variant="contained" onClick={handleOpenThemesModal}>
                  Add Themes <AddIcon/>
                </Button>
                <br/>
                <br/>
                <h2 className="text-center">Chose the Categories that best describe your Expirience</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Help your travallers find what they are looking for. Are you offering a walking tour?</h4>
                <br/>
                <List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
                {selectedCategories.map((language) => (
                  <ListItem
                    sx={{marginTop: 10 ,height: 20}}
                    key={language}
                    button
                    //onClick={() => openLangModal(language)}
                    secondaryAction={<button onClick={() => toggleCategorySelection(language)}>X</button>}
                  >
                    <ListItemText primary={language} />
                  </ListItem>
                ))}
              </List>
              <br/>
                <Button variant="contained" onClick={handleOpenCategoriesModal}>
                  Add Categories <AddIcon/>
                </Button>
       

       


          <Modal open={openThemes} onClose={handleCloseThemesModal}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                width: "50%",
                height: "70%",
                margin: "auto",
                marginTop: "300px",
                marginLeft: "950px",
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
                  width: "50%",
                  height: "50%",
                  overflow: "auto",
                  maxHeight: "600px", // Defina a altura máxima para ativar o scroll
                }}
              >
             
             <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
              >

                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: 'divider', marginTop: 8 }}
                >
                  {classesData.map((option, index) => (
                    <Tab
                      key={index}
                      label={option.title}
                      {...a11yProps(index)}
                      onClick={() => selectClass(option.title)}
                    />
                  ))}
                </Tabs>

              {classesData.map((option, index) => (
                <TabPanel value={value} index={index} key={index}>
                  <Typography variant="h4" mb={2}>
                    Themes | {option.title}
                  </Typography>
                  <Divider />
                  <br/>

                  {productThemes.map((item) => {
                    if (item.type === option.title) {
                      return (
                        <label key={item._id} style={{ display: 'block' }}>
                          <input
                            type="checkbox"
                            checked={selectedThemes.includes(item.title)}
                            onChange={() => handleThemeSelection(item)}
                          />
                          {item.title}
                        </label>
                      );
                    }
                    return null;
                  })}
                  <br />
                </TabPanel>
              ))}

            </Box>
            <br/>
            <br/>
            <div>
              <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseThemesModal}>
                    cancel </Button>
                <Button variant="contained" onClick={handleAddThemes}>
                    Save <CheckIcon sx={{marginLeft:'4px'}}/>
                </Button>

              </div>
              </Box>
          </Box>
      </Modal>



      <Modal open={openCategories} onClose={handleCloseCategoriesModal}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            width: "50%",
            height: "60%",
            margin: "auto",
            marginTop: "300px",
            marginLeft: "950px",
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
              width: "50%",
              height: "60%",
              //overflow: "auto",
            }}
          >
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >

          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', marginTop: 8 }}
          >
            {classesData.map((option, index) => (
              <Tab
                key={index}
                label={option.title}
                {...a11yProps(index)}
                onClick={() => selectClass(option.title)}
              />
            ))}
          </Tabs>

          {classesData.map((option, index) => (
            <TabPanel value={value} index={index} key={index}>
              <Typography variant="h4" mb={2}>
                Categories | {option.title}
              </Typography>
              <Divider />
              <br/>

              {productCategories.map((item) => {
                if (item.type === option.title) {
                  return (
                    <label key={item._id} style={{ display: 'block' }}>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(item.title)}
                        onChange={() => handleCategorySelection(item)}
                      />
                      {item.title}
                    </label>
                  );
                }
                return null;
              })}
              <br />
            </TabPanel>
          ))}

        </Box>
            <br/>
            <br/>
            <div>
              <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseCategoriesModal}>
                    cancel </Button>
                <Button variant="contained" onClick={handleAddCategories}>
                    Save <CheckIcon sx={{marginLeft:'4px'}}/>
                </Button>

              </div>
                  </Box>
                </Box>
              </Modal>
            </Box>
            <br/>
            <br/>
                      


            </div>
            )}
            {activeStep === 1 &&     
            
            <div>

            <Modal open={isLangModalOpen} onClose={closeLangModal}>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', height: 400, width: 600, transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 3 }}>
                {selectedLanguageDetails && (
                  <>
                    {languages.some(language => language.language === selectedLanguageDetails.name) ? (
                      // Se o idioma existir no array, renderize os campos preenchidos com os valores do idioma
                      <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: 2 }} variant="h5">
                          {selectedLanguageDetails.name}
                        </Typography>
                        <Flag country={selectedLanguageDetails.code.toUpperCase()} />
                        <div style={{ marginLeft: 'auto' }}>
                        <Button variant="contained" sx={{marginRight:'4px'}} onClick={closeLangModal}>
                            cancel </Button>
                        <Button variant="contained" onClick={() => handleEditLanguage(supportLanguage.title, supportLanguage.shortDescription, supportLanguage.longDescription)}>
                            Save <CheckIcon sx={{marginLeft:'4px'}}/>
                        </Button>
                        </div>
                      </div>

                        <br />
                        <Divider variant="horizontal" />

                        <div>
                          <br />
                          <TextField
                            label="Title"
                            name="title"
                            value={supportLanguage.title}
                            onChange={handleEditInputChange}
                            fullWidth
                          />
                          <br />
                          <br />
                          <TextField
                            label="Short Description"
                            name="shortDescription"
                            value={supportLanguage.shortDescription}
                            onChange={handleEditInputChange}
                            fullWidth
                          />
                          <br />
                          <br />
                          <TextField
                            label="Long Description"
                            name="longDescription"
                            value={supportLanguage.longDescription}
                            onChange={handleEditInputChange}
                            fullWidth
                            multiline
                            rows={4}
                          />
                          <br />
                          <br />
                        </div>
                      </>
                    ) : (
                      // Se o idioma não existir no array, renderize os campos vazios
                      <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ marginRight: 2 }} variant="h5">
                          {selectedLanguageDetails.name}
                        </Typography>
                        <Flag country={selectedLanguageDetails.code.toUpperCase()} />
                        <div style={{ marginLeft: 'auto' }}>
                          <Button variant="contained" sx={{ marginRight: '4px' }} onClick={closeLangModal}>
                            Cancel
                          </Button>
                          <Button variant="contained" onClick={handleAddLanguage}>
                            Save <CheckIcon sx={{ marginLeft: '4px' }} />
                          </Button>
                        </div>
                      </div>
                        <br />
                        <Divider variant="horizontal" />

                        <div>
                          <br />
                          <TextField
                            label="Title"
                            name="title"
                            value={newLanguage.title}
                            onChange={handleInputChange}
                            fullWidth
                          />
                          <br />


                          <br />
                          <TextField
                            label="Short Description"
                            name="shortDescription"
                            value={newLanguage.shortDescription}
                            onChange={handleInputChange}
                            fullWidth
                          />
                          <br />
                          <br />
                          <TextField
                            label="Long Description"
                            name="longDescription"
                            value={newLanguage.longDescription}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={4}
                          />
                          <br />
                          <br />

                    
                        </div>
                      </>
                    )}
                    {/* Adicione instruções console.log aqui para depurar */}
                    {console.log("languages: ", languages)}
                    {console.log("selectedLanguageDetails: ", selectedLanguageDetails)}
                  </>
                )}
              </Box>
            </Modal>
            <br/>
            <h2 className="text-center">Tell your travellers what the expirience is all about</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Describe your expirience in detail, using exciting and engaging language to capture the essence of the expirience.</h4> 
            <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
      <List
        id="language-list"
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
        {['PT', 'US', 'FR', 'ES', 'DE'].map((language) => (
          <ListItem
            key={language}
            onClick={() => togglePresentLanguageSelection(language)}
            button
            selected={selectedPresentLanguages.includes(language)}
          >
            <ListItemText>
              <Flag country={language.toUpperCase()} /> {getLanguageName(language)}
            </ListItemText>
          </ListItem>
        ))}
      </List>

      {/* Display selected languages */}
<List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
  {selectedPresentLanguages.map((language) => (
    <ListItem
      sx={{ marginTop: 10, height: 20 }}
      key={language}
      button
      onClick={() => openLangModal(language)}
      secondaryAction={
        <button onClick={(e) => { e.stopPropagation(); toggleComplexLanguageSelection(language); }}>X</button>
      }
    >
      <ListItemText primary={getLanguageName(language)} />
    </ListItem>
  ))}
</List>


    </Box>

        <br/>
            <br/>
            {isLanguageFormVisible && (
            <div>
                <br />
                <TextField
                  label="Title"
                  name="title"
                  value={newLanguage.title}
                  onChange={handleInputChange}
                  fullWidth
                />
                <br />
                <br />
                <TextField
                  label="Short Description"
                  name="shortDescription"
                  value={newLanguage.shortDescription}
                  onChange={handleInputChange}
                  fullWidth
                />
                <br />
                <br />
                <TextField
                  label="Long Description"
                  name="longDescription"
                  value={newLanguage.longDescription}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                />
                <br />
                <br />

                <Button
                variant="contained"
                onClick={handleAddLanguage}
                  >
                    Add <CheckIcon />
                  </Button>
            </div>
            )}
           
            <br/>
            <h2 className="text-center">Want to add Photos to your expirience?</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Show travellers even more details about your expirience to give your travellers a better idea of what to expect.</h4>
            <br/>
            <Container>
      <Grid container spacing={2}>
      <Grid item xs={12}>
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
            height: containerHeight,
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
                  height: '100p',
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
    <br/>
            <h2 className="text-center">Want to add videos to your expirience?</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Show travellers even more details in videos about your expirience to give your travellers a better idea of what to expect.</h4>
            <br/>
            <TextField onChange={handleVideoChange} id="outlined-size-normal" fullWidth defaultValue="link." />
            <br/>
            <br/>
    </div>
    
    }


{activeStep === 2 &&     
            
            <div>


<Modal open={openStartTimeModal} onClose={handleCloseStartTimeModal}>
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
    <h1 className="text-center">  Start - Time & Duration 🕖 | Edit Start - Time & Duration</h1>
    <IconButton
      edge="end" // Coloque o botão no canto direito
      color="inherit"
      onClick={handleCloseResourcesModal}
      aria-label="close"
      sx={{ marginLeft: 155, marginTop: -8 }}
    >
      <CloseIcon />
    </IconButton>
    <br />
    <br />

    <br/>
      <h2 className="text-center">Set up your Experience Start Time</h2>
      <h4 className="text-center" style={{ color: 'gray' }}>Give your Experience a start - time that suits this epirience best.</h4>

            <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > :not(style)': { m: 1 },
        marginRight: '18px',
      }}
    >
      <Box>
        <InputLabel>Horas</InputLabel>
        <Select
          label="Hour"
          value={hour}
          onChange={handleHourChange}
        >
          {[...Array(24).keys()].map((h) => (
            <MenuItem key={h} value={h}>
              {h}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <InputLabel>Minutos</InputLabel>
        <Select
          label="Minute"
          value={minute}
          onChange={handleMinuteChange}
        >
          {[...Array(60).keys()].map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <InputLabel>Segundos</InputLabel>
        <Select
          label="Second"
          value={second}
          onChange={handleSecondChange}
        >
          {[...Array(60).keys()].map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>

   <h2 className="text-center">Set up your Experience Duration</h2>
   <h4 className="text-center" style={{ color: 'gray' }}>Give your Experience a Duration that suit's it best.</h4>
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
      <Box>
        <InputLabel>Horas</InputLabel>
        <Select
          label="Hour"
          value={hourDuration}
          onChange={handleHourDurationChange}
        >
          {[...Array(24).keys()].map((h) => (
            <MenuItem key={h} value={h}>
              {h}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <InputLabel>Minutos</InputLabel>
        <Select
          label="Minute"
          value={minuteDuration}
          onChange={handleMinuteDurationChange}
        >
          {[...Array(60).keys()].map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <InputLabel>Segundos</InputLabel>
        <Select
          label="Second"
          value={secondDuration}
          onChange={handleSecondDurationChange}
        >
          {[...Array(60).keys()].map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>


    <br />
    <div>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseStartTimeModal}>
            cancel </Button>
        <Button variant="contained" onClick={handleEditTime}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
  </Box>
</Box>
</Modal>

            <h2 className="text-center">Set up your Experience Start Time</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Give your Experience a code that serves as a presentation.</h4>
            <br />

            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedTimes.length > 0 ? (
                    selectedTimes.map((time, index) => (
                      <TableRow key={index}>
                        <TableCell>{time.value}</TableCell>
                        <TableCell>{time.duration}</TableCell>
                        <TableCell>
                          <Button vaidriant="contained" color="primary" onClick={() => handleOpenStartTimeModal(time, index)}>
                            <EditIcon/>
                          </Button>
                          <Button variant="contained" color="primary" onClick={() => handleRemoveTime(index)}>
                            <DeleteIcon/>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell sx={{left: 10}} colSpan={2} align="center">
                        No times selected.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <br/>
      <h2 className="text-center">Set up your Experience Start Time</h2>
      <h4 className="text-center" style={{ color: 'gray' }}>Give your Experience a start - time that suits this epirience best.</h4>

            <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > :not(style)': { m: 1 },
        marginRight: '18px',
      }}
    >
      <Box>
        <InputLabel>Horas</InputLabel>
        <Select
          label="Hour"
          value={hour}
          onChange={handleHourChange}
        >
          {[...Array(24).keys()].map((h) => (
            <MenuItem key={h} value={h}>
              {h}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <InputLabel>Minutos</InputLabel>
        <Select
          label="Minute"
          value={minute}
          onChange={handleMinuteChange}
        >
          {[...Array(60).keys()].map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <InputLabel>Segundos</InputLabel>
        <Select
          label="Second"
          value={second}
          onChange={handleSecondChange}
        >
          {[...Array(60).keys()].map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>

   <h2 className="text-center">Set up your Experience Duration</h2>
   <h4 className="text-center" style={{ color: 'gray' }}>Give your Experience a Duration that suit's it best.</h4>
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
      <Box>
        <InputLabel>Horas</InputLabel>
        <Select
          label="Hour"
          value={hourDuration}
          onChange={handleHourDurationChange}
        >
          {[...Array(24).keys()].map((h) => (
            <MenuItem key={h} value={h}>
              {h}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <InputLabel>Minutos</InputLabel>
        <Select
          label="Minute"
          value={minuteDuration}
          onChange={handleMinuteDurationChange}
        >
          {[...Array(60).keys()].map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <InputLabel>Segundos</InputLabel>
        <Select
          label="Second"
          value={secondDuration}
          onChange={handleSecondDurationChange}
        >
          {[...Array(60).keys()].map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
    <br/>
          <br />
      <Button fullWidth variant="contained" color="primary" onClick={handleAddTime}>
        Add 
      </Button>


            <br />
                  <br />
                        <br />
          </div>
    
    }



{activeStep === 3 && (

                
<div>
            <br/>
            <h2 className="text-center">What is Include in your Expirience ?</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Let travellers know what is  provided to help them understand what they are paying for. Included items such as food and drinks, special equipmentm and adnission fees.</h4>
            <br/>
            <List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
            {selectedInclusions.map((language) => (
              <ListItem
                sx={{marginTop: 10 ,height: 20}}
                key={language}
                button
                //onClick={() => openLangModal(language)}
                secondaryAction={<button onClick={() => toggleInclusionSelection(language)}>X</button>}
              >
                <ListItemText primary={language} />
              </ListItem>
            ))}
          </List>
          <br/>
          <Box>
                  <Button variant="contained" onClick={handleOpenInclusionsModal}>
                  Add Inclusions <AddIcon/>
                  </Button>
            <Modal open={openInclusions} onClose={handleCloseInclusionsModal}>
            <Box
            sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            width: "50%",
            height: "60%",
            //margin: "auto",
            marginTop: "300px",
            marginLeft: "950px",
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
              width: "50%",
              height: "60%",
              //overflow: "auto",
            }}
            >
                <Box
                  sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                >

                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', marginTop: 8 }}
                  >
                    {classesData.map((option, index) => (
                      <Tab
                        key={index}
                        label={option.title}
                        {...a11yProps(index)}
                        onClick={() => selectClass(option.title)}
                      />
                    ))}
                  </Tabs>

                  {classesData.map((option, index) => (
                    <TabPanel value={value} index={index} key={index}>
                      <Typography variant="h4" mb={2}>
                        Inclusions | {option.title}
                      </Typography>
                      <Divider />
                      <br/>

                      {productInclusions.map((item) => {
                        if (item.type === option.title) {
                          return (
                            <label key={item._id} style={{ display: 'block' }}>
                              <input
                                type="checkbox"
                                checked={selectedInclusions.includes(item.title)}
                                onChange={() => handleInclusionSelection(item)}
                              />
                              {item.title}
                            </label>
                          );
                        }
                        return null;
                      })}
                      <br />
                    </TabPanel>
                  ))}
              </Box>
              <br/>
            <br/>
    <div>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseInclusionsModal}>
            cancel </Button>
        <Button variant="contained" onClick={handleAddInclusions}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
        </Box>
        </Box>
      </Modal>
      </Box>
            <br/>
            <TextField fullWidth onChange={handleExclusionsDescriptionChange}
            id="outlined-multiline-static"
            label="Things to Bring"
            multiline
            rows={4}
            defaultValue="Default Value"
            width="300px"
            />

<br/>
            <h2 className="text-center">What is Not Include in your Expirience ?</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Let travellers know what is not  provided to help them understand what they are paying for. Included items such as food and drinks, special equipmentm and adnission fees.</h4>
            <br/>
            <List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
            {selectedExclusions.map((language) => (
              <ListItem
                sx={{marginTop: 10 ,height: 20}}
                key={language}
                button
                //onClick={() => openLangModal(language)}
                secondaryAction={<button onClick={() => toggleExclusionSelection(language)}>X</button>}
              >
                <ListItemText primary={language} />
              </ListItem>
            ))}
          </List>
      <br/>
            <Box>

              <Button variant="contained" onClick={handleOpenExclusionsModal}>
                  Add Exclusions <AddIcon/>
              </Button>

      <Modal open={openExclusions} onClose={handleCloseExclusionsModal}>
        <Box
            sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            width: "50%",
            height: "60%",
            //margin: "auto",
            marginTop: "300px",
            marginLeft: "950px",
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
              width: "50%",
              height: "60%",
              //overflow: "auto",
            }}
            >
          <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >

          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', marginTop: 8 }}
          >
            {classesData.map((option, index) => (
              <Tab
                key={index}
                label={option.title}
                {...a11yProps(index)}
                onClick={() => selectClass(option.title)}
              />
            ))}
          </Tabs>

          {classesData.map((option, index) => (
            <TabPanel value={value} index={index} key={index}>
              <Typography variant="h4" mb={2}>
                Exclusions | {option.title}
              </Typography>
              <Divider />
              <br/>

              {productExclusions.map((item) => {
                if (item.type === option.title) {
                  return (
                    <label key={item._id} style={{ display: 'block' }}>
                      <input
                        type="checkbox"
                        checked={selectedExclusions.includes(item.title)}
                        onChange={() => handleExclusionSelection(item)}
                      />
                      {item.title}
                    </label>
                  );
                }
                return null;
              })}
              <br />
            </TabPanel>
          ))}

        </Box>
    <br/>
    <br/>
    <div>
       <Button variant="contained" sx={{marginLeft:'4px'}} onClick={handleCloseExclusionsModal}>
            cancel </Button>
        <Button variant="contained" onClick={handleAddExclusions}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
</Box>
</Box>
</Modal>
</Box>
<br/>
<TextField fullWidth onChange={handleExclusionsDescriptionChange}
id="outlined-multiline-static"
label="Things to Bring"
multiline
rows={4}
defaultValue="Default Value"
width="300px"
/>



<br/>
<h2 className="text-center">Pick Languages available on the tour.</h2>
<h4 className="text-center" style={{ color: 'gray' }}>Inform travellers about the available translators in the tour.</h4>
<br/>
<List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
    {selectedConstraintLanguages.map((language) => (
      <ListItem
            sx={{marginTop: 10 ,height: 20}}
            key={language}
            button
            onClick={() => openLangModal(language)}
            secondaryAction={<button onClick={() => toggleConstraintLanguageSelection(language)}>X</button>}
          >
            <ListItemText primary={getLanguageName(language)} />
          </ListItem>
        ))}
      </List>
      <Box>
      <br/>

      <Button variant="contained" onClick={handleOpenLanguagesModal}>
      Select Languages<AddIcon/>
      </Button>

      <Modal open={openLanguages} onClose={handleCloseLanguagesModal}>
        <Box
        sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        width: "50%",
        height: "60%",
        margin: "auto",
        marginTop: "300px",
        marginLeft: "950px",
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
          width: "50%",
          height: "60%",
          overflow: "auto",
        }}
        >
        <Typography variant="h4" mb={2}>
              Languages | All Languages
        </Typography>
        <Divider />
        <br/>
        <List
        id="language-list"
        style={{
            maxHeight: '300px',
            overflowY: 'auto',
        }}
            >
                {allCountryCodes.map((language) => (
                  <ListItem
                    key={language}
                    onClick={() => toggleConstraintLanguageSelection(language)}
                    button
                    selected={selectedConstraintLanguages.includes(language)}
                  >
                    <ListItemText>
                      <Flag country={language.toUpperCase()} /> {getLanguageName(language)}
                    </ListItemText>
                  </ListItem>
                ))}
            </List>
        <div>
        <br/>
          <br/>
              <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseLanguagesModal}>
                    cancel </Button>
                <Button variant="contained" onClick={handleAddLanguages}>
                    Save <CheckIcon sx={{marginLeft:'4px'}}/>
                </Button>
              </div> 
            </Box>
        </Box>
  </Modal>
  </Box>

<br/>

<br/>
</div>

            )}
{activeStep === 4 &&    <div>
  <br/>
            <h2 className="text-center">Establish your Pricing
            
             Categories.</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>You can define different types of travellers, such as adults, childrenm and groups. This will allow you to change different prices for each pricing category, so that you can tailor your pricing to the specific needs of your travellers. </h4>
            <br/>
            
            <br/>
            <h2 className="text-center">Would you like to offer multiple rates for your expirience?</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Rates allow you to price your options separatly. For example, settig additional price for lunch or pick - up.</h4>
            <br/>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Actions</TableCell> {/* Alinhar à direita */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productRates.map((rate) => (
                    <TableRow key={rate.id}>
                      <TableCell>
                        <DirectionsBusIcon fontSize="medium" /> {rate.title}
                      </TableCell>
                      <TableCell align="right"> {/* Alinhar à direita */}
                        <IconButton onClick={() => handleOpenEditRateModal(rate)}>
                          <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => handleRemoveRate(rate.idRate)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleSetDefault(rate.id)}
                          style={{ 
                            backgroundColor: rate.sel === 1 ? 'transparent' : '#808080', 
                            color: rate.sel === 1 ? '#000000' : '#ffffff' 
                          }}
                        >
                          Default
                        </IconButton>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
         <br/>
      <Box>
    <Button fullWidth variant="contained" onClick={handleOpenModal}>
          Add  Rate <AddIcon/>
    </Button>
  <Modal open={open} onClose={handleCloseModal}>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      p: 2,
      width: "80%",
      maxheight: "300px",
      margin: "auto",
      marginTop: "10px",
      marginLeft: "300px",
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
        width: "60%",
        maxheight: "300px",
        overflowY: "auto",
      }}
    >  
        <h1 className="text-center" >Price 💲| Create your expirience's pricing strategy</h1>
        <Divider variant="middle" />
        <br/>
        <TextField label="Rate Title" id="outlined-size-normal" onChange={handleRateTitleChange} defaultValue="" sx={{width:'250px'}}/>
          <br/>
              <Box display="flex" alignItems="center">
              <Typography>Price p/ Person</Typography>
              <IOSSwitch
                sx={{ marginRight: '10px', marginLeft: '5px' }}
                checked={showPricePerPerson}
                onChange={handlePricePerPersonChange}
              />
              <Typography>Price p/ Group</Typography>
              <IOSSwitch
                sx={{ marginRight: '10px', marginLeft: '5px' }}
                checked={showPricePerGroup}
                onChange={handlePricePerGroupChange}
              />
            </Box>
        <br/>
        {showPricePerPerson && (
        <div style={{ maxHeight: 800, overflowY: "auto", width: 800}}>
          <br/>
            <h2 className="text-center">Chose the number of people allowed in the rate / tour</h2>
           <h4 className="text-center" style={{ color: 'gray' }}>To better organise the trip, pick the limits in terms of travellers.</h4>
         <br/>
        <Grid container spacing={2} sx={{marginLeft:'220px'}}>
        <Grid item xs={2}>
          <TextField
            label="Número Mínimo de Integrantes"
            type="number"
            value={minIntegrantes}
            onChange={(e) => setMinIntegrantes(e.target.value)}
            
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Número Máximo de Integrantes"
            type="number"
            value={maxIntegrantes}
            onChange={(e) => setMaxIntegrantes(e.target.value)}
            
          />
        </Grid>
      </Grid>


      <br/>

            <h2 className="text-center">Chose the Language for this Rate</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Chose the specific Language that this price suits better.</h4> 
            <br/>
            <List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        {selectedRateLanguages.map((language) => (
          <ListItem
            sx={{marginTop: 10 ,height: 20}}
            key={language}
            button
            //onClick={() => openLangModal(language)}
            secondaryAction={<button onClick={() => toggleLanguageSelection(language)}>X</button>}
          >
            <ListItemText primary={getLanguageName(language)} />
          </ListItem>
        ))}
      </List>
           
      <List
        id="language-list"
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
        {selectedConstraintLanguages.map((language) => (
          <ListItem
            key={language}
            onClick={() => toggleRateLanguageSelection(language)}
            button
            selected={selectedLanguages.includes(language)}
          >
            <ListItemText>
              <Flag country={language.toUpperCase()} /> {getLanguageName(language)}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <br/>
            <h2 className="text-center">Select all the cancellation Policys</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Select all the cancellation policys - terms for this rate.</h4> 

      
      <Box mt={2}>

      <br/>
        <h2 className="text-center">Chose the Start Times Attached to this specific Rate</h2>
        <h4 className="text-center" style={{ color: 'gray' }}>To better organise price according to start - time.</h4>
      <br/>
      <div>
        {selectedTimes.map((policy) => (
              <div key={policy.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      key={policy.id}
                      checked={selectedStartTimes.some((selectedPolicy) => selectedPolicy.id === policy.id)}
                      onChange={() => handleStartTimeCheckboxChange(policy)}
                    />
                  }
                  label={`${policy.value} Hr(s)  |   ${policy.duration} Hr(s)`}
                />
              </div>
            ))}
          </div>

          </Box>
          <br/>
          <Divider variant="middle" />
          <Box mt={2}>

          <br/>
            <h2 className="text-center">Chose the Age Restrictions for this Rate</h2>
           <h4 className="text-center" style={{ color: 'gray' }}>To better organise price according to Age ranges.</h4>
         <br/>
          <div style={{maxHeight:'120px', overflowY:'auto'}}>
          {ageRangesData.map((policy) => (
          <div key={policy._id} style={{ maxheight: "30%",
          overflowY: "auto"}}>
          <FormControlLabel
            control={
              <Checkbox
                key={policy._id}
                checked={selectedPolicies.some((selectedPolicy) => selectedPolicy._id === policy._id)}
                onChange={() => handleCheckboxChange(policy)}
              />
            }
            label={policy.title}
          />
        </div>
         ))}
        </div>
        </Box>
       

      <br/>
      <Button variant="contained" onClick={handleGenerateFields}>
       <ArrowDropDownIcon />
      </Button>


  <Box
  gap="10px"
  width="100%"
  left="400px"
  maxHeight="380px"
  sx={{
    overflow: 'auto',
  }}
    >
  {selectedPolicies.length > 0 ? (
    selectedPolicies.map((category) => (
      <div key={category.title}>
        <br/>
        <Typography variant="h6" sx={{marginLeft:38}}>{`${category.title} : ${category.startAge} - ${category.endAge}`}</Typography>
        {camposGerados[category.title] &&
          camposGerados[category.title].map((campo) => (
            <Paper key={campo.id} elevation={3} style={{ margin: '10px', padding: '10px' }}>
              <Box display="flex" alignItems="center">
                        <TextField
                          label="Participantes Mínimos"
                          type="number"
                          value={campo.from}
                          onChange={(e) => handleLimitChange(category.title, campo.id, 'from', e.target.value)}
                          style={{ marginRight: '10px' }}
                        />
                        <Typography variant="subtitle1">-</Typography>
                        <TextField
                          label="Participantes Máximos"
                          type="number"
                          value={campo.to}
                          onChange={(e) => handleLimitChange(category.title, campo.id, 'to', e.target.value)}
                          style={{ margin: '0 10px' }}
                        />
                        <Typography variant="subtitle1">-</Typography>
                        <TextField
                          label="Preço"
                          type="number"
                          value={campo.price}
                          onChange={(e) => handlePriceChange(category.title, campo.id, e)}
                          style={{ marginRight: '10px' }}
                        />
                         <TextField
                          label="Desconto (Percentual)"
                          type="number"
                          value={campo.descount}
                          onChange={(e) => handleDescountChange(category.title, campo.id, e)}
                          style={{ marDescountRight: '10px' }}
                            InputProps={{
                            endAdornment: '%',
                          }}
                        />
                        <IconButton
                          aria-label="Remover"
                          onClick={() => handleRemoveField(category.title, campo.id)}
                        >
                          <DeleteIcon />
                    </IconButton>
                </Box>
            </Paper>
          ))}
        <br/>
        <Button fullWidth variant="contained" onClick={() => handleAddField(category.title)}>
          <AddIcon/>
        </Button>
      </div>
    ))
  ) : (
    <Typography variant="body1">Nenhuma política selecionada.</Typography>
  )}
</Box>


    
      
        </div>
      )}

{showPricePerGroup && (
  <div >
    {/* Conteúdo para Price p/ Group */}
    
    <div >
      <TextField
        label="Mínimo de Participantes"
        type="number"
        value={minParticipantsPerGroup}
        onChange={(e) => setMinParticipantsPerGroup(e.target.value)}
        sx={{marginLeft:'50px'}}
      />
      <TextField
        label="Máximo de Participantes"
        type="number"
        value={maxParticipantsPerGroup}
        onChange={(e) => setMaxParticipantsPerGroup(e.target.value)}
        sx={{marginLeft:'10px'}}
      />
      <TextField
        label="Preço"
        type="number"
        value={price}
        onChange={(e) => setPricePerGroupSingular(e.target.value)}
        sx={{marginLeft:'10px'}}
      />
      
    </div>
    <br/>
    <Button variant="contained" sx={{marginLeft:'10px', width:'650px'}} onClick={handleAddPricePerGroup}>
            <AddIcon/>
    </Button>
    <br/>
    <br/>
    <Box
        gap="10px"
        width="100%"
        left="400px"
        maxHeight="380px"
        sx={{
          overflow: 'auto',
        }}
      >
    {pricePerGroup.length > 0 && (
      <div>
        {pricePerGroup.map((price, index) => (
          <Paper key={index} elevation={3} style={{ margin: '10px', padding: '10px' }}>
            <Box display="flex" alignItems="center">
             
              <TextField
                type="number"
                label="Min Participants"
                value={price.min}
                onChange={(e) => handleUpdatePrice(index, 'min', e.target.value)}
                style={{ marginRight: '10px' }}
              />
            
              <TextField
                type="number"
                label="Max Participants"
                value={price.max}
                onChange={(e) => handleUpdatePrice(index, 'max', e.target.value)}
                style={{ marginRight: '10px' }}
              />
              
              <TextField
                type="number"
                label="Price"
                value={price.price}
                onChange={(e) => handleUpdatePrice(index, 'price', e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <IconButton
                aria-label="Remover"
                onClick={() => handleRemovePrice(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </div>
    )}
    </Box>
  </div>
)}
<br/>

       <div>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseModal}>
            cancel </Button>
        <Button variant="contained" onClick={handleAddRate}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
        
      </Box>
    </Box>
  </Modal>

  {temporaryRate && (
  <Modal open={openEditRate} onClose={handleCloseEditRateModal}>
   <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      p: 2,
      width: "80%",
      maxheight: "300px",
      margin: "auto",
      marginTop: "10px",
      marginLeft: "300px",
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
        width: "60%",
        maxheight: "300px",
        overflowY: "auto",
      }}
    >  
        <h1 className="text-center" >Price 💲| Create your expirience's pricing strategy</h1>
        <Divider variant="middle" />
        <br/>
        <TextField label="Rate Title" id="outlined-size-normal" onChange={handleRateTitleChange} defaultValue={rateTitle} sx={{width:'250px'}}/>
        <br/>
              <Box display="flex" alignItems="center">
              <Typography>Price p/ Person</Typography>
              <IOSSwitch
                sx={{ marginRight: '10px', marginLeft: '5px' }}
                checked={showPricePerPerson}
                onChange={handlePricePerPersonChange}
              />
              <Typography>Price p/ Group</Typography>
              <IOSSwitch
                sx={{ marginRight: '10px', marginLeft: '5px' }}
                checked={showPricePerGroup}
                onChange={handlePricePerGroupChange}
              />
            </Box>
        <br/>
        {showPricePerPerson && (
        <div style={{ maxHeight: 800, overflowY: "auto", width: 800}}>
          <br/>
            <h2 className="text-center">Chose the number of people allowed in the rate / tour</h2>
           <h4 className="text-center" style={{ color: 'gray' }}>To better organise the trip, pick the limits in terms of travellers.</h4>
         <br/>
        <Grid container spacing={2} sx={{marginLeft:'220px'}}>
        <Grid item xs={2}>
          <TextField
            label="Número Mínimo de Integrantes"
            type="number"
            value={minIntegrantes}
            onChange={(e) => setMinIntegrantes(e.target.value)}
            
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Número Máximo de Integrantes"
            type="number"
            value={maxIntegrantes}
            onChange={(e) => setMaxIntegrantes(e.target.value)}
            
          />
        </Grid>
      </Grid>


      <br/>

            <h2 className="text-center">Chose the Language for this Rate</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Chose the specific Language that this price suits better.</h4> 
            <br/>
            <List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
            {selectedRateLanguages.map((language) => (
              <ListItem
                sx={{marginTop: 10 ,height: 20}}
                key={language}
                button
                //onClick={() => openLangModal(language)}
                secondaryAction={<button onClick={() => toggleRateLanguageSelection(language)}>X</button>}
              >
                <ListItemText primary={getLanguageName(language)} />
              </ListItem>
            ))}
          </List>
           
      <List
        id="language-list"
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
        {['pt', 'us', 'fr', 'es', 'de'].map((language) => (
          <ListItem
            key={language}
            onClick={() => toggleRateLanguageSelection(language)}
            button
            selected={selectedLanguages.includes(language)}
          >
            <ListItemText>
              <Flag country={language.toUpperCase()} /> {getLanguageName(language)}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <br/>
            <h2 className="text-center">Select all the cancellation Policys</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Select all the cancellation policys - terms for this rate.</h4> 

          
      <Box mt={2}>

      <br/>
        <h2 className="text-center">Chose the Start Times Attached to this specific Rate</h2>
        <h4 className="text-center" style={{ color: 'gray' }}>To better organise price according to start - time.</h4>
      <br/>
      <div>
            {selectedTimes.map((policy) => (
              <div key={policy.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      key={policy.id}
                      checked={selectedStartTimes.some((selectedPolicy) => selectedPolicy.id === policy.id)}
                      onChange={() => handleStartTimeCheckboxChange(policy)}
                    />
                  }
                  label={`${policy.value} Hr(s)  |   ${policy.duration} Hr(s)`}
                />
              </div>
            ))}
          </div>

          </Box>
          <br/>
          <Divider variant="middle" />
          <Box mt={2}>

          <br/>
            <h2 className="text-center">Chose the Age Restrictions for this Rate</h2>
           <h4 className="text-center" style={{ color: 'gray' }}>To better organise price according to Age ranges.</h4>
         <br/>
          <div>
          {ageRangesData.map((policy) => (
          <div key={policy._id} style={{ maxheight: "30%",
          overflowY: "auto"}}>
          <FormControlLabel
            control={
              <Checkbox
                key={policy._id}
                checked={selectedPolicies.some((selectedPolicy) => selectedPolicy._id === policy._id)}
                onChange={() => handleCheckboxChange(policy)}
              />
            }
            label={policy.title}
          />
        </div>
         ))}
        </div>
          </Box>
       

      <br/>
      <Button variant="contained" onClick={handleGenerateFields}>
       <ArrowDropDownIcon />
      </Button>


      <Box
        gap="10px"
        width="100%"
        left="400px"
        maxHeight="380px"
        sx={{
          overflow: 'auto',
        }}
      >
        {selectedPolicies.length > 0 ? (
          selectedPolicies.map((category) => (
            <div key={category.title}>
              <br/>
              <Typography variant="h6" sx={{marginLeft:38}}>{`${category.title} : ${category.startAge} - ${category.endAge}`}</Typography>
              {camposGerados[category.title] &&
                camposGerados[category.title].map((campo) => (
                  <Paper key={campo.id} elevation={3} style={{ margin: '10px', padding: '10px' }}>
                    <Box display="flex" alignItems="center">
                              <TextField
                                label="Participantes Mínimos"
                                type="number"
                                value={campo.from}
                                onChange={(e) => handleLimitChange(category.title, campo.id, 'from', e.target.value)}
                                style={{ marginRight: '10px' }}
                              />
                              <Typography variant="subtitle1">-</Typography>
                              <TextField
                                label="Participantes Máximos"
                                type="number"
                                value={campo.to}
                                onChange={(e) => handleLimitChange(category.title, campo.id, 'to', e.target.value)}
                                style={{ margin: '0 10px' }}
                              />
                              <Typography variant="subtitle1">-</Typography>
                              <TextField
                                label="Preço"
                                type="number"
                                value={campo.price}
                                onChange={(e) => handlePriceChange(category.title, campo.id, e)}
                                style={{ marginRight: '10px' }}
                              />
                              <TextField
                                label="Desconto"
                                type="number"
                                value={campo.descount}
                                onChange={(e) => handleDescountChange(category.title, campo.id, e)}
                                style={{ marDescountRight: '10px' }}
                              />
                              <IconButton
                                aria-label="Remover"
                                onClick={() => handleRemoveField(category.title, campo.id)}
                              >
                                <DeleteIcon />
                          </IconButton>
                      </Box>
                  </Paper>
                ))}
              <br/>
              <Button variant="contained" fullWidth onClick={() => handleAddField(category.title)}>
                <AddIcon/>
              </Button>
            </div>
          ))
        ) : (
          <Typography variant="body1">Nenhuma política selecionada.</Typography>
        )}
      </Box>

    
      
        </div>
      )}

{showPricePerGroup && (
  <div >
    {/* Conteúdo para Price p/ Group camposGerados */}
    
    <div >
      <TextField
        label="Mínimo de Participantes"
        type="number"
        value={minParticipantsPerGroup}
        onChange={(e) => setMinParticipantsPerGroup(e.target.value)}
        sx={{marginLeft:'50px'}}
      />
      <TextField
        label="Máximo de Participantes"
        type="number"
        value={maxParticipantsPerGroup}
        onChange={(e) => setMaxParticipantsPerGroup(e.target.value)}
        sx={{marginLeft:'10px'}}
      />
      <TextField
        label="Preço"
        type="number"
        value={price}
        onChange={(e) => setPricePerGroupSingular(e.target.value)}
        sx={{marginLeft:'10px'}}
      />
      
    </div>
    <br/>
    <Button variant="contained" sx={{marginLeft:'10px', width:'650px'}} onClick={handleAddPricePerGroup}>
            <AddIcon/>
    </Button>
    <br/>
    <br/>
    <Box
        gap="10px"
        width="100%"
        left="400px"
        maxHeight="380px"
        sx={{
          overflow: 'auto',
        }}
      >
    {pricePerGroup.length > 0 && (
      <div>
        {pricePerGroup.map((price, index) => (
          <Paper key={index} elevation={3} style={{ margin: '10px', padding: '10px' }}>
            <Box display="flex" alignItems="center">
             
              <TextField
                type="number"
                label="Min Participants"
                value={price.min}
                onChange={(e) => handleUpdatePrice(index, 'min', e.target.value)}
                style={{ marginRight: '10px' }}
              />
            
              <TextField
                type="number"
                label="Max Participants"
                value={price.max}
                onChange={(e) => handleUpdatePrice(index, 'max', e.target.value)}
                style={{ marginRight: '10px' }}
              />
              
              <TextField
                type="number"
                label="Price"
                value={price.price}
                onChange={(e) => handleUpdatePrice(index, 'price', e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <IconButton
                aria-label="Remover"
                onClick={() => handleRemovePrice(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </div>
    )}
    </Box>
  </div>
)}
<br/>

       <div>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseEditRateModal}>
            cancel </Button>
        <Button onClick={() => editRate(temporaryRate)} variant="contained" >
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
        
      </Box>
    </Box>
  </Modal>
  )}

</Box>
        <br/>
        <br/>
        </div>


}
{activeStep === 5 &&    <div>
  <br/>
            <h2 className="text-center">What to Bring.</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Help your travallers Prepare for the trip.</h4>
            <br/>
            <List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
              {selectedWhatToBrings.map((language) => (
                <ListItem
                  sx={{marginTop: 10 ,height: 20}}
                  key={language}
                  button
                  //onClick={() => openLangModal(language)}
                  secondaryAction={<button onClick={() => toggleWhatToBringSelection(language)}>X</button>}
                >
                  <ListItemText primary={language} />
                </ListItem>
              ))}
            </List>
            <br/>
            <Box>
              <Button variant="contained" onClick={handleOpenKnowBeforeYouGoModal}>
                 Add  Things to To Bring <AddIcon/>
              </Button>
              <Modal open={openKnowBeforeYouGo} onClose={handleCloseKnowBeforeYouGoModal}>
              <Box
                sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                width: "50%",
                height: "60%",
                //margin: "auto",
                marginTop: "300px",
                marginLeft: "950px",
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
                  width: "50%",
                  height: "60%",
                  //overflow: "auto",
                }}
                >
                <Box
                  sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
                >

                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', marginTop: 8 }}
                  >
                    {classesData.map((option, index) => (
                      <Tab
                        key={index}
                        label={option.title}
                        {...a11yProps(index)}
                        onClick={() => selectClass(option.title)}
                      />
                    ))}
                  </Tabs>

                  {classesData.map((option, index) => (
                    <TabPanel value={value} index={index} key={index}>
                      <Typography variant="h4" mb={2}>
                        What To bring | {option.title}
                      </Typography>
                      <Divider />
                      <br/>

                      {productWhatToBring.map((item) => {
                        if (item.type === option.title) {
                          return (
                            <label key={item._id} style={{ display: 'block' }}>
                              <input
                                type="checkbox"
                                checked={selectedWhatToBrings.includes(item.title)}
                                onChange={() => handleWhatToBringSelection(item)}
                              />
                              {item.title}
                            </label>
                          );
                        }
                        return null;
                      })}
                      <br />
                    </TabPanel>
                  ))}

              </Box>
                <br/>
                <br/>
                <div>
                  <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseKnowBeforeYouGoModal}>
                        cancel </Button>
                    <Button variant="contained" onClick={handleAddExclusions}>
                        Save <CheckIcon sx={{marginLeft:'4px'}}/>
                    </Button>

                  </div>
            </Box>
            </Box>
                  </Modal>
            </Box>
            <br/>

            <TextField fullWidth
          id="outlined-multiline-static"
          label="Know Before you Go"
          multiline
          rows={4}
          defaultValue="Default Value"
          onChange={handleKnowBeforeYouGoDescriptionChange}
        />
           
           
            <br/>
            <h2 className="text-center">Things to Know Before you go</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Is there anything your travellers may need to know before starting the tour?</h4>
            <br/>

            <TextField fullWidth
          id="outlined-multiline-static"
          label="Things to Bring"
          multiline
          rows={4}
          defaultValue="Default Value"
          width="300px"
          onChange={handleWhatToBringChange}
        />
        
        <br/>
        <br/>
          

        </div>


}
{activeStep === 6 &&    <div>


  <Modal open={openResourcesModal} onClose={handleCloseResourcesModal}>
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
    <h1 className="text-center">  Resources 🧰 | Create Resources for the Experience</h1>
    <IconButton
      edge="end" // Coloque o botão no canto direito
      color="inherit"
      onClick={handleCloseResourcesModal}
      aria-label="close"
      sx={{ marginLeft: 155, marginTop: -8 }}
    >
      <CloseIcon />
    </IconButton>
    <br />
    <br />

    <Container>
      {/* Fields on the right side */}
      <div style={{marginLeft: 200}}>

      <br/>
      <h2 className="text-center">Human Resources </h2>
      <h4 className="text-center" style={{ color: 'gray' }}>Select the Human Resources required to make this Expirience.</h4>
      <br/>

      <Select
          multiple
          value={selectedHumanResourceOptions}
          onChange={handleSelectHumanResourceChange}
          style={{ minWidth: 350 }}
        >
          {groupsData
            .filter(group => group.type === 'humans') // Filtra os dados pelo tipo "human"
            .map((group, index) => (
              <MenuItem key={index} value={group.title}>{group.title}</MenuItem>
            ))
          }
        </Select>

      <Button sx={{marginLeft: 3}} variant="contained" onClick={handleRemoveHumanResourceSelected}>
        <AutorenewIcon/>
      </Button>
      {optionsWithCountHumanResource.map((option, index) => (
        <div key={index} className="mb-3" >
          <FormLabel style={{ marginRight: "300px" }}>{option.title}:</FormLabel>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="outlined" onClick={() => handleDecrementHumanResource(index)} className="mr-1" sx={{ border: "none" }}>
              <DeleteIcon />
            </Button>
            <TextField
              type="number"
              value={option.number}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              style={{ width: '50px', textAlign: 'center' }}
              readOnly
            />
            <Button variant="outlined" onClick={() => handleIncrementHumanResource(index)} className="ml-1" sx={{ border: "none" }}>
              <AddIcon />
            </Button>
            <Button variant="contained" onClick={() => handleRemoveOptionFieldHumanResource(index)} className="ml-1">
              Remover
            </Button>
          </div>
        </div>
      ))}
      <br/>
      <h2 className="text-center">Material Resources </h2>
      <h4 className="text-center" style={{ color: 'gray' }}>Select the Material Resources required to make this Expirience.</h4>
      <br/>

      <Select
          multiple
          value={selectedMaterialResourceOptions}
          onChange={handleSelectMaterialResourceChange}
          style={{ minWidth: 350 }}
        >
          {groupsData
            .filter(group => group.type === 'materials') // Filtra os dados pelo tipo "human"
            .map((group, index) => (
              <MenuItem key={index} value={group.title}>{group.title}</MenuItem>
            ))
          }
        </Select>

      <Button sx={{marginLeft: 3}} variant="contained" onClick={handleRemoveMaterialResourceSelected}>
        <AutorenewIcon/>
      </Button>
      <br/>
      <Divider orientation="horizontal"/>
      <br/>
      {optionsWithCountMaterialResource.map((option, index) => (
        <div key={index} className="mb-3" >
          <FormLabel style={{ marginRight: "300px" }}>{option.title}:</FormLabel>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="outlined" onClick={() => handleDecrementMaterialResource(index)} className="mr-1" sx={{ border: "none" }}>
              <DeleteIcon />
            </Button>
            <TextField
              type="number"
              value={option.number}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              style={{ width: '50px', textAlign: 'center' }}
              readOnly
            />
            <Button variant="outlined" onClick={() => handleIncrementMaterialResource(index)} className="ml-1" sx={{ border: "none" }}>
              <AddIcon />
            </Button>
            <Button variant="contained" onClick={() => handleRemoveOptionFieldMaterialResource(index)} className="ml-1">
              Remover
            </Button>
          </div>
        </div>
      ))}
    </div>
     
      <br />
    </Container>
    <br />
    <div>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseResourcesModal}>
            cancel </Button>
        <Button variant="contained" onClick={handleCloseResourcesModal}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
  </Box>
</Box>
</Modal>

{productEditTasks && (
    <Modal open={openEditTasksModal} onClose={handleCloseEditTasksModal}>
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
            <h1 className="text-center">Add Task 📝 | Create a new Task required for the Expirience</h1>
            <IconButton
              edge="end" // Coloque o botão no canto direito
              color="inherit"
              onClick={handleCloseTasksModal}
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
                id="titleTask"
                label="Title"
                fullWidth
                margin="normal"
                onChange={(e) => setTitleTask(e.target.value)}
                value={titleTask}
              />
              <TextField
                id="descriptionTask"
                label="Description"
                fullWidth
                margin="normal"
                onChange={(e) => setDescriptionTask(e.target.value)}
                value={descriptionTask}
                multiline
                rows={4}
              />
            
              <br />

              {subtasks.map((subtask, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label={`Subtask ${index + 1}`}
                  fullWidth
                  margin="normal"
                  value={subtask}
                  onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  multiline
                  rows={1}
                />
                <IconButton onClick={() => handleRemoveSubtask(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

          <Button fullWidth variant="contained" onClick={handleAddSubtask} sx={{ marginTop: 5, marginLeft: 0 }}>
            Add Subtask
          </Button>
              <br />
            </Container>
            <br />
            <br />
            <div>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseEditTasksModal}>
            cancel </Button>
        <Button variant="contained" onClick={editarProductTask}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
          </Box>
        </Box>
      </Modal>
        )}

    <Modal open={openTasksModal} onClose={handleCloseTasksModal}>
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
            <h1 className="text-center">Add Task 📝 | Create a new Task required for the Expirience</h1>
            <IconButton
              edge="end" // Coloque o botão no canto direito
              color="inherit"
              onClick={handleCloseTasksModal}
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
                id="titleTask"
                label="Title"
                fullWidth
                margin="normal"
                onChange={(e) => setTitleTask(e.target.value)}
                value={titleTask}
              />
              <TextField
                id="descriptionTask"
                label="Description"
                fullWidth
                margin="normal"
                onChange={(e) => setDescriptionTask(e.target.value)}
                value={descriptionTask}
                multiline
                rows={4}
              />
            
              <br />

              {subtasks.map((subtask, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label={`Subtask ${index + 1}`}
                  fullWidth
                  margin="normal"
                  value={subtask}
                  onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  multiline
                  rows={1}
                />
                <IconButton onClick={() => handleRemoveSubtask(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

          <Button fullWidth variant="contained" onClick={handleAddSubtask} sx={{ marginTop: 5, marginLeft: 0 }}>
            Add Subtask
          </Button>



              <br />
            </Container>

            <div>
              <br/><br/>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseTasksModal}>
            cancel </Button>
        <Button variant="contained" onClick={addToProductTask}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
          </Box>
        </Box>
      </Modal>



  <br/>
            <h2 className="text-center">Tasks</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Set - up all the tasks necessary to make this experience.</h4>
            
          <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>N</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Number of sub - tasks</TableCell>
                    <TableCell align="right">Actions</TableCell> {/* Alinhar à direita */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productTasks.map((rate, index) => (
                    <TableRow key={rate.id}>
                       <TableCell>
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <ExtensionIcon fontSize="medium" /> {rate.title}
                      </TableCell>
                      <TableCell>{rate.subtasks.length}</TableCell>
                      <TableCell align="right"> {/* Alinhar à direita */}
                        <IconButton onClick={() => handleOpenEditTasksModal(rate)}>
                          <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => handleRemoveTask(rate.idTask)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br/>
              <Button fullWidth variant="contained" onClick={handleOpenTasksModal}>
              Add  Task <AddIcon/>
              </Button>
            <br/>
               <h2 className="text-center">Resources</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Set - up all the Resources necessary to make this experience.</h4>
            <br/>
              <Button variant="contained" onClick={handleOpenResourcesModal}>
              Add  Resource <AddIcon/>
              </Button>
              <br/>
              <br/>
        </div>


}
{activeStep === 7 &&    <div>

  <div>
    <br/>
               <Typography variant="h3" color={colors.grey[100]}>
                  <img src={success} alt="Icon-Success" style={{width:'170px', height:'auto', marginTop:"100px"}}/>
                </Typography>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>



}
            {/* Botões de navegação */}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={activeStep === steps.length - 1 ? updateDayTour : handleNext}
              >
                {activeStep === steps.length - 1 ? 'Confirm' : 'Save & Continue'}
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={updateDayTour}
                fullWidth
                sx={{marginTop: 3}}
              >
                Confirm <CheckIcon/>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
      </div>
    </Box>
      )}
    </div>


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









