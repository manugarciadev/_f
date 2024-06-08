import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Card,
  CardContent,
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
import { Stepper, Step, StepLabel, IconButton } from '@mui/material';
import { Person, Email, Phone, Done } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

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
import Autocomplete from '@mui/material/Autocomplete';

const rates = [
  { id: 1, title: 'Rate 1' },
  { id: 2, title: 'Rate 2' },
  { id: 3, title: 'Rate 3' },
];

const steps = [
  { label: 'Basic Information', icon: <Person /> },
  { label: 'Media & Description', icon: <Email /> },
  { label: 'Pricing', icon: <Phone /> },
  { label: 'Finished', icon: <Phone /> },
];


const ageRanges = [
  { id: 1, title: 'Child (0-18)', status: 'Active 🟢' },
  { id: 2, title: 'Youth(19-35)', status: 'Active 🟢' },
  { id: 3, title: 'Adult(36-50)', status: 'Active 🟢' },

];

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }];

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




const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [draggedImages, setDraggedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
    'https://blog.portalpos.com.br/app/uploads/2021/08/cores.jpg',
  
  ]);
  const [containerHeight, setContainerHeight] = useState('200px');
  const [maxParticipants, setMaxParticipants] = useState(4);
  const [prices, setPrices] = useState({});
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const generateTiers = () => {
    const tiers = [];
    for (let i = 1; i <= maxParticipants; i += 2) {
      if (i + 1 <= maxParticipants) {
        tiers.push(`${i}-${i + 1}`);
      } else {
        tiers.push(`${i}-${i}`);
      }
    }
    return tiers;
  };

  // Função para gerar os tiers com base nos tiers existentes na categoria
