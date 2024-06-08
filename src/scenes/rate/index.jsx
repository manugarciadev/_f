import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { tokens } from "../../theme";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';


const Card = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  width:"600px",
  height: "30vh", // Definindo uma altura máxima
  overflowY: "auto", // Permitindo a rolagem vertical
}));

const TierOption = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const Incrementer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const RemoveButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [tierPrices, setTierPrices] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Common Tours Rate",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      tiers: [],
    },
    // ...
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([
    {
      id: 1,
      titulo: "Adult",
      tiers: [
        { limiteInicial: 1, limiteFinal: 2 },
       
      ],
    },
    // ...
  ]);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);
  const [newTierValues, setNewTierValues] = useState([]);

  const handleOpenPricingModal = () => {
    setIsPricingModalOpen(true);
  };
  
  const handleClosePricingModal = () => {
    setIsPricingModalOpen(false);
  };

  const getTierPrice = (categoryId, tierId) => {
    const priceObj = tierPrices.find((item) => item.tierId === `${categoryId}-${tierId}`);
    if (priceObj) {
      return priceObj.price;
    }
    return "";
  };


  const handleAddPrice = (tierId, price) => {
    const updatedTierPrices = [...tierPrices];
    const index = updatedTierPrices.findIndex((item) => item.tierId === tierId);
    if (index !== -1) {
      updatedTierPrices[index].price = price;
    } else {
      updatedTierPrices.push({ tierId, price });
    }
    setTierPrices(updatedTierPrices);
  };
  
  const handleRemovePrice = (tierId) => {
    const updatedTierPrices = tierPrices.filter((item) => item.tierId !== tierId);
    setTierPrices(updatedTierPrices);
  };
  

  const handleOpenModal = (question) => {
    setIsModalOpen(true);
    setCurrentQuestion(question);
    setNewQuestion(question.question);
    setNewAnswer(question.answer);
    setNewTierValues(question.tiers);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentQuestion(null);
    setNewQuestion("");
    setNewAnswer("");
    setNewTierValues([]);
  };

  const handleOpenAddModal = () => {
    setIsModalOpen(true);
    setCurrentQuestion(null);
    setNewQuestion("");
    setNewAnswer("");
    setNewTierValues([]);
  };

  const handleAddQuestion = () => {
    const newQuestionObj = {
      id: Date.now(),
      question: newQuestion,
      answer: newAnswer,
      tiers: newTierValues,
      
    };
    setQuestions([...questions, newQuestionObj]);
    setIsModalOpen(false);
    setNewQuestion("");
    setNewAnswer("");
    setNewTierValues([]);
    console.log(questions);
  };

  const handleEditQuestion = () => {
    const editedQuestion = {
      ...currentQuestion,
      question: newQuestion,
      answer: newAnswer,
    };
    const updatedQuestions = questions.map((question) =>
      question.id === currentQuestion.id ? editedQuestion : question
    );
    setQuestions(updatedQuestions);
    setIsModalOpen(false);
    setNewQuestion("");
    setNewAnswer("");
    setNewTierValues([]);
  };

  const [currentQuestion, setCurrentQuestion] = useState(null);

  const handleAddTier = (categoryId) => {
    const category = categoryOptions.find((option) => option.id === categoryId);
    const newTier = { limiteInicial: "", limiteFinal: "" };
    const updatedCategoryOptions = categoryOptions.map((option) => {
      if (option.id === categoryId) {
        return {
          ...option,
          tiers: [...option.tiers, newTier],
        };
      }
      return option;
    });
    setCategoryOptions(updatedCategoryOptions);
  };

  const handleRemoveTier = (categoryId, index) => {
    const category = categoryOptions.find((option) => option.id === categoryId);
    const updatedTiers = category.tiers.filter((_, i) => i !== index);
    const updatedCategoryOptions = categoryOptions.map((option) => {
      if (option.id === categoryId) {
        return {
          ...option,
          tiers: updatedTiers,
        };
      }
      return option;
    });
    setCategoryOptions(updatedCategoryOptions);
  };

  const handleInitialChange = (categoryId, index, value) => {
    const category = categoryOptions.find((option) => option.id === categoryId);
    const updatedTiers = [...category.tiers];
    updatedTiers[index].limiteInicial = value;
    const updatedCategoryOptions = categoryOptions.map((option) => {
      if (option.id === categoryId) {
        return {
          ...option,
          tiers: updatedTiers,
        };
      }
      return option;
    });
    setCategoryOptions(updatedCategoryOptions);
  };

  const handleLimitChange = (categoryId, index, value) => {
    const category = categoryOptions.find((option) => option.id === categoryId);
    const updatedTiers = [...category.tiers];
    updatedTiers[index].limiteFinal = value;
    const updatedCategoryOptions = categoryOptions.map((option) => {
      if (option.id === categoryId) {
        return {
          ...option,
          tiers: updatedTiers,
        };
      }
      return option;
    });
    setCategoryOptions(updatedCategoryOptions);
  };

  return (
    <Box m="20px">
      <Header title="CREATE / MANAGE RATES" subtitle="List of Rates" />
      <Button variant="contained" style={{marginBottom:"30px"}} onClick={handleOpenAddModal}>
        Create Rate <AddIcon/>
      </Button>

      {questions.map((question) => (
        <Card key={question.id}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          <DirectionsBusIcon fontSize="large" style={{color:"black"}}/> {question.question} 
          </Typography>
          <br/>
          <Button style={{marginRight:"10px"}} variant="contained" onClick={() => handleOpenModal(question)}>
            Edit
          </Button>
          <Button style={{marginRight:"10px"}} variant="contained" onClick={handleOpenPricingModal}>
            Pricing
          </Button>
          <Button variant="contained" >
            Remove
          </Button>
        </Card>
      ))}

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <ModalContent>
          {currentQuestion ? (
            <>
              <Typography variant="h5">Editar Pergunta</Typography>
              <
TextField
label="Pergunta"
value={newQuestion}
onChange={(e) => setNewQuestion(e.target.value)}
fullWidth
margin="normal"
/>
<TextField
label="Resposta"
value={newAnswer}
onChange={(e) => setNewAnswer(e.target.value)}
fullWidth
margin="normal"
/>
<Button variant="contained" onClick={handleEditQuestion}>
Salvar
</Button>
</>
) : (
<>
<Typography variant="h5">Add Rate</Typography>
<TextField
label="Title"
value={newQuestion}
onChange={(e) => setNewQuestion(e.target.value)}
fullWidth
margin="normal"
/>
<TextField fullWidth
          id="outlined-multiline-static"  
          multiline
          rows={4}
          defaultValue="Description"
        />
<br/>
{categoryOptions.map((category) => (
            <TierOption key={category.id}>
              <Typography variant="h6">{category.titulo}</Typography>
              {category.tiers.map((tier, index) => (
                <InputContainer key={index}>
                  <Incrementer>
                    <IconButton
                      onClick={() =>
                        handleInitialChange(
                          category.id,
                          index,
                          tier.limiteInicial - 1
                        )
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      label="Inicial"
                      value={tier.limiteInicial}
                      onChange={(e) =>
                        handleInitialChange(
                          category.id,
                          index,
                          e.target.value
                        )
                      }
                      type="number"
                      margin="normal"
                    />
                    <IconButton
                      onClick={() =>
                        handleInitialChange(
                          category.id,
                          index,
                          tier.limiteInicial + 1
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Incrementer>
                  <Incrementer>
                    <IconButton
                      onClick={() =>
                        handleLimitChange(
                          category.id,
                          index,
                          tier.limiteFinal - 1
                        )
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      label="Limite"
                      value={tier.limiteFinal}
                      onChange={(e) =>
                        handleLimitChange(
                          category.id,
                          index,
                          e.target.value
                        )
                      }
                      type="number"
                      margin="normal"
                    />
                    <IconButton
                      onClick={() =>
                        handleLimitChange(
                          category.id,
                          index,
                          tier.limiteFinal + 1
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Incrementer>
                  <RemoveButton
                    onClick={() => handleRemoveTier(category.id, index)}
                  >
                    <RemoveIcon />
                  </RemoveButton>
                </InputContainer>
              ))}
              <Button
                variant="contained"
                onClick={() => handleAddTier(category.id)}
              >
                Adicionar Tier
              </Button>
            </TierOption>
          ))}
          <Button variant="contained" onClick={handleAddQuestion}>
            Adicionar
          </Button>
        </>
      )}
    </ModalContent>
  </Modal>
  <Modal open={isPricingModalOpen} onClose={handleClosePricingModal}>
  <ModalContent>
    <Typography variant="h5">Pricing</Typography>
    {categoryOptions.map((category) => (
      <TierOption key={category.id} style={{marginLeft:"120px"}}>
        <Typography style={{marginLeft:"120px"}} variant="h6">{category.titulo}</Typography>
        {category.tiers.map((tier) => (
          <InputContainer key={tier.limiteInicial}>
            <Typography variant="body1">
              Tier {tier.limiteInicial} - {tier.limiteFinal}
            </Typography>
            <TextField
              label="Price"
              value={getTierPrice(category.id, tier.limiteInicial)}
              onChange={(e) =>
                handleAddPrice(`${category.id}-${tier.limiteInicial}`, e.target.value)
              }
              type="number"
              margin="normal"
            />
            <RemoveButton
              onClick={() => handleRemovePrice(`${category.id}-${tier.limiteInicial}`)}
            >
              <RemoveIcon />
            </RemoveButton>
          </InputContainer>
        ))}
      </TierOption>
    ))}
    <Typography variant="h6">Currency</Typography>
    <Select
      value={selectedCurrency}
      onChange={(e) => setSelectedCurrency(e.target.value)}
      fullWidth
      margin="normal"
    >
      <br/>
      <MenuItem value="USD">USD</MenuItem>
      <MenuItem value="EUR">EUR</MenuItem>
      <MenuItem value="GBP">GBP</MenuItem>
      {/* Add more currency options as needed */}
    </Select>
    <div style={{marginLeft:"180px", marginTop:"30px"}}>
    <Button variant="contained" onClick={handleClosePricingModal} style={{marginRight:"10px"}}>
      Close
    </Button>
    <Button variant="contained" onClick={handleAddQuestion}>
            Adicionar
          </Button>
          </div>
  </ModalContent>
</Modal>
</Box>
);
};

export default FAQ;
