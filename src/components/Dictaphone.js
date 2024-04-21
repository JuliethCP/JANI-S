import {React, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const Dictaphone = () => {
  const [responseText, setResponseText] = useState('');
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const processTranscription = (transcription) => {
    const words = transcription.toLowerCase().split(' ');
    let variableName = '';
    let variableValue = '';
  
    // Función para convertir el nombre del mes de formato texto a formato numérico
    const getMonthNumber = (monthWord) => {
      const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
      return monthNames.indexOf(monthWord.toLowerCase()) + 1; // Sumar 1 para obtener el mes en formato numérico
    };
  
    for (let i = 0; i < words.length; i++) {
      if (words[i] === 'house' && i + 6 < words.length) {
        variableName = 'house'; 
        variableValue = {
            "taxvaluedollarcnt": parseFloat(words[i + 3]), 
            "taxamount": parseFloat(words[i + 6])
        };
        break;
      }
      if (words[i] === 'delay' && i + 1 < words.length) {
        variableName = 'delay'; 
        variableValue = parseInt(words[i + 1]);
        break;
      }
      if (words[i] === 'bitcoin' && i + 3 < words.length) {
        const year = parseInt(words[i + 1]);
        const monthWord = words[i + 2];
        const day = parseInt(words[i + 3]);
        
        if (!isNaN(year) && !isNaN(day) && !isNaN(getMonthNumber(monthWord)) && !isNaN(Date.parse(`${getMonthNumber(monthWord)} ${day}, ${year}`))) {
          variableName = 'bitcoin';
          variableValue = `${year}-${getMonthNumber(monthWord)}-${day}`;
          break;
        }
      }
      if (words[i] === 'avocado' && i + 3 < words.length) {
        const year = parseInt(words[i + 1]);
        const monthWord = words[i + 2];
        const day = parseInt(words[i + 3]);
        
        if (!isNaN(year) && !isNaN(day) && !isNaN(getMonthNumber(monthWord)) && !isNaN(Date.parse(`${getMonthNumber(monthWord)} ${day}, ${year}`))) {
          variableName = 'avocado';
          variableValue = `${year}-${getMonthNumber(monthWord)}-${day}`;
          break;
        }
      }
      if (words[i] === 'stock' && i + 3 < words.length) {
        const year = parseInt(words[i + 1]);
        const monthWord = words[i + 2];
        const day = parseInt(words[i + 3]);
        
        if (!isNaN(year) && !isNaN(day) && !isNaN(getMonthNumber(monthWord)) && !isNaN(Date.parse(`${getMonthNumber(monthWord)} ${day}, ${year}`))) {
          variableName = 'SP500Stock';
          variableValue = `${year}-${getMonthNumber(monthWord)}-${day}`;
          break;
        }
      }
    }
  
    // Devolver el nombre de la variable y su valor como un objeto
    return {
      variable_name: variableName,
      variable_value: variableValue
    };
  };
  
  const sendApi = async () => {
    const { variable_name, variable_value } = processTranscription(transcript);
    
    if (variable_name && variable_value) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/predict', {
          variable_name: variable_name,
          variable_value: variable_value
        });
        const roundedResponse = parseFloat(response.data.prediction).toFixed(4);
        console.log('Response:', response.data.prediction);
        if (variable_name === 'house') {
          setResponseText(`La predicción de ${variable_name} con los datos TaxValueDollarCnt: ${variable_value.taxvaluedollarcnt}, TaxAmount: ${variable_value.taxamount} es ${roundedResponse}`);
        } else {
          setResponseText(`La predicción de ${variable_name} con los datos ${variable_value} es ${roundedResponse}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('No se encontró el nombre de la variable y su valor en la transcripción.');
    }
  };
  

  if (!listening) {
    if (transcript !== '') {
      sendApi();
    }
  }

  const cleanTranscription = () => {
    resetTranscript();
    setResponseText('');
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={cleanTranscription}>Reset</button>
      <p>{transcript}</p>
      <p>{responseText}</p>
    </div>
  );
};

export default Dictaphone;
