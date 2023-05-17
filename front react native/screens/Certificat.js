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
export default function Certificate({navigation,route}) {
  const { nomchercher } = route.params;
  const [certif,setCertif]=useState('');
  const[htmlContent3,setHtmlContent3]=useState('');
  console.log(nomchercher);
  useEffect(() => {
    let url = `https://a055-102-156-123-23.ngrok-free.app/certificat/${nomchercher}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); // affiche la valeur de `data` dans la console
        setCertif(data);
        let htmlcontent = '';
        data.forEach(function(row) {
          row.forEach(function(certif) {
            htmlcontent += `
            <div class="certificate">
            <div class="water-mark-overlay"></div>
            <div class="certificate-header">
                <img src="${certif.image}"  class="logo" alt="">
            </div>
            <div class="certificate-body">
               
                <p class="certificate-title"><strong>certificat agrégé par l'Etat</strong></p>
                <h1>Certificat d'achèvement</h1>
                <p class="text-center">
                Ceci est à certifier que ${certif.prenom} a satisfait aux exigences du programme de formation ${certif.nom} avec succès. Cette personne a suivi et achevé tous les tests de l'application et a démontré une compréhension approfondie des sujets abordés.
                Nous attestons que ${certif.prenom} est maintenant compétent(e) dans les domaines traités par cette formation et qu'il/elle est capable de mettre en pratique les connaissances acquises de manière efficace.
                Cette certification est délivrée le [Date de délivrance] et est valable pour toujours.
                Félicitations pour votre réussite dans ce programme de formation. Nous vous souhaitons beaucoup de succès dans votre carrière professionnelle.
                <h1>QUIZZ APP </h1>
                </p>
            </div>
        </div></br></br>
            `;
          });
        });
        setHtmlContent3(htmlcontent); // met à jour la variable d'état pour afficher le contenu HTML
      })
}, []);
console.log(certif)
    const html = `
    <div class="certificate-container">
    ${htmlContent3}
</div>
    <style>
    body {
      font-family: Roboto;
  }
  
  .certificate-container {
      padding: 50px;
      width: 1024px;
  }
  .certificate {
      border: 20px solid #0C5280;
      padding: 25px;
      height: 600px;
      position: relative;
  }
  
  .certificate:after {
      content: '';
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      position: absolute;
      background-image: url(https://image.ibb.co/ckrVv7/water_mark_logo.png);
      background-size: 100%;
      z-index: -1;
  }
  
  .certificate-header > .logo {
      width: 80px;
      height: 80px;
  }
  
  .certificate-title {
      text-align: center;    
  }
  
  .certificate-body {
      text-align: center;
  }
  
  h1 {
  
      font-weight: 400;
      font-size: 48px;
      color: #0C5280;
  }
  
  .student-name {
      font-size: 24px;
  }
  
  .certificate-content {
      margin: 0 auto;
      width: 750px;
  }
  
  .about-certificate {
      width: 380px;
      margin: 0 auto;
  }
  
  .topic-description {
  
      text-align: center;
  }  
    </style>
    `;
    const [isRecording, setIsRecording] = useState(false);
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
          navigation.replace('Competence',{mailconn:nomchercher});
        }
      }
      for (let i = 0; i < mots.length; i++) {
        if (mots[i] === 'déconnecter') {
          navigation.replace('Login');
        }
      }
      for (let i = 0; i < mots.length; i++) {
        if (mots[i] === 'profil') {
          ()=>navigation.replace('Profile',{mailconn:nomchercher})        
        }
      }
  
    };
    const [sound, setSound] = useState(null);

    useEffect(() => {
      // Charge le fichier audio en utilisant require() et le chemin relatif du fichier audio
      setSound(new Sound(require('./certificat.mp3'), Sound.MAIN_BUNDLE, (error) => {
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
      //startRecording();
      setTimeout(startRecording, 11000); // Attendre 2 secondes avant d'exécuter functionTwo
    };
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
      <TouchableOpacity style={styles.button}onPress={()=> navigation.replace('Competence',{mailconns:nomchercher})}>
        <Text style={styles.buttonText}>Liste des competence</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.replace('Profile',{mailconn:nomchercher})}>
        <Text style={styles.buttonText} >Profile</Text>
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