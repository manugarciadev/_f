import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { Box, Button, Container, Grid, Paper, MenuItem,Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Modal from "@mui/material/Modal";
import IconButton from '@mui/material/IconButton';
import CreateProductDayTourActivity from "../product_form_day_tour_activity_edit/index";
import CreateProductAccomodation from "../product_form_accomodation_edit/index";
import CreateProductEvent from "../product_form_event_test/index";

const Contacts = () => {
  
  const [data, setData] = useState([]);
  const [selectedProductArray, setSelectedProductArray] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [dayTourActivitys, setDayTourActivitys] = useState(null);
  const [accomodations, setAccomodations] = useState(null);
  const [attractions, setAttractions] = useState(null);
  const [transfers, setTransfers] = useState(null);
  const [visas, setVisas] = useState(null);
  const [rentals, setRentals] = useState(null);
  const [meals, setMeals] = useState(null);
  const [events, setEvents] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [temporary, setTemporary] = useState(null);


  const fetchDataByType = async (type) => {
    
    try {

      let url;
  
      switch (type) {
        case 'day-tour-activity':
          url = '/api_/day-tour-activity';
          break;
        case 'accomodation':
          url = '/api_/accomodations';
          break;
        case 'rental':
          url = '/api_/rentals';
          break;
        case 'attraction':
          url = '/api_/attractions';
          break;
        case 'meal':
          url = '/api_/meals';
          break;
        case 'ticket':
          url = '/api_/tickets';
          break;
        case 'event':
          url = '/api_/events';
          break;
        case 'transfer':
          url = '/api_/transfers';
          break;
        case 'visa':
          url = '/api_/visas';
          break;

        // Adicione mais casos conforme necessário para outros tipos
        default:
          throw new Error(`Tipo desconhecido: ${type}`);
      }
  
      const response = await axios.get(url);
  
      if (response.status === 200) {
        const data = response.data;
        console.log(`Dados de ${type} obtidos com sucesso:`, data);
        return data;
        // Atualize o estado ou faça qualquer processamento necessário com os dados
        // updateData(data);
      } else {
        console.error(`Erro ao obter os dados de ${type}:`, response.data);
      }
    } catch (error) {
      console.error(`Erro ao processar a solicitação GET para ${type}:`, error);
    }
  };
  

  const handleSelectProductArray = async (type) => {
    try {
      // Chame a função de solicitação para obter os dados com base no tipo
      const data = await fetchDataByType(type);
  
      // Atualize o estado com os dados obtidos
      switch (type) {
        case 'day-tour-activity':
          setSelectedProductArray(data);
          break;
        case 'accomodation':
          setSelectedProductArray(data);
          break;
        case 'rental':
          setSelectedProductArray(data);
          break;
        case 'attraction':
          setSelectedProductArray(data);
          break;
        case 'transfer':
          setSelectedProductArray(data);
          break;
        case 'meal':
          setSelectedProductArray(data);
          break;
         case 'event':
          setSelectedProductArray(data);
          break;
        case 'ticket':
          setSelectedProductArray(data);
          break;
        case 'visa':
          setSelectedProductArray(data);
          break;
        // Adicione mais casos conforme necessário para outros tipos
        default:
          console.error(`Tipo desconhecido: ${type}`);
      }
  
      // Defina o tipo selecionado
      setSelectedProductType(type);
    } catch (error) {
      console.error(`Erro ao selecionar produtos do tipo ${type}:`, error);
    }
  };
  
  const handleOpenEditModal = (product) => {
    setTemporary(product);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  
// Primeira solicitação


  const handleDeleteItem = async (id, type) => {

    console.log(">",id, type);
    try {
      // Faça a solicitação para eliminar o item com base no tipo
      if (type === 'day-tour-activity') {
        await axios.delete(`/api_/day-tour-activity/${id}`);
      } 
      else if (type === 'accomodation') {
        await axios.delete(`/api_/accomodations/${id}`);
      } 
      else if (type === 'rental') {
        await axios.delete(`/api_/rentals/${id}`);
      }
      else if (type === 'meal') {
        await axios.delete(`/api_/meals/${id}`);
      }
      else if (type === 'event') {
        await axios.delete(`/api_/events/${id}`);
      }
      else if (type === 'ticket') {
        await axios.delete(`/api_/tickets/${id}`);
      }
      else if (type === 'visa') {
        await axios.delete(`/api_/visas/${id}`);
      }
      else if (type === 'attraction') {
        await axios.delete(`/api_/attractions/${id}`);
      }

      else if (type === 'transfer') {
        await axios.delete(`/api_/transfers/${id}`);
      }
      window.location.reload();

      console.log(`Item com ID ${id} foi excluído com sucesso.`);

      // Atualize a lista de dados após a exclusão, se necessário
    } catch (error) {
      console.error(`Erro ao excluir o item com ID ${id}:`, error);
    }
  };

  return (

    <Box m="20px">
        <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
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
                maxHeight: "100vh",
                overflowY: "auto",
              }}
            >
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseEditModal}
                aria-label="close"
                sx={{ alignSelf: "flex-end" }}
              >
                <CloseIcon />
              </IconButton>
              <br />
              <br />
              <br />
              <br />
              {/* Renderizar o componente específico com base no tipo de produto */}
              {selectedProductType === 'day-tour-activity' && <CreateProductDayTourActivity data={temporary} />}
              {selectedProductType === 'accomodation' && <CreateProductAccomodation data={temporary} />}
              {selectedProductType === 'event' && <CreateProductEvent />}
            </Box>
          </Box>
        </Modal>
    <Header title="PRODUCTS 🏷️ " subtitle="Managing the System Products" />
    <div style={{marginLeft:'450px'}}>
      </div>
      <br/>
      <TableContainer component={Paper} sx={{ backgroundColor: '#f5f5f5', maxHeight: '700px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="outlined" onClick={() => handleSelectProductArray('day-tour-activity')} sx={{ mr: 1 }}>Day Tour Activity 🌳</Button>
      <Button variant="outlined" onClick={() => handleSelectProductArray('attraction')} sx={{ mr: 1 }}>Attraction 🗿</Button>
      <Button variant="outlined" onClick={() => handleSelectProductArray('event')} sx={{ mr: 1 }}>Event 🎟️</Button>
      <Button variant="outlined" onClick={() => handleSelectProductArray('transfer')} sx={{ mr: 1 }}>Transportation 🛳️</Button>
      <Button variant="outlined" onClick={() => handleSelectProductArray('rental')} sx={{ mr: 1 }}>Rental 🛻</Button>
      <Button variant="outlined" onClick={() => handleSelectProductArray('accomodation')} sx={{ mr: 1 }}>Accommodation 🛏️</Button>
      <Button variant="outlined" onClick={() => handleSelectProductArray('meal')} sx={{ mr: 1 }}>Meal 🍜</Button>
      <Button variant="outlined" onClick={() => handleSelectProductArray('ticket')} sx={{ mr: 1 }}>Ticket 🎫</Button>
      <Button variant="outlined" onClick={() => handleSelectProductArray('visa')} sx={{ mr: 1 }}>Visa 💳</Button>
      <Button variant="outlined" onClick={() => handleSelectProductArray('multi-day-tour')} sx={{ mr: 1 }}>Multi Day Tour 📦</Button>
    </div>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <TableRow>
      <TableCell><strong>N</strong></TableCell>
        <TableCell><strong>IMAGE</strong></TableCell>
        <TableCell><strong>CODE</strong></TableCell>
        <TableCell><strong>TITLE</strong></TableCell>
        <TableCell><strong>LOCALIZATION</strong></TableCell>
        <TableCell><strong>RATE</strong></TableCell>
        <TableCell><strong>ACTIONS</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {selectedProductArray ? (
        selectedProductArray.map((product) => (
          <TableRow key={product._id}>
             <TableCell></TableCell>
            <TableCell>
              <Avatar alt={product.name} src={product.image} />
            </TableCell>
            <TableCell>{product.code}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell></TableCell>
            <TableCell>{product.rateType}</TableCell>
            <TableCell>
              <Button variant="contained" color="info" sx={{marginRight:'5px'}} onClick={() => handleOpenEditModal(product)}><EditIcon/></Button>
              <Button variant="contained" color="info" sx={{marginRight:'5px'}} onClick={() => handleDeleteItem(product._id, product.type)}><DeleteIcon/></Button>        
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
       <TableCell colSpan={8} align="center" sx={{height:'700px'}}>
            No Products Available
        </TableCell>
      </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
</Box>



  );
};

export default Contacts;
