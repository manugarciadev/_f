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
<Header title="MULTI DAY TOUR 📦" subtitle="Create a product with Multi Day Tour features" />
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
            {/* Renderizar o conteúdo do formulário com base no passo atual */}
            {activeStep === 0 && <p>Informações Pessoais</p>}
            {activeStep === 1 && <p>Informações de Contato</p>}
            {activeStep === 2 && <p>Telefone</p>}

            {/* Botões de navegação */}
            <div>
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

