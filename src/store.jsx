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
  Avatar,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogContent,
  DialogActions,



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
import { Person, Email, Phone, Done, Delete } from '@mui/icons-material';
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
import Autocomplete from '@mui/material/Autocomplete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// Delete
import {
  MapContainer,
  TileLayer,
  Polygon
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from './data';
import { Container, Grid, Paper, Select } from '@mui/material';
import success from "./success.png";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, DialogTitle } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import EditIcon from '@mui/icons-material/Edit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedIcon from '@mui/icons-material/Bed';

// handleAddRate

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

const rates = [
  { id: 1, title: 'Rate 1' },
  { id: 2, title: 'Rate 2' },
  { id: 3, title: 'Rate 3' },
];

const steps = [
  { label: 'Basic Information', icon: <Person /> },
  { label: 'Media & Description', icon: <Email /> },
  { label: 'Inclusions & Exclusions', icon: <Phone /> },
  { label: 'Seasons', icon: <WbSunnyIcon /> },
  { label: 'Rooms', icon: <BedIcon /> },
  { label: 'Important Information', icon: <Phone /> },
  { label: 'Cancellation Policy', icon: <Phone /> },
  { label: 'Finished', icon: <Done /> },
];

// handleAddRoom
const top100Films = [
  { label: 'Hotel' },
  { label: 'Guest House' },
  { label: 'Air Bnb' },
  { label: 'Pension'}];

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

// initial


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

const initialRoom = {
  codigo: '',
  titulo: '',
  descricao: '',
  tipoQuarto: '',
  temporadas: [],
};

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
  const [openModal, setOpenModal] = useState(false);
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [roomData, setRoomData] = useState(initialRoom);
  const [selectedIndex, setSelectedIndex] = useState(0); // Inicialmente, selecione o índice 0
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0); 
  const [rooms, setRooms] = useState([]);
  const [selectedTab, setSelectedTab] = useState('tab1'); 

  // >>> Form fieling fields selectedRoom
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
  const [roomIndex, setRoomIndex] = useState(null);
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [seasonTitle, setSeasonTitle] = useState(null);
  const [roomImage, setRoomImage] = useState(null);
  const [temporadaNome, setTemporadaNome] = useState('');
  const [temporadaPrecoHora, setTemporadaPrecoHora] = useState('');
  const [temporadaPrecoDia, setTemporadaPrecoDia] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [isChecked, setIsChecked] = useState({});
  const [selectionTypeRental, setSelectionTypeRental] = useState(null);
  const [selectionModelRental, setSelectionModelRental] = useState(null);
  const [selectionBrandRental, setSelectionBrandRental] = useState(null);

  const [newLanguage, setNewLanguage] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    language: '',
  });

  const [seasonsTst, setSeasonsTst] = useState([
    {
      id: 1,
      startDate: "2023-03-21",
      endDate: "2023-06-20",
      seasonTitle: "Epoca Alta",
      pricePerHour: 0, // Adicione o preço por hora aqui
      pricePerDay: 0,  // Adicione o preço por dia aqui
      tiers: [],
    },
    {
      id: 2,
      startDate: "2023-03-21",
      endDate: "2023-06-20",
      seasonTitle: "Epoca Baixa",
      pricePerHour: 0, // Adicione o preço por hora aqui
      pricePerDay: 0,  // Adicione o preço por dia aqui
      tiers: [],
    },
 
    // Outras estações...
  ]);
  
  const [seasons, setSeasons] = useState([]);
   const [examples, setExamples] = useState(null);
  const [selectedPolicies, setSelectedPolicies] = useState([]);

  const handleDebugCp = () => {console.log(selectedPolicies)};


  const selectedSeason = seasonsTst[selectedIndex];

  const selectedRoom = rooms[selectedRoomIndex];

  const handleChange = (event) => {
      setSelectedIndex(event.target.value);
  };

  const handleChangeRoomSelected = (event) => {
    setSelectedRoomIndex(event.target.value);
};
  
