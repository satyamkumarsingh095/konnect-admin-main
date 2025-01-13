import React, { useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import { useFormik } from "formik";
import { AddPlanSchemaValidation } from "../../commondata/formvalidations"; // Assuming you have form validation for Plan Schema
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export default function ViewSinglePlanSchema() {
    const dispatch = useDispatch();
    const location = useLocation();

    const initialValues = {
        type: "",
        status: "",
        planName: "",
        description: "",
        price: ""
    };

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, resetForm, setFieldValue, setFieldTouched, isValid } = useFormik({
        initialValues: initialValues,
        validationSchema: AddPlanSchemaValidation, // Update this to Plan Schema validation
        onSubmit: async (values) => {
            console.log("Submitted values", values);
            // Submit logic here, such as sending the data to an API or saving it
        }
    });

    useEffect(() => {
        setFieldValue('type', location?.state?.type);
        setFieldValue('status', location?.state?.status);
        setFieldValue('planName', location?.state?.planName);
        setFieldValue('description', location?.state?.description);
        setFieldValue('price', location?.state?.price);
    }, [location?.state, setFieldValue]);

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <PageHeader titles="Plan Schema" active="View Plan Schema" items={["Home", "Plan Schemas List"]} links={['/dashboard', "/plan-schemas"]} />
                </Col>
                <Col className="text-end d-flex justify-content-end gap-1">
                    {/* Add Button or other actions here if needed */}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col as={Col} md={6}>
                                        <Form.Group>
                                            <Form.Label>Plan Type <span className="text-danger">*</span></Form.Label>
                                            <Form.Select
                                                name="type"
                                                value={values.type}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            >
                                                <option value="">Select</option>
                                                <option value="basic">Basic</option>
                                                <option value="premium">Premium</option>
                                                <option value="enterprise">Enterprise</option>
                                            </Form.Select>
                                            {errors.type && touched.type && (
                                                <p className="text-danger">{errors.type}</p>
                                            )}
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
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </Form.Select>
                                            {errors.status && touched.status && (
                                                <p className="text-danger">{errors.status}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col as={Col} md={12}>
                                        <Form.Group>
                                            <Form.Label>Plan Name <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="planName"
                                                value={values.planName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                            {errors.planName && touched.planName && (
                                                <p className="text-danger">{errors.planName}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col as={Col} md={12}>
                                        <Form.Group>
                                            <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                                            <textarea
                                                type="text"
                                                name="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="border border-black rounded-3 w-100"
                                                rows={5}
                                                disabled
                                            />
                                            {errors.description && touched.description && (
                                                <p className="text-danger">{errors.description}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col as={Col} md={6}>
                                        <Form.Group>
                                            <Form.Label>Price <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                value={values.price}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled
                                            />
                                            {errors.price && touched.price && (
                                                <p className="text-danger">{errors.price}</p>
                                            )}
                                        </Form.Group>
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

