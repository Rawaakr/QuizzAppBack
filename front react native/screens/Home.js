import React, { useState, useEffect } from 'react';
//import { useRoute } from '@react-navigation/native';
//import ProgressBar from 'react-native-progress/Bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
  FlatList, 
} from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';

import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
//import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated } from 'react-native-reanimated';

function TabA({navigation}) {
 
        const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let url = ` https://a055-102-156-123-23.ngrok-free.app/api/competences/${searchTerm}`;
    /*if (searchTerm) {
      url += `${searchTerm}`;
    }*/
    fetch(url)
      .then(response => response.json())
      .then(data => setPeople(data[0]))
      .catch(error => console.error(error));
  }, [searchTerm]);
  const renderPerson = ({ item }) => (
    <View style={{ padding: 10 }}>
    <TouchableOpacity onPress={()=> navigation.replace('Niveau',{Nomtest: item.nom})}>
      <Text style={{ fontSize: 18 }}>{item.nom}</Text>
      <Image source={{ uri: item.image }} style={{ width: 120, height: 50 }} />
    </TouchableOpacity>
    </View>
  );
      return (
      <View>
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
    </View>
                 
      )    
}
function TabB({navigation}) {
  const data = ['Java', 'J2EE', 'Python']
      const _data = data.sort()
      let finalData = [];
      let stickeyIndex = []
      _data.forEach((name, i) => {
          if (i == 0 || name.substr(0, 1) != _data[i - 1].substr(0, 1)) {
              stickeyIndex.push(i + stickeyIndex.length);
              finalData.push({ id: i.toString() + 'head', name: name.substr(0, 1), type: 'head' })
          }
          finalData.push({ id: i.toString() + 'name', name, type: 'name' })
      })
      return (
          <View style={{flex: 1,}}>
              <FlatList
                  data={finalData}
                  keyExtractor={(item) => item.id}
                  stickyHeaderIndices={stickeyIndex}
                  renderItem={({ item }) => (
                      <View style={item.type == 'name' ? {padding: 20,paddingVertical: 20,backgroundColor: '#eee',borderColor: '#fff'} : {padding: 20,paddingVertical: 10,backgroundColor: '#fff',elevation: 2}}>
                          <TouchableOpacity onPress={()=> navigation.replace('Certificat',{nom: item.name})}><Text style={item.type == 'name' ? {fontSize: 18} : {fontSize: 20,fontWeight: 'bold'}}>{item.name}</Text></TouchableOpacity>
                      </View>
                  )}
              />
              
          </View>
      )   
}