const toggleItem = (item) => {
  setIsChecked((prevState) => ({
    ...prevState,
    [item]: !prevState[item] || false,
  }));
};

// handleGener

const addSeasonsToRoomById = (roomId) => {
  // Encontre o quarto com base no ID
  const roomToUpdate = rooms.find(room => room.id === roomId);
 const variableName = 'pricePerSeason';
  // Verifique se o quarto foi encontrado
  if (!roomToUpdate) {
    console.error('Quarto não encontrado');
 // Retorna o array de quartos original
  }

  // Adicione as estações (seasons) ao quarto sob o nome desejado (seasonName)
  roomToUpdate[variableName] = seasonsTst;

  // Clone o array de quartos e substitua o quarto atualizado
  const updatedRooms = rooms.map(room => (room.id === roomId ? roomToUpdate : room));

  return updatedRooms;
};

const addPricePersonToRoomById = (roomId) => {
  // Encontre o quarto com base no ID
  const roomToUpdate = rooms.find(room => room.id === roomId);
 const variableName = 'pricePerPerson';
  // Verifique se o quarto foi encontrado
  if (!roomToUpdate) {
    console.error('Quarto não encontrado');
 // Retorna o array de quartos original
  }

  // Adicione as estações (seasons) ao quarto sob o nome desejado (seasonName)
  roomToUpdate[variableName] = generatedArray;

  // Clone o array de quartos e substitua o quarto atualizado
  const updatedRooms = rooms.map(room => (room.id === roomId ? roomToUpdate : room));

  return updatedRooms;
};

const handlePriceChange = (seasonId, tierIndex, event) => {
  const newSeasonsTst = seasonsTst.map((season) => {
    if (season.id === seasonId) {
      const newTiers = [...season.tiers];
      newTiers[tierIndex].price = event.target.value;
      return { ...season, tiers: newTiers };
    }
    return season;
  });

  setSeasonsTst(newSeasonsTst);
};

const handleLimitChange = (seasonId, tierIndex, type, value) => {
  const newSeasonsTst = [...seasonsTst];
  const seasonIndex = newSeasonsTst.findIndex((season) => season.id === seasonId);

  if (seasonIndex !== -1) {
    const newTiers = [...newSeasonsTst[seasonIndex].tiers];
    newTiers[tierIndex][type] = parseInt(value);
    newSeasonsTst[seasonIndex].tiers = newTiers;
    setSeasonsTst(newSeasonsTst);
  }
};

const handleRemoveField = (seasonId, tierIndex) => {
  const newSeasonsTst = [...seasonsTst];
  const seasonIndex = newSeasonsTst.findIndex((season) => season.id === seasonId);

  if (seasonIndex !== -1) {
    const newTiers = [...newSeasonsTst[seasonIndex].tiers];
    newTiers.splice(tierIndex, 1);
    newSeasonsTst[seasonIndex].tiers = newTiers;
    setSeasonsTst(newSeasonsTst);
  }
};

const handleAddField = (seasonId) => {
  const seasonIndex = seasonsTst.findIndex((season) => season.id === seasonId);

  if (seasonIndex !== -1) {
    const seasonTiers = [...seasonsTst[seasonIndex].tiers];
    const lastTier = seasonTiers[seasonTiers.length - 1];

    if (lastTier.to + 2 <= parseInt(maxIntegrantes)) {
      const newTier = {
        from: lastTier.to + 1,
        to: Math.min(lastTier.to + 2, parseInt(maxIntegrantes)),
        price: '',
      };

      const newSeasonsTst = [...seasonsTst];
      newSeasonsTst[seasonIndex].tiers = [...seasonTiers, newTier];
      setSeasonsTst(newSeasonsTst);
    }
  }
};


