import {View, Text, Dimensions, FlatList, TouchableOpacity,Alert} from 'react-native';
import React ,{useState,useEffect,useRef }from 'react';
const {height, width} = Dimensions.get('window');
const QuestionItem = ({data, selectedOption}) => {
  const [reponses, setReponses] = useState([]);
  const [repCorr, setRepCorr] = useState([]);
  const [rep, setRep] = useState([]);
  const [corr, setCorr] = useState([]);
  const [test, setTest] = useState(false);
  const [test2, setTest2] = useState(test);

  //const [score, setScore] = useState(0);


  useEffect(() => {
    let url = `https://ad87-196-225-142-36.ngrok-free.app/api/reponses/${data.id}`;
    fetch(url)
      .then(response => response.json())
      .then(data => setReponses(data[0]))
      .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    let url = `https://ad87-196-225-142-36.ngrok-free.app/api/repCorr/${data.id}`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => setRepCorr(data[0]))
        .catch(error => console.error(error)); 
        
    }, []);

  return (
    <View style={{width: width}}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '600',
          color: 'black',
          marginLeft: 20,
          marginRight: 20,
        }}>
        {'Question : ' + data.qst}
      </Text>
      <View style={{marginTop: 20}}>
        <FlatList
          data={reponses.map((item) => {
            return item.reponse
          })}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 60,
                  elevation: 3,
                 /* backgroundColor: data.marked == index + 1 ? (rep == corr ? 'green': Alert.alert(
                    'Mauvaise Réponse',
                    "La bonne réponse est : "+corr,
                    [
                      {text: 'OK'},
                    ],
                    {cancelable: false},
                  )&&'red'&&setTest(true)) : '#fff',*/
                  backgroundColor:(rep === corr&&data.marked === index + 1)?('green'&&setTest(true)):(rep !== corr&&data.marked === index + 1)?'red':'#fff',
                  marginTop: 10,
                  marginBottom: 10,
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingLeft: 15,
                  flexDirection: 'row',
                }}
                onPress={() => {
                  setTest2(test);
                  selectedOption(index + 1);
                  setRep(item);
                  console.log(rep);
                  repCorr.map((item) => {
                    setCorr(item.reponse);
                  });
                  console.log(corr);

                  //setTest((rep===corr)||(rep!==corr));

              
                    /*if(backgroundColor!=='green'){
                      Alert.alert(
                        'Mauvaise Réponse',
                        "La bonne réponse est : "+corr,
                        [
                          {text: 'OK'},
                        ],
                        {cancelable: false},
                      )
                    }else{
                      Alert.alert(
                        'Bonne Réponse',
                        'Bravo : '+corr,
                        [
                          {text: 'OK'},
                        ],
                        {cancelable: false},
                      )
                    }*/
                  //rep == corr ? setScore(score+1):setScore(score+0);
                }}
                disabled={test2}
                >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: data.marked == index + 1 ? '#fff' : 'cyan',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: '600', color: '#000'}}>
                    {
                        index == 0
                      ? 'A'
                      : index == 1
                      ? 'B'
                      : index == 2
                      ? 'C'
                      : 'D'}
                  </Text>
                </View>
                <Text style={{fontSize: 18, fontWeight: '600', marginLeft: 20,
                color:'#000',
                }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default QuestionItem;/*
import {View, Text, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
const {height, width} = Dimensions.get('window');
const QuestionItem = ({data, selectedOption}) => {
  return (
    <View style={{width: width}}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '600',
          color: 'black',
          marginLeft: 20,
          marginRight: 20,
        }}>
        {'Ques: ' + data.question}
      </Text>
      <View style={{marginTop: 20}}>
        <FlatList
          data={data.Options}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 60,
                  elevation: 3,
                  backgroundColor: data.marked == index + 1 ? 'purple' : '#fff',
                  marginTop: 10,
                  marginBottom: 10,
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingLeft: 15,
                  flexDirection: 'row',
                }}
                onPress={() => {
                  selectedOption(index + 1);
                }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: data.marked == index + 1 ? '#fff' : 'cyan',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: '600', color: '#000'}}>
                    {index == 0
                      ? 'A'
                      : index == 1
                      ? 'B'
                      : index == 2
                      ? 'C'
                      : 'D'}
                  </Text>
                </View>
                <Text style={{fontSize: 18, fontWeight: '600', marginLeft: 20,color:data.marked == index + 1 ?'#fff':'#000'}}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default QuestionItem;*/
