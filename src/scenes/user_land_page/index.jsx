import React, { useState } from "react";
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
import {Checkbox, FormControlLabel, FormLabel, InputAdornment, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Autocomplete from '@mui/material/Autocomplete';
import Sidebar from "../global/Sidebar";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [titulo, setTitulo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [displayButtons, setDisplayButtons] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [infantsAges, setInfantsAges] = useState([]);
  const [childrenAges, setChildrenAges] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [hasNotes, setHasNotes] = useState(false);
  const [notas, setNotas] = useState([]);
  

  const handleLanguageChange = (event, newValue) => {
    setSelectedLanguage(newValue); // Store the selected language in the state variable
  };
  

  // ... (previously existing code)

  const languages = [
    { label: 'English'},
    { label: 'Portuguese' },
    { label: 'French'},
    { label: 'Spanish'},];
  
  

  const handleInfantAgeChange = (index, value) => {
    setInfantsAges((prevAges) => {
      const newAges = [...prevAges];
      newAges[index] = value;
      return newAges;
    });
  };

  const handleIdadesButtonClick = () => {
    setDisplayButtons(true);
  };

  const handleNumberButtonClick = (number) => {
    setSelectedNumbers((prevSelectedNumbers) => [...prevSelectedNumbers, number]);
  };

  const renderButtons = () => {
    const numbers = Array.from({ length: 13 }, (_, index) => index);
    const rows = [];
    const buttonPerRow = 4;

    for (let i = 0; i < numbers.length; i += buttonPerRow) {
      const row = numbers.slice(i, i + buttonPerRow);
      rows.push(row);
    }

    return rows.map((row, rowIndex) => (
      <div className="button-row" key={rowIndex}>
        {row.map((number) => (
          <Button
            key={number}
            variant="contained"
            className={`btn ${selectedNumbers.includes(number) ? 'btn-warning' : 'btn-secondary'}`}
            onClick={() => handleNumberButtonClick(number)}
            style={{ margin: '5px' }} // Add margin to create spacing between buttons
          >
            {number}
          </Button>
        ))}
      </div>
    ));
  };


  // >>> Counters

  const [countAdultos, setCountAdultos] = useState(0);
  const [countCriancas, setCountCriancas] = useState(0);
  const [countInfantes, setCountInfantes] = useState(0);


  // Function to generate options for select elements
  const generateOptions = (count) => {
    return Array.from({ length: count + 1 }, (_, index) => index).map((number) => ({
      value: number,
      label: `${number} anos`,
    }));
  };

  

  const handleChildAgeChange = (index, value) => {
    setChildrenAges((prevAges) => {
      const newAges = [...prevAges];
      newAges[index] = value;
      return newAges;
    });
  };

  const handleIncrementAdultos = () => {
    setCountAdultos((prevCount) => prevCount + 1);
  };

  const handleDecrementAdultos = () => {
    setCountAdultos((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
  };

  const handleIncrementCriancas = () => {
    setCountCriancas((prevCount) => prevCount + 1);
    setChildrenAges((prevAges) => [...prevAges, 0]);
  };

  const handleDecrementCriancas = () => {
    setCountCriancas((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
    setChildrenAges((prevAges) => prevAges.slice(0, -1));
  };

  const handleIncrementInfantes = () => {
    setCountInfantes((prevCount) => prevCount + 1);
    setInfantsAges((prevAges) => [...prevAges, 0]);
  };

  const handleDecrementInfantes = () => {
    setCountInfantes((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
    setInfantsAges((prevAges) => prevAges.slice(0, -1));
  };

  const calculateDurationInDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMilliseconds = Math.abs(end - start);
    const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));

    return durationInDays;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const duration = calculateDurationInDays(startDate, endDate);

    const columns = [];

    for (let i = 0; i < duration; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
    
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = daysOfWeek[currentDate.getDay()];
    
      const column = {
        id: i + 1,
        title: `Dia ${i + 1}`,
        data: currentDate.toLocaleDateString(), // Mostrar apenas a data no formato local do navegador
        diaSeman: dayOfWeek,
        cards: [],
        notas: notas,
        hasNotes: hasNotes,
      };
      columns.push(column);
    }

    // Create a JSON object with the form values
    const id = 1;
    const formData = {
      startDate,
      endDate,
      columns,
      selectedLanguage,
      countAdultos,
      countCriancas,
      childrenAges,
      infantsAges,
      duration,
      titulo,
    };
    console.log(formData);
    console.log(childrenAges);
    console.log(infantsAges);


    // Store the JSON object in local storage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Reset the form fields
    setStartDate('');
    setEndDate('');

    console.log(formData);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleDayTourActivityButton = () => { window.location.href = '/add-produto-day-tour-activity'; };


  
    return (
  <>
  <Sidebar/>
 
<Box m="20px" sx={{top: 0}} textAlign="center">
  
<Header title="CREATE A NEW PACKAGE" subtitle="Specifie the all the Relevant Package Information " />

<Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  height="100%"
>
  <div
    className="container"
    style={{ maxWidth: "800px", width: "100%" }}
  >
    <div className="row">
      <div className="col-md-6">
      <div className="card-body d-flex align-items-center justify-content-center">
                <form onSubmit={handleSubmit}>

          <br/>
            <h2 className="text-center">Give your package a short, but Descriptive Title.</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Give a name the suits the package better; A name that matches the choosen products.</h4>
            <br/>

                  <div className="mb-3" >
                    <FormLabel>Título:</FormLabel>
                    <TextField
                      placeholder="Título"
                      fullWidth
                      value={titulo}
                      onChange={handleTituloChange}
                    />
                  </div>
                  <br/>
            <h2 className="text-center">Pick the language for this tour.</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Choose the appropriate language for this tour.</h4>
            <br/>
            <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={languages}
      value={selectedLanguage} // Set the value of the Autocomplete
      onChange={handleLanguageChange} // Set the onChange event handler
      renderInput={(params) => <TextField {...params} label="Languages" />}
    />
                  <br/>
            <h2 className="text-center">Whats The Number & Age of the Participants?</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Inform the number of people joining the tour & their ages, for price control purposes.</h4>
            <br/>

                  <div className="mb-3" style={{marginLeft:"310px"}}>
                    <FormLabel style={{marginRight:"300px"}}>Número de Adultos:</FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="outlined" onClick={handleDecrementAdultos} className="mr-1" sx={{border:"none"}}>
                        <RemoveIcon />
                      </Button>
                      <TextField
                        type="number"
                        value={countAdultos}
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        style={{ width: '50px', textAlign: 'center' }}
                        readOnly
                      />
                      <br/>
                      <Button variant="outlined" onClick={handleIncrementAdultos} className="ml-1" sx={{border:"none"}}>
                        <AddIcon />
                      </Button>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                  {/* ... (previously existing code) */}
                  <br/>
                  <div className="mb-3" style={{marginLeft:"310px"}}>
                    <FormLabel style={{marginRight:"300px"}}>Número de Crianças:</FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="outlined" onClick={handleDecrementCriancas} className="mr-1" sx={{border:"none"}}>
                        <RemoveIcon />
                      </Button>
                      <TextField
                        type="number"
                        value={countCriancas}
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        style={{ width: '50px', textAlign: 'center' }}
                        readOnly
                      />
                      <Button variant="outlined" onClick={handleIncrementCriancas} className="ml-1" sx={{border:"none"}}>
                        <AddIcon />
                      </Button>
                    </div>
                  </div>
                  <br/>
                  {countCriancas > 0 && (
                    <Box
                      maxHeight="300px"
                      overflow="auto"
                      border="1px solid #ccc"
                      borderRadius="5px"
                      padding="10px"
                      marginBottom="20px"
                    >
                      {childrenAges.map((age, index) => (
                        <div key={index} className="mb-3">
                          <FormLabel>Criança {index + 1} Idade:</FormLabel>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Criança {index + 1} Idade</InputLabel>
                            <Select
                              value={age}
                              onChange={(e) => handleChildAgeChange(index, e.target.value)}
                              label={`Criança ${index + 1} Idade`}
                            >
                              {generateOptions(12).map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      ))}
                    </Box>
                  )}
                  {/* ... (previously existing code) */}
                </form>
                  <div className="mb-3" style={{marginLeft:"310px"}}>
                    <FormLabel style={{marginRight:"300px"}}>Número de Infantes:</FormLabel>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="outlined" onClick={handleDecrementInfantes} className="mr-1" sx={{border:"none"}}>
                        <RemoveIcon />
                      </Button>
                      <TextField
                        
                        type="number"
                        value={countInfantes}
                        InputProps={{
                          inputProps: {
                            min: 0,
                          },
                        }}
                        style={{ width: '50px', textAlign: 'center' }}
                        readOnly
                      />
                      <Button variant="outlined" onClick={handleIncrementInfantes} className="ml-1" sx={{border:"none"}}>
                        <AddIcon />
                      </Button>
                    </div>
                  </div>
                  <br/>
                  {countInfantes > 0 && (
                    <Box
                      maxHeight="300px"
                      overflow="auto"
                      border="1px solid #ccc"
                      borderRadius="5px"
                      padding="10px"
                      marginBottom="20px"
                    >
                      {infantsAges.map((age, index) => (
                        <div key={index} className="mb-3">
                          <FormLabel>Infante {index + 1} Idade:</FormLabel>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Infante {index + 1} Idade</InputLabel>
                            <Select
                              value={age}
                              onChange={(e) => handleInfantAgeChange(index, e.target.value)}
                              label={`Infante ${index + 1} Idade`}
                            >
                              {generateOptions(3).map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      ))}
                    </Box>
                  )}
                  <br/>
                  <br/>
            <h2 className="text-center">Pick the starting & ending Date.</h2>
            <h4 className="text-center" style={{ color: 'gray' }}>Pick the starting and ending days of the expiriencem to help better organize the tours / package.</h4>
            <br/>

                  <div className="mb-3">
                    <FormLabel>Data de Início:</FormLabel>
                    <TextField
                      type="date"
                      fullWidth
                      value={startDate}
                      onChange={handleStartDateChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <FormLabel>Data de Término:</FormLabel>
                    <TextField
                      type="date"
                      fullWidth
                      value={endDate}
                      onChange={handleEndDateChange}
                      required
                    />
                  </div>
                  <br/>
                  <div className="d-flex justify-content-between">
                    <Button variant="contained" type="submit" color="secondary" style={{marginRight:"10px"}}>
                      Confirmar
                    </Button>
                    <Link to="/presentprodutos">
                      <Button variant="contained"
color="primary">Cancelar</Button>
                    </Link>
                  </div>
                </form>
              </div>
        <br />
      </div>
    
    </div>
  </div>
</Box>
</Box>
</>

  );
};

export default Dashboard;

