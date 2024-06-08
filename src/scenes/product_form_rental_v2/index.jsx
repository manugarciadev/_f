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
// selection

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

const rates = [
  { id: 1, title: 'Rate 1' },
  { id: 2, title: 'Rate 2' },
  { id: 3, title: 'Rate 3' },
];

  


const fuels = [
  { label: 'Gasoline', value: 'gasoline' },
  { label: 'Petrol', value: 'gasoline' },
  { label: 'Diesel', value: 'diesel' },
  { label: 'Electric', value: 'electric' },
  { label: 'Hybrid', value: 'hybrid' },
];




const types = [
  { label: 'SUV', year: 1994 },
  { label: 'SEDAN', year: 1972 },
  { label: 'BIKE', year: 1974 },
  { label: 'GP', year: 2008 },
];

const brands = [
  { label: 'FORD', year: 1994 },
  { label: 'TOYOTA', year: 1972 },
  { label: 'OPEL', year: 1974 },
  { label: 'CHERRY', year: 2008 },
];


  
const models = [
  { label: 'FOCUS', year: 1994 },
  { label: 'RUSH', year: 1972 },
  { label: 'PRADO', year: 1974 },
  { label: 'HILUX', year: 2008 },
];

const steps = [
  { label: 'Basic Information', icon: <Person /> },
  { label: 'Media & Description', icon: <Email /> },
  { label: 'Inclusions & Exclusions', icon: <Phone /> },
  { label: 'Seasons', icon: <WbSunnyIcon /> },
  { label: 'Price', icon: <BedIcon /> },
  { label: 'Important Information', icon: <Phone /> },
  { label: 'Cancellation Policy', icon: <Phone /> },
  { label: 'Finished', icon: <Done /> },
];


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

