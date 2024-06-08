import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
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
import {Checkbox, FormControlLabel, FormLabel, InputAdornment, TextField, ListItemText, Modal, List, ListItem, Tabs, Tab, Badge} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import GroupIcon from '@mui/icons-material/Group';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import PropTypes from 'prop-types';
import Flag from 'react-flagkit';
import SellIcon from '@mui/icons-material/Sell';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Dashboard = () => {


  useEffect(() => {
    fetchDataSuppliers();
    fetchClassesDataLocations();
    fetchDataLocations();

  }, []);

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [titulo, setTitulo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [displayButtons, setDisplayButtons] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [infantsAges, setInfantsAges] = useState([]);
  const [childrenAges, setChildrenAges] = useState([]);
  const [hasNotes, setHasNotes] = useState(false);
  const [notas, setNotas] = useState([]);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [participantNationality, setParticipantNationality] = useState('');
  const [status, setStatus] = useState('draft');
  const [participants, setParticipants] = useState([]); // Estado inicial com array vazio
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [leadTravellar, setLeadTraveller] = useState('');
  const [language, setLanguage] = useState('');
  const [childrenNationalities, setChildrenNationalities] = useState([]);
  const [participantAdded, setParticipantAdded] = useState(Array(childrenAges.length).fill(false));
  const [destinations, setDestinations] = useState([]);
  const regions = ['RAI', 'SID', 'VXE', 'BVC', 'SNE', 'MMO', 'SFL'];
  const [budget, setBudget] = useState(0); // Estado para armazenar o valor do orçamento
  const [participantName, setParticipantName] = useState(''); // O valor inicial é uma string vazia
  const [participantsNames, setParticipantsNames] = useState([]);
  const [productSuppliers, setProductSuppliers] = useState([]);
  const [locations, setLocations] = useState();
  const [classesLocationsData, setClassesLocationsData] = useState([]);
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [value, setValue] = useState(0);
  const selectClass = (option) => { setSelectedClass(option); console.log(selectClass); }
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    // Aqui você pode realizar qualquer ação adicional com o idioma selecionado
    console.log("Idioma selecionado:", language);
  };

  const handleSupplierSelect = (language) => {
    setSelectedSupplier(language);
    // Aqui você pode realizar qualquer ação adicional com o idioma selecionado
    console.log("Supplier selecionado:", language);
  };

  const handleParticipantNameChange = (index, value) => {
    setParticipantsNames((prevNames) => {
      const newNames = [...prevNames];
      newNames[index] = value;
      return newNames;
    });
  };
  const handleBudgetChange = (e) => {
    setBudget(e.target.value); // Atualiza o estado quando o valor muda
  };

  const handleRegionChange = (region) => {
    if (destinations.includes(region)) {
      // Se a região já estiver no array de destinos, remova-a
      const updatedDestinations = destinations.filter((dest) => dest !== region);
      setDestinations(updatedDestinations);
    } else {
      // Se a região não estiver no array de destinos, adicione-a
      setDestinations([...destinations, region]);
    }
  };

  const getLanguageName = (code) => {
    switch (code) {
        case 'AF':
            return 'Afeganistão';
        case 'AL':
            return 'Albânia';
        case 'DZ':
            return 'Argélia';
        case 'AS':
            return 'Samoa Americana';
        case 'AD':
            return 'Andorra';
        case 'AO':
            return 'Angola';
        case 'AI':
            return 'Anguilla';
        case 'AQ':
            return 'Antártida';
        case 'AG':
            return 'Antígua e Barbuda';
        case 'AR':
            return 'Argentina';
        case 'AM':
            return 'Armênia';
        case 'AW':
            return 'Aruba';
        case 'AU':
            return 'Austrália';
        case 'AT':
            return 'Áustria';
        case 'AZ':
            return 'Azerbaijão';
        case 'BS':
            return 'Bahamas';
        case 'BH':
            return 'Bahrein';
        case 'BD':
            return 'Bangladesh';
        case 'BB':
            return 'Barbados';
        case 'BY':
            return 'Belarus';
        case 'BE':
            return 'Bélgica';
        case 'BZ':
            return 'Belize';
        case 'BJ':
            return 'Benin';
        case 'BM':
            return 'Bermudas';
        case 'BT':
            return 'Butão';
        case 'BO':
            return 'Bolívia';
        case 'BQ':
            return 'Bonaire, Santo Eustáquio e Saba';
        case 'BA':
            return 'Bósnia e Herzegovina';
        case 'BW':
            return 'Botsuana';
        case 'BV':
            return 'Ilha Bouvet';
        case 'BR':
            return 'Brasil';
        case 'IO':
            return 'Território Britânico do Oceano Índico';
        case 'BN':
            return 'Brunei Darussalam';
        case 'BG':
            return 'Bulgária';
        case 'BF':
            return 'Burkina Faso';
        case 'BI':
            return 'Burundi';
        case 'CV':
            return 'Cabo Verde';
        case 'KH':
            return 'Camboja';
        case 'CM':
            return 'Camarões';
        case 'CA':
            return 'Canadá';
        case 'KY':
            return 'Ilhas Cayman';
        case 'CF':
            return 'República Centro-Africana';
        case 'TD':
            return 'Chade';
        case 'CL':
            return 'Chile';
        case 'CN':
            return 'China';
        case 'CX':
            return 'Ilha Christmas';
        case 'CC':
            return 'Ilhas Cocos (Keeling)';
        case 'CO':
            return 'Colômbia';
        case 'KM':
            return 'Comores';
        case 'CG':
            return 'Congo';
        case 'CD':
            return 'República Democrática do Congo';
        case 'CK':
            return 'Ilhas Cook';
        case 'CR':
            return 'Costa Rica';
        case 'HR':
            return 'Croácia';
        case 'CU':
            return 'Cuba';
        case 'CW':
            return 'Curaçao';
        case 'CY':
            return 'Chipre';
        case 'CZ':
            return 'República Tcheca';
        case 'CI':
            return 'Costa do Marfim';
        case 'DK':
            return 'Dinamarca';
        case 'DJ':
            return 'Djibouti';
        case 'DM':
            return 'Dominica';
        case 'DO':
            return 'República Dominicana';
        case 'EC':
            return 'Equador';
        case 'EG':
            return 'Egito';
        case 'SV':
            return 'El Salvador';
        case 'GQ':
            return 'Guiné Equatorial';
        case 'ER':
            return 'Eritréia';
        case 'EE':
            return 'Estônia';
        case 'SZ':
            return 'Essuatíni';
        case 'ET':
            return 'Etiópia';
        case 'FK':
            return 'Ilhas Falkland (Malvinas)';
        case 'FO':
            return 'Ilhas Faroe';
        case 'FJ':
            return 'Fiji';
        case 'FI':
            return 'Finlândia';
        case 'FR':
            return 'França';
        case 'GF':
            return 'Guiana Francesa';
        case 'PF':
            return 'Polinésia Francesa';
        case 'TF':
            return 'Territórios Franceses do Sul';
        case 'GA':
            return 'Gabão';
        case 'GM':
            return 'Gâmbia';
        case 'GE':
            return 'Geórgia';
        case 'DE':
            return 'Alemanha';
        case 'GH':
            return 'Gana';
        case 'GI':
            return 'Gibraltar';
        case 'GR':
            return 'Grécia';
        case 'GL':
            return 'Groenlândia';
        case 'GD':
            return 'Granada';
        case 'GP':
            return 'Guadalupe';
        case 'GU':
            return 'Guam';
        case 'GT':
            return 'Guatemala';
        case 'GG':
            return 'Guernsey';
        case 'GN':
            return 'Guiné';
        case 'GW':
            return 'Guiné-Bissau';
        case 'GY':
            return 'Guiana';
        case 'HT':
            return 'Haiti';
        case 'HM':
            return 'Ilha Heard e Ilhas McDonald';
        case 'VA':
            return 'Santa Sé';
        case 'HN':
            return 'Honduras';
        case 'HK':
            return 'Hong Kong';
        case 'HU':
            return 'Hungria';
        case 'IS':
            return 'Islândia';
        case 'IN':
            return 'Índia';
        case 'ID':
            return 'Indonésia';
        case 'IR':
            return 'Irã';
        case 'IQ':
            return 'Iraque';
        case 'IE':
            return 'Irlanda';
        case 'IM':
            return 'Ilha de Man';
        case 'IL':
            return 'Israel';
        case 'IT':
            return 'Itália';
        case 'JM':
            return 'Jamaica';
        case 'JP':
            return 'Japão';
        case 'JE':
            return 'Jersey';
        case 'JO':
            return 'Jordânia';
        case 'KZ':
            return 'Cazaquistão';
        case 'KE':
            return 'Quênia';
        case 'KI':
            return 'Kiribati';
        case 'KP':
            return 'Coreia do Norte';
        case 'KR':
            return 'Coreia do Sul';
        case 'KW':
            return 'Kuwait';
        case 'KG':
            return 'Quirguistão';
        case 'LA':
            return 'Laos';
        case 'LV':
            return 'Letônia';
        case 'LB':
            return 'Líbano';
        case 'LS':
            return 'Lesoto';
        case 'LR':
            return 'Libéria';
        case 'LY':
            return 'Líbia';
        case 'LI':
            return 'Liechtenstein';
        case 'LT':
            return 'Lituânia';
        case 'LU':
            return 'Luxemburgo';
        case 'MO':
            return 'Macau';
        case 'MG':
            return 'Madagáscar';
        case 'MW':
            return 'Malaui';
        case 'MY':
            return 'Malásia';
        case 'MV':
            return 'Maldivas';
        case 'ML':
            return 'Mali';
        case 'MT':
            return 'Malta';
        case 'MH':
            return 'Ilhas Marshall';
        case 'MQ':
            return 'Martinica';
        case 'MR':
            return 'Mauritânia';
        case 'MU':
            return 'Maurício';
        case 'YT':
            return 'Mayotte';
        case 'MX':
            return 'México';
        case 'FM':
            return 'Micronésia';
        case 'MD':
            return 'Moldávia';
        case 'MC':
            return 'Mônaco';
        case 'MN':
            return 'Mongólia';
        case 'ME':
            return 'Montenegro';
        case 'MS':
            return 'Montserrat';
        case 'MA':
            return 'Marrocos';
        case 'MZ':
            return 'Moçambique';
        case 'MM':
            return 'Myanmar';
        case 'NA':
            return 'Namíbia';
        case 'NR':
            return 'Nauru';
        case 'NP':
            return 'Nepal';
        case 'NL':
            return 'Países Baixos';
        case 'NC':
            return 'Nova Caledônia';
        case 'NZ':
            return 'Nova Zelândia';
        case 'NI':
            return 'Nicarágua';
        case 'NE':
            return 'Níger';
        case 'NG':
            return 'Nigéria';
        case 'NU':
            return 'Niue';
        case 'NF':
            return 'Ilha Norfolk';
        case 'MK':
            return 'Macedônia do Norte';
        case 'MP':
            return 'Ilhas Marianas do Norte';
        case 'NO':
            return 'Noruega';
        case 'OM':
            return 'Omã';
        case 'PK':
            return 'Paquistão';
        case 'PW':
            return 'Palau';
        case 'PS':
            return 'Território da Palestina';
        case 'PA':
            return 'Panamá';
        case 'PG':
            return 'Papua Nova Guiné';
        case 'PY':
            return 'Paraguai';
        case 'PE':
            return 'Peru';
        case 'PH':
            return 'Filipinas';
        case 'PN':
            return 'Pitcairn';
        case 'PL':
            return 'Polônia';
        case 'PT':
            return 'Portugal';
        case 'PR':
            return 'Porto Rico';
        case 'QA':
            return 'Catar';
        case 'RE':
            return 'Reunião';
        case 'RO':
            return 'Romênia';
        case 'RU':
            return 'Rússia';
        case 'RW':
            return 'Ruanda';
        case 'BL':
            return 'Saint Barthélemy';
        case 'SH':
            return 'Santa Helena, Ascensão e Tristão da Cunha';
        case 'KN':
            return 'Saint Kitts e Nevis';
        case 'LC':
            return 'Santa Lúcia';
        case 'MF':
            return 'Saint Martin (parte francesa)';
        case 'PM':
            return 'Saint Pierre e Miquelon';
        case 'VC':
            return 'São Vicente e Granadinas';
        case 'WS':
            return 'Samoa';
        case 'SM':
            return 'San Marino';
        case 'ST':
            return 'São Tomé e Príncipe';
        case 'SA':
            return 'Arábia Saudita';
        case 'SN':
            return 'Senegal';
        case 'RS':
            return 'Sérvia';
        case 'SC':
            return 'Seychelles';
        case 'SL':
            return 'Serra Leoa';
        case 'SG':
            return 'Singapura';
        case 'SX':
            return 'Sint Maarten (parte holandesa)';
        case 'SK':
            return 'Eslováquia';
        case 'SI':
            return 'Eslovênia';
        case 'SB':
            return 'Ilhas Salomão';
        case 'SO':
            return 'Somália';
        case 'ZA':
            return 'África do Sul';
        case 'GS':
            return 'Ilhas Geórgia do Sul e Sandwich do Sul';
        case 'SS':
            return 'Sudão do Sul';
        case 'ES':
            return 'Espanha';
        case 'LK':
            return 'Sri Lanka';
        case 'SD':
            return 'Sudão';
        case 'SR':
            return 'Suriname';
        case 'SJ':
            return 'Svalbard e Jan Mayen';
        case 'SE':
            return 'Suécia';
        case 'CH':
            return 'Suíça';
        case 'SY':
            return 'Síria';
        case 'TW':
            return 'Taiwan';
        case 'TJ':
            return 'Tajiquistão';
        case 'TZ':
            return 'Tanzânia';
        case 'TH':
            return 'Tailândia';
        case 'TL':
            return 'Timor-Leste';
        case 'TG':
            return 'Togo';
        case 'TK':
            return 'Tokelau';
        case 'TO':
            return 'Tonga';
        case 'TT':
            return 'Trindade e Tobago';
        case 'TN':
            return 'Tunísia';
        case 'TR':
            return 'Turquia';
        case 'TM':
            return 'Turcomenistão';
        case 'TC':
            return 'Ilhas Turks e Caicos';
        case 'TV':
            return 'Tuvalu';
        case 'UG':
            return 'Uganda';
        case 'UA':
            return 'Ucrânia';
        case 'AE':
            return 'Emirados Árabes Unidos';
        case 'GB':
            return 'Reino Unido';
        case 'US':
            return 'Estados Unidos';
        case 'UM':
            return 'Ilhas Menores Distantes dos Estados Unidos';
        case 'UY':
            return 'Uruguai';
        case 'UZ':
            return 'Uzbequistão';
        case 'VU':
            return 'Vanuatu';
        case 'VE':
            return 'Venezuela';
        case 'VN':
            return 'Vietnã';
        case 'VG':
            return 'Ilhas Virgens Britânicas';
        case 'VI':
            return 'Ilhas Virgens Americanas';
        case 'WF':
            return 'Wallis e Futuna';
        case 'EH':
            return 'Saara Ocidental';
        case 'YE':
            return 'Iêmen';
        case 'ZM':
            return 'Zâmbia';
        case 'ZW':
            return 'Zimbábue';
        default:
            return '';
    }
};


  const initialParticipant = { nome: '', idade: '', nacionalidade: '' };
  const [newParticipant, setNewParticipant] = useState({
    nome: '',
    idade: '',
    nacionalidade: '',
  });



  const handleChildAgeChange = (index, age) => {
    const updatedAges = [...childrenAges];
    updatedAges[index] = age;
    setChildrenAges(updatedAges);
  };

  const handleChildNationalityChange = (index, nationality) => {
    const updatedNationalities = [...childrenNationalities];
    updatedNationalities[index] = nationality;
    setChildrenNationalities(updatedNationalities);
  };

  const fetchDataLocations = async () => {
    try {
      const response = await axios.get('/api_/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchDataSuppliers = async () => {
    try {
      const response = await axios.get('/api_/suppliers');
      setProductSuppliers(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const fetchClassesDataLocations = async () => {
    try {
      const response = await axios.get('/api_/classes/locations');
      setClassesLocationsData(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  
  const handleAddParticipant = (index) => {

    if (childrenAges[index] && childrenNationalities[index]) {
      const newParticipant = {
        name: participantsNames[index],
        age: parseInt(childrenAges[index], 10),
        nationality: childrenNationalities[index],
      };
      const updatedParticipants = [...participants];
      updatedParticipants.push(newParticipant);
      setParticipants(updatedParticipants);
  
      // Marcar o participante como adicionado
      const updatedParticipantAdded = [...participantAdded];
      updatedParticipantAdded[index] = true;
      setParticipantAdded(updatedParticipantAdded);
    }
    // Limpar o nome após adicionar o participante se necessário
    handleParticipantNameChange(index, '');
  };

  const handleClearParticipantNames = () => {
    const updatedParticipantsNames = new Array(participantsNames.length).fill('');
    setParticipantsNames(updatedParticipantsNames);
  };
  
  
  const handleAddAllParticipants = () => {
    const newParticipants = [];
  
    for (let index = 0; index < childrenAges.length; index++) {
      if (childrenAges[index] && childrenNationalities[index]) {
        const newParticipant = {
          name: participantsNames[index],
          age: parseInt(childrenAges[index], 10),
          nationality: childrenNationalities[index],
        };
        newParticipants.push(newParticipant);
      }
    }
  
    // Adicione todos os participantes de uma vez
    setParticipants([...participants, ...newParticipants]);
  
    // Marque todos os participantes como adicionados
    const updatedParticipantAdded = new Array(childrenAges.length).fill(true);
    setParticipantAdded(updatedParticipantAdded);
  
    // Limpe os nomes após adicionar os participantes se necessário
    handleClearParticipantNames();
  };
  
  const handleInclusionSelection = (inclusion) => {
    const inclusionTitle = inclusion.title;
  
    if (selectedInclusions.includes(inclusionTitle)) {
      setSelectedInclusions(selectedInclusions.filter((inc) => inc !== inclusionTitle));
    } else {
      setSelectedInclusions([...selectedInclusions, inclusionTitle]);
      console.log(selectedInclusions);
    }
  }

  // Função para lidar com a alteração de um campo de participante
  const handleFieldChange = (index, field, value) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value; // Atualiza o campo do participante
    setParticipants(newParticipants);
  };

  const handleLanguageChange = (event, newValue) => {
    setSelectedLanguage(newValue); // Store the selected language in the state variable
  };
  

  // ... (previously existing code)

  const languages = [
    { label: 'en'},
    { label: 'pt' },
    { label: 'fr'},
    { label: 'es'},
    { label: 'de'},
  ];
  
  


  // >>> Counters
  const [error, setError] = useState('');
  const [countAdultos, setCountAdultos] = useState(0);
  const [countCriancas, setCountCriancas] = useState(0);
  const [countInfantes, setCountInfantes] = useState(0);
  const [np, setNp] = useState(0);
  const childrenNames = []; // Um array vazio para armazenar os nomes das crianças // Um array vazio para armazenar as nacionalidades das crianças
  const nationalities = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
    'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon',
    'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia',
    'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
    'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece',
    'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
    'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South',
    'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
    'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
    'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay',
    'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
    'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
    'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
    'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
    'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen', 'Zambia', 'Zimbabwe'
  ];
  // Um array com opções de nacionalidades
  
  // Função para lidar com a mudança de nome da criança
  function handleChildNameChange(index, newName) {
    childrenNames[index] = newName;
  }
  
  // Função para lidar com a mudança de nacionalidade da criança


  // Function to generate options for select elements
  const generateOptions = (count) => {
    return Array.from({ length: count + 1 }, (_, index) => index).map((number) => ({
      value: number,
      label: `${number} anos`,
    }));
  };


  const handleIncrementCriancas = () => {
    setCountCriancas((prevCount) => prevCount + 1);
    setChildrenAges((prevAges) => [...prevAges, 0]);
  };

  const handleDecrementCriancas = () => {
    setCountCriancas((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
    setChildrenAges((prevAges) => prevAges.slice(0, -1));
  };

  const calculateDurationInDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMilliseconds = Math.abs(end - start);
    const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));

    return durationInDays;
  };

  const handleSubmit = () => {
   

    const duration = calculateDurationInDays(startDate, endDate)  +  1;
    const columns = [];
    handleAddAllParticipants() // Adicionar todos os participantes
    

    for (let i = 1; i <= duration; i++) {

      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i); 
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = daysOfWeek[currentDate.getDay()];
    
      const column = {
        id: i ,
        title: `Dia ${i}`,
        data: currentDate.toLocaleDateString(), // Mostrar apenas a data no formato local do navegador
        diaSeman: dayOfWeek,
        cards: [],
        notas: notas,
        hasNotes: hasNotes,
        breakfast: false,
        lunch: false,
        dinner:false
      };
      columns.push(column);
      
    }
    console.log (participants);
    const firstParticipant = participants.length > 0 ? participants[0] : null;

    // Create a JSON object with the form values
    const id = 1;
    const formData = {
      startDate,
      endDate,
      columns,
      mainLanguage: selectedLanguage.label,
      duration,
      titulo,
      status,
      participants,
      destinations,
      participantsAge : childrenAges,
      budget,
      sp: "",
      ep: "",
      leadTravellar: firstParticipant.name,
      lingua: selectedLanguage,
      supplier: selectedSupplier

    };
    // Store the JSON object in local storage
    localStorage.setItem('formData', JSON.stringify(formData));
    //console.log(selectedInclusions);
    window.location.href = '/salesboard';

    // Reset the form fields
    //setStartDate('');
    //setEndDate('');

  };

  const handleStartDateChange = (event) => {
  const newStartDate = event.target.value;
  setStartDate(newStartDate);

  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);

    // Check if the end date is earlier than the start date
    if (startDate > newEndDate) {
      setError('End date cannot be earlier than start date');
    } else {
      setError('');
    }
  };

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleOpenMealModal = () => {
    setIsMealModalOpen(true);

  };

  const handleCloseMealModal = () => {
    setIsMealModalOpen(false);
  };

  const handleSalesboardButton = () => { 
    
    //window.location.href = '/salesboard';
};
const maxVisibleAge = 98; 
const checkPrice = () => {




};
  
    return (
          
        <Box m="20px" textAlign="center">
        <Header title="CREATE A NEW PACKAGE 📦" subtitle="Specifie the all the Relevant Package Information " />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <div className="container" style={{ maxWidth: "800px", width: "100%" }}>
            <div className="row">
              <div className="col-md-6">
              <div className="card-body d-flex align-items-center justify-content-center">
                        <form onSubmit={handleSubmit}>
                  <br/>
                    <h2 className="text-center">Give your package a short, but Descriptive Title.</h2>
                    <h4 className="text-center" style={{ color: 'gray' }}>Give a name that suits the package better; A name that matches the choosen products.</h4>
                    <br/>
                        <div className="mb-3" >
                            <FormLabel>Title:</FormLabel>
                            <TextField
                              placeholder="Package Title"
                              fullWidth
                              value={titulo}
                              onChange={handleTituloChange}
                            />
                          </div>
                          <br/>
                              <h2 className="text-center">Language Selection for Final Presentation.</h2>
                              <h4 className="text-center" style={{ color: 'gray' }}>Select the language to be displayed in the proposal presentation Pages.</h4>
                              <br/>
                              <List  style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                  {['PT', 'US', 'FR', 'ES', 'DE'].map((language) => (
                                    <ListItem 
                                      key={language} 
                                      button 
                                      onClick={() => handleLanguageSelect(language)} 
                                      selected={selectedLanguage === language}
                                    >
                                      {selectedLanguage === language && (
                                        <Badge 
                                          //sx={{marginLeft: "100px"}}
                                          color="primary" 
                                          variant="dot" 
                                          overlap="circle" 
                                          anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                          }}
                                        />
                                      )}
                                      <ListItemText>
                                      <Flag country={language.toUpperCase()} /> {getLanguageName(language)}
                                      </ListItemText>
                                    </ListItem>
                                  ))}
                                </List>
                                                              <br/>
                                    <br/>
                                    <h2 className="text-center">Client's Budget.</h2>
                                    <h4 className="text-center" style={{ color: 'gray' }}>What is the maximum and total budget the customer is willing to spend on this package?</h4>
                                    <br/>
                                    <TextField
                                        type="number"
                                        label="Budget"
                                        variant="outlined"
                                        value={budget}
                                        onChange={handleBudgetChange}
                                        inputProps={{ step: 100 }} // Passo de incremento (opcional)
                                      />
                                <br/>
                                <br/>
                              <h2 className="text-center">Customer Details</h2>
                              <h4 className="text-center" style={{ color: 'gray' }}>Fill in the details of each traveller</h4>
                          <br/>
                          <form onSubmit={handleSubmit}>
                                    {/* ... (previously existing code) */}

                          <br/>
                          <div className="mb-3" style={{marginLeft:"310px"}}>
                            <FormLabel style={{marginRight:"300px"}}>Number of Participants:</FormLabel>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Button variant="outlined" onClick={handleDecrementCriancas} className="mr-1" sx={{border:"none"}}>
                                <RemoveIcon />
                              </Button>
                              <TextField
                                type="number"
                                value={countCriancas}
                                InputProps={{
                                  inputProps: {
                                    min: 0,
                                  },
                                }}
                                style={{ width: '50px', textAlign: 'center' }}
                                readOnly
                              />
                              <Button variant="outlined" onClick={handleIncrementCriancas} className="ml-1" sx={{border:"none"}}>
                                <AddIcon />
                              </Button>
                            </div>
                          </div>
                          <br/>
                          {countCriancas > 0 && (
                            <Box sx={{maxHeight:'310px', overflowY:'auto'}}>
                              {childrenAges.map((age, index) => (
                                <Card
                                key={index}
                                style={{
                                  width: '95%',
                                  margin: '8px',
                                  padding: '8px',
                                  backgroundColor: 'lightgray',
                                  borderRadius: '8px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <div style={{ width: '5%' }}>
                                  <PersonIcon />
                                </div>
                                <div style={{ width: '30%' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label={`Participant ${index + 1}`}
                                    value={participantsNames[index]}
                                    onChange={(e) => handleParticipantNameChange(index, e.target.value)}
                                  />
                                </div>
                                <div style={{ width: '30%' }}>
                                  <FormControl fullWidth variant="outlined">
                                    <InputLabel>Idade</InputLabel>
                                    <Select
                                      value={age}
                                      onChange={(e) => handleChildAgeChange(index, e.target.value)}
                                      label="Idade"
                                      MenuProps={{
                                        PaperProps: {
                                          style: {
                                            maxHeight: 200, // Adjust the max height as needed
                                          },
                                        },
                                      }}
                                    >
                                      {generateOptions(maxVisibleAge).map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </div>
                                <div style={{ width: '30%' }}>
                                <FormControl fullWidth variant="outlined">
                                  <InputLabel>Nacionalidade</InputLabel>
                                      <Select
                                       MenuProps={{
                                        PaperProps: {
                                          style: {
                                            maxHeight: 200, // Adjust the max height as needed
                                          },
                                        },
                                      }}
                                        value={childrenNationalities[index] || ''}
                                            onChange={(e) =>
                                              handleChildNationalityChange(index, e.target.value)
                                            }
                                            label="Nacionalidade"
                                          >
                                            {nationalities.map((nationality) => (
                                              <MenuItem key={nationality} value={nationality}>
                                                {nationality}
                                              </MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
                                    </div>
                              </Card>
                              ))}
                            </Box>
                          )}
                      {/* ... (previously existing code) */}
                    </form>
                    <br/>
                              <h2 className="text-center">Select Prospect Source.</h2>
                              <h4 className="text-center" style={{ color: 'gray' }}>Which platform/company or reseller did this potential customer come from?</h4>
                              <br/>
                              <List style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {productSuppliers.map((language) => (
                                  <ListItem
                                    key={language.name}
                                    button
                                    onClick={() => handleSupplierSelect(language)}
                                    style={{
                                      backgroundColor: selectedSupplier === language.name ? '#f0f0f0' : 'transparent',
                                    }}
                                  >
                                    <ListItemText>
                                      <SellIcon /> {language.name}
                                    </ListItemText>
                                  </ListItem>
                                ))}
                              </List>
                                                              <br/>
                    <h2 className="text-center">Destinations that customers would like to visit.</h2>
                    <h4 className="text-center" style={{ color: 'gray' }}>Please ensure to select all the destinations requested by the traveler, as you will only be able to include services available within the selected locations.</h4>
                    <br/>
                    {classesLocationsData.length > 0 && (
  <Box
    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
  >

    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      sx={{ borderRight: 1, borderColor: 'divider', marginTop: 8 }}
    >
      {classesLocationsData.map((option, index) => (
        option.title && (
          <Tab
            key={index}
            label={option.title}
            {...a11yProps(index)}
            onClick={() => selectClass(option.title)}
          />
        )
      ))}
    </Tabs>

    {classesLocationsData.map((option, index) => (
      option.title && (
        <TabPanel value={value} index={index} key={index}>
          <br/>
          <Box sx={{maxHeight: "250px", overflow: "auto"}}>
            {locations && locations.map((item) => {
              if (item.type === option.title) {
                return (
                  <label key={item._id} style={{ display: 'block' }}>
                    <input
                      type="checkbox"
                      checked={selectedInclusions.includes(item.title)}
                      onChange={() => handleInclusionSelection(item)}
                    />
                    {item.title}
                  </label>
                );
              }
              return null;
            })}
          </Box>
          <br />
        </TabPanel>
      )
    ))}
                  
  </Box>
)}

                      <br/>
                      <br/>
                    <h2 className="text-center">Selection of the travel date</h2>
                    <br/>
                    <div>
                      <div className="mb-3">
                        <FormLabel>Start Date:</FormLabel>
                        <TextField
                          type="date"
                          fullWidth
                          value={startDate}
                          onChange={handleStartDateChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <FormLabel>End Date:</FormLabel>
                        <TextField
                          type="date"
                          fullWidth
                          value={endDate}
                          onChange={handleEndDateChange}
                          required
                        />
                      </div>
                      <br/>
                      {error && <Alert fullWidth  variant="filled" sx={{width:800}} severity="error">
                             End Date has to be bigger than Start Date!
                      </Alert>}
                    </div>
                      <br/>
                        <div className="d-flex justify-content-between">
                          <Link to="/presentprodutos">
                            <Button style={{marginRight:"10px"}} variant="contained" color="primary">Cancell</Button>
                            </Link>
                            <Button variant="contained" onClick={handleSubmit} color="secondary" >
                              Confirm
                            </Button>
                          </div>
                        </form>
                    </div>
                  <br />
              </div>
            </div>
          </div>
        </Box>
    </Box>


  );
};

export default Dashboard;

