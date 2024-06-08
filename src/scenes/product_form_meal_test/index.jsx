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
  Alert
} from "@mui/material";
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
import { CircularProgress } from '@mui/material';
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


const rates = [
  { id: 1, title: 'Rate 1' },
  { id: 2, title: 'Rate 2' },
  { id: 3, title: 'Rate 3' },
];

const steps = [
  { label: 'Basic Information', icon: <Person /> },
  { label: 'Media & Description', icon: <Email /> },
  { label: 'Inclusions & Exclusions', icon: <Phone /> },
  { label: 'Pricing', icon: <Phone /> },
  { label: 'Important Information', icon: <Phone /> },
  { label: 'Cancellation Policy', icon: <Phone /> },
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

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  const [testesData, setTestesData] = useState([
    { "_id": 1, "title": "Portuguese" },
    { "_id": 2, "title": "English" },
    { "_id": 3, "title": "Spanish" },
    // Adicione mais idiomas conforme necessário
  ]);

  useEffect(() => {
    // Simule um atraso para demonstração
    fetchDataInclusions();
    fetchDataExclusions();
    fetchDataCategories();
    fetchDataThemes();
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
  const [openCategories, setOpenCategories] = useState(false);
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
  const [selectedLanguages, setSelectedLanguages] = useState([]);
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

  // >>> Form fieling fields
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
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
  const [productCategories, setProductCategories] = useState(null);
  const [productThemes, setProductThemes] = useState(null);
  const [productWhatToBring, setProductWhatToBring] = useState(null);

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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLanguage((prevLanguage) => ({
      ...prevLanguage,
      [name]: value
    }));
  };

  const handleAddLanguage = () => {
    // Create a new language object from newLanguage state
    const languageObject = {
      title: newLanguage.title,
      shortDescription: newLanguage.shortDescription,
      longDescription: newLanguage.longDescription,
      language: language
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

    const newCamposGerados = {};

    categories.forEach((category) => {
      const newCampos = [];

      for (let i = from; i <= to; i += 2) {
        const field = {
          id: new Date().getTime() + i,
          from: i,
          to: Math.min(i + 1, to),
          price: '',
        };

        newCampos.push(field);
      }

      newCamposGerados[category.title] = newCampos;
    });

    setCamposGerados(newCamposGerados);
    setGeneratedArray([]);
  };

  // handleDrop

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


  const handleInicialHourChange = (event) => {
    setInicialHour(event.target.value);
  };

  const handleSuccessAlertClose = () => {
    setShowSuccessAlert(false);
  };

  const handleErrorAlertClose = () => {
    setShowErrorAlert(false);
  };

  // >>> Handle Submit -> Persist Day - Tour Activity



  const handlePostRequest = async () => {

    const data = {
      code: code,
      name: title,
      ml: 1,
      emo: "ml",
      type: "meal",
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
      rates: productRates
      // ... outros campos ...
  };
  
  console.log(data);
// handleAddRate

    try {
      const response = await fetch('/api/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

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


  const handleAddRate = () => {

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

    const newRate = {
      title: rateTitle,
      sel: 0,
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


  const handleOpenInclusionsModal = () => {
    setOpenInclusions(true);
  };

  const handleCloseInclusionsModal = () => {
    setOpenInclusions(false);
  };


  const handleOpenExclusionsModal = () => {
    setOpenExclusions(true);
  };

  const handleCloseExclusionsModal = () => {
    setOpenExclusions(false);
  };

  const handleOpenThemesModal = () => {
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
    setSelectedLanguages([])
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

  const handleLanguageSelection = (language) => {
    // Logic to toggle language selection
    // Assuming language is an object with a title property
    const languageTitle = language.title;
  
    if (selectedLanguages.includes(languageTitle)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== languageTitle));
    } else {
      setSelectedLanguages([...selectedLanguages, languageTitle]);
    }
  };

  const categoriesArray = ["Category 1", "Category 2", "Category 3"];
  const themesArray = ["Theme 1", "Theme 2", "Theme 3"];
  const inclusionsArray = ["Inclusion 1","Inclusion 2","Inclusion 3"];
  const exclusionsArray = ["Exclusion 1", "Exclusion 2", "Exclusion 3"];
  

  const inclusionsExclusions = ["Example 1", "Example 2", "Example 3"];


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


  const handleNext = () => {


  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  handleDebug();
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);

};

  
    return (

   
  
<Box m="20px" textAlign="center">
<Header title="MEAL 🍲" subtitle="Create a product with Meal features" />
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
                    <TextField label="Code" id="outlined-size-normal" onChange={handleCodeChange} defaultValue="" />
                  </Box>
                  <br />
      <h2 className="text-center">What's the total Duration of the Experience</h2>
      <h4 className="text-center" style={{ color: 'gray' }}>
        Inform your travellers about the duration of your experience so they can plan their time accordingly
      </h4>
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
        <TextField
          id="outlined-number"
          label="Hour"
          type="number"
          onChange={handleHourChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Minute"
          type="number"
          onChange={handleMinuteChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <br />
      <br />
      <h2 className="text-center">What's the Start Time of the Experience</h2>
      <h4 className="text-center" style={{ color: 'gray' }}>
        Inform your travellers about the start time of your experience so they can plan their time accordingly
      </h4>
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
        <TextField
          id="outlined-number"
          label="Hour"
          type="number"
          onChange={handleInicialHourChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Minute"
          type="number"
          //onChange={handleInicialMinuteChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
 
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
      <Typography variant="h3" mb={2}>
        Themes
      </Typography>
      <Divider />
        {productThemes.map((item) => (
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
               <Typography variant="h3" mb={2}>
                    Categories
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
            <br/>
            <h2 className="text-center">Tell your travellers what the expirience is all about</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Describe your expirience in detail, using exciting and engaging language to capture the essence of the expirience.</h4>
            <Fab 
            color="info"
            aria-label="add" 
            size="large"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} 
            sx={{marginLeft:'820px'}}>
              <TranslateIcon />
            </Fab>  
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleCloseMenu('pt')}><Flag country="PT" />  Portuguese</MenuItem>
              <MenuItem onClick={() => handleCloseMenu('en')}><Flag country="US" />  English</MenuItem>
              <MenuItem onClick={() => handleCloseMenu('fr')}><Flag country="FR" />  French</MenuItem>
              <MenuItem onClick={() => handleCloseMenu('es')}><Flag country="ES" />  Spanish</MenuItem>
              <MenuItem onClick={() => handleCloseMenu('de')}><Flag country="DE" />  German</MenuItem>
            </Menu>
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
<TextField
        label="Title"
        name="title"
        value={newLanguage.title}
        onChange={handleInputChange}
        fullWidth
      />
  <br/>
            <br/>
<TextField
        label="Short Description"
        name="shortDescription"
        value={newLanguage.shortDescription}
        onChange={handleInputChange}
   
        fullWidth
      />
            <br/>
            <br/>
            <TextField
        label="Long Description"
        name="longDescription"
        value={newLanguage.longDescription}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={4}
      />
      
        
          
            <br/>
            <br/>
            
            <Button variant="contained" onClick={handleAddLanguage}>
              Add <CheckIcon />
            </Button>
 <br/>
 <br/>

            
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
            {activeStep === 2 && (

                
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
   <Typography variant="h3" mb={2}>
        Inclusions
    </Typography>
   <Divider />
   {productInclusions.map((item) => (
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
<Button variant="contained" onClick={handleAddInclusions}>
  Add Inclusions <AddIcon />
</Button>
</Box>
</Box>
</Modal>

</Box>
<br/>
<TextField fullWidth onChange={handleInclusionsDescriptionChange}
          id="outlined-multiline-static"
          label="Things to Bring"
          multiline
          rows={4}
          defaultValue=""
          width="300px"
        />
        
          
            <br/>
            <h2 className="text-center">What is NOT Include in your Expirience ?</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Is there anything your travellers may need that is not included in your offering? Example: Food, Equipment or Addiotinal fees.</h4>
            <br/>


            <Box>
<Button variant="contained" onClick={handleOpenExclusionsModal}>
Select Exclusions <AddIcon/>
</Button>
<Modal open={openExclusions} onClose={handleCloseExclusionsModal}>
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
   <Typography variant="h3" mb={2}>
        Exclusions
    </Typography>
   <Divider />
   {productExclusions.map((item) => (
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
{activeStep === 3 &&    <div>
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
      height: "120%",
      margin: "auto",
      marginTop: "-150px",
      marginLeft: "300px"
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
        height: "60%",
        //overflow: "auto",
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
             {categories.map((category) => (
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
      ))}
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

       <Button onClick={handleGenerateArray}>g</Button>
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
{activeStep === 4 &&    <div>
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
{activeStep === 5 &&    <div>
  <br/>
            <h2 className="text-center">Cancellation Policy</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Informa travaellers about the rules referent to the service cancellation.</h4>
       
        </div>


}
{activeStep === 6 &&    <div>

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
                Voltar
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Enviar' : 'Próximo'}
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


