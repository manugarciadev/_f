import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  useTheme,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions

} from '@mui/material';
import TourIcon from '@mui/icons-material/Tour';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import KingBedIcon from '@mui/icons-material/KingBed';
import CelebrationIcon from '@mui/icons-material/Celebration';
import InventoryIcon from '@mui/icons-material/Inventory';
import ParkIcon from '@mui/icons-material/Park';
import EastIcon from '@mui/icons-material/East';
import { tokens } from "../../theme";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DownloadIcon from "@mui/icons-material/Download";
import { Badge } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AppsIcon from '@mui/icons-material/Apps';
import ArticleIcon from '@mui/icons-material/Article';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import Fab from '@mui/material/Fab';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { addDays, format } from 'date-fns'; // Import the required functions from date-fns
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import { lightBlue } from '@mui/material/colors';
import BedIcon from '@mui/icons-material/Bed';
import Modal from "@mui/material/Modal";
import BoyIcon from '@mui/icons-material/Boy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PaidIcon from '@mui/icons-material/Paid';
import { parse } from 'date-fns';
import Popover from '@mui/material/Popover';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'
import CreateProductDayTourActivity from "../product_form_day_tour_activity";
import EditProductDayTourActivity from "../product_form_day_tour_activity_edit";
import { ArrowDropDownIcon } from "@mui/icons-material";

// East
const colors = {
  primary: { 400: "lightblue" },
  greenAccent: { 400: "lightgreen" },
};

// handleDrop fab useEffect handleAddColumn

const Dashboard = () => {



  // >>> Variaveis handleDrag
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [productsArray, setProductsArray] = useState([]);
  const [numberOfNights, setNumberOfNights] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [selectedDropZoneId, setSelectedDropZoneId] = useState(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropZones, setDropZones] = useState(null); 
  const [showDropZones, setShowDropZones] = useState(false);
  const [getLocalProductData, setGetLocalProductData] = useState(null);
  const [temporary, setTemporary] = useState(null);
  // >>> Package Form Fields
  const [form, setForm] = useState(null);
  const [retrieved, setRetrieved] = useState(null);
  const [daytourActivityProducts, setDayTourActivityProducts] = useState([]);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [dataRows, setDataRows] = useState([]);
  const [roomCode, setRoomCode] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [tourDuration, setTourDuration] = useState(0);
  const [clientsBudget, setClientsBudget] = useState(0);
  const [tourDestinations, setTourDestinations] = useState(null);
  const [checkinDate, setCheckinDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [type, setType] = useState('');
  const [aux, setAux] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [editedRoom, setEditedRoom] = useState(null);
  const [editedRoomIndex, setEditedRoomIndex] = useState(null);
  const [totalCapacity, setTotalCapacity] = useState(4);
  const [days, setDays] = useState(null);
  const [geralAccPrice, setGeralAccPrice] = useState(0);
  const [tempObj, setTempObj] = useState(null);
  const [showButtons, setShowButtons] = useState(true);
  const [selectedTab, setSelectedTab] = useState('tab1'); 
  const [showComponent, setShowComponent] = useState(false);
  let au = useState({ 

    _id:"",
    categories: [],
    code: "",
    day: 0,
    description: "",
    emo: "ex",
    ex: 1,
    exclusions: [],
    hour: 0,
    inclusions: [],
    knowBeforeYouGo: [],
    languages: [],
    languagesAvailable: [],
    localization: "",
    minute: 0,
    name: "",
    rates: [
      {
        title: "",
        startAge: 0,
        endAge: 0,
        fields: [
          {
            from: 0,
            to: 0,
            price: 0
          }
        ]
      },
      {
        title: "",
        startAge: 0,
        endAge: 0,
        fields: [
          {
            from: 0,
            to: 0,
            price: 0
          }
        ]
      }
    ],
    price: [
      {
        title: "",
        startAge: 0,
        endAge: 0,
        fields: [
          {
            from: 0,
            to: 0,
            price: 0
          }
        ]
      },
      {
        title: "",
        startAge: 0,
        endAge: 0,
        fields: [
          {
            from: 0,
            to: 0,
            price: 0
          }
        ]
      }
    ],
    sel: 0,
    title: "",
    shortDescription: "",
    themes: [],
    videos: [],

 });
  // >>>
  const [accomodations, setAccomodations] = useState(null);
  const [rentals, setRentals] = useState(null);
  const [meals, setMeals] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [events, setEvents] = useState(null);
  const [visas, setVisas] = useState(null);
  const [transfers, setTransfers] = useState(null);
  const [attractions, setAttractions] = useState(null);
  const [travellers, setTravellers] = useState(null);
  const [temporaryId, setTemporaryId] = useState(null);
  const [xp, setXp] = useState('');
  const [ep, setEp] = useState('');
  const [tourPrice, setTourPrice] = useState(0);
  const [priceDescount, setPriceDescount] = useState(0);
  const [openCrumb, setOpenCrumb] = useState(false);
  const [message, setMessage] = useState('');
  const [showPriceAlert, setShowPriceAlert] = useState(false);
  const [selectedTourType, setSelectedTourType] = useState("private");
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);
  const [lingua, setLingua] = useState('');
  const [rateSelected, setRateSelected] = useState(false);
  const [selectedDestinations, setSelectedDestinations] = useState(null);
  let totalAccomodationPrice = 0;
  const [selectedProductType, setSelectedProductType] = useState('day-tour-activity');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [temporaryDropZoneId, setTemporaryDropZoneId] = useState('');
  // >>>
  const [isAttachMoneyClicked, setAttachMoneyClicked] = useState(false);

  const [generalDiscountValue, setGeneralDiscountValue] = useState(0);

  const handleGeneralDiscountValueChange = (value) => {
    // Verifique se o valor é um número válido
    const newValue = parseFloat(value);
    // Atualize o estado com o novo valor setDuration useEffect
    setGeneralDiscountValue(newValue);
  };

// handleDrop
  const [buttonColors, setButtonColors] = useState({});
  const [peopleAges, setPeopleAges] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [optionValue, setOptionValue] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedAccomodationCard, setSelectedAccomodationCard] = useState({ name: "",
  code: "",
  description: "",
  ac: 0, // Define como 0, pois geralmente 'ac' é um campo booleano (0 para falso, 1 para verdadeiro)
  rooms:[{
  id: "",
  code: "",
  title: "",
  description: "",
  image: "",
  typology: "",
  capacity: "",
  inclusions: []
}],
  price: [
      {
          title: "Adult",
          startAge: 0,
          endAge: 0,
          fields: [
              {
                  from: 0,
                  to: 0,
                  price: 0
              }
          ]
      },
      {
          title: "Child",
          startAge: 0,
          endAge: 0,
          fields: [
              {
                  from: 0,
                  to: 0,
                  price: 0
              }
          ]
      }
  ]});
  const [productsWithDiscounts, setProductsWithDiscounts] = useState(null);

  // Função para atualizar o desconto selecionado para um produto específico
  const updateSelectedDiscount = (index, value) => {
    const intValue = parseInt(value, 10); // Garante que o valor seja um número inteiro
    const updatedProducts = [...productsWithDiscounts];
    updatedProducts[index].selectedDescount = intValue;
    setProductsWithDiscounts(updatedProducts);
  };
  

  const handleIncrementDiscount = (index) => {
    setProductsWithDiscounts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].selectedDescount += 1; // Incrementa o campo selectedDescount do produto
      return updatedProducts;
    });
  };
  
  const handleDecrementDiscount = (index) => {
    setProductsWithDiscounts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].selectedDescount -= 1; // Decrementa o campo selectedDescount do produto
      return updatedProducts;
    });
  };

  const [selectedGeneralCard, setSelectedGeneralCard] = useState({ 

    id:"",
    categories: [],
    code: "",
    day: 0,
    description: "",
    emo: "",
    ex: 0,
    exclusions: [],
    hour: 0,
    inclusions: [],
    knowBeforeYouGo: [],
    languages: [],
    languagesAvailable: [],
    localization: "",
    minute: 0,
    name: "",
    rates: [
      {
        title: "",
        startAge: 0,
        endAge: 0,
        fields: [
          {
            from: 0,
            to: 0,
            price: 0
          }
        ]
      },
      {
        title: "",
        startAge: 0,
        endAge: 0,
        fields: [
          {
            from: 0,
            to: 0,
            price: 0
          }
        ]
      }
    ],
    price: [
      {
        title: "",
        startAge: 0,
        endAge: 0,
        fields: [
          {
            from: 0,
            to: 0,
            price: 0
          }
        ]
      },
      {
        title: "",
        startAge: 0,
        endAge: 0,
        fields: [
          {
            from: 0,
            to: 0,
            price: 0
          }
        ]
      }
    ],
    sel: 0,
    title: "",
    shortDescription: "",
    themes: [],
    videos: [],

 });

  function addListRoomsToProduct(productId, rooms) {
    const productIndex = products.findIndex((product) => product.id === productId);
  
    if (productIndex !== -1) {
      // Encontrou o produto com o ID especificado
      products[productIndex].rooms = rooms;
      console.log("Salas adicionadas com sucesso!");
    } else {
      console.log("Produto não encontrado com o ID especificado.");
    }

    
  }
  
  const handlePriceAlertClose = () => {
    setShowPriceAlert(false);
  };

  const handleAddListRooms = (cardId, rooms) => {
    
    dropZones.forEach((dropZone) => {
      console.log("Start Date:", dropZone.titulo);
    });
  };

// handleClick
  const handleCloseCrumb = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenCrumb(false);
  };

  const prices = [10.99, 19.99, 29.99, 39.99, 49.99];
  let precoGeral = 0;

  function getRandomPrice() {
    const randomIndex = Math.floor(Math.random() * prices.length);
    return prices[randomIndex];
  }  
  
// handleEdit

const handleOpenAddModal = (dropZoneId) => {
  setTemporaryDropZoneId(dropZoneId);
  setIsAddModalOpen(true);
};

