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

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDayTourActivityButton = () => {window.location.href = "/create-product-day-tour-activity";};
  const handleAttractionButton = () => { window.location.href = '/create-product-attraction'; };
  const handleMealButton = () => { window.location.href = '/create-product-meal'; };
  const handleEventButton = () => { window.location.href = '/create-product-event'; };
  const handleTransportationButton = () => { window.location.href = '/create-product-transportation'; };
  const handleRentalButton = () => { window.location.href = '/create-product-rental'; };
  const handleAccomodationButton = () => { window.location.href = '/create-product-accomodation'; };
  const handleTicketButton = () => { window.location.href = '/create-product-ticket'; };
  const handleMultiDayTourButton = () => { window.location.href = '/create-product-multi-day-tour'; };
  const handleVisaButton = () => { window.location.href = '/create-product-visa'; };

  return (
    <Box m="20px" textAlign="center">
      <Header
        title="TYPE OF PRODUCTS"
        subtitle="Choose the type of product you want to create"
      />

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
               <Card>
                <CardContent>
                  <Typography variant="h5" component="div">Day Tour Activities 🌳</Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                    If your experience is a tour or an activity, select this option.
                  </Typography>
                  <br/>
                  <Button variant="outlined" size="large" className="circle-button" onClick={handleDayTourActivityButton}>
                  🟢
                </Button>
                  
                </CardContent>
                
              </Card>
              <br />
            </div>
            <div className="col-md-6">
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">Attraction 🗿</Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                    Something to see? Beautiful landscape and historic marks? Attraction it is.
                  </Typography>
                  <br/>
                  <Button variant="outlined" size="large" className="circle-button" onClick={handleAttractionButton}>
                  🟢
                </Button>
                </CardContent>
              </Card>
              <br />
            </div>
            <div className="col-md-6">
               <Card>
                <CardContent>
                  <Typography variant="h5" component="div">Event 🎟️</Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                    If your experience is an event, this would be the perfect choice.
                  </Typography>
                  <br/>
                  <Button variant="outlined" size="large" className="circle-button" onClick={handleEventButton}>
                  🟢
                </Button>
                </CardContent>
              </Card>
              <br />
            </div>
            <div className="col-md-6">
              <Card>
              
                <CardContent>
                  <Typography variant="h5" component="div">Transportation 🛳️</Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                    If your product is a transportation service, select this option.
                  </Typography>
                  <br/>
                  <Button variant="outlined" size="large" className="circle-button" onClick={handleTransportationButton}>
                  🟢
                </Button>
                </CardContent>
              </Card>
              <br />
            </div>
            <div className="col-md-6">
             <Card>
              
                <CardContent>
                  <Typography variant="h5" component="div">Rentals 🛻</Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                    If your experience is a rental vehicle service, select this option.
                  </Typography>
                  <br/>
                  <Button variant="outlined" size="large" className="circle-button" onClick={handleRentalButton}>
                  🟢
                </Button>
                </CardContent>
              </Card>
              <br />
            </div>
            <div className="col-md-6">
               <Card>
            
                <CardContent>
                  <Typography variant="h5" component="div">Accommodation 🛏️</Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                  If your experience is a Accomodation service, select this option.
                  </Typography>
                  <br/>
                  <Button variant="outlined" size="large" className="circle-button" onClick={handleAccomodationButton}>
                  🟢
                </Button>
                </CardContent>
              </Card>
              <br />
            </div>
            <div className="col-md-6">
            <Card>
                <CardContent>
                  <Typography variant="h5" component="div">Meals 🍜</Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                      If your experience is Meal service, select this option.
                  </Typography>
                  <br/>
                  <Button variant="outlined" size="large" className="circle-button" onClick={handleMealButton}>
                  🟢
                </Button>
                </CardContent>
              </Card>
           
              <br />
            </div>
            <div className="col-md-6">
             <Card>
              
                <CardContent>
                  <Typography variant="h5" component="div">Ticket 🎫</Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                      If your experience is a Ticket vehicle service, select this option.
                  </Typography>
                  <br/>
                  <Button variant="outlined" size="large" className="circle-button" onClick={handleTicketButton}>
                  🟢
                </Button>
                </CardContent>
              </Card>
              <br />
            </div>
            <div className="col-md-6">
              <Card>
                
                <CardContent>
                  <Typography variant="h5" component="div">Multi-Day Tour 📦</Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                      If your experience is a Multiple Tour service, select this option.
                  </Typography>
                  <br/>
                  <Button variant="outlined" size="large" className="circle-button" onClick={handleMultiDayTourButton}>
                  🟢
                </Button>
                </CardContent>
              </Card>
              <br />
            </div>
            <div className="col-md-6">
            <Card>
                <CardContent>
                  <Typography variant="h5" component="div">Visa 💳</Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: 'gray' }}>
                        If your experience is a Visa service, select this option.
                  </Typography>
                  <br/>
                  <Button variant="outlined" size="large" className="circle-button" onClick={handleVisaButton}>
                  🟢
                </Button>
                </CardContent>
              </Card>
           
              <br />
            </div>


            {/* Rest of the card options */}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
