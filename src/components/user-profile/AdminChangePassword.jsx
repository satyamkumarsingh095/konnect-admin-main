import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import { AddPageValidation } from "../../commondata/formvalidations";

import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../utils/config";

export default function AdminChangePassword() {
    const dispatch = useDispatch();
    const { isOpen, handleClose, refetch } = useSelector(
        (state) => state.allCommonModal
    );

    const initialValues = {
        id: data?.id || "",
        password: "",
        password_confirmation: "",
        current_password: ""
    };

    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
        setValues,
        setFieldValue,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: "",
        onSubmit: async (value) => {

            try {
                const selectToken = localStorage.getItem("token");
                const token = selectToken; // Replace with your actual token
                const formData = new FormData();
                Object.keys(value).forEach((key) => {
                    formData.append(key, value[key]);
                });

                for (let pair of formData.entries()) {
                    console.log(`${pair[0]}: ${pair[1]}`);
                }

                const response = await axios.post(
                    `${API_BASE_URL}/change-password`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response?.data?.http_status_code === 200) {
                    toast.success(response?.data?.message);
                    resetForm();
                    dispatch(closeModal());
                    refetch();
                } else {
                    toast.error(resp?.data?.message)
                }
            } catch (error) {
                toast.error(error?.message)
            }
        },
    });

    useEffect(() => {
        if (data) {
            setValues({
                id: data.id,
                current_password: "",
                password: "",
                password_confirmation: "",
            });
        }
    }, [data, setValues]);
    return (
        <>
            <Modal show={isOpen} onSubmit={handleSubmit}>
                <Modal.Header className="bg-primary">
                    <Modal.Title
                        as="h4"
                        className="fw-semibold lh-1 my-auto text-center text-light"
                    >
                        Change password
                    </Modal.Title>
                    <Button
                        onClick={() => dispatch(closeModal())}
                        className="btn-close text-light"
                        variant=""
                    >
                        <i className="fe fe-x"></i>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form
                            type="hidden"
                            name="id"
                            value={values?.id}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        // className="border border-black rounded-3 w-100"
                        />
                        <Row>
                            <Form.Group>
                                <Form.Label>
                                    Old password <span className="text-danger"></span>
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    name="current_password"
                                    onChange={handleChange}
                                    value={values.current_password}
                                    onBlur={handleBlur}
                                // className="border border-black rounded-3 w-100"
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>
                                    password <span className="text-danger"></span>
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    onBlur={handleBlur}
                                // className="border border-black rounded-3 w-100"
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>
                                    Confirm password <span className="text-danger"></span>
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password_confirmation"
                                    value={values.password_confirmation}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                // className="border border-black rounded-3 w-100"
                                />
                            </Form.Group>
                        </Row>


                        <Row>
                            <Col as={Col} className="text-center mt-5">
                                <Button type="submit">Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body >
            </Modal >
        </>
    );
}