const handleCloseAddModal = () => {
  setIsAddModalOpen(false);
};


  const handleOpenEditModal = (dropZoneId, card) => {
    setTemporary(card);
    setTemporaryDropZoneId(dropZoneId);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

// handleEdit useEffect

  function checkPrice() {
    const randomPrice = getRandomPrice(); // Use a função correta aqui
    console.log(clientsBudget);
    if (precoGeral > clientsBudget) {
      setMessage('O preço é maior que o orçamento do cliente.');
      setOpenCrumb(true);
    } else {
      setMessage('');
      setOpenCrumb(false);
    }
    console.log(randomPrice);
    
  }

// handleDrop checkPrice
const handleTranslation = () => {

  AddCardToDropzone(temporaryDropZoneId, getLocalProductData);

};

const priceCalculation = () => {

  // >>> Preco Geral de Accomodation
  for (const dropzone of dropZones) {
    const { cards } = dropzone;
    const totalAccPrice = calculateAccPrice(cards);
    console.log("Accomodation",totalAccPrice);
  }

  // >>> Preco Geral de Expiriences
  const arrayForPrice = calculatePriceForDropzones(dropZones, peopleAges);
  const finalResult = calculateTotal(arrayForPrice);

  setTourPrice(finalResult);
  console.log("Expirience",finalResult);
  


}

function setMealTypeForDropZones(dropZones) {
  dropZones.forEach(dropZone => {
      dropZone.cards.forEach(card => {
          if (card.ml === 1) {
              switch (card.type) {
                  case "breakfast":
                      dropZone.breakfast = true;
                      break;
                  case "lunch":
                      dropZone.lunch = true;
                      break;
                  case "dinner":
                      dropZone.dinner = true;
                      break;
                  default:
                      break;
              }
          }
      });
  });
}


const getPrice = () => {

const result = calculatePriceForDropzones(dropZones, peopleAges);

 for (const dropzone of dropZones) {
      const { cards } = dropzone;
      const totalAccPrice = calculateAccPrice(cards);
      setGeralAccPrice(totalAccPrice);
      
     //console.log("Acc price",geralAccPrice);
  }

  
  function calculateTotalPrice(product) {
    let totalPrice = 0;
    for (const price of product.prices) {
      totalPrice += price.total * price.number;
    }
    return totalPrice;
  }
  
  // Loop através de todos os dias e produtos
  for (const dia of result) {
    let precoDia = 0;
    for (const product of dia.totalPricesByProduct) {
      console.log(product);
      precoDia += calculateTotalPrice(product);
    }
    precoGeral += precoDia; 
    console.log(`Preço para ${dia.title}: ${precoDia}`);
    
  }
console.log("comp",precoGeral, totalAccomodationPrice);
console.log("sum", precoGeral + totalAccomodationPrice );

  setTourPrice(precoGeral + totalAccomodationPrice);
  setShowPriceAlert(true);
  console.log(`Preço Geral -> ${precoGeral}`);
  console.log(result);
  console.log(dropZones);
  console.log(rooms);
  console.log(selectedRooms);
  console.log(tourDuration);
  
};




function calculateAccPrice(product) {

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Adiciona zero à esquerda, se necessário
const day = String(currentDate.getDate()).padStart(2, '0');  // Adiciona zero à esquerda, se necessário

const formattedDate = `${year}-${month}-${day}`;



  for (const productItem of product) {
    //const { name, rooms, ac } = productItem;
  
    // Check if the product has the ac field equal to 1
    if (productItem.ac === 1) {
      
      //calculateAccomodationPrice(productItem, formattedDate);
const { rooms } = productItem;
let totalAccomodationPrice = 0;

for (const room of rooms) {
  const { pricePerSeason, id } = room;

  if (pricePerSeason) {
    const currentSeason = pricePerSeason.find((season) => {
      const startDate = new Date(season.startDate);
      const endDate = new Date(season.endDate);
      // >>> Start - Date Conversion
      const startYear = startDate.getFullYear();
      const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');  // Adiciona zero à esquerda, se necessário
      const startDay = String(startDate.getDate()).padStart(2, '0');  // Adiciona zero à esquerda, se necessário

      const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;
      // >>> End - Date Convertion
      const endYear = endDate.getFullYear();
      const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');  // Adiciona zero à esquerda, se necessário
      const endDay = String(endDate.getDate()).padStart(2, '0');  // Adiciona zero à esquerda, se necessário

      const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;
      console.log(formattedStartDate, formattedEndDate);

      return formattedDate >= formattedStartDate && formattedDate <= formattedEndDate;
    });

    if (currentSeason) {
      const { pricePerDay, pricePerHour } = currentSeason;

      // Adicione a lógica para calcular o preço com base nas horas e dias, se necessário
      const totalPrice = calculateTotalPriceForRoom(room, pricePerDay, pricePerHour);

      console.log(`Preço do quarto ${id} na estação ${currentSeason.seasonTitle}: ${totalPrice}`);

      totalAccomodationPrice += totalPrice;
    } else {
      console.error(`Season not found for room ${id} in product ${productItem.name}`);
    }
  } else {
    console.error(`pricePerSeason not found for room ${id} in product ${productItem.name}`);
  }
}

console.log(`Preço total da acomodação ${productItem.name}: ${totalAccomodationPrice}`);
  console.log("Aqui",totalAccomodationPrice);
 
    }
  } 
}


function calculateTotal(items) {

  let total = 0;

  
  for (const item of items) {
      for (const price of item.prices) {
          total += price.total * price.number;
      }
  }
  return total;
}


function calculateGeneralDiscount() {

  //console.log(items);

  let total = 0;
  let totalDescount = 0; 

  totalDescount = tourPrice * (generalDiscountValue / 100)
  
 
  setPriceDescount(tourPrice - totalDescount);
  handleCloseDiscountModal();
}

const processTranslation = () => {  const updatedDropZonesSecond = updateInclusions(dropZones, '6644dfb18b45bfa5d6096f62', 'PT');
//setDropZones(updatedDropZonesSecond); handleDrop
console.log("DropZnes", dropZones);}

function calculateTotalDiscount(items) {

  console.log(items);

  let total = 0;
  let totalDescount = 0; 
  
  for (const item of items) {
      for (const price of item.prices) {
        const step = price.total * price.number;
          total += price.total * price.number;
            if (price.descount) { // Verifica se há desconto
              if(item.selectedDescount > price.descount){totalDescount += step * (price.descount / 100);}
              else{totalDescount += step * (item.selectedDescount / 100);}
              
              // Acumula o valor do desconto
            }
      }
  }
  setPriceDescount(totalDescount);
  handleCloseDiscountModal();
}

function calculatePriceForDropzones(dropzones, ages) {
  const totalPriceByDropzones = [];
  const allCards = [];

  // Iterar sobre cada dropzone para extrair os cards
  for (const dropzone of dropzones) {
      allCards.push(...dropzone.cards);
  }

  const totalPricesByProduct = calculatePriceForAges(allCards, ages);
  const valor = calculateTotal(totalPricesByProduct);
  //console.log(">>>",totalPricesByProduct);

  setProductsWithDiscounts(totalPricesByProduct);
  return totalPricesByProduct;
 
}


function calculateAccomodationPrice(accomodationProduct, currentDate) {
  const { rooms } = accomodationProduct;
  

  for (const room of rooms) {
    const { pricePerSeason, id } = room;

    if (pricePerSeason) {
      const currentSeason = pricePerSeason.find((season) => {
        const startDate = new Date(season.startDate);
        const endDate = new Date(season.endDate);
        // >>> Start - Date Conversion
        const startYear = startDate.getFullYear();
        const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');  // Adiciona zero à esquerda, se necessário
        const startDay = String(startDate.getDate()).padStart(2, '0');  // Adiciona zero à esquerda, se necessário

        const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;
        // >>> End - Date Convertion
        const endYear = endDate.getFullYear();
        const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');  // Adiciona zero à esquerda, se necessário
        const endDay = String(endDate.getDate()).padStart(2, '0');  // Adiciona zero à esquerda, se necessário

        const formattedEndDate = `${endYear}-${endMonth}-${endDay}`;
        console.log(formattedStartDate, formattedEndDate);

        return currentDate >= formattedStartDate && currentDate <= formattedEndDate;
      });

      if (currentSeason) {
        const { pricePerDay, pricePerHour } = currentSeason;
        
        // Adicione a lógica para calcular o preço com base nas horas e dias, se necessário
        const totalPrice = calculateTotalPriceForRoom(room, pricePerDay, pricePerHour);
        
        console.log(`Preço do quarto ${id} na estação ${currentSeason.seasonTitle}: ${totalPrice}`);
        
        totalAccomodationPrice += totalPrice;
      } else {
        console.error(`Season not found for room ${id} in product ${accomodationProduct.name}`);
      }
    } else {
      console.error(`pricePerSeason not found for room ${id} in product ${accomodationProduct.name}`);
    }
  }

  console.log(`Preço total da acomodação ${accomodationProduct.name}: ${totalAccomodationPrice}`);
  return totalAccomodationPrice;
}

function calculateTotalPriceForRoom(room, pricePerDay, pricePerHour) {
  // Adicione a lógica para calcular o preço total do quarto com base nas horas e dias, se necessário
  // Este exemplo assume um preço fixo por dia e por hora
  const totalDays = 1; // Se necessário, ajuste com base na duração da estadia
  const totalHours = 1; // Se necessário, ajuste com base na duração da estadia

  const totalPrice = (pricePerDay * totalDays);
  return totalPrice;
}


// getProd
function calculatePriceForAges(product, ages) {
  const totalPriceByProduct = [];

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Adiciona zero à esquerda, se necessário
const day = String(currentDate.getDate()).padStart(2, '0');  // Adiciona zero à esquerda, se necessário

const formattedDate = `${year}-${month}-${day}`;
  for (const productItem of product) {
    //const { name, rooms, ac } = productItem;
  
    // Check if the product has the ac field equal to 1
    if (productItem.ac === 1) {
      
      calculateAccomodationPrice(productItem, formattedDate);
      // Rest of the code...
    }
  }
  for (const productItem of product) {
    const { _id, name, rates } = productItem;
    const totalPrices = { _id, name, prices: [] };

    // Encontre o rate com sel igual a 1
    const selectedRate = rates.find((rate) => rate.sel === 1);

    if (selectedRate) {
      const { title, price } = selectedRate;
      const categoryCounts = {};

      for (const age of ages) {
        for (const category of price) {
          if (age >= category.startAge && age <= category.endAge) {
            const title = category.title;
            categoryCounts[title] = (categoryCounts[title] || 0) + 1;
          }
        }
      }

      for (const category of price) {
        const { title, fields } = category;
        const count = categoryCounts[title] || 0;
        let total = 0;
        let descount;

        for (const field of fields) {
          if (count >= field.from && count <= field.to) {
            descount = field.descount;
            if (field.perPerson) {
              // Se o preço for "por pessoa", multiplica pelo número de pessoas
              total = field.price * count;
            } else {
              total = field.price;
            }
          }
        }

        totalPrices.prices.push({ title, total, number: count, descount: descount, selectedDescount: 0 });
      }

      totalPriceByProduct.push(totalPrices);
    }
  }

  return totalPriceByProduct;
}


function countAgeCategories(ageRanges, ages) {
  const counts = {};

  ageRanges.forEach(category => {
      counts[category.title] = 0;
  });

  ages.forEach(age => {
      ageRanges.forEach(category => {
          if (age >= category.startAge && age <= category.endAge) {
              counts[category.title]++;
          }
      });
  });

  return counts;
}
function calculateTotalCostForProduct(product, ages) {
  const totalCosts = {};

  product.price.forEach(priceCategory => {
      totalCosts[priceCategory.title] = 0;

      ages.forEach(age => {
          priceCategory.fields.forEach(field => {
              if (age >= field.from && age <= field.to) {
                  totalCosts[priceCategory.title] += parseFloat(field.price) || 0;
              }
          });
      });
  });

  return totalCosts;
}

function getProductsWithRate(dropZones) {
  const productsWithRate = [];

  for (const dropZone of dropZones) {
    for (const card of dropZone.cards) {
      const { _id, name, rates } = card;

      const selectedRate = rates.find(rate => rate.sel === 1);

      if (selectedRate) {
        productsWithRate.push({ _id: _id, title: name, rate: selectedRate });
      }
    }
  }
  setAllProducts(productsWithRate);
  console.log(allProducts);
}


function calculateTotalCostForAllProducts(products, ages) {
  const totalCosts = {};

  products.forEach(product => {
      const productTotalCost = calculateTotalCostForProduct(product, ages);
      totalCosts[product.name] = productTotalCost;
  });

  return totalCosts;
}

// getPro

const inclusions = [{
  "_id": "664210278bd645f2f93e96fb",
  "title": "The new order",
  "type": "Group For Tests",
  "additionalId": "664150561987a761ab423fe3",
  "languages": [{
    "code": "FR",
    "text": "Le nouvel ordre",
    "_id": "664210278bd645f2f93e96fc"
  }, {
    "code": "PT",
    "text": "A nova ordem",
    "_id": "664210278bd645f2f93e96fd"
  }],
  "createdAt": "2024-05-13T13:05:43.598Z",
  "updatedAt": "2024-05-13T13:05:43.598Z",
  "__v": 0
}];



  const handleAddRow = () => {
    const newRow = {
      roomCode: optionValue,
      checkinDate: fieldValue,
      numberOfPeople: numberOfPeople,
      checkOutDate: checkOutDate,
      type: type,
      //checkOutDate: ,
      //type:, handleDrop

    };
    setDataRows([...dataRows, newRow]);
    // Clear input values
    setRoomCode('');
    setCheckinDate('');
    setCheckOutDate('');
    setNumberOfPeople('');
    setType('');
  };

  const handleDeleteRow = (index) => {
    const updatedRows = dataRows.filter((_, i) => i !== index);
    setDataRows(updatedRows);
  };

  const Quadrado = ({ titulo }) => {
    return (
      <Paper
      elevation={3} // Adicione uma elevação para dar uma aparência de papel
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue', // Defina a cor de fundo para azul claro
        borderRadius: '8px',
        padding: '16px',
        width: '200px',
        height: '200px',
        margin: '10px',
      }}
    >
      <h1>Price 💲</h1>
      <h3>442, 00</h3>
      
      {/* Conteúdo do quadrado */}
    </Paper>
    );
  };

  // handleDrop
  

  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };

