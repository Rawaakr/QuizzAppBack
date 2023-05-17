import React, { useState, useEffect } from 'react';
//import { useRoute } from '@react-navigation/native';
//import ProgressBar from 'react-native-progress/Bar';
import Voice from '@react-native-voice/voice';
import Sound from 'react-native-sound';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList, 
} from 'react-native';
 const Competence=({navigation,route})=> {
        const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { mailconns } = route.params;
console.log(mailconns);
  useEffect(() => {
    let url = `https://e649-197-2-52-71.ngrok-free.app/api/competences/${searchTerm}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setPeople(data[0]))
      .catch(error => console.error(error));
  }, [searchTerm]);
  const renderPerson = ({ item }) => (
    <View style={{ padding: 10 }}>
    <TouchableOpacity onPress={()=> navigation.replace('Niveau',{Nomtest: item.nom,mailconn:mailconns,idcomp:item.id})}>
      <Text style={{ fontSize: 18 }}>{item.nom}</Text>
      <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
    </TouchableOpacity>
    </View>
  );
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
      if (mots[i] === 'profil') {
        navigation.replace('Profile',{mailconn:mailconns});
      }
    }
    
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'déconnecter') {
        navigation.replace('Login');
      }
    }
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'code') {
        navigation.replace('Editeur',{mailconn:mailconns});
      }
    }

    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'j2') {
        navigation.replace('Niveau',{Nomtest: mots[i]})
      }
    }
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'La'&&mots[i+1]==='Ravel') {
        navigation.replace('Niveau',{Nomtest: mots[i]+mots[i+1]})
      }
    }
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'react'&&mots[i+1]==='native') {
        navigation.replace('Niveau',{Nomtest: mots[i]+" "+mots[i+1]})
      }
    }
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'Java') {
        navigation.replace('Niveau',{Nomtest: mots[i]})
        console.log
      }
    }

  };

  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Charge le fichier audio en utilisant require() et le chemin relatif du fichier audio
    setSound(new Sound(require('./competence.mp3'), Sound.MAIN_BUNDLE, (error) => {
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
    setTimeout(startRecording, 16000); // Attendre 2 secondes avant d'exécuter functionTwo
  };



 
      return (
      <ScrollView>
      <View>
          <TouchableOpacity style={styles.button1}>
        <Text style={styles.buttonText1}  onPress={()=> navigation.replace('Profile',{mailconn:mailconns})}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button12}>
        <Text style={styles.buttonText12}  onPress={()=> navigation.replace('Editeur',{mailconn:mailconns})}>Coder !</Text>
      </TouchableOpacity>
              <TouchableOpacity
               title={isRecording ? 'Enregistrement en cours...' : 'Commencer l\'enregistrement'}
               onPress={handlePress}
               disabled={isRecording}
              >
              <Image
                style={{
                  width:40,
                  height:40,
                  left:160,
                  bottom:-5,
                  top:-30
                }}
                source={require('./micro.png')}
              />
              </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}  onPress={()=> navigation.replace('Login')}>Déconnecter</Text>
      </TouchableOpacity>
      </View>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
        placeholder="Rcherche"
      />
      <FlatList
        data={people}
        renderItem={renderPerson}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
                 
      )    
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    paddingVertical: 20,
    backgroundColor: '#eee',
    // borderBottomWidth: 2,
    borderColor: '#fff'
},
head: {
    padding: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 2
},
itemTxt: {
    fontSize: 18
},
headTxt: {
    fontSize: 20,
    fontWeight: 'bold'
},
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#FE1B00',
    marginTop: 10,
    paddingVertical: 10,
    width:140,
    height:50,
    borderRadius: 4,
    bottom:-450,
    left:-180
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#fff',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#fff',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recipient: {
    fontSize: 20,
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    paddingTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999999',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  button: {
    backgroundColor: '#3b5998',
    padding: 10,
    top:-39,
    left:245,
    width:110,
    top:-114
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button1: {
    backgroundColor: '#3b5998',
    padding: 10,
    width:110,
    left:5,
    top:4,
    
  },
  button12: {
    backgroundColor: '#3b5998',
    padding: 10,
    width:110,
    top:-35,
    left:125,

  },
  buttonText1: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonText12: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default Competence;