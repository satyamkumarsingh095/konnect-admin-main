import React, { useEffect } from "react";
import { Modal, Button, Row, Form, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { AddPageValidation } from "../../commondata/formvalidations";
import { useFormik } from "formik";
// import { useGetAllPagesQuery, useAddNewPageMutation } from "../../redux/features/PagesEndPoints";
import Loader from "../../layouts/layoutcomponents/loader";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import PageHeader from "../../layouts/layoutcomponents/pageheader"

export default function ViewSinglePage() {
    const dispatch = useDispatch();
    // const { isOpen, data } = useSelector((state) => state.allCommonModal);
    const localtion = useLocation()
    // const { refetch } = useGetAllPagesQuery()


    const initialValues = {
        type: "",
        status: "",
        title: "",
        content: ""
    }

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, isValid } = useFormik({
        initialValues: initialValues,
        validationSchema: AddPageValidation,
        onSubmit: async (values) => {
            console.log("vlaues", values);

            // try {
            //     const response = await addNewPage({
            //         type: values.type,
            //         status: values.status,
            //         title: values.title,
            //         content: values.content
            //     });
            //     if (response?.data?.http_status_code === 201) {
            //         toast.success(response?.data?.message);
            //         refetch();
            //         resetForm();
            //         dispatch(closeModal());
            //     } else {
            //         console.error('Unexpected response', response);
            //     }
            // } catch(error) {
            //     console.error('Error submitting form', error);
            // }
        }

    });


    useEffect(() => {
        setFieldValue('type', localtion?.state?.type);
        setFieldValue('status', localtion?.state?.status);
        setFieldValue('title', localtion?.state?.title);
        setFieldValue('content', localtion?.state?.content);
    }, [])

    return (
        <>
            {/* {loading && <Loader />} */}
            <Row className="align-items-center">
                <Col> <PageHeader titles="Pages" active="View Pages" items={["Home", "Pages List"]} links={['/dashboard', "/all-pages"]} /> </Col>
                <Col className="text-end d-flex justify-content-end gap-1">
                    {/* <Button className="btn btn-success" variant="" onClick={() => dispatch(openModal({ componentName: 'AddPage' }))}>Add New Page</Button> */}
                </Col>
            </Row >
            <Row>
                <Col>
                    <Card>
                        <Card.Body>

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col as={Col} md={6}>
                                        <Form.Group>
                                            <Form.Label>Page Type <span className="text-danger">*</span></Form.Label>
                                            <Form.Select
                                                name="type"
                                                value={values.type}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            >
                                                <option value="">Select</option>
                                                <option value="about-us">About Us</option>
                                                <option value="terms-conditions">Terms & Condition</option>
                                                <option value="cookie-policy">Cookies & Policies</option>
                                                <option value="contact-us">Contact Us</option>
                                                <option value="privacy-policy">Privacy Policy</option>
                                            </Form.Select>
                                            {
                                                errors.type && touched.type && (
                                                    <p className="text-danger">{errors.type}</p>
                                                )
                                            }
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                                            <Form.Select
                                                name="status"
                                                value={values.status}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            >
                                                <option value="">Select</option>
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </Form.Select>
                                            {
                                                errors.status && touched.status && (
                                                    <p className="text-danger">{errors.status}</p>
                                                )
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col as={Col} md={12}>
                                        <Form.Group>
                                            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                            {
                                                errors.title && touched.title && (
                                                    <p className="text-danger">{errors.title}</p>
                                                )
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col as={Col} md={12}>
                                        <Form.Group>
                                            <Form.Label>Content <span className="text-danger">*</span></Form.Label>
                                            <textarea
                                                type="text"
                                                name="content"
                                                value={values.content}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="border border-black rounded-3 w-100"
                                                rows={5}
                                                disabled
                                            />
                                            {
                                                errors.content && touched.content && (
                                                    <p className="text-danger">{errors.content}</p>
                                                )
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {/* <Row>
                            <Col as={Col} className="text-center">
                                <Button type="submit">Save</Button>
                            </Col>
                        </Row> */}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >

            {/* <Modal show={isOpen}>
                <Modal.Header className="bg-primary">
                    <Modal.Title as="h4" className="fw-semibold lh-1 my-auto text-center text-light">
                        View Page
                    </Modal.Title>
                    <Button onClick={() => dispatch(closeModal())} className="btn-close text-light" variant="">
                        <i className="fe fe-x"></i>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col as={Col} md={6}>
                                <Form.Group>
                                    <Form.Label>Page Type <span className="text-danger">*</span></Form.Label>
                                    <Form.Select
                                        name="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled
                                    >
                                        <option value="">Select</option>
                                        <option value="about-us">About Us</option>
                                        <option value="terms-conditions">Terms & Condition</option>
                                        <option value="cookie-policy">Cookies & Policies</option>
                                        <option value="contact-us">Contact Us</option>
                                        <option value="privacy-policy">Privacy Policy</option>
                                    </Form.Select>
                                    {
                                        errors.type && touched.type && (
                                            <p className="text-danger">{errors.type}</p>
                                        )
                                    }
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={values.status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled
                                    >
                                        <option value="">Select</option>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </Form.Select>
                                    {
                                        errors.status && touched.status && (
                                            <p className="text-danger">{errors.status}</p>
                                        )
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col as={Col} md={12}>
                                <Form.Group>
                                    <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled
                                    />
                                    {
                                        errors.title && touched.title && (
                                            <p className="text-danger">{errors.title}</p>
                                        )
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col as={Col} md={12}>
                                <Form.Group>
                                    <Form.Label>Content <span className="text-danger">*</span></Form.Label>
                                    <textarea
                                        type="text"
                                        name="content"
                                        value={values.content}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border border-black rounded-3 w-100"
                                        rows={5}
                                        disabled
                                    />
                                    {
                                        errors.content && touched.content && (
                                            <p className="text-danger">{errors.content}</p>
                                        )
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col as={Col} className="text-center">
                                <Button type="submit">Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal> */}
        </>
    );
}
