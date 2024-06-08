import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ButtonGroup, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from '../../theme';
import AddIcon from '@mui/icons-material/Add';
import {  Grid, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pricesExpanded, setPricesExpanded] = useState(false);
  const [languagesExpanded, setLanguagesExpanded] = useState(false);
  const [imagesExpanded, setImagesExpanded] = useState(false);
  const [themesExpanded, setThemesExpanded] = useState(false);
  const [localizationsExpanded, setLocalizationsExpanded] = useState(false);

  const handleCancellationPolicyButton = () => {
    window.location.href = '/settings/cancellation-policy';
  };
  const handleInclusionsButton = () => {
    window.location.href = '/settings/inclusions';
  };
  const handleExclusionsButton = () => {
    window.location.href = '/settings/exclusions';
  }

  const handleCategoriesButton = () => {
    window.location.href = '/settings/categories';
  }


  const handleThemesButton = () => {
    window.location.href = '/settings/themes';
  }

  const handleAgeRangesButton = () => {
    window.location.href = '/settings/age-ranges';
  }

  const handleClassesButton = () => {
    window.location.href = '/settings/classes';
  }

  const handleLocationsButton = () => {
    window.location.href = '/settings/locations';
  }

  const handleWhatToBringButton = () => {
    window.location.href = '/settings/what-to-bring';
  }
  const handlePartnersButton = () => {
    window.location.href = '/settings/partners';
  }

  const handlePickUpLocationButton = () => {
    window.location.href = '/settings/pick-up-places';
  }

  const handleDropOffLocationButton = () => {
    window.location.href = '/settings/drop-off-places';
  }

  const handleAccomodationButton = () => {
    window.location.href = '/settings/accomodation-types';
  }


  return (
    <Box m="20px">
      <Header title="SETTINGS ⚙️" subtitle="Setup all the system configs" />
      <Grid container spacing={2}>
        {/* Primeiro Quadrado */}
        <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">CANCELLATION POLICY'S  📃</Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Cancellation Policy's available for the Products.</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handleCancellationPolicyButton}
            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>
        {/* Segundo Quadrado */}
        {/* Terceiro Quadrado */}

        {/* Quarto Quadrado */}
        <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">INCLUSIONS ✅ </Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Inclusions available for the Products.</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handleInclusionsButton}

            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>  <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">EXCLUSIONS ❎ </Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Exclusions available for the Products.</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handleExclusionsButton}

            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">DESTINATIONS 🗺️ </Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Destinations available for the Products.</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handleLocationsButton}
            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">Pick - Up Places 🚍 </Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Pick - Up Places to be available for the products</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handlePickUpLocationButton}
            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">Drop - Off Places 🚇  </Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Drop - Off Places to be available for the products</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handleDropOffLocationButton}
            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">CATEGORIES 🧩 </Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Categories available for the Products.</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handleCategoriesButton}
            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">THEMES 🔰 </Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Themes available for the Products.</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handleThemesButton}
            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">WHAT TO BRING ❓ </Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Things to Bring with you.</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handleWhatToBringButton}
            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">AGE RANGE / CATEGORY 🔢 </Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Age Ranges to be available for the Rates.</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handleAgeRangesButton}
            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">SUPPLIERS  👥</Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Partners to be available for the products</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handlePartnersButton}
            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <Paper style={{ height: '150px', padding: '16px', position: 'relative' }}>
          <div>
            <Typography variant="h3">ACCOMODATION (configs) 🛏️</Typography>
            <br/>
            <Typography variant="h6">Create and set up all the Configurations for the accomodation product types</Typography>
            <br/>
            <Button
              style={{ position: 'absolute', bottom: '16px', right: '30px' }}
              variant="contained"
              onClick={handleAccomodationButton}
            >
              <ArrowForwardIcon/>
            </Button>
          </div>
        </Paper>
        </Grid>
       
        {/* Adicione mais quadrados conforme necessário */}
      </Grid>
    </Box>
  );
};

export default FAQ;
