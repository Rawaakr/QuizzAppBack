import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import Voice from '@react-native-voice/voice';
import Sound from 'react-native-sound';
import { WebView } from 'react-native-webview';
import axios from 'axios';
export default function Profile({navigation,route}) {
  const [isRecording, setIsRecording] = useState(false);
  const { mailconn } = route.params;
  console.log(mailconn);
  const startRecording = async () => {
    setIsRecording(true);

    try {
      await Voice.start('fr-FR');
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);

    try {
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  };

  Voice.onSpeechResults = (event) => {
    const recognizedText = event.value[0];
    //const pass="";
    console.log('recognized text:', recognizedText);
    const mots = recognizedText.split(" ");
    for (let i = 0; i < mots.length; i++) {

    if (mots[i] === 'compétences') {
      navigation.replace('Competence',{mailconns:mailconn});
    }
  }

    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'déconnecter') {
        navigation.replace('Login');
      }
    }
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'cértificat') {
        navigation.replace('Certificat',{nomchercher:mailconn});
      }
    }

  };

  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Charge le fichier audio en utilisant require() et le chemin relatif du fichier audio
    setSound(new Sound(require('./profil.mp3'), Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Erreur lors du chargement du fichier audio', error);
      }
    }));
  }, []);

  const playSound = () => {
    if (sound !== null) { // Vérifie si sound n'est pas nul avant d'appeler la méthode play()
      sound.play((success) => {
        if (!success) {
          console.log('Erreur lors de la lecture du fichier audio');
        }
      });
    }
  }
  const handlePress = () => {
    playSound();
    setTimeout(startRecording, 20000); // Attendre 2 secondes avant d'exécuter functionTwo
  };
  const [people,setPeople]=useState('');
  const [edu,setEdu]=useState([]);
  const [exp,setExp]=useState([]);
  const [certif,setCertif]=useState([]);

  const [htmlContent, setHtmlContent] = useState('');
  const [htmlContent2, setHtmlContent2] = useState('');
  const [htmlContent3, setHtmlContent3] = useState('');

  useEffect(() => {
    let url = `https://e649-197-2-52-71.ngrok-free.app/api/affichage/${mailconn}`;
    fetch(url)
      .then(response => response.json())
      .then(data => setPeople(data[0]))
      .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    let url = `https://e649-197-2-52-71.ngrok-free.app/education/${mailconn}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); // affiche la valeur de `data` dans la console
        setEdu(data);
        let htmlcontent = '';
        data.forEach(function(row) {
          row.forEach(function(edu) {
            htmlcontent += `
              <ul>
                <li>
                  <div class="date">${edu.annee_debut} - ${edu.annee_fin}</div> 
                  <div class="info">
                    <p class="semi-bold">${edu.titre}</p> 
                    <p>${edu.description}</p>
                  </div>
                </li>
              </ul>
            `;
          });
        });
        setHtmlContent(htmlcontent); // met à jour la variable d'état pour afficher le contenu HTML
      })
}, []);
  useEffect(() => {
      let url = `https://e649-197-2-52-71.ngrok-free.app/experience/${mailconn}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data); // affiche la valeur de `data` dans la console
          setEdu(data);
          let htmlcontent = '';
          data.forEach(function(row) {
            row.forEach(function(exp) {
              htmlcontent += `
                <ul>
                  <li>
                    <div class="date">${exp.annee_debut} - ${exp.annee_fin}</div> 
                    <div class="info">
                      <p class="semi-bold">${exp.titre}</p> 
                      <p>${exp.description}</p>
                    </div>
                  </li>
                </ul>
              `;
            });
          });
          setHtmlContent2(htmlcontent); // met à jour la variable d'état pour afficher le contenu HTML
        })
  }, []);
  useEffect(() => {
    let url = `https://e649-197-2-52-71.ngrok-free.app/certificat/${mailconn}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); // affiche la valeur de `data` dans la console
        setCertif(data);
        let htmlcontent = '';
        data.forEach(function(row) {
          row.forEach(function(certif) {
            htmlcontent += `
            <ul>
            <li>
              <div class="skill_name">
                ${certif.nom}
              </div>
              <div class="skill_progress">
                <span style="width: 80%;"></span>
              </div>
            </li>
          
          </ul>
            `;
          });
        });
        setHtmlContent3(htmlcontent); // met à jour la variable d'état pour afficher le contenu HTML
      })
}, []);




    const html = `
    <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
  
    <div class="resume">
       <div class="resume_left">
         <div class="resume_profile">
           <img src="${people.image}" alt="profile_pic">
         </div>
         <div class="resume_content">
           <div class="resume_item resume_info">
             <div class="title">
               <p class="bold">${people.nom} ${people.prenom}</p>
               <p class="regular">Designer</p>
             </div>
             <ul>
               <li>
                 <div class="icon">
                   <i class="fas fa-map-signs"></i>
                 </div>
                 <div class="data">
                   ${people.adresse} <br /> 
                 </div>
               </li>
               <li>
                 <div class="icon">
                   <i class="fas fa-mobile-alt"></i>
                 </div>
                 <div class="data">
                   ${people.telephone}
                 </div>
               </li>
               <li>
                 <div class="icon">
                   <i class="fas fa-envelope"></i>
                 </div>
                 <div class="data">
                 ${people.email}
                 </div>
               </li>
             </ul>
           </div>
           <div class="resume_item resume_skills">
             <div class="title">
               <p class="bold">skill's</p>
             </div>
             ${htmlContent3}
           </div>
           <div class="resume_item resume_social">
             <div class="title">
               <p class="bold">Social</p>
             </div>
             <ul>
               <li>
                 <div class="icon">
                   <i class="fab fa-linkedin"></i>
                 </div>
                 <div class="data">
                   <p class="semi-bold">Linkedin</p>
                   <p>${people.social}</p>
                 </div>
               </li>
             </ul>
           </div>
         </div>
      </div>
      <div class="resume_right">
        <div class="resume_item resume_about">
            <div class="title">
               <p class="bold">About us</p>
             </div>
            <p>${people.description}</p>
        </div>
        <div class="resume_item resume_work">
            <div class="title">
               <p class="bold">Work Experience</p>
             </div>
             ${htmlContent2}
   
        </div>
        <div class="resume_item resume_education">
          <div class="title">
               <p class="bold">Education</p>
             </div>

            ${htmlContent}
        </div>
      </div>
    </div>
    <style>
    @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap");
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-family: "Montserrat", sans-serif;
  }
  
  body {
    background: #585c68;
    font-size: 14px;
    line-height: 22px;
    color: #555555;
  }
  
  .bold {
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
  }
  
  .semi-bold {
    font-weight: 500;
    font-size: 16px;
  }
  
  .resume {
    width: 800px;
    height: auto;
    display: flex;
    margin: 50px auto;
  }
  
  .resume .resume_left {
    width: 280px;
    background: #0bb5f4;
  }
  
  .resume .resume_left .resume_profile {
    width: 100%;
    height: 280px;
  }
  
  .resume .resume_left .resume_profile img {
    width: 100%;
    height: 100%;
  }
  
  .resume .resume_left .resume_content {
    padding: 0 25px;
  }
  
  .resume .title {
    margin-bottom: 20px;
  }
  
  .resume .resume_left .bold {
    color: #fff;
  }
  
  .resume .resume_left .regular {
    color: #b1eaff;
  }
  
  .resume .resume_item {
    padding: 25px 0;
    border-bottom: 2px solid #b1eaff;
  }
  
  .resume .resume_left .resume_item:last-child,
  .resume .resume_right .resume_item:last-child {
    border-bottom: 0px;
  }
  
  .resume .resume_left ul li {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
  }
  
  .resume .resume_left ul li:last-child {
    margin-bottom: 0;
  }
  
  .resume .resume_left ul li .icon {
    width: 35px;
    height: 35px;
    background: #fff;
    color: #0bb5f4;
    border-radius: 50%;
    margin-right: 15px;
    font-size: 16px;
    position: relative;
  }
  
  .resume .icon i,
  .resume .resume_right .resume_hobby ul li i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .resume .resume_left ul li .data {
    color: #b1eaff;
  }
  
  .resume .resume_left .resume_skills ul li {
    display: flex;
    margin-bottom: 10px;
    color: #b1eaff;
    justify-content: space-between;
    align-items: center;
  }
  
  .resume .resume_left .resume_skills ul li .skill_name {
    width: 25%;
  }
  
  .resume .resume_left .resume_skills ul li .skill_progress {
    width: 60%;
    margin: 0 5px;
    height: 5px;
    background: #009fd9;
    position: relative;
  }
  
  .resume .resume_left .resume_skills ul li .skill_per {
    width: 15%;
  }
  
  .resume .resume_left .resume_skills ul li .skill_progress span {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #fff;
  }
  
  .resume .resume_left .resume_social .semi-bold {
    color: #fff;
    margin-bottom: 3px;
  }
  
  .resume .resume_right {
    width: 520px;
    background: #fff;
    padding: 25px;
  }
  
  .resume .resume_right .bold {
    color: #0bb5f4;
  }
  
  .resume .resume_right .resume_work ul,
  .resume .resume_right .resume_education ul {
    padding-left: 40px;
    overflow: hidden;
  }
  
  .resume .resume_right ul li {
    position: relative;
  }
  
  .resume .resume_right ul li .date {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
  }
  
  .resume .resume_right ul li .info {
    margin-bottom: 20px;
  }
  
  .resume .resume_right ul li:last-child .info {
    margin-bottom: 0;
  }
  
  .resume .resume_right .resume_work ul li:before,
  .resume .resume_right .resume_education ul li:before {
    content: "";
    position: absolute;
    top: 5px;
    left: -25px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 2px solid #0bb5f4;
  }
  
  .resume .resume_right .resume_work ul li:after,
  .resume .resume_right .resume_education ul li:after {
    content: "";
    position: absolute;
    top: 14px;
    left: -21px;
    width: 2px;
    height: 115px;
    background: #0bb5f4;
  }
  
  .resume .resume_right .resume_hobby ul {
    display: flex;
    justify-content: space-between;
  }
  
  .resume .resume_right .resume_hobby ul li {
    width: 80px;
    height: 80px;
    border: 2px solid #0bb5f4;
    border-radius: 50%;
    position: relative;
    color: #0bb5f4;
  }
  
  .resume .resume_right .resume_hobby ul li i {
    font-size: 30px;
  }
  
  .resume .resume_right .resume_hobby ul li:before {
    content: "";
    position: absolute;
    top: 40px;
    right: -52px;
    width: 50px;
    height: 2px;
    background: #0bb5f4;
  }
  
  .resume .resume_right .resume_hobby ul li:last-child:before {
    display: none;
  }
  
    </style>
    `;
    return (

    <View style={styles.container}>
    <WebView
        source={{ html }}
      style={styles.webview}
    />
                <View>
              <TouchableOpacity
               title={isRecording ? 'Enregistrement en cours...' : 'Commencer l\'enregistrement'}
                onPress={handlePress}
                disabled={isRecording}
              >
              <Image
                style={{
                  width:35,
                  height:35,
                  left:160,
                  bottom:1
                }}
                source={require('./micro.png')}
              />
              </TouchableOpacity>
            </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}onPress={()=> navigation.replace('Competence',{mailconns:mailconn})}>
        <Text style={styles.buttonText}>Liste des competence</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.replace('Certificat',{nomchercher:mailconn})}>
        <Text style={styles.buttonText} >Certificats</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.replace('Login')}>
        <Text style={styles.buttonText}>Déconnecter</Text>
      </TouchableOpacity>
    </View>
  </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webview: {
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 50,
      backgroundColor: '#f2f2f2',
    },
    button: {
      backgroundColor: '#3b5998',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });