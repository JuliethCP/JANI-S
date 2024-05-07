import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Modal, Form, Container } from 'react-bootstrap';
import axios from 'axios'; 

function StrokeModal({ onSave, onClose }) {
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

    const handleRegister = async () => {
        try {
            if (!gender || !age || !hypertension || !heart_disease || !ever_married ||
                !job_type || !residence_type || !avg_glucose_level || !bmi || !smoking_status) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Please complete all the spaces.",
                });
                return;
            }

            // Hacer la llamada al API
            const response = await axios.post('http://127.0.0.1:5000/predict', {
                variable_name: 'stroke',
                variable_value: {
                    "gender": parseFloat(gender),
                    "age": parseFloat(age),
                    "hypertension": parseFloat(hypertension),
                    "heart_disease": parseFloat(ever_married),
                    "ever_married": parseFloat(age),
                    "work_type": parseFloat(job_type),
                    "Residence_type": parseFloat(residence_type),
                    "avg_glucose_level": parseFloat(avg_glucose_level),
                    "bmi": parseFloat(bmi),
                    "smoking_status": parseFloat(smoking_status)
                }
            });

            if (response.data.stroke_risk) {
                console.log('Response:', response.data);
                onClose();
                onSave(`The stroke risk prediction is ${response.data.stroke_risk} with a probability of ${response.data.probability.toFixed(4)}`);
            } else {
                // En caso contrario, mostrar un mensaje genérico
                const roundedResponse = parseFloat(response.data.prediction).toFixed(4);
                onClose();
                onSave(`The prediction for stroke with the provided data is ${roundedResponse}`);
            }
        } catch (error) {
            console.error("Error saving form:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "There was an error while trying to save the form.",
            });
        }
    };

    
    return (
        <Modal
        show={true} onHide={onClose} size="md"
    >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Data for Stroke
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group className='my-2'>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your gender (1 for male, 0 for female)"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='my-2'>
                        <Form.Label>Hypertension</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter if you have hypertension (1 for yes, 0 for no)"
                            value={hypertension}
                            onChange={(e) => setHypertension(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='my-2'>
                        <Form.Label>Heart disease</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter if you have heart disease (1 for yes, 0 for no)"
                            value={heart_disease}
                            onChange={(e) => setHeartDisease(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='my-2'>
                        <Form.Label>Married</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter if you have ever been married (1 for yes, 0 for no)"
                            value={ever_married}
                            onChange={(e) => setMarried(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>Job type</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="(0 for children, 1 for government, 2 for private, 3 for self-employed, 4 for never worked)"
                            value={job_type}
                            onChange={(e) => setJob_type(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>Residence</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your type of residence (0 for rural, 1 for urban)"
                            value={residence_type}
                            onChange={(e) => setResidence_type(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>Average glucose level</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your average glucose level"
                            value={avg_glucose_level}
                            onChange={(e) => setGlucosa_level(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>BMI</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter your body mass index (BMI)"
                            value={bmi}
                            onChange={(e) => setBMI(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <Form.Label>Smoking Status</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="(0 for never, 1 for former smoker, 2 for current smoker)"
                            value={smoking_status}
                            onChange={(e) => setSmoking(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Container className="d-flex justify-content-center">
                        <Button className='mt-3' variant="primary" onClick={handleRegister}>Send</Button>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default StrokeModal;
