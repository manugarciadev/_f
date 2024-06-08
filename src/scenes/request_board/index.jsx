import React, { useState, useEffect } from "react";
import {
  Box, Button, Typography, useTheme, Card, CardContent, Avatar
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';
import AppsIcon from '@mui/icons-material/Apps';
import ArticleIcon from '@mui/icons-material/Article';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Stack from '@mui/material/Stack';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AddIcon from "@mui/icons-material/Add";
import { red, lime } from '@mui/material/colors';

const color = red[400];
const secondColor = lime[500];


const cardData = [
  { id: 1, title: "1 Day Package", startDate:'20/02/2023', endDate:'21/02/2023',description: "1", image: "image_url_1", status: "draft" },
  {
    id: 2,
    title: "3 Day Package",
    startDate: '25/03/2023',
    endDate: '27/03/2023',
    description: "3",
    image: "image_url_2",
    status: "in negotiation"
  },
  {
    id: 3,
    title: "7 Day Package",
    startDate: '10/04/2023',
    endDate: '17/04/2023',
    description: "7",
    image: "image_url_3",
    status: "sold"
  },
  {
    id: 4,
    title: "2 Day Package",
    startDate: '05/05/2023',
    endDate: '07/05/2023',
    description: "2",
    image: "image_url_4",
    status: "lost"
  }
  ];

const handleGoToSalesBoardButton = () => {
  window.location.href = '/salesboard';
};

const handleEditPackage = (pckg) => {

  const packageEdit = JSON.stringify(pckg);
  localStorage.setItem("package_edit", packageEdit);
  window.location.href = '/salesboard/_edit';

};

const handleGoToRequestTable = () => {
  window.location.href = '/request-table';

};

const errorColor = red[500];
const warningColor = red[500];

const colors = {
  primary: { 400: "lightblue" },
  greenAccent: { 400: "lightgreen" },
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tourPackages, setTourPackages] = useState(null);



  useEffect(() => {
  
    // Primeira solicitação
    const fetchData = async () => {
      try {
        const response = await axios.get('/api_/package-tour');
        setTourPackages(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados da primeira solicitação:', error);
      }
    };
    // Chame as funções de solicitação
    fetchData();
  }, []);

  const [cards, setCards] = useState(cardData);

  const handleDragStart = (event, card) => {
    event.dataTransfer.setData("text/plain", card._id.toString());
  };


  const handleDrop = (event, newStatus) => {
    event.preventDefault();
    const cardId = event.dataTransfer.getData("text/plain");
    const updatedCards = tourPackages.map((card) => {
      if (card._id === cardId) {
        return { ...card, status: newStatus };
      }
      return card;
    });
  
    // Atualização local dos dados
    setTourPackages(updatedCards);
  
    // Solicitação PUT para atualizar os dados no servidor
    axios.put(`/api_/package-tour/${cardId}`, { status: newStatus })
      .then(response => {
        // Lidar com a resposta do servidor, se necessário
        console.log("Atualização bem-sucedida:", response.data);
      })
      .catch(error => {
        // Lidar com erros, se houver algum
        console.error("Erro ao atualizar o pacote turístico:", error);
      });
  };
  

  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <Box m="20px" textAlign="center">
      
    <Header title="REQUEST - MANAGER 📦" subtitle="Specify all the Relevant Package Information" />
    
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <div className="container" style={{ maxWidth: "800px", width: "100%", marginRight:"800px" }}>
        <div className="row">
          <div className="col-md-6">
            <div className="card-body d-flex align-items-center justify-content-center">
              {/* Conteúdo da coluna */}
              <Button onClick={handleGoToRequestTable} variant="contained" color="info" sx={{ width: '1500px' }}>
                  Request - Table  <TableRowsIcon />
              </Button>
            
         {/* Board Box */}     
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="1000px"
          gap="20px"
          marginTop="20px"
          width={1500}
           
          
        >
          {/* COLUMN 1 */}
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} overflow="auto" onDrop={(e) => handleDrop(e, "draft")} onDragOver={allowDrop}>
  <h2 variant="h6" align="center" sx={{ marginBottom: '10px' }}>
    <strong>DRAFT</strong> 🗂️
  </h2>
  {tourPackages ? (
    tourPackages.map((card) => {
      if (card.status === "draft") {
        return (
          <Card
            key={card._id}
            draggable
            onDragStart={(event) => handleDragStart(event, card)}
            sx={{ display: 'flex', marginBottom: '9px', marginLeft: '18px', marginRight: '18px', borderRadius: '15px', position: 'relative' }}
          >
            <Avatar
              sx={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'primary.main' }}
            >{card.profileImage}</Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography sx={{ marginBottom: '5px' }} component="div" variant="h5">
                  <strong>{card.titulo}</strong>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>Start Date : </strong>{card.startDate}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>End Date : </strong>{card.endDate}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>Duration : </strong>{card.duration} days (s)
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>Employee : </strong>{card.profileName} days (s)
                </Typography>
                <br />
                <Stack spacing={1} direction="row">
                  <Button onClick={() => handleEditPackage(card)} variant="contained" color="info" sx={{ width: '50px' }}>
                    <EditIcon />
                  </Button>
                  <Button variant="contained" color="info" sx={{ width: '50px' }}>
                    <PictureAsPdfIcon />
                  </Button>
                  <Button variant="contained" color="info" sx={{ width: '50px' }}>
                    <AddIcon />
                  </Button>
                </Stack>
              </CardContent>
            </Box>
          </Card>
        );
      }
      return null;
    })
  ) : (
    <p>No tour packages available</p>
  )}
