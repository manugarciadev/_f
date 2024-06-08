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




  useEffect(() => {
    // Simule um atraso para demonstração
    handleGenerateFields();
    // >>>
    fetchDataClasses();
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
}, 2000); // Tempo de atraso em milissegundos
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [openThemes, setOpenThemes] = useState(false);
  const [openResourcesModal, setOpenResourcesModal] = useState(false);
  const [openTasksModal, setOpenTasksModal] = useState(false);  
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [value, setValue] = useState(0);
  
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
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [selectedExclusions, setSelectedExclusions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
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
  const [code, setCode] = useState('');
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
  const [themes, setThemes] = useState(null)
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [image, setImage] = useState();
  const [video, setVideo] = useState(null);
  const [rates, setRates] = useState([]);
  const [productRates, setProductRates] = useState([]);
  const [inclusions, setInclusions] = useState();
  const [inclusionsDescription, setInclusionsDescription] = useState('');
  const [exclusions, setExclusions] = useState();
  const [exclusionsDescription, setExclusionsDescription] = useState('');
  const [languagesSelected, setLanguagesSelected] = useState();
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
  const [languages, setLanguages] = useState([]);
  const [productInclusions, setProductInclusions] = useState(null);
  const [productExclusions, setProductExclusions] = useState(null);
  const [productLanguages, setProductLanguages] = useState(null);
  const [ageRangesData, setAgeRangesData] = useState(null);
  const [productCategories, setProductCategories] = useState(null);
  const [productThemes, setProductThemes] = useState(null);
  const [productWhatToBring, setProductWhatToBring] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedStartTimes, setSelectedStartTimes] = useState([]);
  const [isLanguageFormVisible, setIsLanguageFormVisible] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
 const [subtasks, setSubtasks] = useState([]);
 const [groupsData, setGroupsData] = useState();
 const [classesData, setClassesData] = useState();
 const [selectedClass, setSelectedClass] = useState('');

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

  const openLangModal = (language) => {
    
    const languageDetails = {
      code: language,
      name: getLanguageName(language),
    };
    setSelectedLanguageDetails(languageDetails);
    setIsLangModalOpen(true);
    console.log(selectedLanguageDetails, isLangModalOpen);
  };

  const closeLangModal = () => {
    setIsLangModalOpen(false);
  };
  
