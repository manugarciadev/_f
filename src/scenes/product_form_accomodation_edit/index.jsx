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
import { CircularProgress, FormLabel, Accordion, AccordionSummary, AccordionDetails, DialogTitle, ListItemSecondaryAction, Avatar } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,   Dialog,
  DialogContent,
  DialogActions, } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import EditIcon from '@mui/icons-material/Edit';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ExtensionIcon from '@mui/icons-material/Extension';


const rates = [
  { id: 1, title: 'Rate 1' },
  { id: 2, title: 'Rate 2' },
  { id: 3, title: 'Rate 3' },
];

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

const steps = [
  { label: 'Basic Information', icon: <Person /> },
  { label: 'Media & Description', icon: <Email /> },
  { label: 'Start Time & Duration', icon: <Email /> },
  { label: 'Seasons', icon: <Phone /> },
  { label: 'Rooms', icon: <Phone /> },
  { label: 'Inclusions & Exclusions', icon: <Phone /> },
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
  // Adicione mais exemplos conforme necessário openR
];

const initialRoom = {
  codigo: '',
  titulo: '',
  descricao: '',
  tipoQuarto: '',
  temporadas: [],
};

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
  const [openRoom, setOpenRoom] = useState(false);
  const [openContext, setOpenContext] = useState(false);
  const [openEditRate, setOpenEditRate] = useState(false);
  const [openThemes, setOpenThemes] = useState(false);
  const [openResourcesModal, setOpenResourcesModal] = useState(false);
  const [openStartTimeModal, setOpenStartTimeModal] = useState(false);
  const [openSeasonsModal, setOpenSeasonsModal] = useState(false);
  const [openEditRoomModal, setOpenEditRoomModal] = useState(false);
  const [openAddSeasonsModal, setOpenAddSeasonsModal] = useState(false);
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
  const [isChecked, setIsChecked] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0); // Inicialmente, selecione o índice 0
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0); 
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
  const [productRates, setProductRates] = useState([]);
  const [productEditTasks, setProductEditTasks] = useState(null);
  const [inclusions, setInclusions] = useState();
  const [inclusionsDescription, setInclusionsDescription] = useState('');
  const [exclusions, setExclusions] = useState();
  const [exclusionsDescription, setExclusionsDescription] = useState('');
  const [languagesSelected, setLanguagesSelected] = useState();
  const [, set] = useState();
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
  const [selectedWhatToBrings, setSelectedWhatToBrings] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState(data.startTimes);
  const [selectedStartTimes, setSelectedStartTimes] = useState([]);
  const [isLanguageFormVisible, setIsLanguageFormVisible] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [openRoomModal, setOpenRoomModal] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [groupsData, setGroupsData] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [seasonTitle, setSeasonTitle] = useState('');
  const [seasonsTst, setSeasonsTst] = useState(data.seasons);
  const [classesData, setClassesData] = useState();
  let   [holder, setHolder] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [temporaryRate, setTemporaryRate] = useState(null);
  const [temporaryIndex, setTemporaryIndex] = useState(null);
  const [selectedTourType, setSelectedTourType] = useState("private");
  const allCountryCodes = [
    'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'he', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jv', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'fy-NL', 'xh', 'yi', 'yo', 'zu'
  ];
  const [roomIndex, setRoomIndex] = useState(null);
  const [roomImage, setRoomImage] = useState(null);
  const [temporadaNome, setTemporadaNome] = useState('');
  const [temporadaPrecoHora, setTemporadaPrecoHora] = useState('');
  const [temporadaPrecoDia, setTemporadaPrecoDia] = useState('');
  const [roomData, setRoomData] = useState(initialRoom);
  const [openSecondRoom, setOpenSecondRoom] = useState(false);
  const [rooms, setRooms] = useState(data.rooms);
  // <<<<
  const [stepStartDate, setStepStartDate] = useState('');
  const [auxiliarSeason, setAuxiliarSeason] = useState('');
  const [stepEndDate, setStepEndDate] = useState('');
  const [stepSeasonTitle, setStepSeasonTitle] = useState('');


  const RoomDetails = ({ room, onPricePerDayChange, onPricePerHourChange }) => {
    const handlePricePerDayChange = (e) => {
      onPricePerDayChange(room.id, parseFloat(e.target.value));
    };
  
    const handlePricePerHourChange = (e) => {
      onPricePerHourChange(room.id, parseFloat(e.target.value));
    };
  
    return (
      <div>
      {choosenRoom && (
        <div>
          <h2>Edit Room Details</h2>
          <p>Price Per Day: 
            <input 
              type="number" 
              value={choosenRoom.pricePerDay} 
              onChange={(e) => handlePricePerDayChange(parseFloat(e.target.value))} 
            />
          </p>
          <p>Price Per Hour: 
            <input 
              type="number" 
              value={choosenRoom.pricePerHour} 
              onChange={(e) => handlePricePerHourChange(parseFloat(e.target.value))} 
            />
          </p>
        </div>
      )}
    </div>
    );
  };

  const RoomList = ({ rooms, onPricePerDayChange, onPricePerHourChange }) => {
    return (
      <div>
        {rooms.map(room => (
          <RoomDetails 
            key={room.id} 
            room={room} 
            onPricePerDayChange={onPricePerDayChange} 
            onPricePerHourChange={onPricePerHourChange} 
          />
        ))}
      </div>
    );
  };

  const handleStepStartDateChange = (date) => {
    setStepStartDate(date);
  };

  const handleStepEndDateChange = (date) => {
    setStepEndDate(date);
  };

  const handleStepSeasonTitleChange = (event) => {
    setStepSeasonTitle(event.target.value);
  };

  const [choosenRoom, setChoosenRoom] = useState(null);

  const handlePricePerDayChange = (newPrice) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === choosenRoom.id ? { ...room, pricePerDay: newPrice } : room
      )
    );
  };

  const handlePricePerHourChange = (newPrice) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === choosenRoom.id ? { ...room, pricePerHour: newPrice } : room
      )
    );
  };

  
  const selectedRoom = rooms[selectedRoomIndex];

  // rooms

