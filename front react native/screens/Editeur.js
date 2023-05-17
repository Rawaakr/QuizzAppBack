import React, { useState } from 'react';
import { ScrollView,View, TextInput, Button, Text, StyleSheet,TouchableOpacity } from 'react-native';

export default function Editeur({navigation,route}) {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('java');
  const { mailconns } = route.params;

  const handleRunCode = () => {
    fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: '591eece9941e51cd69c9d793aac53649',
        clientSecret: '8d7c6a990609c4f142076255206142765787d899e1f5a04496e84b9e2ec2e7e5',
        script: code,
        language: language,
        versionIndex: '0',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setOutput(data.output);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderLineNumber = () => {
    const lines = code.split('\n');
    return (
      <View style={styles.lineNumberContainer}>
        {lines.map((_, i) => (
          <Text style={styles.lineNumberText} key={i}>
            {i + 1}
          </Text>
        ))}
      </View>
    );
  };

  return (

    <ScrollView style={styles.container}>
      <View style={styles.textInputContainer}>
        {renderLineNumber()}
        <TextInput
          style={styles.codeInput}
          multiline
          value={code}
          onChangeText={(text) => setCode(text)}
          textAlignVertical="top"
        />
      </View>
      <View style={styles.bottomBar}>
        <TextInput
          style={styles.languageInput}
          value={language}
          onChangeText={(text) => setLanguage(text)}
          placeholder="Enter programming language"
        />
        <Button
          title="Run"
          onPress={handleRunCode}
          color="#ff4757"
        />
      </View>
      <Text style={styles.output}>{output}</Text>
      <TouchableOpacity 
          onPress={()=> navigation.replace('Competence',{mailconn:mailconns})} 
          style={{    backgroundColor: '#ff4757',
          marginTop: 10,
          paddingVertical: 10,
          borderRadius: 4,top:-15}}
      >
        <Text style={{    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',}}>Retour</Text>
      </TouchableOpacity>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  lineNumberContainer: {
    backgroundColor: '#EFEFEF',
    marginRight: 10,
    paddingRight: 10,
  },
  lineNumberText: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'right',
    marginBottom: 2,
  },
  codeInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'left',
    textAlignVertical: 'top',
    backgroundColor: '#000',
    color:'#fff',
    height:450,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  languageInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  output: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
    textAlign: 'left',
    color: '#333',
    top:-15
  },
});

