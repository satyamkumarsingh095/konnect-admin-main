import React from "react";
import { Modal, Button, Row, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import { AddPlanSchemaValidation } from '../../commondata/formvalidations';
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "../../layouts/layoutcomponents/loader";

export default function AddPlan() {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.allCommonModal);

    const initialValues = {
        title: "",
        description: "",
        duration: "",
        price: "",
        level: ""
    };

    // const PlanSchemaValidation = Yup.object().shape({
    //     title: Yup.string().required("Title is required"),
    //     description: Yup.string().required("Description is required"),
    //     duration: Yup.string().required("Duration is required"),
    //     price: Yup.number().required("Price is required").positive("Price must be a positive number"),
    //     level: Yup.string().required("Level is required")
    // });

    const {
        values,
        errors,
        handleBlur,
        touched,
        handleChange,
        handleSubmit,
        resetForm,
        setFieldValue, 
        setFieldTouched,
        isValid
    } = useFormik({
        initialValues: initialValues,
        validationSchema: AddPlanSchemaValidation,
        onSubmit: async (values) => {
            // Submit form logic here
            // try {
                // Mock API call or mutation logic
        //         console.log("Form submitted successfully", values);
        //         resetForm();
        //         dispatch(closeModal());
        //     } catch (error) {
        //         console.error("Error submitting form", error);
        //     }
        }
    });

    return (
        <>
            {/* Show Loader if needed */}
            <Modal show={isOpen} size="lg">
                <Modal.Header className="bg-primary">
                    <Modal.Title as="h4" className="fw-semibold lh-1 my-auto text-center text-light">
                        Add Membership Plan
                    </Modal.Title>
                    <Button onClick={() => dispatch(closeModal())} className="btn-close text-light" variant="">
                        <i className="fe fe-x"></i>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
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
                                    <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                                    <textarea
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="border border-black rounded-3 w-100"
                                        rows={5}
                                    />
                                    {errors.description && touched.description && (
                                        <p className="text-danger">{errors.description}</p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Duration <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="duration"
                                        value={values.duration}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.duration && touched.duration && (
                                        <p className="text-danger">{errors.duration}</p>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Price <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.price && touched.price && (
                                        <p className="text-danger">{errors.price}</p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Level <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="level"
                                        value={values.level}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.level && touched.level && (
                                        <p className="text-danger">{errors.level}</p>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <Button type="submit">Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
