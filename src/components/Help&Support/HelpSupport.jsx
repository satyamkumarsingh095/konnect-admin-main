import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import PageHeader from '../../layouts/layoutcomponents/pageheader';

export default function HelpSupport() {
    const [contactFields, setContactFields] = useState([
        { type: '', link: '' },
    ]);
    const [faqFields, setFaqFields] = useState([{ type: '', title: '', description: '' }]);

    const addContactField = () => {
        setContactFields([...contactFields, { type: '', link: '' }]);
    };

    const handleContactChange = (index, field, value) => {
        const updatedFields = [...contactFields];
        updatedFields[index][field] = value;
        setContactFields(updatedFields);
    };

    const removeContactField = (index) => {
        const updatedFields = contactFields.filter((_, i) => i !== index);
        setContactFields(updatedFields);
    };

    // FAQ Functions
    const addFaqField = () => {
        setFaqFields([...faqFields, { type: '', title: '', description: '' }]);
    };

    const handleFaqChange = (index, field, value) => {
        const updatedFields = [...faqFields];
        updatedFields[index][field] = value;
        setFaqFields(updatedFields);
    };

    const removeFaqField = (index) => {
        const updatedFields = faqFields.filter((_, i) => i !== index);
        setFaqFields(updatedFields);
    };

    return (
        <>
            <Row className='align-items-center'>
                <Col as={Col} md={6}>
                    <PageHeader titles="Help & Support" active="Help & Support" items={["Home"]} links={['/dashboard']} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h5 className='mb-4'>Contact Us</h5>

                            {contactFields.map((field, index) => (
                                <Row key={index} className='mb-3 align-items-center'>
                                    <Col md={4}>
                                        <Form.Control
                                            type='text'
                                            placeholder='Type'
                                            value={field.type}
                                            onChange={(e) => handleContactChange(index, 'type', e.target.value)}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Form.Control
                                            type='text'
                                            placeholder='Link'
                                            value={field.link}
                                            onChange={(e) => handleContactChange(index, 'link', e.target.value)}
                                        />
                                    </Col>
                                    <Col md={1} className="text-center">
                                        {index === 0 && (
                                            <Button
                                                variant="success"
                                                onClick={addContactField}
                                                className="w-100 d-flex align-items-center justify-content-center"
                                            >
                                                <i className="fa fa-plus me-2"></i>
                                            </Button>
                                        )}
                                    </Col>

                                    <Col md={1} className="text-center">
                                        {index > 0 && (
                                            <Button
                                                variant="danger"
                                                onClick={() => removeContactField(index)}
                                                className="w-100 d-flex align-items-center justify-content-center"
                                            >
                                                <i className="fa fa-minus me-2"></i>
                                            </Button>
                                        )}
                                    </Col>
                                
                                </Row>
                            ))}
                                    {/* <Button variant='primary' onClick={addContactField} className='d-flex align-items-center btn btn-success'>
                                            <i className='fa fa-plus me-2'></i>
                                        </Button> */}
                                
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h5 className='mb-4'>FAQs</h5>

                            {faqFields.map((field, index) => (
                                <Row key={index} className='mb-3 align-items-center'>
                                    <Col md={3}>
                                        <Form.Control
                                            type='text'
                                            placeholder='Type'
                                            value={field.type}
                                            onChange={(e) => handleFaqChange(index, 'type', e.target.value)}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            type='text'
                                            placeholder='Title'
                                            value={field.title}
                                            onChange={(e) => handleFaqChange(index, 'title', e.target.value)}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            type='text'
                                            placeholder='Description'
                                            value={field.description}
                                            onChange={(e) => handleFaqChange(index, 'description', e.target.value)}
                                        />
                                    </Col>
                                    <Col md={1} className="text-center">
                                        
                                            {index === 0 && (
                                                <Button
                                                    variant="success"
                                                    onClick={addFaqField}
                                                    className="w-100 d-flex align-items-center justify-content-center"
                                                >
                                                    <i className="fa fa-plus me-2"></i>
                                                </Button>
                                            )}
                                       
                                    </Col>

                                    <Col md={1} className="text-center">
                                        {index > 0 && (
                                            <Button
                                                variant="danger"
                                                onClick={() => removeFaqField(index)}
                                                className="w-100 d-flex align-items-center justify-content-center"
                                            >
                                                <i className="fa fa-minus me-2"></i>
                                            </Button>
                                        )}
                                    </Col>
                                
                                </Row>
                            ))}
                                    {/* <Button variant='primary' onClick={addContactField} className='d-flex align-items-center btn btn-success'>
                                            <i className='fa fa-plus me-2'></i>
                                        </Button> */}
                                
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
