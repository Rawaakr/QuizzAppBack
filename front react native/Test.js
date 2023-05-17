import React, { useState, useEffect,useRef  } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

export default function Test({navigation,route}) {
  const webViewRef = useRef(null);

  const [questions, setQuestions] = useState([]);
  const {nivnum} = route.params;
  const {numcomp} = route.params;
  const {mailconns} = route.params;

  const [totalScore, setTotalScore] = useState('');
  const [webViewLoaded, setWebViewLoaded] = useState(false);
  const [htmlContent, setHtmlContent] = useState([]);
  const [htmlContent2, setHtmlContent2] = useState([]);

  const [iduser, setIduser] = useState([]);

useEffect(() => {
  let url = `https://e649-197-2-52-71.ngrok-free.app/api/test/show/${numcomp}/${nivnum}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      setQuestions(data);
    })
}, []);
useEffect(() => {
  if (questions.length > 0) {
    const quiz = questions[0].map(item => ({
      qst: item.qst,
      id:item.id
    }));
    let htmlContent = `const quiz = ${JSON.stringify(quiz)};`;
    setHtmlContent(htmlContent);
  }
}, [questions]);
useEffect(() => {
  if (questions.length > 0) {
    const quiz = questions[0].map(async item => {
      const response = await fetch(`https://e649-197-2-52-71.ngrok-free.app/api/reponses/${item.id}`);
      const data = await response.json();
      const options = data[0].map(option => option.reponse);
      const correctAnswerIndex = data[0].findIndex((response) => response.etat === 1);
      return {
        qst: item.qst,
        id: item.id,
        options: options,
        answers: correctAnswerIndex
      };
    });
    Promise.all(quiz).then(quizWithOpts => {
      let htmlContent = `const quiz = ${JSON.stringify(quizWithOpts)};`;
      setHtmlContent(htmlContent);
    });
  }
}, [questions]);
const onWebViewMessage = (event) => {
  const valeur = event.nativeEvent.data;
  console.log('La valeur calculée est:', valeur);
  setTotalScore(valeur);
  let url = `https://e649-197-2-52-71.ngrok-free.app/api/users/email/${mailconns}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      setIduser(data[0]);
      console.log("id : "+iduser.id);
    })
    .catch(error => console.log(error));
};
    const updateScore=() =>{
      if(totalScore){
        axios.get(`https://e649-197-2-52-71.ngrok-free.app/api/score/${numcomp}/${nivnum}/${iduser.id}/${totalScore}`)
        .then((res)=>{
          Alert.alert('Bienvenue au application', 'votre score a ete mis a jour ', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Profile', onPress: () => navigation.replace('Profile',{mailconn:mailconns})},
          ]);
        })
    }
  }
    const html = `
    <html>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,400;1,500;1,700&display=swap'); 
      body{
        margin:0;
        font-size:16px;
        background-color: #009688;
        font-family: 'Montserrat', sans-serif;
        font-weight:400;
      }
      *{
        box-sizing:border-box;
        margin:0;
        padding:0;
        outline:none;
      }
      .custom-box{
        max-width:700px;
        background-color: #ffffff;
        margin: 40px auto;
        padding:30px;
        border-radius:10px;
        animation: fadeInRight 1s ease;
      }
      @keyframes fadeInRight{
        0%{
          transform:translateX(40px);
          opacity:0;
        }
        100%{
          transform:translateX(0px);
          opacity:1;
        }
      }
      .custom-box::before,
      .custom-box::after{
        content:'';
        clear:both;
        display:table;
      }
      .custom-box.hide{
        display : none;
      }
      .home-box h3{
        font-size:18px;
        color:#000000;
        font-weight:500;
        margin-bottom:15px;
        line-height:25px
      }
      .home-box p{
        font-size:16px;
        margin-bottom:10px;
        line-height: 22px;
        color:#000000;
        font-weight:400;
      }
      .home-box p span{
        font-weight:500;
      }
      .home-box .btn{
        margin-top:20px;
      }
      .btn{
        padding:15px 45px;
        background-color:#009688;
        color:#ffffff;
        border:none;
        border-radius:10px;
        font-family: 'Montserrat', sans-serif;
        font-size:16px;
        cursor:pointer;
        display:inline-block;
      }
  
      .quiz-box .question-number,
      .quiz-box .question-text,
      .quiz-box .option-container,
      .quiz-box .next-question-btn,
      .quiz-box .answers-indicator{
        width:100%;
        float:left;
      }
  
      .quiz-box .question-number{
        font-size:18px;
        color:#009688;
        font-weight:600;
        border-bottom:1px solid #cccccc;
        padding-bottom:10px;
        line-height:25px;
  
      }
      .quiz-box .question-text{
        font-size:22px;
        color:#000000;
        line-height:28px;
        font-weight:400;
        padding:20px  0;
        margin:0;
      }
  
      .quiz-box .option-container .option{
        background-color:#cccccc;
        padding:13px 15px;
        font-size:16px;
        line-height:22px;
        color:#000000;
        border-radius:5px;
        margin-bottom:10px;
        cursor:pointer;
        text-transform:capitalize;
        opacity :0;
        animation: fadeIn 0.3s ease forwards;
        position:relative;
        overflow:hidden;
      }
      .quiz-box .option-container .option.already-answered{
        pointer-events:none;
      }
      @keyframes fadeIn{
        0%{
          opacity:0;
        }
        100%{
          opacity:1;
        }
      }
      .quiz-box .option-container .option.correct::before{
        content:'';
        position:absolute;
        left:0;
        top:0;
        height:100%;
        width:100%;
        background-color:green;
        z-index: -1;
        animation: slideInLeft .5s ease forwards;
      }
  
      @keyframes slideInLeft{
        0%{
          transform: translateX(-100%);
        }
        100%{
          transform: translateX(0%);
        }
      }
  
      .quiz-box .option-container .option.wrong::before{
        content:'';
        position:absolute;
        left:0;
        top:0;
        height:100%;
        width:100%;
        background-color:red;
        z-index: -1;
        animation: slideInLeft .5s ease forwards;
      }
  
      .quiz-box .option-container .option.wrong{
        color:#ffffff;
      }
      .quiz-box .option-container .option.correct{
        color:#ffffff;
      }
    
  
      .quiz-box .btn{
        margin:15px 0;
      }
      .quiz-box .answers-indicator{
        border-top:1px solid #cccccc;
      }
      .quiz-box .answers-indicator div{
        height:40px;
        width:40px;
        display:inline-block;
        background-color:#cccccc;
        border-radius:50%;
        margin-right:3px;
        margin-top:10px;
      }
  
      .quiz-box .answers-indicator div.correct{
        background-color:green;
      
      }
      .quiz-box .answers-indicator div.wrong{
        background-color:red;
      
      }
      .result-box{
        text-align:center;
      }
      .result-box h1{
        font-size:36px;
        line-height:42px;
        color:#009688;
      }
      .result-box table{
        width:100%;
        border-collapse:collapse;
        margin:30px 0;
      }
      .result-box table td{
        border : 1px solid #cccccc;
        padding:8px 15px;
        font-weight:500;
        color:#000000;
        width:50%;
        text-align:left;
        font-size:18px;
      }
      .result-box .btn{
        margin-right:20px;
      }
      .result-box.hide{
        display : none;
      }
      @media(max-width:767px){
        .result-box .btn{
          margin-bottom:15px;
        }
        body{
          padding:15px;
        }
      }
      </style>
     
    <body>
    <div class="home-box custom-box">
      <h3>Instructions:</h3>
      <p>Total nomber of questions : <span class="total-question">5</span></p>
      <button type="button" class="btn" onclick="startQuiz()">start Quizz </button>
    </div>
    <div class="quiz-box custom-box hide">
      <div class="question-number">
        
      </div>
      <div class="question-text">
      </div>
      <div class="option-container">
        
        </div>
      <div class="next-question-btn">
        <button type="button" class="btn" onclick="next()">Next</button>
      </div>
      <div class="answers-indicator">
        
  
      </div>
    </div>
    <div class="result-box custom-box hide ">
      <h1>Quizz Result</h1>
      <table>
        <tr>
          <td>Total Question</td>
          <td><span class="total-question"></span></td>
        </tr>
        <tr>
          <td>Attempt</td>
          <td><span class="total-attempt"></span></td>
        </tr>
        <tr>
          <td>Correct</td>
          <td><span class="total-correct"></span></td>
        </tr>
        <tr>
          <td>Wrong</td>
          <td><span class="total-wrong"></span></td>
        </tr>
        <tr>
          <td>Percentage</td>
          <td><span class="percentage"></span></td>
        </tr>
        <tr>
          <td>Your total Score</td>
          <td><span class="total-score"></span></td>
        </tr>
      </table>
      <button type="button" class="btn" onclick="tryAgain()">Try again</button>
      <button type="button" class="btn" onclick="goHome()">Go to Home</button>
    </div>
    </body>
   <script>
      ${htmlContent}
      
      const questionNumber=document.querySelector(".question-number");
      const questionText=document.querySelector(".question-text");
      const optionContainer=document.querySelector(".option-container");
      const answersIndicatorContainer=document.querySelector(".answers-indicator");
      const homeBox = document.querySelector(".home-box");
      const quizBox = document.querySelector(".quiz-box");
      const resultBox = document.querySelector(".result-box");
    
      let questionCounter=0;
      let currentQuestion;
      let availableQuestions=[];
      let availableOptions=[];
      let correctAnswers=0;
      let attempt =0;
      //push the questions into availableQuestions Array
      function setAvailableQuestions(){
        const totalQuestion=quiz.length;
        for (let i=0;i<totalQuestion;i++){
          availableQuestions.push(quiz[i])
        }
      }
      //set question number and question and options
      function getNewQuestion(){
        questionNumber.innerHTML="Question " +(questionCounter+1) +" of "+ (quiz.length);
        const questionIndex=availableQuestions[Math.floor(Math.random()*availableQuestions.length)];
        currentQuestion=questionIndex;
        questionText.innerHTML=currentQuestion.qst;
        //get the position of questionIndex from the availableQuestions Array
        const index1=availableQuestions.indexOf(questionIndex);
        //remove the questionIndex from the availableQuestion Array, so that the question does not repeat
        availableQuestions.splice(index1,1);
        //console.log(questionIndex);
        const optionLen = currentQuestion.options.length;
        //push options into availableOptions Array
        for(let i=0;i<optionLen;i++){
          availableOptions.push(i);
        }
        
        let animationDelay = 0.15;
        optionContainer.innerHTML = "";
        for(let i=0;i<optionLen;i++){
          const option = document.createElement("div");
          option.innerHTML=currentQuestion.options[i];
          option.id = i;
          option.style.animationDelay=animationDelay+'s';
          animationDelay=animationDelay + 0.15;
          option.className="option";
          optionContainer.appendChild(option);
          option.addEventListener('click',async()=>{
            getResult(option);
          })
        }
    
        //console.log( currentQuestion.options.length);
        questionCounter++;
      }
      //get the result of current question
      function getResult(element){
        const id = element.id;
       // console.log(id);
       // console.log(currentQuestion.answers);
        if(id == currentQuestion.answers){
          // set the green color to the correct option
          element.classList.add("correct");
          // add indicator to correct mark
          updateAnswerIndicator("correct");
          correctAnswers++;
        }
        else 
              // set the red color to the wrong option
          {      element.classList.add("wrong");
                 updateAnswerIndicator("wrong");
    
              //if the answer is incorrect then show the correct by changing its color green
              const optionLen = optionContainer.children.length;
              for(let i=0;i<optionLen;i++){
                if(parseInt(optionContainer.children[i].id) === currentQuestion.answers){
                  optionContainer.children[i].classList.add("correct");
    
                }
              }
          }
            attempt++;
        unclickableOptions();
      }
      //make all the options unclickable onced the user select an option
      function unclickableOptions(){
        const optionLen = optionContainer.children.length;
        for(let i=0;i<optionLen;i++){
          optionContainer.children[i].classList.add("already-answered");
        }
      }
    
      function answersIndicator(){
        answersIndicatorContainer.innerHTML='';
        const totalQuestion= quiz.length;
        for(let i=0;i<totalQuestion;i++){
          const indicator=document.createElement("div");
          answersIndicatorContainer.appendChild(indicator);
        }
      }
      function updateAnswerIndicator(markType){
        answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
      }
      function next(){
        if(questionCounter === quiz.length){
          console.log("quiz over");
          quizOver();
        }
        else{
          getNewQuestion();
        }
      }
      
      function quizOver(){
          //hide quiz quizBox
          quizBox.classList.add("hide");
          resultBox.classList.remove("hide");
          quizResult();
      }
      function quizResult(){
        resultBox.querySelector(".total-question").innerHTML= quiz.length;
        resultBox.querySelector(".total-attempt").innerHTML= attempt;
        resultBox.querySelector(".total-correct").innerHTML= correctAnswers;
        resultBox.querySelector(".total-wrong").innerHTML= attempt - correctAnswers;
        resultBox.querySelector(".percentage").innerHTML=((correctAnswers/quiz.length)*100).toFixed(2) +"%";
        resultBox.querySelector(".total-score").innerHTML=(correctAnswers*2) + "/" + 20;
        let corr=correctAnswers*2;
        window.ReactNativeWebView.postMessage(corr);

      }
    
      function resetQuiz(){
        questionCounter=0;
        correctAnswers=0;
        attempt=0;
      }
      
      function tryAgain(){
        resultBox.classList.add("hide");
        quizBox.classList.remove("hide");
        resetQuiz();
        startQuiz();
      }
    
      function goHome(){
        resultBox.classList.add("hide");
        homeBox.classList.remove("hide");
        resetQuiz();
      }
    
      function startQuiz(){
        homeBox.classList.add("hide");
        quizBox.classList.remove("hide");
        setAvailableQuestions();
        getNewQuestion();
        answersIndicator();
      }
      window.onload=function(){
        homeBox.querySelector(".total-question").innerHTML=quiz.length;
      }
      </script>
  </html>
  
    `;
    return (

      <View style={styles.container}>   
    <WebView
      ref={webViewRef}
      source={{ html }}
      style={styles.webview}
      onMessage={onWebViewMessage}
      />         
      <TouchableOpacity style={styles.button} onPress={()=>updateScore()}>
        <Text style={styles.buttonText}>Obtenir votre nouvelle cv</Text>
      </TouchableOpacity>
      {totalScore !== null && (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Total Score: {totalScore}/20
          </Text>
        </View>
      )}
  </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webview: {
      //flex: 1,
      height:50,
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
      left:70
    },
  });