</Box>

<Box gridColumn="span 3" backgroundColor={colors.primary[400]} overflow="auto" onDrop={(e) => handleDrop(e, "in negotiation")} onDragOver={allowDrop}>
  <h2 variant="h6" align="center" sx={{ marginBottom: '10px' }}>
    <strong>IN NEGOTIATION</strong> ⏳
  </h2>
  {tourPackages ? (
    tourPackages.map((card) => {
      if (card.status === "in negotiation") {
        return (
          <Card
            key={card._id}
            draggable
            onDragStart={(event) => handleDragStart(event, card)}
            sx={{ display: 'flex', marginBottom: '9px', marginLeft: '18px', marginRight: '18px', borderRadius: '15px', position: 'relative', backgroundColor: secondColor }}
          >
            <Avatar
              sx={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'primary.main' }}
            ></Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography sx={{ marginBottom: '5px' }} component="div" variant="h5">
                  <strong>{card.titulo}</strong>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>Start Date : </strong>{card.startDate}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>End Date : </strong>{card.endDate}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>Duration : </strong>{card.duration} days (s)
                </Typography>
                <br />
                <Stack spacing={1} direction="row">
                  <Button variant="contained" color="info" sx={{ width: '100px' }}>
                    <EditIcon />
                  </Button>
                  <Button variant="contained" color="info" sx={{ width: '100px' }}>
                    <PictureAsPdfIcon />
                  </Button>
                </Stack>
              </CardContent>
            </Box>
          </Card>
        );
      }
      return null;
    })
  ) : (
    <p>No tour packages available</p>
  )}
</Box>
 
<Box gridColumn="span 3" backgroundColor={colors.primary[400]} overflow="auto" onDrop={(e) => handleDrop(e, "sold")} onDragOver={allowDrop}>
  <h2 variant="h6" align="center" sx={{ marginBottom: '10px' }}>
    <strong>SOLD</strong> ✅
  </h2>
  {tourPackages ? (
    tourPackages.map((card) => {
      if (card.status === "sold") {
        return (
          <Card
            key={card._id}
            draggable
            onDragStart={(event) => handleDragStart(event, card)}
            sx={{ display: 'flex', marginBottom: '9px', marginLeft: '18px', marginRight: '18px', borderRadius: '15px', position: 'relative', backgroundColor: "secondary.main" }}
          >
            <Avatar
              sx={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'primary.main' }}
            ></Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography sx={{ marginBottom: '5px' }} component="div" variant="h5">
                  <strong>{card.titulo}</strong>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>Start Date : </strong>{card.startDate}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>End Date : </strong>{card.endDate}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>Duration : </strong>{card.duration} days (s)
                </Typography>
                <br />
                <Stack spacing={1} direction="row">
                  <Button variant="contained" color="info" sx={{ width: '100px' }}>
                    <EditIcon />
                  </Button>
                  <Button variant="contained" color="info" sx={{ width: '100px' }}>
                    <PictureAsPdfIcon />
                  </Button>
                </Stack>
              </CardContent>
            </Box>
          </Card>
        );
      }
      return null;
    })
  ) : (
    <p>No tour packages available</p>
  )}
</Box>
         


<Box gridColumn="span 3" backgroundColor={colors.primary[400]} overflow="auto" onDrop={(e) => handleDrop(e, "lost")} onDragOver={allowDrop}>
  <h2 variant="h6" align="center" sx={{ marginBottom: '10px' }}>
    <strong>LOST</strong> ❌
  </h2>
  {tourPackages ? (
    tourPackages.map((card) => {
      if (card.status === "lost") {
        return (
          <Card
            key={card._id}
            draggable
            onDragStart={(event) => handleDragStart(event, card)}
            sx={{ display: 'flex', marginBottom: '9px', marginLeft: '18px', marginRight: '18px', borderRadius: '15px', position: 'relative', backgroundColor: color }}
          >
            <Avatar
              sx={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'primary.main' }}
            ></Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography sx={{ marginBottom: '5px' }} component="div" variant="h5">
                  <strong>{card.titulo}</strong>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>Start Date : </strong>{card.startDate}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>End Date : </strong>{card.endDate}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  <strong>Duration : </strong>{card.duration} days (s)
                </Typography>
                <br />
                <Stack spacing={1} direction="row">
                  <Button variant="contained" color="info" sx={{ width: '100px' }}>
                    <EditIcon />
                  </Button>
                  <Button variant="contained" color="info" sx={{ width: '100px' }}>
                    <PictureAsPdfIcon />
                  </Button>
                </Stack>
              </CardContent>
            </Box>
          </Card>
        );
      }
      return null;
    })
  ) : (
    <p>No tour packages available</p>
  )}
</Box>  
          {/* ... Repeat the pattern for "sold" and "lost" columns ... */}
        </Box>
  
  
            </div>
          </div>
        </div>
      </div>
    </Box>
  </Box>
  );
};

export default Dashboard;

