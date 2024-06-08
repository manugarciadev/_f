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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import BoyIcon from '@mui/icons-material/Boy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LunchDiningIcon from '@mui/icons-material/LunchDining';



const whiteColor = lightBlue[50];

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
  const [packageStartDate, setPackageStartDate] = useState(null);
  const [packageEndDate, setPackageEndDate] = useState(null);
  const [selectedPackageLanguage, setSelectedPackageLanguage] = useState('');
  const [countAdults, setCountAdults] = useState('');
  const [countChilds, setCountChilds] = useState('');
  const [childAges, setChildAges] = useState([]);
  const [infantAges, setInfantAges] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(null);
  const [title, setTitle] = useState('');
  const [form, setForm] = useState(null);
  const [retrieved, setRetrieved] = useState(null);
  const [daytourActivityProducts, setDayTourActivityProducts] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [dataRows, setDataRows] = useState([]);
  const [roomCode, setRoomCode] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [type, setType] = useState('');
  const [rooms, setRooms] = useState([]);
  const [editedRoom, setEditedRoom] = useState(null);
  const [editedRoomIndex, setEditedRoomIndex] = useState(null);
  const [totalCapacity, setTotalCapacity] = useState(10);
  // >>>
  const [optionValue, setOptionValue] = useState('');
  const [fieldValue, setFieldValue] = useState('');

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



  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };


  const handleOpenRoomModal = () => {
    setIsRoomModalOpen(true);
  };

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
    console.log(daytourActivityProducts);
 
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

 


  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');

    // Verifica se há dados armazenados e os converte de volta para um objeto JavaScript
    const formData = storedFormData ? JSON.parse(storedFormData) : null;

    // Atualiza o estado 'package' com o formData recuperado
    setForm(formData);
    setDropZones(formData.columns); // Chama a função testLs() assim que o componente é montado


    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/day-tour-activity');
        setDayTourActivityProducts(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };
  
    fetchData();



  }, []);






  const handleSendPackage = () => {

delete form.columns;
Object.assign(form, { dropZones });
const packageFormData = JSON.stringify(form);
localStorage.setItem("packageFormData", packageFormData);


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
  

  const productArray1 = [
    { name: "Product 0",code:"RAI3GP", image:"https://picsum.photos/id/237/536/354", description: " Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc." },
    { name: "Product 4",code:"RAI3GP", image:"https://picsum.photos/id/237/536/354", description: "Description 4" },
    { name: "Product 3",code:"RAI3GP", description: "Description 3"},
    { name: "Product 4",code:"RAI3GP", description: "Description 4" },
    { name: "Product 3",code:"RAI3GP", description: "Description 3" },
    { name: "Product 4",code:"RAI3GP", description: "Description 4" },
    { name: "Product 3",code:"RAI3GP", description: "Description 3" },
    { name: "Product 4",code:"RAI3GP", description: "Description 4" },

   
    // Add more products as needed
  ];

  const productArray2 = [
    { name: "Quarto - Twin",code:"#R2345", description: "Description 3", isAccommodation: true },
    { name: "Quarto - Single",code:"#R5637", description: "Description 4", isAccommodation: true  },
    { name: "Quarto - Swit",code:"#R590", description: "Description 3", isAccommodation: true },
    { name: "Quarto - Swit (Vista mar)",code:"#R5807", description: "Description 4", isAccommodation: true  },
  
    // Add more products as needed
  ];

  const productArray3 = [
    { 
      name: "Product 5",code:"RAI3GP", description: "Description 5" 
    },
    { name: "Product 6",code:"RAI3GP", description: "Description 6" },
    // Add more products as needed
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
        children: [
          {
            id: "3.1",
            name: "Child - 4",
          },
        ],
      },
      {
        id: "4",
        name: "Transportation",
        children: [
          {
            id: "4.1",
            name: "Child - 4",
          },
        ],
      },
      {
        id: "5",
        name: "Rentals",
        children: [
          {
            id: "5.1",
            name: "Child - 4",
          },
        ],
      },
      {
        id: "6",
        name: "Accomodation",
        children: [
          {
            id: "6.1",
            name: "RAI",
            children: [
              {
                id: "6.1.1",
                name: "Hotel Vip Praia",
              },
              {
                id: "6.1.2",
                name: "Hotel Santiago",
              },
              {
                id: "6.1.3",
                name: "Pensao Vip",
              },
            ]
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
        children: [
          {
            id: "4",
            name: "Child - 4",
          },
        ],
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
        name: "Accomodation",
        children: [
          {
            id: "4",
            name: "Visa",
          },
        ],
      },
    ],
  };

  const getProductArrayByName = (name) => {
    // Function to retrieve the product array based on the name
    // Replace this with your actual logic to retrieve the products
    // Return the corresponding product array based on the name
    switch (name) {
      case "Day Tour Activities":
        return daytourActivityProducts;
      case "Attraction":
        return productArray2;
      case "Hotel Vip Praia":
        return productArray2;
      default:
        return [];
    }
  };


  const handleGoToPdfButton = () => {
    window.location.href = '/local';
  };


  const handleGoToRequestBoardButton = () => {
    window.location.href = '/';
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
  
    // Se houver uma última coluna, calcule a nova data
    let newColumnDate = null;
    if (lastColumnDate) {
      const lastColumnDateObj = new Date(lastColumnDate);
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
  };

  const handleRemoveColumn = () => {
    if (dropZones.length > 0) {
      const updatedDropZones = dropZones.slice(0, -1);
      setDropZones(updatedDropZones);
    }
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

// Add the product to the drop zone
const updatedDropZone = {
  ...dropZone,
  cards: [...dropZone.cards, product],
};

// Update the drop zone in the state
const updatedDropZones = dropZones.map((zone) =>
  zone.id === dropZoneId ? updatedDropZone : zone
);

setDropZones(updatedDropZones);

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
  </Box>


  
  {/* GRID & CHARTS */}
  <Box
    display="grid"
    gridTemplateColumns="repeat(12, 1fr)"
    gridAutoRows="180px"
    gap="20px"
    marginTop="100px"
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
 
       <h1 className="text-center" >Meals 🍛 | Organize the meals for your travellers</h1>

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
        width="900px"
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

        <h4>Drag the Rooms Here</h4>
        {rooms.map((room, index) => (
          <Card
          key={index}
          style={{
            width: '100%',
            margin: '8px',
            padding: '8px',
            backgroundColor: 'lightgray',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '25%' }}>
            <TextField
              label="Room Name"
              value={editedRoomIndex === index ? editedRoom.name : room.name}
              disabled={editedRoomIndex !== null && editedRoomIndex !== index}
              onChange={(e) =>
                setEditedRoom({ ...editedRoom, name: e.target.value })
              }
              size="small"
            />
          </div>
          <div style={{ width: '25%' }}>
            <TextField
              label="Description"
              value={
                editedRoomIndex === index ? editedRoom.description : room.description
              }
              disabled={editedRoomIndex !== null && editedRoomIndex !== index}
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
          <div style={{ width: '15%' }}>
            <TextField
              label="Capacity"
              type="number"
              value={
                editedRoomIndex === index ? editedRoom.capacity : room.capacity
              }
              disabled={editedRoomIndex !== null && editedRoomIndex !== index}
              onChange={(e) =>
                setEditedRoom({ ...editedRoom, capacity: e.target.value })
              }
              size="small"
            />
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
        <Typography><strong>Hotel Name</strong></Typography>
        {filteredProducts.length > 0 ? (
          <>
            {filteredProducts.map((product, index) => (
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
            marginTop="250px"
          >
            No products available
          </Typography>
        )}
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
       <h1><BoyIcon fontSize="lg"/>{totalCapacity}</h1>

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
        width="900px"
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

        <h4>Drag the Rooms Here</h4>
        {rooms.map((room, index) => (
          <Card
          key={index}
          style={{
            width: '100%',
            margin: '8px',
            padding: '8px',
            backgroundColor: 'lightgray',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '25%' }}>
            <TextField
              label="Room Name"
              value={editedRoomIndex === index ? editedRoom.name : room.name}
              disabled={editedRoomIndex !== null && editedRoomIndex !== index}
              onChange={(e) =>
                setEditedRoom({ ...editedRoom, name: e.target.value })
              }
              size="small"
            />
          </div>
          <div style={{ width: '25%' }}>
            <TextField
              label="Description"
              value={
                editedRoomIndex === index ? editedRoom.description : room.description
              }
              disabled={editedRoomIndex !== null && editedRoomIndex !== index}
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
          <div style={{ width: '15%' }}>
            <TextField
              label="Capacity"
              type="number"
              value={
                editedRoomIndex === index ? editedRoom.capacity : room.capacity
              }
              disabled={editedRoomIndex !== null && editedRoomIndex !== index}
              onChange={(e) =>
                setEditedRoom({ ...editedRoom, capacity: e.target.value })
              }
              size="small"
            />
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
        <Typography><strong>Hotel Name</strong></Typography>
        {filteredProducts.length > 0 ? (
          <>
            {filteredProducts.map((product, index) => (
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
            marginTop="250px"
          >
            No products available
          </Typography>
        )}
      </Box>
      </Box>
    </div> 
      <Button variant="contained" sx={{marginTop:5, marginLeft:0}}>
          Add Rooms <CheckIcon sx={{marginLeft:'4px'}}/>
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
     {showDropZones ? (
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
     

      <Box style={{position:"fixed", bottom:"1040px", right:"1000px"}}>
    <Fab color="info" aria-label="add" size="large" onClick={handleShowDropZones} sx={{marginRight:'10px'}}>
        <PlayArrowIcon />
    </Fab>
    <Fab color="info" aria-label="add" size="large" onClick={handleGoToRequestBoardButton} sx={{marginRight:'10px'}}>
        <AppsIcon />
    </Fab>
    <Fab color="info" aria-label="add" size="large" onClick={handleSendPackage} sx={{marginRight:'10px'}}>
        <ArticleIcon />
    </Fab>

  </Box>




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
              <Typography variant="body1">{card.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {card.code}
              </Typography>
            </CardContent>
            <Button
              size="small"
              variant="contained"
              color="info"
              onClick={() => handleRemoveProduct(dropZone.id, index)}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <CloseIcon />
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => handleOpenModal(dropZone.id, index)}
              sx={{ marginTop: "10px" }}
            >
              <AddIcon />
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => handleOpenModal(dropZone.id, index)}
              sx={{ marginTop: "10px" }}
            >
              <EditIcon />
            </Button>
          
            
            {card.isAccommodation && (
              <Button
                variant="contained"
                color="info"
                onClick={handleOpenRoomModal}
                sx={{ position: "absolute", marginTop: "10px", marginRight: '20px' }}
              >
                <BedIcon/>
              </Button>
            )}
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


<Fab color="info" aria-label="add" style={{position:"fixed", bottom:"1000px", right:"50px"}} size="large" onClick={handleOpenMealModal}>
        <LunchDiningIcon />
      </Fab>

<Box style={{position:"fixed", bottom:"1040px", right:"1000px"}}>
    <Fab color="info" aria-label="add" size="large" onClick={handleShowDropZones} sx={{marginRight:'10px'}}>
        <PlayArrowIcon />
    </Fab>
    <Fab color="info" aria-label="add" size="large" onClick={handleGoToRequestBoardButton} sx={{marginRight:'10px'}}>
        <AppsIcon />
    </Fab>
    <Fab color="info" aria-label="add" size="large" onClick={handleSendPackage} sx={{marginRight:'10px'}}>
        <ArticleIcon />
    </Fab>
    <Fab color="info" aria-label="add" size="large" sx={{marginRight:'10px'}}>
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