const colorsArray = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
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
  const [selectionTypeRental, setSelectionTypeRental] = useState(null);
  const [selectionBrandRental, setSelectionBrandRental] = useState(null);
  const [selectionModelRental, setSelectionModelRental] = useState(null);
  const [selectionColorRental, setSelectionColorRental] = useState(null);
  const [selectionFuelRental, setSelectionFuelRental] = useState(null);

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
  const [passengerNumber, setPassengerNumber] = useState(0);
  const [doorNumber, setDoorNumber] = useState(0); 
  const [bagNumber, setBagNumber] = useState(0); 
  const [distanceNumber, setDistanceNumber] = useState(0);  

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

    const handlePassengerChange = (event) => {
    setPassengerNumber(event.target.value);
  };

  const handleDoorChange = (event) => {
    setDoorNumber(event.target.value);
  };

  const handleBagChange = (event) => {
    setBagNumber(event.target.value);
  };

  const handleDistanceChange = (event) => {
    setDistanceNumber(event.target.value);
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


  const handlePolicySelection = (exampleIndex) => {
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
        startDate,
        endDate,
        seasonTitle,
      };
      setSeasons([...seasons, newSeason]);
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
      type: selectionTypeRental.label,
      brand: selectionBrandRental.label,
      model: selectionModelRental.label,
      color: selectionColorRental.label,
      fuel: selectionFuelRental.label,
      passengerNumber: passengerNumber,
      doorNumber: doorNumber,
      bagNumber: bagNumber,
      distanceNumber: distanceNumber ,
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
      //whatToBring,
      pricePerSeason: seasonsTst
      // ... outros campos ...
  };
  
  console.log(data);


    try {
      const response = await fetch('/api/rentals', {
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
      console.log("Price", seasonsTst);
      console.log("Passenger", passengerNumber);
      console.log("Doors", doorNumber);
      console.log("Bag", bagNumber);
      console.log("Distance", distanceNumber);
      //
      console.log("Brand", selectionBrandRental);
      console.log("Type", selectionTypeRental);
      console.log("Model", selectionModelRental);
      console.log("Fuel", selectionFuelRental);
      console.log("Color", selectionColorRental);

      
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



    const newRate = {
      title: rateTitle,
      sel: 0,
      price: generatedArray,
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
<Header title="RENTAL 🛻" subtitle="Create a product with Rental features" />
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
                <h2 className="text-center">Pick the type of Rental</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Specifie the type of vehicle that you tend to rent.</h4>
                <br/>

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={types}
                    sx={{ width: 300, marginLeft: 30 }}
                    value={selectionTypeRental} // Define o valor selecionado
                    onChange={(event, newValue) => setSelectionTypeRental(newValue)} // Atualiza o estado com a nova seleção
                    renderInput={(params) => <TextField {...params} label="Attraction's Type" />}
                  />

                <br/>
                <h2 className="text-center">What's the Brand & Model of the renting Vehicle</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Inform The Fabricant of the renting vehicle</h4>
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
                    disablePortal
                    id="combo-box-demo"
                    options={brands}
                    sx={{ width: 300, marginLeft: 30 }}
                    value={selectionBrandRental} // Define o valor selecionado
                    onChange={(event, newValue) => setSelectionBrandRental(newValue)} // Atualiza o estado com a nova seleção
                    renderInput={(params) => <TextField {...params} label="Attraction's Type" />}
                  />

              <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={models}
                    sx={{ width: 300, marginLeft: 30 }}
                    value={selectionModelRental} // Define o valor selecionado
                    onChange={(event, newValue) => setSelectionModelRental(newValue)} // Atualiza o estado com a nova seleção
                    renderInput={(params) => <TextField {...params} label="Attraction's Type" />}
                  />
                </Box>
                
          
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
            <h2 className="text-center">Tecnical Informations about the Rental.</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Give a tecnical overview in terms of the vehiclem to better inform the travallers.</h4>
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
                    disablePortal
                    id="combo-box-demo"
                    options={colorsArray}
                    sx={{ width: 300, marginLeft: 30 }}
                    value={selectionColorRental} // Define o valor selecionado
                    onChange={(event, newValue) => setSelectionColorRental(newValue)} // Atualiza o estado com a nova seleção
                    renderInput={(params) => <TextField {...params} label="Color" />}
                  />
          <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={fuels}
                    sx={{ width: 300, marginLeft: 30 }}
                    value={selectionFuelRental} // Define o valor selecionado
                    onChange={(event, newValue) => setSelectionFuelRental(newValue)} // Atualiza o estado com a nova seleção
                    renderInput={(params) => <TextField {...params} label="Fuel" />}
                  />
         
     </Box>
     <br/>
            <h2 className="text-center">Tecnical Informations about the Rental.</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Give a tecnical overview in terms of the vehiclem to better inform the travallers.</h4>
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
<TextField
        id="outlined-number-passenger"
        label="Passenger"
        type="number"
        value={passengerNumber}
        onChange={handlePassengerChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-number-doors"
        label="Doors"
        type="number"
        value={doorNumber}
        onChange={handleDoorChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-number-bags"
        label="Bags"
        type="number"
        value={bagNumber}
        onChange={handleBagChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="outlined-number-distance"
        label="Distance Travelled"
        type="number"
        value={distanceNumber}
        onChange={handleDistanceChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
     
     </Box>
        
 <br/>
<br/>
<h2 className="text-center">Vehicle Inclusions</h2>
<h4 className="text-center" style={{ color: 'gray' }}>Inform travellers about the what the vehicle includes.</h4>
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
            <h2 className="text-center">Vehicle Exclusions</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Inform travellers about the what the vehicle DOES NOT include.</h4>
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
                 {seasons.map((season, index) => (
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
        
        
            <h2 className="text-center">What the price for this rental ?</h2>
              <h4 className="text-center" style={{ color: 'gray' }}>Let travellers know what is  pricing to book this rental.</h4>
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
                            per Day
                            <TextField
                              fullWidth
                              type="number"
                              value={season.pricePerDay}
                              onChange={(e) => handleSeasonsPriceChange(e, index, 'pricePerDay')}
                              sx={{ marginTop: '10px' }}
                            />
                          </Typography>
                          <Button sx={{ marginTop: '10px' }} fullWidth variant="contained" color="primary">
                            <CheckIcon />
                          </Button>
                        </CardContent>
                      </Card>
                      ))}
                  </Box>
                  <br/>
                    <Button variant="contained" >
                        Confirm <CheckIcon sx={{marginLeft:'4px'}}/>
                   </Button>
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
                Price per Day / Hour
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
                        Confirm <CheckIcon sx={{marginLeft:'4px'}}/>
                    </Button>
                  </Box>
              )}
        
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


