
import React, { useState, useEffect } from "react";
import { Box, Button, Switch,  Card,
  CardContent, FormControlLabel, Checkbox, Divider, 
  // ... (outros imports)
} from "@mui/material";
import axios from 'axios';
import FooterImage from "./files/photos/footer.png";
import HeaderImage from "./files/photos/header.png"; // Importe a imagem do cabeçalho aqui
import LogoImage from "./files/photos/logo.png";
import BannerImage from "./files/photos/banner.png";
import SideBannerImage from "./files/photos/sideBanner.png";
import CoverInfoImage from "./files/photos/cover_info_page.png";
import CoverGreetImage from "./files/photos/cover_greet_page.png";
import RemoveIconImage from "./files/photos/rii.png";
import CheckIconImage from "./files/photos/cii.png";
import CoverImage from "./files/photos/cover.jpg";
import TotalHotelImage from "./files/photos/hotel_img.jpg";
import TotalMealImage from "./files/photos/meal_img.jpg";
import BackgroundImage from "./files/photos/background.jpg";
import CoverGIImage from "./files/photos/cover_ad.jpg";
import CoverGIImage2 from "./files/photos/cover_ad_2.jpeg";
import CoverGeneralInformation from "./files/photos/bg_general_info.jpg";
import AccomodationCover from "./files/photos/Acomodation.jpg";
import ShortItineraryBg from "./files/photos/short_bg.jpg";
import AllBg from "./files/photos/bg_all.jpg";
import TransferIcon from "./files/photos/tranfer_icon.jpg";
import MealsBg from "./files/photos/meals_bg_v2.jpg";
import FormImage from "./files/photos/form.png";
import FooterLogoImage from "./files/photos/book.png";
import SmallBannerImage from "./files/photos/smallBanner.png";
import HotelIconImage from "./files/photos/hotel_icon.png";
import AcIconImage from "./files/photos/ac_icon.png";
import MlIconImage from "./files/photos/meal_icon.png";
import BusIconImage from "./files/photos/bus_ic.png";
import LineImage from "./files/photos/line.png";
import FormGridImage from "./files/photos/grid.png";
import { Font, pdf, Page, Text, Document, StyleSheet, Image, View } from "@react-pdf/renderer";
import MyCustomFont from './files/fonts/Amatic-Bold.ttf'; // Certifique-se de que a fonte está corretamente importada
import CalibriFont from './files/fonts/Calibri-Regular.ttf'; // Certifique-se de que a fonte está corretamente importada
import AppsIcon from '@mui/icons-material/Apps';
import ArticleIcon from '@mui/icons-material/Article';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import Fab from '@mui/material/Fab';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from "@mui/icons-material/Add";
import Typography from '@mui/material/Typography';
import Header from "../../components/Header";


Font.register({
  family: 'Calibri',
  src: CalibriFont,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  titleOf: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "AntonFamily",
  },
  textOnFormImage: {
    position: "absolute",
    fontSize: 14,
    color: "black", // Ajuste a cor do texto conforme necessário
    fontStyle:CalibriFont,
    
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Calibri",
   
  },
  image: {
    marginVertical: 15,
    marginHorizontal: -2,
    marginRight: 20,
    height:100,
    width:100,
  },
  formImageContainer: {
    marginVertical: 15,
    marginHorizontal: -2,
    marginRight: 50,
    height: 400,
    width: "90%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  
  shortItineraryDayContainer: {
    marginTop: -20, // Ajuste o valor para diminuir o espaço vertical entre os dias
  },
  formImage: {
    width: "90%",
    height: "30%",
  },
  banner: {
    marginVertical: 15,
    marginHorizontal: -2,
    marginRight: 50,
    height:300,
    width:"8%",
  },
  
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "AntonFamily",
    
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "black",
    fontStyle: CalibriFont,
  },
  footerImage: {
    position: "absolute",
    bottom: 0, // Ajuste a posição vertical do footer aqui
    left: 0,
    right: 0,
    height: "50px",
    alignSelf: "center",
  },
  headerImage: {
    position: "absolute",
    top: 0, // Ajuste a posição vertical do header aqui
    left: 0,
    right: 0,
    height: "50px",
    alignSelf: "center",
  },
  logo: {
    height: "50px",
    alignSelf: "center", // Espaçamento entre o logo e o conteúdo abaixo
    top: 30,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Calibri",
    marginTop: 8, // Espaçamento entre o título e o conteúdo abaixo
  },
    // Resto dos estilos aqui...
    footerLogo: {
      position: "absolute",
      bottom: "0%", // Ajuste a posição vertical do logo do footer aqui
      left: "10%", // Ajuste a posição horizontal do logo do footer aqui
      width: "30%", // Ajuste a largura do logo do footer aqui
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    coverImage: {
      width: "99%",
      height: "auto",
    },
    backgroundImageContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
      opacity: 3, // Ajuste a opacidade conforme necessário
    },
    hotelContainer: {
      flexDirection: "row", // Isso coloca os elementos do hotel e dos quartos na mesma linha
      marginBottom: 20, // Espaço entre cada hotel
      pageBreakInside: "avoid", // Impede que os hotéis quebrem entre páginas
    },
    hotelInfo: {
      marginRight: 20, // Espaço à direita para separar os hotéis
      width: "50%", // Cada hotel ocupa metade da largura da página
    },
    hotelTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5,
    },
    hotelImage: {
      width: "100%", // A imagem do hotel ocupa toda a largura do espaço do hotel
      height: "auto", // A altura se ajusta automaticamente
    },
    hotelDescription: {
      fontSize: 12,
    },
    roomSection: {
      flexDirection: "row", // Exibe quartos na mesma linha (horizontalmente)
      flexWrap: "wrap", // Permite quebra para a próxima linha quando não couberem mais quartos
      justifyContent: "flex-start", // Alinha os quartos à esquerda
    },
    room: {
      width: "30%", // Largura dos quartos para caber até 3 quartos por linha (ajuste conforme necessário)
      marginRight: "3%", // Espaço entre os quartos (ajuste conforme necessário)
      marginBottom: 10, // Espaço entre as linhas de quartos
    },
    roomImage: {
      width: "100%", // A imagem do quarto ocupa toda a largura do espaço do quarto // A altura se ajusta automaticamente
      borderColor: 'white', borderWidth: 5,
      height: 100,
    },
    roomTitle: {
      fontSize: 14,
      fontWeight: "bold",
    },
    inclusionsContainer: {
      marginTop: '20px',  // Espaço entre as inclusões e os quartos
      display: 'flex',
      flexWrap: 'wrap',
    },
    inclusion: {
      width: '25%',  // Cada inclusão ocupa 25% da largura do contêiner
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      margin: '5px',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
    },
    contentContainer: {
      padding: 20,
    },
    policyItem: {
      marginBottom: 10,
      fontSize: 12,
    },
    
});