// priceCalculation
  
  const handleOpenRoomModal = (dropZoneId, card) => {
    setTemporaryId(dropZoneId);
    setSelectedAccomodationCard(card); // Armazena o card na variável temporária selectedCard
    setIsRoomModalOpen(true);
    console.log(selectedAccomodationCard);
    console.log(selectedTourType);
    // Lógica para abrir o modal de "acomodação" aqui
  }

  const handleOpenRateModal = (dropZoneId) => {
    setTemporaryId(dropZoneId); // Armazena o card na variável temporária selectedCard
    setIsRateModalOpen(true);
    console.log(selectedGeneralCard);
    console.log(selectedTourType);
    // Lógica para abrir o modal de "acomodação" aqui
  }
 
  const handleCloseRateModal = () => {
    setIsRateModalOpen(false);
  };


  const handleCloseRoomModal = () => {
    setIsRoomModalOpen(false);
  };



  const handleOpenDiscountModal = () => {
    setIsDiscountModalOpen(true);

  };

  const handleCloseDiscountModal = () => {
    setIsDiscountModalOpen(false);
  };



  const handleOpenMealModal = () => {
    setIsMealModalOpen(true);

  };

  const handleCloseMealModal = () => {
    setIsMealModalOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const handleShowDropZones = () => {
    setShowDropZones(true);
    console.log(dropZones);
 
  };

  const addListRooms = (cardId, roomsToAdd) => {

    const listOfRooms = {
      id: cardId,
      rooms: roomsToAdd
    };


    setSelectedRooms([...selectedRooms, listOfRooms]);
    handleCloseRoomModal();
  };

  const filteredProducts = productsArray.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleEditField = (field, value) => {
    setEditedRoom((prevRoom) => ({
      ...prevRoom,
      [field]: value,
    }));
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const [buttonStates, setButtonStates] = useState([
    { isClicked: false },
    // Adicione mais objetos conforme necessário para cada botão
  ]);

  // Função para lidar com o clique em um botão específico
  const handleClickButton = (index) => {
    // Crie uma cópia do array de estados
    const newButtonStates = [...buttonStates];

    // Altere o estado do botão clicado
    newButtonStates[index] = {
      ...newButtonStates[index],
      isClicked: !newButtonStates[index].isClicked,
    };

    // Atualize o estado com o novo array de estados
    setButtonStates(newButtonStates);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
// handleClick
// rate handleDrop

  const open = Boolean(anchorEl);
  const id = open ? 'rate-popover' : undefined;


  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    const formData = storedFormData ? JSON.parse(storedFormData) : null;
    setForm(formData);
    setTourDestinations(formData.destinations);
    setDropZones(formData.columns);
    setDays(formData.columns);
    setTravellers(formData.participants);
    setPeopleAges(formData.participantsAge);
    setNumberOfParticipants(formData.participantsAge.length);
    setNumberOfPeople(formData.participantsAge.length);
    setTourDuration(formData.duration);
    setXp(formData.sp);
    setLingua(formData.lingua);
    setEp(formData.ep);
    setClientsBudget(formData.budget);
    setSelectedDestinations(formData.destinations);

  
    // Primeira solicitação
    const fetchFirstData = async () => {
      try {
        const response = await axios.get('/api_/day-tour-activity');
        setDayTourActivityProducts(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da primeira solicitação:', error);
      }
    };
  
    // Segunda solicitação
    const fetchSecondData = async () => {
      try {
        const response = await axios.get('/api_/accomodations'); // Substitua com a URL correta
        setAccomodations(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da segunda solicitação:', error);
      }
    };
    const fetchThirdData = async () => {
      try {
        const response = await axios.get('/api_/rentals'); // Substitua com a URL correta
        setRentals(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da segunda solicitação:', error);
      }
    };
    const fetchFourthData = async () => {
      try {
        const response = await axios.get('/api_/meals'); // Substitua com a URL correta
        setMeals(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da segunda solicitação:', error);
      }
    };
    const fetchFifhData = async () => {
      try {
        const response = await axios.get('/api_/events'); // Substitua com a URL correta
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da segunda solicitação:', error);
      }
    };
    const fetchSixthData = async () => {
      try {
        const response = await axios.get('/api_/transfers'); // Substitua com a URL correta
        setTransfers(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da segunda solicitação:', error);
      }
    };
    const fetchSeventhData = async () => {
      try {
        const response = await axios.get('/api_/tickets'); // Substitua com a URL correta
        setTickets(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da segunda solicitação:', error);
      }
    };
    const fetchEithData = async () => {
      try {
        const response = await axios.get('/api_/attractions'); // Substitua com a URL correta
        setAttractions(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da segunda solicitação:', error);
      }
    };
    const fetchNinethData = async () => {
      try {
        const response = await axios.get('/api_/visas'); // Substitua com a URL correta
        setVisas(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da segunda solicitação:', error);
      }
    };
  
    // Chame as funções de solicitação
    fetchFirstData();
    fetchSecondData();
    fetchThirdData();
    fetchFourthData();
    fetchFifhData();
    fetchSixthData();
    fetchSeventhData();
    fetchEithData();
    fetchNinethData();
  }, []);


  function getEmojiForType(type) {
    // Mapeie tipos para emojis
    const typeEmojiMap = {
      ac: "🛏️", // Exemplo de emoji para ac=1
      ml: "🍜", // Exemplo de emoji para ml=1
      tf: "🚙", // Exemplo de emoji para tf=1
      tq: "🎫", // Exemplo de emoji para ac=1
      ex: "🌴", // Exemplo de emoji para ml=1
      at: "🗿", // Exemplo de emoji para tf=1
      ev: "🎟️", // Exemplo de emoji para ac=1
      rt: "🚗", // Exemplo de emoji para ml=1
   
      // Adicione outros mapeamentos de tipos aqui
    };
  
    // Verifique se o tipo existe no mapa
    if (typeEmojiMap.hasOwnProperty(type)) {
      return typeEmojiMap[type];
    } else {
      // Se o tipo não estiver mapeado, retorne um emoji padrão ou uma string vazia
      return "❓"; // Emoji de ponto de interrogação productAccomod
    }
  }

  const filterProductsByTourType = (productArray, selectedTourType) => {
    return productArray.filter((product) => product.tourType === selectedTourType);
  };

  const filterProductsByRegion = (productArray, selectedDestinations) => {
    return productArray.filter((product) => selectedDestinations.includes(product.region));
};

const filterProductsByTourTypeAndRegion = (productArray, selectedTourType, selectedDestinations) => {
  return productArray.filter((product) => 
      product.tourType === selectedTourType && selectedDestinations.includes(product.region)
  );
};

  const handleSendPackage = () => {

delete form.columns;
Object.assign(form, { dropZones });
const packageFormData = JSON.stringify(form);
localStorage.setItem("packageFormData", packageFormData);

// updateSel


const apiUrl = '/api_/package-tour';
  
fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Adicione quaisquer cabeçalhos adicionais necessários aqui handleDrop
  },
  body: JSON.stringify(formData),
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao adicionar Pacote');
    }
    return response.json();
  })
  .then(responseData => {
    // Se a solicitação for bem-sucedida, você pode manipular a resposta aqui se necessário
    console.log('Pacote adicionada com sucesso:', responseData);
  })
  .catch(error => {
    // Se houver algum erro durante a solicitação, você pode lidar com isso aqui
    console.error('Erro durante a solicitação:', error.message);
  });

const storedFormData = localStorage.getItem('packageFormData');

// Verifica se há dados armazenados e os converte de volta para um objeto JavaScript
const formData = storedFormData ? JSON.parse(storedFormData) : null;

// Atualiza o estado 'package' com o formData recuperado
setRetrieved(formData);
 console.log(formData);
      
    };
  

// handleClick

  const testLs = () => {
    // Recupera os dados do localStorage productAcc
      console.log(dropZones);
      // updateSel

  };
  
  const product = [
    {
        name: "Product 1",
        code: "ABC123",
        description: "Description 1",
        ml:1,
        emo:"rt",
        type: "dinner",
        rates: [
          {
            id: 1,
            title: "Rate 1",
            sel: 0,
            price: [
              {
                title: "Adult",
                startAge: 18,
                endAge: 99,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 45
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 40
                  }
                ]
              },
              {
                title: "Child",
                startAge: 0,
                endAge: 17,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 25
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 20
                  }
                ]
              }
            ]
          },  {
            id: 2,
            title: "Rate 2",
            sel: 0,
            price: [
              {
                title: "Adult",
                startAge: 18,
                endAge: 99,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 45
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 40
                  }
                ]
              },
              {
                title: "Child",
                startAge: 0,
                endAge: 17,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 25
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 20
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "Product 2",
        ac:1,
        rates: [
          {
            id: 1,
            title: "Rate 1",
            sel: 1,
            price: [
              {
                title: "Adult",
                startAge: 18,
                endAge: 99,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 55
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 50
                  }
                ]
              },
              {
                title: "Child",
                startAge: 0,
                endAge: 17,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 35
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 30
                  }
                ]
              }
            ]
          }
        ],
        rooms:[
          {
            id: "123",
            code: "ABC123",
            title: "Room 1",
            description: "Description of Room 1",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
            typology: "Single",
            capacity: "2",
            inclusions: ["Wi-Fi", "TV", "Mini-bar"]
          },
          {
            id: "456",
            code: "DEF456",
            title: "Room 2",
            description: "Description of Room 2",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
            typology: "Double",
            capacity: "4",
            inclusions: ["Wi-Fi", "TV", "Mini-bar", "Balcony"]
          }
        ],
       
    },
    {
        name: "Product 2",
        code: "DEF456",
        ml:1,
        type: "dinner",
        description: "Description 2",
        rates: [
          {
            id: 1,
            title: "Rate 1",
            sel: 0,
            price: [
              {
                title: "Adult",
                startAge: 18,
                endAge: 99,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 45
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 40
                  }
                ]
              },
              {
                title: "Child",
                startAge: 0,
                endAge: 17,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 25
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 20
                  }
                ]
              }
            ]
          },  {
            id: 2,
            title: "Rate 2",
            sel: 0,
            price: [
              {
                title: "Adult",
                startAge: 18,
                endAge: 99,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 45
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 40
                  }
                ]
              },
              {
                title: "Child",
                startAge: 0,
                endAge: 17,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 25
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 20
                  }
                ]
              }
            ]
          },{
            id: 3,
            title: "Rate 2",
            sel: 0,
            price: [
              {
                title: "Adult",
                startAge: 18,
                endAge: 99,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 45
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 40
                  }
                ]
              },
              {
                title: "Child",
                startAge: 0,
                endAge: 17,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 25
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 20
                  }
                ]
              }
            ]
          },{
            id: 4,
            title: "Rate 2",
            sel: 0,
            price: [
              {
                title: "Adult",
                startAge: 18,
                endAge: 99,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 45
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 40
                  }
                ]
              },
              {
                title: "Child",
                startAge: 0,
                endAge: 17,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 25
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 20
                  }
                ]
              }
            ]
          },{
            id: 5,
            title: "Rate 2",
            sel: 0,
            price: [
              {
                title: "Adult",
                startAge: 18,
                endAge: 99,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 45
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 40
                  }
                ]
              },
              {
                title: "Child",
                startAge: 0,
                endAge: 17,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 25
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 20
                  }
                ]
              }
            ]
          },{
            id: 6,
            title: "Rate 2",
            sel: 0,
            price: [
              {
                title: "Adult",
                startAge: 18,
                endAge: 99,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 45
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 40
                  }
                ]
              },
              {
                title: "Child",
                startAge: 0,
                endAge: 17,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 25
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 20
                  }
                ]
              }
            ]
          },{
            id: 7,
            title: "Rate 2",
            sel: 0,
            price: [
              {
                title: "Adult",
                startAge: 18,
                endAge: 99,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 45
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 40
                  }
                ]
              },
              {
                title: "Child",
                startAge: 0,
                endAge: 17,
                fields: [
                  {
                    from: 1,
                    to: 3,
                    price: 25
                  },
                  {
                    from: 4,
                    to: 6,
                    price: 20
                  }
                ]
              }
            ]
          }
        ]
    }
];