const handleGenerateFields = () => {
  const from = parseInt(minIntegrantes);
  const to = parseInt(maxIntegrantes);

  if (from > to) {
    return; // Lida com entrada inválida
  }

  const newSeasonsTst = seasonsTst.map((season) => {
    const newTiers = [];

    for (let i = from; i <= to; i += 2) {
      const tier = {
        from: i,
        to: Math.min(i + 1, to),
        price: '',
      };
 
      newTiers.push(tier);
    }

    return {
      ...season,
      tiers: newTiers,
    };
  });

  setSeasonsTst(newSeasonsTst);
  setGeneratedArray([]);
};


const handleGenerateArray = () => {
  const newArray = seasonsTst.map((season) => ({
    seasonTitle: season.seasonTitle,
    startMonth: season.startMonth,
    endMonth: season.endMonth,
    tiers: season.tiers.map((tier) => ({
      from: tier.from,
      to: tier.to,
      price: tier.price,
    })),
  }));
  setGeneratedArray(newArray);
  console.log(generatedArray);
};

// handleSeasons

const handleAddRoom = () => {
  // Gere um ID único para o novo quarto
  const newRoomId = uuidv4();
  
  // Crie um novo objeto de quarto com o ID gerado e os dados do quarto
  const newRoom = { ...roomData, id: newRoomId, image: roomImage, pricePerSeason: null,  pricePerPerson: null};

  console.log(newRoom.titulo, newRoom.id, newRoom.image);

  // Adicione o novo quarto à lista de quartos
  setRooms((prevRooms) => [...prevRooms, newRoom]);

  // Limpe os dados do quarto para redefinir o formulário
  setRoomData(initialRoom);
};


const handleDebugSeason = () => {
  console.log(rooms);
  console.log(selectedRoom.id);
 };

const handleSeasonsPriceChange = (e, index, priceType) => {
  const newValue = e.target.value;

  // Faça uma cópia do array seasonsTst
  const updatedSeasons = [...seasonsTst];

  // Acesse a temporada específica pelo índice e atualize o preço correspondente
  if (priceType === 'pricePerHour') {
    updatedSeasons[index].pricePerHour = newValue;
  } else if (priceType === 'pricePerDay') {
    updatedSeasons[index].pricePerDay = newValue;
  }

  // Atualize o estado com as temporadas atualizadas
  setSeasonsTst(updatedSeasons);
};

