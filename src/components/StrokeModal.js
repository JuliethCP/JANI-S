import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Modal, Form, Container } from 'react-bootstrap';

function StrokeModal({ onSave, onClose}) {
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


    const handleRegister =  () => {
        try {
            // Verificar si los campos están completos
            if (!gender || !age || !hypertension || !heart_disease || !ever_married ||
                !job_type || !residence_type || !avg_glucose_level || !bmi || !smoking_status) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Please complete all the spaces.",
                });
                return;
            }

            const formData = {
                gender,
                age,
                hypertension,
                heart_disease,
                ever_married,
                job_type,
                residence_type,
                avg_glucose_level,
                bmi,
                smoking_status
            };
    
            onSave(formData);
    

            setGender('');
            setAge('');
            setHypertension('');
            setHeartDisease('');
            setMarried('');
            setJob_type('');
            setResidence_type('');
            setGlucosa_level('');
            setBMI('');
            setSmoking('');

            Swal.fire({
                icon: "success",
                title: "Cliente registrado correctamente",
                text: "El cliente ha sido registrado correctamente.",
            }).then(() => {
               
            });

            onClose();


        } catch (error) {
            console.error("Error saving form:", error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error al intentar guardar el formulario.",
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
