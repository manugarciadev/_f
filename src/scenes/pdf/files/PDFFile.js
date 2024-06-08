import React, { useState, useEffect } from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import LebronStretch from "./photos/lebron_transparent.png";
import FooterImage from "./photos/footer.png";
import HeaderImage from "./photos/header.png"; // Importe a imagem do cabeçalho aqui
import LogoImage from "./photos/logo.png";
import CoverImage from "./photos/cover.jpg";
import FormImage from "./photos/form.png";
import FooterLogoImage from "./photos/book.png";
import { Font, pdf } from "@react-pdf/renderer";
import MyCustomFont from './fonts/Amatic-Bold.ttf';
import axios from 'axios';

Font.register({ family: "AntonFamily", src: MyCustomFont });

const CoverPage = () => {
  return (
    <Page size="A4" style={styles.container}>
      <Image style={styles.coverImage} src={CoverImage} />
      
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

const GeneralInformationPage = () => {
  return (
    <Page size="A4" style={styles.container}>
       <Image style={styles.headerImage} src={HeaderImage} />
          {/* Adicione o rodapé em todas as páginas */}
          <Image style={styles.footerImage} src={FooterImage} />

          {/* Adicione o logo abaixo do cabeçalho */}
          <Image style={styles.logo} src={LogoImage} />
          <Image style={styles.image} src={FormImage} />
      

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


const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "AntonFamily",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "AntonFamily",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: -2,
    marginRight: 50,
    height:300,
    width:"100%",
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
    color: "grey",
    fontFamily: "AntonFamily",
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
    top: 0,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "AntonFamily",
    marginTop: 20, // Espaçamento entre o título e o conteúdo abaixo
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
      width: "80%",
      height: "auto",
    },
    
});


const PDFFile = () => {

  const [days, setDays] = useState(null); 
  const [example, setExample] = useState(''); 



  useEffect(() => {
    const storedFormData = localStorage.getItem('packageFormData');
  
    // Verifica se há dados armazenados e os converte de volta para um objeto JavaScript
    const formData = storedFormData ? JSON.parse(storedFormData) : null;

    setDays(formData); // Chama a função testLs() assim que o componente é montado
    console.log(days);
  }, [days]);
 

  // Defina a variável pages aqui, contendo as páginas do documento PDF
  const pages = [
    {teste: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,', image: 'https://cdn.dooca.store/3074/products/rocinha-favela-rio-de-janeiro-passeio-tour-jeep_640x640+fill_ffffff.png?v=1625257793000&webp=0',  title: 'DAY 1 : Santiago Tour' },
    {teste: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKiZFO9a8iRcWMZXkJeIGnzR-hZUlGjDH6WA4lpDeJ25BBZYaXiF3gweNNduri6-hnmfA&usqp=CAU',  title: 'DAY 2 : Banana Plantation Expirience' },
    {teste: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoPQwTCzyFisOvTMBmf2BoJclRJdZZNLj_aBqDg7WO7V4vCBa6Wpw4d0AS4iphElIMvAM&usqp=CAU',  title: 'DAY 3 : Boat trip Expirience' },
  ];

  // Defina as cores das páginas
  const pageColors = ['#f6d186', '#f67280', '#c06c84'];

  return (
    <Document>
      <CoverPage />
    {pages.map((page, index) => {
      return (
        <Page key={index} size="A4" style={{ ...styles.body, backgroundColor: "white" }}>
          {/* Adicione o cabeçalho em todas as páginas */}
          <Image style={styles.headerImage} src={HeaderImage} />
          {/* Adicione o rodapé em todas as páginas */}
          <Text style={styles.title}></Text>
          <Image style={styles.footerImage} src={FooterImage} />

          {/* Adicione o logo abaixo do cabeçalho */}
          <Image style={styles.logo} src={LogoImage} />
             {/* Adicione o título da página */}
             <Text style={styles.title}>{page.title}</Text>
          <Text style={styles.header} fixed></Text>
          
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
           <Image style={styles.footerLogo} src={FooterLogoImage} />
        </Page>
      )
    })}
  </Document>
  );
};

export default PDFFile;