// handleAdd
  const [newLanguage, setNewLanguage] = useState({
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


  const handleEditLanguage = () => {
    // Verifique se o idioma selecionado existe no array
    const editedLanguageIndex = languages.findIndex(language => language.language === selectedLanguageDetails.name);
    
    console.log(">>>",editedLanguageIndex);

    if (editedLanguageIndex !== -1) {
      // Faça uma cópia do array de idiomas
      const updatedLanguages = [...languages];
      
      // Atualize o objeto do idioma no array com os novos valores
      updatedLanguages[editedLanguageIndex] = {
        ...updatedLanguages[editedLanguageIndex],
        title: newLanguage.title,
        shortDescription: newLanguage.shortDescription,
        longDescription: newLanguage.longDescription
      };
      
      // Atualize o estado com o novo array de idiomas
      setLanguages(updatedLanguages);
    }
    
    // Feche o modal
    closeLangModal();
  };


  const handleAddLanguage = () => {
    // Create a new language object from newLanguage state
    const languageObject = {
      title: newLanguage.title,
      shortDescription: newLanguage.shortDescription,
      longDescription: newLanguage.longDescription,
      language: selectedLanguageDetails.name
    };

    // Add the language object to the languages array
    setLanguages([...languages, languageObject]);

    // Clear the input fields
    setNewLanguage({
      title: '',
      shortDescription: '',
      longDescription: '',
    });
    
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

const [productTasks, setProductTasks] = useState([]);

const addToProductTask = () => {
  const newTask = {
    title: titleTask,
    description: descriptionTask,
    subtasks: subtasks
  };
  // Aqui você pode adicionar a nova tarefa ao seu array de tarefas ou realizar qualquer outra operação necessária
  setProductTasks([...productTasks, newTask]);

  // >>>
};


// v4

// ::: Human Resources
  const [selectedHumanResourceOptions, setSelectedHumanResourceOptions] = useState([]);
  const [optionsWithCountHumanResource, setOptionsWithCountHumanResource] = useState([]);

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

  const handlePostRequest = async () => {

    const data = {
      //_id: 'c4567',
      code: code,
      name: title,
      ex: 1,
      emo: "ex",
      type: "day-tour-activity",
      day: day,
      hour: hour,
      minute: minute,
      localization: localization,
      themes: themes,
      shortDescription: shortDescription,
      description: longDescription,
      images: draggedImages,
      videos: video,
      // >>>
      inclusions: inclusions,
      inclusionsDescription,
      // >>>
      exclusions: exclusions,
      exclusionsDescription,
      // >>>
      languagesAvailable: languagesSelected,
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

      const response = await fetch('/api/day-tour-activity', {
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




// noteCount
const batistuta = () => {console.log("funcionouuuuuuuuuu")};
  
  // >>> Handling Debug

  const handleDebug = () => {
   
      console.log("Product Code ->",code);
      console.log("Product Title ->",title);
      console.log("Product Day ->",day);
      console.log("Product Hour ->",hour);
      console.log("Product Minute ->",minute);
      console.log("Product localization ->",localization);
      console.log("Product Categories ->",categories);
      console.log("Product Themes ->",themes);
      console.log("Product Short Description ->",shortDescription);
      console.log("Product Long Description ->",longDescription);
      console.log("Product Image ->",image);
      console.log("Product Video ->",video);
      console.log("Product Inclusions ->",inclusions);
      console.log("Product Inclusions Description ->",inclusionsDescription);
      console.log("Product Exclusions ->",exclusions);
      console.log("Product Exclusions Description ->",exclusionsDescription);
      console.log("Product Languages ->",languages);
      //console.log(price);
      console.log("Product Know Before You Go ->",knowBeforeYouGo);
      console.log("Product Know Before You Go Description ->",knowBeforeYouGoDescription);
      console.log("Product What to Bring ->",whatToBring);
      console.log("Product Cancellation Policy ->",cancelationPolicy);
      console.log("Rates ->",allRates);
      console.log("Rates ->",productRates);
      console.log("Images ->", draggedImages);
      console.log("Recivied Inclusions ->", productInclusions);
      console.log("Recivied Exclusions ->", productExclusions);
      console.log("Themes :", productThemes);
      console.log("Categories :", productCategories);
      console.log("Inclusions :", productInclusions);
      console.log("Exclusions :", productExclusions);
      console.log("Languages :", productLanguages);
      console.log("Languages :", productLanguages);
      console.log("Age Ranges :", ageRangesData);
      console.log("Start - Times :", selectedStartTimes);
      console.log("Categorys p Number Human:", optionsWithCountHumanResource);
      console.log("Categorys p Number Human:", optionsWithCountMaterialResource);
      console.log("Tasks:", productTasks);
      console.log("Classes:", classesData);
      console.log("selected Title:", selectedClass);
      console.log("product Themes:", productThemes);


      
      }

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

        const getLanguageName = (code) => {
          switch (code) {
            case 'pt':
              return 'Portuguese';
            case 'us':
              return 'English';
            case 'fr':
              return 'French';
            case 'es':
              return 'Spanish';
            case 'de':
              return 'German';
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
      //id: uuidv4(), // Gera um ID único para o novo rate
      title: rateTitle,
      sel: 0,
      startTimes: selectedStartTimes,
      price: newArray,
    };
  
    // Use uma função de callback para atualizar o estado com a nova taxa
    setProductRates((prevRates) => [...prevRates, newRate]);
  
    console.log(productRates);
  
    // Limpar os campos após adicionar a taxa
    setRateTitle('');
  };
  
  const handleRemoveRate = (idToRemove) => {
    // Filtrar as taxas para remover a taxa com o id correspondente
    const updatedRates = productRates.filter((rate) => rate.id !== idToRemove);
  
    // Atualizar o estado com as taxas filtradas
    setProductRates(updatedRates);
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


  const handleRemoveImage = (index) => {
    const updatedImages = [...draggedImages];
    updatedImages.splice(index, 1);
    setDraggedImages(updatedImages);
  };

  const addImage = (imageUrl) => {
    setDraggedImages([...draggedImages, imageUrl]);
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

  const handleOpenTasksModal = () => {
    setOpenTasksModal(true);
  };

  const handleCloseTasksModal = () => {
    setOpenTasksModal(false);
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
    handleCloseModal();
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
  

  // >>>


  const categoriesArray = ["Category 1", "Category 2", "Category 3"];
  const themesArray = ["Theme 1", "Theme 2", "Theme 3"];
  const inclusionsArray = ["Inclusion 1","Inclusion 2","Inclusion 3"];
  const exclusionsArray = ["Exclusion 1", "Exclusion 2", "Exclusion 3"];
  

  const inclusionsExclusions = ["Example 1", "Example 2", "Example 3"];

 const fetchDataGroups = async () => {
    try {
      const response = await axios.get('/api/groups');
      setGroupsData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataInclusions = async () => {
    try {
      const response = await axios.get('/api/inclusions');
      setProductInclusions(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataExclusions = async () => {
    try {
      const response = await axios.get('/api/exclusions');
      setProductExclusions(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
 
  const fetchDataCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setProductCategories(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataThemes = async () => {
    try {
      const response = await axios.get('/api/themes');
      setProductThemes(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataLanguages = async () => {
    try {
      const response = await axios.get('/api/languages');
      setProductLanguages(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataWhatToBring = async () => {
    try {
      const response = await axios.get('/api/what-to-bring');
      setProductWhatToBring(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataAgeRange = async () => {
    try {
      const response = await axios.get('/api/age-ranges');
      setAgeRangesData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataClasses = async () => {
    try {
      const response = await axios.get('/api/classes');
      setClassesData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };

  
  const handleAddTime = () => {
    if (hour !== '' && minute !== '') {
      const newTime = {
        id: new Date().getTime(), // Adiciona um ID único baseado em timestamp
        value: `${hour}:${minute}${second}`, // O valor real do start time
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
                   
                <h2 className="text-center">What is the Location of your Expirience</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Inform travellers about the city or town where your expirience takes place. This will help with filtering and searching online.</h4>
                <br/>
              
                <MapContainer
                    center={center}
                    zoom={10}
                    style={{ width: '30vw', height: '30vh', marginLeft:'20px', borderRadius: '10px', }}
                  >
                    <TileLayer
                      url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=gWxmhZ3tn1T2ihkx2CMD"
                      attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    />
                    {
                      statesData.features.map((state) => {
                        const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

                        return (<Polygon
                          pathOptions={{
                            fillColor: '#FD8D3C',
                            fillOpacity: 0.7,
                            weight: 2,
                            opacity: 1,
                            dashArray: 3,
                            color: 'white'
                          }}
                          positions={coordinates}
                          eventHandlers={{
                            mouseover: (e) => {
                              const layer = e.target;
                              layer.setStyle({
                                dashArray: "",
                                fillColor: "#BD0026",
                                fillOpacity: 0.7,
                                weight: 2,
                                opacity: 1,
                                color: "white",
                              })
                            },
                            mouseout: (e) => {
                              const layer = e.target;
                              layer.setStyle({
                                fillOpacity: 0.7,
                                weight: 2,
                                dashArray: "3",
                                color: 'white',
                                fillColor: '#FD8D3C'
                              });
                            },
                            click: (e) => {

                            }
                          }}
                        />)
                      })
                    }
               </MapContainer>
               <br/>

                <br/>
                <h2 className="text-center">Chose the Themes that best describe your Expirience</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Help your travallers find what they are looking for. Are you offering a walking tour?</h4>
                <br/>


                <Box>

                <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', // Adiciona alinhamento horizontal ao centro
              '& > :not(style)': { m: 1 },
              marginRight: '18px',
            }}
          >
          <Button variant="contained" onClick={handleOpenThemesModal}>
                  Add Themes <AddIcon/>
                </Button>
                <Button variant="contained" onClick={handleOpenCategoriesModal}>
                  Add Categories <AddIcon/>
                </Button>
          </Box>

       


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
            <Button variant="contained" onClick={handleAddThemes}>
              Add Themes <AddIcon />
            </Button>
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
            <Button variant="contained" onClick={handleAddCategories}>
              Add Categories <AddIcon />
            </Button>
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
  <Box sx={{ position: 'absolute', top: '50%', left: '50%', height: 600, width: 600, transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 3 }}>
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
              <Button sx={{ marginLeft: 38 }} onClick={closeLangModal}>
                <CloseIcon />
              </Button>
            </div>

            <br />
            <Divider variant="horizontal" />

            <div>
              <br />
              <TextField
                label="Title"
                name="title"
                value={languages.find(language => language.language === selectedLanguageDetails.name).title}
                onChange={handleInputChange}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Short Description"
                name="shortDescription"
                value={languages.find(language => language.language === selectedLanguageDetails.name).shortDescription}
                onChange={handleInputChange}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Long Description"
                name="longDescription"
                value={languages.find(language => language.language === selectedLanguageDetails.name).longDescription}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
              />
              <br />
              <br />

              <Button
                variant="contained"
                onClick={handleEditLanguage}
                fullWidth
              >
                Edit <EditIcon />
              </Button>
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
              <Button sx={{ marginLeft: 38 }} onClick={closeLangModal}>
                <CloseIcon />
              </Button>
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

              <Button
                variant="contained"
                onClick={handleAddLanguage}
                fullWidth
              >
                Add <CheckIcon />
              </Button>
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
        {['pt', 'us', 'fr', 'es', 'de'].map((language) => (
          <ListItem
            key={language}
            onClick={() => toggleLanguageSelection(language)}
            button
            selected={selectedLanguages.includes(language)}
          >
            <ListItemText>
              <Flag country={language.toUpperCase()} /> {getLanguageName(language)}
            </ListItemText>
          </ListItem>
        ))}
      </List>

      {/* Display selected languages */}
       <List sx={{ display: 'flex', flexDirection: 'row', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        {selectedLanguages.map((language) => (
          <ListItem
            sx={{marginTop: 10 ,height: 20}}
            key={language}
            button
            onClick={() => openLangModal(language)}
            secondaryAction={<button onClick={() => toggleLanguageSelection(language)}>X</button>}
          >
            <ListItemText primary={getLanguageName(language)} />
          </ListItem>
        ))}
      </List>

    </Box>

            <TableContainer style={{ marginLeft: '300px', width: '200px' }} component={Paper}>
        <Table>
          <TableBody>
            {languages.map((lang, index) => (
              <TableRow key={index}>
                <TableCell style={{ width: '100px' }}>
                  <strong>{lang.language}</strong>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteLanguage(index)}>
                    {/* Add a delete icon here */}
                    <DeleteIcon style={{ color: 'red' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
                          <Button variant="contained" color="primary" onClick={() => handleRemoveTime(index)}>
                            <DeleteIcon/>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
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
          value={setMinuteDuration}
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
    <Button variant="contained" onClick={handleAddInclusions}>
  Add Inclusions <AddIcon />
</Button> 
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
    <Button variant="contained" onClick={handleAddExclusions}>
  Add Exclusions <AddIcon />
</Button> 
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
<Box>
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
height: "50%",
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
}}
>
 {productLanguages.map((item) => (
<label key={item._id}>
<input
type="checkbox"
checked={selectedLanguages.includes(item.title)}
onChange={() => handleLanguageSelection(item)}
/>
{item.title}
</label>
))}
<br />
<Button variant="contained" onClick={handleAddLanguages}>
  Add Languages <AddIcon />
</Button>  </Box>
</Box>
</Modal>
</Box>

<br/>

<br/>
</div>

            )}
{activeStep === 4 &&    <div>
  <br/>
            <h2 className="text-center">Establish your Pricing Categories.</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>You can define different types of travellers, such as adults, childrenm and groups. This will allow you to change different prices for each pricing category, so that you can tailor your pricing to the specific needs of your travellers. </h4>
            <br/>

            <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ageRanges.map((ar) => (
            <TableRow key={ar.id}>
              <TableCell>{ar.title}</TableCell>
              <TableCell>     </TableCell>
              <TableCell>     </TableCell>
              <TableCell>     </TableCell>
              <TableCell>     </TableCell>
              <TableCell>     </TableCell>
              <TableCell>     </TableCell>
              <TableCell>     </TableCell>
              <TableCell>     </TableCell>
              <TableCell>     </TableCell>
              <TableCell>     </TableCell>
              <TableCell>
               {ar.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       </TableContainer>
            
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
                        <IconButton onClick={() => handleEdit(rate.id)}>
                          <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => handleRemoveRate(rate.id)}>
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
      maxheight: "120%",
      margin: "auto",
      marginTop: "-90px",
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
        maxheight: "60%",
        overflow: "auto",
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
        <div>
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





<Modal open={openCancellationPolicys} onClose={handleCloseCancellationPolicysModal}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            width: "50%",
            height: "50%",
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
               <Typography variant="h3" mb={2}>
                    Cancellation Policys
                </Typography>
               <Divider />
               <Box sx={{maxHeight:'100px', overflowY:'auto'}}>
               {productCategories.map((item) => (
                <label key={item._id}>
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(item.title)}
                    onChange={() => handleLanguageSelection(item)}
                  />
                  {item.title}
                </label>
              ))}
              </Box>
            <br />
            <Button variant="contained" onClick={handleAddCategories}>
              Add Cancellation Policys <AddIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
      <br/>

            <h2 className="text-center">Chose the Language for this Rate</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Chose the specific Language that this price suits better.</h4> 
           
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
            onClick={() => toggleLanguageSelection(language)}
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
            <br/>
            <Button variant="contained" onClick={handleOpenCancellationPolicysModal}>
                  Add Cancellation Policys <AddIcon/>
            </Button>
      
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
                  label={policy.value}
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
        <Button variant="contained" sx={{marginLeft:'10px', width:'650px'}} onClick={() => handleAddField(category.title)}>
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

       
        <Button variant="contained" onClick={handleAddRate}>
            Confirm <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>
      </Box>
    </Box>
  </Modal>
</Box>
        <br/>
        <br/>
        </div>


}
{activeStep === 5 &&    <div>
  <br/>
            <h2 className="text-center">Things to Know Before you go.</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Help your travallers Prepare for the trip.</h4>
            <br/>


            <Box>
              <Button variant="contained" onClick={handleOpenKnowBeforeYouGoModal}>
              Add  Things to Know before you Go <AddIcon/>
              </Button>
              <Modal open={openKnowBeforeYouGo} onClose={handleCloseKnowBeforeYouGoModal}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                        width: "30%",
                        height: "30%",
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
                      {productWhatToBring.map((item) => (
              <label key={item._id}>
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(item.title)}
                  onChange={() => handleLanguageSelection(item)}
                />
                {item.title}
              </label>
            ))}
                        <br />
                        <Button variant="contained" onClick={handleAddKnowBeforeYouGo}>
                          Add Languages <AddIcon />
                        </Button>
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
            <h2 className="text-center">What To to Bring</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Is there anything your travellers may need Bring to the tour?</h4>
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
            <h2 className="text-center">Cancelation Policy </h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Inform travellers about how and when their allowed to cancel the expirience.</h4>
            <br/>

            <TextField fullWidth
          id="outlined-multiline-static"
          label="Cancelation Policy"
          multiline
          rows={4}
          defaultValue="Default Value"
          width="300px"
          onChange={handleCancelationPolicyChange}
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

    


    <Button fullWidth variant="contained"  sx={{ marginTop: 5, marginLeft: 0 }}>
      Add Task <CheckIcon sx={{ marginLeft: '4px' }} />
    </Button>
  </Box>
</Box>
</Modal>

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

            
        

            <Button onClick={addToProductTask} fullWidth variant="contained"  sx={{ marginTop: 5, marginLeft: 0 }}>
              Add Task <CheckIcon sx={{ marginLeft: '4px' }} />
            </Button>
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
                    <TableCell>Days for reminder</TableCell>
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
                        <IconButton onClick={() => handleEdit(rate.id)}>
                          <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => handleRemoveRate(rate.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br/>
              <Button variant="contained" onClick={handleOpenTasksModal}>
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
                <Button onClick={handlePostRequest}> Submit Product</Button>
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
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Confirm' : 'Save & Continue'}
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









