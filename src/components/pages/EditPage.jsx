import React, { useEffect } from "react";
import { Button, Row, Form, Col, Card } from "react-bootstrap";
import { closeModal } from "../../redux/slices/allModalSlice";
import 'react-slideshow-image/dist/styles.css'
import { AddPageValidation } from "../../commondata/formvalidations";
import { useFormik } from "formik";
import Loader from "../../layouts/layoutcomponents/loader";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../layouts/layoutcomponents/pageheader"

export default function EditSinglePage() {
    const navigate = useNavigate()

    const location = useLocation()

    // const { refetch } = useGetAllPagesQuery()

    // const [addNewPage, { isLoading: loading }] = useUpdatePageMutation()


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

            // try {
            //     const response = await addNewPage({ pageId: location?.state?.id, pageData: values });
            //     if (response?.data?.http_status_code === 200) {
            //         refetch();
            //         toast.success(response?.data?.message);
            //         nivagate("/all-pages")
            //         // dispatch(closeModal());
            //     } else {
            //         console.error('Unexpected response', response);
            //     }
            // } catch (error) {
            //     console.error('Error submitting form', error);
            // }
        }

    });


    useEffect(() => {
        setFieldValue('type', location?.state?.type);
        setFieldValue('status', location?.state?.status);
        setFieldValue('title', location?.state?.title);
        setFieldValue('content', location?.state?.content);
    }, [])

    return (
        <>
            {/* {loading && <Loader />} */}
            <Row className="align-items-center">
                <Col> <PageHeader titles="Pages" active="Edit Pages" items={["Home", "Pages List"]} links={['/dashboard', "/all-pages"]} /> </Col>
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
