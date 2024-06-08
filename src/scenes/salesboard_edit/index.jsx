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



const colors = {
  primary: { 400: "lightblue" },
  greenAccent: { 400: "lightgreen" },
};

const Dashboard = () => {

  // >>> Variaveis
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [productsArray, setProductsArray] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [selectedDropZoneId, setSelectedDropZoneId] = useState(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropZones, setDropZones] = useState(null); 
  const [showDropZones, setShowDropZones] = useState(false);
  // >>> Package Form Fields
  const [form, setForm] = useState(null);
  const [retrieved, setRetrieved] = useState(null);
  const [daytourActivityProducts, setDayTourActivityProducts] = useState(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
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
  const [rooms, setRooms] = useState([]);
  const [editedRoom, setEditedRoom] = useState(null);
  const [editedRoomIndex, setEditedRoomIndex] = useState(null);
  const [totalCapacity, setTotalCapacity] = useState(4);
  const [days, setDays] = useState(null);
  const [accomodations, setAccomodations] = useState(null);
  const [travellers, setTravellers] = useState(null);
  const [temporaryId, setTemporaryId] = useState(null);
  const [xp, setXp] = useState('');
  const [ep, setEp] = useState('');
  const [tourPrice, setTourPrice] = useState(0);
  const [openCrumb, setOpenCrumb] = useState(false);
  const [message, setMessage] = useState('');
  const [showPriceAlert, setShowPriceAlert] = useState(false);
  const [selectedTourType, setSelectedTourType] = useState("private");
  const [numberOfParticipants, setNumberOfParticipants] = useState(0);
  const [rateSelected, setRateSelected] = useState(false);
  const [selectedDestinations, setSelectedDestinations] = useState(null);
  // >>>
  const [buttonColors, setButtonColors] = useState({});
  const [peopleAges, setPeopleAges] = useState(null);
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


const handleTranslation = () => {


const sourceText = "Hello, how are you?";
const sourceLanguage = "en";
const targetLanguage = "fr";

translateText(sourceText, sourceLanguage, targetLanguage);

};


const getPrice = () => {
  const result = calculatePriceForDropzones(dropZones, peopleAges);



  
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
  setTourPrice(precoGeral);
  setShowPriceAlert(true);
  console.log(`Preço Geral -> ${precoGeral}`);
  console.log(result);
  console.log(dropZones);
  console.log(rooms);
  console.log(selectedRooms);
  console.log(tourDuration);
  
};




function calculatePriceForDropzones(dropzones, ages) {
  const totalPriceByDropzones = [];

  for (const dropzone of dropzones) {
      const { title, cards } = dropzone;
      const totalPricesByProduct = calculatePriceForAges(cards, ages);
      
      const totalPriceByDropzone = {
          title,
          totalPricesByProduct,
      };

      totalPriceByDropzones.push(totalPriceByDropzone);
  }

  return totalPriceByDropzones;
}

function calculatePriceForAges(product, ages) {
  const totalPriceByProduct = [];

  for (const productItem of product) {
    const { name, rates } = productItem;
    const totalPrices = { name, prices: [] };

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

        for (const field of fields) {
          if (count >= field.from && count <= field.to) {
            if (field.perPerson) {
              // Se o preço for "por pessoa", multiplica pelo número de pessoas
              total = field.price * count;
            } else {
              total = field.price;
            }
          }
        }

        totalPrices.prices.push({ title, total, number: count });
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

function calculateTotalCostForAllProducts(products, ages) {
  const totalCosts = {};

  products.forEach(product => {
      const productTotalCost = calculateTotalCostForProduct(product, ages);
      totalCosts[product.name] = productTotalCost;
  });

  return totalCosts;
}


  const handleAddRow = () => {
    const newRow = {
      roomCode: optionValue,
      checkinDate: fieldValue,
      numberOfPeople: numberOfPeople,
      checkOutDate: checkOutDate,
      type: type,
      //checkOutDate: ,
      //type:,

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
  

  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };


  
  const handleOpenRoomModal = (dropZoneId, card) => {
    setTemporaryId(dropZoneId);
    setSelectedAccomodationCard(card); // Armazena o card na variável temporária selectedCard
    setIsRoomModalOpen(true);
    console.log(selectedAccomodationCard);
    console.log(selectedTourType);
    // Lógica para abrir o modal de "acomodação" aqui
  }
 
  const handleCloseRoomModal = () => {
    setIsRoomModalOpen(false);
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

  const handleClose = () => {
    setAnchorEl(null);
  };



  const open = Boolean(anchorEl);
  const id = open ? 'rate-popover' : undefined;


  useEffect(() => {
    const storedFormData = localStorage.getItem('package_edit');
    const formData = storedFormData ? JSON.parse(storedFormData) : null;
    setForm(formData);
    setTourDestinations(formData.destinations);
    setDropZones(formData.dropZones);
    setDays(formData.dropZones);
    setTravellers(formData.participants);
    setPeopleAges(formData.participantsAge);
    setNumberOfParticipants(formData.participantsAge.length);
    setNumberOfPeople(formData.participantsAge.length);
    setTourDuration(formData.duration);
    setXp(formData.sp);
    setEp(formData.ep);
    //setClientsBudget(formData.budget);
    setSelectedDestinations(formData.destinations);

  
    // Primeira solicitação
    const fetchFirstData = async () => {
      try {
        const response = await axios.get('/api/day-tour-activity');
        setDayTourActivityProducts(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da primeira solicitação:', error);
      }
    };
  
    // Segunda solicitação
    const fetchSecondData = async () => {
      try {
        const response = await axios.get('/api/accomodation'); // Substitua com a URL correta
        setAccomodations(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da segunda solicitação:', error);
      }
    };
  
    // Chame as funções de solicitação
    fetchFirstData();
    fetchSecondData();
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
      return "❓"; // Emoji de ponto de interrogação
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




const apiUrl = '/api/package-tour';
  
fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Adicione quaisquer cabeçalhos adicionais necessários aqui
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
  




  const testLs = () => {
    // Recupera os dados do localStorage
console.log(dropZones);

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



  // Sample data for the TreeView
  const data = {
    id: "root",
    name: "Products",
    children: [
      {
        id: "1",
        name: "Day Tour Activities",
      },
      {
        id: "2",
        name: "Attraction",
      },
      {
        id: "3",
        name: "Event",

      },
      {
        id: "4",
        name: "Transportation",

      },
      {
        id: "5",
        name: "Rentals",
      },
      {
        id: "6",
        name: "Accomodation",
        children: [
          {
            id: "6.1",
            name: "RAI",
          },
          
          {
            id: "6.2",
            name: "SID",
          },
          {
            id: "6.3",
            name: "SFL",
          },
          {
            id: "6.4",
            name: "VXE",
          },
          {
            id: "6.5",
            name: "MMO",
          },
          {
            id: "6.6",
            name: "STO",
          }
        ],
      },
      {
        id: "7",
        name: "Ticket",
      },
      {
        id: "8",
        name: "Multi - Day Tour",
        children: [
          {
            id: "4",
            name: "Child - 4",
          },
        ],
      },
      {
        id: "9",
        name: "Meals",
      },
    ],
  };

  const getProductArrayByName = (name) => {

    const selectedDayTourActivitys = filterProductsByTourTypeAndRegion(productArray1, selectedTourType,selectedDestinations);
    const selectedAttractions = filterProductsByTourType(productAttractions, selectedTourType); // Filtra productAttractions
    const selectedAccomodation = filterProductsByTourType(productAccomodation, selectedTourType); // Filtra productAccomodation
    const selectedMeals = filterProductsByTourType(mealsProduct, selectedTourType); // Filtra mealsProduct
    const selectedTransfers = filterProductsByTourType(productTransfers, selectedTourType); // Filtra productTransfers
    const selectedRentals = filterProductsByTourType(productRentals, selectedTourType); // Filtra productRentals
    const selectedEvents = filterProductsByTourType(productEvents, selectedTourType); // Filtra productEvents
    const selectedTickets = filterProductsByTourType(productTickets, selectedTourType); // Filtra productTickets
    

    switch (name) {
      case "Day Tour Activities":
        return selectedDayTourActivitys;
      case "Attraction":
        return productAttractions;
      case "RAI":
        return productAccomodation;
      case "Meals":
        return mealsProduct;
      case "Transportation":
        return productTransfers;
      case "Rentals":
          return productRentals;
      case "Event":
          return productEvents;
      case "Ticket":
          return productTickets;
      default:
        return [];
    }
  };



// Function to translate text using LibreTranslate API
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


  const handleSelectRate = (rate, cardId, cards) => {
    // Copie o array de preços do rate selecionado
    // Aqui, você pode atualizar o estado ou executar alguma ação com o card atualizado
    console.log(`Card ${cardId} atualizado com os preços selecionados:`, rate);
  
    handleClose();
  }


  useEffect(() => {
    // Define um temporizador para esconder o alerta após 5 segundos
    const timeoutId = setTimeout(() => {
      setShowPriceAlert(false);
    }, 5000);

    // Limpa o temporizador quando o componente é desmontado ou quando showAddedProductAlert muda
    return () => clearTimeout(timeoutId);
  }, [showPriceAlert]);

 
const handleGoToPdfButton = async (id) => {

delete form.dropZones;
Object.assign(form, { dropZones });
  
const packageFormData = JSON.stringify(form);

console.log("package:", packageFormData, id);

const apiUrl = '/api/package-tour';

try {
  const response = await fetch(`${apiUrl}/${id}`, { // Include the ID in the URL
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers if needed
    },
    body: packageFormData,
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar o Pacote');
  }

  const responseData = await response.json();
  console.log('Pacote atualizado com sucesso:', responseData);
} catch (error) {
  console.error('Erro durante a solicitação:', error.message);
}





const storedFormData = localStorage.getItem('listRooms');

// Verifica se há dados armazenados e os converte de volta para um objeto JavaScript
const formData = storedFormData ? JSON.parse(storedFormData) : null;

// Atualiza o estado 'package' com o formData recuperado

 //window.location.href = '/local';
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
  };

  /*const handleAddColumn = () => {
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

  const handleAddColumn = () => {
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
  
    // Formate a nova data no formato "dd/MM/yyyy"
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

};

const handleDragStart = (event, product) => {
// Set the dragged product data in the data transfer object
event.dataTransfer.setData("text/plain", JSON.stringify(product));
};

const handleDrop = (event, dropZoneId) => {
  // Get the dragged product data from the data transfer object
  const product = JSON.parse(event.dataTransfer.getData("text/plain"));

  // Find the drop zone where the product was dropped
  const dropZone = dropZones.find((zone) => zone.id === dropZoneId);

  // Check if the product's ml field is equal to 1
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

    // Update the dropZones array with the updated dropZone
    const updatedDropZones = dropZones.map((zone) => {
      if (zone.id === dropZoneId) {
        return updatedDropZone;
      }
      return zone;
    });

    // Set the updated dropZones state
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
  
  // Update the state or perform any necessary actions
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
        width: '1150px', // Largura total do Paper dividida por 4
        height: '80px',
        marginLeft: 850,
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
      justifyContent="center"
      height="500%"
      overflow="auto"
      width="300px"
      marginLeft="100px"
    >
      
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<h1>📂 </h1>}
        defaultExpanded={["root"]}
        defaultExpandIcon={<h1>📁 </h1>}
        sx={{
          flexGrow: 1,
          maxWidth: 400,
          overflow: "auto",
          marginTop: "50px",
          marginLeft: "40px",
        }}
      >
        {renderTree(data)}
      </TreeView>
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
      <Button variant="contained" sx={{marginTop:5, marginLeft:0}}>
          Add Meals <CheckIcon sx={{marginLeft:'4px'}}/>
        </Button>
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
    width="1150px"
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
          <Card draggable
                onDragStart={(event) => handleDragStart(event, card)}
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
            <Fab color="info" aria-label="add" size="small" onClick={handleShowDropZones}  sx={{ marginTop: "5px", marginLeft:'3px', marginBottom:'5px' }}>
              <EditIcon />
            </Fab>
            <Fab color="error" aria-label="add" size="small"  onClick={handleClick} sx={{ marginTop: "5px", marginLeft:'3px', marginBottom:'5px' }}>
              <AttachMoneyIcon />
            </Fab>
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


<Fab color="info" aria-label="add" style={{position:"fixed", bottom:"1000px", right:"50px"}} size="large" onClick={handleTranslation}>
        <PaidIcon />
      </Fab>



      <Box style={{ position: "fixed", top: "200px", left: "800px" }}>
  <Fab color="info" aria-label="add" size="large" onClick={handleShowDropZones} sx={{ marginRight: '10px' }}>
    <PlayArrowIcon />
  </Fab>
  <Fab color="info" aria-label="add" size="large" onClick={handleGoToRequestBoardButton} sx={{ marginRight: '10px' }}>
    <AppsIcon />
  </Fab>
  <Fab color="info" aria-label="add" size="large" onClick={handleGoToRequestTableButton} sx={{ marginRight: '10px' }}>
    <ArticleIcon />
  </Fab>
  <Fab color="info" aria-label="add" size="large" sx={{ marginRight: '10px' }}>
    <AlignHorizontalCenterIcon />
  </Fab>
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

    {/* Modal */}
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
  <Fab color="info" aria-label="add" style={{position:"fixed", bottom:"50px", right:"50px"}} size="large" onClick={()=> handleGoToPdfButton(form._id)}>
        <CheckIcon />
      </Fab>
      <Fab color="info" aria-label="add" style={{position:"fixed", bottom:"120px", right:"50px"}} size="large">
        <CreateNewFolderIcon />
      </Fab>
</Box>

);
};

export default Dashboard;