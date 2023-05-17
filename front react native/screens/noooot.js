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
export default function Profile({navigation,route}) {
  const [isRecording, setIsRecording] = useState(false);
  const { mailconn } = route.params;

  const [people,setPeople]=useState('');
  const [exp,setExp]=useState('');

 
  
  useEffect(() => {
    let url = `https://9209-197-1-139-106.eu.ngrok.io/experience/${mailconn}`;
    fetch(url)
      .then(response => response.json())
      .then(data => setExp(data[0]))
      .catch(error => console.error(error));
  }, []);
  

    const html = `
    <ul>
    ${exp.map((exp) => `
      <li key="${exp.id}">
        <div class="date">${exp.annee_debut} - ${exp.annee_fin}</div> 
        <div class="info">
          <p class="semi-bold">${exp.titre}</p> 
          <p>${exp.description}</p>
        </div>
      </li>
    `).join('')}
  </ul>
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
      <TouchableOpacity style={styles.button}onPress={()=> navigation.replace('Competence')}>
        <Text style={styles.buttonText}>Liste des competence</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.replace('Certificat',{nomchercher:people.nom})}>
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