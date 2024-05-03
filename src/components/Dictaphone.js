import { React, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { VscDebugStart, VscDebugPause, VscDebugRestart } from 'react-icons/vsc';
import './componentCSS/Recorder.css';

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
      if (words[i] === 'auto' && i + 6 < words.length) {
        variableName = 'auto';
        variableValue = {
          "Year": parseFloat(words[i + 3]),
          "Kms_Driven": parseFloat(words[i + 6])
        };
        break;
      }
      if (words[i] === 'crimes' && i + 6 < words.length) {
        variableName = 'crimes';
        variableValue = {
          "year": parseFloat(words[i + 3]),
          "month": parseFloat(words[i + 6])
        };
        break;
      }
      if (words[i] === 'covid' && i + 6 < words.length) {
        variableName = 'covid';
        variableValue = {
          "Confirmed": parseFloat(words[i + 3]),
          "Deaths": parseFloat(words[i + 6])
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

    <div className='data-microfono'>
      {transcript && <p className="transcript">YOU: {transcript}</p>}
      {responseText && <p className="responseText">JANI'S:  {responseText}</p>}

      {listening && !transcript && <p className="transcript">YOU: [Talking...]</p>}
      {transcript && !responseText && !listening && <p className="responseText">JANI'S: [The question could not be understood. Please try again or check the question format]</p>}

      <div className="recorder-container">
        <button className="record-button" onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}>
          {listening ? <VscDebugPause style={{ fontSize: '24', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '4px' }} /> : <VscDebugStart style={{ fontSize: '24', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '4px' }} />}
        </button>
        <button className="reset-button" onClick={cleanTranscription}>
          <VscDebugRestart style={{ fontSize: '24', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '4px' }} />
        </button>
      </div>
    </div>

  );
};

export default Dictaphone;