const productMeals = [
  {
      name: "Dinner",
      code: "ABC123",
      description: "Description 1",
      ml:1,
      emo:"ml",
      type: "dinner",
      rates: [
        {
          id: 1,
          title: "Rate 1",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },  {
          id: 2,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Breakfast",
      code: "ABC123",
      description: "Description 1",
      ml:1,
      emo:"ml",
      type: "brakfast",
      rates: [
        {
          id: 1,
          title: "Rate 1",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },  {
          id: 2,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        }
      ]
    }
   
];



  const productArray1 = [
    {
      id: "5f77e8d9a5de2d482db57e73", // Substitua pelo seu ID ObjectId real
      code: "DTA001",
      name: "Santiago Tour ",
      ex:1,
      emo:"ex",
      tourType:"private",
      day: 1,
      hour: 10,
      minute: 30,
      region: "RAI",
      localization: "City Center",
      categories: ["Sightseeing", "Historical"],
      themes: ["Guided Tour", "Cultural Experience"],
      shortDescription: "Explore the city's highlights.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.",
      images: ["https://cf.bstatic.com/xdata/images/hotel/max200/453969401.jpg?k=1f4fbdfcf8fb1e913bd5f95283169b20f6c1af21fb95f2e4a0df713ea6eceb88&o=&hp=1","https://thumbs.web.sapo.io/?W=200&H=200&delay_optim=1&crop=center&tv=1&epic=YmJmjIix3Q5ZlFNgq4KAFX1hSPR9+1Kda5tY9t8MWGn1iZAia/QNy2ic/67wsNuvCn+isNfmklqnYkkEgwj4Fj6Co0ScZssT1ZP2M5TY+IMH/FM=","https://cf.bstatic.com/xdata/images/hotel/max200/435250376.jpg?k=e038df406c8cc5f5d11f06e2a40b23eeb897d02ca32fee6bb374ec39c86ee85f&o=&hp=1",],
      videos: ["video1.mp4", "video2.mp4"],
      inclusions: ["Tour guide", "Entrance fees", "Transportation", "Transportation"],
      exclusions: ["Meals", "Personal expenses"],
      knowBeforeYouGo: ["Wear comfortable shoes", "Bring a camera"],
      languages: [
        {
          language: 'en',
          title: 'English title',
          shortDescription: 'English Short Description',
          longDescription: 'English Long Description'
        },
        {
          language: 'pt',
          title: 'Nome em Português',
          shortDescription: 'Descrição Curta em Português',
          longDescription: 'Descrição Longa em Português'
        }
      ],
      languagesAvailable: ["English", "Spanish"],
      rates: [
        {
          id: 1,
          title: "Rate 1",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },  {
          id: 2,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 3,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 4,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 5,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 6,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 7,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        }
      ],
    }
    // Add more products as needed
  ];

  const productAttractions = [
    {
      id: "5f77e8d9a5de2d482db57e73", // Substitua pelo seu ID ObjectId real
      code: "DTA009",
      name: "Estatua Amilcar Cabral ",
      ex:1,
      emo:"at",
      day: 1,
      hour: 10,
      minute: 30,
      localization: "City Center",
      categories: ["Sightseeing", "Historical"],
      themes: ["Guided Tour", "Cultural Experience"],
      shortDescription: "Explore the city's highlights.",
      description: "Join our guided city tour to explore the rich history and culture of our city.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
      videos: ["video1.mp4", "video2.mp4"],
      inclusions: ["Tour guide", "Entrance fees", "Transportation", "Transportation"],
      exclusions: ["Meals", "Personal expenses"],
      knowBeforeYouGo: ["Wear comfortable shoes", "Bring a camera"],
      languages: ["English", "Spanish"],
      rates: [
        {
          id: 1,
          title: "Rate 1",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },  {
          id: 2,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 3,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 4,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 5,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 6,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 7,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        }
      ],
    }
    // Add more products as needed
  ];


  const productEvents = [
    {
      id: "5f77e8d9a5de2d482db57e73", // Substitua pelo seu ID ObjectId real
      code: "DTA003",
      name: "Gamboa Festival ",
      ex:1,
      emo:"ev",
      day: 1,
      hour: 10,
      minute: 30,
      localization: "City Center",
      categories: ["Sightseeing", "Historical"],
      themes: ["Guided Tour", "Cultural Experience"],
      shortDescription: "Explore the city's highlights.",
      description: "Join our guided city tour to explore the rich history and culture of our city.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
      videos: ["video1.mp4", "video2.mp4"],
      inclusions: ["Tour guide", "Entrance fees", "Transportation", "Transportation"],
      exclusions: ["Meals", "Personal expenses"],
      knowBeforeYouGo: ["Wear comfortable shoes", "Bring a camera"],
      languages: ["English", "Spanish"],
      rates: [
        {
          id: 1,
          title: "Rate 1",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },  {
          id: 2,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 3,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 4,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 5,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 6,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 7,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        }
      ],
    }
    // Add more products as needed
  ];

  const productTickets = [
    {
      id: "5f77e8d9a5de2d482db57e73", // Substitua pelo seu ID ObjectId real
      code: "DTA002",
      name: "Ferry Ticket | RAI -> VXE ",
      tq:1,
      emo:"tq",
      day: 1,
      hour: 10,
      minute: 30,
      localization: "City Center",
      categories: ["Sightseeing", "Historical"],
      themes: ["Guided Tour", "Cultural Experience"],
      shortDescription: "Explore the city's highlights.",
      description: "Join our guided city tour to explore the rich history and culture of our city.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
      videos: ["video1.mp4", "video2.mp4"],
      inclusions: ["Tour guide", "Entrance fees", "Transportation", "Transportation"],
      exclusions: ["Meals", "Personal expenses"],
      knowBeforeYouGo: ["Wear comfortable shoes", "Bring a camera"],
      languages: ["English", "Spanish"],
      rates: [
        {
          id: 1,
          title: "Rate 1",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },  {
          id: 2,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 3,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 4,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 5,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 6,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 7,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        }
      ],
    }, {
      id: "5f77e8d9a5de2d482db57e73", // Substitua pelo seu ID ObjectId real
      code: "DTA002",
      name: "Plane Ticket | RAI -> MMO ",
      tq:1,
      emo:"tq",
      day: 1,
      hour: 10,
      minute: 30,
      localization: "City Center",
      categories: ["Sightseeing", "Historical"],
      themes: ["Guided Tour", "Cultural Experience"],
      shortDescription: "Explore the city's highlights.",
      description: "Join our guided city tour to explore the rich history and culture of our city.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
      videos: ["video1.mp4", "video2.mp4"],
      inclusions: ["Tour guide", "Entrance fees", "Transportation", "Transportation"],
      exclusions: ["Meals", "Personal expenses"],
      knowBeforeYouGo: ["Wear comfortable shoes", "Bring a camera"],
      languages: ["English", "Spanish"],
      rates: [
        {
          id: 1,
          title: "Rate 1",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },  {
          id: 2,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 3,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 4,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 5,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 6,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 7,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        }
      ],
    }
    // Add more products as needed
  ];

  const productTransfers = [
    {
      id: "5f77e8d9a5de2d482db57e73", // Substitua pelo seu ID ObjectId real
      code: "DTA001",
      name: "Transfer Airport Hotel ",
      tf:1,
      emo:"tf",
      day: 1,
      hour: 10,
      minute: 30,
      localization: "City Center",
      categories: ["Sightseeing", "Historical"],
      themes: ["Guided Tour", "Cultural Experience"],
      shortDescription: "Explore the city's highlights.",
      description: "Join our guided city tour to explore the rich history and culture of our city.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
      videos: ["video1.mp4", "video2.mp4"],
      inclusions: ["Tour guide", "Entrance fees", "Transportation", "Transportation"],
      exclusions: ["Meals", "Personal expenses"],
      knowBeforeYouGo: ["Wear comfortable shoes", "Bring a camera"],
      languages: ["English", "Spanish"],
      rates: [
        {
          id: 1,
          title: "Rate 1",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },  {
          id: 2,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 3,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 4,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 5,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 6,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 7,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        }
      ],
    }
    // Add more products as needed
  ];

 const productRentals = [
    {
      id: "5f77e8d9a5de2d482db57e73", // Substitua pelo seu ID ObjectId real
      code: "DTA007",
      name: "Toyota Rush ",
      rt:1,
      emo:"rt",
      day: 1,
      hour: 10,
      minute: 30,
      localization: "City Center",
      categories: ["Sightseeing", "Historical"],
      themes: ["Guided Tour", "Cultural Experience"],
      shortDescription: "Explore the city's highlights.",
      description: "Join our guided city tour to explore the rich history and culture of our city.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
      videos: ["video1.mp4", "video2.mp4"],
      inclusions: ["Tour guide", "Entrance fees", "Transportation", "Transportation"],
      exclusions: ["Meals", "Personal expenses"],
      knowBeforeYouGo: ["Wear comfortable shoes", "Bring a camera"],
      languages: ["English", "Spanish"],
      rates: [
        {
          id: 1,
          title: "Rate 1",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },  {
          id: 2,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 3,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 4,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 5,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 6,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 7,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        }
      ],
    }
    // Add more products as needed
  ];


  const mealsProduct = [
    {
      id: "5f77e8d9a5de2d482db57e73", // Substitua pelo seu ID ObjectId real
      code: "DTA001",
      name: "Dinner",
      ml:1,
      emo:"ml",
      type:"dinner",
      day: 1,
      hour: 10,
      minute: 30,
      localization: "City Center",
      categories: ["Sightseeing", "Historical"],
      themes: ["Guided Tour", "Cultural Experience"],
      shortDescription: "Explore the city's highlights.",
      description: "Join our guided city tour to explore the rich history and culture of our city.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
      videos: ["video1.mp4", "video2.mp4"],
      inclusions: ["Tour guide", "Entrance fees", "Transportation", "Transportation"],
      exclusions: ["Meals", "Personal expenses"],
      knowBeforeYouGo: ["Wear comfortable shoes", "Bring a camera"],
      languages: ["English", "Spanish"],
      rates: [
        {
          id: 1,
          title: "Rate 1",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },  {
          id: 2,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 3,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 4,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 5,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 6,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 7,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        }
      ],
    }, {
      id: "5f77e8d9a5dp2d482db57e73", // Substitua pelo seu ID ObjectId real
      code: "DTA001",
      name: "Breakfast",
      ml:1,
      emo:"ml",
      type:"breakfast",
      day: 1,
      hour: 10,
      minute: 30,
      localization: "City Center",
      categories: ["Sightseeing", "Historical"],
      themes: ["Guided Tour", "Cultural Experience"],
      shortDescription: "Explore the city's highlights.",
      description: "Join our guided city tour to explore the rich history and culture of our city.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
      videos: ["video1.mp4", "video2.mp4"],
      inclusions: ["Tour guide", "Entrance fees", "Transportation", "Transportation"],
      exclusions: ["Meals", "Personal expenses"],
      knowBeforeYouGo: ["Wear comfortable shoes", "Bring a camera"],
      languages: ["English", "Spanish"],
      rates: [
        {
          id: 1,
          title: "Rate 1",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },  {
          id: 2,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 3,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 4,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 5,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 6,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        },{
          id: 7,
          title: "Rate 2",
          sel: 0,
          price: [
            {
              title: "Adult",
              startAge: 18,
              endAge: 99,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 45
                },
                {
                  from: 4,
                  to: 6,
                  price: 40
                }
              ]
            },
            {
              title: "Child",
              startAge: 0,
              endAge: 17,
              fields: [
                {
                  from: 1,
                  to: 3,
                  price: 25
                },
                {
                  from: 4,
                  to: 6,
                  price: 20
                }
              ]
            }
          ]
        }
      ],
    }
    // Add more products as needed
  ];


  const productAccomodation = [{
    id: "5f77e8d9a5do2d482db57e73", // Substitua pelo seu ID ObjectId real
    code: "DTA002",
    name: "Hotel Santiago",
    shortDescription:" é uma famosa música dos Eagles que conta a história de um viajante que se encontra preso em um hotel misterioso e surreal, simbolizando temas de excesso e ilusão de liberdade.",
    longDescription: "é uma famosa canção da banda de rock Eagles, lançada em 1977 como faixa-título de seu álbum icônico. A música apresenta uma narrativa enigmática sobre um viajante que chega a um hotel aparentemente luxuoso chamado Hotel California. À medida que a música avança, o viajante percebe que o hotel é mais do que parece, e ele se vê preso em um ambiente surreal, onde ele é incapaz de deixar o lugar. As letras poéticas e a melodia cativante capturam a imaginação dos ouvintes, enquanto a música explora temas de excesso, decadência e a ilusão da liberdade.",
    tipe: "Acomodation",
    images:["https://cdn.luxe.digital/media/20230830105642/most-expensive-hotels-luxe-digital.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl7TI7jdQ67PKZyQsXtyehCF3v9cu4glDxZROQXFg7qw&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7aXQLauaQQ3wCLhfiVItL8rNu8xrVveCAHAQPCbThRw&s"],
    rates: [
      {
        id: 1,
        title: "Rate 1",
        sel: 0,
        price: [
          {
            title: "Adult",
            startAge: 18,
            endAge: 99,
            fields: [
              {
                from: 1,
                to: 3,
                price: 45
              },
              {
                from: 4,
                to: 6,
                price: 40
              }
            ]
          },
          {
            title: "Child",
            startAge: 0,
            endAge: 17,
            fields: [
              {
                from: 1,
                to: 3,
                price: 25
              },
              {
                from: 4,
                to: 6,
                price: 20
              }
            ]
          }
        ]
      },  {
        id: 2,
        title: "Rate 2",
        sel: 0,
        price: [
          {
            title: "Adult",
            startAge: 18,
            endAge: 99,
            fields: [
              {
                from: 1,
                to: 3,
                price: 45
              },
              {
                from: 4,
                to: 6,
                price: 40
              }
            ]
          },
          {
            title: "Child",
            startAge: 0,
            endAge: 17,
            fields: [
              {
                from: 1,
                to: 3,
                price: 25
              },
              {
                from: 4,
                to: 6,
                price: 20
              }
            ]
          }
        ]
      },{
        id: 3,
        title: "Rate 2",
        sel: 0,
        price: [
          {
            title: "Adult",
            startAge: 18,
            endAge: 99,
            fields: [
              {
                from: 1,
                to: 3,
                price: 45
              },
              {
                from: 4,
                to: 6,
                price: 40
              }
            ]
          },
          {
            title: "Child",
            startAge: 0,
            endAge: 17,
            fields: [
              {
                from: 1,
                to: 3,
                price: 25
              },
              {
                from: 4,
                to: 6,
                price: 20
              }
            ]
          }
        ]
      },{
        id: 4,
        title: "Rate 2",
        sel: 0,
        price: [
          {
            title: "Adult",
            startAge: 18,
            endAge: 99,
            fields: [
              {
                from: 1,
                to: 3,
                price: 45
              },
              {
                from: 4,
                to: 6,
                price: 40
              }
            ]
          },
          {
            title: "Child",
            startAge: 0,
            endAge: 17,
            fields: [
              {
                from: 1,
                to: 3,
                price: 25
              },
              {
                from: 4,
                to: 6,
                price: 20
              }
            ]
          }
        ]
      },{
        id: 5,
        title: "Rate 2",
        sel: 0,
        price: [
          {
            title: "Adult",
            startAge: 18,
            endAge: 99,
            fields: [
              {
                from: 1,
                to: 3,
                price: 45
              },
              {
                from: 4,
                to: 6,
                price: 40
              }
            ]
          },
          {
            title: "Child",
            startAge: 0,
            endAge: 17,
            fields: [
              {
                from: 1,
                to: 3,
                price: 25
              },
              {
                from: 4,
                to: 6,
                price: 20
              }
            ]
          }
        ]
      },{
        id: 6,
        title: "Rate 2",
        sel: 0,
        price: [
          {
            title: "Adult",
            startAge: 18,
            endAge: 99,
            fields: [
              {
                from: 1,
                to: 3,
                price: 45
              },
              {
                from: 4,
                to: 6,
                price: 40
              }
            ]
          },
          {
            title: "Child",
            startAge: 0,
            endAge: 17,
            fields: [
              {
                from: 1,
                to: 3,
                price: 25
              },
              {
                from: 4,
                to: 6,
                price: 20
              }
            ]
          }
        ]
      },{
        id: 7,
        title: "Rate 2",
        sel: 0,
        price: [
          {
            title: "Adult",
            startAge: 18,
            endAge: 99,
            fields: [
              {
                from: 1,
                to: 3,
                price: 45
              },
              {
                from: 4,
                to: 6,
                price: 40
              }
            ]
          },
          {
            title: "Child",
            startAge: 0,
            endAge: 17,
            fields: [
              {
                from: 1,
                to: 3,
                price: 25
              },
              {
                from: 4,
                to: 6,
                price: 20
              }
            ]
          }
        ]
      }
    ],
    ac:1,
    emo:"ac",
    rooms:[
      {
        id: "123",
        code: "ABC123",
        title: "Quarto Twin",
        description: "Description of Room 1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
        typology: "Single",
        capacity: "2",
        inclusions: ["Wi-Fi", "TV", "Mini-bar"]
      },
      {
        id: "456",
        code: "DEF456",
        title: "Quarto Single",
        description: "Description of Room 2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
        typology: "Double",
        capacity: "4",
        inclusions: ["Wi-Fi", "TV", "Mini-bar", "Balcony"]
      },
      {
        id: "457",
        code: "DEF456",
        title: "Quarto Swit",
        description: "Description of Room 2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpue_kSPskwcncXROttpQ3McfClYJNTOjgfw&usqp=CAU",
        typology: "Double",
        capacity: "4",
        inclusions: ["Wi-Fi", "TV", "Mini-bar", "Balcony"]
      }
    ],
    day: 1,
    hour: 10,
    minute: 30,
    localization: "City Center",
    categories: ["Sightseeing", "Historical"],
    themes: ["Guided Tour", "Cultural Experience"],
    shortDescription: "Explore the city's highlights.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/498289252.jpg?k=300f6bbc4b3855043c0fc4a3fe6f11c7c3d59fec6fb942affb60ab8f89332bfc&o=&hp=1",
    videos: ["video1.mp4", "video2.mp4"],
    inclusions: ["Tour guide", "Entrance fees", "Transportation", "Transportation", "Transportation", "Transportation", "Transportation"],
    exclusions: ["Meals", "Personal expenses"],
    knowBeforeYouGo: ["Wear comfortable shoes", "Bring a camera"],
    languages: ["English", "Spanish"]
  }];

  const products = [
    {
      name: "Product 1",
      code: "ABC123",
      description: "Description 1",
      price: [
        {
          title: "Adult",
          startAge: 18,
          endAge: 99,
          fields: [
            {
              from: 1,
              to: 3,
              price: 55.00
            },
            {
              from: 4,
              to: 6,
              price: 50.00
            }
          ]
        },
        {
          title: "Child",
          startAge: 0,
          endAge: 17,
          fields: [
            {
              from: 1,
              to: 3,
              price: 35.00
            },
            {
              from: 4,
              to: 6,
              price: 30.00
            }
          ]
        }
      ]
    },
    {
      name: "Product 2",
      code: "DEF456",
      description: "Description 2",
      price: [
        {
          title: "Adult",
          startAge: 18,
          endAge: 99,
          fields: [
            {
              from: 1,
              to: 2,
              price: 60.00
            },
            {
              from: 4,
              to: 6,
              price: 55.00
            }
          ]
        },
        {
          title: "Child",
          startAge: 0,
          endAge: 17,
          fields: [
            {
              from: 1,
              to: 3,
              price: 40.00
            },
            {
              from: 4,
              to: 6,
              price: 35.00
            }
          ]
        }
      ]
    },
    {
      name: "Product 3",
      code: "GHI789",
      description: "Description 3",
      price: [
        {
          title: "Adult",
          startAge: 18,
          endAge: 99,
          fields: [
            {
              from: 1,
              to: 3,
              price: 45.00
            },
            {
              from: 4,
              to: 6,
              price: 40.00
            }
          ]
        },
        {
          title: "Child",
          startAge: 0,
          endAge: 17,
          fields: [
            {
              from: 1,
              to: 3,
              price: 25.00
            },
            {
              from: 4,
              to: 6,
              price: 20.00
            }
          ]
        }
      ]
    }
  ];
  
 
  

  const productArray2 = [
    { name: "Quarto - Twin",code:"#R2345", description: "Description 3", isAccommodation: true },
    { name: "Quarto - Single",code:"#R5637", description: "Description 4", isAccommodation: true  },
  
    // Add more products as needed
  ];

  const productArray3 = [
    { 
      name: "Hotel Vip Praia",code:"RAI3GP", description: "Description 5" , isAccommodation: true
    },
    { name: "Hotel Santiago",code:"RAI3GP", description: "Description 6" , isAccommodation: true},
    // Add more products as needed
  ];


  const productArray4 = [
    { 
      name: "Breakfast",code:"RAI3GP", description: "Description 5" 
    },
    { 
      name: "Lunch",code:"RAI3GP", description: "Description 5" 
    },
    { 
      name: "Dinner",code:"RAI3GP", description: "Description 5" 
    },
    { 
      name: "Breakfast",code:"RAI3GP", description: "Description 5" 
    },
  ];


  // handleDrop


