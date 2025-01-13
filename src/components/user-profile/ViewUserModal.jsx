import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/allModalSlice";

import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

export default function ViewUserModal() {
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector((state) => state.allCommonModal);

    return (
    <>
      <Modal show={isOpen}>
        <Modal.Header className="bg-primary">
          <Modal.Title
            as="h4"
            className="fw-semibold lh-1 my-auto text-center text-light"
          >
            View User
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
          <Form>
            <Row>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    First Name <span className="text-danger"></span>
                  </Form.Label>
                  <input
                    type="text"
                    name="first_name"
                    value={data?.first_name}
                    readOnly
                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    Last Name <span className="text-danger"></span>
                  </Form.Label>
                  <input
                    type="text"
                    name="last_name"
                    value={data?.last_name}
                    readOnly
                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    Email <span className="text-danger"></span>
                  </Form.Label>
                  <input
                    type="text"
                    name="email"
                    value={data?.email}
                    readOnly

                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    Phone Number <span className="text-danger"></span>
                  </Form.Label>
                  <input
                    type="text"
                    name="phone"
                    value={data?.phone}
                    readOnly

                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    DOB <span className="text-danger"></span>
                  </Form.Label>
                  <input
                    type="date"
                    name="dob"
                    value={data?.dob}
                    readOnly

                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>

              <Col as={Col} md={6}>
                <Form.Group>
                  <Form.Label>
                    Username <span className="text-danger"></span>
                  </Form.Label>
                  <input
                    type="text"
                    name="username"
                    value={data?.username}
                    readOnly

                    className="border border-black rounded-3 w-100"
                  />
                </Form.Group>
              </Col>
            

            </Row>

            {/* <Row>
              <Col as={Col} className="text-center mt-5">
                <Button type="submit">Save</Button>
              </Col>
            </Row> */}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
