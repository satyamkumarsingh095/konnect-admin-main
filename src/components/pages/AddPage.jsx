import React, { useEffect, useRef } from "react";
import { Button, Row, Form, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AddPageValidation } from "../../commondata/formvalidations";
import toast from "react-hot-toast";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // SunEditor Styles
import PageHeader from "../../layouts/layoutcomponents/pageheader";

export default function AddPage() {
    const navigate = useNavigate();
    
    // Initialize form values
    const initialValues = {
        type: "",
        status: "",
        title: "",
        content: ""
    };

    // Set up Formik for form validation and submission
    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddPageValidation,
        onSubmit: async (values) => {
            // Replace the code below with your API call or mutation for adding the page.
            try {
                // Replace this with the actual API call to add the new page
                // const response = await addNewPage(values);

                // Simulate a successful response for demonstration
                toast.success("Page added successfully!");
                navigate("/all-pages"); // Redirect to the pages list after adding a new page
            } catch (error) {
                console.error("Error adding page", error);
                toast.error("Failed to add page");
            }
        }
    });

    // Handle SunEditor content change
    const handleEditorChange = (content) => {
        setFieldValue("content", content); // Update Formik value for content
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <PageHeader titles="Pages" active="Add New Page" items={["Home", "Pages List"]} links={['/dashboard', "/all-pages"]} />
                </Col>
                <Col className="text-end d-flex justify-content-end gap-1">
                    {/* Add any other buttons if necessary */}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Page Type <span className="text-danger">*</span></Form.Label>
                                            <Form.Select
                                                name="type"
                                                value={values.type}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <option value="">Select</option>
                                                <option value="about-us">About Us</option>
                                                <option value="terms-conditions">Terms & Condition</option>
                                                <option value="cookie-policy">Cookies & Policies</option>
                                                <option value="contact-us">Contact Us</option>
                                                <option value="privacy-policy">Privacy Policy</option>
                                            </Form.Select>
                                            {errors.type && touched.type && (
                                                <p className="text-danger">{errors.type}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                                            <Form.Select
                                                name="status"
                                                value={values.status}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <option value="">Select</option>
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </Form.Select>
                                            {errors.status && touched.status && (
                                                <p className="text-danger">{errors.status}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.title && touched.title && (
                                                <p className="text-danger">{errors.title}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Content <span className="text-danger">*</span></Form.Label>
                                            <SunEditor
                                                name="content"
                                                value={values.content}
                                                onChange={handleEditorChange}
                                                setOptions={{
                                                    height: 300,
                                                    buttonList: [
                                                        ['font', 'align', 'bold', 'italic', 'underline', 'strike', 'subscript', 'superscript'],
                                                        ['fontSize', 'formatBlock', 'list', 'table', 'link'],
                                                        ['image', 'video', 'audio', 'fullScreen', 'showBlocks'],
                                                    ]
                                                }}
                                            />
                                            {errors.content && touched.content && (
                                                <p className="text-danger">{errors.content}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Button type="submit">Add Page</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