const handlePdf = () => { window.location.href = '/local'; }

  // dayTour

  const getProductArrayByName = (name) => {

    const selectedDayTourActivitys = filterProductsByTourTypeAndRegion(productArray1, selectedTourType,selectedDestinations);
    const selectedAttractions = filterProductsByTourType(productAttractions, selectedTourType); // Filtra productAttractions
    const selectedAccomodation = filterProductsByTourType(productAccomodation, selectedTourType); // Filtra productAccomodation
    const selectedMeals = filterProductsByTourType(mealsProduct, selectedTourType); // Filtra mealsProduct
    const selectedTransfers = filterProductsByTourType(productTransfers, selectedTourType); // Filtra productTransfers
    const selectedRentals = filterProductsByTourType(productRentals, selectedTourType); // Filtra productRentals
    const selectedEvents = filterProductsByTourType(productEvents, selectedTourType); // Filtra productEvents
    const selectedTickets = filterProductsByTourType(productTickets, selectedTourType); // Filtra productTickets productAccomodation
    

    switch (name) {
      
      case "Day Tour Activities":
        return daytourActivityProducts;
      case "Attraction":
        return attractions;
      case "Accomodation":
        return accomodations;
      case "Meals":
        return meals;
      case "Transportation":
        return transfers;
      case "Rentals":
          return rentals;
      case "Event":
          return events;
      case "Ticket":
          return tickets;
      default:
        return [];
    }
  };



// Function to translate text using LibreTranslate API recieve
async function translateText(text, sourceLang, targetLang) {
  const apiUrl = "https://libretranslate.de/translate";

  // Prepare the payload for the POST request
  const payload = {
    q: text,
    source: sourceLang,
    target: targetLang,
  };

  try {
    // Make the API request using fetch
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the request was successful (status code 200)
    if (response.ok) {
      const data = await response.json();
      const translatedText = data.translatedText;
      console.log("Original text:", text);
      console.log("Translated text:", translatedText);
    } else {
      // Print an error message if the request was not successful
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}


const handleCardClick = (index) => {
  setAttachMoneyClicked((prev) => {
    const updatedState = [...prev];
    updatedState[index] = !updatedState[index];
    return updatedState;
  });
};

// recieveDataFromChildComponent

  const handleSelectRate = (rate, cardId, cards) => {
    // Copie o array de preços do rate selecionado
    // Aqui, você pode atualizar o estado ou executar alguma ação com o card atualizado
    console.log(`Card ${cardId} atualizado com os preços selecionados:`, rate);
  
    handleClose();
  }

  const AddCardToDropzone = (dropzoneId, card) => {

     // Encontrar o índice do dropzone com base no dropzoneId
  const dropzoneIndex = dropZones.findIndex((dropzone) => dropzone.id === dropzoneId);

  // Se o dropzone for encontrado, adicionar o card
  if (dropzoneIndex !== -1) {
    dropZones[dropzoneIndex].cards.push(card);
    console.log(`Card adicionado ao dropzone com sucesso: ${JSON.stringify(card)}`);
  } else {
    console.error(`Dropzone não encontrado com o ID: ${dropzoneId}`);
  }

  };

  // handleDrop

  useEffect(() => {
    // Define um temporizador para esconder o alerta após 5 segundos
    const timeoutId = setTimeout(() => {
      setShowPriceAlert(false);
    }, 5000);

    // Limpa o temporizador quando o componente é desmontado ou quando showAddedProductAlert muda
    return () => clearTimeout(timeoutId);
  }, [showPriceAlert]);

  const showDiscounts = () => {console.log(productsWithDiscounts);}
// handleEdit
const handleGoToPdfButton = async () => {

    processTranslation();
    setMealTypeForDropZones(dropZones);
    
    delete form.columns;
    Object.assign(form, { dropZones, tourPrice, priceDescount });
    const packageFormData = JSON.stringify(form);

    console.log("package:", packageFormData);

    const listRooms = JSON.stringify(selectedRooms);
    localStorage.setItem("packageFormData", packageFormData);
    localStorage.setItem("listRooms", listRooms);

    const apiUrl = '/api_/package-tour';
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Adicione quaisquer cabeçalhos adicionais necessários aqui
          },
          body: packageFormData,
        });

        if (!response.ok) {
          throw new Error('Erro ao adicionar Pacote');
        }

        const responseData = await response.json();
        console.log('Pacote adicionada com sucesso:', responseData);
      } catch (error) {
        console.error('Erro durante a solicitação:', error.message);
      }





console.log(listRooms);

const storedFormData = localStorage.getItem('listRooms');

// Verifica se há dados armazenados e os converte de volta para um objeto JavaScript
const formData = storedFormData ? JSON.parse(storedFormData) : null;

// Atualiza o estado 'package' com o formData recuperado
setIsDiscountModalOpen(true);
 //window.location.href = '/local'; handleDrop handlePdf
  };


  const handleGoToRequestBoardButton = () => {
    window.location.href = '/';
  };

  const handleGoToRequestTableButton = () => {
    window.location.href = '/request-table';
  };

  const addSelectedRooms = (dropZoneId, cardIndex, roomsToAdd) => {
    // Encontre o drop zone onde o card pertence
    const updatedDropZones = dropZones.map((zone) => {
      if (zone.id === dropZoneId) {
        // Encontre o card dentro do drop zone
        const updatedCards = zone.cards.map((card, index) => {
          if (index === cardIndex) {
            // Certifique-se de que o objeto card exista e crie um novo campo 'selectedRooms', se não existir
            if (!card.hasOwnProperty('selectedRooms')) {
              card.selectedRooms = [];
            }
  
            // Adicione os quartos ao campo 'selectedRooms' do card
            card.selectedRooms = [...card.selectedRooms, ...roomsToAdd];
          }
          return card;
        });
  
        // Atualize os cards do drop zone com os quartos adicionados
        return { ...zone, cards: updatedCards };
      }
  
      return zone;
    });
  
    // Atualize o estado com os drop zones atualizados
    setDropZones(updatedDropZones);
  };
  
 
  
  
// dados
  

  const handleRemoveProduct = (dropZoneId, productIndex) => {
    // Find the drop zone where the product belongs
    const dropZone = dropZones.find((zone) => zone.id === dropZoneId);

    // Remove the product from the drop zone
    const updatedCards = dropZone.cards.filter(
      (_, index) => index !== productIndex
    );
    const updatedDropZone = { ...dropZone, cards: updatedCards };

    // Update the drop zone in the state
    const updatedDropZones = dropZones.map((zone) =>
      zone.id === dropZoneId ? updatedDropZone : zone
    );

    setDropZones(updatedDropZones);
    priceCalculation();
  };

  /*const handleAddColumn = () => { handleDrop
    console.log(retrieved); 
    const newColumnId = dropZones.length + 1;
    const newColumnTitle = `Dia ${newColumnId}`;
    
    // Obter a data do primeiro dropZone e adicionar o número de dias apropriado para o novo dropZone
    const firstDropZoneDate = new Date(dropZones[0].data); // Converta a data para um objeto Date
    const newColumnDate = addDays(firstDropZoneDate, dropZones.length); // Adicione o número de dias correspondente
    
    // Formate a data no formato desejado
    const formattedDate = format(newColumnDate, 'dd/MM/yyyy');
    
    // Obter o dia da semana da nova data
    const formattedDayOfWeek = format(newColumnDate, 'EEEE');

    const newColumn = { id: newColumnId, title: newColumnTitle, data: formattedDate, diaSeman: formattedDayOfWeek, cards: [] };
    setDropZones(prevDropZones => [...prevDropZones, newColumn]);
    testLs();
  };*/

  // handleOpenEdi

  const handleUpdateDataFromChild = (updatedData) => {
   
    try{ editCard(temporaryDropZoneId, updatedData._id, updatedData); } catch{};

  };


// handleEdit handleDrop

  const handleAddColumn = () => {

   
    //console.log("Assets",product._id, lingua);
    const updatedDropZonesSecond = updateInclusions(dropZones, '6644dfb18b45bfa5d6096f62', 'PT');
    //setDropZones(updatedDropZonesSecond);
    console.log("DropZnes", dropZones);


    const newColumnId = dropZones.length + 1;
    const newColumnTitle = `Dia ${newColumnId}`;
  
    // Obtenha a data da última coluna no formato "yyyy-MM-dd"
    const lastColumnDate = dropZones.length > 0 ? dropZones[dropZones.length - 1].data : null;
  
    // Se houver uma última coluna, calcule a nova data começando no dia seguinte
    let newColumnDate = null;
    if (lastColumnDate) {
      const lastColumnDateObj = parse(lastColumnDate, "dd/MM/yyyy", new Date());
      newColumnDate = addDays(lastColumnDateObj, 1); // Adicione um dia à última data
    }
  
    // Formate a nova data no formato "dd/MM/yyyy"  handleAdd
    const formattedDate = newColumnDate ? format(newColumnDate, "dd/MM/yyyy") : "";
  
    // Obtenha o dia da semana da nova data e formate-o
    const formattedDayOfWeek = newColumnDate ? format(newColumnDate, "EEEE") : "";
  
    const newColumn = {
      id: newColumnId,
      title: newColumnTitle,
      data: formattedDate,
      diaSeman: formattedDayOfWeek,
      cards: [],
    };
  
    setDropZones([...dropZones, newColumn]);
    setTourDuration(tourDuration+1);
    console.log(accomodations);
    console.log(travellers);
  };
  

  const handleRemoveColumn = () => {
    if (dropZones.length > 0) {
      const updatedDropZones = dropZones.slice(0, -1);
      setDropZones(updatedDropZones);
    }
    setTourDuration(tourDuration-1);

    console.log(selectedRooms);
  };

    const handleButtonClick = (buttonName) => {
    // Replace this logic with your own function to get products based on the buttonName
      const productArray = getProductArrayByName(buttonName);
      setProductsArray(productArray);
    };
    
    const handleRemoveAllProducts = (dropZoneId) => {
    // Find the drop zone where the products should be removed
    const dropZone = dropZones.find((zone) => zone.id === dropZoneId);


    // Clear all the products from the drop zone
const updatedDropZone = { ...dropZone, cards: [] };

// Update the drop zone in the state
const updatedDropZones = dropZones.map((zone) =>
  zone.id === dropZoneId ? updatedDropZone : zone
);

setDropZones(updatedDropZones);
priceCalculation();

};

