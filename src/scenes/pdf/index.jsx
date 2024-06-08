import React, { useState } from "react";
import {
  Box,
  Button,
  useTheme,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch
} from "@mui/material";
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ButtonGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import { tokens } from '../../theme';
import Fab from '@mui/material/Fab';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PDFFile from './files/PDFFile';
import { PDFDownloadLink } from "@react-pdf/renderer";


const Dashboard = () => {
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
  
      <Box m="20px" textAlign="center">
      <Header title="GENERATE PDF FILES" subtitle="Specify all the Relevant Package Information " />

      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <div className="container" style={{ maxWidth: "800px", width: "100%" }}>
          <div className="row">
            <div className="col-md-6">
              <div className="card-body d-flex align-items-center justify-content-center">
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography color="textSecondary" variant="h5">
                        Show Prices
                      </Typography>
                      <Switch />
                    </Box>
                    
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography color="textSecondary" variant="h5">
                        Show Short Itenerary
                      </Typography>
                      <Switch/>
                    </Box>
                    
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography color="textSecondary" variant="h5">
                      Show Long Itenerary
                      </Typography>
                      <Switch checked={pricesExpanded} />
                    </Box>
                    
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography color="textSecondary" variant="h5">
                        Show General Information
                      </Typography>
                      <Switch checked={pricesExpanded}  />
                    </Box>
                    
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography color="textSecondary" variant="h5">
                        Show Cancellation Policys
                      </Typography>
                      <Switch checked={pricesExpanded} />
                    </Box>
                    
                  </CardContent>
                </Card>
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
      <div>
       

        <Fab
          color="secondary"
          aria-label="add"
          style={{ position: "fixed", bottom: "120px", right: "50px" }}
          size="large"
        >
          <CreateNewFolderIcon />
        </Fab>
        <PDFDownloadLink document={<PDFFile />} filename="FORM">
      {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
      </PDFDownloadLink>
      </div>
      </Box>
      
    </Box>


  );
};

export default Dashboard;