function TabC() {
  const html = `
  <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

  <div class="resume">
     <div class="resume_left">
       <div class="resume_profile">
         <img src="https://i.imgur.com/eCijVBe.png" alt="profile_pic">
       </div>
       <div class="resume_content">
         <div class="resume_item resume_info">
           <div class="title">
             <p class="bold">stephen colbert</p>
             <p class="regular">Designer</p>
           </div>
           <ul>
             <li>
               <div class="icon">
                 <i class="fas fa-map-signs"></i>
               </div>
               <div class="data">
                 21 Street, Texas <br /> USA
               </div>
             </li>
             <li>
               <div class="icon">
                 <i class="fas fa-mobile-alt"></i>
               </div>
               <div class="data">
                 +324 4445678
               </div>
             </li>
             <li>
               <div class="icon">
                 <i class="fas fa-envelope"></i>
               </div>
               <div class="data">
                 stephen@gmail.com
               </div>
             </li>
             <li>
               <div class="icon">
                 <i class="fab fa-weebly"></i>
               </div>
               <div class="data">
                 www.stephen.com
               </div>
             </li>
           </ul>
         </div>
         <div class="resume_item resume_skills">
           <div class="title">
             <p class="bold">skill's</p>
           </div>
           <ul>
             <li>
               <div class="skill_name">
                 HTML
               </div>
               <div class="skill_progress">
                 <span style="width: 80%;"></span>
               </div>
               <div class="skill_per">80%</div>
             </li>
             <li>
               <div class="skill_name">
                 CSS
               </div>
               <div class="skill_progress">
                 <span style="width: 70%;"></span>
               </div>
               <div class="skill_per">70%</div>
             </li>
             <li>
               <div class="skill_name">
                 SASS
               </div>
               <div class="skill_progress">
                 <span style="width: 90%;"></span>
               </div>
               <div class="skill_per">90%</div>
             </li>
             <li>
               <div class="skill_name">
                 JS
               </div>
               <div class="skill_progress">
                 <span style="width: 60%;"></span>
               </div>
               <div class="skill_per">60%</div>
             </li>
             <li>
               <div class="skill_name">
                 JQUERY
               </div>
               <div class="skill_progress">
                 <span style="width: 88%;"></span>
               </div>
               <div class="skill_per">88%</div>
             </li>
           </ul>
         </div>
         <div class="resume_item resume_social">
           <div class="title">
             <p class="bold">Social</p>
           </div>
           <ul>
             <li>
               <div class="icon">
                 <i class="fab fa-facebook-square"></i>
               </div>
               <div class="data">
                 <p class="semi-bold">Facebook</p>
                 <p>Stephen@facebook</p>
               </div>
             </li>
             <li>
               <div class="icon">
                 <i class="fab fa-twitter-square"></i>
               </div>
               <div class="data">
                 <p class="semi-bold">Twitter</p>
                 <p>Stephen@twitter</p>
               </div>
             </li>
             <li>
               <div class="icon">
                 <i class="fab fa-youtube"></i>
               </div>
               <div class="data">
                 <p class="semi-bold">Youtube</p>
                 <p>Stephen@youtube</p>
               </div>
             </li>
             <li>
               <div class="icon">
                 <i class="fab fa-linkedin"></i>
               </div>
               <div class="data">
                 <p class="semi-bold">Linkedin</p>
                 <p>Stephen@linkedin</p>
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
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis illo fugit officiis distinctio culpa officia totam atque exercitationem inventore repudiandae?</p>
      </div>
      <div class="resume_item resume_work">
          <div class="title">
             <p class="bold">Work Experience</p>
           </div>
          <ul>
              <li>
                  <div class="date">2013 - 2015</div> 
                  <div class="info">
                       <p class="semi-bold">Lorem ipsum dolor sit amet.</p> 
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, voluptatibus!</p>
                  </div>
              </li>
              <li>
                <div class="date">2015 - 2017</div>
                <div class="info">
                       <p class="semi-bold">Lorem ipsum dolor sit amet.</p> 
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, voluptatibus!</p>
                  </div>
              </li>
              <li>
                <div class="date">2017 - Present</div>
                <div class="info">
                       <p class="semi-bold">Lorem ipsum dolor sit amet.</p> 
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, voluptatibus!</p>
                  </div>
              </li>
          </ul>
      </div>
      <div class="resume_item resume_education">
        <div class="title">
             <p class="bold">Education</p>
           </div>
        <ul>
              <li>
                  <div class="date">2010 - 2013</div> 
                  <div class="info">
                       <p class="semi-bold">Web Designing (Texas University)</p> 
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, voluptatibus!</p>
                  </div>
              </li>
              <li>
                <div class="date">2000 - 2010</div>
                <div class="info">
                       <p class="semi-bold">Texas International School</p> 
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, voluptatibus!</p>
                  </div>
              </li>
          </ul>
      </div>
      <div class="resume_item resume_hobby">
        <div class="title">
             <p class="bold">Hobby</p>
           </div>
         <ul>
           <li><i class="fas fa-book"></i></li>
           <li><i class="fas fa-gamepad"></i></li>
           <li><i class="fas fa-music"></i></li>
           <li><i class="fab fa-pagelines"></i></li>
        </ul>
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
    <WebView
      source={{ html }}
    />
  );
}


const Tab = createBottomTabNavigator();

export default function ReactNavigationBottomTabs({navigation, route }) {
  return (
    <Tab.Navigator
      tabBarOptions={
        {
          // Default Color is blue you can change it by following props
          // activeTintColor: '#ff4757',
          // inactiveTintColor: '#ff6b81',
          // Default Background Color is white you can change it by following props
          // activeBackgroundColor: '#ced6e0',
          // inactiveBackgroundColor: '#ced6e0',
        }
      }
    >
      <Tab.Screen
        name='Acceuil'
        component={TabA}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Certificat'
        component={TabB}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='message' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='CV'
        component={TabC}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='person' color={color} size={size} />
          ),
        }}
      />
  
    </Tab.Navigator>
  );
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
});
