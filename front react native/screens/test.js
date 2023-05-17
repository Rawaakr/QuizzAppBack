import React,{ useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Button,
  Alert,
  ImageBackground,
} from 'react-native';
import { Icon,SocialIcon } from 'react-native-elements';
import axios from 'axios';
import Voice from '@react-native-voice/voice';
export default function Login({navigation}) {
  const [value, setValue] = useState('');
  const [email, setInputValue2] = useState('');
  const [password, setInputValue5] = useState('');
  const [error, setError] = useState(null);
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const verif=() =>{
    axios.get(`https://8815-197-4-171-110.eu.ngrok.io/api/login?email=${email}&password=${password}`)
    .then((res)=>{
      console.log(res.data)
      if (res.data == 'Invalid'){
      Alert.alert('Alert Title', 'invalide mail or password', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    else if(res.data=='verified'){
      navigation.replace('Home');
    }
    else{
      Alert.alert('Alert', 'error', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    })
  }
  const ajouterpass = (text)=>{
    setInputValue5(text);
  }
  const ajouteremail = (text)=>{
    if (emailRegex.test(text)) {
    setInputValue2(text);
    setError(null);
    }
    else {
      setInputValue2(text);
      setError('Addresse email invalid');
    }
  }
  const [isRecording, setIsRecording] = useState(false);
  
  const startRecording = async () => {
    setIsRecording(true);

    try {
      await Voice.start('en-US');
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
    console.log('recognized text:', recognizedText);

    if (recognizedText.toLowerCase() === 'register') {
      navigation.replace('Register');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.centerizedView}>

        <View style={styles.authBox}>
            <ImageBackground style={styles.logoBox} source={{uri:'https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=2000'}}>
            </ImageBackground>
            <Text style={styles.loginTitleText}>Login</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                //autoCapitalize={false}
                keyboardType='email-address'
                textContentType='emailAddress'
                placeholder="Entrez votre Email"
                onChangeText={ajouteremail}
                value={email}
              />
                           <TouchableOpacity
                title={isRecording ? 'Enregistrement en cours...' : 'Commencer l\'enregistrement'}
                onPress={isRecording ? stopRecording : startRecording}
                disabled={isRecording}
              >
              <Image
                style={{
                  width:40,
                  height:40,
                  left:200,
                  bottom:40
                }}
                source={require('./micro.png')}
              />
              </TouchableOpacity>
            {error && <Text style={
              {
                color: 'red',
                marginTop: 10,
              }
            }>{error}</Text>}
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                //autoCapitalize={false}
                secureTextEntry={true}
                textContentType='password'
                placeholder="Entrez votre Email"
                onChangeText={ajouterpass}
                value={password}
              />
              <TouchableOpacity
                title={isRecording ? 'Enregistrement en cours...' : 'Commencer l\'enregistrement'}
                onPress={isRecording ? stopRecording : startRecording}
                disabled={isRecording}
              >
              <Image
                style={{
                  width:40,
                  height:40,
                  left:200,
                  bottom:40
                }}
                source={require('./micro.png')}
              />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={verif}/*onPress={()=> navigation.replace('Home'/*,{nomprofil: "value" })}*/>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                title={isRecording ? 'Enregistrement en cours...' : 'Commencer l\'enregistrement'}
                onPress={isRecording ? stopRecording : startRecording}
                disabled={isRecording}
              >
              <Image
                style={{
                  width:40,
                  height:40,
                  left:200,
                  bottom:40
                }}
                source={require('./micro.png')}
              />
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 25}}>----------------Or----------------</Text>
            <View>
              <TouchableOpacity>
              <SocialIcon
                title='Sign In With Facebook'
                button
                type='facebook'
              />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=> navigation.replace('Register')}>
              <Text style={styles.registerText}>
                Don't have an account? Register Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
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
    width: '75%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#ff4757',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
    width:195
  },
  loginButtonText: {
    color: '#fff',
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