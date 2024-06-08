import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, useTheme, Modal, IconButton, Grid, Card, CardContent, Badge } from '@mui/material';
import Header from '../../components/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Button, Typography, MenuItem, Paper, Select } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LinearProgress from '@mui/material/LinearProgress';
import ManIcon from '@mui/icons-material/Man';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';


const SmallCard = ({ title, number }) => {
  return (
    <Card variant="outlined" style={{ position: 'relative' }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
    </CardContent>
    <Badge badgeContent={number} color="primary" style={{ position: 'absolute', top: 8, right: 8 }}>
      <Typography variant="caption">{number}</Typography>
    </Badge>
  </Card>
  
  );
};

const HumanResourcesTable = ({ data, handleEdit, handleRemove }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
      {/* ... (Your buttons and other components) ... */}
      <Table sx={{ minWidth: 400}} aria-label="customized table">
        <TableHead>
        <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>NAME</strong></TableCell>
            <TableCell><strong>RESOURCE TITLE</strong></TableCell>
            <TableCell><strong>TYPE</strong></TableCell>
            <TableCell><strong>LOCATION</strong></TableCell>
            <TableCell><strong>HAS ACCOUNT</strong></TableCell>
            <TableCell><strong>ACTIONS</strong></TableCell> {/* New column for Actions */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? (
            data.map((row, index) => (
              <TableRow key={row.username}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>
                  <Button variant="contained" color="info" onClick={() => handleEdit(row)} sx={{ marginRight: '5px' }}>
                    <EditIcon />
                  </Button>
                  <Button variant="contained" color="info" onClick={() => handleRemove(row)}>
                    <CloseIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ height: '700px' }}>
                No Users Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const FAQ = () => {

  

  
  useEffect(() => {

    show();
    setProductsForToday(getItemsForToday(packageTour)); 
    fetchData();
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
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedTab, setSelectedTab] = useState('tab1'); 
  const [isAssignResourceModalOpen, setIsAssignResourceModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState('users');
  let allCards = useState(null);


  const data = [
    { id: 'Guide', title: 'Guide', number: 4 },
    { id: 'Driver', title: 'Driver', number: 3 }
  ];

  const fetchData = async () => {

    try {

      const response = await axios.get('/api_/package-tour');
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


  const handleOpenAssignResourceModal = () => {
    setIsAssignResourceModalOpen(true);

  };

  const handleCloseAssignResourceModal = () => {
    setIsAssignResourceModalOpen(false);
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




  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    handleOpenAssignResourceModal();
    console.log(selectedPackage);
  };


  const handleSelectActivity = (id) => {
    setSelectedActivity(id);
    localStorage.setItem("selectedProductId", selectedActivity);
    const activity = localStorage.getItem("selectedProductId");
     window.location.href = '/product-details';
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

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
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


<Modal open={isAssignResourceModalOpen} onClose={handleCloseAssignResourceModal}>
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
       <h1 className="text-center" >Assign Resources 💼  | Designate the specific resources destinated four this expirience.</h1>
       <IconButton
      edge="end" // Coloque o botão no canto direito
      color="inherit"
      onClick={handleCloseAssignResourceModal}
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
                                   Human Resources
                                  </Button>
                                  <Button
                                  color="secondary"
                                    variant={selectedTab === "tab2" ? "contained" : "outlined"}
                                    onClick={() => setSelectedTab("tab2")}
                                  >
                                    Material Resources
                                  </Button>
                                  
                                  <br/>
                              </Box>



                          {selectedTab === "tab1" && (
                            // Conteúdo para o Botão 1
                            <div>
                              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                  <div className="container" style={{ maxWidth: "800px", width: "100%" }}>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="card-body d-flex align-items-center justify-content-center">
                                        <Divider />
                                        <br/>
                                        <Grid container spacing={2}>
                                            {data.map((item, index) => (
                                              <Grid item key={index}>
                                                <SmallCard title={item.title} number={item.number} />
                                              </Grid>
                                            ))}
                                          </Grid>
                                          <br/>
                                          <Divider />
                                          <br/>
                                          <div>
                                            <Select fullWidth value={selectedTable} onChange={handleTableChange}>
                                              <MenuItem value="users">Users Table</MenuItem>
                                              <MenuItem value="groups">Groups Table</MenuItem>
                                            </Select>
                                              <HumanResourcesTable
                                                //data={data}
                                                //handleEdit={handleEdit}
                                                //handleRemove={handleRemove}
                                              />
                                          </div>
                                      
                                          <br/>

                                          {/* Add other cards with similar structure here */}
                                        </div>
                                        <br />
                                      </div>
                                    </div>
                                  </div>
                                  <Fab color="secondary" aria-label="add" style={{position:"fixed", bottom:"50px", right:"50px"}} size="large">
                                  <AddIcon />
                                </Fab>
                                
                              </Box>
                          <Fab  color="info" aria-label="add" style={{position:"fixed", bottom:"50px", right:"50px"}} size="large">
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
                                      
                                    {/* Add other cards with similar structure here */}
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




    <Header title="DAILY DEPARTURE 🛫" subtitle="The Daily departures shows the booking status departures for each day" />
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
            <Typography sx={{marginLeft:'10px'}}><strong>Start Time</strong></Typography>    
            <Typography sx={{marginLeft:'200px'}}><strong>Service Code / Title</strong></Typography>
            <Typography sx={{marginLeft:'100px'}}><strong>Participants</strong></Typography>
            <Typography sx={{marginLeft:'200px'}}><strong>Arrived</strong></Typography>
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
                  <Box display="flex" alignItems="center">
                    <ArrowDropDownIcon sx={{ marginRight: '8px' }} />
                    <Typography color="green" variant="h5">
                      ::
                    </Typography>
                    <Typography sx={{ marginLeft: '40px' }} color="green" variant="h5">
                      {activity.code}
                    </Typography>
                    <Typography sx={{ marginLeft: '40px' }} color="green" variant="h5">
                      {activity.name}
                    </Typography>
                    <Typography sx={{ marginLeft: '40px' }} color="green" variant="h5">
                      <ManIcon /> {participants}
                    </Typography>
                    <LinearProgress sx={{ width: '200px', height: '20px', marginLeft: '50px' }} variant="determinate" value={progress} />
    
                    <Typography sx={{ marginLeft: '100px' }} color="green" variant="h5">
                      {count} / {participants}
                    </Typography>
                      {count === participants && (
                      <CheckIcon sx={{ marginLeft: '10px', color: 'green' }} />
                    )}
                  </Box>
                </AccordionSummary>
    
                <Box display="flex" alignItems="center">
                {packageTours.map((tour) => (
                    activity.packageTourId === tour._id && (
                      <div key={tour._id} style={{ marginLeft: 20 , marginBottom: '5px' }}>
                         <br/>
                        {packageTours.map((tour) => (
                    activity.packageTourId === tour._id && (
                      <div key={tour._id} style={{ marginLeft: 20 , marginBottom: '5px' }}>
                         <Divider />
                         <br/>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Booking Reference - BCS - {tour._id}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Title - {tour.titulo}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Client - {tour.leadTraveller}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Start - Date - {tour.startDate}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>End - Date - {tour.endDate}</Typography>
                        <br/>
                        <br/>
                      </div>
                      
                        )
                        ))}
                        <Divider />
                        <br/>
                        <div  style={{ marginLeft: 20 , display: "flex", alignItems: 'flex-start', marginBottom: '5px' }}>
                          <Button onClick={() => handleSelectPackage(tour)} variant="contained" color="primary" >Assign Resources</Button>
                          <Button onClick={() => handleSelectActivity(tour._id)} sx={{marginLeft: 3}} variant="contained" color="primary" >Tasks</Button>
                        </div>
                        <br/>
                      </div>
                      
                    )
                ))}
                </Box>

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


