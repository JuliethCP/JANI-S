import { React, useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { VscDebugStart, VscDebugPause, VscDebugRestart } from 'react-icons/vsc';
import './componentCSS/Recorder.css';
import StrokeModal from "./StrokeModal";
import CompanyModal from './CompanyModal';

const Dictaphone = () => {
  const [responseText, setResponseText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [hypertension, setHypertension] = useState('');
  const [heart_disease, setHeartDisease] = useState('');
  const [ever_married, setMarried] = useState('');
  const [job_type, setJob_type] = useState('');
  const [residence_type, setResidence_type] = useState('');
  const [avg_glucose_level, setGlucosa_level] = useState('');
  const [bmi, setBMI] = useState('');
  const [smoking_status, setSmoking] = useState('');
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [tenure, setTenure] = useState('');
  const [monthlyCharges, setMonthlyCharges] = useState('');
  const [contract, setContract] = useState('');
  const [internetService, setInternetService] = useState('');
  const [techSupport, setTechSupport] = useState('');

  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModal2 = () => {
    setShowModal(false);
  };


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript !== '') {
      processTranscription(transcript);
    }
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSaveModalData = (data) => {
    setGender(data.gender);
    setAge(data.age);
    setHypertension(data.hypertension);
    setHeartDisease(data.heart_disease);
    setMarried(data.ever_married);
    setJob_type(data.job_type);
    setResidence_type(data.residence_type);
    setGlucosa_level(data.avg_glucose_level);
    setBMI(data.bmi);
    setSmoking(data.smoking_status);
    setShowModal(false);

  };
  const handleSaveModalData2 = (data) => {
    setTenure(data.tenure);
    setMonthlyCharges(data.monthlyCharges);
    setContract(data.contract);
    setInternetService(data.internetService);
    setTechSupport(data.techSupport);
    setShowModal(false);
};



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
      if (words[i] === 'stroke' && i + 1 < words.length) {
        variableName = 'stroke';
        setShowModal(true);
        break;
      }
      if (words[i] === 'company' && i + 1 < words.length) {
        variableName = 'company';
        setShowModal2(true);
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


    if (variableName === 'stroke') {
      if (showModal) {
      console.log('Vaaaaaaaaaaaaariable value:', variableValue, 'Variable name:', variableName);
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!showModal) {
            clearInterval(interval);
            resolve();
          }
        }, 100); // Verificar cada 100ms si el modal está cerrado
      });
      variableValue = {
        "gender": parseFloat(gender),
        "age": parseFloat(age),
        "hypertension": parseFloat(hypertension),
        "heart_disease": parseFloat(heart_disease),
        "ever_married": parseFloat(ever_married),
        "work_type": parseFloat(job_type),
        "Residence_type": parseFloat(residence_type),
        "avg_glucose_level": parseFloat(avg_glucose_level),
        "bmi": parseFloat(bmi),
        "smoking_status": parseFloat(smoking_status)
      };
    
      console.log('Variable value:', variableValue, 'Variable name:', variableName);
    }
    
    if (variableName === '' || Object.keys(variableValue).length === 0) {
        console.log('No se encontró el nombre de la variable y su valor en la transcripción.');
      } else {
        setResponseText('Please wait a moment...');
        sendApi(variableName, variableValue);
      }
    } else {
      if (variableName === '' || variableValue === '') {
        console.log('No se encontró el nombre de la variable y su valor en la transcripción.');
      } else {
        sendApi(variableName, variableValue);
      }
    }

  };

  const sendApi = async (variable_name, variable_value) => {
    setResponseText('');

    try {
      setIsWaitingResponse(true);

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

      {showModal2 && (
        <CompanyModal
          onSave={handleSaveModalData2}
          onClose={() => setShowModal2(false)}
          onHide={handleCloseModal2}
        />
      )}

    </>
  );
};

export default Dictaphone;