const hotelsData = [
  {
    title: "Hotel A",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/95/07/limak-eurasia-luxury.jpg?w=700&h=-1&s=1",
    description: "A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado na produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais",
    rooms: [
      { title: "Quarto Deluxe", image: "https://www.europahotelbelfast.com/wp-content/uploads/2021/10/DSC_7769-Edit-1-1366x768-fp_mm-fpoff_0_0.png" },
      { title: "Suíte Executiva", image: "image.jpg" },
      { title: "Suíte Single", image: "data:image/jpeg;base64,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" },
    ],
  },
  {
    title: "Hotel B",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/95/07/limak-eurasia-luxury.jpg?w=700&h=-1&s=1",
    description: "A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado na produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais",
    rooms: [
      { title: "Quarto Standard", image: "image.jpg" },
      { title: "Suíte de Luxo", image: "image.jpg" },
    ],
  },
  
 
];


const mealsPerDays = [
  {
    title: "Day 1",
    breakfast: true,
    lunch: false,
    dinner: true,
  },
  {
    title: "Day 2",
    breakfast: false,
    lunch: true,
    dinner: false,
  },

];



const ShortItineraryPage = ({ days }) => (
  <Page size="A4">
    <Image style={styles.headerImage} src={HeaderImage} />
    <Image style={styles.footerImage} src={FooterImage} />
    <Image style={styles.logo} src={LogoImage} />
    <Image style={styles.footerLogo} src={FooterLogoImage} />
    {days.map((day, dayIndex) => (
      <View key={dayIndex} style={styles.shortItineraryDay}>
        <Text style={styles.title}>{day.dayTitle}</Text>
        <View style={styles.shortItineraryTasks}>
          {day.dayTasks.map((task, index) => (
            <Text key={index} style={styles.text}>
              {task}
            </Text>
          ))}
        </View>
      </View>
    ))}
  </Page>
);

function formatInclusions(inclusions) {
  const MAX_INCLUSIONS_PER_LINE = 4;
  const inclusionGroups = [];

  for (let i = 0; i < inclusions.length; i += MAX_INCLUSIONS_PER_LINE) {
    const group = inclusions.slice(i, i + MAX_INCLUSIONS_PER_LINE);
    inclusionGroups.push(group);
  }

  return inclusionGroups.map((group, index) => (
    <div key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
      {group.map((inclusion, inclusionIndex) => (
        <div key={inclusionIndex} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Image style={{ width: 20, height: 20, marginTop: 5 }} src={CheckIconImage} />
          <Text style={{ ...styles.text, marginLeft: 5, fontSize: 12 }}>
           {`${inclusion}                             `}      
          </Text>
        </div>
      ))}
      {/* Adicione espaços em branco extras, se necessário, para manter quatro por linha */}
      {group.length < MAX_INCLUSIONS_PER_LINE && <div style={{ width: '20px' }}></div>}
    </div>
  ));
}






const CoverPage = () => {
  return (
    <Page size="A4" style={styles.container}>
       <Image style={{...styles.logo, top:-180, width: 290, height:120}} src={LogoImage} />
      <Image style={{...styles.coverImage, top: -50}} src={CoverImage} />
      <Text style={{...styles.pageNumber, fontSize: 15}}>www.bucountrytours.com</Text>
      {/*<Text
        style={{
          fontSize: 36,
          fontFamily: "AntonFamily",
          marginTop: 50,
          color: "#333",
        }}
      >
        Your Document Title
      </Text>/*/}
    </Page>
  );
};

Font.register({ family: "AntonFamily", src: MyCustomFont });




const CardPage = ({ dayTitle, card, day, mainLanguage }) => {
  
  let transfers = [];

  const getLanguageInfo = () => {
    const selectedLanguage = card.languages.find(lang => lang.language === mainLanguage) || {};
    console.log(selectedLanguage.title, selectedLanguage.longDescription);
    return selectedLanguage;
  };

  const object = getLanguageInfo();

  return (
    <Page size="A4">
            <View style={styles.backgroundImageContainer}>
              <Image src={AccomodationCover} style={styles.backgroundImage} />
            </View>

            <Text style={{ ...styles.title, top: 25, fontSize: 25, color: "green", marginRight: 510, fontWeight: "bold" }}>{dayTitle}</Text>
            <Text style={{ ...styles.title, top: -11, fontSize: 20,  marginRight: 270, fontWeight: "bold" }}>{`${card.name}`}</Text>




      <Text style={{ ...styles.text, fontSize: 12, top: 30, width: 550, left: 2 }}>{card.description}</Text>

      {/* Inclusions */}
      <View style={{ flexDirection: 'row', alignItems: 'center', top: 90, left: 17, marginBottom: '20px' }}>
        <Image style={{ width: 20, height: 20 }} src={CheckIconImage} />
        <Text style={{ ...styles.text, marginLeft: 5, fontSize: 12 }}>
          Inclusions  | {card.inclusions.join(', ')}
        </Text>
      </View>

      {/* Exclusions */}
      <View style={{ flexDirection: 'row', alignItems: 'center', top: 70, left: 17, marginBottom: '20px' }}>
        <Image style={{ width: 20, height: 20 }} src={RemoveIconImage} />
        <Text style={{ ...styles.text, marginLeft: 5, fontSize: 12 }}>
          Exclusions  | {card.exclusions.join(', ')}
        </Text>
      </View>

      {day.cards.map((card, cardIndex) => {
        if (card.tf === 1) {
          transfers.push(card.name);
        }
      })}

{transfers.length > 0 && (
  <View style={{ flexDirection: 'row', alignItems: 'center', top: 70, left: 40, marginBottom: 20 }}>
    <Image style={{ width: 25, height: 25 }} src={BusIconImage} />
    <Text style={{ ...styles.text, marginLeft: 2, fontSize: 12 }}>
      Transfers | {transfers.join(', ')}
    </Text>
  </View>
)}

    </Page>
  );
};