// recieve

function getTextByLanguage(language) {
  const texts = [];
  inclusions.forEach(inclusion => {
    inclusion.languages.forEach(lang => {
      if (lang.code === language) {
        texts.push(lang.text);
      }
    });
  });
  return texts;
}

function updateInclusions(dropZones, cardId, language) {
  return dropZones.map(zone => {
    zone.cards = zone.cards.map(card => {
      if (card._id === cardId) {
        card.inclusions = getTextByLanguage(language);
      }
      return card;
    });
    return zone;
  });
}

const handleDragStart = (event, product) => {
  //setSelectedGeneralCard(product);
  setTempObj(product);
// Set the dragged product data in the data transfer object selectedGeneralCard dayTour
event.dataTransfer.setData("text/plain", JSON.stringify(product));
};

const handleDrop = (event, dropZoneId) => {
  // Get the dragged product data from the data transfer object
  const product = JSON.parse(event.dataTransfer.getData("text/plain"));
  
  console.log("Language",lingua);
// updateSel
  // Find the drop zone where the product was dropped
  const dropZone = dropZones.find((zone) => zone.id === dropZoneId);

  // Check if the product's ml fiel//d is equal to 1 handleAddProduct
  //handleClick(event);
  console.log(tempObj);


  if (tempObj.ac === 1) {
    
    handleOpenRoomModal(dropZoneId, tempObj);

  } else if (product.rt === 1) {
    
  } else if (product.ex === 1) {
    setSelectedGeneralCard(product);
    handleOpenRateModal(dropZoneId);

  }

  // showButtons getTex

  if (product.ml === 1) {

    // Determine the type of the product (e.g., breakfast, lunch, dinner)
    const productType = product.type;

    // Update the dropZone based on the product type
    const updatedDropZone = {
      ...dropZone,
      cards: [...dropZone.cards, product],
    };

    // Update the appropriate field (e.g., breakfast, lunch, dinner)
    if (productType === "breakfast") {
      updatedDropZone.breakfast = true;
    } else if (productType === "lunch") {
      updatedDropZone.lunch = true;
    } else if (productType === "dinner") {
      updatedDropZone.dinner = true;
    }

    // Update the dropZones array with the updated dropZone
    const updatedDropZones = dropZones.map((zone) => {
      if (zone.id === dropZoneId) {
        return updatedDropZone;
      }
      return zone;
    });

    // Set the updated dropZones state
    setDropZones(updatedDropZones);
  } else {
    // Handle the drop of products with ml other than 1
    // For example, add the product to the dropZone's cards array
    const updatedDropZone = {
      ...dropZone,
      cards: [...dropZone.cards, product],
    };

    // Update the dropZones array with the updated dropZone handleAddCol
  const updatedDropZones = dropZones.map((zone) => {
      if (zone.id === dropZoneId) {
        return updatedDropZone;
      }
      return zone;
    });
    setDropZones(updatedDropZones);
  }
 
  // Other logic for handling the drop if needed
};



const [newRoomInfo, setNewRoomInfo] = useState({
  name: '',
  description: '',
  checkInDate: null,
  capacity: 1,
});


const handleDropRooms = (event) => {
  event.preventDefault();
  const product = JSON.parse(event.dataTransfer.getData('text/plain'));
  const updatedRooms = [...rooms];
  updatedRooms.push({ ...editedRoom, ...product });
  setRooms(updatedRooms);
  //setTotalCapacity(totalCapacity + parseInt(editedRoom.capacity, 10));
  setEditedRoom({ name: '', description: '', checkInDate: '', capacity: '' });
};

const handleEdit = (index) => {
  setEditedRoomIndex(index);
  setEditedRoom(rooms[index]);
};

const handleSaveEdit = () => {
  const updatedRooms = [...rooms];
  const capacityDifference =
    editedRoom.capacity - rooms[editedRoomIndex].capacity;
  updatedRooms[editedRoomIndex] = { ...editedRoom };
  setRooms(updatedRooms);
  const arr = parseInt(totalCapacity)  - parseInt(editedRoom.capacity);
  setTotalCapacity(arr);
  setNumberOfPeople(parseInt(numberOfPeople-editedRoom.capacity));
  setEditedRoomIndex(null);
  setEditedRoom({ name: '', description: '', checkInDate: '', capacity: '' });
};

const handleRemoveRoom = (index) => {
  const updatedRooms = [...rooms];
  //setTotalCapacity(totalCapacity - parseInt(rooms[index].capacity, 10));
  updatedRooms.splice(index, 1);
  setRooms(updatedRooms);
};
const handleDragOver = (event) => {
// Prevent the default behavior to allow dropping
event.preventDefault();
};

const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? (
        nodes.children.map((node) => renderTree(node))
          ) : (
          <Button style={{backgroundColor:"gray"}} onClick={() => handleButtonClick(nodes.name)}>
            {nodes.name}
          </Button>
        )}
    </TreeItem>
  );

const handleOpenModal = (dropZoneId, productIndex) => {
  setOpenModal(true);
  setSelectedDropZoneId(dropZoneId);
  setSelectedProductIndex(productIndex);
};

const handleCloseModal = () => {
  setOpenModal(false);
  setNoteTitle("");
  setNoteDescription("");
  setSelectedDropZoneId(null);
  setSelectedProductIndex(null);
};


const handleAddToAllDropZones = (dropZoneId, cardIndex) => {
  const sourceCard = dropZones[dropZoneId].cards[cardIndex];

  dropZones.forEach((zone, zoneIndex) => {
    if (zoneIndex !== dropZoneId) {
      if (!cardExistsInZone(zone, sourceCard)) {
        zone.cards.push({ ...sourceCard });
      }
    }
  });
  
  // Update the state or perform any necessary actions handleDrop
};

 const handleSelectProductType = (type) => {
    setSelectedProductType(type);
    setShowButtons(false);
    setShowComponent(true);
  };

const cardExistsInZone = (zone, card) => {
  return zone.cards.some(existingCard => existingCard.code === card.code);
};


const findDropZoneIdByProductId = (productId) => {
  console.log("Searching for productId:", productId);
  for (const dropZone of dropZones) {
    for (const card of dropZone.cards) {
      console.log("Comparing card.productId:", card.productId, "with productId:", productId);
      if (card.productId === productId) {
        console.log("Found matching productId:", productId, "in dropZone with id:", dropZone.id);
        return dropZone.id;
      }
    }
  }
  console.log("No matching productId found.");
  return null; // Caso o produto não seja encontrado em nenhum dropZone
};


const handleSaveNote = () => {
  const updatedDropZones = dropZones.map((dropZone) => {
    if (dropZone.id === selectedDropZoneId) {
      const updatedProduct = {
        ...dropZone.cards[selectedProductIndex],
        hasNotes: true,
      };

      if (!updatedProduct.notas) {
        updatedProduct.notas = []; // Initialize notas array if it doesn't exist
      }

      updatedProduct.notas.push({
        title: noteTitle,
        description: noteDescription,
      });

      updatedProduct.noteCount = updatedProduct.notas.length; // Update noteCount

      dropZone.cards[selectedProductIndex] = updatedProduct;
    }
    return dropZone;
  });
  setDropZones(updatedDropZones);
 

  handleCloseModal();
};

// 

const editCard = (dropZoneId, cardId, updatedCard) => {
  // Mapeia as dropZones e cards para realizar a edição no card específico
console.log("struct",dropZoneId, cardId, updatedCard );

  const updatedDropZones = dropZones.map((zone) => {
    if (zone.id === dropZoneId) {
      const updatedCards = zone.cards.map((card) => {
        // Verifica se este é o card que deve ser editado
        if (card._id === cardId) {
          // Atualiza o card com as novas informações
          return { ...card, ...updatedCard };
        }
        return card;
      });

      // Retorna a dropZone atualizada com os cards atualizados
      return { ...zone, cards: updatedCards };
    }
    return zone;
  });

  // Atualiza o estado com as dropZones atualizadas
  setDropZones(updatedDropZones);
};


const handleEditProduct = (dropZoneId, editedProduct) => {
console.log("sexiii",dropZoneId, editedProduct);
};


const [discounts, setDiscounts] = useState([]);

// Função para adicionar um desconto a um produto específico
const addDiscount = (productId, title, discount) => {
  const newDiscounts = [...discounts, { productId, title, discount }];
  setDiscounts(newDiscounts);
};

const dbg = () => {console.log(discounts)};

const handleAddProduct = (dropZoneId, product) => {

  // Find the drop zone where the product was dropped
  const dropZone = dropZones.find((zone) => zone.id === dropZoneId);


  if (product.ac === 1) {

    const updatedDropZone = {...dropZone, cards: [...dropZone.cards, product]};
    const updatedDropZones = dropZones.map((zone) => { if (zone.id === dropZoneId) { return updatedDropZone; } return zone; });
    setDropZones(updatedDropZones);

    handleOpenRoomModal(dropZoneId, product);

  } else if (product.rt === 1) {

    const updatedDropZone = {...dropZone, cards: [...dropZone.cards, product]};
    const updatedDropZones = dropZones.map((zone) => { if (zone.id === dropZoneId) { return updatedDropZone; } return zone; });
    setDropZones(updatedDropZones);

    
  } else if (product.ex === 1) {

    const updatedDropZone = {...dropZone, cards: [...dropZone.cards, product]};
    const updatedDropZones = dropZones.map((zone) => { if (zone.id === dropZoneId) { return updatedDropZone; } return zone; });
    setDropZones(updatedDropZones);

    handleCloseAddModal();
    setSelectedGeneralCard(product);
    handleOpenRateModal(dropZoneId);

  }
  
};


// handleDrop


const recieveDataFromChildComponent = (dados) => {

 handleAddProduct(temporaryDropZoneId, dados);
  
  
// >>>  
  
};

const recieveDataFromEditChildComponent = (dados) => {

  console.log("Edition",dados);
   //handleEditProduct(temporaryDropZoneId, dados); 
  
  
// >>>  
  
};

// handleDrop

const handleTesteRate = (cardId, rateId) => {

  console.log("Rate Id",rateId);
  console.log("Card Id",cardId);

  for (const dropZone of dropZones) {
    for (const card of dropZone.cards) {
      if (card._id === cardId) {
        for (const rate of card.rates) {
          if (rate._id === rateId) {
            rate.sel = 1;
            priceCalculation();
            handleCloseRateModal();
          }
        }
        return; // Retorna após encontrar e atualizar o rate
      }
    }
  }
  
  console.log("Start times",selectedGeneralCard.rates);
};

// noteCount

// handleSelectProductType

return (
<Box m="20px">
  
{/* HEADER */}
<Box display="flex" justifyContent="space-between" alignItems="center">
<Header title="PACKAGE-BOARD 📋" subtitle="Welcome to your salesboard" />

{showPriceAlert && (
        <Alert  variant="filled" sx={{width:300}}  onClose={handlePriceAlertClose} severity="success">
        Price was Updated!
        </Alert>
)}

  </Box>
  <Snackbar sx={{top: - 1100, marginLeft: 150}} open={openCrumb} autoHidCrumbeDuration={6000} onClose={handleCloseCrumb}>
        <MuiAlert onClose={handleCloseCrumb} severity="error">
          {message}
        </MuiAlert>
      </Snackbar>

     
  <Paper
      elevation={3}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderRadius: '8px',
        padding: '8px', // Reduzindo o espaço interno
        width: '1800px', // Largura total do Paper dividida por 4
        height: '80px',
        marginLeft: 260,
      }}
    >
<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <h1 style={{ fontSize: 14, marginBottom: 5}}>Tour Type 👥</h1>
  <select
  id="tourType"
  name="tourType"
  onChange={(event) => setSelectedTourType(event.target.value)}
>
  <option value="private">Private</option>
  <option value="group">Group</option>
  <option value="mix"> Private & Group</option>
</select>

</div>

      <Divider orientation="vertical" flexItem />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: 14 }}>People 👥</h1> {/* Reduzindo o tamanho do título */}
        <p>{numberOfParticipants} pax</p>
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: 14 }}>Duration 🕗</h1> {/* Reduzindo o tamanho do título */}
        <p>{tourDuration} days(s)</p>
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: 14 }}>Location 📍</h1> {/* Reduzindo o tamanho do título */}
        <p>
          <span style={{ marginRight: '10px' }}>{xp}</span>
          <span style={{ marginRight: '10px' }}>-</span>
          <span style={{ marginRight: '10px' }}>{ep}</span>
        </p>
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <h1 style={{ fontSize: 14 }}>Client's Budget 💰</h1>
  <input
    type="number"
    value={clientsBudget}
    onChange={(event) => setClientsBudget(event.target.value)}
  />
