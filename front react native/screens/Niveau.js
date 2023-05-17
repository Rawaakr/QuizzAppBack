import React,{ useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import Sound from 'react-native-sound';
export default function Niveau({navigation,route}) {
  const [isRecording, setIsRecording] = useState(false);
  const { mailconn } = route.params;
  const { idcomp } = route.params;

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
      if (mots[i] === 'facile') {
        navigation.replace('Test',{Testname: Nomtest,Niv: 'facile',nivnum:1,mailconns: mailconn,numcomp:idcomp})      }
    }
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'moyen') {
        navigation.replace('Test',{Testname: Nomtest,Niv: 'moyen',nivnum:2,mailconns: mailconn,numcomp:idcomp}) 
            }
    }
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'difficile') {
        navigation.replace('Test',{Testname: Nomtest,Niv: 'difficile',nivnum:3,mailconns: mailconn,numcomp:idcomp}) 
      }
    }

  };

  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Charge le fichier audio en utilisant require() et le chemin relatif du fichier audio
    setSound(new Sound(require('./level.mp3'), Sound.MAIN_BUNDLE, (error) => {
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
    setTimeout(startRecording, 16000); // Attendre 2 secondes avant d'exécuter functionTwo
  };
  const [value, setValue] = useState('');
  const { Nomtest } = route.params;


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.centerizedView}>

            <View style={styles.authBox}>
                <Text style={styles.TitleText}>choose {Nomtest} quiz level : </Text>
                <TouchableOpacity style={styles.loginButton} onPress={()=>navigation.replace('Test',{Testname: Nomtest,Niv: 'facile',nivnum:1,mailconns: mailconn,numcomp:idcomp})   } >
                 <Text style={styles.loginButtonText}>Facile</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigation.replace('Test',{Testname: Nomtest,Niv: 'moyen',nivnum:2,mailconns: mailconn,numcomp:idcomp})   } style={styles.loginButton}>
               <Text style={styles.loginButtonText}>Moyen</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigation.replace('Test',{Testname: Nomtest,Niv: 'difficile',nivnum:3,mailconns: mailconn,numcomp:idcomp})   } style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Difficile</Text>
               </TouchableOpacity>
               <View>
              <TouchableOpacity
                title={isRecording ? 'Enregistrement en cours...' : 'Commencer l\'enregistrement'}
                onPress={handlePress}
                disabled={isRecording}
              >
              <Image
                style={{
                  width:40,
                  height:40,
                  left:110,
                  bottom:-5
                }}
                source={require('./micro.png')}
              />
              </TouchableOpacity>
            </View>
            </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#ff6b81',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#ff7979',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '15%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 140,
    height: 100,
    backgroundColor: '#eb4d4b',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#0013FF',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  TitleText: {
    color: '#ff6b81',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
});