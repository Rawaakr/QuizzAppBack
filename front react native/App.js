import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';
import HomeAdmin from './screens/HomeAdmin';
import Niveau from './screens/Niveau';
import Certificat from './screens/Certificat';
import Register from './screens/Register';
import Test from './Test';
import TestAngularFacile from './TestAngularFacile';
import Splash from './screens/Splash';
import Profile from './screens/Profile';
import Competence from './screens/Competence';
import Editeur from './screens/Editeur';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} />

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Admin Home" component={HomeAdmin} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Competence" component={Competence} />

      <Stack.Screen name="Niveau" component={Niveau} />
      <Stack.Screen name="Certificat" component={Certificat} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="TestAngularFacile" component={TestAngularFacile} />
      <Stack.Screen name="Editeur" component={Editeur} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;