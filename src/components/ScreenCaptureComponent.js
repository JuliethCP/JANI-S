import React, { useEffect, useRef, useState } from "react";

function ScreenCaptureComponent() {
  const videoRef = useRef(null);
  const [screenStream, setScreenStream] = useState(null);

  const startScreenCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      videoRef.current.srcObject = stream;
      setScreenStream(stream);
    } catch (error) {
      console.error("Error al capturar la pantalla:", error);
    }
  };

  const stopScreenCapture = () => {
    if (screenStream) {
      const tracks = screenStream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setScreenStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopScreenCapture();
    };
  }, []);

  return (
    <div>
      <button onClick={startScreenCapture}>Iniciar Captura de Pantalla</button>
      <button onClick={stopScreenCapture}>Detener Captura de Pantalla</button>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
}

export default ScreenCaptureComponent;
