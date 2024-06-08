import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const App = () => {
  const [minIntegrantes, setMinIntegrantes] = useState('');
  const [maxIntegrantes, setMaxIntegrantes] = useState('');
  const [categories, setCategories] = useState([
    { title: 'Adult', startAge: 18, endAge: 99 },
    { title: 'Child', startAge: 3, endAge: 12 },
  ]);
  const [camposGerados, setCamposGerados] = useState({});
  const [generatedArray, setGeneratedArray] = useState([]);
  const ages = [22,33,18,7,30];

  const handleGenerateFields = () => {
    const from = parseInt(minIntegrantes);
    const to = parseInt(maxIntegrantes);

    if (from > to) {
      return; // Handle invalid input
    }

    const newCamposGerados = {};

    categories.forEach((category) => {
      const newCampos = [];

      for (let i = from; i <= to; i += 2) {
        const field = {
          id: new Date().getTime() + i,
          from: i,
          to: Math.min(i + 1, to),
          price: '',
        };

        newCampos.push(field);
      }

      newCamposGerados[category.title] = newCampos;
    });

    setCamposGerados(newCamposGerados);
    setGeneratedArray([]);
  };

  function countAgeCategories() {
    const counts = [];
    generatedArray.forEach(category => {
      counts.push({
        title: category.title,
        count: 0
      });
    });
  
    ages.forEach(age => {
      generatedArray.forEach(category => {
        if (age >= category.startAge && age <= category.endAge) {
          const categoryIndex = counts.findIndex(item => item.title === category.title);
          if (categoryIndex !== -1) {
            counts[categoryIndex].count++;
          }
        }
      });
    });
  
    const ttp = calculateTotalPriceArray(counts);
    console.log(ttp);
    return counts;
  }


  function calculateTotalPriceArray(counts) {
    let totalPrice = 0;
  
    counts.forEach(categoryCount => {
      const { title, count } = categoryCount;
      const category = generatedArray.find(cat => cat.title === title);
  
      if (category) {
        const field = category.fields.find(f => count >= f.from && count <= f.to);
  
        if (field) {
          totalPrice += field.price * count;
        }
      }
    });
  
    return totalPrice;
  }

  const handlePriceChange = (categoryTitle, id, event) => {
    const newCampos = camposGerados[categoryTitle].map((campo) =>
      campo.id === id ? { ...campo, price: event.target.value } : campo
    );
    setCamposGerados((prevCampos) => ({
      ...prevCampos,
      [categoryTitle]: newCampos,
    }));
  };

  const handleLimitChange = (categoryTitle, id, type, value) => {
    const newCampos = camposGerados[categoryTitle].map((campo) =>
      campo.id === id ? { ...campo, [type]: parseInt(value) } : campo
    );
    setCamposGerados((prevCampos) => ({
      ...prevCampos,
      [categoryTitle]: newCampos,
    }));
  };

  const handleRemoveField = (categoryTitle, id) => {
    const newCampos = camposGerados[categoryTitle].filter((campo) => campo.id !== id);
    setCamposGerados((prevCampos) => ({
      ...prevCampos,
      [categoryTitle]: newCampos,
    }));
  };

  const handleAddField = (categoryTitle) => {
    const categoryFields = camposGerados[categoryTitle];
    const lastField = categoryFields[categoryFields.length - 1];

    if (lastField.to + 2 <= parseInt(maxIntegrantes)) {
      const newField = {
        id: new Date().getTime(),
        from: lastField.to + 1,
        to: Math.min(lastField.to + 2, parseInt(maxIntegrantes)),
        price: '',
      };

      setCamposGerados((prevCampos) => ({
        ...prevCampos,
        [categoryTitle]: [...categoryFields, newField],
      }));
    }
  };

  const handleGenerateArray = () => {
    const newArray = [];
    categories.forEach((category) => {
      if (camposGerados[category.title]) {
        const categoryFields = camposGerados[category.title].map((campo) => ({
          from: campo.from,
          to: campo.to,
          price: campo.price,
        }));
        newArray.push({ title: category.title, startAge: category.startAge, endAge: category.endAge, fields: categoryFields });
      }
    });
    setGeneratedArray(newArray);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Número Mínimo de Integrantes"
            type="number"
            value={minIntegrantes}
            onChange={(e) => setMinIntegrantes(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Número Máximo de Integrantes"
            type="number"
            value={maxIntegrantes}
            onChange={(e) => setMaxIntegrantes(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleGenerateFields}>
        Gerar Campos
      </Button>

      {categories.map((category) => (
        <div key={category.title}>
          <Typography variant="h6">{category.title}</Typography>
          <Button variant="outlined" onClick={() => handleGenerateFields(category.title)}>
            Gerar Campos para {category.title}
          </Button>
          {camposGerados[category.title] &&
            camposGerados[category.title].map((campo) => (
              <Paper key={campo.id} elevation={3} style={{ margin: '10px', padding: '10px' }}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Participantes Mínimos"
                    type="number"
                    value={campo.from}
                    onChange={(e) => handleLimitChange(category.title, campo.id, 'from', e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  <Typography variant="subtitle1">-</Typography>
                  <TextField
                    label="Participantes Máximos"
                    type="number"
                    value={campo.to}
                    onChange={(e) => handleLimitChange(category.title, campo.id, 'to', e.target.value)}
                    style={{ margin: '0 10px' }}
                  />
                  <Typography variant="subtitle1">-</Typography>
                  <TextField
                    label="Preço"
                    type="number"
                    value={campo.price}
                    onChange={(e) => handlePriceChange(category.title, campo.id, e)}
                    style={{ marginRight: '10px' }}
                  />
                  <IconButton
                    aria-label="Remover"
                    onClick={() => handleRemoveField(category.title, campo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          <Button variant="outlined" onClick={() => handleAddField(category.title)}>
            Adicionar Campo
          </Button>
        </div>
      ))}

      <Button variant="contained" onClick={handleGenerateArray}>
        Gerar Array
      </Button>
      <Button variant="contained" onClick={countAgeCategories}>
        Count Categories
      </Button>

      <Typography variant="body1">
        Array Gerado: {JSON.stringify(generatedArray)}
      </Typography>
    </div>
  );
};

export default App;