const GeneralInfoPage = ({ formData }) => {
  const tourTitle = formData.titulo;
  const leadTravellar = formData.leadTravellar;
  const startDate = formData.startDate;
  const endDate = formData.endDate;
  const duration = formData.duration;
  const start = formData.sp;
  const finish = formData.ep;
  const numberParticipants = formData.participants.length;
  const generalTranslations = formData.languages;
  const mainLanguage = formData.mainLanguage; // Pode ser alterado conforme necessário

  const languages = [
    { language: 'pt', text_lead_traveller: 'NOME DO VIAJANTE PRINCIPAL:', text_number_travellers: 'Nº DE VIAJANTES:', text_start_date: 'DATA DE INÍCIO:', text_end_date: 'DATA DE TÉRMINO:', text_duration: 'DURAÇÃO TOTAL:', text_start_in: 'INÍCIO EM:', text_end_in: 'TÉRMINO EM:' },
    { language: 'en', text_lead_traveller: 'LEAD TRAVELLER NAME:', text_number_travellers: 'No. OF TRAVELLERS:', text_start_date: 'START DATE:', text_end_date: 'END DATE:', text_duration: 'TOTAL DURATION:', text_start_in: 'STARTS IN:', text_end_in: 'ENDS IN:' },
    { language: 'es', text_lead_traveller: 'NOMBRE DEL VIAJERO PRINCIPAL:', text_number_travellers: 'Nº DE VIAJEROS:', text_start_date: 'FECHA DE INICIO:', text_end_date: 'FECHA DE FIN:', text_duration: 'DURACIÓN TOTAL:', text_start_in: 'COMIENZA EN:', text_end_in: 'TERMINA EN:' },
    { language: 'de', text_lead_traveller: 'NAME DES HAUPTREISENDEN:', text_number_travellers: 'ANZAHL DER REISENDEN:', text_start_date: 'STARTDATUM:', text_end_date: 'ENDDATUM:', text_duration: 'GESAMTDUER:', text_start_in: 'BEGINNT IN:', text_end_in: 'ENDET IN:' },
    { language: 'fr', text_lead_traveller: 'NOM DU VOYAGEUR PRINCIPAL :', text_number_travellers: 'NOMBRE DE VOYAGEURS :', text_start_date: 'DATE DE DÉBUT :', text_end_date: 'DATE DE FIN :', text_duration: 'DURÉE TOTALE :', text_start_in: 'COMMENCE DANS :', text_end_in: 'SE TERMINE DANS :' }
  ];

  const getTranslation = (key) => {
    const translation = languages.find((lang) => lang.language === mainLanguage);
    return translation[key] || key; // Retorna a tradução ou a chave original se não houver tradução
  };

  return (
    <Page size="A4" style={styles.container}>
      {/* Restante do código ... */}
      <View style={styles.backgroundImageContainer}>
        <Image src={CoverGeneralInformation} style={styles.backgroundImage} />
      </View>

      {/* Exemplo de como usar a função getTranslation para obter as traduções */}
      <Text style={{ ...styles.textOnFormImage, top: 175, left: 80 }}>
        {getTranslation('text_lead_traveller')}                              {leadTravellar}
      </Text>
      <Text style={{ ...styles.textOnFormImage, top: 210, left: 80 }}>
        {getTranslation('text_number_travellers')}                           {numberParticipants}
      </Text>
      <Text style={{ ...styles.textOnFormImage, top: 247, left: 80 }}>
        {getTranslation('text_start_date')}                                  {startDate}
      </Text>
      <Text style={{ ...styles.textOnFormImage, top: 282, left: 80 }}>
        {getTranslation('text_end_date')}                                     {endDate}
      </Text>
      <Text style={{ ...styles.textOnFormImage, top: 318, left: 80 }}>
        {getTranslation('text_duration')}                                    {duration} days
      </Text>
      <Text style={{ ...styles.textOnFormImage, top: 355, left: 80 }}>
        {getTranslation('text_start_in')}                                     {start}
      </Text>
      <Text style={{ ...styles.textOnFormImage, top: 387, left: 80 }}>
        {getTranslation('text_end_in')}                                      {finish}
      </Text>
    </Page>
  );
};


const InfoPage = () => {
  return (
    <Page size="A4" style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image src={CoverInfoImage} style={styles.backgroundImage} />
      </View>
    </Page>
  );
};

const GreetPage = () => {
  return (
    <Page size="A4" style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image src={CoverGreetImage} style={styles.backgroundImage} />
      </View>
    </Page>
  );
};