const generateTiersForCategory = (category) => {
  const categoryPrices = prices[category];
  const tiers = Object.keys(categoryPrices);
  return tiers;
};

  // Inicializa os preços para uma determinada categoria
  const initializePricesForCategory = (category) => {
    const tiers = generateTiers();
    const initialPrices = {};
    tiers.forEach((tier) => {
      initialPrices[tier] = 0;
    });

    setPrices((prevPrices) => ({
      ...prevPrices,
      [category]: { ...initialPrices },
    }));
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

  const handleTierChange = (category, tier, value, field) => {
    // Copiamos o objeto prices para fazer as modificações
    const newPrices = { ...prices };
    
    // Obtemos o valor do início e término do tier
    const [start, end] = tier.split('-').map(Number);
    
    // Atualizamos o início ou término do tier de acordo com o campo modificado
    if (field === 'start') {
      newPrices[category][`${value}-${end}`] = newPrices[category][tier];
      delete newPrices[category][tier];
    } else if (field === 'end') {
      newPrices[category][`${start}-${value}`] = newPrices[category][tier];
      delete newPrices[category][tier];
    }
    
    // Atualizamos o estado com o novo objeto de preços
    setPrices(newPrices);
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

  const categories = ["Category 1", "Category 2", "Category 3"];
  const themes = ["Theme 1", "Theme 2", "Theme 3"];
  const inclusionsExclusions = ["Example 1", "Example 2", "Example 3"];

const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

  
    return (
    
<Box m="20px" textAlign="center">
  <Header title="ATTRACTION 🗿" subtitle="Create a product with Attration features" />
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
                <h2 className="text-center">Give your Attraction a short but descriptive name</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Give your Experience a short but descriptive name</h4>
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
                    <TextField label="Code" id="outlined-size-normal" defaultValue="" />
                    <TextField label="Title" id="outlined-size-normal" defaultValue="" />
                  </Box>
                  <br/>
                <h2 className="text-center">What's the type of the Attraction</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Inform your travellers about the type of your attraction.</h4>
                <br/>


                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  sx={{ width: 300, marginLeft:30}}
                  renderInput={(params) => <TextField {...params} label="Attraction's Type" />}
                />


                <br/>
                <h2 className="text-center">What's the Estimate Duration of the Attraction</h2>
                <h4 className="text-center" style={{ color: 'gray' }}>Inform your travellers about the duration of your attraction so they can plan their time accordingly</h4>
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
                    id="outlined-number"
                    label="Hour"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                    <TextField
                    id="outlined-number"
                    label="Minute"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              
              </Box>
                <br/>
                <h2 className="text-center">What is the Location of your Attraction</h2>
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


            </div>
            )}
            {activeStep === 1 &&     
            
            <div>
            <br/>
            <h2 className="text-center">Tell your travellers what the expirience is all about</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Describe your expirience in detail, using exciting and engaging language to capture the essence of the expirience.</h4>
            <br/>
            <br/>
            <TextField label="Short Decription" fullWidth id="outlined-size-normal"  defaultValue="" />
            <br/>
            <br/>
            <TextField fullWidth
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue="Default Value"
          width="300px"
        />
        
 <br/>
 <br/>

            
 <br/>
            <h2 className="text-center">Want to add Photos to your Attraction?</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Show travellers even more details about your expirience to give your travellers a better idea of what to expect.</h4>
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
               
                <Button variant="contained">🖼️ Search Locally</Button>
              </div>
            ) : (
              draggedImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className="square-image"
                  style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
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
      <Paper sx={{ backgroundColor: 'white', marginLeft: '5px', overflow: 'auto', maxHeight: '370px', width:"370px" }}>
        <Grid container spacing={2} className="d-flex flex-wrap">
          {imageUrls.map((imageUrl, index) => (
            <Grid item key={index} xs={4}>
              <div className="square-image">
                <img src={imageUrl} alt={`Image ${index}`} className="square-image" />
              </div>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
      </Grid>
    </Container>
    <br/>
            <h2 className="text-center">Extra Information</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Add any additional and relevant information about the attraction</h4>
            <br/>
            <br/>
            <TextField fullWidth
          id="outlined-multiline-static"
          label="Extra"
          multiline
          rows={4}
          defaultValue=""
          width="300px"
        />
        
    <br/>
            <br/>
    </div>
    
    }
            {activeStep === 2 && (

                
            <div>
         
        </div>

            )}
{activeStep === 2 &&    <div>
  <br/>
            <h2 className="text-center">Establish your Pricing Categories.</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>You can define different types of travellers, such as adults, childrenm and groups. This will allow you to change different prices for each pricing category, so that you can tailor your pricing to the specific needs of your travellers. </h4>
            <br/>

            <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>   </TableCell>
            <TableCell>   </TableCell>
            <TableCell>   </TableCell>
            <TableCell>   </TableCell>
            <TableCell>   </TableCell>
            <TableCell>   </TableCell>
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
            <TableCell>Title</TableCell>
            <TableCell>   </TableCell>
            <TableCell>   </TableCell>
            <TableCell>   </TableCell>
            <TableCell>   </TableCell>
            <TableCell>   </TableCell>
            <TableCell>   </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
            <TableCell>     </TableCell>
           
           
            
          
              
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rates.map((rate) => (
            <TableRow key={rate.id}>
              <TableCell><DirectionsBusIcon fontSsize="medium"/> {rate.title}</TableCell>
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
              <Button >Default</Button>
                <Button onClick={() => handleEdit(rate.id)}>Edit</Button>
                <Button onClick={() => handleRemove(rate.id)}>Remove</Button>
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
        width: "50%",
        height: "60%",
        overflow: "auto",
      }}
    >
        <br/>
        <br/>
        <br/>
       <h3 className="text-center">Would you like to offer multiple rates for your expirience?</h3>
            <h5 className="text-center" style={{ color: 'gray' }}>Rates allow you to price your options separatly. For example, settig additional price for lunch or pick - up.</h5>
            <br/>
            <TextField label="Title" id="outlined-size-normal" style={{width:"500px"}} defaultValue="" />
            <h3 className="text-center">Would you like to offer multiple rates for your expirience?</h3>
            <h5 className="text-center" style={{ color: 'gray' }}>Rates allow you to price your options separatly. For example, settig additional price for lunch or pick - up.</h5>
            <br/>
            <IOSSwitch/>
            <h3 className="text-center">Would you like to offer multiple rates for your expirience?</h3>
            <h5 className="text-center" style={{ color: 'gray' }}>Rates allow you to price your options separatly. For example, settig additional price for lunch or pick - up.</h5>
            <IOSSwitch/>
            <h3 className="text-center">Would you like to offer multiple rates for your expirience?</h3>
            <h5 className="text-center" style={{ color: 'gray' }}>Rates allow you to price your options separatly. For example, settig additional price for lunch or pick - up.</h5>
            <IOSSwitch/>
        <br/>
        <Container style={{marginLeft:"60px"}}>
      <Typography variant="h4" align="center" gutterBottom  style={{marginRight:"100px"}}>
        Tiered Price Tourism
      </Typography>
      <br/>
      <TextField
        label="Máximo de Integrantes"
        type="number"
        value={maxParticipants}
        onChange={(e) => setMaxParticipants(e.target.value)}
        style={{marginLeft:"300px"}}
      />
      <br/>
      <br/>
     

<Grid container spacing={2}>
  {['Adult', 'Child', 'Infant'].map((category) => (
    <Grid item xs={12} md={4} key={category}>
      <Typography style={{ marginRight: "130px" }} variant="h6" align="center" gutterBottom>
        {category}
      </Typography>
      <br />
      {prices[category] ? (
        <>
          {Object.keys(prices[category]).map((tier) => (
            <Grid container alignItems="center" key={tier}>
              <Grid item xs={3}>
                <TextField
                  label="Início"
                  type="number"
                  value={tier.split('-')[0]}
                  onChange={(e) => handleTierChange(category, tier, e.target.value, 'start')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Término"
                  type="number"
                  value={tier.split('-')[1]}
                  onChange={(e) => handleTierChange(category, tier, e.target.value, 'end')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label={`Preço (${category})`}
                  type="number"
                  value={prices[category][tier]}
                  onChange={(e) => handleChangePrice(category, tier, e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleRemoveTier(category, tier)} aria-label="remove">
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </>
      ) : null}
     
      <Box display="flex" flexDirection="column" alignItems="center" mt={2} style={{ marginRight: "130px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
          onClick={() => initializePricesForCategory(category)}
          fullWidth
        >
          <FormatListBulletedIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddTier(category)}
          style={{ marginRight: "10px", marginTop: "4px" }}
          fullWidth
          
        >
          <AddIcon />
        </Button>
      </Box>
    </Grid>
  ))}
</Grid>

      <br/>

      {/*<Button variant="contained" color="primary" onClick={calculateTotalPrice}>
        Calcular Preço Total
                </Button>*/}
    </Container>
        <Button variant="contained">
          Add  Pricing <AddIcon/>
        </Button>
      </Box>
    </Box>
  </Modal>
</Box>




        <br/>
        <br/>
        </div>

}
{activeStep === 3 &&    <div>
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


