import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Modal, Form, Container } from 'react-bootstrap';

function CompanyModal({ onSave, onClose }) {
    const [tenure, setTenure] = useState('');
    const [monthlyCharges, setMonthlyCharges] = useState('');
    const [contract, setContract] = useState('');
    const [internetService, setInternetService] = useState('');
    const [techSupport, setTechSupport] = useState('');

    const handleRegister = () => {
        try {
            if (!tenure || !monthlyCharges || !contract || !internetService || !techSupport) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Please complete all the fields.",
                });
                return;
            }

            const formData = {
                tenure,
                monthlyCharges,
                contract,
                internetService,
                techSupport
            };
    
            onSave(formData);
    
            setTenure('');
            setMonthlyCharges('');
            setContract('');
            setInternetService('');
            setTechSupport('');

            Swal.fire({
                icon: "success",
                title: "Customer registered successfully",
                text: "The customer has been registered successfully.",
            }).then(() => {
                onClose();
            });

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
