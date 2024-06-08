import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ButtonGroup, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from '../../theme';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pricesExpanded, setPricesExpanded] = useState(false);
  const [languagesExpanded, setLanguagesExpanded] = useState(false);
  const [imagesExpanded, setImagesExpanded] = useState(false);
  const [themesExpanded, setThemesExpanded] = useState(false);
  const [localizationsExpanded, setLocalizationsExpanded] = useState(false);

  const handleAgeRangeButton = () => {
    window.location.href = '/create-age-range';
  };

  return (
    <Box m="20px">
      <Header title="REQUEST MANAGER TABLE " subtitle="The Daily departures shows the booking status departures for each day" />

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
        border: '1px solid #ccc', // Adicionando uma borda de 1px sólida
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography color="green" variant="h5">
          Prices
        </Typography>
      </Box>
      {/* Conteúdo adicional que você deseja adicionar dentro do box */}
    </Box>
      <br/>
    <div style={{ display: 'flex' }}>
   <Button><ArrowBackIosIcon/></Button>
   <Button sx={{marginLeft:'2050px'}}><ArrowForwardIosIcon/></Button>
    </div>
    <br/>
    <div style={{ display: 'flex' }}>
        <Typography sx={{marginLeft:'30px'}}><strong>Start Time</strong></Typography>
        <Typography sx={{marginLeft:'100px'}}><strong>Code</strong></Typography>
        <Typography sx={{marginLeft:'100px'}}><strong>Expirience</strong></Typography>
        <Typography sx={{marginLeft:'500px'}}><strong>Participants</strong></Typography>
        <Typography sx={{marginLeft:'100px'}}><strong>Arrived</strong></Typography>
        
    </div>
    <br/>
      <Accordion
      expanded={pricesExpanded}
      onChange={() => setPricesExpanded(!pricesExpanded)}
      sx={{ marginBottom: '5px', backgroundColor: '#f5f5f5'}} // Aplicando a cor de fundo
    >
      <AccordionSummary
        expandIcon={null} // Removendo o ícone de expansão padrão
      >
        <Box display="flex" alignItems="center">
          <ArrowDropDownIcon sx={{ marginRight: '8px' }} /> {/* Movendo o ícone para o canto esquerdo */}
          <Typography color="green" variant="h5">
            12:00
          </Typography>
          <Typography  sx={{marginLeft:'100px'}} color="green" variant="h5">
            BCV23D
          </Typography>
          <Typography sx={{marginLeft:'100px'}} color="green" variant="h5">
            Full day Tour : Visit Banna Platantion & BBQ
          </Typography>
          <Typography sx={{marginLeft:'300px'}} color="green" variant="h5">
            9
          </Typography>

          <Typography sx={{marginLeft:'150px'}} color="green" variant="h5">
            0
          </Typography>
          <Button sx={{marginLeft:'30px'}} ><AddIcon/></Button>

        </Box>
      </AccordionSummary>
      {/* Conteúdo do Accordion */}
      <h1>1</h1>
    </Accordion>
    <Accordion
      expanded={pricesExpanded}
      onChange={() => setPricesExpanded(!pricesExpanded)}
      sx={{ marginBottom: '5px', backgroundColor: '#f5f5f5'}} // Aplicando a cor de fundo
    >
      <AccordionSummary
        expandIcon={null} // Removendo o ícone de expansão padrão
      >
        <Box display="flex" alignItems="center">
          <ArrowDropDownIcon sx={{ marginRight: '8px' }} /> {/* Movendo o ícone para o canto esquerdo */}
          <Typography color="green" variant="h5">
            12:00
          </Typography>
          <Typography  sx={{marginLeft:'100px'}} color="green" variant="h5">
            BCV23D
          </Typography>
          <Typography sx={{marginLeft:'100px'}} color="green" variant="h5">
            Full day Tour : Visit Banna Platantion & BBQ
          </Typography>
          <Typography sx={{marginLeft:'300px'}} color="green" variant="h5">
            9
          </Typography>

          <Typography sx={{marginLeft:'150px'}} color="green" variant="h5">
            0
          </Typography>
          <Button sx={{marginLeft:'30px'}} ><AddIcon/></Button>

        </Box>
      </AccordionSummary>
      {/* Conteúdo do Accordion */}
      <h1>1</h1>
    </Accordion>
    <Accordion
      expanded={pricesExpanded}
      onChange={() => setPricesExpanded(!pricesExpanded)}
      sx={{ marginBottom: '5px', backgroundColor: '#f5f5f5'}} // Aplicando a cor de fundo
    >
      <AccordionSummary
        expandIcon={null} // Removendo o ícone de expansão padrão
      >
        <Box display="flex" alignItems="center">
          <ArrowDropDownIcon sx={{ marginRight: '8px' }} /> {/* Movendo o ícone para o canto esquerdo */}
          <Typography color="green" variant="h5">
            12:00
          </Typography>
          <Typography  sx={{marginLeft:'100px'}} color="green" variant="h5">
            BCV23D
          </Typography>
          <Typography sx={{marginLeft:'100px'}} color="green" variant="h5">
            Full day Tour : Visit Banna Platantion & BBQ
          </Typography>
          <Typography sx={{marginLeft:'300px'}} color="green" variant="h5">
            9
          </Typography>

          <Typography sx={{marginLeft:'150px'}} color="green" variant="h5">
            0
          </Typography>
          <Button sx={{marginLeft:'30px'}} ><AddIcon/></Button>

        </Box>
      </AccordionSummary>
      {/* Conteúdo do Accordion */}
      <h1>1</h1>
    </Accordion>
    <Accordion
      expanded={pricesExpanded}
      onChange={() => setPricesExpanded(!pricesExpanded)}
      sx={{ marginBottom: '5px', backgroundColor: '#f5f5f5'}} // Aplicando a cor de fundo
    >
      <AccordionSummary
        expandIcon={null} // Removendo o ícone de expansão padrão
      >
        <Box display="flex" alignItems="center">
          <ArrowDropDownIcon sx={{ marginRight: '8px' }} /> {/* Movendo o ícone para o canto esquerdo */}
          <Typography color="green" variant="h5">
            12:00
          </Typography>
          <Typography  sx={{marginLeft:'100px'}} color="green" variant="h5">
            BCV23D
          </Typography>
          <Typography sx={{marginLeft:'100px'}} color="green" variant="h5">
            Full day Tour : Visit Banna Platantion & BBQ
          </Typography>
          <Typography sx={{marginLeft:'300px'}} color="green" variant="h5">
            9
          </Typography>

          <Typography sx={{marginLeft:'150px'}} color="green" variant="h5">
            0
          </Typography>
          <Button sx={{marginLeft:'30px'}} ><AddIcon/></Button>

        </Box>
      </AccordionSummary>
      {/* Conteúdo do Accordion */}
      <h1>1</h1>
    </Accordion>
    <Accordion
      expanded={pricesExpanded}
      onChange={() => setPricesExpanded(!pricesExpanded)}
      sx={{ marginBottom: '5px', backgroundColor: '#f5f5f5'}} // Aplicando a cor de fundo
    >
      <AccordionSummary
        expandIcon={null} // Removendo o ícone de expansão padrão
      >
        <Box display="flex" alignItems="center">
          <ArrowDropDownIcon sx={{ marginRight: '8px' }} /> {/* Movendo o ícone para o canto esquerdo */}
          <Typography color="green" variant="h5">
            12:00
          </Typography>
          <Typography  sx={{marginLeft:'100px'}} color="green" variant="h5">
            BCV23D
          </Typography>
          <Typography sx={{marginLeft:'100px'}} color="green" variant="h5">
            Full day Tour : Visit Banna Platantion & BBQ
          </Typography>
          <Typography sx={{marginLeft:'300px'}} color="green" variant="h5">
            9
          </Typography>

          <Typography sx={{marginLeft:'150px'}} color="green" variant="h5">
            0
          </Typography>
          <Button sx={{marginLeft:'30px'}} ><AddIcon/></Button>

        </Box>
      </AccordionSummary>
      {/* Conteúdo do Accordion */}
      <h1>1</h1>
    </Accordion>
    </Box>
  );
};

export default FAQ;