const handleSeasonAuxiliarPriceChange = (e, index, priceType) => {
  const newValue = e.target.value;
  
    // Faça uma cópia do array de temporadas dentro do objeto holder
    const updatedSeasons = [...holder.pricePerSeason];
  
    // Acesse a temporada específica pelo índice e atualize o preço correspondente
    if (priceType === 'pricePerHour') {
      updatedSeasons[index].pricePerHour = newValue;
    } else if (priceType === 'pricePerDay') {
      updatedSeasons[index].pricePerDay = newValue;
    }
  
    // Atualize o objeto holder com as temporadas atualizadas
    const updatedHolder = {
      ...holder,
      pricePerSeason: updatedSeasons
    };
  
    // Atualize o estado com o holder atualizado addRoom
    setHolder(updatedHolder);
    // >>>
    
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

  const handleOpenSecondRoomModal = () => {
    setOpenSecondRoom(true);
  };

  const handleCloseSecondRoomModal = () => {
    setOpenSecondRoom(false);
  };

// handleOpen

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({
      ...roomData,
      [name]: value,
    });
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

// generateArray

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

  const handleOpenContextModal = (rm) => {
    console.log("=>", rm);
    setOpenContext(true);
  };

  const handleCloseContextModal = () => {
    setOpenContext(false);
  };

  const handleOpenRoomModal = (room) => {
    handleRoomSelect(room);
    setOpenRoom(true);
  
  };
  
  

  const handleCloseRoomModal = () => {
    setChoosenRoom(null);
    setOpenRoom(false);
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
    handleCloseSecondRoomModal();
  };
 

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

  const [pickedRoom, setPickedRoom] = useState(null);
  const [editedPrices, setEditedPrices] = useState({});

  const handleRoomSelect = (room) => {
    setPickedRoom(room);
    // Inicializar os valores editados com os preços atuais por temporada do quarto selecionado
    const initialEditedPrices = {};
    room.pricePerSeason.forEach(season => {
      initialEditedPrices[season.id] = {
        pricePerHour: season.pricePerHour,
        pricePerDay: season.pricePerDay
      };
    });
    setEditedPrices(initialEditedPrices);
  };

  const handleStepPriceChange = (seasonId, field, value) => {
    setEditedPrices(prevState => ({
      ...prevState,
      [seasonId]: {
        ...prevState[seasonId],
        [field]: value
      }
    }));
  };

  const handleSaveChanges = () => {
    // Atualizar os valores de preço por temporada no quarto selecionado
    const updatedRoom = {
      ...pickedRoom,
      pricePerSeason: pickedRoom.pricePerSeason.map(season => ({
        ...season,
        pricePerHour: editedPrices[season.id].pricePerHour,
        pricePerDay: editedPrices[season.id].pricePerDay
      }))
    };

    // Atualizar os quartos na lista de quartos
    const updatedRooms = rooms.map(room => (room.id === updatedRoom.id ? updatedRoom : room));
    setRooms(updatedRooms);

    console.log('Quarto atualizado:', updatedRoom);
    setPickedRoom(null); // Limpar a seleção após salvar as alterações
  };
// holder
const handleAddRoom = () => {
  // Gere um ID único para o novo quarto seasonTst
  const newRoomId = uuidv4();
  
  // Crie um novo objeto de quarto com o ID gerado e os dados do quarto
  const newRoom = { ...roomData, id: newRoomId, image: roomImage, pricePerSeason: seasonsTst,  pricePerPerson: null};

  console.log(newRoom.titulo, newRoom.id, newRoom.image);

  // Adicione o novo quarto à lista de quartos
  setRooms((prevRooms) => [...prevRooms, newRoom]);

  // Limpe os dados do quarto para redefinir o formulário
  setRoomData(initialRoom);
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

  // rooms

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

// selectedHuman

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

    handleCloseRoomModal();
    handleCloseContextModal();
  
    return updatedRooms;
  };

  const updateRoomInRooms = (updatedRoom) => {
  // Verifique se o quarto a ser atualizado existe no array rooms
  const roomIndex = rooms.findIndex(room => room.id === updatedRoom.id);

  // Se o quarto não foi encontrado, retorne o array de quartos original
  if (roomIndex === -1) {
    console.error('Quarto não encontrado');
    return rooms;
  }

  // Clone o array de quartos e substitua o quarto atualizado
  const updatedRooms = [...rooms];
  updatedRooms[roomIndex] = updatedRoom;

  // Retorne o array de quartos atualizado
  handleCloseContextModal();
  return updatedRooms;
};

  // generate
  
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

// addRoom

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


// ::: Tasks rooms

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
const [selectedHumanResourceOptions, setSelectedHumanResourceOptions] = useState(data.humanResources);
const [optionsWithCountHumanResource, setOptionsWithCountHumanResource] = useState(data.materialResources);

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

const updateAccomodation = async () => {

  const dataBody = {
  //_id: 'c4567',
  code: code,
  name: title,
  ac: 1,
  emo: "ac",
  tipe: "Acomodation",
  type: "accomodation",
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
  seasons: seasonsTst,
  rooms: rooms,
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
  //rates: productRates,
  tasks: productTasks,
  noteCount: 0,
  isAccomodation: false,
  humanResources: optionsWithCountHumanResource,
  materialResources: optionsWithCountMaterialResource
    // ... outros campos ...
};

    
    try {
      const response = await fetch(`/api_/accomodations/${data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataBody),
      });

      if (response.ok) {
        // Inclusion updated successfully
        console.log('Accomodation updated successfully');
      } else {
        // Handle error
        console.error('Failed to update Accomodation');
      }
    } catch (error) {
      console.error('Error updating Accomodation:', error);
    }

    window.location.reload();

  };

  const handlePostRequest = async () => {

    const data = {
      //_id: 'c4567',
      code: code,
      name: title,
      ac: 1,
      emo: "ac",
      tipe: "Acomodation",
      type: "accomodation",
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
      seasons: seasonsTst,
      rooms: rooms,
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
      //rates: productRates,
      tasks: productTasks,
      noteCount: 0,
      isAccomodation: false,
      humanResources: optionsWithCountHumanResource,
      materialResources: optionsWithCountMaterialResource
      // ... outros campos ...
  };
  
  // start-time
   

    try {

      const response = await fetch('/api_/accomodations', {
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
      console.log("Rooms", rooms);


      
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
          case 'af':
            return 'Afrikaans';
          case 'sq':
            return 'Albanian';
          case 'am':
            return 'Amharic';
          case 'ar':
            return 'Arabic';
          case 'hy':
            return 'Armenian';
          case 'az':
            return 'Azerbaijani';
          case 'eu':
            return 'Basque';
          case 'be':
            return 'Belarusian';
          case 'bn':
            return 'Bengali';
          case 'bs':
            return 'Bosnian';
          case 'bg':
            return 'Bulgarian';
          case 'ca':
            return 'Catalan';
          case 'ceb':
            return 'Cebuano';
          case 'ny':
            return 'Chichewa';
          case 'zh':
            return 'Chinese (Simplified)';
          case 'zh-TW':
            return 'Chinese (Traditional)';
          case 'co':
            return 'Corsican';
          case 'hr':
            return 'Croatian';
          case 'cs':
            return 'Czech';
          case 'da':
            return 'Danish';
          case 'nl':
            return 'Dutch';
          case 'en':
            return 'English';
          case 'eo':
            return 'Esperanto';
          case 'et':
            return 'Estonian';
          case 'tl':
            return 'Filipino';
          case 'fi':
            return 'Finnish';
          case 'fr':
            return 'French';
          case 'fy':
            return 'Frisian';
          case 'gl':
            return 'Galician';
          case 'ka':
            return 'Georgian';
          case 'de':
            return 'German';
          case 'el':
            return 'Greek';
          case 'gu':
            return 'Gujarati';
          case 'ht':
            return 'Haitian Creole';
          case 'ha':
            return 'Hausa';
          case 'haw':
            return 'Hawaiian';
          case 'he':
            return 'Hebrew';
          case 'hi':
            return 'Hindi';
          case 'hmn':
            return 'Hmong';
          case 'hu':
            return 'Hungarian';
          case 'is':
            return 'Icelandic';
          case 'ig':
            return 'Igbo';
          case 'id':
            return 'Indonesian';
          case 'ga':
            return 'Irish';
          case 'it':
            return 'Italian';
          case 'ja':
            return 'Japanese';
          case 'jv':
            return 'Javanese';
          case 'kn':
            return 'Kannada';
          case 'kk':
            return 'Kazakh';
          case 'km':
            return 'Khmer';
          case 'rw':
            return 'Kinyarwanda';
          case 'ko':
            return 'Korean';
          case 'ku':
            return 'Kurdish';
          case 'ky':
            return 'Kyrgyz';
          case 'lo':
            return 'Lao';
          case 'la':
            return 'Latin';
          case 'lv':
            return 'Latvian';
          case 'lt':
            return 'Lithuanian';
          case 'lb':
            return 'Luxembourgish';
          case 'mk':
            return 'Macedonian';
          case 'mg':
            return 'Malagasy';
          case 'ms':
            return 'Malay';
          case 'ml':
            return 'Malayalam';
          case 'mt':
            return 'Maltese';
          case 'mi':
            return 'Maori';
          case 'mr':
            return 'Marathi';
          case 'mn':
            return 'Mongolian';
          case 'my':
            return 'Myanmar (Burmese)';
          case 'ne':
            return 'Nepali';
          case 'no':
            return 'Norwegian';
          case 'or':
            return 'Odia (Oriya)';
          case 'ps':
            return 'Pashto';
          case 'fa':
            return 'Persian';
          case 'pl':
            return 'Polish';
          case 'pt':
            return 'Portuguese';
          case 'pa':
            return 'Punjabi';
          case 'ro':
            return 'Romanian';
          case 'ru':
            return 'Russian';
          case 'sm':
            return 'Samoan';
          case 'gd':
            return 'Scots Gaelic';
          case 'sr':
            return 'Serbian';
          case 'st':
            return 'Sesotho';
          case 'sn':
            return 'Shona';
          case 'sd':
            return 'Sindhi';
          case 'si':
            return 'Sinhala';
          case 'sk':
            return 'Slovak';
          case 'sl':
            return 'Slovenian';
          case 'so':
            return 'Somali';
          case 'es':
            return 'Spanish';
          case 'su':
            return 'Sundanese';
          case 'sw':
            return 'Swahili';
          case 'sv':
            return 'Swedish';
          case 'tg':
            return 'Tajik';
          case 'ta':
            return 'Tamil';
          case 'tt':
            return 'Tatar';
          case 'te':
            return 'Telugu';
          case 'th':
            return 'Thai';
          case 'tr':
            return 'Turkish';
          case 'tk':
            return 'Turkmen';
          case 'uk':
            return 'Ukrainian';
          case 'ur':
            return 'Urdu';
          case 'ug':
            return 'Uyghur';
          case 'uz':
            return 'Uzbek';
          case 'vi':
            return 'Vietnamese';
          case 'cy':
            return 'Welsh';
          case 'fy-NL':
            return 'Western Frisian';
          case 'xh':
            return 'Xhosa';
          case 'yi':
            return 'Yiddish';
          case 'yo':
            return 'Yoruba';
          case 'zu':
            return 'Zulu';
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


  const editRoom = () => {
 
    const updatedRoomEdit = { ...roomData, id: roomData.id, image: roomImage, pricePerSeason: seasonsTst,  pricePerPerson: null};

   setRooms(prevRooms => {
    const index = prevRooms.findIndex(room => room.id === updatedRoomEdit.id);
    console.log(">>>",index);
    if (index !== -1) {
        const updatedRooms = [...prevRooms];
        updatedRooms[index] = updatedRoomEdit;
        console.log("Editado!", updatedRoomEdit);
        return updatedRooms;
    } else {
        // Se o objeto com o idRate especificado não existir, apenas adicione-o ao array
        return [...prevRooms, updatedRoomEdit];
    }
  });
   
  
    handleCloseSeasonsModal();
  };


// Função para editar/substituir uma temporada com base no índice addSeason
const editSeason = () => {

 console.log("#>",auxiliarSeason.id);


 const updatedSeasonEdit = {
  id: auxiliarSeason.id, // Gere um ID único (neste exemplo, usando o comprimento atual do array + 1)
  startDate: startDate,
  endDate: endDate,
  seasonTitle: seasonTitle,
  pricePerHour: 0, // Adicione o preço por hora aqui
  pricePerDay: 0,  // Adicione o preço por dia aqui
  tiers: [],
};


 setSeasonsTst(prevSeasons => {
  const index = prevSeasons.findIndex(season => season.id === updatedSeasonEdit.id);
  console.log(">>>",index);
  if (index !== -1) {
      const updatedSeasons = [...prevSeasons];
      updatedSeasons[index] = updatedSeasonEdit;
      console.log("Editado!", updatedSeasonEdit);
      return updatedSeasons;
  } else {
      // Se o objeto com o idRate especificado não existir, apenas adicione-o ao array
      return [...prevSeasons, updatedSeasonEdit];
  }
});
 

  handleCloseSeasonsModal();
};


// openSeason

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
    
    // Atualiza o estado productRates com os novos rates productTasks
    setProductRates(updatedRates); // Assumindo que você está usando useState para gerenciar productRates
    console.log(updatedRates);
  };

  const handleDeleteSeason = (id) => {
    // Use a função setSeasonsTst para atualizar o estado
    setSeasonsTst(prevSeasons => {
        // Encontre o índice da temporada com o ID correspondente
        const index = prevSeasons.findIndex(season => season.id === id);
        
        // Se o índice for diferente de -1, significa que a temporada foi encontrada
        if (index !== -1) {
            // Crie uma nova matriz de temporadas excluindo a temporada com o índice encontrado
            const updatedSeasons = [...prevSeasons.slice(0, index), ...prevSeasons.slice(index + 1)];
            console.log("Deletado!", id);
            return updatedSeasons;
        } else {
            // Se a temporada com o ID especificado não existir, retorne o estado anterior sem fazer alterações
            return prevSeasons;
        }
    });
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
  
  


  const handleRemoveRoom = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms.splice(index, 1);
    setRooms(updatedRooms);
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

  // generateFields handleAddRate roomData

  const handleCloseEditRateModal = () => {
    setOpenEditRate(false);
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

  const handleOpenEditRoomModal = (room) => {
    
    setRoomData(room);
    // >>>
    setOpenEditRoomModal(true);
    };

    // addSeason
const handleCloseEditRoomModal = () => {
      setOpenEditRoomModal(false);
    };

  const handleOpenSeasonsModal = (season) => {
    

    console.log(season);
    // >>>
    setAuxiliarSeason(season);
    setSeasonTitle(season.seasonTitle);
    setStartDate(season.endDate);
    setEndDate(season.startDate);
    // >>>
    setOpenSeasonsModal(true);
    };

    // addSeason
const handleCloseSeasonsModal = () => {
      setOpenSeasonsModal(false);
    };

  const handleOpenAddSeasonsModal = () => {
    
      setOpenAddSeasonsModal(true);
      };
  
      // addSeason

const handleCloseAddSeasonsModal = () => {
        setOpenAddSeasonsModal(false);
      };

  const handleOpenStartTimeModal = (startTime, i) => {

  setTemporaryIndex(i);

  const [hour, minute, second] = startTime.value.split(':').map(val => parseInt(val));
  const [hourDuration, minuteDuration, secondDuration] = startTime.duration.split(':').map(val => parseInt(val));

  // Set states with parsed values addRoom

  // >>>
  setHour(hour);
  setMinute(minute);
  setSecond(second);

  setHourDuration(hourDuration);
  setMinuteDuration(minuteDuration);
  setSecondDuration(secondDuration);
  setOpenStartTimeModal(true);
  };

// editSeason

  const handleAddSeason = () => {
    if (startDate && endDate && seasonTitle) {
      const newSeason = {
        id: uuidv4(), // Gere um ID único (neste exemplo, usando o comprimento atual do array + 1)
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
  const handleChangeRoomSelected = (event) => {
    setSelectedRoomIndex(event.target.value);
};
  
const toggleItem = (item) => {
  setIsChecked((prevState) => ({
    ...prevState,
    [item]: !prevState[item] || false,
  }));
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

  // Price per night
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
                      onChange={(event) => setSelectedTourType(event.target.value)}
                    >
                      <option value="private">Private</option>
                      <option value="group">Group</option>
                      <option value="all"> Private & Group</option>
                    </select>
                  <br />
                   
                <h2 className="text-center">What is the Location of your Expirience</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Inform travellers about the city or town where your expirience takes place. This will help with filtering and searching online.</h4>
                <br/>
              
                <MapContainer
                    center={center}
                    zoom={10}
                    style={{ width: '30vw', height: '20vh', marginLeft:'20px', borderRadius: '10px', }}
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
        {['pt', 'us', 'fr', 'es', 'de'].map((language) => (
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

<Modal open={openAddSeasonsModal} onClose={handleCloseAddSeasonsModal}>
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
    width: "50%",
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
      width: "50%",
      maxHeight: "80vh", // Set a maximum height for the modal content
      marginTop: "100px"
    }}
  >
    <h1 className="text-center">  Seasons 🌤 | Add Season</h1>
    <IconButton
      edge="end" // Coloque o botão no canto direito
      color="inherit"
      onClick={handleCloseAddSeasonsModal}
      aria-label="close"
      sx={{ marginLeft: 155, marginTop: -8 }}
    >
      <CloseIcon />
    </IconButton>
    <br />
    <div>
    <TextField
  id="season-title"
  label="Título do Season"
  value={seasonTitle}
  onChange={handleSeasonTitleChange}
  fullWidth
  sx={{ marginBottom: '10px' }}
/>

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
  sx={{ marginBottom: '10px' }}
/>

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
</div>
    <br />


    <br />
    <div>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseAddSeasonsModal}>
            cancel </Button>
        <Button variant="contained" onClick={handleAddSeason}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
  </Box>
</Box>
</Modal>

<Modal open={openSeasonsModal} onClose={handleCloseSeasonsModal}>
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
    width: "50%",
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
      width: "50%",
      maxHeight: "80vh", // Set a maximum height for the modal content
      marginTop: "100px"
    }}
  >
    <h1 className="text-center">  Seasons 🌤 | Edit Seasons</h1>
    <IconButton
      edge="end" // Coloque o botão no canto direito
      color="inherit"
      onClick={handleCloseSeasonsModal}
      aria-label="close"
      sx={{ marginLeft: 155, marginTop: -8 }}
    >
      <CloseIcon />
    </IconButton>
    <br />
    <div>
  <TextField
    id="season-title"
    label="Título do Season"
    value={seasonTitle}
    onChange={handleSeasonTitleChange}
    fullWidth
    sx={{ marginBottom: '10px' }}
  />
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
    sx={{ marginBottom: '10px' }}
  />
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
    sx={{ marginBottom: '10px' }}
  />
</div>
        
    <br />


    <br />
    <div>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseSeasonsModal}>
            cancel </Button>
        <Button variant="contained" onClick={editSeason}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
  </Box>
</Box>
</Modal>


<div>
            <br/>
            <h2 className="text-center">Set up the Seasons for the pricing  of your Accomodation?</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Rates allow you to price your options separatly. For example, settig additional price for lunch or pick - up.</h4>
            <br/>
           <TableContainer style={{height:"300px", overflowY:"auto"}} component={Paper}>
             <Table>
               <TableHead>
                 <TableRow>
                 <TableCell>N</TableCell>
                 <TableCell>Title</TableCell>
                   <TableCell>Season Start Date</TableCell>
                   <TableCell>Season End Date</TableCell>
                   <TableCell>Actions</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                {seasonsTst.map((season, index) => (
                   <TableRow key={index}>
                     <TableCell>{index+1}</TableCell>
                     <TableCell>{season.seasonTitle}</TableCell>
                     <TableCell>{season.startDate}</TableCell>
                     <TableCell>{season.endDate}</TableCell>
                     <TableCell>
                      <Button onClick={() => handleOpenSeasonsModal(season)}><EditIcon/></Button>
                      <Button onClick={() => handleDeleteSeason(season.id)}><DeleteIcon/></Button>
                    </TableCell>
                   </TableRow>
                 ))}
         </TableBody>
             </Table>
           </TableContainer>
           <br/>
           <br/>         
               <Button fullWidth variant="contained" color="primary" onClick={handleOpenAddSeasonsModal}>
                 Adicionar Season
               </Button>
               <br/>
               <br/>
               <br/>
           
         </div>
</div>

            )}
{activeStep === 4 && (

                
<div>
     <Box>

     <Modal open={openContext} onClose={handleCloseContextModal}>
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
        
        
                    <h1 className="text-center" >Price 💲| Price per Night & Hour (Edit)</h1>
                    <Divider variant="middle" />
                  
                    <h2 className="text-center">Seasons Available</h2>
                    <Box
                      gap="10px"
                      width="100%"
                      sx={{
                        overflowY: 'auto',
                      }}
                      height='500px'
                    >
                      {holder && holder.pricePerSeason && holder.pricePerSeason.length > 0 ? (
                        holder.pricePerSeason.map((price, index) => (
                          <Card sx={{ marginBottom: '10px', border: 'black' }} key={index}>
                            <Typography variant="h5" component="div">
                                {holder.titulo}
                            </Typography>
                            <CardContent>
                              <Typography variant="h5" component="div">
                                {price.seasonTitle}
                              </Typography>
                              <br />
                              <Typography variant="body2" color="text.secondary">
                                per Hour:
                                <TextField
                                  fullWidth
                                  type="number"
                                  value={price.pricePerHour}
                                  onChange={(e) => handleSeasonAuxiliarPriceChange(e, index, 'pricePerHour')}
                                />
                                per Night
                                <TextField
                                  fullWidth
                                  type="number"
                                  value={price.pricePerDay}
                                  onChange={(e) => handleSeasonAuxiliarPriceChange(e, index, 'pricePerDay')}
                                  sx={{ marginTop: '10px' }}
                                />
                              </Typography>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <Typography variant="body1" color="text.secondary">
                          Não há dados disponíveis.
                        </Typography>
                      )}
                    </Box>
                  <br/>
                  <div>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseRoomModal}>
            cancel </Button>
        <Button variant="contained" onClick={() => updateRoomInRooms(holder)}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
                  
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
            </Box>
        </Modal>


        <Modal open={openRoom} onClose={handleCloseRoomModal}>
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
        
        
                    <h1 className="text-center" >Price 💲| Price per Night & Hour (Add)</h1>
                    <Divider variant="middle" />
                    <div>
                    <div>
                    {pickedRoom && (
                      <div style={{ flex: 1 , maxHeight: "400px", overflowY: "auto"}}>
                        <Typography variant="h3">{pickedRoom.title}</Typography>
                        <br/>
                        <ul>
                          {pickedRoom.pricePerSeason.map(season => (
                               <Card key={season.id} variant="outlined" style={{ marginBottom: '10px' }}>
                               <CardContent>
                                 <Typography>{season.seasonTitle}</Typography>
                                 <TextField
                                   sx={{marginRight: 1}}
                                   type="number"
                                   label="Preço por Hora"
                                   value={editedPrices[season.id].pricePerHour}
                                   onChange={e => handleStepPriceChange(season.id, 'pricePerHour', parseFloat(e.target.value))}
                                 />
                                 <TextField
                                   type="number"
                                   label="Preço por Dia"
                                   value={editedPrices[season.id].pricePerDay}
                                   onChange={e => handleStepPriceChange(season.id, 'pricePerDay', parseFloat(e.target.value))}
                                 />
                               </CardContent>
                             </Card>
                          ))}
                        </ul>
                      </div>
                    )}
                      </div>
                    
                    </div>
                  
                  <br/>
                  <div>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseRoomModal}>
            cancel </Button>
        <Button variant="contained" onClick={handleSaveChanges}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
                  
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
           
            </Box>
        </Modal>
        </Box>
        
        
        <Modal open={openEditRoomModal} onClose={handleCloseEditRoomModal}>
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
    <h1 className="text-center">  Rooms  | Edit Room</h1>
    <IconButton
      edge="end" // Coloque o botão no canto direito
      color="inherit"
      onClick={handleCloseSeasonsModal}
      aria-label="close"
      sx={{ marginLeft: 155, marginTop: -8 }}
    >
      <CloseIcon />
    </IconButton>
    <br />
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


    <br />
    <div>
       <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseEditRoomModal}>
            cancel </Button>
        <Button variant="contained" onClick={editRoom}>
            Save <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>

       </div>
  </Box>
</Box>
</Modal>
        
        
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
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                        <ListItemSecondaryAction sx={{marginRight:'70px'}}>
                          <IconButton
                            edge="end"
                            onClick={() => handleOpenRoomModal(room)}
                          >
                            <AttachMoneyIcon/>
                          </IconButton>
                        </ListItemSecondaryAction>
                        <ListItemSecondaryAction sx={{marginRight:'120px'}}>
                          <IconButton
                            edge="end"
                            onClick={() => handleOpenEditRoomModal(room)}
                          >
                            <EditIcon/>
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
        
          <Dialog open={openRoomModal} onClose={handleCloseRoomModal}>
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
                <Button onClick={handleAddTemporada}>Save & Continue</Button>
                <Button onClick={handleCloseRoomModal}>Cancel</Button>
              </DialogActions>
              </Dialog>
        
              <br/>
              <br/>
              {/* Aqui você pode adicionar campos adicionais para inclusões e imagem */}
              <Button fullWidth onClick={handleAddRoom} variant="contained" color="primary">
                Add Room
              </Button>
          </div>
         
             <br/>
            <br/>
        <br/>
    <br/>
</div>

            )}
{activeStep === 5 && (

                
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
{activeStep === 6 &&    <div>
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
{activeStep === 7 &&    <div>


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
{activeStep === 8 &&    <div>

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
            {/* Botões de navegação rooms Divider*/}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={activeStep === steps.length - 1 ? updateAccomodation : handleNext}
              >
                {activeStep === steps.length - 1 ? 'Confirm' : 'Save & Confirm'}
              </Button>
            
              <Button 
                variant="contained" 
                color="primary" 
                onClick={updateAccomodation}
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









