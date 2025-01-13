import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";
import { AddPageValidation } from "../../commondata/formvalidations";

import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../utils/config";

export default function ChangePasswordModal() {
  const dispatch = useDispatch();
  const { isOpen, data, handleClose, refetch } = useSelector(
    (state) => state.allCommonModal
  );


  const initialValues = {
    id: data?.id || "",
    password: "",
    confirm_password: "",
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
          `${API_BASE_URL}/user-change-password`,
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
          // handleClose();
          dispatch(closeModal());
          refetch();
        } else {
      
          const errors = errors?.response?.data?.data?.errors;
          if (Array.isArray(errors)) {
            errors.forEach((err) => {
              toast.error(err.message);
            });
          } else {
            toast.error();
          }
        }
      } catch (error) {
               const errors = error?.response?.data?.data?.errors;
        if (Array.isArray(errors)) {
          errors.forEach((err) => {
            toast.error(err.message);
          });
        } else {
          console.log(error.response);
          toast.error(error?.response?.data?.message);
        }
        // toast.error(error?.response?.data?.data?.errors);
      }
    },
  });

  useEffect(() => {
    if (data) {
      setValues({
        id: data.id,
        password: "",
        confirm_password: "",
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
            Change Password
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
            <Row>
              <Col as={Col} md={6}>
                <input
                  type="hidden"
                  name="id"
                  value={values?.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border border-black rounded-3 w-100"
                />
                <Form.Group>
                  <Form.Label>
                    Password <span className="text-danger"></span>
                  </Form.Label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    Confirm Password <span className="text-danger"></span>
                  </Form.Label>
                  <input
                    type="password"
                    name="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col as={Col} className="text-center mt-5">
                <Button type="submit">Save</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