// handleRoomImageChange

  const handlePol = (exampleIndex) => {
    const selectedPolicy = examples[exampleIndex];
    setSelectedPolicies([...selectedPolicies, selectedPolicy]);
  };

  const handleOptionChange = (event, newValue) => {
    setSelectedOption(newValue); // Atualize o estado com a opção selecionada
  };
  
  const handlePricePerPersonChange = () => {
    setShowPricePerPerson(!showPricePerPerson);
    setShowPricePerGroup(false); // Garante que o outro switch seja desmarcado
  };

  const handlePricePerGroupChange = () => {
    setShowPricePerGroup(!showPricePerGroup);
    setShowPricePerPerson(false); // Garante que o outro switch seja desmarcado
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSeasonTitleChange = (event) => {
    setSeasonTitle(event.target.value);
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

  const handleAddSeason = () => {
    if (startDate && endDate && seasonTitle) {
      const newSeason = {
        id: seasons.length + 1, // Gere um ID único (neste exemplo, usando o comprimento atual do array + 1)
        startDate: startDate,
        endDate: endDate,
        seasonTitle: seasonTitle,
        pricePerHour: 0, // Adicione o preço por hora aqui
        pricePerDay: 0,  // Adicione o preço por dia aqui
        tiers: [],
      };
  
      setSeasonsTst([...seasonsTst, newSeason]);
  
      // Limpar os campos após adicionar o season
      setStartDate(null);
      setEndDate(null);
      setSeasonTitle('');
    }
  };
  
 
  const handleRemoveRoom = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms.splice(index, 1);
    setRooms(updatedRooms);
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

  const handleRoomImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setRoomImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };


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
  
  const handleAddTemporada = () => {
    const temporada = {
      nome: temporadaNome,
      precoPorHora: temporadaPrecoHora,
      precoPorDia: temporadaPrecoDia,
    };
    setRooms((prevRooms) =>
      prevRooms.map((room, index) =>
        index === roomIndex
          ? {
              ...room,
              temporadas: [...room.temporadas, temporada],
            }
          : room
      )
    );
    setTemporadaNome('');
    setTemporadaPrecoHora('');
    setTemporadaPrecoDia('');
    handleCloseModal();
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
      ex: 1,
      emo: "ex",
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
      //languagesAvailable: languagesSelected,
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
      rooms: rooms
      // ... outros campos ...
  };
  
  console.log(data);


    try {
      const response = await fetch('/api_/accomodations', {
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
      //console.log("Languages :", productLanguages);
      console.log("rooms :", rooms);
      console.log("price :", seasonsTst);

      
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
//

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

  const handleLangu = (language) => {
    // Logic to toggle langua
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
      const response = await axios.get('/api_/inclusions');
      setProductInclusions(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataExclusions = async () => {
    try {
      const response = await axios.get('/api/_exclusions');
      setProductExclusions(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
 
  const fetchDataCategories = async () => {
    try {
      const response = await axios.get('/api/_categories');
      setProductCategories(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataThemes = async () => {
    try {
      const response = await axios.get('/api/_themes');
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


  const handleNext = () => {


  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  handleDebug();
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);

};

  
    return (

   
  
<Box m="20px" textAlign="center">
<Header title="ACCOMMODATION 🛏️" subtitle="Create a product with Accommodation features" />
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
                  <br/>
                <h2 className="text-center">What's the the Accomodation type ?</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Inform your travellers the facilities the going to be in.</h4>
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
                
 <Autocomplete
        id="combo-box-demo"
        options={top100Films}
        getOptionLabel={(option) => option.label} // Substitua com sua função de rótulo
        sx={{ width: 300, marginLeft: 30 }}
        renderInput={(params) => <TextField {...params} label="Accomodation Type " />}
        value={selectedOption} // Defina o valor selecionado
        onChange={handleOptionChange} // Manipulador de evento para atualizar o estado
      />
     
     </Box>
     <br/>
 
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
              onChange={() => handleLangu(item)}
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
                    onChange={() => handleLangu(item)}
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
onChange={() => handleLangu(item)}
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
onChange={() => handleLangu(item)}
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
onChange={() => handleLangu(item)}
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
{activeStep === 3 &&    
       <div>
        <div>
            <br/>
                 <h2 className="text-center">Set up the Seasons for the pricing  of your Accomodation?</h2>
                 <h4 className="text-center" style={{ color: 'gray' }}>Rates allow you to price your options separatly. For example, settig additional price for lunch or pick - up.</h4>
                 <br/>
           <TableContainer style={{height:"300px", overflowY:"auto"}} component={Paper}>
             <Table>
               <TableHead>
                 <TableRow>
                 <TableCell>Title</TableCell>
                   <TableCell>Season Start Date</TableCell>
                   <TableCell>Season End Date</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {seasonsTst.map((season, index) => (
                   <TableRow key={index}>
                     <TableCell>{season.seasonTitle}</TableCell>
                     <TableCell>{season.startDate}</TableCell>
                     <TableCell>{season.endDate}</TableCell>
                     
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </TableContainer>
           <br/>
           <br/>
           <Grid sx={{marginBottom:'10px'}} container spacing={2}>
           <Grid item xs={6}>
         
       </Grid>
           <TextField
                 id="season-title"
                 label="Título do Season"
                 value={seasonTitle}
                 onChange={handleSeasonTitleChange}
                 fullWidth
                 sx={{marginBottom:'10px'}}
               />
             <Grid item xs={6}>
         <TextField
           id="start-date"
           label="Data de início"
           type="date"
           InputLabelProps={{
             shrink: true,
           }}
           value={startDate}
           onChange={(e) => handleStartDateChange(e.target.value)}
           fullWidth
         />
       </Grid>
       <Grid item xs={6}>
         <TextField
           id="end-date"
           label="Data de término"
           type="date"
           InputLabelProps={{
             shrink: true,
           }}
           value={endDate}
           onChange={(e) => handleEndDateChange(e.target.value)}
           fullWidth
         />
       </Grid>
           </Grid>
        
               
         
               <Button fullWidth variant="contained" color="primary" onClick={handleAddSeason}>
                 Adicionar Season
               </Button>
               <br/>
               <br/>
               <br/>
           
         </div>
       
       
       
       
             </div>


}

{activeStep === 4 &&   
        <div>
        <Box>
        <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            width: "90%",
            height: "120%",
            margin: "auto",
            marginTop: "-150px",
            marginLeft: "300px"
          }}
        >  
          <div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.paper",
                borderRadius: 8,
                p: 2,
                width: "100%",
                height: "80%",
                overflow: "auto",
              }}
            >
              {selectedTab === "tab1" && (
                // Conteúdo para o Botão 1
                <div>
                    <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.paper",
                    borderRadius: 8,
                    p: 2,
                    width: "100%",
                    height: "100%",
                    overflowY: "auto",
                  }}
                >  
        
              <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <Button
              color="secondary"
                variant={selectedTab === "tab1" ? "contained" : "outlined"}
                onClick={() => setSelectedTab("tab1")}
              >
                Price per Night / Hour
              </Button>
              <Button
              color="secondary"
                variant={selectedTab === "tab2" ? "contained" : "outlined"}
                onClick={() => setSelectedTab("tab2")}
              >
                Price per Person
              </Button>
            </Box>
        
        
                    <h1 className="text-center" >Price 💲| Price per Night & Hour </h1>
                    <Divider variant="middle" />
                    <div>
                      <h2>Select a room :</h2>
                      <Select fullWidth value={rooms.indexOf(selectedRoom)} onChange={handleChangeRoomSelected}>
                        {rooms.map((room, index) => (
                          <MenuItem key={index} value={index}>
                            {room.titulo}
                          </MenuItem>
                        ))}
                      </Select>
                      
                    </div>
                    <h2 className="text-center">Seasons Available</h2>
                    <Box
                    gap="10px"
                    width="100%"
                    sx={{
                      overflowY: 'auto',
                     
                    }}
                    height='500px'
                  >
                      {seasonsTst.map((season, index) => (
                        <Card sx={{ marginBottom: '10px', border: 'black' }} key={index}>
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {season.seasonTitle}
                            </Typography>
                            <br />
                            <Typography variant="body2" color="text.secondary">
                              per Hour:
                              <TextField
                                fullWidth
                                type="number"
                                value={season.pricePerHour}
                                onChange={(e) => handleSeasonsPriceChange(e, index, 'pricePerHour')}
                              />
                              per Night
                              <TextField
                                fullWidth
                                type="number"
                                value={season.pricePerDay}
                                onChange={(e) => handleSeasonsPriceChange(e, index, 'pricePerDay')}
                                sx={{ marginTop: '10px' }}
                              />
                            </Typography>
                          </CardContent>
                        </Card>
                        ))}
                      </Box>      
                  <br/>
                  <Button onClick={() => addSeasonsToRoomById(selectedRoom.id)}>Confirm <CheckIcon/></Button>
                  </Box>
                </div>
              )}
              {selectedTab === "tab2" && (
                // Conteúdo para o Botão 2
                
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.paper",
                    borderRadius: 8,
                    p: 2,
                    width: "100%",
                    height: "100%",
                    overflowY: "auto",
                  }}
                >  
                  <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <Button
              color="secondary"
                variant={selectedTab === "tab1" ? "contained" : "outlined"}
                onClick={() => setSelectedTab("tab1")}
              >
                Price per Night / Hour
              </Button>
              <Button
              color="secondary"
                variant={selectedTab === "tab2" ? "contained" : "outlined"}
                onClick={() => setSelectedTab("tab2")}
              >
                Price per Person
              </Button>
            </Box>
                    <h1 className="text-center" >Price 💲| Price per Person </h1>
                    <Divider variant="middle" />
                   
                            <div>
                      <h2>Select a room :</h2>
                      <Select fullWidth value={rooms.indexOf(selectedRoom)} onChange={handleChangeRoomSelected}>
                        {rooms.map((room, index) => (
                          <MenuItem key={index} value={index}>
                            {room.titulo}
                          </MenuItem>
                        ))}
                      </Select>
        
          </div>
          <br/>
                    <br/>
                    <Grid container spacing={2} sx={{marginRight:'-450px'}}>
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
                    Generate fields<FormatListBulletedIcon sx={{marginLeft:'5px'}}/>
                  </Button>
                  <Box
                    gap="10px"
                    width="96%"
                    sx={{
                      overflowY: 'auto',
                     
                    }}
                    height='400px's
                  >
                       {seasonsTst.map((season, seasonIndex) => (
          <div key={seasonIndex}>
            <br />
            <Typography variant="h6" sx={{ marginLeft: 38 }}>{`${season.seasonTitle} || ${season.startDate} - ${season.endDate}`}</Typography>
            {season.tiers.map((tier, tierIndex) => (
        <Paper key={tierIndex} elevation={3} style={{ margin: '10px', padding: '10px' }}>
          <Box display="flex" alignItems="center">
            <TextField
              label="Participantes Mínimos"
              type="number"
              value={tier.from}
              onChange={(e) => handleLimitChange(season.id, tierIndex, 'from', e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <Typography variant="subtitle1">-</Typography>
            <TextField
              label="Participantes Máximos"
              type="number"
              value={tier.to}
              onChange={(e) => handleLimitChange(season.id, tierIndex, 'to', e.target.value)}
              style={{ margin: '0 10px' }}
            />
            <Typography variant="subtitle1">-</Typography>
            <TextField
              label="Preço"
              type="number"
              value={tier.price}
              onChange={(e) => handlePriceChange(season.id, tierIndex, e)}
              style={{ marginRight: '10px' }}
            />
            <IconButton
              aria-label="Remover"
              onClick={() => handleRemoveField(season.id, tierIndex)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
        ))}
            <br />
            <Button variant="contained" sx={{ marginLeft: '10px', width: '650px' }} onClick={() => handleAddField(season.id)}>
              <AddIcon />
            </Button>
          </div>
        ))}
                  </Box>
             
                  <br/>
                    <Button variant="contained" onClick={handleGenerateArray}>
                        Crm <CheckIcon sx={{marginLeft:'4px'}}/>
                    </Button>
                    <Button variant="contained" onClick={() => addPricePersonToRoomById(selectedRoom.id)}>
                  go <CheckIcon sx={{marginLeft:'4px'}}/>
              </Button>
                  </Box>
              )}
            </Box>
          </div>
            <br/>
            
              <Button variant="contained" onClick={handleGenerateArray}>
                  Confirm <CheckIcon sx={{marginLeft:'4px'}}/>
              </Button>
           
            </Box>
        </Modal>
        </Box>
        
        
        
        
        
        <div>
        <br/>
                  <h2 className="text-center">Add rooms and pricing to your Accomodation</h2>
                  <h4 className="text-center" style={{ color: 'gray' }}>Show travellers even more details in videos about your expirience to give your travellers a better idea of what to expect.</h4>
                  <br/>
        
        <Box mt={2}>
              <Paper sx={{height:"300px", overflowY:"auto"}} elevation={3}>
                {rooms.length === 0 ? (
                  <>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <Typography  variant="body1" align="center" color="textSecondary">
                    No rooms added
                  </Typography>
                  </>
                ) : (
                  <List>
                    {rooms.map((room, index) => (
                      <ListItem key={index}>
                        <Avatar
                          alt={`Room Image ${index + 1}`}
                          src={room.image}
                          variant="square"
                          sx={{ width: 64, height: 64 }}
                        />
                        <ListItemText sx={{marginLeft:'10px'}}
                          primary={`${room.codigo} - ${room.titulo}`}
                          secondary={room.descricao}
                        />
                      
                        <ListItemSecondaryAction sx={{marginRight:'20px'}}>
                          <IconButton
                            edge="end"
                            onClick={() => handleRemoveRoom(index)}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                        <ListItemSecondaryAction sx={{marginRight:'70px'}}>
                          <IconButton
                            edge="end"
                            onClick={handleOpenModal}
                          >
                            <AttachMoneyIcon/>
                          </IconButton>
                        </ListItemSecondaryAction>
                        
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>
            </Box>
            <br/>
            <br/>
        
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
                     
                      <input type="file" accept="image/*" onChange={handleRoomImageChange} />
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
              <Grid item xs={5}>
              <Box sx={{marginLeft:"10px", width:"400px"}}>
           
           <TextField
                   label="Room's Code"
                   name="codigo"
                   value={roomData.codigo}
                   onChange={handleRoomInputChange}
                   fullWidth
                   sx={{marginBottom:"10px"}}
                 />
           
                 <TextField
                   label="Títle"
                   name="titulo"
                   value={roomData.titulo}
                   onChange={handleRoomInputChange}
                   fullWidth
                   sx={{marginBottom:"10px"}}
                 />   
             <TextField
               label="Room's Description"
               name="descricao"
               value={roomData.descricao}
               onChange={handleRoomInputChange}
               fullWidth
               multiline
               rows={4}
               sx={{marginBottom:"10px"}}
             />
             <TextField
               label="Typology"
               name="tipo"
               value={roomData.tipo}
               onChange={handleRoomInputChange}
               fullWidth
               sx={{marginBottom:"10px"}}
             />
        
        <h3>Room's Inclusions</h3>
        <Box
                    gap="10px"
                    width="100%"
                    sx={{
                      overflowY: 'auto',
                     
                    }}
                    height='200px'
                  >
           
            <Accordion>
              <AccordionSummary>
                
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  {items.map((item) => (
                    <div key={item}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isChecked[item] || false}
                            onChange={() => toggleItem(item)}
                          />
                        }
                        label={item}
                      />
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
        
           
          </Box>
         
           </Box>
              </Grid>
            </Grid>
          </Container>
        
          <Dialog open={openModal} onClose={handleCloseModal}>
              <DialogTitle>Adicionar Temporada</DialogTitle>
              <DialogContent>
                <TextField
                  label="Nome da Temporada"
                  name="temporadaNome"
                  value={temporadaNome}
                  onChange={(e) => setTemporadaNome(e.target.value)}
                />
                <TextField
                  label="Preço por Hora"
                  name="temporadaPrecoHora"
                  value={temporadaPrecoHora}
                  onChange={(e) => setTemporadaPrecoHora(e.target.value)}
                />
                <TextField
                  label="Preço por Dia"
                  name="temporadaPrecoDia"
                  value={temporadaPrecoDia}
                  onChange={(e) => setTemporadaPrecoDia(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleAddTemporada}>Adicionar</Button>
                <Button onClick={handleCloseModal}>Cancelar</Button>
              </DialogActions>
            </Dialog>
        
            <br/>
              <br/>
              {/* Aqui você pode adicionar campos adicionais para inclusões e imagem */}
              <Button fullWidth onClick={handleAddRoom} variant="contained" color="primary">
                Adicionar Quarto
              </Button>
          </div>
        
          <br/>
              <br/>
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
                onChange={() => handleLangu(item)}
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
  <br/>
            <h2 className="text-center">Cancellation Policy</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Informa travaellers about the rules referent to the service cancellation.</h4>
       
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
      duration: 0,
      unit: 'dias',
      condition: 'antes',
      deadline: '2023-01-01',
      percentage: 0,
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
  const [showInclusions, setShowInclusions] = useState(true);
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
   // body: JSON.stringify(newInclusion),
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
            {cancellationPolicies.length > 0 ? (
                showInclusions ? (
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
                )
              ) : null}

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
    <Divider/>
    </div>
    </Box>
    <br/>
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
