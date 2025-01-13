import React, { useEffect } from "react";
import { Button, Row, Form, Col, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageHeader from "../../layouts/layoutcomponents/pageheader";
import { useFormik } from "formik";
import { AddPlanSchemaValidation } from "../../commondata/formvalidations";

export default function EditPlanSchema() {
    const navigate = useNavigate();
    const location = useLocation();

    const initialValues = {
        title: "",
        description: "",
        duration: "",
        price: "",
        level: ""
    };

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: AddPlanSchemaValidation,
        onSubmit: async (values) => {
            // try {
            //     // Add logic to update the plan using values and location?.state?.id
            //     console.log("Plan updated successfully", values);
            //     toast.success("Plan updated successfully");
            //     navigate("/all-plans");
            // } catch (error) {
            //     console.error("Error updating plan", error);
            //     toast.error("Failed to update plan");
            // }
        }
    });

    useEffect(() => {
        setFieldValue("title", location?.state?.title);
        setFieldValue("description", location?.state?.description);
        setFieldValue("duration", location?.state?.duration);
        setFieldValue("price", location?.state?.price);
        setFieldValue("level", location?.state?.level);
    }, [location?.state, setFieldValue]);

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <PageHeader titles="Membership Plan" active="Edit Plan" items={["Home", "Plans List"]} links={["/dashboard", "/all-membership-plans"]} />
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
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Price <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
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
                                    <Col md={6}>
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
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                name="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                rows={5}
                                            />
                                            {errors.description && touched.description && (
                                                <p className="text-danger">{errors.description}</p>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Button type="submit">Update</Button>
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