</div>
<Divider orientation="vertical" flexItem />
<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: 14 }}>Descount %</h1> {/* Reduzindo o tamanho do título */}
        <p>{priceDescount} $</p>
      </div>
      <Divider orientation="vertical" flexItem />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: 14 }}>Price 💲</h1> {/* Reduzindo o tamanho do título */}
        <p>{tourPrice} $</p>
      </div>
      
    </Paper>
    
  
  {/* GRID & CHARTS */}
            
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridAutoRows="180px"
              gap="20px"
              marginTop="20px"
              
            >

              {/* ROW 1 */}

              <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  flexDirection="column"  // Adicionando esta propriedade para empilhar os botões verticalmente
                  justifyContent="center"
                  height="330px"  // Ajuste para "auto" ou o valor desejado para acomodar os 5 botões
                  overflow="auto"
                  width="70px"
                  marginLeft="170px"
                >
                  {/* Aqui estão os 5 botões */}
                  <Button onClick={() => handleButtonClick('Day Tour Activities')} title="Day Tour Activities">
                    <ParkIcon/>
                  </Button>
                  <Divider/>
                  <Button onClick={() => handleButtonClick('Attraction')} title="Attraction">
                    <TourIcon/>
                  </Button>
                  <Divider/>
                  <Button onClick={() => handleButtonClick('Event')} title="Event">
                    <CelebrationIcon/>
                  </Button>
                  <Divider/>
                  <Button onClick={() => handleButtonClick('Transportation')} title="Transportation">
                    <AirportShuttleIcon/>
                  </Button>
                  <Divider/>
                  <Button onClick={() => handleButtonClick('Rentals')} title="Rentals">
                    <DirectionsCarIcon/>
                  </Button>
                  <Divider/>
                  <Button onClick={() => handleButtonClick('Accomodation')} title="Accomodation">
                    <KingBedIcon/>
                  </Button>
                  <Divider/>
                  <Button onClick={() => handleButtonClick('Ticket')} title="Ticket">
                    <ConfirmationNumberIcon/>
                  </Button>
                  <Divider/>
                  <Button onClick={() => handleButtonClick('Multi - Day Tour')} title="Multi - Day Tour">
                    <InventoryIcon/>
                  </Button>
                  <Divider/>
                  <Button onClick={() => handleButtonClick('Meals')} title="Meals">
                    <DinnerDiningIcon/>
                  </Button>
                </Box>


              <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="flex-start"
                justifyContent="center"
                height="500%"
                width="400px"
                marginRight="0px"
                sx={{
                  overflow: "auto",
                  maxHeight: "900px", // Defina a altura máxima desejada
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  
                >
                  <br/>
                <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ marginBottom: "10px" }}
            fullWidth
            sx={{ pr: "10px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        {filteredProducts.length > 0 ? (
          <>
            {filteredProducts.map((product, index) => (
              <Card
                key={index}
                sx={{
                  backgroundColor: colors.greenAccent[400],
                  width: "330px",
                  margin: "10px",
                  cursor: "grab",
                }}
                draggable
                onDragStart={(event) => handleDragStart(event, product)}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.code}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            flexGrow={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="350px"
          >
            No products available
          </Typography>
        )}
      </Box>
    </Box>

    <Modal open={isMealModalOpen} onClose={handleCloseMealModal}>
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
        //overflow: "auto",  // Enable scrolling when content overflows
        marginTop:"100px",
        
      }}
    >
 
       <h1 className="text-center" >Price & Overview💲 | Package pricing and Overview</h1>

      <br/>

      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="10px"
        width="60%"
        sx={{
          //overflow: 'auto',
          marginTop: '30px',
        }}
      >
        {/* Renderiza os quadrados com títulos */}
        <Paper
      elevation={3} // Adicione uma elevação para dar uma aparência de papel
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue', // Defina a cor de fundo para azul claro
        borderRadius: '8px',
        padding: '16px',
        width: '200px',
        height: '150px',
        margin: '10px',
      }}
    >
      <h1>Pax 👥</h1>
      <h3>4 people</h3>
      
      {/* Conteúdo do quadrado */}
    </Paper>
    <Paper
      elevation={3} // Adicione uma elevação para dar uma aparência de papel
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue', // Defina a cor de fundo para azul claro
        borderRadius: '8px',
        padding: '16px',
        width: '200px',
        height: '150px',
        margin: '10px',
      }}
    >
      <h1>Duration 🕜</h1>
      <h3>2 day(s)</h3>
      
      {/* Conteúdo do quadrado */}
    </Paper>
    <Paper
      elevation={3} // Adicione uma elevação para dar uma aparência de papel
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue', // Defina a cor de fundo para azul claro
        borderRadius: '8px',
        padding: '16px',
        width: '200px',
        height: '150px',
        margin: '10px',
      }}
    >
      <h1>Location 📍</h1>
      <h3>RAI - VXE</h3>
      
      {/* Conteúdo do quadrado */}
    </Paper>
    <Paper
      elevation={3} // Adicione uma elevação para dar uma aparência de papel
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue', // Defina a cor de fundo para azul claro
        borderRadius: '8px',
        padding: '16px',
        width: '200px',
        height: '150px',
        margin: '10px',
      }}
    >
      <h1>Price 💲</h1>
      <h3>442, 00</h3>
      
      {/* Conteúdo do quadrado */}
    </Paper>
  </Box>
  <br/>
    <div style={{ display: 'flex' }}>
      <Box
       onDrop={handleDropRooms}
       onDragOver={(event) => event.preventDefault()}
        gridColumn="span 3"
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        height="628px"
        width="1000px"
        maxHeight= '628px'
        marginRight="0px"
        sx={{
          overflow: 'auto',
          border: '2px dashed gray',
        }}
      >
        
        {/* Rest of your content for displaying products */}
        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"  
        >
      <Box
        gridColumn="span 3"
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        height="628px"
        width="1000px"
        maxHeight= '628px'
        marginRight="0px"
        sx={{
          overflow: 'auto',
          border: '2px dashed gray',
        }}
      >
        
        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"  
        >

        <h4>Products</h4>
          </Box>
        </Box>
      </Box>
      </Box>
    </div> 
      <Button variant="contained" sx={{marginTopGeneralft:0}}>
          Add Meals <CheckIcon sx={{marginRate:'4px'}}/>
        </Button>
      </Box>
    </Box>
  </Modal>

  <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
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
                maxHeight: "100vh",
                overflowY: "auto",
              }}
            >
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseEditModal}
                aria-label="close"
                sx={{ alignSelf: "flex-end" }}
              >
                <CloseIcon />
              </IconButton>
              <br />
              <br />
              <br />
              <br />
              {/* Renderizar o componente específico com base no tipo de produto */}
              {selectedProductType === 'day-tour-activity' && <EditProductDayTourActivity data={temporary} onUpdateData={handleUpdateDataFromChild} />}
            </Box>
          </Box>
        </Modal>

        <Modal open={isAddModalOpen} onClose={handleCloseAddModal}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.paper',
              borderRadius: 8,
              p: 2,
              width: '50%',
              maxHeight: '100vh',
              overflowY: 'auto',
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseAddModal}
              aria-label="close"
              sx={{ alignSelf: 'flex-end' }}
            >
              <CloseIcon />
            </IconButton>
            <br />
            <br />
            <br />
            <br />
            
            {/* Renderizar a lista de botões apenas se showButtons for true */}
            {showButtons && (
              <div>
                <Typography variant="h2">Choose the type of the product</Typography>
                <div>
                  <Button fullWidth onClick={() => handleSelectProductType('day-tour-activity')}>
                    Day Tour Activity 🌳
                  </Button>
                </div>
                <div>
                  <Button fullWidth onClick={() => handleSelectProductType('attraction')}>
                    Attraction 🗿
                  </Button>
                </div>
                <div>
                  <Button fullWidth onClick={() => handleSelectProductType('event')}>
                    Event 🎟️
                  </Button>
                </div>
                <div>
                  <Button fullWidth onClick={() => handleSelectProductType('transportation')}>
                    Transportation 🛳️
                  </Button>
                </div>
                <div>
                  <Button fullWidth onClick={() => handleSelectProductType('rental')}>
                    Rental 🛻
                  </Button>
                </div>
                <div>
                  <Button fullWidth onClick={() => handleSelectProductType('accommodation')}>
                    Accommodation 🛏️
                  </Button>
                </div>
                <div>
                  <Button fullWidth onClick={() => handleSelectProductType('meal')}>
                    Meal 🍜
                  </Button>
                </div>
                <div>
                  <Button fullWidth onClick={() => handleSelectProductType('ticket')}>
                    Ticket 🎫
                  </Button>
                </div>
                <div>
                  <Button fullWidth onClick={() => handleSelectProductType('visa')}>
                    Visa 💳
                  </Button>
                </div>
                {/* Adicione mais botões conforme necessário */}
              </div>
            )}

            {/* Renderizar o componente específico com base no tipo de produto selecionado */}
            {showComponent && (
              selectedProductType === 'day-tour-activity' && <CreateProductDayTourActivity sendToParentComponent={recieveDataFromChildComponent} />
            )}
            
            <Button fullWidth variant="contained" sx={{ marginTop: 5 }}>
              Add Product <CheckIcon sx={{ marginLeft: '4px' }} />
            </Button>
          </Box>
        </Box>
      </Modal>

  <Modal open={isRateModalOpen} onClose={handleCloseRateModal}>
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
        maxHeight: "120vh", // Set a maximum height for the modal content
        //overflow: "auto",  // Enable scrolling when content overflows handleDrop
        marginTop:"100px",
        
      }}
    >
       <h1 className="text-center" >Rates 🏷️ | Chose the rate for the product</h1>
       <IconButton
      edge="end" // Coloque o botão no canto direito
      color="inherit"
      onClick={handleCloseRateModal}
      aria-label="close"
      sx={{ marginLeft: 155, marginTop: -7 }}
    >
      <CloseIcon />
         </IconButton>
         <br/>
         <br/>
         <div>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <div className="container" style={{ maxWidth: "800px", width: "100%" }}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-body d-flex align-items-center justify-content-center">
                    {selectedGeneralCard.rates.map((rate) => (
                      <>
                        <Card sx={{ width: 600 }} key={rate._id}>
                          <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography color="textPrimary" variant="h2" sx={{ marginRight: "120px" }}>
                                {rate.title}
                              </Typography>
                            </Box>
                            <Divider/>
                            <br/>
                            {rate.startTimes && rate.startTimes.map((startTime) => (

                              <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography key={startTime._id} color="textSecondary" variant="h4" sx={{ marginRight: "200px" }}>
                              🕓 -  {startTime.value} Hrs
                              </Typography>
                              
                              <Button variant="contained" onClick={() => handleTesteRate(selectedGeneralCard._id, rate._id)}>
                                <EastIcon />
                              </Button>
                              </Box>
                              

                            ))}
                            <Divider/>
                          </CardContent>
                        </Card>
                        <br />
                      </>
                    ))}

                        
           
                        <br/>
                      {/* Add other cards with similar structure here */}
                    </div>
                    <br />
                  </div>
                </div>
              </div>
          </Box>
        </div>
        <br/>
       </Box>
      </Box>
      </Modal>


      <Modal open={isDiscountModalOpen} onClose={handleCloseDiscountModal}>
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
        maxHeight: "120vh", // Set a maximum height for the modal content
        //overflow: "auto",  // Enable scrolling when content overflows handleDrop
        marginTop:"100px",
        
      }}
    >
       <h1 className="text-center" >Price & Discount's 💲 | Give discounts based on the price calculated.</h1>
       <IconButton
      edge="end" // Coloque o botão no canto direito
      color="inherit"
      onClick={handleCloseDiscountModal}
      aria-label="close"
      sx={{ marginLeft: 155, marginTop: -7 }}
    >
      <CloseIcon />
    </IconButton>
  
         <br/>
         <br/>
         <div>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <div className="container" style={{ maxWidth: "800px", width: "100%" }}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card-body d-flex align-items-center justify-content-center">
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
                                   Discount || Package Full Price
                                  </Button>
                                  <Button
                                  color="secondary"
                                    variant={selectedTab === "tab2" ? "contained" : "outlined"}
                                    onClick={() => setSelectedTab("tab2")}
                                  >
                                    Discount || Product Price
                                  </Button>
                                </Box>



                          {selectedTab === "tab1" && (
                            // Conteúdo para o Botão 1 handleAddC
                          
                            <div>
                                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                  <div className="container" style={{ maxWidth: "800px", width: "100%" }}>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="card-body d-flex align-items-center justify-content-center">
                                          {productsWithDiscounts && productsWithDiscounts.map((product, index) => (
                                            <Card key={index} style={{ marginBottom: '10px', width: "300px" }}>
                                              <CardContent>
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                  <Typography color="textSecondary" variant="h5">
                                                    {product.name}
                                                  </Typography>
                                                  <div style={{ display: 'flex', alignItems: 'center'}}>
                                            
                                                    <TextField
                                                   
                                                      type="number"
                                                      //value={product.quantity}
                                                      InputProps={{
                                                        inputProps: {
                                                          min: 0,
                                                        endAdornment: '%'
                                                         
                                                        },
                                                      }}
                                                      style={{ width: '50px', textAlign: 'center', marginLeft: 10, width: "100px" }}
                                                      onChange={(e) => updateSelectedDiscount(index, e.target.value)}
                                                    />
                                                  
                                                  </div>
                                                </Box>
                                              </CardContent>
                                            </Card>
                                          ))}

                                          <div>
                                          <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseDiscountModal}>
                                              cancel </Button>
                                          <Button variant="contained" onClick={() => calculateTotalDiscount(productsWithDiscounts)}>
                                              Save <CheckIcon sx={{marginLeft:'4px'}}/>
                                          </Button>

                                        </div>

                                        
                                        </div>
                                        <br />
                                      </div>
                                    </div>
                                  </div>
                                  <Fab color="secondary" aria-label="add" style={{ position: "fixed", bottom: "50px", right: "50px" }} size="large">
                                    <AddIcon />
                                  </Fab>
                                </Box>
                                <Fab color="info" onClick={handlePdf} aria-label="add" style={{ position: "fixed", bottom: "50px", right: "50px" }} size="large">
                                  <DownloadIcon />
                                </Fab>
                              </div>
                          )}
                          {selectedTab === "tab2" && (
                            // Conteúdo para o Botão 2
                            
                            <div>
                          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <div className="container" style={{ maxWidth: "800px", width: "100%" }}>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="card-body d-flex align-items-center justify-content-center">
                                        <Card >
                                          <CardContent>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                              <Typography color="textSecondary" variant="h5" sx={{marginRight: "120px"}}>
                                                  Apply Descount to Final Price
                                              </Typography>
                                              <TextField
                                                   
                                                   type="number"
                                                   //value={product.quantity}
                                                   InputProps={{
                                                     inputProps: {
                                                       min: 0,
                                                     endAdornment: '%'
                                                      
                                                     },
                                                   }}
                                                   style={{ width: '50px', textAlign: 'center', marginLeft: 10, width: "100px" }}
                                                   onChange={(e) => handleGeneralDiscountValueChange(e.target.value)}
                                                 />
                                              
                                            </Box>          
                                        </CardContent>
                                      </Card>
                                      <br/>
                                      <div style={{marginLeft: 300}}>
                                          <Button variant="contained" sx={{marginRight:'4px'}} onClick={handleCloseDiscountModal}>
                                              cancel </Button>
                                          <Button variant="contained" onClick={calculateGeneralDiscount}>
                                              Save <CheckIcon sx={{marginLeft:'4px'}}/>
                                          </Button>

                                        </div>

                                  
                                    {/* Add other cards with similar structure here handleDrop */}
                                  </div>
                                  <br />
                                </div>
                              </div>
                            </div>
                            <Fab color="secondary" aria-label="add" style={{position:"fixed", bottom:"50px", right:"50px"}} size="large">
                            <AddIcon />
                          </Fab>
                          
                        </Box>
                            </div>
                          )}

                          
                        </Box>
                      </div>

                        
           
                        <br/>
                      {/* Add other cards with similar structure here */}
                    </div>
                    <br />
                  </div>
                </div>
              </div>
          </Box>
        </div>
        <br/>
       </Box>
      </Box>
      </Modal>



    <Modal open={isRoomModalOpen} onClose={handleCloseRoomModal}>
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
        //overflow: "auto",  // Enable scrolling when content overflows
        marginTop:"100px",
        
      }}
    >
       <h1 className="text-center" >Rooms 🛏️ | Organize the accomodation rooms for your travellers</h1>
       <IconButton
      edge="end" // Coloque o botão no canto direito
      color="inherit"
      onClick={handleCloseRoomModal}
      aria-label="close"
      sx={{ marginLeft: 155, marginTop: -7 }}
    >
      <CloseIcon />
         </IconButton>
       <h1><BoyIcon fontSize="lg"/>{numberOfPeople}</h1>
          <br/>
            <div style={{ display: 'flex' }}>
              <Box
                gridColumn="span 3"
                display="flex"
                alignItems="flex-start"
                justifyContent="center"
                height="628px"
                width="900px"
                maxHeight= '628px'
                marginRight="0px"
                sx={{
                  overflow: 'auto',
                  border: '2px dashed gray',
                }}
                onDrop={numberOfPeople > 0 ? handleDropRooms : null}
                onDragOver={(event) => (numberOfPeople > 0 ? event.preventDefault() : null)}
              >
                {/* Rest of your content for displaying products */}
                <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"  
                >

                <h4>Drag the Rooms Here</h4>
                {rooms.map((room, index) => (
                  <Card
                  key={index}
                  style={{
                    width: '90%',
                    margin: '8px',
                    padding: '8px',
                    backgroundColor: 'lightgray',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                    <div style={{ width: '2%' }}>
                      <BedIcon sx={{marginLeft:1}} />
                  </div>
                  <div style={{ width: '15%' }}>
            <TextField
          
            value={
              editedRoomIndex === index ? editedRoom.description : room.code
            }
            disabled
            onChange={(e) =>
              setEditedRoom({ ...editedRoom, description: e.target.value })
            }
            size="small"
          />
        </div>
        <div style={{ width: '15%' }}>
          <TextField
            label="Title"
            value={
              editedRoomIndex === index ? editedRoom.description : room.title
            }
              disabled
            onChange={(e) =>
              setEditedRoom({ ...editedRoom, description: e.target.value })
            }
            size="small"
          />
        </div>

          <div style={{ width: '15%' }}>
            <TextField
              type="date"
              value={
                editedRoomIndex === index ? editedRoom.checkInDate : room.checkInDate
              }
              disabled={editedRoomIndex !== null && editedRoomIndex !== index}
              onChange={(e) =>
                setEditedRoom({ ...editedRoom, checkInDate: e.target.value })
              }
              size="small"
            />
          </div>
          <div style={{ width: '8%' }}>
          <TextField
            label="Capacity"
            type="number"
            value={editedRoomIndex === index ? editedRoom.capacity : room.capacity}
            disabled={editedRoomIndex !== null && editedRoomIndex !== index}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              let updatedCapacity;

              if (isNaN(newValue)) {
                updatedCapacity = 0; // Se não for um número, defina como 0
              } else {
                // Garanta que o valor fique entre 0 e o valor inicial
                updatedCapacity = Math.min(Math.max(0, newValue), room.capacity);
              }

              setEditedRoom({ ...editedRoom, capacity: updatedCapacity });
            }}
            size="small"
          />
          </div>
          <div style={{ width: '1%' }}>
           <Typography variant="h3">|</Typography>
          </div>
          <div style={{ width: '5%' }}>
          <Typography variant="h5">{room.capacity} 🧑🏾‍🤝‍🧑🏾</Typography>
          </div>
          <div style={{ width: '10%', textAlign: 'right' }}>
            {editedRoomIndex !== null && editedRoomIndex === index && (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleSaveEdit}
                size="small"
              >
                Save
              </Button>
            )}
            {editedRoomIndex === null && (
              <Button
                sx={{marginBottom:"2px"}}
                variant="contained"
                color="info"
                onClick={() => handleEdit(index)}
                size="small"
              >
                <EditIcon/>
              </Button>
            )}
            <Button
              variant="contained"
              color="info"
              onClick={() => handleRemoveRoom(index)}
              size="small"
            >
              <CloseIcon/>
            </Button>
          </div>
        </Card>
        
        ))}
      </Box>
      </Box>

      <Box
        gridColumn="span 3"
        backgroundColor="lightgray"
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        width="300px"
        marginRight="0px"
        sx={{
          overflow: 'auto',
          maxHeight: '628px',
        }}
      >
        {/* Rest of your content for displaying products */}
        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        
      >
        <br/>
        <Typography><strong>{selectedAccomodationCard.name}</strong></Typography>
        {selectedAccomodationCard.rooms.length > 0 ? (
          <>
            {selectedAccomodationCard.rooms.map((product, index) => (
              <Card
                key={index}
                sx={{
                  backgroundColor: colors.greenAccent[400],
                  width: "250px",
                  margin: "10px",
                  cursor: "grab",
                }}
                draggable
                onDragStart={(event) => handleDragStart(event, product)}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.code}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            flexGrow={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="250px"
          >
            No products available
          </Typography>
        )}
      </Box>
      </Box>
    </div> 
    <Button
        variant="contained"
        sx={{ marginTop: 5, marginLeft: 0 }}
        onClick={() => addListRooms(selectedAccomodationCard.id, rooms)} // Chame a função com o id
      >
        Add Rooms <CheckIcon sx={{ marginLeft: '4px' }} />
      </Button>
          </Box>
      </Box>
      </Modal>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            width="1370px"
            height="500%"
            overflow="auto"
            marginRight="100px"
          >
            {/* Fourth Box */}
            {dropZones ? (
            <div style={{
          display: "flex",
          flexDirection: "row",
          width: "max-content",
        }}>
          {dropZones.map((dropZone) => (
            <div
              key={dropZone.id}
              style={{
                margin: "10px",
                padding: "20px",
                backgroundColor: "gray",
                height: "750px",
                width: "320px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                borderRadius: "10px",
                overflow: "auto",
              }}
              onDrop={(event) => handleDrop(event, dropZone.id)}
              onDragOver={handleDragOver}
            >
              <Typography variant="h6" component="div">
                <strong>{dropZone.title}</strong>
              </Typography>
              <Typography variant="h6" component="div" style={{ marginLeft: "103px", marginTop: "-22px" }}>
                <strong>{dropZone.data}</strong>
              </Typography>
              <Typography variant="h6" component="div" style={{ marginLeft: "210px", marginTop: "-25px" }}>
                <strong>{dropZone.diaSeman}</strong>
              </Typography>
              <Button
                variant="contained"
                color="info"
                width="180px"
                style={{ marginTop: "10px", marginLeft: "32px", width: "200px" }}
                onClick={() => handleOpenAddModal(dropZone.id)}
              >
                <AddIcon />
              </Button>
              <Button
                variant="contained"
                color="info"
                width="180px"
                onClick={() => handleRemoveAllProducts(dropZone.id)}
                style={{ marginTop: "10px", marginLeft: "32px", width: "200px" }}
              >
                <DeleteIcon />
              </Button>

              <br />
              {dropZone.cards.length === 0 ? (
                <Typography variant="body1" style={{ textAlign: "center", marginTop: "50%", marginLeft:"80px", color: "black" }}>
                  No products added
                </Typography>
              ) : (
                dropZone.cards.map((card, index) => (
                  <Badge badgeContent={card.noteCount || 0} color="error" key={index}>
                  <Card draggable onDragStart={(event) => handleDragStart(event, card)}
                    sx={{
                      position: "relative",
                      marginTop: "10px",
                      width: "100%",
                      minWidth: "280px",
                      backgroundColor: card.isAccommodation ? lightBlue : colors.greenAccent[400], // Define a cor do fundo com base em isAccommodation
                      cursor: "grab"
                    }}
                  >
                  <CardContent>
                  <Typography variant="body1">
                    {card.name}  {getEmojiForType(card.emo)} 
                    </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.code}
                  </Typography>
                  </CardContent>
                    {card.ac === 1 && ( 
                      
                      <Fab color="info" aria-label="add" size="small" onClick={() => handleOpenRoomModal(dropZone.id,card)} sx={{ marginTop: "5px", marginLeft: '3px', marginBottom: '5px' }}>
                        <BedIcon />
                      </Fab>
                    )}
                      
                    <Fab color="info" aria-label="add" size="small" onClick={() => handleOpenModal(dropZone.id, index)}   sx={{ marginLeft:'5px', marginTop: "5px", marginBottom:'5px'}}>
                      <AddIcon />
                    </Fab>
                    <Fab color="info" aria-label="add" size="small" onClick={() => handleOpenEditModal(dropZone.id, card)}  sx={{ marginTop: "5px", marginLeft:'3px', marginBottom:'5px' }}>
                      <EditIcon />
                    </Fab>
                    {
                      (!card.ac || !card.rt) && (
                      
                    <Fab
                      color='success' 
                      aria-label="add"
                      size="small"
                      //onEvent={(event) => handleClick(event)}
                      sx={{ marginTop: '5px', marginLeft: '3px', marginBottom: '5px' }}
                    >
                      <AttachMoneyIcon />
                    </Fab>
                  )}

                    <CloseIcon sx={{ position: "absolute", top: 4, right: 4 }} onClick={() => handleRemoveProduct(dropZone.id, index)} />
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                  <div style={{maxHeight: 200, overflowY: "auto"}}>
                    <Typography variant="h6" sx={{ padding: '10px' }}>
                      Select a Rate:
                    </Typography>
                    {card.rates.map((rate) => (
                      <Button
                        key={rate.id}
                        onClick={() => {
                          // Atualize o campo "sel" do rate selecionado para 1
                          rate.sel = 1;

                          // Chame a função para lidar com a seleção do rate
                          //handleSelectRate(rate, card.id, dropZones.cards);
                          getPrice();
                          handleClose();
                          //handleCardClick(rate.id);
                        }}
                        sx={{ display: 'block', textAlign: 'left', padding: '5px' }}
                      >
                      <DirectionsBusIcon/> {rate.title} 
                      </Button>
                    ))}
                  </div>
                </Popover>
                </Card>
                </Badge>
                ))
              )}
            </div>
          ))}
        </div>
        ) : (
          <Typography variant="body1" style={{ textAlign: "center", marginTop: "0%", marginLeft:"500px", color: "grey" }}>
            No days available
          </Typography>
        )}
        </Box>


      

    <Box
    gridColumn="span 3"
    display="flex"
    justifyContent="flex-end"
    style={{ height: "800px" }}
    >
      <Fab color="info" aria-label="add" style={{position:"fixed", bottom:"530px", right:"50px"}} size="large" onClick={handleRemoveColumn}>
        <RemoveIcon />
      </Fab>
      <Fab color="info" aria-label="add" style={{position:"fixed", bottom:"600px", right:"50px"}} size="large" onClick={handleAddColumn}>
        <AddIcon />
      </Fab>
    
    </Box>

    {/* Modal productAccomodation */}
    <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md">
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Note"
            fullWidth
            multiline
            rows={4}
            value={noteDescription}
            onChange={(e) => setNoteDescription(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveNote} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
  </Box>
  <Fab color="info" aria-label="add" style={{position:"fixed", bottom:"50px", right:"50px"}} size="large" onClick={handleGoToPdfButton}>
 <CheckIcon />
      </Fab>
      <Fab color="info" aria-label="add" style={{position:"fixed", bottom:"120px", right:"50px"}} size="large">
        <CreateNewFolderIcon />
      </Fab>
</Box>

);
};

export default Dashboard;




