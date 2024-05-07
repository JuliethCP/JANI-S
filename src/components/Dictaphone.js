import { React, useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { VscDebugStart, VscDebugPause, VscDebugRestart } from 'react-icons/vsc';
import './componentCSS/Recorder.css';
import StrokeModal from "./StrokeModal";

const Dictaphone = () => {
  const [responseText, setResponseText] = useState('');
  const [showModal, setShowModal] = useState(false);


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    const processTranscription = async (transcription) => {
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
        if (words.includes('stroke')) {
          console.log('Se encontró la palabra stroke');
          setShowModal(true);
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
  
        
      if (variableName === '' || variableValue === '') {
          console.log('No se encontró el nombre de la variable y su valor en la transcripción.');
        } else {
          setResponseText('Please wait a moment...');
          sendApi(variableName, variableValue);
        }
  
    };


    if (!listening && transcript !== '') {
      processTranscription(transcript);
    }
  }, [listening, transcript ]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSaveModalData = (data) => {
    console.log('Data:', data);
    setShowModal(false);
    setResponseText(data);
  
  };


  const sendApi = async (variable_name, variable_value) => {
    setResponseText('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        variable_name: variable_name,
        variable_value: variable_value
      });

      console.log('Response:', response.data);
      if (response.data.stroke_risk) {
        setResponseText(`The stroke risk prediction is ${response.data.stroke_risk} with a probability of ${response.data.probability.toFixed(4)}`);
      } else {
        // En caso contrario, mostrar un mensaje genérico
        const roundedResponse = parseFloat(response.data.prediction).toFixed(4);
        if (variable_name === 'house') {
          setResponseText(`The prediction for ${variable_name} with the data TaxValueDollarCnt: ${variable_value.taxvaluedollarcnt}, TaxAmount: ${variable_value.taxamount} is ${roundedResponse}`);
        } else {
          setResponseText(`The prediction for ${variable_name} with the data ${variable_value} is ${roundedResponse}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const cleanTranscription = () => {
    resetTranscript();
    setResponseText('');
  };

  return (
    <>
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


      {showModal && (
        <StrokeModal
          onSave={handleSaveModalData}
          onClose={() => setShowModal(false)}
          onHide={handleCloseModal}
        />
      )}

    </>
  );
};

export default Dictaphone;
