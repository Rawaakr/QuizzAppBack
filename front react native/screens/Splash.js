import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated,  Dimensions} from 'react-native';
//import Login from './Login';

const Splash = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start(() => {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    });
  }, []);

  return (
    <View style={styles.container}>
                <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
      <Animated.View
        style={{
          ...styles.logoContainer,
          opacity: fadeAnim,
        }}
      >
        <Image
          source={require('./Quizz.png')}
          style={styles.logo}
        />
        <Text style={styles.brandName}>Quizz App</Text>
      </Animated.View>
    </View>
  );
};

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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    bottom:10
  },
  brandName: {
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Splash