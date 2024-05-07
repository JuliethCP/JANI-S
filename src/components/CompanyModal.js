import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Modal, Form, Container } from 'react-bootstrap';
import axios from 'axios'; 

function CompanyModal({ onSave, onClose }) {
    const [tenure, setTenure] = useState('');
    const [monthlyCharges, setMonthlyCharges] = useState('');
    const [contract, setContract] = useState('');
    const [internetService, setInternetService] = useState('');
    const [techSupport, setTechSupport] = useState('');

    const handleRegister = async () => {
        try {
            if (!tenure || !monthlyCharges || !contract || !internetService || !techSupport) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Please complete all the fields.",
                });
                return;
            }

            // Hacer la llamada al API
            const response = await axios.post('http://127.0.0.1:5000/predict', {
                variable_name: 'company',
                variable_value: {
                    "tenure": parseFloat(tenure),
                    "MonthlyCharges": parseFloat(monthlyCharges),
                    "Contract": contract,
                    "InternetService": internetService,
                    "TechSupport": techSupport
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
        <Modal show={true} onHide={onClose} size="md">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Customer Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='my-2'>
                        <Form.Label>Tenure</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter tenure"
                            value={tenure}
                            onChange={(e) => setTenure(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <Form.Label>Monthly Charges</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter monthly charges"
                            value={monthlyCharges}
                            onChange={(e) => setMonthlyCharges(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='my-2'>
                        <Form.Label>Contract</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter contract type"
                            value={contract}
                            onChange={(e) => setContract(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='my-2'>
                        <Form.Label>Internet Service</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter internet service type"
                            value={internetService}
                            onChange={(e) => setInternetService(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='my-2'>
                        <Form.Label>Tech Support</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter tech support availability"
                            value={techSupport}
                            onChange={(e) => setTechSupport(e.target.value)}
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

export default CompanyModal;
