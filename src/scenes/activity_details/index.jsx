import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LinearProgress from '@mui/material/LinearProgress';
import ManIcon from '@mui/icons-material/Man';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


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


const FAQ = () => {

  const [value, setValue] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getProductId();
  }, []);

  const theme = useTheme();

  const realDate = new Date();
  const [packageTours, setPackageTours] = useState([]);
  const [dailyDepartures, setDailyDepartures] = useState([]);
  const [showAccordions, setShowAccordions] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState([]);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [participants, setParticipants] = useState(4);
  const [cards, setCards] = useState(null);
  const [productsForToday, setProductsForToday] = useState(null);
  const [showDailyDepartures, setShowDailyDepartures] = useState(false);
 
  let allCards = useState(null);

  const getProductId = async () => { // Declaração como função assíncrona
    try {
      const activity = localStorage.getItem("selectedProductId");
      const response = await axios.get(`/api/package-tour/${activity}`);
      setPackageTours(response.data); // Retorna os dados do produto
    } catch (error) {
      console.error('Erro ao buscar dados do backend:', error);
      throw error; // Rejeita a promessa caso ocorra um erro
    }
  };
  

  const fetchDataForPackage = async (packageId) => {
    try {
      const response = await axios.get(`/api/package-tour/${packageId}`);
      setPackageTours(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do backend:', error);
    }
  }
  
  // Para fazer uma solicitação para um pacote específico (por exemplo, com ID 123):
  




  const getItemsForToday = (packageTour) => {
    const today = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato YYYY-MM-DD
  
    return packageTour.dropZones.reduce((result, dropZone) => {
      // Verifica se a data do dropZone é igual à data de hoje
      if (dropZone.data === today) {
        result.push(...dropZone.cards);
      }
      return result;
    }, []);
  };


const test = () => { 
  console.log(productsForToday);};

  const packageTour = {
    _id: '6568bfad1e3622e0a28dda0f',
    startDate: '2023-11-29T00:00:00.000+00:00', // Data correspondente a hoje
    endDate: '2023-11-30T00:00:00.000+00:00',
    dropZones: [
      {
        id: 1,
        title: 'Dia 1',
        data: '2023-12-01',
        cards: [
          { id: '5f77e8d9a5de2d482db57e73', code: 'DTA001', startTime:'9:00', name: 'Santiago Tour' },
          // Outros cards...
        ],
      },
      {
        id: 2,
        title: 'Dia 2',
        data: '2023-12-08',
        cards: [
          { id: '5f77e8d9a5do2d482db57e73', code: 'DTA002',startTime:'10:00', name: 'Hotel Santiago' },
          // Outros cards...
        ],
      },
      {
        id: 3,
        title: 'Dia 3',
        data: '2023-12-08',
        cards: [
          { id: '5f77e8d9a5do2d482db57e73', code: 'DTA002',startTime:'14:00', name: 'Hotel Santiago' },
          // Outros cards...
        ],
      },
      {
        id: 3,
        title: 'Dia 4',
        data: '2023-12-08',
        cards: [
          { id: '5f77e8d9a5do2d482db57e73', code: 'DTA002',startTime:'15:00', name: 'Hotel Santiago' },
          // Outros cards...
        ],
      },
      // Outros dropZones...
    ],
  };


  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
    localStorage.setItem("tempProduct", activity);
    console.log(selectedActivity);
  };

  const extractAllCards = (packageTours) => {
    
    const today = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato YYYY-MM-DD
    console.log(today);
    // Inicializa um array para armazenar os cards dos dropZones com a data atual
    let cardsForToday = [];
  
    // Itera sobre cada pacote de tours
    packageTours.forEach(packageTour => {
      // Itera sobre cada dropZone do pacote de tours
      packageTour.dropZones.forEach(dropZone => {
        // Verifica se a data do dropZone é igual à data atual
        const dropZoneDate = dropZone.data.replace(/\//g, "-");
        const parts = dropZoneDate.split("-"); // Dividindo a string em partes separadas por "-"
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`; // Reorganizando as partes na ordem desejada
        console.log(packageTour._id);
        if (formattedDate === today) {
          // Adiciona todos os cards da dropZone com a data atual ao array cardsForToday
          dropZone.cards.forEach(card => {
            // Adiciona o packageTour._id a cada card antes de adicioná-lo ao array
            const packageTourId = packageTour._id;
            Object.assign(card, { packageTourId });
            cardsForToday.push(card);
          });
        }
      });
    });
  
    return cardsForToday;
};
  
  


  const handleAccordionChange = (index) => {
    const newExpandedAccordions = [...expandedAccordions];
    newExpandedAccordions[index] = !newExpandedAccordions[index];
    setExpandedAccordions(newExpandedAccordions);
  };

  const toggleAccordions = () => {
    setShowAccordions(!showAccordions);
  };

  const incrementProgress = () => {
    if (count < participants) {
      const newProgress = ((count + 1) / participants) * 100;
      setProgress(newProgress);
      setCount(count + 1);
    }
  };

  const handleDateChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);
  };



  const handleDebug = () => {
    console.log("Sel",packageTours);
  };


  const show = () => {
    setShowDailyDepartures(true);
    console.log("show",showDailyDepartures);
  };


const viewPackages = () => {
  
  allCards = extractAllCards(packageTours);
  setCards(allCards);
  console.log("cards",cards);
};

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString(); // ou use outros métodos para formatar conforme necessário
  };

  return (
    <Box m="20px" textAlign="center">
    <Header title="Expirience Details 🛫" subtitle="The Daily departures shows the booking status departures for each day" />
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <div className="container" style={{ maxWidth: "1300px", width: "100%" }}>
        <div className="row">
          <div className="col-md-6">
            <div className="card-body d-flex align-items-center justify-content-center">
            <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Resources" {...a11yProps(0)} />
        <Tab label="Tasks" {...a11yProps(1)} />
        <Tab label="Docs" {...a11yProps(2)} />
        <Tab label="Info" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Resources 
      </TabPanel>
      <TabPanel value={value} index={1}>
        Tasks
      </TabPanel>
      <TabPanel value={value} index={2}>
        Docs
      </TabPanel>
      <TabPanel value={value} index={3}>
        Info 
      </TabPanel>

    </Box>
    <Button onClick={handleDebug}>yesss</Button>
    
            </div>
            <br />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default FAQ;