;  
const PDFFile = ({ formData, listRooms, generalInfoExpanded, shortItineraryExpanded, longItineraryExpanded, cancellationPolicies })  => {
    const MAX_TASKS_PER_PAGE = 8; // Adjust this value based on the available space
    const inclusionsData = [
      "Wi-Fi gratuito",
      "Estacionamento gratuito",
      "Café da manhã continental",
      "Acesso à piscina",
      "Serviço de limpeza diário",
      "Academia 24 horas",
      "Check-out tardio disponível",
      "Serviço de quarto 24 horas",
    ];
    const uniqueInclusions = new Set();
    function getRandomStartTime() {
      const minHour = 18; // Hora de início mínima
      const maxHour = 22; // Hora de início máxima
      const startHour = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour; // Gera uma hora aleatória entre minHour e maxHour
      const startMinute = Math.floor(Math.random() * 60); // Gera minutos aleatórios entre 0 e 59
      return `${startHour}:${startMinute < 10 ? '0' : ''}${startMinute}`; // Formata o horário como "HH:mm"
    }
    let currentPageTasks = [];
    let daysToRender = [];
    formData.dropZones.forEach((day) => {
      day.cards.forEach((card) => {
        currentPageTasks.push(card.name);
        if (currentPageTasks.length >= MAX_TASKS_PER_PAGE) {
          daysToRender.push({
            dayTitle: day.title,
            dayTasks: currentPageTasks,
          });
          currentPageTasks = [];
        }
      });
    });
  
    if (currentPageTasks.length > 0) {
      daysToRender.push({
        dayTitle: formData.dropZones[0].title, // You might need to adjust this
        dayTasks: currentPageTasks,
      });
    }
    return (
      <Document>
        <CoverPage/>
  
  
        {generalInfoExpanded && (
          <GeneralInfoPage formData={formData} />
        )}
        
        {shortItineraryExpanded && (
          <Page size="A4">
               <View style={styles.backgroundImageContainer}>
                  <Image src={ShortItineraryBg} style={styles.backgroundImage} />
              </View>
       
            
            
            <View style={styles.shortItineraryDayContainer}>
              {formData.dropZones.map((day, dayIndex) => (
                <View key={`day-${dayIndex}`} style={styles.shortItineraryDay}>
                  <Text style={{ ...styles.title, top: 130, marginRight: '500px', left: 18, marginBottom: '5px', fontSize: 11 }}>{`${day.title}      ${day.data} `}</Text>
                  <View style={styles.shortItineraryTasks}>
                    {day.cards.map((card, cardIndex) => (
                      <View key={`card-${dayIndex}-${cardIndex}`} style={styles.shortItineraryActivity}>
                        <Text style={{ ...styles.text, top: 100, marginRight: '420px', left: 115, marginBottom: '5px', width:400, fontSize: 11}}>{`${getRandomStartTime()}                ${card.name} `}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </Page>
    )}
        
        {longItineraryExpanded && (

          

          formData.dropZones.map((day, dayIndex) => (
            day.cards.map((card, cardIndex) => {
              if (card.ex === 1) {
                return (
                  <CardPage
                    key={`${dayIndex}-${cardIndex}`}
                    dayTitle={day.title}
                    card={card}
                    day={day}
                    mainLanguage={formData.mainLanguage}
                  />
                );
              }
              return null;
            })
          ))
        )}

        

            <Page size="A4">
               <View style={styles.backgroundImageContainer}>
                  <Image src={MealsBg} style={styles.backgroundImage} />
              </View>
              <View style={styles.shortItineraryDayContainer}>
              <View style={{...styles.shortItineraryDay, top: 330, left: 163}}>
                {formData.dropZones.map((day, dayIndex) => (
               <View key={`day-${dayIndex}`} style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'black', paddingBottom: 5, width: 530, right: 137 }}>
               <Text style={{ ...styles.title, marginLeft:'10px', marginRight:'50px' }}>
                 {day.title}
               </Text>
               <Image style={{ width: 20, height: 20, marginLeft: '5px', marginRight:'100px' }} src={day.breakfast ? CheckIconImage : RemoveIconImage} />
               <Image style={{ width: 20, height: 20, marginLeft: '5px', marginRight:'100px' }} src={day.lunch ? CheckIconImage : RemoveIconImage} />
               <Image style={{ width: 20, height: 20, marginLeft: '5px', marginRight:'100px' }} src={day.dinner ? CheckIconImage : RemoveIconImage} />
             </View>
             
                ))}
              </View>
            </View>             
          </Page>

  <Page size="A4">
  <View style={styles.backgroundImageContainer}>
    <Image source={AccomodationCover} style={styles.backgroundImage} />
  </View>
  {formData.dropZones.map((day, dayIndex) => (
  <View key={`day-${dayIndex}`}>
    {day.cards
      .filter(hotel => hotel.ac === 1)
      .map((hotel, index) => (
        <View key={`hotel-${index}`} style={{ ...styles.hotelContainer, top: -20, right: 50 }}>
          <View style={styles.hotelInfo}>
            <Text style={{ ...styles.hotelTitle, top: 25, left: 310, color: 'black' }}>{hotel.name}</Text>
            <Image source={hotel.image} style={{ ...styles.hotelImage, left: 40, width: 700, height: 200, top: 25 }} />
            <Text style={{ ...styles.hotelDescription, top: 40, left: 70, width: 550 }}>{hotel.description}</Text>
            <View style={{ ...styles.roomSection, top: 50, right: 120, width: 1000}}>
              <View style={{left:230, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', top: 4, right: 40}}>
              <Image style={{ width: 15, height: 15 }} src={CheckIconImage} />
              <Text style={{ ...styles.text, marginLeft: 5, fontSize: 12, width: 500 }}>
                Inclusions  | {hotel.inclusions.join(', ')}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', top: 10, right: 40}}>
              <Image style={{ width: 15, height: 15 }} src={RemoveIconImage} />
              <Text style={{ ...styles.text, marginLeft: 5, fontSize: 12,  width: 500 }}>
                Exclusions  | {hotel.inclusions.join(', ')}
              </Text>
            </View>

              </View>
            </View>
            
          </View>
          <br />
          <View style={{ ...styles.roomSection, top: 80, right: 70 }}>
            {listRooms.map((listRoom, roomIndex) => {
              if (hotel.id === listRoom.id) {
                const uniqueRoomTitles = new Set();

                return (
                  <View key={`room-${roomIndex}`} style={{ flexDirection: 'row', right: 0, top: 100, marginBottom: '10px' }}>
                    {listRoom.rooms.map((room, roomIndex) => {
                      // Check if the room title is already present in the set
                      if (!uniqueRoomTitles.has(room.title)) {
                        // If not, add it to the set and render the room
                        uniqueRoomTitles.add(room.title);

                        return (
                          <View key={`room-${roomIndex}`} style={styles.imageContainer}>
                            <Image style={{ ...styles.image, borderRadius: 10 }} source={room.image} />
                            <Text style={{ ...styles.roomTitle, fontSize: 11, marginLeft: 10, marginTop: 5 }}>{room.title}</Text>
                          </View>
                        );
                      }
                      return null; // If the title is already in the set, don't render anything
                    })}
                  </View>
                );
              }
              return null; // If the ID doesn't match, don't render anything
            })}
          </View>



          <br />
        </View>
      ))}
  </View>
  
))}

</Page>





<Page size="A4">
      <View style={styles.backgroundImageContainer}>
        <Image src={AllBg} style={styles.backgroundImage} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', top: 80, left: 40, marginBottom: '3px' }}>
      <Text style={{...styles.title, left: 20,  marginBottom:'10px'}}>WHAT'S INCLUDED ?</Text>
      <Image style={{ width: 150, height: 80, right: 128, marginTop:'10px'}} src={LineImage} />
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}></View>
      </View>
      <View style={{ top: 50, left: 13, marginBottom: '2px', flexDirection: 'column' }}>
  {/* Conjunto global para rastrear inclusions únicas */}
  <View style={{ flexDirection: 'column', top: 10, left: 63}}>
  {formData.dropZones.length > 0 && (
    <View >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        
        {/* Add the following Text component for "Accommodation" */}
        <Image style={{ width: 15, height: 15, marginRight: '5px' }} src={CheckIconImage} />
        <Text style={{ fontSize: 12 }}>Accommodation :  </Text>
        
        <Text style={{ fontSize: 12 }}>{` ${formData.dropZones.reduce((count, dropZone) => count + dropZone.cards.filter(card => card.ac === 1).length, 0)} Night(s)`}</Text>
      </View>
      <View style={{ marginLeft: '50px', flexDirection: 'row', flexWrap: 'wrap' }}>
        {formData.dropZones[0].cards
          .filter(card => card.ac === 1) // Filtra apenas os cards com ac === 1
          .map((card, cardIndex) => (
            <View key={`card-${cardIndex}`} style={{ marginRight: '20px'}}>
              <Text style={styles.title}>{card.title}</Text>
            </View>
          ))}
      </View>
    </View>
  )}
</View>


<View style={{ flexDirection: 'column', top: 10, left: 63}}>
  {formData.dropZones.length > 0 && (
    <View >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

         {/* Add the following Text component for "Meals" */}
         <Image style={{ width: 15, height: 15, marginRight: '5px' }} src={CheckIconImage} />
         <Text style={{ fontSize: 12 }}>Meals :  </Text>
        <Text style={{ marginRight: '20px', fontSize: 12 }}>{`Breakfast | ${formData.dropZones.reduce((count, dropZone) => {
          return count + dropZone.cards.filter(card => card.ml === 1 && card.type === 'breakfast').length;
        }, 0)}`}</Text>
        
        <Text style={{ marginRight: '20px', fontSize: 12 }}>{`Lunch | ${formData.dropZones.reduce((count, dropZone) => {
          return count + dropZone.cards.filter(card => card.ml === 1 && card.type === 'lunch').length;
        }, 0)}`}</Text>
        <Text style={{ fontSize: 12 }}>{`Dinner | ${formData.dropZones.reduce((count, dropZone) => {
          return count + dropZone.cards.filter(card => card.ml === 1 && card.type === 'dinner').length;
        }, 0)}`}</Text>
      </View>
      <View style={{ marginLeft: '50px', flexDirection: 'row', flexWrap: 'wrap' }}>
        {formData.dropZones[0].cards.map((card, cardIndex) => (
          <View key={`card-${cardIndex}`} style={{ marginRight: '20px'}}>
            <Text style={styles.title}>{card.title}</Text>
          </View>
        ))}
      </View>
    </View>
  )}
</View>

  <View style={{ flexDirection: 'column', top: 0, left: 15, marginBottom: '20px' }}>
  {formData.dropZones.map((dropZone, dropZoneIndex) => (
    <View key={`dropZone-${dropZoneIndex}`} style={{ marginBottom: '10px' }}>
      <View style={{ marginLeft: '20px', flexDirection: 'column' }}>
        {dropZone.cards.map((card, cardIndex) => (
          <View key={`card-${cardIndex}`} style={{ marginBottom: '10px' }}>
            <Text style={styles.title}>{card.title}</Text>
            <View style={{ marginLeft: '30px', flexDirection: 'column' }}>
              {card.inclusions.map((inclusion, inclusionIndex) => {
                // Verificar se a inclusion já foi vista antes
                if (!uniqueInclusions.has(inclusion)) {
                  // Adicionar inclusion ao conjunto global
                  uniqueInclusions.add(inclusion);
                  return (
                    <View key={`inclusion-${inclusionIndex}`} style={{ marginBottom: '5px', flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 15, height: 15, marginRight: '5px' }} src={CheckIconImage} />
                    <Text style={{ fontSize: 12 }}>{inclusion}</Text>
                  </View>
                  );
                }
                return null; // Se a inclusion já foi vista, não renderizar novamente
              })}
            </View>
          </View>
        ))}
      </View>
    </View>
  ))}
</View>
</View>


<View style={{ flexDirection: 'row', alignItems: 'center', top: 30, left: 40, marginBottom: '3px' }}>
      <Text style={{...styles.title, left: 20, marginBottom:'10px'}}>WHAT'S EXCLUDED ?</Text>
      <Image style={{ width: 150, height: 80, right: 128, marginTop:'10px'}} src={LineImage} />
      </View>
      <View style={{ top: 10, left: 13, marginBottom: '2px', flexDirection: 'column' }}>
  {/* Conjunto global para rastrear inclusions únicas */}

  <View style={{ flexDirection: 'column', top: 0, left: 15, marginBottom: '20px' }}>
  {formData.dropZones.map((dropZone, dropZoneIndex) => (
    <View key={`dropZone-${dropZoneIndex}`} style={{ marginBottom: '10px' }}>
      <View style={{ marginLeft: '20px', flexDirection: 'column' }}>
        {dropZone.cards.map((card, cardIndex) => (
          <View key={`card-${cardIndex}`} style={{ marginBottom: '10px' }}>
            <Text style={styles.title}>{card.title}</Text>
            <View style={{ marginLeft: '30px', flexDirection: 'column' }}>
              {card.exclusions.map((inclusion, inclusionIndex) => {
                // Verificar se a inclusion já foi vista antes
                if (!uniqueInclusions.has(inclusion)) {
                  // Adicionar inclusion ao conjunto global
                  uniqueInclusions.add(inclusion);
                  return (
                    <View key={`inclusion-${inclusionIndex}`} style={{ marginBottom: '5px', flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 15, height: 15, marginRight: '5px' }} src={RemoveIconImage} />
                    <Text style={{ fontSize: 12 }}>{inclusion}</Text>
                  </View>
                  );
                }
                return null; // Se a inclusion já foi vista, não renderizar novamente
              })}
            </View>
          </View>
        ))}
      </View>
    </View>
  ))}
</View>
</View>




</Page>



<Page size="A4">
  <View style={styles.backgroundImageContainer}>
    <Image src={AllBg} style={styles.backgroundImage} />
  </View>

  <View style={styles.contentContainer}>
    {cancellationPolicies.map((policy, index) => (
      <View key={index}>
        <Text style={styles.policyItem}>
           {policy.duration} {policy.unit}, {policy.condition}, {policy.deadline}, {policy.percentage}%
        </Text>
        {policy.rules && policy.rules.length > 0 && (
          <View>
            {policy.rules.map((rule, ruleIndex) => (
              <Text key={ruleIndex} style={styles.ruleItem}>
                Duração: {rule.duration} {rule.unit}, Condição: {rule.condition}, Prazo: {rule.deadline}, Percentagem: {rule.percentage}%
              </Text>
            ))}
          </View>
        )}
      </View>
    ))}
  </View>
</Page>






      <InfoPage/>
      <GreetPage/>
    </Document>
    );
  }

const Dashboard = () => {
  const [form, setForm] = useState(null);
  const [listRooms, setListRooms] = useState(null);
  const [generalInfoExpanded, setGeneralInfoExpanded] = useState(false);
  const [shortItineraryExpanded, setShortItineraryExpanded] = useState(false);
  const [longItineraryExpanded, setLongItineraryExpanded] = useState(false);
  //const [cancellationPolicyExpanded, setCancellationPolicyExpanded] = useState(false);
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false);
  const [cancellPolicies, setCancellPolicies] = useState(null);
  const [selectedTab, setSelectedTab] = useState('tab1'); 
  // Extracting all the "cards" from the "opZones" array
  const [allCards, setAllCards] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const travelData = {
    "startDate": "2024-04-07",
    "endDate": "2024-05-14",
    "sp": "Praia - Santiago Island",
    "lingua": "DE",
    "ep":"Mindelo, São Vicente Island",
    "mainLanguage": "en",
    "duration": 38,
    "titulo": "blj",
    "budget": "100",
    "destinations": [],
    "dropZones": [
      {
        "breakfast": true,
        "cards": [
          {
            "categories": [],
            "code": "RAI4G",
            "day": 0,
            "description": "Get picked up at your accommodation in Praia, then depart towards the historical centre of Plateau. Start the walking tour through the colonial buildings of the Presidential Palace, the Main Square, the Municipal Market (closed on Sundays) and find a diversity of local fruits and vegetables. Afterwards, explore Cape Verde's largest souvenir market, the Sucupira Market, and experience the daily life of the Cape Verdean family. Move on to Cidade Velha, a UNESCO World Heritage Site and the first city built by Europeans in sub-Saharan Africa. Upon arrival, take a guided walking tour of the São Filipe Fortress, explore the ruins of the first Cathedral built by Europeans in Sub-Saharan Africa, the former slave market and the famous Banana Street with its thatched houses. \n\nTravel back in time, learn the history from your expert, walk on a black sand beach and meet local fishermen before a short trip back to Praia. After a memorable day, your tour ends with a drop-off at your accommodation.\n",
            "emo": "ex",
            "ex": 1,
            "exclusions": ["Lunch", "Boat trip ticket"],
            "hour": 0,
            "humanResources": [],
            "image": "blob:https://6458-41-215-220-193.ngrok-free.app/9c358d2c-f471-45b3-b7fa-3a6c6d4bc844",
            "images": [],
            "inclusions": [
              "Transportation",
              "Local expert guide",
              "Civil liability insurance"
            ],
            "languages": [
              {
                "title": "Santiago Island: Best of Praia & Cidade Velha Tour, a World Heritage Site",
                "shortDescription": "Explore Praia on a guided tour of the Municipal Ma…st city built by Europeans in sub-Saharan Africa.",
                "longDescription": "Get picked up at your accommodation in Praia, then…tour ends with a drop-off at your accommodation.\n",
                "language": "Estados Unidos",
                "code": "US"
              }
            ],
            "languagesAvailable": [
              "US",
              "PT",
              "FR",
              "ES"
            ],
            "languagesPresent": [
              "US"
            ],
            "localization": "",
            "materialResources": [],
            "minute": 0,
            "name": "Santiago Island: Best of Praia & Cidade Velha Tour, a World Heritage Site",
            "rateType": "group",
            "rates": [],
            "shortDescription": "Explore Praia on a guided tour of the Municipal Market and the city's major historical sites. Visit Cidade Velha, a UNESCO World Heritage Site and learn about the history of slavery in the first city built by Europeans in sub-Saharan Africa.",
            "startTimes": [],
            "tasks": [],
            "themes": [],
            "tipe": "Tour",
            "type": "day-tour-activity",
            "videos": null,
            "whatToBring": [""],
            "__v": 0,
            "_id": "66181969502b88d1ebd125fd"
          }
        ],
        "length": 1,
        "data": "07/04/2024",
        "diaSeman": "Sunday",
        "dinner": false,
        "hasNotes": false,
        "id": 1,
        "lunch": false,
        "notas": [],
        "title": "Dia 1"
      }
    ],
    "participants": [
      {
        "leadTravellar": "2 Day Package",
        "participantsAge": [36],
        "name": "Jadmirson Djeckson Fortes Inocêncio"
      }
    ],
    "priceDescount": 0,
    "status": "draft"
  }


  useEffect(() => {
    const storedFormData = localStorage.getItem('packageFormData');
    const formData = storedFormData ? JSON.parse(storedFormData) : null;
    setForm(formData);
    fetchDataCancellationPolicies();
    getCards(formData.dropZones);
    const storedRoomData = localStorage.getItem('listRooms');
    
    const lr = storedRoomData ? JSON.parse(storedRoomData) : null;
    setListRooms(lr);
  }, []);



const pacote = {"startDate":"2024-03-07","endDate":"2024-03-10","mainLanguage":"en","duration":3,"titulo":"Exemplo de Pacote","status":"draft","participants":[{"name":"Emanuel Garcia","age":31,"nationality":"Burundi"}],"destinations":["RAI","SID","VXE"],"participantsAge":[31],"budget":"100","sp":"RAI","ep":"VXE","leadTravellar":"Emanuel Garcia","dropZones":[{"id":1,"title":"Dia 1","data":"06/03/2024","diaSeman":"Wednesday","cards":[{"_id":"65eb1380e873a3611fb722e4","code":"#r3435","name":"Yes sirrrrrrrrr", "tipe": "Tour", "ex":1,"emo":"ex","day":0,"hour":0,"minute":0,"localization":"","categories":[],"themes":[],"shortDescription":"ooooooooooooooooo","description":"ooooooooooooooooo","images":["blob:http://192.168.1.251/be3e46cb-4a2b-463c-b198-59ed08b24c24"],"image":"blob:http://192.168.1.251/be3e46cb-4a2b-463c-b198-59ed08b24c24","videos":["link.mmm"],"inclusions":["pt"],"exclusions":[],"knowBeforeYouGo":[],"languagesAvailable":[],"languages":[{"title":"Yes sirrrrrrrrr","shortDescription":"ooooooooooooooooo","longDescription":"ooooooooooooooooo","language":"Portuguese","_id":"65eb1380e873a3611fb722e5"}],"humanResources":[],"materialResources":[],"tasks":[],"rates":[{"title":"Rate de Exemplo","sel":1,"startTimes":[{"value":"1:1112","_id":"65eb1380e873a3611fb722e7"}],"price":[{"title":"Adult","startAge":18,"endAge":99,"fields":[{"from":1,"to":2,"price":1000,"descount":20,"_id":"65eb1380e873a3611fb722e9"}],"_id":"65eb1380e873a3611fb722e8"}],"_id":"65eb1380e873a3611fb722e6"}],"__v":0}],"notas":[],"hasNotes":false,"breakfast":false,"lunch":false,"dinner":false},{"id":2,"title":"Dia 2","data":"07/03/2024","diaSeman":"Thursday","cards":[{"_id":"65ebe50fba543bfb6d7d638e","code":"#r345","name":"Hoje e dia de Festa", "tipe": "Tour", "ex":1,"emo":"ex","day":0,"hour":0,"minute":0,"localization":"","categories":[],"themes":[],"shortDescription":"Descricao Curta","description":"Descricao Longa","images":["https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2Ff6%2F4c%2F15%2Ff64c15f963a7047bdf97ed77e9a70bbe.jpg&tbnid=X210Mer1CYrJIM&vet=12ahUKEwjwy4yKq-aEAxUoU6QEHULbBEoQMygjegUIARCWAQ..i&imgrefurl=https%3A%2F%2Fwww.pinterest.es%2Fpin%2F325736985532591497%2F&docid=kOkkcK3wNDEsWM&w=600&h=901&itg=1&q=ioi&ved=2ahUKEwjwy4yKq-aEAxUoU6QEHULbBEoQMygjegUIARCWAQ"],"image":"https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2Ff6%2F4c%2F15%2Ff64c15f963a7047bdf97ed77e9a70bbe.jpg&tbnid=X210Mer1CYrJIM&vet=12ahUKEwjwy4yKq-aEAxUoU6QEHULbBEoQMygjegUIARCWAQ..i&imgrefurl=https%3A%2F%2Fwww.pinterest.es%2Fpin%2F325736985532591497%2F&docid=kOkkcK3wNDEsWM&w=600&h=901&itg=1&q=ioi&ved=2ahUKEwjwy4yKq-aEAxUoU6QEHULbBEoQMygjegUIARCWAQ","videos":["link.g"],"inclusions":["pt"],"exclusions":[],"knowBeforeYouGo":[],"languagesAvailable":[],"languages":[{"title":"Hoje e dia de Festa","shortDescription":"Descricao Curta","longDescription":"Descricao Longa","language":"Portuguese","_id":"65ebe50fba543bfb6d7d638f"}],"humanResources":[],"materialResources":[],"tasks":[],"rates":[{"title":"rate","sel":1,"startTimes":[{"value":"6:55","_id":"65ebe50fba543bfb6d7d6391"}],"price":[{"title":"Adult","startAge":18,"endAge":99,"fields":[{"from":1,"to":2,"price":200,"descount":16,"_id":"65ebe50fba543bfb6d7d6393"}],"_id":"65ebe50fba543bfb6d7d6392"}],"_id":"65ebe50fba543bfb6d7d6390"}],"__v":0}],"notas":[],"hasNotes":false,"breakfast":false,"lunch":false,"dinner":false}],"tourPrice":1200,"priceDescount":0}
  

const handleImprimirPDFIndividual = async (tipe, code) => {
  try {
    const response = await axios.post(`/api/imprimir-atividade/${tipe}`,form,{ responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `atividade_${tipe}_${code}.pdf`);
    document.body.appendChild(link);
    link.click();
    setMensagem(`PDF da atividade ${tipe} baixado com sucesso.`);
  } catch (error) {
    console.error(`Erro ao imprimir PDF da atividade ${tipe}:`, error);
  }
};

  const handleImprimirPDF = async () => {
    try {
      const response = await axios.post('/api/imprimir-pacote', form, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'atividades.zip');
      document.body.appendChild(link);
      link.click();
      setMensagem('PDFs baixados com sucesso.');
    } catch (error) {
      console.error('Erro ao imprimir PDF:', error);
    }
  };

  const handleImprimirPDFPrincipal = async () => {
    try {
    
      console.log(form);
      const response = await axios.post(`/api/pdf`,form,{ responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `pacote.pdf`);
      document.body.appendChild(link);
      link.click();
      setMensagem(`PDF da atividade Pacote baixado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao imprimir PDF do pacote:`, error);
    }
  };

  const handleDebug = () => {
    console.log(cancellPolicies);
  };

  const getCards = (dropZones) => {

    const updatedAllCards = dropZones.reduce((accumulator, zone) => {
      if (zone.cards) {
        return accumulator.concat(zone.cards);
      }
      return accumulator;
    }, []);
  
    // Update allCards state using setAllCards
    setAllCards(updatedAllCards);
  
    console.log(cancellPolicies);
  
  };

  const fetchDataCancellationPolicies = async () => {
    try {
      const response = await axios.get('/api_/cancellation-policy');
      setCancellPolicies(response.data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  };
  const [selectedPolicies, setSelectedPolicies] = useState([]);

  const handleSwitchChange = () => {
    setShowCancellationPolicy(!showCancellationPolicy);
  };

  const handleCheckboxChange = (policy) => {
    const isPolicySelected = selectedPolicies.some((selectedPolicy) => selectedPolicy._id === policy._id);
  
    const updatedPolicies = isPolicySelected
      ? selectedPolicies.filter((selectedPolicy) => selectedPolicy._id !== policy._id)
      : [...selectedPolicies, policy];
  
    setSelectedPolicies(updatedPolicies);
  };

  const handleButtonToggle = (policy) => {
    const isPolicySelected = selectedPolicies.some((selectedPolicy) => selectedPolicy.id === policy.id);
  
    const updatedPolicies = isPolicySelected
      ? selectedPolicies.filter((selectedPolicy) => selectedPolicy.id !== policy.id)
      : [...selectedPolicies, policy];
  
    setSelectedPolicies(updatedPolicies);
  };

  const handleGeneratePDF = () => {
    pdf(<PDFFile formData={form} 
                 listRooms={listRooms}
                 generalInfoExpanded={generalInfoExpanded}
                 shortItineraryExpanded={shortItineraryExpanded}
                 longItineraryExpanded={longItineraryExpanded}
                 cancellationPolicies={selectedPolicies}
                 
    />).toBlob().then((blob) => {
      // Aqui você pode fazer algo com o blob, como fazer o download ou exibir no navegador
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    });
  };

  return (
    <Box m="20px" textAlign="center">
      {/* HEADER */}
      {/* ... (outros componentes) */}
       <Header title=" FILES" subtitle="Specify all the Relevant Package Information " />
       <div>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper",
        borderRadius: 8,
        p: 2,
        width: "100%",
        height: "80%",
        overflow: "auto",
      }}
    >
         <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <Button
              color="secondary"
                variant={selectedTab === "tab1" ? "contained" : "outlined"}
                onClick={() => setSelectedTab("tab1")}
              >
                Tour Itenerary
              </Button>
              <Button
              color="secondary"
                variant={selectedTab === "tab2" ? "contained" : "outlined"}
                onClick={() => setSelectedTab("tab2")}
              >
                Product Vouchers
              </Button>
            </Box>



      {selectedTab === "tab1" && (
        // Conteúdo para o Botão 1
        <div>

<Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <div className="container" style={{ maxWidth: "800px", width: "100%" }}>
          <div className="row">
            <div className="col-md-6">
              <div className="card-body d-flex align-items-center justify-content-center">
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography color="textSecondary" variant="h5">
                      Display General Information
                      </Typography>
                       <Switch
                            checked={generalInfoExpanded}
                            onChange={() => setGeneralInfoExpanded(!generalInfoExpanded)}
                        />
                    </Box>
                    
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography color="textSecondary" variant="h5">
                      Display full Itinerary summary
                      </Typography>
                       <Switch
                            checked={shortItineraryExpanded}
                            onChange={() => setShortItineraryExpanded(!shortItineraryExpanded)}
                        />
                    </Box>
                    
                  </CardContent>
                </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography color="textSecondary" variant="h5">
                      Display an overview of the daily services on offer
                      </Typography>
                       <Switch
                            checked={longItineraryExpanded}
                            onChange={() => setLongItineraryExpanded(!longItineraryExpanded)}
                        />
                    </Box>
                    
                  </CardContent>
                </Card>
                <br/>
                <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography color="textSecondary" variant="h5">
            Display the Cancellation Policy for each service
          </Typography>
          <Switch onChange={handleSwitchChange} />
        </Box>
        {showCancellationPolicy && (
          <>
          <br/>
          <Divider variant="middle" />
          <Box mt={2}>
          <div>
      {cancellPolicies.map((policy) => (
  <div key={policy._id}>
  <FormControlLabel
    control={
      <Checkbox
        key={policy._id}
        checked={selectedPolicies.some((selectedPolicy) => selectedPolicy._id === policy._id)}
        onChange={() => handleCheckboxChange(policy)}
      />
    }
    label={policy.title}
  />
</div>
      ))}
    </div>
          </Box>
       </> )}
      </CardContent>
    </Card>
                <br/>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography color="textSecondary" variant="h5">
                       Display the General Terms and conditions of the offers
                      </Typography>
                      <Switch />
                    </Box>
                    
                  </CardContent>
                </Card>

                {/* Add other cards with similar structure here */}
              </div>
              <br />
            </div>
          </div>
        </div>
        <Fab color="secondary" aria-label="add" style={{position:"fixed", bottom:"50px", right:"50px"}} size="large">
        <AddIcon />
      </Fab>
      
    </Box>
      <Fab onClick={handleImprimirPDFPrincipal} color="info" aria-label="add" style={{position:"fixed", bottom:"50px", right:"50px"}} size="large">
        <DownloadIcon />
      </Fab>
    
            
        </div>
      )}
      {selectedTab === "tab2" && (
        // Conteúdo para o Botão 2
        
        <div>
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <div className="container" style={{ maxWidth: "800px", width: "100%" }}>
          <div className="row">
            <div className="col-md-6">
              <div className="card-body d-flex align-items-center justify-content-center">
              <div>
      {allCards.length > 0 ? (
        allCards.map(card => (
          <Card sx={{marginBottom: 4}} key={card._id}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography color="textSecondary" variant="h5" sx={{marginRight: "120px"}}>
                  {card.name}
                </Typography>
                <Button onClick={() => handleImprimirPDFIndividual(card.tipe, card.code)} variant="contained"><DownloadIcon/></Button>
              </Box>          
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No cards available.</p>
      )}
    </div>
                  <br/>
                <Button onClick={handleImprimirPDF} fullWidth variant="contained"> Download All <DownloadIcon/></Button>
               
                {/* Add other cards with similar structure here */}
              </div>
              <br />
            </div>
          </div>
        </div>
        <Fab color="secondary" aria-label="add" style={{position:"fixed", bottom:"50px", right:"50px"}} size="large">
        <AddIcon />
      </Fab>
      
    </Box>
        </div>
      )}
    </Box>
  </div>
   
    </Box>
  );
};

export default Dashboard;



