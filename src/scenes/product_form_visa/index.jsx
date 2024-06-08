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
import { Stepper, Step, StepLabel } from '@mui/material';
import { Person, Email, Phone, Done } from '@mui/icons-material';


const steps = [
  { label: 'Informações Pessoais', icon: <Person /> },
  { label: 'Informações de Contato', icon: <Email /> },
  { label: 'Telefone', icon: <Phone /> },
  { label: 'Concluído', icon: <Done /> },
];


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeStep, setActiveStep] = useState(0);

const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

  
    return (
      <Box m="20px" textAlign="center">
      {/* HEADER */}
      {/* HEADER */}
<Box display="flex" justifyContent="space-between" alignItems="center">
<Header title="VISA 💳" subtitle="Create a product with Visa features" />
</Box>
      <Box display="flex" justifyContent="space-between" alignItems="center"></Box>

      <div className="container" style={{ width: '800px', marginLeft:"650px" }}>
      <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <div>
            <p>Formulário enviado com sucesso!</p>
          </div>
        ) : (
          <div>
          {activeStep === 0 && (
                <div>
                <br/>
                 <h2 className="text-center">Give your Experience a short but descriptive name</h2>
                 <h4 className="text-center" style={{ color: 'gray' }}>Give your Experience a short but descriptive name</h4>
                 <br/>

                 <br/>
                 <h2 className="text-center">What's the total Duration of the Expirience</h2>
                 <h4 className="text-center" style={{ color: 'gray' }}>Inform your travellers about the duration of your expirience so they can plan their time accordingly</h4>
                 <br/>

                 <br/>
                 <h2 className="text-center">Chose the Themes that best describe your Expirience</h2>
                 <h4 className="text-center" style={{ color: 'gray' }}>Help your travallers find what they are looking for. Are you offering a walking tour?</h4>
                 <br/>

                 <br/>
                 <h2 className="text-center">What is the Location of your Expirience</h2>
                 <h4 className="text-center" style={{ color: 'gray' }}>Inform travellers about the city or town where your expirience takes place. This will help with filtering and searching online.</h4>
                 <br/>
                {/* Campos do formulário para as informações de contato */}
               
                {/* Adicione mais campos conforme necessário */}
              </div>
              )}

              {activeStep === 1 && (
                <div>
                  <br/>
                   <h2 className="text-center">Give your Experience a short but descriptive name</h2>
                   <h4 className="text-center" style={{ color: 'gray' }}>Give your Experience a short but descriptive name</h4>
                   <br/>

                   <br/>
                   <h2 className="text-center">What's the total Duration of the Expirience</h2>
                   <h4 className="text-center" style={{ color: 'gray' }}>Inform your travellers about the duration of your expirience so they can plan their time accordingly</h4>
                   <br/>

                   <br/>
                   <h2 className="text-center">Chose the Themes that best describe your Expirience</h2>
                   <h4 className="text-center" style={{ color: 'gray' }}>Help your travallers find what they are looking for. Are you offering a walking tour?</h4>
                   <br/>

                   <br/>
                   <h2 className="text-center">What is the Location of your Expirience</h2>
                   <h4 className="text-center" style={{ color: 'gray' }}>Inform travellers about the city or town where your expirience takes place. This will help with filtering and searching online.</h4>
                   <br/>
                  {/* Campos do formulário para as informações de contato */}
                 
                  {/* Adicione mais campos conforme necessário */}
                </div>
              )}

              {activeStep === 2 && (
                <div>
                  <br/>
                   <h2 className="text-center">Tell your travellers what the expirience is all about</h2>
                   <h4 className="text-center" style={{ color: 'gray' }}>Describe your expirience in detail, using exciting and engaging language to capture the essence of the expirience.</h4>
                  <br/>


                  <br/>
                   <h2 className="text-center">Tell your travellers what the expirience is all about</h2>
                   <h4 className="text-center" style={{ color: 'gray' }}>Describe your expirience in detail, using exciting and engaging language to capture the essence of the expirience.</h4>
                   <br/>
                </div>
              )}
            <div>
              <br/>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Voltar
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Enviar' : 'Próximo'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
      </div>
    </Box>
  );
};

export default Dashboard;

