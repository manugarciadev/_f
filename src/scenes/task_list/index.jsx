import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Button, Typography, AccordionDetails, FormControlLabel, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LinearProgress from '@mui/material/LinearProgress';
import ManIcon from '@mui/icons-material/Man';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';



const FAQ = () => {

  

  
  useEffect(() => {

    show();
    setProductsForToday(getItemsForToday(packageTour)); 
    fetchData();
  }, []);

  

  const theme = useTheme();

  const subtasks = [
   
        { id: 4, title: "Subtask 1", completed: true },
        { id: 5, title: "Subtask 2", completed: true },
        { id: 6, title: "Subtask 3", completed: true },
        { id: 7, title: "Subtask 1", completed: false },
        { id: 8, title: "Subtask 2", completed: false }
  
  ];


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
  const [selectedActivity, setSelectedActivity] = useState(null);
  let allCards = useState(null);


  const fetchData = async () => {

    try {

      const response = await axios.get('/api/package-tour');
      if (Array.isArray(response.data)) {
        setPackageTours(response.data);
      } else {
        console.error('Os dados do backend não contêm um array de atividades:', response.data);
      }

    } catch (error) {
      console.error('Erro ao buscar dados do backend:', error);
    }


  };

  const viewPackages = () => {
  
    allCards = extractAllCards(packageTours);
    setCards(allCards);
    show();
    console.log("cards",cards);
  };
  

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


  const handleSelectActivity = (id) => {
    setSelectedActivity(id);
    localStorage.setItem("selectedProductId", selectedActivity);
    const activity = localStorage.getItem("selectedProductId");
    console.log(activity);
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


  const show = () => {

    allCards = extractAllCards(packageTours);
    setCards(allCards);
    setShowDailyDepartures(true);
    console.log("show",showDailyDepartures);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString(); // ou use outros métodos para formatar conforme necessário
  };

  return (
    <Box m="20px" textAlign="center">
    <Header title="Task's List  📋" subtitle="The task set to be done for each day" />
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
            <Box m="20px">
         
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              marginBottom: '5px',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ccc',
            }}
          >
            <Box display="flex" alignItems="center">
            <Typography variant="subtitle1">{currentDate.toLocaleDateString()}</Typography>
            </Box>
          </Box>
          <br />
          <div style={{ display: 'flex' }}>
            <Button onClick={viewPackages}><ArrowBackIosIcon/></Button>
            <Button sx={{ marginLeft:'2050px' }} onClick={() => handleDateChange(1)}><ArrowForwardIosIcon/></Button>
          </div>
          <br />
          <Button variant="contained" color="primary" fullWidth onClick={viewPackages}><ArrowDropDownIcon/></Button>
          <br />
          <br />
          <div style={{ display: 'flex', marginTop: 3 }}>
            <Typography sx={{marginLeft:'10px'}}><strong>Task</strong></Typography>    
          </div>
          <br />
          <div>
            {showDailyDepartures && (
              cards.map((activity, index) => (
                <div key={activity.packageTourId} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <Accordion
                    expanded={expandedAccordions[index]}
                    onChange={() => handleAccordionChange(index)}
                    sx={{ backgroundColor: '#f5f5f5', flexGrow: 1 }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <Typography variant="h5">{activity.name}</Typography>
                      <Typography variant="h5">5 day(s) to Deadline</Typography>
                    </div>
                    </AccordionSummary>

                    {/* Conteúdo do Accordion */}
                    <AccordionDetails>
                      <div>
                        {/* Detalhes do pacote de turismo associado à atividade */}
                        {packageTours.map((tour) => (
                          activity.packageTourId === tour._id && (
                            <div key={tour._id}>
                              {/* Aqui você pode adicionar checkboxes para os subtasks */}
                              {subtasks.map((subtask) => (
                                <div key={subtask.id} style={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'  }}>
                                  <FormControlLabel
                                    control={<Checkbox checked={subtask.completed} />}
                                    label={subtask.title}
                                    //onChange={(event) => handleCheckboxChange(event, subtask.id)}
                                  />
                                  <Typography >12:03:00 hrs</Typography>
                                </div>
                              ))}

                              {/* Botões para ações relacionadas à atividade */}
                              <Button variant="contained" color="primary">Assign Resources</Button>
                              <Button sx={{marginLeft: 2}} variant="contained" color="primary" onClick={() => handleSelectActivity(tour._id)}>Tasks</Button>
                            </div>
                          )
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>

                  <Button sx={{ marginLeft: '30px' }} onClick={incrementProgress}>
                    <AddIcon />
                  </Button>
                </div>
              ))
            )}
          </div>


          
        </Box>
    
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


