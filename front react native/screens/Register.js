
  /*  for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'non') {
        ajouternom(mots[i+1]);
      }
    }
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'prénom') {
        ajouterprenom(mots[i+1]);
      }
    }*/
    /*let login22 = '';
    for (let i = 0; i < mots.length; i++) {
        login22=login22+mots[i]
        if ((mots[i]=="gmail.com" || mots[i]=="yahoo.com" || mots[i]=="yahoo.fr")){
          login22=login22+mots[i]
          break;  
      }      
    }*/
    /*
    let nbr=0;
    for (let i = 0; i < mots.length; i++) {
      if ((mots[i]=="gmail.com" || mots[i]=="yahoo.com" || mots[i]=="yahoo.fr")){
        nbr=i;
      }
    }
    let nbr2=0;
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'email'||mots[nbr]!="mail") {
        nbr2=i;
        break;
      }
    }
    let login22 = '';
    for(let j=nbr2+1;j<=nbr;j++){
      login22+=mots[j];
    }
    console.log(login22)
    ajouteremail(login22)

    let nbr4=0;
    let num = '';
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'numéro'&&mots[i+1]==='de'&&mots[i+2]==='téléphone') {
        nbr4=i+3;
        num+=mots[nbr4]
        while(isNaN(mots[nbr4])){
          num+=mots[nbr4]
          nbr4+=1;
        }
      }
    }
    console.log(num);
    ajoutertel(num)
    for (let i = 0; i < mots.length; i++) {
      if((mots[i] === 'mot'&&mots[i+1] === 'de'&&mots[i+2] === 'passe')){
        ajouterpass(mots[i+3]);
      }
    }
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'enregistrer'||mots[i] === 'register') {
        Enregistrer();
        break;
      }
    }
    for (let i = 0; i < mots.length; i++) {
      if (mots[i] === 'login') {
        ajouterlog(mots[i+1]);
      }
    }*/
    import React,{useState,useEffect} from 'react';
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
      Alert,
      ScrollView,
      ImageBackground,
    } from 'react-native';
    import { Icon,SocialIcon } from 'react-native-elements';
    import axios from 'axios';
    import Sound from 'react-native-sound';
    import Voice from '@react-native-voice/voice';
    
    export default function Login({navigation}) {
      const [nom, setInputValue] = useState('');
      const [prenom, setInputValue1] = useState('');
      const [email, setInputValue2] = useState('');
      const [telephone, setInputValue3] = useState('');
      const [image, setInputValue4] = useState('');
      const [password, setInputValue5] = useState('');
      const [adresse, setInputValue6] = useState('');
      //const [skills, setInputValue7] = useState('');
      const [social, setInputValue8] = useState('');
      const [login, setInputValue9] = useState('');
      const [description, setInputValue10] = useState('');
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const [error, setError] = useState(null);
      const [error2, setError2] = useState(null);
      const phoneRegex = /^(5|9|2)\d{7}$/;
      useEffect(() => {
        const sound = new Sound(require('./son1.m4a'), Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log('Impossible de lire le son', error);
            return;
          }
          sound.play(success => {
            if (success) {
              console.log('Son terminé avec succès');
            } else {
              console.log('Erreur lors de la lecture du son');
            }
            sound.release();
          });
        });
    
        return () => {
          sound.stop();
        };
      }, []);
    
      const ajouternom = (text)=>{
        setInputValue(text);
      }
      const ajouterprenom = (text)=>{
        setInputValue1(text);
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
      const ajoutertel = (text)=>{
        if (phoneRegex.test(text)) {
          setError2(null);
          setInputValue3(text);
        } else {
          setInputValue3(text);
          setError2('Numéro de telephone invalide');
        }
      }
      const ajouterimg = (text)=>{
        setInputValue4(text);
      }
      const ajouterpass = (text)=>{
        setInputValue5(text);
      }
      const ajouteraddr = (text)=>{
        setInputValue6(text);
      }

      const ajoutersoc = (text)=>{
        setInputValue8(text);
      }
      const ajouterlog = (text)=>{
        setInputValue9(text);
      }
      const ajouterdesc = (text)=>{
        setInputValue10(text);
      }
      const Enregistrer=() =>{
        axios.get(` https://a055-102-156-123-23.ngrok-free.app/api/useer?nom=${nom}&prenom=${prenom}&telephone=${telephone}&image=${image}&adresse=${adresse}&social=${social}&email=${email}&login=${login}&password=${password}&description=${description}`)
        .then((res)=>{
        console.log(res.data)
        Alert.alert('Bienvenue au application', 'Enregistrement réaliser par succées', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        })
      }
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
        console.log('recognized text:', recognizedText);
        const mots = recognizedText.split(" ");
          for (let i = 0; i < mots.length; i++) {
    
          if (mots[i] === 'authentifier') {
            navigation.replace('Login');
          }
        }
        for (let i = 0; i < mots.length; i++) {
          if (mots[i] === 'alt') {
            mots[i]="@";
          }
        }
        let ch0="";
        for (let i = 0; i < mots.length; i++) {
          if (mots[i] === 'expérience'&&mots[i+1]==="professionnelle") {
            let nbri=i+1;
            while(mots[nbri]!="compétences"){
              ch0=ch0+""+mots[nbri];
              nbri+=1;
            }
          }
        }
        console.log(ch0);
        ajouteraddr(ch0);
        let ch1="";
        for (let i = 0; i < mots.length; i++) {
          if (mots[i] === 'non') {
            let nbri=i+1;
            while(mots[nbri]!="prénom"){
              ch1=ch1+""+mots[nbri];
              nbri+=1;
            }
          }
        }
        console.log(ch1);
        ajouternom(ch1);
        let ch2="";
        for (let i = 0; i < mots.length; i++) {
          if (mots[i] === 'prénom') {
            let nbri=i+1;
            while(mots[nbri]!="email"&&mots[nbri]!="mail"){
              ch2=ch2+""+mots[nbri];
              nbri+=1;
            }
          }
        }
        console.log(ch2);
        ajouterprenom(ch2);
        let ch7='';
        for (let i = 0; i < mots.length; i++) {
          if (mots[i] === 'email'||mots[i]==='mail') {
            let nbr=i+1
            ch7=ch7+mots[nbr];
            if ((mots[i]=="gmail.com" || mots[i]=="yahoo.com" || mots[i]=="yahoo.fr")){
              ch7=ch7+mots[i]
              break;  
            }
          }
        }
        console.log(ch7);
        ajouteremail(ch7);
        let ch3="";
        for (let i = 0; i < mots.length; i++) {
          if (mots[i] === 'numéro'&&mots[i+1] === 'de'&&mots[i+2] === 'téléphone') {
            let nbri=i+4;
            while(mots[nbri]!="éducation"){
              ch3=ch3+""+mots[nbri];
              nbri+=1;
            }
          }
        }
        console.log(ch3);
        ajoutertel(ch3);
        let ch4="";
        for (let i = 0; i < mots.length; i++) {
          if (mots[i] === 'expérience'&&mots[i+1] === 'professionnelle') {
            let nbri=i+3;
            while(mots[nbri]!="compétences"){
              ch4=ch4+""+mots[nbri];
              nbri+=1;
            }
          }
        }
        console.log(ch4);
        ajouteraddr(ch4);
        let ch6="";
        for (let i = 0; i < mots.length; i++) {
          if (mots[i]==="compte"&&mots[i]==="social") {
            let nbri=i+6;
            while(mots[nbri]!="à"&&mots[nbri+1]!="propos"&&mots[nbri+2]!="de"&&mots[nbri+3]!="toi"){
              ch6=ch6+""+mots[nbri];
              nbri+=1;
            }
          }
        }
        console.log(ch6);
        ajoutersoc(ch6);
        let ch8="";
        for (let i = 0; i < mots.length; i++) {
          if (mots[i]==="à"&&mots[i+1]==="propos"&&mots[i+2]==="de"&&mots[i+3]!="toi") {
            let nbri=i+5;
            while(mots[nbri]!="login"){
              ch8=ch8+""+mots[nbri];
              nbri+=1;
            }
          }
        }
        console.log(ch8);
        ajouterlog(ch8);
        let ch9="";
        for (let i = 0; i < mots.length; i++) {
          if (mots[i]!="mot"&&mots[i+1]!="de"&&mots[i+2]!="passe") {
            let nbri=i+3;
            while(nbri<=mots.length){
              ch9=ch9+""+mots[nbri];
              nbri+=1;
            }
          }
        }
        console.log(ch9);
        ajouterpass(ch9);
      };
      
    
      const [sound, setSound] = useState(null);
    
      useEffect(() => {
        // Charge le fichier audio en utilisant require() et le chemin relatif du fichier audio
        setSound(new Sound(require('./son1.m4a'), Sound.MAIN_BUNDLE, (error) => {
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
        setTimeout(startRecording, 11500); // Attendre 2 secondes avant d'exécuter functionTwo
      };
      return (
        <ScrollView >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.bigCircle}></View>
            <View style={styles.smallCircle}></View>
            <View style={styles.centerizedView}>
    
            <View style={styles.authBox}>
                <ImageBackground style={styles.logoBox} source={{uri:'https://img.freepik.com/vecteurs-premium/logo-quiz-icone-bulle-dialogue_149152-811.jpg?w=2000'}}>
                </ImageBackground>
                <Text style={styles.loginTitleText}>Sign Up 
                <TouchableOpacity
                    title={isRecording ? 'Enregistrement en cours...' : 'Commencer l\'enregistrement'}
                    onPress={handlePress}
                    disabled={isRecording}
                  >
                  <Image
                    style={{
                      width:35,
                      height:35,
                      left:10,
                      bottom:-10
                    }}
                    source={require('./micro.png')}
                  />
                  </TouchableOpacity>
                </Text>
                
                <View style={styles.hr}></View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Nom : </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez votre nom"
                    onChangeText={ajouternom}
                    value={nom}
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Prenom : </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez votre prenom"
                    onChangeText={ajouterprenom}
                    value={prenom}
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Email : </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez votre Email"
                    onChangeText={ajouteremail}
                    value={email}
                  />
                {error && <Text style={
                  {
                    color: 'red',
                    marginTop: 10,
                  }
                }>{error}</Text>}
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Numero de telephone : </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez votre Numero de Telephone"
                    onChangeText={ajoutertel}
                    value={telephone}
                  />
                {error2 && <Text style={{
                  color: 'red',
                  marginTop: 10,
                }}>{error2}</Text>}
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Image : </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez votre image"
                    onChangeText={ajouterimg}
                    value={image}
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>adresse : </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez votre adresse "
                    onChangeText={ajouteraddr}
                    value={adresse}
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Compte Social : </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez tes compte social"
                    onChangeText={ajoutersoc}
                    value={social}
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>A propos de toi : </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez une description sur toi"
                    onChangeText={ajouterdesc}
                    value={description}
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Login : </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez un psudoNom"
                    onChangeText={ajouterlog}
                    value={login}
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Mot de passe : </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez un mot de passe"
                    onChangeText={ajouterpass}
                    value={password}
                  />
                </View>
                <TouchableOpacity style={styles.registerButton} onPress={Enregistrer}>
                  <Text style={styles.loginButtonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={()=> navigation.replace('Login')}>
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        </TouchableWithoutFeedback>
        </ScrollView>
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
        paddingBottom:250,
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
        backgroundColor: '#ff4757',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
      },
      registerButton: {
        backgroundColor: '#1E87FE',
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