import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const WeaponsModal = ({ onClose }) => {
  const [capturedImages, setCapturedImages] = useState([]);
  const [responseText, setResponseText] = useState('');
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const handleClose = () => {
    clearInterval(intervalRef.current);
    setCapturedImages([]);
    onClose();
  };

  const handleVideoReady = () => {
    startCapturingImages();
  };

  const startCapturingImages = () => {
    intervalRef.current = setInterval(() => {
      captureImage();
    }, 10000); 
  };

  const captureImage = async () => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      const currentTime = videoElement.currentTime;
      const canvas = document.createElement('canvas');
      const width = videoElement.videoWidth;
      const height = videoElement.videoHeight;
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');

      context.drawImage(videoElement, 0, 0, width, height);

      const imageUrl = canvas.toDataURL('image/png');
      setCapturedImages((prevImages) => [...prevImages, { time: currentTime, imageUrl }]);
      
      // Send image to API
      await sendImage(imageUrl);
    } else {
      console.log('No video element found');
    }
  };
  

  const sendImage = async (image) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/weapons", {
        image: image
      });
      const { class: className, count } = response.data;
      console.log("API response: ", response.data);
      setResponseText(`El resultado es: Clase - ${className}, Cantidad - ${count}`);
    } catch (error) {
      console.error("Error sending image to API: ", error);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.addEventListener('loadeddata', handleVideoReady);

    return () => {
      videoElement.removeEventListener('loadeddata', handleVideoReady);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      <Modal show={true} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Reproductor de Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video
            ref={videoRef}
            id="local-video"
            controls
            width="100%"
            height="400"
            src="/armas.mp4"
          />
          <div className="mt-3">
            <h5>Capturas de pantalla cada 10 segundos:</h5>
            <div className="d-flex flex-wrap">
              {capturedImages.map((image, index) => (
                <div key={index} className="m-2">
                  <p>Tiempo: {image.time.toFixed(1)}s</p>
                  <img src={image.imageUrl} alt={`Captura en ${image.time}s`} width="150" />
                </div>
              ))}
            </div>
            <h5 className="mt-3">Resultado de la API:</h5>
            <p>{responseText}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WeaponsModal;
