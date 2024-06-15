import { useEffect, useRef, useState } from "react";
import './App.css';
import { Container, Col, Stack } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Dictaphone from "./components/Dictaphone";

function App() {
  const [responseText, setResponseText] = useState('');
  const [bitcoinOpen, setBitcoinOpen] = useState(false);
  const [avocadoOpen, setAvocadoOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);
  const [houseOpen, setHouseOpen] = useState(false);
  const [delayOpen, setDelayOpen] = useState(false);
  const [movieOpen, setMovieOpen] = useState(false);
  const [automobileOpen, setAutomobileOpen] = useState(false);
  const [crimesOpen, setCrimesOpen] = useState(false);
  const [recoveredOpen, setRecoveredOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [weaponsOpen, setWeaponsOpen] = useState(false);
  const videoEl = useRef(null);


  useEffect(() => {
    const startCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoEl.current.srcObject = stream;
          videoEl.current.play();
        } catch (error) {
          console.error("Error accessing camera: ", error);
        }
      }
    };

    const captureImage = () => {
      const video = videoEl.current;
      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/png");
      }
      return null;
    };

    const sendImage = async (image) => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/emotion", {
          image: image
        });
        setResponseText(`The current emotion is: ${response.data.emotion}`);
      } catch (error) {
        console.error("Error sending image to API: ", error);
      }
    };

    const handleInterval = () => {
      const image = captureImage();
      if (image) {
        sendImage(image);
      }
    };

    startCamera();

    const interval = setInterval(handleInterval, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <body>

      <Container fluid style={{ height: '100vh' }} >
        <Stack className="justify-content-between" direction="horizontal" style={{ height: '100vh' }}>
          {/* Columna de instrucciones */}
          <Col >
            <Container className="p-3 my-4" style={{
              border: '3px ',
              borderRadius: '8px',
              backgroundColor: '#8c908f',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              fontSize: 'small',
              color: 'white',
              maxWidth: '275px',
              minWidth: '275px',
              marginLeft: '0', // Añadido para alinear a la izquierda
            }}>

              <h4>Instructions</h4>
              <hr />
              <h6>Select the model for Instructions</h6>
              <hr />
              <h5 className="hoverable" onClick={() => setDelayOpen(!delayOpen)}>DELAY</h5>
              {delayOpen &&
                <div>
                  <h6 className="hoverable-data" onClick={() => setDelayOpen(false)}>
                    <hr />
                    delay - minutes <br /> Example: delay, 35
                    <hr />
                  </h6>
                </div>
              }

              <h5 className="hoverable" onClick={() => setStockOpen(!stockOpen)}>STOCK</h5>
              {stockOpen &&
                <div>
                  <h6 className="hoverable-data" onClick={() => setStockOpen(false)}>
                    <hr />
                    stock - year - month - day <br /> Example: stock, 2022 august 22
                    <hr />
                  </h6>
                </div>
              }

              <h5 className="hoverable" onClick={() => setHouseOpen(!houseOpen)}>HOUSE</h5>
              {houseOpen &&
                <div>
                  <h6 className="hoverable-data" onClick={() => setHouseOpen(false)}>
                    <hr />
                    house - taxValue - taxAmount <br /> Example: house, taxValue 2000, taxAmount 5000
                    <hr />
                  </h6>
                </div>
              }

              <h5 className="hoverable" onClick={() => setMovieOpen(!movieOpen)}>STROKE</h5>
              {movieOpen &&
                <div>
                  <h6 className="hoverable-data" onClick={() => setMovieOpen(false)}>
                    <hr />
                    Stroke "anything"
                    <hr />
                  </h6>
                </div>
              }

              <h5 className="hoverable" onClick={() => setCrimesOpen(!crimesOpen)}>CRIMES</h5>
              {crimesOpen &&
                <div>
                  <h6 className="hoverable-data" onClick={() => setCrimesOpen(false)}>
                    <hr />
                    crimes - year - month <br /> Example: crimes, year 2025 month 8
                    <hr />
                  </h6>
                </div>
              }

              <h5 className="hoverable" onClick={() => setBitcoinOpen(!bitcoinOpen)}>BITCOIN</h5>
              {bitcoinOpen &&
                <div>
                  <h6 className="hoverable-data" onClick={() => setBitcoinOpen(false)}>
                    <hr />
                    bitcoin - year - month - day  <br /> Example: bitcoin, 2020 march 8
                    <hr />
                  </h6>
                </div>
              }

              <h5 className="hoverable" onClick={() => setCompanyOpen(!companyOpen)}>COMPANY</h5>
              {companyOpen &&
                <div>
                  <h6 className="hoverable-data" onClick={() => setCompanyOpen(false)}>
                    <hr />
                    company "anything"
                    <hr />
                  </h6>
                </div>
              }

              <h5 className="hoverable" onClick={() => setAvocadoOpen(!avocadoOpen)}>AVOCADO</h5>
              {avocadoOpen &&
                <div>
                  <h6 className="hoverable-data" onClick={() => setAvocadoOpen(false)}>
                    <hr />
                    avocado - year - month - day <br /> Example: avocado, 2021 july 15
                    <hr />
                  </h6>
                </div>
              }

              <h5 className="hoverable" onClick={() => setRecoveredOpen(!recoveredOpen)}>COVID</h5>
              {recoveredOpen &&
                <div>
                  <h6 className="hoverable-data" onClick={() => setRecoveredOpen(false)}>
                    <hr />
                    covid - confirmed - deaths  <br /> Example: covid, confirmed 50 deaths 3
                    <hr />
                  </h6>
                </div>
              }

              <h5 className="hoverable" onClick={() => setAutomobileOpen(!automobileOpen)}>AUTO</h5>
              {automobileOpen &&
                <div>
                  <h6 className="hoverable-data" onClick={() => setAutomobileOpen(false)}>
                    <hr />
                    automobile - year -  kilometers <br /> Example: automobile, year 2015  kilometers 5000
                    <hr />
                  </h6>
                </div>
              }

              <h5 className="hoverable" onClick={() => setWeaponsOpen(!weaponsOpen)}>WEAPONS</h5>
              {weaponsOpen &&
                <div>
                  <h6 className="hoverable-data" onClick={() => setWeaponsOpen(false)}>
                    <hr />
                    weapons "anything"
                    <hr />
                  </h6>
                </div>
              }

            </Container>
          </Col>

          <Col className="d-flex justify-content-center align-items-center">
            <Dictaphone />
          </Col>

          <Col>
            <Container className="p-0" style={{ overflow: 'hidden', position: 'relative', width: '100%' }}>
              <div style={{ paddingTop: '50%', paddingBottom: '30%', position: 'relative' }}>
                <video
                  ref={videoEl}
                  id="videoEl"
                  style={{
                    border: "2px solid #bfbfbf",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                    maxWidth: "85%",
                    position: "absolute",
                    top: "0",
                    right: "0"
                  }}
                ></video>

              </div>
            </Container>

            <Container className="p-3" style={{
              border: '3px ',
              borderRadius: '8px',
              color: 'white',
              backgroundColor: '#8c908f',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              maxWidth: '430px',
              marginRight: '0', // Añadido para alinear a la derecha
            }}>

              {responseText && <p>JANI'S:  {responseText}</p>}


            </Container>


          </Col>
        </Stack>
      </Container>
    </body>
  );
}

export default App;